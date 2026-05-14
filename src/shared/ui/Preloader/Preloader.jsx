import React from 'react';
import { motion } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f5ebe0]"
    >
      {/* Soft Tan Background for Preloader */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5ebe0] to-[#d5bdaf] opacity-95" />
      
      <div className="relative flex flex-col items-center">
        {/* Cinematic Welcome Text in Warm Brown */}
        <motion.div
          initial={{ opacity: 0, y: 15, letterSpacing: "1.2em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.4em" }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut"
          }}
          className="text-4xl md:text-6xl font-bold text-[#634e3d] uppercase tracking-[0.4em] text-center"
        >
          WELCOME
        </motion.div>

        {/* Animated Line in Toffee Brown */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "200px", opacity: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          className="mt-10 h-[1.5px] bg-[#634e3d]/40"
        />

        {/* Subtle Year/Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-8 text-[10px] font-mono tracking-[0.3em] text-[#634e3d]/60 uppercase"
        >
          WARM INTERFACE // DEVANSH
        </motion.div>
      </div>
    </motion.div>
  );
};
