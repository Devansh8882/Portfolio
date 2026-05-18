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
import { projects, experience, skills } from '../../entities/agent/model/cv_data';
import videoSrc from '../../assets/Morph-Lines-To-Text.mp4';
import heroImg from '../../assets/hero.png';
import contactImg from '../../assets/Contact us-bro.svg';
import processImg from '../../assets/Minimalist Work Scene.png';
import { useTilt } from '../../shared/hooks/useTilt';

const ProjectCard = ({ proj, index, scrollYProgress }) => {
  const yParallax = useTransform(scrollYProgress, [0.4, 0.8], [0, index % 2 === 0 ? -100 : 100]);
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(10);
  
  // SCRUBBABLE X-TRANSFORMS
  const xOffset = useTransform(
    scrollYProgress, 
    [0.3 + (index * 0.1), 0.5 + (index * 0.1)], 
    [index % 2 === 0 ? -200 : 200, 0]
  );
  const opacity = useTransform(scrollYProgress, [0.3 + (index * 0.1), 0.4 + (index * 0.1)], [0, 1]);

  return (
    <motion.div
      style={{ x: xOffset, opacity }}
      className={`relative flex flex-col md:flex-row items-center gap-12 mb-40 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#030209] border-2 border-[#00f5ff] shadow-[0_0_10px_#00f5ff] z-10 hidden md:block" />
      <div className="w-full md:w-[45%] group perspective-[1000px]">
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative p-12 bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:bg-white/[0.05] hover:border-[#00f5ff]/30 transition-all duration-500 cursor-pointer rounded-[40px] shadow-2xl"
        >
          <span className="text-[10px] font-mono font-bold text-[#bd5cff] mb-4 block tracking-widest">{proj.year} // {proj.company}</span>
          <h4 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">{proj.title}</h4>
          <p className="text-sm text-slate-300/80 leading-relaxed mb-10 font-medium italic">{proj.description}</p>
          <div className="flex flex-wrap gap-2 mb-10">
            {proj.tech.map(t => (
              <span key={t} className="px-4 py-1.5 bg-white/[0.04] text-[8px] font-bold tracking-widest text-[#00f5ff] border border-white/[0.08] rounded-full uppercase">{t}</span>
            ))}
          </div>
          <div className="flex gap-8 border-t border-white/[0.08] pt-8">
            {proj.metrics.map(metric => (
              <div key={metric}>
                <span className="block text-[8px] font-mono text-white/40 uppercase mb-1">Metric_Data</span>
                <span className="text-xs font-bold text-[#00f5ff]">{metric}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div style={{ y: yParallax }} className="hidden md:block w-[45%] h-64 bg-white/[0.01] rounded-[40px] border border-white/[0.08] relative overflow-hidden group-hover:bg-white/[0.03] transition-all duration-700">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(rgba(0,245,255,0.15)_1px,transparent_1px)] [background-size:15px_15px]" />
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10 + index * 2, repeat: Infinity, ease: "linear" }} className="absolute inset-0 flex items-center justify-center opacity-20">
          <span className="text-[12vw] font-black text-[#bd5cff]/10 uppercase leading-none select-none">0{index + 1}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const AgentCard = ({ agent, index }) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(15);

  return (
    <motion.div
      key={agent.id}
      initial={{ scale: 0.5, x: 200, opacity: 0, rotate: 10 }}
      whileInView={{ 
        scale: 1, 
        x: 0, 
        opacity: 1, 
        rotate: 0,
        transition: { 
          duration: 0.8, 
          delay: index * 0.1,
          ease: [0.16, 1, 0.3, 1] 
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      drag
      dragConstraints={{ left: -500, right: 500, top: -200, bottom: 200 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      className="snap-center shrink-0 w-[85vw] md:w-[420px] group cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center justify-between px-6 py-3 bg-[#0d0b21]/80 backdrop-blur-md rounded-t-[20px] border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
            <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
            <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-[9px] font-mono text-white/40 tracking-[0.2em] uppercase">Node_ID: {agent.id.slice(0, 8)}</span>
        </div>
        <div className="hidden group-hover:flex items-center gap-3 font-mono text-[8px] text-[#bd5cff]">
          <span>STATUS: {agent.status}</span>
        </div>
      </div>
      <div className="relative p-8 bg-white/[0.02] border-x border-b border-white/[0.08] rounded-b-[20px] backdrop-blur-xl shadow-2xl overflow-hidden">
        <motion.div animate={{ y: ["-100%", "300%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-[#00f5ff]/10 to-transparent z-0 pointer-events-none" />
        <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/20" />
        <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/20" />
        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/20" />
        <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-[#00f5ff]/10 border border-[#00f5ff]/20" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-8">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.08]">
              <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[7px] font-mono text-white/40 uppercase tracking-widest">Initialization_Vector</span>
              <div className="w-12 h-1 bg-white/[0.08] rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "70%" }} className="h-full bg-gradient-to-r from-[#bd5cff] to-[#00f5ff]" />
              </div>
            </div>
          </div>
          <h4 className="text-2xl font-black text-white mb-1 uppercase tracking-tighter">{agent.name}</h4>
          <p className="text-[9px] font-bold text-[#00f5ff] tracking-[0.2em] uppercase mb-6 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00f5ff]/30" />{agent.role}</p>
          <p className="text-[13px] text-white/70 leading-relaxed mb-8 font-medium italic border-l-2 border-white/[0.08] pl-4">{agent.description}</p>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {agent.capabilities.slice(0, 2).map(cap => (
              <div key={cap} className="p-3 bg-white/[0.02] border border-white/[0.08] rounded-lg">
                <span className="block text-[7px] font-mono text-[#bd5cff] uppercase mb-1">CAPABILITY</span>
                <span className="text-[9px] font-bold text-white uppercase tracking-tight">{cap}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities.slice(2).map(cap => (
              <span key={cap} className="px-3 py-1 bg-white/[0.04] text-[7px] font-black tracking-widest text-white/50 border border-white/[0.08] rounded-full uppercase">{cap}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const MethodologyItem = ({ item, i }) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(15);

  return (
    <motion.div
      initial={{ scale: 0.5, y: 40, opacity: 0 }}
      whileInView={{ 
        scale: 1, 
        y: 0, 
        opacity: 1,
        transition: { 
          duration: 0.6, 
          delay: i * 0.05,
          ease: "easeOut"
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
      <motion.div
        whileHover={{ 
          y: -10, 
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderColor: "rgba(0, 245, 255, 0.4)" 
        }}
        className="p-8 border border-white/[0.08] rounded-3xl bg-white/[0.02] backdrop-blur-md transition-all duration-500 cursor-pointer shadow-xl"
      >
        <div className="flex justify-between items-start mb-6">
          <span className="block text-[9px] font-mono font-black text-[#bd5cff] uppercase tracking-widest">{item.label}</span>
          <span className="text-2xl">{item.icon}</span>
        </div>
        <h5 className="text-xl font-bold text-white tracking-tight">{item.value}</h5>
        <div className="mt-6 h-[2px] w-full bg-white/[0.08] overflow-hidden rounded-full">
          <motion.div 
            initial={{ x: "-100%" }} 
            whileInView={{ x: "100%" }} 
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }} 
            className="h-full w-2/3 bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" 
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillTag = ({ skill, i }) => {
  return (
    <motion.span
      initial={{ scale: 0, opacity: 0, y: 20 }}
      whileInView={{ 
        scale: 1, 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.4, 
          delay: i * 0.02,
          ease: "easeOut"
        }
      }}
      viewport={{ once: true }}
      className="px-4 py-2 bg-white/[0.03] text-[9px] font-black tracking-widest text-white/90 rounded-full uppercase border border-white/[0.08] hover:border-[#00f5ff]/30 hover:bg-white/[0.06] transition-all duration-300"
    >
      {skill}
    </motion.span>
  );
};

const HeroBackground = ({ scrollYProgress, heroImg }) => {
  const y = useTransform(scrollYProgress, [0, 0.6], [20, -20]);
  return (
    <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-10">
      <img src={heroImg} alt="" className="w-full h-full object-cover" />
    </motion.div>
  );
};

const ContactSection = ({ contactImg, github, linkedin }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 100 }}
      whileInView={{ 
        scale: 1, 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="mt-32 relative"
    >
      <motion.div 
        animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.12, 0.05], rotate: [0, 1, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <img src={contactImg} alt="" className="w-full max-w-4xl blur-[2px]" />
      </motion.div>
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h5 className="text-[10px] font-mono text-[#bd5cff] uppercase tracking-[0.5em] mb-4">Transmission // Connect</h5>
          <p className="text-sm text-white/40 font-medium">Interact with the bubble to initialize contact.</p>
        </div>
        <SoapBubble github={github} linkedin={linkedin} />
      </div>
    </motion.div>
  );
};

export const HomePage = ({ loading }) => {
  const containerRef = useRef(null);

  // Scroll tracking for cinematic transition
  const { scrollYProgress: rawScrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollYProgress = useSpring(rawScrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3D FOLD TRANSFORMS (Mechanical Door Effect) - Accelerated
  const leftFoldRotate = useTransform(scrollYProgress, [0, 0.35], [0, -85]);
  const rightFoldRotate = useTransform(scrollYProgress, [0, 0.35], [0, 85]);
  const foldOpacity = useTransform(scrollYProgress, [0.1, 0.4], [1, 0.05]);
  const foldScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.8]);

  // Nexus Reveal Transforms (Slower & More Majestic)
  const nexusScale = useTransform(scrollYProgress, [0.05, 0.5], [0.6, 1.1]);
  const nexusOpacity = useTransform(scrollYProgress, [0.05, 0.3], [0, 1]);

  // 3D Text Rotation (Slower Sync)
  const textRotateX = useTransform(scrollYProgress, [0.1, 0.8], [15, 0]);
  const textRotateY = useTransform(scrollYProgress, [0.1, 0.8], [-5, 5]);
  const textZ = useTransform(scrollYProgress, [0.1, 0.8], [-400, 0]);

  return (
    <div ref={containerRef} className="relative bg-[#030209] font-sans text-white perspective-[2000px]">
      
      {/* 🧭 SECTION PROGRESS NAVIGATOR */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col gap-8 items-center">
        <div className="h-32 w-[1px] bg-white/10 relative overflow-hidden rounded-full">
          <motion.div 
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute inset-0 bg-[#00f5ff] shadow-[0_0_10px_#00f5ff]" 
          />
        </div>
        <div className="flex flex-col gap-4">
          {['Hero', 'Nexus', 'Matrix', 'Method', 'Connect'].map((label, idx) => (
            <div key={label} className="group relative flex items-center">
              <motion.div 
                animate={{ 
                  scale: scrollYProgress.get() > (idx * 0.2) ? 1.5 : 1,
                  backgroundColor: scrollYProgress.get() > (idx * 0.2) ? "#00f5ff" : "rgba(255,255,255,0.15)"
                }}
                className="w-1.5 h-1.5 rounded-full transition-all duration-300" 
              />
              <span className="absolute left-6 text-[8px] font-mono font-black text-[#00f5ff] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest pointer-events-none">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
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
            className="relative w-1/2 h-full bg-[#030209] border-r border-white/[0.08] z-30 flex flex-col items-center justify-center overflow-hidden px-12"
          >
            <div className="absolute inset-0 z-0">
              <Background3D />
            </div>
            <div className="relative z-10 w-full text-right animate-pulse-slow">
              <h1 className="text-[8vw] font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)]">
                DEVANSH<br />MISHRA
              </h1>
              <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-[#bd5cff] to-[#00f5ff] ml-auto" />
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
            className="relative w-1/2 h-full bg-[#030209] border-l border-white/[0.08] z-30 flex flex-col items-center justify-center overflow-hidden px-12"
          >
            <div className="absolute inset-0 z-0 scale-x-[-1]">
              <Background3D />
            </div>
            <div className="relative z-10 w-full text-left">
              <h2 className="text-[8vw] font-black leading-[0.85] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#bd5cff] to-[#00f5ff] drop-shadow-[0_2px_20px_rgba(0,245,255,0.25)]">
                FULL STACK<br />ENGINEER
              </h2>
              <div className="mt-6 w-20 h-[2px] bg-gradient-to-r from-[#bd5cff] to-[#00f5ff]" />
            </div>
          </motion.div>

          {/* BACKGROUND DEPTH (REVEALED WHEN DOORS OPEN) */}
          <motion.div
            style={{
              opacity: nexusOpacity,
              scale: nexusScale,
              perspective: "1000px"
            }}
            className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#030209]"
          >
            {/* Atmospheric Glow Halo */}
            <div className="absolute w-[600px] h-[600px] bg-[#bd5cff]/10 blur-[120px] rounded-full shadow-[0_0_120px_rgba(189,92,255,0.15)]" />

            {/* The 3D Rotating Status Card */}
            <motion.div
              style={{
                rotateX: textRotateX,
                rotateY: textRotateY,
                translateZ: textZ,
                transformStyle: "preserve-3d"
              }}
              className="relative p-16 md:p-24 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] rounded-[60px] max-w-3xl w-[90%] flex flex-col items-center text-center overflow-hidden shadow-2xl"
            >
              <HeroBackground scrollYProgress={scrollYProgress} heroImg={heroImg} />
              {/* Internal 3D Elements */}
              <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-4 h-4 rounded-full bg-[#00f5ff] mb-12 mx-auto shadow-[0_0_12px_#00f5ff]"
                />

                <span className="text-[12px] font-mono text-white/40 uppercase tracking-[0.6em] mb-6 block font-bold">
                  Entrance // Initialize_Universe
                </span>

                <h3 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-12">
                  The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd5cff] to-[#00f5ff]">Nexus</span>
                </h3>

                <div className="flex gap-6 justify-center">
                  <MagneticButton>
                    <div className="px-6 py-3 bg-gradient-to-r from-[#bd5cff] to-[#00f5ff] text-white text-[10px] font-mono uppercase tracking-widest rounded-xl font-extrabold shadow-[0_4px_20px_rgba(189,92,255,0.3)]">
                      User_Verified
                    </div>
                  </MagneticButton>
                  <MagneticButton>
                    <div className="px-6 py-3 border border-white/[0.08] text-white/70 text-[10px] font-mono uppercase tracking-widest rounded-xl hover:text-white hover:border-[#00f5ff]/35 hover:bg-white/[0.02] transition-colors">
                      Access_Granted
                    </div>
                  </MagneticButton>
                </div>
              </div>

              {/* Decorative 3D Corners */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-[#bd5cff]/30 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-4 border-r-4 border-[#bd5cff]/30 rounded-br-3xl" />
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <ScrollIndicator visible={!loading} />
        </div>
      </section>

      {/* 2. AGENT NEXUS: THE KINETIC TERMINAL */}
      <section className="relative z-20 bg-[#030209] py-32 overflow-hidden min-h-screen">
        <div className="px-6 mb-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-2"
          >
            <span className="text-[10px] font-mono tracking-[1em] text-white/40 uppercase font-bold">
              Sub_System // Draggable_Nodes
            </span>
            <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">
              The Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd5cff] to-[#00f5ff]">Nexus</span>
            </h3>
          </motion.div>
        </div>

        {/* Workspace for Draggable Windows */}
        <div className="relative w-full h-[600px] md:h-[800px] cursor-crosshair">
          {/* Background Grid for the "Software" vibe */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:40px_40px]" />

          <div className="flex gap-12 px-6 md:px-[10vw] h-full items-center overflow-x-auto no-scrollbar snap-x">
            {agents.map((agent, index) => (
              <AgentCard 
                key={agent.id} 
                agent={agent} 
                index={index} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE CV MATRIX: THE RIBBON OF IMPACT */}
      <section className="relative z-20 bg-[#030209] py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-32 flex flex-col items-center text-center">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] font-mono tracking-[1em] text-white/40 uppercase font-bold mb-6"
            >
              Operational_History // Experience
            </motion.span>
            <h3 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.8]">
              The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd5cff] to-[#00f5ff]">Matrix</span>
            </h3>
          </div>

          <div className="relative">
            {/* 3D Timeline Center Line */}
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-white/5 via-[#00f5ff]/20 to-white/5 hidden md:block" />

            {projects.map((proj, index) => (
              <ProjectCard 
                key={proj.id} 
                proj={proj} 
                index={index} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </div>

          {/* Final Professional Experience Summary */}
          <motion.div 
            style={{ 
              scale: useTransform(scrollYProgress, [0.55, 0.7], [0.8, 1]),
              y: useTransform(scrollYProgress, [0.55, 0.7], [100, 0]),
              opacity: useTransform(scrollYProgress, [0.55, 0.65], [0, 1])
            }}
            className="mt-32 p-12 bg-white/[0.02] border border-white/[0.08] rounded-[60px] text-white backdrop-blur-2xl overflow-hidden relative shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#bd5cff]/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-4xl">
              <h4 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-12 leading-none">
                Synthesizing the <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd5cff] to-[#00f5ff]">Next Evolution</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {experience.map(exp => (
                  <div key={exp.period}>
                    <span className="text-[10px] font-mono text-[#bd5cff] uppercase tracking-[0.3em] block mb-4">{exp.period}</span>
                    <h5 className="text-xl font-bold uppercase mb-4 tracking-tight">{exp.role} // {exp.organization}</h5>
                    <p className="text-sm text-white/60 leading-relaxed font-medium">{exp.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
          
          {/* 4. PROFESSIONAL METHODOLOGY: THE BLUEPRINT */}
          <section className="mt-40 relative px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-20">
              <motion.div 
                style={{ 
                  x: useTransform(scrollYProgress, [0.7, 0.85], [-200, 0]),
                  opacity: useTransform(scrollYProgress, [0.7, 0.8], [0, 1])
                }}
                className="w-full md:w-1/2"
              >
                <motion.div 
                  whileHover={{ scale: 1.02, rotate: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group cursor-none"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#bd5cff]/20 to-transparent blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000" />
                  <motion.img 
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    src={processImg} 
                    alt="Work Process" 
                    className="relative w-full rounded-[40px] transition-all duration-700 opacity-90 group-hover:opacity-100" 
                  />
                </motion.div>
              </motion.div>

              <motion.div 
                style={{ 
                  x: useTransform(scrollYProgress, [0.7, 0.85], [200, 0]),
                  opacity: useTransform(scrollYProgress, [0.7, 0.8], [0, 1])
                }}
                className="w-full md:w-1/2"
              >
                <span className="text-[10px] font-mono tracking-[1em] text-white/40 uppercase font-bold mb-6 block">
                  Workflow // Synergy
                </span>
                <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-8 leading-none">
                  Precision <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bd5cff] to-[#00f5ff]">Methodology</span>
                </h3>
                <p className="text-lg text-white/70 leading-relaxed mb-10 font-medium italic">
                  I believe in a synthesis of design intuition and engineering precision. Every pixel is calculated, and every interaction is intentional.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { label: "Analyze", value: "Neural Mapping", icon: "🧠" },
                    { label: "Design", value: "Visual Synthesis", icon: "🎨" },
                    { label: "Code", value: "Logic Flow", icon: "💻" },
                    { label: "Deploy", value: "Global Reach", icon: "🚀" }
                  ].map((item, i) => (
                    <MethodologyItem 
                      key={i} 
                      item={item} 
                      i={i} 
                    />
                  ))}
                </div>

                {/* Skill Arsenal Tag Cloud */}
                <div className="mt-12 flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <SkillTag 
                      key={skill} 
                      skill={skill} 
                      i={i}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* SOAP BUBBLE CONTACT TERMINAL */}
          <ContactSection 
            contactImg={contactImg} 
            github="https://github.com/Devansh8882" 
            linkedin="https://www.linkedin.com/in/devansh-mishra-dm0020/" 
          />

    </div>
  );
};
