import React from 'react';
import { motion } from 'framer-motion';

export const ScrollIndicator = ({ visible = true }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 0.8 } : {}}
      transition={{ duration: 1, delay: 2 }}
      className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-8"
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-[1px] h-20 bg-gradient-to-b from-[#2c1810] to-transparent"
      />
      <span className="text-[10px] font-mono tracking-[0.8em] uppercase text-[#2c1810]/40">Pulse</span>
    </motion.div>
  );
};
