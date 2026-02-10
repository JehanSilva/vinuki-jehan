"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const reasons = [
    "Your beautiful smile that lights up my day",
    "The way you laugh at my silly jokes",
    "Your kind and caring heart",
    "How you make everything better just by being there",
    "The way you look at me",
    "How supportive you are of my dreams",
    "The warmth of your hugs",
    "Our late night conversations",
    "Just being you ❤️"
];

export default function Reasons({ scrollOnComplete }: { scrollOnComplete: () => void }) {
  const [currentReasonIndex, setCurrentReasonIndex] = useState(-1);

  const handleReasonClick = () => {
    if (currentReasonIndex < reasons.length - 1) {
        setCurrentReasonIndex(prev => prev + 1);
    }
  };

  return (
    <>
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col items-center justify-center z-20 lg:w-80 shrink-0 lg:mt-20"
        >
                {/* Floating Hint */}
            {currentReasonIndex < reasons.length - 1 && (
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="mb-4 text-white font-bold text-lg drop-shadow-md bg-pink-500/80 px-4 py-1 rounded-full"
                >
                    {currentReasonIndex === -1 ? "Click me! 👇" : "Next Reason 👇"}
                </motion.div>
            )}

            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 105, 180, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ["0px 0px 0px rgba(255, 105, 180, 0)", "0px 0px 20px rgba(255, 105, 180, 0.4)", "0px 0px 0px rgba(255, 105, 180, 0)"] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                onClick={handleReasonClick}
                className="bg-white/90 backdrop-blur-sm hover:bg-white text-pink-600 font-bold py-4 px-10 rounded-full text-xl shadow-xl border-4 border-pink-300 transition-all mb-8 whitespace-nowrap relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={currentReasonIndex === reasons.length - 1}
            >
                <span className="relative z-10">Why I love you 💌</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {currentReasonIndex >= 0 && (
                <motion.div
                    key={currentReasonIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        boxShadow: ["0px 0px 0px rgba(255, 20, 147, 0)", "0px 0px 50px rgba(255, 20, 147, 0.8)", "0px 0px 0px rgba(255, 20, 147, 0)"],
                    }}
                    transition={{ 
                        duration: 0.5, // Enter duration
                        boxShadow: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } // Pulse duration
                    }}
                    className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full text-center border-4 border-pink-300 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-100/50 via-white/50 to-pink-100/50 animate-pulse" />
                    <p className="text-xl md:text-3xl text-pink-600 font-bold font-serif italic leading-relaxed relative z-10 drop-shadow-sm">
                        "{reasons[currentReasonIndex]}"
                    </p>
                </motion.div>
            )}
        </motion.div>

        {/* Scroll Down Indicator - Positioned between sections */}
        {currentReasonIndex === reasons.length - 1 && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ 
                    opacity: { delay: 1, duration: 1 },
                    y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                }}
                className="flex flex-col items-center gap-2 cursor-pointer z-20 mt-8 mb-4 relative"
                onClick={scrollOnComplete}
            >
                <span className="text-sm font-handwriting text-xl font-bold text-white/90 drop-shadow-md">Plan our Date 👇</span>
                <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center shadow-lg bg-pink-500/20 backdrop-blur-sm">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                </div>
            </motion.div>
        )}
    </>
  );
}
