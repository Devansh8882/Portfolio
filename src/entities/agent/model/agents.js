/**
 * AGENT ENTITY MODEL
 * This file serves as the source of truth for all AI agents.
 */

export const agents = [
  {
    id: "sentinel-01",
    name: "Aether",
    role: "Core Architect Agent",
    specialization: "Structural Engineering & Performance Optimization",
    description: "Designed to handle complex system architectures with a focus on low-latency and high-scalability solutions.",
    capabilities: ["System Design", "Algorithm Optimization", "Performance Auditing"],
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Aether"
  },
  {
    id: "sentinel-02",
    name: "Lumina",
    role: "Visual Intelligence Agent",
    specialization: "UI/UX Synthesis & Motion Design",
    description: "Specializes in creating immersive, high-fidelity visual experiences and fluid motion systems.",
    capabilities: ["Visual Design", "Motion Engineering", "Experience Mapping"],
    status: "Online",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Lumina"
  },
  {
    id: "sentinel-03",
    name: "Nexus",
    role: "Integration Specialist Agent",
    specialization: "API Connectivity & Neural Bridges",
    description: "Bridges the gap between decentralized systems and core application logic through seamless integrations.",
    capabilities: ["API Orchestration", "Data Flow Design", "Security Protocols"],
    status: "Standby",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Nexus"
  }
];

export const agentCategories = [
  "Development",
  "Design",
  "Intelligence",
  "Infrastructure"
];
