"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659841/img12_brttrt.jpg", caption: "Five more minutes (for the tenth time)" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659846/img3_dreoj1.jpg", caption: "Day 1 of snackies" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659860/img2_jkgp1e.jpg", caption: "Sun kissed" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659844/img1_pyngx5.jpg", caption: "Side eyes that is spicier than wasabi" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659844/img4_sivkqa.jpg", caption: "Magic Shroomes that did it all" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659842/img10_z6vamg.jpg", caption: "Viramaya & vibes" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659845/img13_dbm393.jpg", caption: "Cooking up memories" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659850/img14_n8eph8.jpg", caption: "Captured by the professional third wheel" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659851/img15_u3ebxj.jpg", caption: "Finding Nemo" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659865/img11_lffelj.jpg", caption: "A little detour" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659857/img8_cpcki6.jpg", caption: "Close calls & shopping hauls" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659857/img9_rkweji.jpg", caption: "Because \"what should we eat?\"" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659840/img7_xtvlhx.jpg", caption: "2026 spoiler alert... ✨" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659843/img6_whsjde.jpg", caption: "Finally off the \"sick bay\" diet" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659841/img5_elz0wp.jpg", caption: "Current status: Parked in our own little world" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659848/img16_yjllra.jpg", caption: "Forever and always 💍" },
];

export default function Slideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);

  useEffect(() => {
    if (!isSlideshowPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isSlideshowPaused]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        whileHover={{ scale: 1.02, rotate: 0 }}
        transition={{ duration: 0.8 }}
        className="relative group w-full max-w-2xl mx-auto"
        onMouseEnter={() => setIsSlideshowPaused(true)}
        onMouseLeave={() => setIsSlideshowPaused(false)}
    >
        <div className="bg-white p-4 pb-8 rounded shadow-2xl transform transition-transform duration-500 relative">
            {/* Decorative tape/pin */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-pink-200/50 rotate-2 backdrop-blur-sm z-20 shadow-sm border border-white/40"></div>
            
            <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden bg-gray-100 border-2 border-gray-100">
                    {images.map((img, index) => (
                    <motion.div
                        key={img.src}
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Blurred background for fill */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center blur-xl opacity-50 scale-110"
                            style={{ backgroundImage: `url(${img.src})` }}
                        />
                        {/* Main image */}
                        <img
                            src={img.src}
                            alt={`Slideshow ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                ))}
            </div>
            
            {/* Caption Area */}
            <div className="mt-6 text-center text-gray-800 px-4 min-h-[3rem] flex items-center justify-center">
                    <p className="text-3xl md:text-4xl font-handwriting font-bold leading-tight">{images[currentImageIndex].caption}</p>
            </div>

                {/* Navigation Buttons */}
            <button 
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-500 rounded-full p-2 shadow-lg transition-all transform hover:scale-110 opacity-0 group-hover:opacity-100 z-30"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-pink-500 rounded-full p-2 shadow-lg transition-all transform hover:scale-110 opacity-0 group-hover:opacity-100 z-30"
            >
                <ChevronRight size={24} />
            </button>

                {/* Corner Decorations */}
            <Heart className="absolute -top-4 -left-4 text-pink-400 fill-pink-200 w-12 h-12 -rotate-12 drop-shadow-md z-10" />
            <Heart className="absolute -bottom-4 -right-4 text-red-400 fill-red-200 w-10 h-10 rotate-12 drop-shadow-md z-10" />
        </div>
    </motion.div>
  );
}
