import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "group relative px-16 py-6 text-[10px] font-black uppercase tracking-[0.4em] rounded-full transition-all hover:scale-105 shadow-xl overflow-hidden";
  
  const variants = {
    primary: "bg-[#2c1810] text-[#fdfaf6] hover:bg-[#4a2c1f]",
    outline: "border-2 border-[#2c1810]/10 text-[#2c1810] hover:bg-[#2c1810]/5 backdrop-blur-2xl shadow-none"
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
