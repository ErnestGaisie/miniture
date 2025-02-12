import { useState, useEffect } from "react";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export const BottomRightModal = ({ isOpen, onClose, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ x: "-50%", opacity: 0 }} // Start off-screen & fully transparent
      animate={{ x: 0, opacity: 1 }} // Move to position & fade in
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className={`fixed z-50 w-80 rounded-lg bg-[#ffa832] text-white shadow-lg cursor-pointer overflow-hidden ${
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      style={{
        backgroundColor: "#574FE5",
        bottom: "10px",
        right: "10px",
        borderRadius: "10px",
        transition:
          "transform 0.2s ease-in-out, background-color 0.2s ease-in-out",
      }}
      role="button"
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      tabIndex={0}
      aria-label="Shop furniture with AI"
    >
      <div className="relative p-3">
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <BrainCircuit size={24} className="text-indigo-200 animate-pulse" />
        </div>
        <h3 className="text-xl font-bold mb-1">MeenaAI</h3>
        <p className="text-indigo-100 text-sm mb-2">
          Discover your perfect furniture match with our AI assistant!
        </p>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-semibold">Get Started</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            style={{
              height: "20px",
              width: "40px",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
