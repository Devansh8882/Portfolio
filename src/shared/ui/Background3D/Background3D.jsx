import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNetwork() {
  const pointsRef = useRef();
  
  const count = 100; // Increased density slightly for richer cyberpunk look
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    return vel;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positionsArr = pointsRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < count; i++) {
      positionsArr[i * 3] += velocities[i * 3];
      positionsArr[i * 3 + 1] += velocities[i * 3 + 1];
      positionsArr[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(positionsArr[i * 3]) > 6) velocities[i * 3] *= -1;
      if (Math.abs(positionsArr[i * 3 + 1]) > 6) velocities[i * 3 + 1] *= -1;
      if (Math.abs(positionsArr[i * 3 + 2]) > 6) velocities[i * 3 + 2] *= -1;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0008;

    const targetX = state.mouse.x * 0.25;
    const targetY = state.mouse.y * 0.25;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.05;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f5ff" // Electric Cyber Cyan
          size={0.16}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending} // High-fidelity futuristic glow on dark background
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

export const Background3D = () => {
  const [isGrabbing, setIsGrabbing] = useState(false);

  return (
    <div 
      className="absolute inset-0 z-0 bg-gradient-to-b from-[#030209] via-[#09081a] to-[#04040a]"
      style={{ cursor: isGrabbing ? 'grabbing' : 'grab' }}
    >
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 60 }}
        onPointerDown={() => setIsGrabbing(true)}
        onPointerUp={() => setIsGrabbing(false)}
        onPointerLeave={() => setIsGrabbing(false)}
      >
        <fog attach="fog" args={['#030209', 5, 22]} />
        <NeuralNetwork />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />

        <ambientLight intensity={0.4} />
        {/* Futuristic dual neon point lights */}
        <pointLight position={[10, -5, 10]} intensity={2.5} color="#00f5ff" /> {/* Cyan */}
        <pointLight position={[-10, 5, -10]} intensity={2.0} color="#bd5cff" /> {/* Purple */}
      </Canvas>

      {/* Cybernetic Glass Gradients overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#bd5cff]/5 to-transparent pointer-events-none" />
    </div>
  );
};
