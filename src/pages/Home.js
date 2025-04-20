import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import FlashSale from "../components/FlashSale";
import Offer from "../components/Offer";
import BestSeller from "../components/products";
import Arrived from "../components/Arrived";
import store from "../redux/store";
import { addToCart } from "../redux/cartSlice";
import { AIShoppingDialog } from "../components/AISjoppingDIalog.js";


const Home = () => {
  return (
    <div className="relative">
      <Banner />
      <Category />
      <FlashSale />
      <Offer />
      <BestSeller />
      <Arrived />
      {/* <AIShoppingDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} /> */}
    </div>
  );
};

export default Home;
