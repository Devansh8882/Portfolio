/**
 * AGENT ENTITY MODEL
 * This file serves as the source of truth for all AI agents.
 */

import luminaImg from '../../../assets/Focused Woman Working on Laptop.png';
import aetherImg from '../../../assets/desktop computer-bro.svg';
import nexusImg from '../../../assets/oversight-bro.svg';

export const agents = [
  {
    id: "avenger-01",
    name: "J.A.R.V.I.S.",
    role: "Core Architect UI/UX",
    specialization: "Just A Rather Very Intelligent System",
    description: "Designed to handle complex system architectures, manage Tony Stark's armor, and optimize frontend infrastructure.",
    capabilities: ["System Design", "Algorithm Optimization", "Suit Protocols"],
    status: "Active",
    avatar: aetherImg,
    icon: "🤖",
    stats: {
      "Processing": "99.9%",
      "Efficiency": "High",
      "Sync": "Live"
    }
  },
  {
    id: "avenger-02",
    name: "F.R.I.D.A.Y.",
    role: "Visual Intelligence Agent",
    specialization: "UI/UX Synthesis & Motion Design",
    description: "Specializes in creating immersive, high-fidelity visual experiences and analyzing combat/code patterns on the fly.",
    capabilities: ["Visual Design", "Motion Engineering", "Experience Mapping"],
    status: "Online",
    avatar: luminaImg,
    icon: "⚡",
    stats: {
      "Render": "144fps",
      "Fidelity": "Ultra",
      "Sync": "Active"
    }
  },
  {
    id: "avenger-03",
    name: "E.D.I.T.H.",
    role: "Integration Specialist",
    specialization: "Even Dead, I'm The Hero",
    description: "Provides tactical global satellite intelligence, backend API routing, and seamless third-party service integration.",
    capabilities: ["API Orchestration", "Global Security", "Data Flow"],
    status: "Standby",
    avatar: nexusImg,
    icon: "🕶️",
    stats: {
      "Satellites": "Active",
      "Latency": "1ms",
      "Sync": "Idle"
    }
  }
];

export const agentCategories = [
  "Development",
  "Design",
  "Intelligence",
  "Infrastructure"
];
