"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NoButton() {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleNoHover = () => {
    setIsHovered(true);
    // Use window dimensions to ensure it stays on screen
    const btnWidth = 200; // Provide ample buffer
    const btnHeight = 80;

    const randomX = Math.random() * (window.innerWidth - btnWidth);
    const randomY = Math.random() * (window.innerHeight - btnHeight);
    
    setNoBtnPosition({ x: randomX, y: randomY });
  };

  return (
    <motion.button
      onMouseEnter={handleNoHover}
      onClick={handleNoHover}
      animate={isHovered ? { x: noBtnPosition.x, y: noBtnPosition.y } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="bg-white/80 hover:bg-white text-gray-500 font-bold py-3 px-8 md:py-4 md:px-10 rounded-full text-lg md:text-xl shadow-lg transition-colors border-2 border-gray-200 cursor-default backdrop-blur-sm hover:text-gray-700"
      style={isHovered ? { position: 'fixed', left: 0, top: 0, zIndex: 9999 } : { position: 'static' }}
    >
      No 😢
    </motion.button>
  );
}
