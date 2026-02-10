"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function FloatingHearts() {
  // Background decorations state
  const [decorations, setDecorations] = useState<Array<{
    id: number;
    x: number;
    y: number;
    scale: number;
    rotate: number;
    yTo: number;
    rotateTo: number;
    duration: number;
    size: number;
  }>>([]);

  useEffect(() => {
    // Generate decorations only on client to avoid hydration mismatch
    const newDecorations = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 0.5 + 0.5,
      rotate: Math.random() * 360,
      yTo: Math.random() * -100,
      rotateTo: Math.random() * 360,
      duration: Math.random() * 20 + 10,
      size: Math.random() * 40 + 20
    }));
    setDecorations(newDecorations);
  }, []);

  return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {decorations.map((d) => (
          <motion.div
            key={d.id}
            className="absolute text-pink-300 opacity-50"
            style={{
                left: d.x,
                top: d.y,
            }}
            initial={{ 
              scale: d.scale,
              rotate: d.rotate
            }}
            animate={{ 
              y: [0, d.yTo],
              rotate: [d.rotate, d.rotateTo]
            }}
            transition={{ 
              duration: d.duration, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          >
            <Heart size={d.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>
  );
}
