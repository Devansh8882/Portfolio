import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Background3D,
  MagneticButton,
  ScrollIndicator,
  GrainOverlay,
} from '../../shared/ui';
import { agents } from '../../entities/agent/model/agents';
import { projects, experience, skills } from '../../entities/agent/model/cv_data';
import heroImg from '../../assets/hero.png';
import contactImg from '../../assets/Contact us-bro.svg';
import processImg from '../../assets/Minimalist Work Scene.png';
import { useTilt } from '../../shared/hooks/useTilt';

const ProjectCard = ({ proj, index, scrollYProgress }) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(10);
  const opacity = useInViewOpacity(0.1 + index * 0.05);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative flex flex-col md:flex-row items-center gap-12 mb-40 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className="w-full md:w-[50%] group perspective-[1000px]">
        <motion.div 
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="relative p-10 bg-background-surface/40 border border-white/5 rounded-[40px] backdrop-blur-xl hover:border-cyber-cyan/30 transition-colors duration-700 cursor-pointer overflow-hidden group"
        >
          {/* Internal Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/5 to-cyber-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10">
            <span className="text-[10px] font-mono font-bold text-cyber-cyan mb-4 block tracking-[0.3em] uppercase">{proj.year} // {proj.company}</span>
            <h4 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">{proj.title}</h4>
            <p className="text-sm text-white/50 leading-relaxed mb-10 font-medium">{proj.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-10">
              {proj.tech.map(t => (
                <span key={t} className="px-4 py-1.5 bg-white/5 text-[8px] font-black tracking-widest text-white/70 rounded-full uppercase border border-white/10">{t}</span>
              ))}
            </div>

            <div className="flex gap-8 border-t border-white/5 pt-8">
              {proj.metrics.map(metric => (
                <div key={metric}>
                  <span className="block text-[8px] font-mono text-cyber-violet uppercase mb-1">Metric_Data</span>
                  <span className="text-xs font-bold text-white">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hidden md:block w-[40%] h-[300px] bg-background-surface rounded-[40px] border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[15vw] font-black text-white leading-none select-none">0{index + 1}</span>
        </div>
      </div>
    </motion.div>
  );
};

const AgentCard = ({ agent, index }) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(15);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="snap-center shrink-0 w-[85vw] md:w-[400px] group"
    >
      <div className="relative p-8 bg-background-surface border border-white/5 rounded-[32px] overflow-hidden group-hover:border-cyber-violet/30 transition-colors duration-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-violet/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyber-violet to-cyber-cyan flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            {agent.icon || "🤖"}
          </div>
          <div>
            <h5 className="font-bold text-white uppercase tracking-tight">{agent.name}</h5>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{agent.role}</span>
          </div>
        </div>

        <p className="text-sm text-white/60 leading-relaxed mb-8">{agent.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          {agent.stats && Object.entries(agent.stats).map(([label, val]) => (
            <div key={label} className="p-3 bg-white/5 rounded-xl border border-white/5">
              <span className="block text-[8px] font-mono text-white/30 uppercase mb-1">{label}</span>
              <span className="text-xs font-bold text-cyber-cyan">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const MethodologyItem = ({ item, i }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}
    className="p-6 bg-background-surface border border-white/5 rounded-2xl hover:border-cyber-cyan/20 transition-colors group"
  >
    <div className="text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
    <span className="block text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">{item.label}</span>
    <h6 className="font-bold text-white uppercase">{item.value}</h6>
  </motion.div>
);

const HeroSection = ({ scrollYProgress }) => {
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Background3D />
      </div>
      
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center"
      >
        <div className="relative group text-center">
          <div className="absolute -inset-20 bg-gradient-to-r from-cyber-cyan/10 via-cyber-violet/10 to-cyber-cyan/10 blur-[120px] opacity-50" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse shadow-[0_0_10px_#06b6d4]" />
              <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-[0.5em] font-bold">System_Online // Protocol_Nexus</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-8 leading-[0.8] uppercase">
              The <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-violet to-cyber-cyan bg-[length:200%_auto] animate-gradient-x">Artifact</span>
            </h1>
            
            <p className="max-w-xl mx-auto text-white/40 text-sm md:text-base font-medium mb-12">
              Engineering high-fidelity digital experiences where <span className="text-white">logic</span> meets <span className="text-white">kinetic art</span>.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <MagneticButton>
                <div className="px-10 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
                  Initiate_Sequence
                </div>
              </MagneticButton>
              <div className="px-10 py-4 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white/5 transition-colors cursor-pointer">
                Access_Archive
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
};

export const HomePage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="bg-background-dark text-white selection:bg-cyber-cyan/30 selection:text-cyber-cyan">
      <GrainOverlay />
      
      <HeroSection scrollYProgress={scrollYProgress} />

      {/* Projects */}
      <section className="relative py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-32">
            <span className="text-[10px] font-mono font-bold text-cyber-cyan uppercase tracking-[0.5em] mb-4 block">Archive_01</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">Selected Works</h2>
          </div>

          <div className="space-y-40">
            {projects.map((proj, i) => (
              <ProjectCard key={proj.id} proj={proj} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </section>

      {/* Agents */}
      <section className="relative py-40 bg-background-surface/30">
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <span className="text-[10px] font-mono font-bold text-cyber-violet uppercase tracking-[0.5em] mb-4 block">Core_Nodes</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">The Network</h2>
        </div>
        
        <div className="flex gap-8 overflow-x-auto pb-20 px-6 no-scrollbar snap-x">
          {agents.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-20 items-center">
          <div className="w-full md:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-cyber-cyan/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
              <img src={processImg} className="relative rounded-[40px] border border-white/5" alt="Process" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <span className="text-[10px] font-mono font-bold text-cyber-cyan uppercase tracking-[0.5em] mb-4 block">Workflow</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8">Digital <br /> Logic</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: "Analyze", value: "Data Mapping", icon: "🧠" },
                { label: "Design", value: "Visual Flow", icon: "🎨" },
                { label: "Code", value: "Architecture", icon: "💻" },
                { label: "Ship", value: "Global Node", icon: "🚀" }
              ].map((item, i) => (
                <MethodologyItem key={i} item={item} i={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section className="py-40 px-6 text-center bg-background-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-12">Let's <span className="text-cyber-cyan">Sync</span></h2>
          <div className="flex justify-center gap-8">
            <a href="https://github.com/Devansh8882" className="text-white/40 hover:text-white transition-colors uppercase font-mono text-xs tracking-widest">Github</a>
            <a href="https://www.linkedin.com/in/devansh-mishra-dm0020/" className="text-white/40 hover:text-white transition-colors uppercase font-mono text-xs tracking-widest">LinkedIn</a>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

// Helper for scroll effects
function useInViewOpacity(threshold = 0.1) {
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    setOpacity(1);
  }, []);
  return opacity;
}
