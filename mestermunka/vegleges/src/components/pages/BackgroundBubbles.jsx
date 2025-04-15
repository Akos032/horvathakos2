import React from "react";
import { motion } from "framer-motion";
import { FaCarrot, FaFish, FaPizzaSlice, FaAppleAlt, FaEgg, FaPepperHot, FaDrumstickBite, FaIceCream, FaBreadSlice } from "react-icons/fa";

const icons = [
  FaCarrot,
  FaFish,
  FaPizzaSlice,
  FaAppleAlt,
  FaEgg,
  FaPepperHot,
  FaDrumstickBite,
  FaIceCream,
  FaBreadSlice,
];

const generateRandomPosition = () => ({
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
});

const BackgroundBubbles = () => {
  return (
    <div className="bubbles-container">
      {Array.from({ length: 20 }).map((_, i) => {
        const Icon = icons[i % icons.length];
        const position = generateRandomPosition();
        const size = 30 + Math.random() * 40;

        return (
          <motion.div
            key={i}
            className="bubble-icon"
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              fontSize: `${size}px`,
              color: `hsl(${Math.random() * 360}, 70%, 70%)`,
              animationDelay: `${Math.random() * 10}s`,
            }}
            initial={{ y: 0, opacity: 0.6 }}
            animate={{ y: -150, opacity: 1 }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Icon />
          </motion.div>
        );
      })}
    </div>
  );
};

export default BackgroundBubbles;
