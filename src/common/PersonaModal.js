"use client";

import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice";

// Sample personas data
const personas = [
  {
    id: 1,
    name: "Minimalist Jetsetter",
    description: "Creative thinker who embraces new ideas and technologies",
    image:
      "https://meena-storage.s3.us-east-1.amazonaws.com/temp-output/persona1.png",
  },
  {
    id: 2,
    name: "Social Media Chic",
    description:
      "Detail-oriented problem solver who makes data-driven decisions",
    image:
      "https://meena-storage.s3.us-east-1.amazonaws.com/temp-output/persona2.png",
  },
  {
    id: 3,
    name: "Sustainable & Sophisticated",
    description: "Confident decision-maker who inspires and motivates teams",
    image:
      "https://meena-storage.s3.us-east-1.amazonaws.com/temp-output/persona3.png",
  },
  {
    id: 4,
    name: "Globally Inspired Simplicity",
    description:
      "Team player who excels at building relationships and consensus",
    image:
      "https://meena-storage.s3.us-east-1.amazonaws.com/temp-output/persona4.png",
  },
  {
    id: 5,
    name: "Soft Urban Luxe",
    description: "Forward-thinking strategist who sees the big picture",
    image:
      "https://meena-storage.s3.us-east-1.amazonaws.com/temp-output/persona5.png",
  },
];

const PersonaModal = ({ isModalOpen, handleClose }) => {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [adSent, setAdSent] = useState(false);

  const dispatch = useDispatch();

  const sendAd = async () => {
    if (!selectedPersona) return;

    // In a real app, you would dispatch the selected persona to your state management
    const tempProduct = {
      ...selectedPersona,
      quantity: 1,
    };

    await sendEmail();
    setAdSent(true);

    // You could add additional logic here to actually "send" the ad
    console.log("Ad sent for persona:", selectedPersona.name);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setSelectedPersona(null);
      setAdSent(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    console.log(selectedPersona);
  }, [selectedPersona]);

  // Get the button background color based on state
  const getButtonBgColor = () => {
    if (adSent) return "bg-green-500 hover:bg-green-600";
    if (selectedPersona) return "bg-blue-500 hover:bg-blue-600";
    return "bg-gray-400";
  };

  const sendEmail = async () => {
    await fetch("https://email-render.onrender.com/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ernestyawgaisie@gmail.com",
        subject: "Hello from Meena!",
        body: "This is a test email sent via FastAPI + Resend.",
        image: selectedPersona["image"],
        name: "",
      }),
    });
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content w-2/3 relative bg-white overflow-hidden">
            <span
              className="absolute top-0 right-0 p-4 cursor-pointer"
              onClick={() => handleClose()}
            >
              <FaTimes />
            </span>

            <div className="p-6 mt-8">
              <h2 className="text-2xl font-bold mb-6">Select a Persona</h2>

              {/* Personas Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {personas.map((persona) => (
                  <div
                    key={persona.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPersona?.id === persona.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                    onClick={() => setSelectedPersona(persona)}
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {persona.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Send Ad Button */}
              <div className="flex justify-center mt-6">
                <button
                  className={`px-6 py-3 rounded-md font-medium transition-colors ${
                    selectedPersona === null
                      ? "cursor-not-allowed opacity-70 bg-black text-white"
                      : "cursor-pointer text-black bg-rose-100 hover:bg-rose-100"
                  }`}
                  onClick={sendAd}
                  style={{ minWidth: "120px", marginTop: "10px" }}
                >
                  {adSent ? "Ad Sent!" : "Send Ad"}
                </button>
              </div>

              {/* Success Message */}
              {adSent && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-center">
                  <p className="text-green-700">
                    Ad has been successfully sent to the selected persona!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonaModal;
