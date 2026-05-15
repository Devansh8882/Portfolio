import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNetwork() {
  const pointsRef = useRef();
  
  const count = 150;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const isCyan = Math.random() > 0.5;
      cols[i * 3] = isCyan ? 0.02 : 0.54; // #06b6d4 (cyan) or #8b5cf6 (violet)
      cols[i * 3 + 1] = isCyan ? 0.71 : 0.36;
      cols[i * 3 + 2] = isCyan ? 0.83 : 0.96;
    }
    return cols;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0005;
    pointsRef.current.rotation.x += 0.0003;

    const targetX = state.mouse.x * 0.1;
    const targetY = state.mouse.y * 0.1;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.02;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.02;
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

export const Background3D = () => {
  return (
    <div className="absolute inset-0 z-0 bg-[#050505]">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 25]} />
        
        <NeuralNetwork />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.3}
          autoRotate={true}
          autoRotateSpeed={0.2}
        />

        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8b5cf6" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
      </Canvas>

      {/* Modern Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
    </div>
  );
};
