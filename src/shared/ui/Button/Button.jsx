import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "group relative px-16 py-6 text-[10px] font-black uppercase tracking-[0.4em] rounded-full transition-all hover:scale-105 shadow-xl overflow-hidden cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#bd5cff] to-[#00f5ff] text-white hover:from-[#bd5cff]/90 hover:to-[#00f5ff]/90 shadow-[0_4px_20px_rgba(189,92,255,0.25)] hover:shadow-[0_4px_30px_rgba(0,245,255,0.4)]",
    outline: "border border-white/[0.08] text-white hover:bg-white/[0.05] hover:border-[#00f5ff]/30 backdrop-blur-2xl shadow-none"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
