import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFoundPage from "./pages/NotFoundPage";
import Shop from "./pages/Shop";
import ContactUs from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import { BottomRightModal } from "./components/BottomRightModal";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { addToCart } from "./redux/cartSlice";
import store from "./redux/store";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  window.addEventListener("message", (event) => {
    console.log("Event Origin:", event.origin);
    if (event.origin !== "https://app.dev.meenaai.com/") return; // Ensure security

    const receivedCart = event.data; // Array of transformed cart items
    console.log("Received cart from iframe:", receivedCart);

    // Dispatch action for each received cart item
    receivedCart.forEach((item) => {
      store.dispatch(addToCart(item)); // Dispatch action properly
    });
    handleClose();
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsModalOpen(true), 2000);
    console.log("TRueeeeeeeee");
    return () => clearTimeout(timer);
  }, []);

  const handleModalClick = () => {
    setIsModalOpen(true);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="relative">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop onClick={handleModalClick}/>}  />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
        <BottomRightModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onClick={handleModalClick}
        />
        <Dialog
          fullScreen
          open={isDialogOpen}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-paper": {
              width: "95vw", // Adjust width
              height: "95vh", // Set height to 90% of viewport height
              maxHeight: "none", // Prevents default constraints
            },
          }}
          TransitionComponent={Transition}
        >
          <iframe
            src="http://localhost:3000"
            className="w-full h-full border-none"
            title="Web App"
          />
        </Dialog>
      </Router>
      {/* for suggestion we need to hit ctrl + space */}
    </div>
  );
};

export default App;
