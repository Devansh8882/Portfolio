import React from 'react';
import { motion } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
      
      <div className="relative flex flex-col items-center">
        <div className="flex gap-[0.2em] overflow-hidden">
          {"WELCOME".split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ 
                opacity: 0, 
                scale: 2,
                filter: "blur(10px)",
                y: 20
              }}
              animate={{ 
                opacity: [0, 1, 0.5, 1],
                scale: [2, 1.2, 1],
                filter: ["blur(10px)", "blur(0px)"],
                y: [20, 0]
              }}
              transition={{ 
                duration: 0.5,
                delay: i * 0.05,
                ease: "easeOut",
                times: [0, 0.2, 0.5, 1]
              }}
              className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter"
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Cinematic Underline */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
          className="mt-6 h-[2px] w-full bg-gradient-to-r from-transparent via-cyber-cyan to-transparent origin-center"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-8 text-[10px] font-mono tracking-[0.8em] text-cyber-cyan uppercase font-bold text-center"
        >
          Protocol_Nexus // Loading_Assets
        </motion.div>
      </div>
    </motion.div>
  );
};
