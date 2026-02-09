"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, PartyPopper, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);

  // Reasons state
  const [currentReasonIndex, setCurrentReasonIndex] = useState(-1);
  
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
    if (currentReasonIndex < reasons.length - 1) {
        setCurrentReasonIndex(prev => prev + 1);
    }
  };

  const images = [
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659844/img1_pyngx5.jpg", caption: "The day we first met 💖" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659860/img2_jkgp1e.jpg", caption: "Our first date together 🌹" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659846/img3_dreoj1.jpg", caption: "Adventures with you 🌍" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659844/img4_sivkqa.jpg", caption: "Your smile is everything 😊" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659841/img5_elz0wp.jpg", caption: "Silly moments with you 🤪" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659843/img6_whsjde.jpg", caption: "Always by your side 👫" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659840/img7_xtvlhx.jpg", caption: "Making memories... ✨" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659857/img8_cpcki6.jpg", caption: "You are my sunshine ☀️" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659857/img9_rkweji.jpg", caption: "Better together ❤️" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659842/img10_z6vamg.jpg", caption: "Laughing with you is my favorite 😂" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659865/img11_lffelj.jpg", caption: "Stolen glances 👀" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659841/img12_brttrt.jpg", caption: "My forever valentine 💌" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659845/img13_dbm393.jpg", caption: "Cherishing every moment ⏳" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659850/img14_n8eph8.jpg", caption: "Love you to the moon and back 🌙" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659851/img15_u3ebxj.jpg", caption: "So lucky to have you 🍀" },
    { src: "https://res.cloudinary.com/dklcexfun/image/upload/v1770659848/img16_yjllra.jpg", caption: "Forever and always 💍" },
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
    if (showSlideshow && !isSlideshowPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showSlideshow, isSlideshowPaused, images.length]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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

  const handleSendWhatsApp = () => {
    const phoneNumber = "94765722909";
    const message = encodeURIComponent(
      `Hey JayJay! 💖\n\nI've planned our perfect Date Night! 📅\n\n🍽️ Dinner: ${datePreferences.food}\n🚀 Activity: ${datePreferences.activity}\n🍨 Dessert: ${datePreferences.dessert}\n\nExcited! 😍`
    );
    window.open(`whatsapp://send?phone=${phoneNumber}&text=${message}`, '_blank');
  };

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
                {/* Enhanced Photo Frame */}
                <motion.div
                    initial={{ opacity: 0, y: 50, rotate: -2 }}
                    animate={{ opacity: 1, y: 0, rotate: -3 }}
                    whileHover={{ scale: 1.02, rotate: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative group w-full max-w-2xl mx-auto"
                    onMouseEnter={() => setIsSlideshowPaused(true)}
                    onMouseLeave={() => setIsSlideshowPaused(false)}
                >
                    <div className="bg-white p-4 pb-16 rounded shadow-2xl transform transition-transform duration-500 relative">
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
                        <div className="absolute bottom-4 left-0 right-0 text-center text-gray-800 px-4">
                             <p className="text-3xl md:text-4xl font-handwriting font-bold truncate">{images[currentImageIndex].caption}</p>
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

                {/* Reasons I Love You Section */}
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

            </div>
            
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
                    onClick={() => {
                        window.scrollTo({
                            top: window.innerHeight,
                            behavior: 'smooth'
                        });
                    }}
                >
                    <span className="text-sm font-handwriting text-xl font-bold text-white/90 drop-shadow-md">Plan our Date 👇</span>
                    <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center shadow-lg bg-pink-500/20 backdrop-blur-sm">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    </div>
                </motion.div>
            )}
            
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
                            <p className="text-sm text-gray-400 mb-2">Valid Forever • Non-Refundable • Paid with Love</p>
                            <p className="text-xs text-pink-500 font-bold animate-pulse mb-2">👇 Click below to send to JayJay! 👇</p>
                            <div className="w-full h-12 bg-gray-800 mt-4 rounded-sm relative overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-colors group" onClick={handleSendWhatsApp}> 
                                <span className="text-white font-mono tracking-[0.5em] group-hover:tracking-[0.6em] transition-all">VINUKI & JEHAN</span>
                            </div>
                        </div>
                    </motion.div>
                )}
             </div>
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
          </div>
        </div>
      )}
      
      {/* Background decorations */}
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
    </div>
  );
}
