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

  // Slideshow state
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reasons state
  const [currentReason, setCurrentReason] = useState<string | null>(null);
  
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

  // Date Planner State
  const [datePreferences, setDatePreferences] = useState({
    food: "",
    activity: "",
    dessert: ""
  });

  const foodOptions = ["Italian 🍝", "Japanese 🍣", "Indian 🍛", "Burgers 🍔"];
  const activityOptions = ["Movie 🎬", "Stargazing 🌌", "Bowling 🎳", "Arcade 👾"];
  const dessertOptions = ["Ice Cream 🍦", "Waffles 🧇", "Cheesecake 🍰", "Donuts 🍩"];

  const handleDateUsage = (category: string, value: string) => {
    setDatePreferences(prev => ({
        ...prev,
        [category]: value
    }));
  };

  const handleReasonClick = () => {
    // Pick a random reason ensuring it's not the same as the current one (if possible)
    let newReason;
    do {
        newReason = reasons[Math.floor(Math.random() * reasons.length)];
    } while (newReason === currentReason && reasons.length > 1);
    
    setCurrentReason(newReason);
  };

  const images = [
    "/images/img1.jpg",
    "/images/img2.jpg",
    "/images/img3.JPG",
    "/images/img4.jpg",
    "/images/img5.jpeg",
    "/images/img6.jpeg",
    "/images/img7.jpeg",
    "/images/img8.JPG",
    "/images/img9.JPG",
    "/images/img10.jpg",
    "/images/img11.JPG",
    "/images/img12.jpg",
    "/images/img13.jpeg",
    "/images/img14.jpeg",
    "/images/img15.jpeg",
    "/images/img16.jpeg",
  ];

  useEffect(() => {
    if (yesPressed) {
      const timer = setTimeout(() => {
        setShowSlideshow(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [yesPressed]);

  useEffect(() => {
    if (showSlideshow) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showSlideshow, images.length]);

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

    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    // Run confetti continuously
    const interval: any = setInterval(function() {
      const particleCount = 50;
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Optional: Clear interval cleanup if component unmounts (though for this simple page it might not be strictly necessary, it's good practice)
    return () => clearInterval(interval);
  };

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col items-center min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-pink-300 overflow-hidden relative p-4 transition-all duration-1000 ${showSlideshow ? 'justify-start pt-10' : 'justify-center'}`}
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
                Best Valentine Ever! Love you Vinuki!
            </p>
          </motion.div>

          {showSlideshow && (<>
            <div className="flex flex-col xl:flex-row gap-12 w-full max-w-[1800px] mx-auto items-center xl:items-start mt-8 px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full max-w-6xl h-[60vh] md:h-[70vh] relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/50 bg-black/20 shrink-0"
                >
                    {images.map((src, index) => (
                        <motion.div
                            key={src}
                            className="absolute inset-0 w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                            transition={{ duration: 1 }}
                        >
                            {/* Blurred background for fill */}
                            <div 
                                className="absolute inset-0 bg-cover bg-center blur-xl opacity-50 scale-110"
                                style={{ backgroundImage: `url(${src})` }}
                            />
                            {/* Main image */}
                            <img
                                src={src}
                                alt={`Slideshow ${index + 1}`}
                                className="absolute inset-0 w-full h-full object-contain relative z-10"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Reasons I Love You Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="flex flex-col items-center justify-center z-20 lg:w-80 shrink-0 lg:mt-20"
                >
                     {/* Floating Hint */}
                    {!currentReason && (
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="mb-4 text-white font-bold text-lg drop-shadow-md bg-pink-500/80 px-4 py-1 rounded-full"
                        >
                            Click me! 👇
                        </motion.div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255, 105, 180, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ boxShadow: ["0px 0px 0px rgba(255, 105, 180, 0)", "0px 0px 20px rgba(255, 105, 180, 0.4)", "0px 0px 0px rgba(255, 105, 180, 0)"] }}
                        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
                        onClick={handleReasonClick}
                        className="bg-white/90 backdrop-blur-sm hover:bg-white text-pink-600 font-bold py-4 px-10 rounded-full text-xl shadow-xl border-4 border-pink-300 transition-all mb-8 whitespace-nowrap relative overflow-hidden group"
                    >
                        <span className="relative z-10">Why I love you 💌</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>

                    {currentReason && (
                        <motion.div
                            key={currentReason}
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
                                "{currentReason}"
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
            
            {/* Date Planner Section */}
             <div className="w-full max-w-6xl mx-auto mt-20 mb-20 px-4 z-20 relative">
                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-white text-center mb-12 drop-shadow-lg font-serif"
                >
                    Plan our Date Night! 📅 
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Food Selection */}
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border-2 border-white/50">
                        <h3 className="text-2xl font-bold text-pink-600 mb-4 text-center">First, let's eat! 🍽️</h3>
                        <div className="flex flex-col gap-3">
                            {foodOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleDateUsage('food', option)}
                                    className={`p-3 rounded-xl text-lg transition-all border-2 ${datePreferences.food === option ? 'bg-pink-500 text-white border-pink-600 scale-105 shadow-lg font-bold' : 'bg-white hover:bg-pink-50 text-pink-800 border-pink-100'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Activity Selection */}
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border-2 border-white/50">
                        <h3 className="text-2xl font-bold text-purple-600 mb-4 text-center">Then, let's go! 🚀</h3>
                        <div className="flex flex-col gap-3">
                            {activityOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleDateUsage('activity', option)}
                                    className={`p-3 rounded-xl text-lg transition-all border-2 ${datePreferences.activity === option ? 'bg-purple-500 text-white border-purple-600 scale-105 shadow-lg font-bold' : 'bg-white hover:bg-purple-50 text-purple-800 border-purple-100'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dessert Selection */}
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border-2 border-white/50">
                        <h3 className="text-2xl font-bold text-red-500 mb-4 text-center">Finally, a treat! 🍨</h3>
                        <div className="flex flex-col gap-3">
                            {dessertOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleDateUsage('dessert', option)}
                                    className={`p-3 rounded-xl text-lg transition-all border-2 ${datePreferences.dessert === option ? 'bg-red-500 text-white border-red-600 scale-105 shadow-lg font-bold' : 'bg-white hover:bg-red-50 text-red-800 border-red-100'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Date Ticket */}
                {datePreferences.food && datePreferences.activity && datePreferences.dessert && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        className="mt-16 mx-auto max-w-xl bg-white p-8 rounded-sm shadow-2xl relative border-[3px] border-dashed border-gray-300 transform rotate-1 hover:rotate-0 transition-transform duration-300"
                        style={{
                            backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
                            backgroundSize: "20px 20px"
                        }}
                    >
                        {/* Stamp */}
                        <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-4 border-red-500 opacity-20 flex items-center justify-center transform rotate-12 pointer-events-none">
                            <span className="text-red-500 font-bold text-xl uppercase">Approved</span>
                        </div>

                        <h3 className="text-3xl font-bold text-gray-800 text-center mb-2 font-serif uppercase tracking-widest border-b-2 border-gray-800 pb-2">Date Night Ticket</h3>
                        <p className="text-center text-gray-500 italic mb-8">Admit Two ❤️</p>
                        
                        <div className="space-y-4 text-xl">
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-bold text-gray-600">Dinner:</span>
                                <span className="text-pink-600 font-bold">{datePreferences.food}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-bold text-gray-600">Activity:</span>
                                <span className="text-purple-600 font-bold">{datePreferences.activity}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 pb-2">
                                <span className="font-bold text-gray-600">Dessert:</span>
                                <span className="text-red-500 font-bold">{datePreferences.dessert}</span>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-400">Valid Forever • Non-Refundable • Paid with Love</p>
                            <div className="w-full h-12 bg-gray-800 mt-4 rounded-sm relative overflow-hidden flex items-center justify-center">
                                <span className="text-white font-mono tracking-[0.5em]">VINUKI & JEHAN</span>
                            </div>
                        </div>
                    </motion.div>
                )}
             </div>
             </>
          )}
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
      <div className="fixed inset-0 pointer-events-none z-0">
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
