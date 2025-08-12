import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useCommonQueries } from "../hooks/useResponsive";

interface ParticleSystemProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

function ParticleSystem({ 
  count = 200, 
  color = "#3b82f6", 
  size = 2, 
  speed = 0.01 
}: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { size: canvasSize } = useThree();
  
  // Generate random positions for particles
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return pos;
  }, [count]);

  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Rotate the entire particle system
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.1;
    pointsRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    
    // Move particles based on mouse position
    const { mouse } = state;
    pointsRef.current.rotation.x += mouse.y * 0.05;
    pointsRef.current.rotation.y += mouse.x * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingGeometry({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.3, 1]} />
      <meshBasicMaterial
        color="#8b5cf6"
        transparent
        opacity={0.3}
        wireframe
      />
    </mesh>
  );
}

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!sphereRef.current) return;
    
    sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    
    // Pulsing effect
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    sphereRef.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={sphereRef} position={[0, 0, -10]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshBasicMaterial
        color="#f97316"
        transparent
        opacity={0.1}
        wireframe
      />
    </mesh>
  );
}

interface ThreeBackgroundProps {
  variant?: "particles" | "geometric" | "minimal";
  className?: string;
}

export default function ThreeBackground({ 
  variant = "particles", 
  className = "" 
}: ThreeBackgroundProps) {
  const { isMobile, prefersReducedMotion } = useCommonQueries();
  
  // Don't render on mobile or for users who prefer reduced motion
  if (isMobile || prefersReducedMotion) {
    return null;
  }

  const renderVariant = () => {
    switch (variant) {
      case "geometric":
        return (
          <>
            <FloatingGeometry position={[-5, 2, -5]} />
            <FloatingGeometry position={[5, -2, -8]} />
            <FloatingGeometry position={[0, 3, -6]} />
            <AnimatedSphere />
          </>
        );
      case "minimal":
        return (
          <ParticleSystem count={100} color="#6366f1" size={1.5} speed={0.005} />
        );
      default:
        return (
          <>
            <ParticleSystem count={200} color="#3b82f6" size={2} speed={0.01} />
            <ParticleSystem count={100} color="#8b5cf6" size={1.5} speed={0.015} />
            <ParticleSystem count={50} color="#f97316" size={3} speed={0.008} />
          </>
        );
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        frameloop="demand"
      >
        <fog attach="fog" args={["#1e293b", 10, 50]} />
        {renderVariant()}
      </Canvas>
    </div>
  );
}

// Specialized components for different sections
export function HeroThreeBackground() {
  return (
    <ThreeBackground 
      variant="particles" 
      className="opacity-30 mix-blend-screen" 
    />
  );
}

export function GeometricThreeBackground() {
  return (
    <ThreeBackground 
      variant="geometric" 
      className="opacity-20 mix-blend-multiply" 
    />
  );
}

export function MinimalThreeBackground() {
  return (
    <ThreeBackground 
      variant="minimal" 
      className="opacity-40 mix-blend-overlay" 
    />
  );
}
