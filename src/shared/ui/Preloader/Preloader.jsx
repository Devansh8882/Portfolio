import React from 'react';
import { motion } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030209]"
    >
      {/* Sleek Deep Cosmic Background for Preloader */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030209] via-[#09081a] to-[#04040a]" />
      
      <div className="relative flex flex-col items-center">
        {/* Cinematic Welcome Text in Glowing Cyber Gradient */}
        <motion.div
          initial={{ opacity: 0, y: 15, letterSpacing: "1.2em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.4em" }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut"
          }}
          className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#bd5cff] via-[#d946ef] to-[#00f5ff] uppercase tracking-[0.4em] text-center filter drop-shadow-[0_0_15px_rgba(0,245,255,0.35)]"
        >
          WELCOME
        </motion.div>

        {/* Animated Neon Cyan Line */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "200px", opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          className="mt-10 h-[1.5px] bg-[#00f5ff] shadow-[0_0_10px_rgba(0,245,255,0.8)]"
        />

        {/* Subtle Cyber Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-8 text-[10px] font-mono tracking-[0.3em] text-[#00f5ff]/60 uppercase"
        >
          CYBER INTERFACE // DEVANSH
        </motion.div>
      </div>
    </motion.div>
  );
};
