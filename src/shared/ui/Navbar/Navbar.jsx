import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Archive', href: '#projects' },
    { name: 'Network', href: '#agents' },
    { name: 'Logic', href: '#methodology' },
    { name: 'Sync', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none"
    >
      <div className={`
        flex items-center gap-12 px-10 py-5 
        bg-black/20 backdrop-blur-3xl 
        border border-white/10 rounded-full 
        pointer-events-auto transition-all duration-700
        ${scrolled ? 'bg-black/40 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' : 'shadow-none'}
      `}>
        {/* Logo Mark */}
        <div className="flex items-center gap-4 pr-6 border-r border-white/10">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-2.5 h-2.5 rounded-full bg-cyber-cyan shadow-[0_0_15px_#06b6d4]" 
          />
          <span className="text-[11px] font-black tracking-[0.2em] text-white uppercase">Nexus.Protocol</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ scale: 1.05, color: '#fff' }}
              whileTap={{ scale: 0.95 }}
              className="text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.2em] hover:text-white transition-all duration-300 cursor-pointer"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Action Button */}
        <div className="pl-6 border-l border-white/10">
          <motion.button
            whileHover={{ 
              backgroundColor: '#06b6d4',
              color: '#000',
              scale: 1.05
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-full transition-all duration-500"
          >
            Connect_Node
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};
