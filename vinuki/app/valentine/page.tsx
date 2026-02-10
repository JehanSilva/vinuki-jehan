"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

import FloatingHearts from "@/components/valentine/FloatingHearts";
import MusicPlayer from "@/components/valentine/MusicPlayer";
import NoButton from "@/components/valentine/NoButton";
import Slideshow from "@/components/valentine/Slideshow";
import Reasons from "@/components/valentine/Reasons";
import DatePlanner from "@/components/valentine/DatePlanner";

export default function ValentinePage() {
  const [yesPressed, setYesPressed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSlideshow, setShowSlideshow] = useState(false);

  useEffect(() => {
    if (yesPressed) {
      const timer = setTimeout(() => {
        setShowSlideshow(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [yesPressed]);

  const handleYesClick = () => {
    setYesPressed(true);
    
    // Confetti logic
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const particleCount = 50;
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Optional: Clear interval cleanup if component unmounts
    return () => clearInterval(interval);
  };

  const scrollToDatePlanner = () => {
       window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
  };

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col items-center min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 overflow-hidden relative p-4 transition-all duration-1000 ${showSlideshow ? 'justify-start pt-10' : 'justify-center'}`}
    >
      <MusicPlayer play={yesPressed} />
      <FloatingHearts />
      
      {yesPressed ? (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center w-full z-10"
        >
          <motion.div
             animate={showSlideshow ? { scale: 0.7 } : { scale: 1 }}
             transition={{ duration: 0.5 }}
             className="flex flex-col items-center"
          >
            {!showSlideshow && (
                <div className="flex justify-center mb-8">
                    <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Heart className="w-32 h-32 text-red-600 fill-red-600" />
                    </motion.div>
                </div>
            )}
            <h1 className="text-5xl md:text-7xl font-bold text-red-600 mb-6 drop-shadow-md font-serif">
                Yay! I knew it! ❤️
            </h1>
            <p className="text-2xl text-pink-700 font-medium mb-8">
                Best Valentine Ever! I Love you Babyyy!
            </p>
          </motion.div>

          {showSlideshow && (
            <>
                <div className="flex flex-col xl:flex-row gap-12 w-full max-w-[1800px] mx-auto items-center xl:items-start mt-8 px-4 md:px-8">
                    <Slideshow />
                    <Reasons scrollOnComplete={scrollToDatePlanner} />
                </div>
                
                <DatePlanner />
             </>
          )}
        </motion.div>
      ) : (
        <div className="text-center z-10 w-full max-w-4xl px-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
             <Heart className="w-24 h-24 text-red-500 fill-red-500 mx-auto mb-8 animate-pulse drop-shadow-xl" />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-12 leading-tight drop-shadow-sm font-handwriting py-2">
            Vinuki, will you be my Valentine?
          </h1>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative h-60">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                scale: [1, 1.02, 1],
                boxShadow: ["0px 0px 0px rgba(255, 60, 60, 0)", "0px 0px 30px rgba(255, 60, 60, 0.5)", "0px 0px 0px rgba(255, 60, 60, 0)"]
              }}
              transition={{ 
                scale: { duration: 1.5, repeat: Infinity },
                boxShadow: { duration: 1.5, repeat: Infinity }
              }}
              onClick={handleYesClick}
              className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold py-4 px-12 md:py-6 md:px-16 rounded-full text-2xl md:text-4xl shadow-2xl transition-all border-4 border-white/50 cursor-pointer z-50 relative overflow-hidden group font-serif tracking-widest"
            >
              <span className="relative z-10 drop-shadow-md">Yes 💖</span>
              <motion.div 
                className="absolute inset-0 bg-white/40"
                initial={{ x: "-100%", skewX: -12 }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>

            <NoButton />
          </div>
        </div>
      )}
    </div>
  );
}
