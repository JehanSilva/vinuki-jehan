"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function DatePlanner() {
  const [datePreferences, setDatePreferences] = useState({
    food: "",
    activity: "",
    dessert: ""
  });

  const foodOptions = [
    "Italian 🍝🍕",
    "Japanese 🍣",
    "Chinese 🥡",
    "Mexican 🌮",
    "Steakhouse 🥩",
    "Korean 🍖",
    "Seafood 🦞",
    "Indian 🍛",
    "Burgers 🍔",
    "Thai 🍜"
  ];
  const activityOptions = [
    "Movie 🎬",
    "Stargazing 🌌",
    "Bowling 🎳",
    "Arcade 👾",
    "Walk in the Park 🌳",
    "Art Gallery 🎨",
    "Picnic 🧺",
    "Karaoke 🎤",
    "Board Games 🎲"
  ];
  const dessertOptions = [
    "Ice Cream 🍦",
    "Ice Tea ☕",
    "Dark Chocolate 🍫",
    "Salted Caramel Cheesecake 🍰",
    "Donuts 🍩",
    "Tiramisu 🍮",
    "Crepes 🥞",
    "Brownies 🍫",
    "Waffles 🧇"
  ];

  const handleDateUsage = (category: string, value: string) => {
    setDatePreferences(prev => ({
        ...prev,
        [category]: value
    }));
  };

  const handleSendWhatsApp = () => {
    const phoneNumber = "94765722909";
    const message = encodeURIComponent(
      `Hey Jaybie! 💖\n\nI've planned our perfect Date Night! 📅\n\n🍽️ Dinner: ${datePreferences.food}\n🚀 Activity: ${datePreferences.activity}\n🍨 Dessert: ${datePreferences.dessert}\n\nExcited! 😍`
    );
    window.open(`whatsapp://send?phone=${phoneNumber}&text=${message}`, '_blank');
  };

  return (
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
                    <p className="text-xs text-pink-500 font-bold animate-pulse mb-2">👇 Click below to send to Jaybie! 👇</p>
                    <div className="w-full h-12 bg-gray-800 mt-4 rounded-sm relative overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-900 transition-colors group" onClick={handleSendWhatsApp}> 
                        <span className="text-white font-mono tracking-[0.5em] group-hover:tracking-[0.6em] transition-all">VINUKI & JEHAN</span>
                    </div>
                </div>
            </motion.div>
        )}
    </div>
  );
}
