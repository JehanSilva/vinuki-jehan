"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";

export default function ValentinePage() {
  const [yesPressed, setYesPressed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Initial center position, will be updated on hover
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleNoHover = () => {
    setIsHovered(true);
    // Use window dimensions to ensure it stays on screen
    const btnWidth = 200; // Provide ample buffer
    const btnHeight = 80;

    const randomX = Math.random() * (window.innerWidth - btnWidth);
    const randomY = Math.random() * (window.innerHeight - btnHeight);
    
    setNoBtnPosition({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    setYesPressed(true);
    
    // Play music
    if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }

    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 overflow-hidden relative p-4"
    >
      <audio 
        ref={audioRef} 
        src="/music/music.mp3" 
        loop
      />
      
      {yesPressed ? (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center mb-8">
             <motion.div
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ repeat: Infinity, duration: 2 }}
             >
                <Heart className="w-32 h-32 text-red-600 fill-red-600" />
             </motion.div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-red-600 mb-6 drop-shadow-md font-serif">
            Yay! I knew it! ❤️
          </h1>
          <p className="text-2xl text-pink-700 font-medium">
            Best Valentine Ever! Love you Vinuki!
          </p>
        </motion.div>
      ) : (
        <div className="text-center z-10 w-full max-w-4xl">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
             <Heart className="w-20 h-20 text-red-500 fill-red-500 mx-auto mb-6 animate-pulse" />
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-12 leading-tight drop-shadow-sm font-serif">
            Vinuki, will you be my Valentine?
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative h-40">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleYesClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 md:py-4 md:px-12 rounded-full text-xl md:text-2xl shadow-lg hover:shadow-xl transition-all border-4 border-green-600 cursor-pointer z-50"
            >
              Yes 💖
            </motion.button>

            <motion.button
              onMouseEnter={handleNoHover}
              onClick={handleNoHover}
              animate={isHovered ? { x: noBtnPosition.x, y: noBtnPosition.y } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-8 md:py-4 md:px-12 rounded-full text-xl md:text-2xl shadow-lg transition-colors border-4 border-gray-500 cursor-default"
              style={isHovered ? { position: 'fixed', left: 0, top: 0, zIndex: 9999 } : { position: 'static' }}
            >
              No 😢
            </motion.button>
          </div>
        </div>
      )}
      
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300 opacity-50"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              rotate: [null, Math.random() * 360]
            }}
            transition={{ 
              duration: Math.random() * 20 + 10, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          >
            <Heart size={Math.random() * 40 + 20} fill="currentColor" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
