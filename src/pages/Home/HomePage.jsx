import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Background3D,
  Button,
  MagneticButton,
  ScrollIndicator,
  GrainOverlay,
  SoapBubble
} from '../../shared/ui';
import { agents } from '../../entities/agent/model/agents';
import { projects, experience } from '../../entities/agent/model/cv_data';
import videoSrc from '../../assets/Morph-Lines-To-Text.mp4';
import heroImg from '../../assets/hero.png';

export const HomePage = ({ loading }) => {
  const containerRef = useRef(null);

  // Scroll tracking for cinematic transition
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 3D FOLD TRANSFORMS (Mechanical Door Effect)
  const leftFoldRotate = useTransform(scrollYProgress, [0, 0.7], [0, -85]);
  const rightFoldRotate = useTransform(scrollYProgress, [0, 0.7], [0, 85]);
  const foldOpacity = useTransform(scrollYProgress, [0.2, 0.8], [1, 0.05]);
  const foldScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.8]);

  // Nexus Reveal Transforms (Slower & More Majestic)
  const nexusScale = useTransform(scrollYProgress, [0.1, 0.8], [0.6, 1.1]);
  const nexusOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  // 3D Text Rotation (Slower Sync)
  const textRotateX = useTransform(scrollYProgress, [0.1, 0.8], [15, 0]);
  const textRotateY = useTransform(scrollYProgress, [0.1, 0.8], [-5, 5]);
  const textZ = useTransform(scrollYProgress, [0.1, 0.8], [-400, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#fdfaf6] font-sans text-[#2c1810] perspective-[2000px]">
      {/* 1. HERO SECTION (STICKY FOLDING SYSTEM) */}
      <section className="relative h-[500vh]">
        <div className="sticky top-0 h-screen w-full flex overflow-hidden">

          {/* Left Folding Panel: IDENTITY */}
          <motion.div
            style={{
              rotateY: leftFoldRotate,
              opacity: foldOpacity,
              transformOrigin: "left center",
              scale: foldScale
            }}
            className="relative w-1/2 h-full bg-[#fdfaf6] border-r border-[#2c1810]/10 z-30 flex flex-col items-center justify-center overflow-hidden px-12"
          >
            <div className="absolute inset-0 z-0">
              <Background3D />
            </div>
            <div className="relative z-10 w-full text-right">
              <h1 className="text-[8vw] font-black leading-[0.85] tracking-tighter uppercase text-[#2c1810]">
                DEVANSH<br />MISHRA
              </h1>
              <div className="mt-6 w-20 h-[2px] bg-[#8b5e34] ml-auto" />
            </div>
          </motion.div>

          {/* Right Folding Panel: PROFESSION */}
          <motion.div
            style={{
              rotateY: rightFoldRotate,
              opacity: foldOpacity,
              transformOrigin: "right center",
              scale: foldScale
            }}
            className="relative w-1/2 h-full bg-[#fdfaf6] border-l border-[#2c1810]/10 z-30 flex flex-col items-center justify-center overflow-hidden px-12"
          >
            <div className="absolute inset-0 z-0 scale-x-[-1]">
              <Background3D />
            </div>
            <div className="relative z-10 w-full text-left">
              <h2 className="text-[8vw] font-black leading-[0.85] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#8b5e34] to-[#c68642]">
                AI & WEB<br />SOLUTIONS
              </h2>
              <div className="mt-6 w-20 h-[2px] bg-[#8b5e34]" />
            </div>
          </motion.div>

          {/* BACKGROUND DEPTH (REVEALED WHEN DOORS OPEN) */}
          <motion.div
            style={{
              opacity: nexusOpacity,
              scale: nexusScale,
              perspective: "1000px"
            }}
            className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#fdfaf6]"
          >
            {/* Atmospheric Glow Halo */}
            <div className="absolute w-[600px] h-[600px] bg-[#8b5e34]/10 blur-[120px] rounded-full" />

            {/* The 3D Rotating Status Card */}
            <motion.div
              style={{
                rotateX: textRotateX,
                rotateY: textRotateY,
                translateZ: textZ,
                transformStyle: "preserve-3d"
              }}
              className="relative p-16 md:p-24 bg-white/40 backdrop-blur-2xl border border-[#8b5e34]/10 rounded-[60px] shadow-[0_50px_100px_rgba(44,24,16,0.1)] max-w-3xl w-[90%] flex flex-col items-center text-center overflow-hidden"
            >
              {/* Background Image with Parallax */}
              <motion.div
                style={{ y: useTransform(scrollYProgress, [0, 0.6], [20, -20]) }}
                className="absolute inset-0 z-0 opacity-20"
              >
                <img src={heroImg} alt="" className="w-full h-full object-cover" />
              </motion.div>
              {/* Internal 3D Elements */}
              <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-4 h-4 rounded-full bg-[#8b5e34] mb-12 mx-auto shadow-[0_0_30px_#8b5e34]"
                />

                <span className="text-[12px] font-mono text-[#8b5e34] uppercase tracking-[0.6em] mb-6 block font-bold">
                  Entrance // Initialize_Universe
                </span>

                <h3 className="text-5xl md:text-8xl font-black text-[#2c1810] uppercase tracking-tighter leading-[0.8] mb-12">
                  The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#8b5e34] to-[#c68642]">Nexus</span>
                </h3>

                <div className="flex gap-6 justify-center">
                  <div className="px-6 py-3 bg-[#2c1810] text-[#fdfaf6] text-[10px] font-mono uppercase tracking-widest rounded-xl shadow-xl">
                    User_Verified
                  </div>
                  <div className="px-6 py-3 border-2 border-[#8b5e34]/20 text-[#8b5e34] text-[10px] font-mono uppercase tracking-widest rounded-xl">
                    Access_Granted
                  </div>
                </div>
              </div>

              {/* Decorative 3D Corners */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-[#8b5e34]/30 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-[#8b5e34]/30 rounded-br-3xl" />
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <ScrollIndicator visible={!loading} />
        </div>
      </section>

      {/* 2. AGENT NEXUS: THE KINETIC TERMINAL */}
      <section className="relative z-20 bg-[#fdfaf6] py-32 overflow-hidden min-h-screen">
        <div className="px-6 mb-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            <span className="text-[10px] font-mono tracking-[1em] text-[#8b5e34] uppercase font-bold">
              Sub_System // Draggable_Nodes
            </span>
            <h3 className="text-6xl md:text-8xl font-black text-[#2c1810] tracking-tighter uppercase leading-none">
              The Agent <span className="text-[#8b5e34]">Nexus</span>
            </h3>
          </motion.div>
        </div>

        {/* Workspace for Draggable Windows */}
        <div className="relative w-full h-[600px] md:h-[800px] cursor-crosshair">
          {/* Background Grid for the "Software" vibe */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#2c1810_1px,transparent_1px),linear-gradient(to_bottom,#2c1810_1px,transparent_1px)] [background-size:40px_40px]" />

          <div className="flex gap-12 px-6 md:px-[10vw] h-full items-center overflow-x-auto no-scrollbar snap-x">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.id}
                drag
                dragConstraints={{ left: -500, right: 500, top: -200, bottom: 200 }}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                initial={{ opacity: 0, scale: 0.9, x: index * 50 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="snap-center shrink-0 w-[85vw] md:w-[420px] group cursor-grab active:cursor-grabbing"
              >
                {/* Terminal Window Header */}
                <div className="flex items-center justify-between px-6 py-3 bg-[#2c1810] rounded-t-[20px] border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                      <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                      <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[9px] font-mono text-white/40 tracking-[0.2em] uppercase">
                      Node_ID: {agent.id.slice(0, 8)}
                    </span>
                  </div>

                  {/* REAL-TIME COORDINATE TRACKER (Software Vibe) */}
                  <div className="hidden group-hover:flex items-center gap-3 font-mono text-[8px] text-[#8b5e34]">
                    <span>STATUS: {agent.status}</span>
                  </div>
                </div>

                {/* Mechanical Body */}
                <div className="relative p-8 bg-white border-x border-b border-[#2c1810]/5 rounded-b-[20px] shadow-[0_30px_60px_rgba(44,24,16,0.05)] overflow-hidden">
                  {/* Decorative Mounting Bolts */}
                  <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-[#2c1810]/10 border border-[#2c1810]/20" />
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#2c1810]/10 border border-[#2c1810]/20" />
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-[#2c1810]/10 border border-[#2c1810]/20" />
                  <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-[#2c1810]/10 border border-[#2c1810]/20" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#f5ebe0] border border-[#2c1810]/5">
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[7px] font-mono text-[#8b5e34] uppercase tracking-widest">Initialization_Vector</span>
                        <div className="w-12 h-1 bg-[#8b5e34]/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "70%" }}
                            className="h-full bg-[#8b5e34]"
                          />
                        </div>
                      </div>
                    </div>

                    <h4 className="text-2xl font-black text-[#2c1810] mb-1 uppercase tracking-tighter">
                      {agent.name}
                    </h4>
                    <p className="text-[9px] font-bold text-[#8b5e34] tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8b5e34]/30" />
                      {agent.role}
                    </p>

                    <p className="text-[13px] text-[#5d4037]/70 leading-relaxed mb-8 font-medium italic border-l-2 border-[#f5ebe0] pl-4">
                      {agent.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {agent.capabilities.slice(0, 2).map(cap => (
                        <div key={cap} className="p-3 bg-[#fdfaf6] border border-[#2c1810]/5 rounded-lg">
                          <span className="block text-[7px] font-mono text-[#8b5e34] uppercase mb-1">CAPABILITY</span>
                          <span className="text-[9px] font-bold text-[#2c1810] uppercase tracking-tight">{cap}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {agent.capabilities.slice(2).map(cap => (
                        <span key={cap} className="px-3 py-1 bg-[#2c1810]/5 text-[7px] font-black tracking-widest text-[#2c1810]/40 rounded-full uppercase">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE CV MATRIX: THE RIBBON OF IMPACT */}
      <section className="relative z-20 bg-[#fdfaf6] py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-32 flex flex-col items-center text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] font-mono tracking-[1em] text-[#8b5e34] uppercase font-bold mb-6"
            >
              Operational_History // Experience
            </motion.span>
            <h3 className="text-6xl md:text-9xl font-black text-[#2c1810] tracking-tighter uppercase leading-[0.8]">
              The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#8b5e34] to-[#c68642]">Matrix</span>
            </h3>
          </div>

          <div className="relative">
            {/* 3D Timeline Center Line */}
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-[#2c1810]/5 via-[#8b5e34]/20 to-[#2c1810]/5 hidden md:block" />

            {projects.map((proj, index) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? 10 : -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className={`relative flex flex-col md:flex-row items-center gap-12 mb-40 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Visual Indicator (Node) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#fdfaf6] border-2 border-[#8b5e34] z-10 hidden md:block shadow-[0_0_20px_rgba(139,94,52,0.3)]" />

                {/* Content Panel */}
                <div className="w-full md:w-[45%] group">
                  <div className="relative p-12 bg-white/40 border border-[#2c1810]/5 rounded-[40px] backdrop-blur-xl hover:bg-white/80 transition-all duration-700 shadow-xl shadow-black/[0.02]">
                    <span className="text-[10px] font-mono font-bold text-[#8b5e34] mb-4 block tracking-widest">{proj.year} // {proj.company}</span>
                    <h4 className="text-4xl font-black text-[#2c1810] mb-6 uppercase tracking-tighter">{proj.title}</h4>
                    <p className="text-sm text-[#5d4037]/80 leading-relaxed mb-10 font-medium italic">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {proj.tech.map(t => (
                        <span key={t} className="px-4 py-1.5 bg-[#2c1810] text-[8px] font-black tracking-widest text-white rounded-full uppercase">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-8 border-t border-[#2c1810]/5 pt-8">
                      {proj.metrics.map(metric => (
                        <div key={metric}>
                          <span className="block text-[8px] font-mono text-[#8b5e34] uppercase mb-1">Metric_Data</span>
                          <span className="text-xs font-bold text-[#2c1810]">{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visual Depth Decoration */}
                <div className="hidden md:block w-[45%] h-64 bg-[#f5ebe0]/30 rounded-[40px] border border-[#2c1810]/5 relative overflow-hidden group-hover:bg-[#f5ebe0]/50 transition-all duration-700">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2c1810_1px,transparent_1px)] [background-size:15px_15px]" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <span className="text-[12vw] font-black text-[#8b5e34] uppercase leading-none select-none">0{index + 1}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Professional Experience Summary */}
          <div className="mt-32 p-12 bg-[#2c1810] rounded-[60px] text-[#fdfaf6] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#8b5e34]/20 blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-4xl">
              <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 leading-none">
                Synthesizing the <br /><span className="text-[#8b5e34]">Next Evolution</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {experience.map(exp => (
                  <div key={exp.period}>
                    <span className="text-[10px] font-mono text-[#8b5e34] uppercase tracking-[0.3em] block mb-4">{exp.period}</span>
                    <h5 className="text-xl font-bold uppercase mb-4 tracking-tight">{exp.role} // {exp.organization}</h5>
                    <p className="text-sm text-[#fdfaf6]/60 leading-relaxed font-medium">{exp.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SOAP BUBBLE CONTACT TERMINAL */}
          <div className="mt-32">
            <div className="text-center mb-12">
              <h5 className="text-[10px] font-mono text-[#8b5e34] uppercase tracking-[0.5em] mb-4">Transmission // Connect</h5>
              <p className="text-sm text-[#2c1810]/40 font-medium">Interact with the liquid interface to initialize contact.</p>
            </div>
            <SoapBubble
              github="https://github.com"
              linkedin="https://linkedin.com"
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
};
