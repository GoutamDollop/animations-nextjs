import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface FloatingParticlesProps {
  count: number;
  color: string;
}

function FloatingParticles({ count, color }: FloatingParticlesProps) {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  // Generate random positions for particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const colorObj = new THREE.Color(color);
      colors[i * 3] = colorObj.r;
      colors[i * 3 + 1] = colorObj.g;
      colors[i * 3 + 2] = colorObj.b;
    }
    
    return [positions, colors];
  }, [count, color]);

  // Animate particles
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.1;
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      // Gentle floating motion
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
    
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime) * 5;
      light.current.position.z = Math.cos(state.clock.elapsedTime) * 5;
    }
  });

  return (
    <>
      <Points ref={mesh} positions={positions} colors={colors}>
        <PointMaterial 
          size={0.02} 
          vertexColors 
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </Points>
      <pointLight 
        ref={light}
        position={[0, 0, 5]} 
        intensity={0.5} 
        color={color}
      />
    </>
  );
}

function FloatingGeometry() {
  const spheres = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (spheres.current) {
      spheres.current.rotation.y = state.clock.elapsedTime * 0.1;
      spheres.current.children.forEach((child, index) => {
        child.position.y = Math.sin(state.clock.elapsedTime + index) * 0.5;
        child.rotation.x = state.clock.elapsedTime * (0.5 + index * 0.1);
      });
    }
  });

  return (
    <group ref={spheres}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Sphere
          key={index}
          position={[
            Math.sin(index * 2) * 8,
            0,
            Math.cos(index * 2) * 8,
          ]}
          args={[0.1, 8, 8]}
        >
          <meshStandardMaterial
            color={`hsl(${20 + index * 20}, 70%, 60%)`}
            transparent
            opacity={0.3}
            emissive={`hsl(${20 + index * 20}, 70%, 30%)`}
          />
        </Sphere>
      ))}
    </group>
  );
}

function Scene() {
  const { viewport } = useThree();
  
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      
      {/* Main directional light */}
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      
      {/* Floating particles with different colors */}
      <FloatingParticles count={200} color="#f97316" />
      <FloatingParticles count={150} color="#ef4444" />
      <FloatingParticles count={100} color="#ec4899" />
      
      {/* Floating geometric shapes */}
      <FloatingGeometry />
    </>
  );
}

interface ThreeBackgroundProps {
  className?: string;
}

export default function ThreeBackground({ className = "" }: ThreeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Optimize for performance
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('webgl2');
      if (context) {
        context.getExtension('EXT_color_buffer_float');
      }
    }
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true, 
          powerPreference: "high-performance",
          stencil: false,
          depth: false
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        performance={{ min: 0.5 }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
