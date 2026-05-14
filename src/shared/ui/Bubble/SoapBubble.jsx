import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const SoapBubble = ({ github, linkedin }) => {
  const [isPopped, setIsPopped] = useState(false);

  // --- CINEMATIC COLLISION VARIANTS (LOCAL) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
    exit: { opacity: 0 }
  };

  const leftCollisionVariants = {
    hidden: { x: -400, opacity: 0, scale: 0.8 },
    visible: { 
      x: [ -400, 30, 0 ], 
      opacity: 1,
      scale: [ 0.8, 1.05, 1 ],
      transition: { 
        type: "spring",
        stiffness: 180,
        damping: 12,
        mass: 0.8,
        duration: 0.8
      }
    }
  };

  const rightCollisionVariants = {
    hidden: { x: 400, opacity: 0, scale: 0.8 },
    visible: { 
      x: [ 400, -30, 0 ], 
      opacity: 1,
      scale: [ 0.8, 1.05, 1 ],
      transition: { 
        type: "spring",
        stiffness: 180,
        damping: 12,
        mass: 0.8,
        duration: 0.8
      }
    }
  };

  const handlePop = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
    setIsPopped(true);
  };

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        {!isPopped ? (
          <motion.div
            key="bubble"
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePop}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0, filter: "blur(20px)" }}
            className="group pointer-events-auto cursor-pointer relative w-56 h-56 rounded-full bg-gradient-to-br from-white/30 to-[#8b5e34]/20 backdrop-blur-md border border-white/40 shadow-[0_30px_60px_rgba(139,94,52,0.2)] flex items-center justify-center overflow-hidden z-50"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-pulse" />
            <div className="absolute top-[15%] left-[20%] w-10 h-5 bg-white/40 blur-[2px] rounded-full rotate-[-30deg]" />

            <div className="relative z-10 flex flex-col items-center gap-2">
              <span className="text-[12px] font-black text-[#2c1810] uppercase tracking-[0.5em] leading-tight">
                Pop to
              </span>
              <span className="text-xl font-black text-[#2c1810] uppercase tracking-tighter">
                Connect
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="terminal"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[1440px] h-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-32 px-6 md:px-12 lg:px-24"
          >
            {/* Local Glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#8b5e34]/5 blur-[120px] pointer-events-none" />

            {/* LEFT: BUTTONS (COLLISION START) */}
            <motion.div
              variants={leftCollisionVariants}
              className="flex flex-col gap-6 flex-1 z-10 w-full"
            >
              {/* Floating & Swaying Wrapper for Buttons */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col gap-6 w-full"
              >
                <div className="mb-8 hidden md:block">
                  <h4 className="text-4xl lg:text-5xl font-black text-[#2c1810] uppercase tracking-tighter leading-none mb-4">
                    Direct <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5e34] to-[#c68642]">Channels</span>
                  </h4>
                  <p className="text-[10px] text-[#8b5e34]/60 font-mono tracking-widest uppercase">Select_Protocol_For_Handshake</p>
                </div>

                <motion.a
                  href={github}
                  target="_blank"
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  className="group relative px-10 py-6 bg-white/40 border border-[#2c1810]/10 rounded-2xl overflow-hidden flex items-center justify-between hover:border-[#8b5e34]/50 transition-colors shadow-xl rotate-[-1deg]"
                >
                  <span className="relative z-10 text-[#2c1810] text-[10px] font-black uppercase tracking-[0.4em]">GitHub</span>
                  <div className="absolute inset-0 bg-[#8b5e34] opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="w-2 h-2 rounded-full bg-[#8b5e34] shadow-[0_0_10px_#8b5e34]" />
                </motion.a>

                <motion.a
                  href={linkedin}
                  target="_blank"
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  className="group relative px-10 py-6 bg-white/40 border border-[#2c1810]/10 rounded-2xl overflow-hidden flex items-center justify-between hover:border-[#8b5e34]/50 transition-colors shadow-xl rotate-[1deg]"
                >
                  <span className="relative z-10 text-[#2c1810] text-[10px] font-black uppercase tracking-[0.4em]">LinkedIn</span>
                  <div className="absolute inset-0 bg-[#8b5e34] opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="w-2 h-2 rounded-full bg-[#8b5e34] shadow-[0_0_10px_#8b5e34]" />
                </motion.a>
              </motion.div>
              
              <button
                onClick={() => setIsPopped(false)}
                className="mt-8 text-[9px] font-mono text-[#8b5e34]/40 uppercase tracking-widest hover:text-[#8b5e34] transition-colors self-start"
              >
                [ Close_Terminal ]
              </button>
            </motion.div>

            {/* RIGHT: CONTACT FORM (COLLISION START) */}
            <motion.div
              variants={rightCollisionVariants}
              className="relative z-20 w-full max-w-[440px]"
            >
              {/* Floating Wrapper for Form */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 0.5, -0.5, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="p-10 bg-white/60 border border-[#2c1810]/10 rounded-[40px] backdrop-blur-3xl shadow-[0_40px_80px_rgba(44,24,16,0.1)] w-full"
              >
                <div className="relative z-10">
                  <div className="mb-8">
                    <span className="text-[9px] font-mono text-[#8b5e34] uppercase tracking-[0.5em] block mb-2">Transmission</span>
                    <h6 className="text-2xl font-black text-[#2c1810] uppercase tracking-tighter">Send Message</h6>
                  </div>

                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                      <label className="text-[8px] font-mono text-[#2c1810]/40 uppercase tracking-widest ml-4">Identifier</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-[#fdfaf6] border border-[#2c1810]/5 rounded-xl text-[#2c1810] text-sm focus:border-[#8b5e34] focus:outline-none transition-all placeholder:opacity-20"
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-mono text-[#2c1810]/40 uppercase tracking-widest ml-4">Address</label>
                      <input
                        type="email"
                        className="w-full px-6 py-4 bg-[#fdfaf6] border border-[#2c1810]/5 rounded-xl text-[#2c1810] text-sm focus:border-[#8b5e34] focus:outline-none transition-all placeholder:opacity-20"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[8px] font-mono text-[#2c1810]/40 uppercase tracking-widest ml-4">Payload</label>
                      <textarea
                        rows="3"
                        className="w-full px-6 py-4 bg-[#fdfaf6] border border-[#2c1810]/5 rounded-xl text-[#2c1810] text-sm focus:border-[#8b5e34] focus:outline-none transition-all resize-none placeholder:opacity-20"
                        placeholder="Message content..."
                      />
                    </div>

                    <button className="w-full py-5 bg-[#2c1810] text-white text-[10px] font-black uppercase tracking-[0.5em] rounded-xl shadow-lg hover:bg-[#8b5e34] transition-colors">
                      Execute Transmission
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
