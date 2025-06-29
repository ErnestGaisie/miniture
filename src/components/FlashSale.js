import React, { useState, useEffect } from "react";
import { products } from "../data/Data";
import { BiCart } from "react-icons/bi";
import Modal from "../common/Modal";
import Heading from "../common/Heading";
import { IoMdHeartEmpty, IoMdSearch } from "react-icons/io";

const FlashSale = () => {
  // const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:8000/furniture";

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await fetch(API_URL);
  //       const json = await res.json();
  //       console.log("RAW API RESPONSE:", json);
  //       setProducts(json.results || []);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Failed to fetch products:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  const handleOpen = (productId) => {
    setIsModalOpen(productId);
  };

  const handleClose = () => {
    setIsModalOpen(null);
  };

  return (
    <div>
      <div className="w-10/12 m-auto">
        <Heading heading={"You are in Miniture"} />

        {/* {loading ? ( */}
        {/* <p>Loading...</p> */}
        {/* ) : (  */}
        <div className="grid grid-cols-4 gap-3">
          {products.map((item, index) => (
            <div key={index} className="mt-8">
              <div className="overflow-hidden relative">
                <div className="image-container relative">
                  <div className="rounded-3xl" style={{ height: "200px" }}>
                    <img
                      src={item.img}
                      alt="img"
                      className="rounded-3xl"
                      style={{ height: "200px" }}
                    />
                  </div>

                  <div className="opacity-0 absolute top-0 right-0 m-4">
                    <div>
                      <div className="bg-white p-4 rounded-full mb-2">
                        <IoMdHeartEmpty />
                      </div>
                      <div className="bg-white p-4 rounded-full">
                        <IoMdSearch />
                      </div>
                    </div>
                  </div>
                  <div className="opacity-0 absolute -bottom-3 right-0 bg-white p-4 rounded-s-2xl">
                    <div className="bg-black text-white h-10 w-10 grid place-items-center rounded-3xl">
                      <button
                        className="text-2xl"
                        onClick={() => handleOpen(item.id)}
                      >
                        <BiCart />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="product-details mt-2">
                  <p className="mb-2">{item.title}</p>
                  <p>${item.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* )} */}
      </div>

      <Modal
        data={products.find((item) => item.id === isModalOpen)}
        isModalOpen={isModalOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default FlashSale;
