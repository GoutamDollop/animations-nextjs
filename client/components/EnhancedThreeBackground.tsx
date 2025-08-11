import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Sphere, 
  Box, 
  Torus, 
  Octahedron, 
  Text3D, 
  Float, 
  OrbitControls,
  Environment,
  PerspectiveCamera,
  useAnimations
} from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";

// School-themed 3D models using basic geometries
function SchoolBook({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const bookRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (bookRef.current) {
      bookRef.current.rotation.y += 0.01;
      bookRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    }
  });

  return (
    <group ref={bookRef} position={position} rotation={rotation} scale={scale}>
      {/* Book cover */}
      <Box args={[0.8, 1.2, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.1} metalness={0.2} />
      </Box>
      {/* Book pages */}
      <Box args={[0.75, 1.15, 0.08]} position={[0, 0, 0.05]}>
        <meshStandardMaterial color="#f8fafc" roughness={0.8} />
      </Box>
      {/* Book spine */}
      <Box args={[0.05, 1.2, 0.1]} position={[-0.4, 0, 0]}>
        <meshStandardMaterial color="#1e40af" roughness={0.1} metalness={0.3} />
      </Box>
    </group>
  );
}

function GraduationCap({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const capRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (capRef.current) {
      capRef.current.rotation.z += 0.005;
      capRef.current.position.x += Math.sin(state.clock.elapsedTime * 0.5 + position[1]) * 0.002;
    }
  });

  return (
    <group ref={capRef} position={position} rotation={rotation} scale={scale}>
      {/* Cap top */}
      <Box args={[1.2, 0.1, 1.2]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#1f2937" roughness={0.1} metalness={0.3} />
      </Box>
      {/* Cap base */}
      <Box args={[0.8, 0.2, 0.8]} position={[0, 0.1, 0]}>
        <meshStandardMaterial color="#1f2937" roughness={0.1} metalness={0.3} />
      </Box>
      {/* Tassel */}
      <Sphere args={[0.05]} position={[0.6, 0.35, 0]}>
        <meshStandardMaterial color="#fbbf24" roughness={0.3} />
      </Sphere>
    </group>
  );
}

function Globe({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const globeRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.01;
      globeRef.current.position.z += Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.001;
    }
  });

  return (
    <group ref={globeRef} position={position} rotation={rotation} scale={scale}>
      {/* Globe sphere */}
      <Sphere args={[0.6]} position={[0, 0.3, 0]}>
        <meshStandardMaterial 
          color="#10b981" 
          roughness={0.3} 
          metalness={0.1}
          transparent
          opacity={0.8}
        />
      </Sphere>
      {/* Globe base */}
      <Torus args={[0.3, 0.05]} position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#6b7280" roughness={0.2} metalness={0.7} />
      </Torus>
      {/* Globe stand */}
      <Box args={[0.1, 0.4, 0.1]} position={[0, -0.3, 0]}>
        <meshStandardMaterial color="#6b7280" roughness={0.2} metalness={0.7} />
      </Box>
    </group>
  );
}

function Calculator({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  const calcRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (calcRef.current) {
      calcRef.current.rotation.x += 0.003;
      calcRef.current.position.y += Math.sin(state.clock.elapsedTime * 1.2 + position[2]) * 0.002;
    }
  });

  return (
    <group ref={calcRef} position={position} rotation={rotation} scale={scale}>
      {/* Calculator body */}
      <Box args={[0.6, 0.8, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#374151" roughness={0.1} metalness={0.3} />
      </Box>
      {/* Calculator screen */}
      <Box args={[0.5, 0.2, 0.05]} position={[0, 0.2, 0.05]}>
        <meshStandardMaterial color="#111827" emissive="#22c55e" emissiveIntensity={0.2} />
      </Box>
      {/* Calculator buttons */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Box key={i} args={[0.08, 0.08, 0.02]} position={[
          -0.15 + (i % 3) * 0.15,
          -0.05 - Math.floor(i / 3) * 0.12,
          0.05
        ]}>
          <meshStandardMaterial color="#9ca3af" roughness={0.3} />
        </Box>
      ))}
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      
      // Color (educational themed colors)
      const colorVariants = [
        [0.239, 0.510, 0.961], // Blue
        [0.615, 0.333, 0.918], // Purple
        [0.937, 0.745, 0.141], // Yellow
        [0.059, 0.725, 0.505], // Green
        [0.937, 0.325, 0.314], // Red
      ];
      const colorIndex = Math.floor(Math.random() * colorVariants.length);
      colors[i * 3] = colorVariants[colorIndex][0];
      colors[i * 3 + 1] = colorVariants[colorIndex][1];
      colors[i * 3 + 2] = colorVariants[colorIndex][2];
      
      // Size
      sizes[i] = Math.random() * 3 + 1;
    }
    
    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Floating animation
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime * 0.5 + positions[i3]) * 0.002;
        positions[i3] += Math.sin(state.clock.elapsedTime * 0.3 + positions[i3 + 1]) * 0.001;
        positions[i3 + 2] += Math.sin(state.clock.elapsedTime * 0.4 + positions[i3]) * 0.0015;
        
        // Reset particles that float too far
        if (positions[i3 + 1] > 25) positions[i3 + 1] = -25;
        if (positions[i3 + 1] < -25) positions[i3 + 1] = 25;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={2}
        sizeAttenuation
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function AnimatedScene() {
  const { camera } = useThree();
  
  useEffect(() => {
    // Gentle camera movement
    gsap.to(camera.position, {
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      x: 2,
      y: 1,
      z: 8
    });
  }, [camera]);

  // Generate random positions for school objects
  const schoolObjects = useMemo(() => {
    const objects = [];
    const objectTypes = [SchoolBook, GraduationCap, Globe, Calculator];
    
    for (let i = 0; i < 12; i++) {
      const ObjectComponent = objectTypes[Math.floor(Math.random() * objectTypes.length)];
      const position: [number, number, number] = [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 20
      ];
      const rotation: [number, number, number] = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ];
      const scale = Math.random() * 0.3 + 0.2;
      
      objects.push({
        Component: ObjectComponent,
        position,
        rotation,
        scale,
        key: i
      });
    }
    
    return objects;
  }, []);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Point lights for dynamic lighting */}
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#8b5cf6" />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* School-themed objects */}
      {schoolObjects.map(({ Component, position, rotation, scale, key }) => (
        <Float
          key={key}
          speed={1 + Math.random()}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <Component position={position} rotation={rotation} scale={scale} />
        </Float>
      ))}
      
      {/* Geometric shapes for additional visual interest */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <Torus args={[3, 0.5, 16, 100]} position={[8, -5, -10]} rotation={[0, 0, Math.PI / 4]}>
          <meshStandardMaterial color="#60a5fa" transparent opacity={0.1} wireframe />
        </Torus>
      </Float>
      
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.4}>
        <Octahedron args={[2]} position={[-8, 5, -8]} rotation={[Math.PI / 6, 0, 0]}>
          <meshStandardMaterial color="#a855f7" transparent opacity={0.15} wireframe />
        </Octahedron>
      </Float>
      
      <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.2}>
        <Sphere args={[1.5]} position={[0, -8, -12]}>
          <meshStandardMaterial color="#10b981" transparent opacity={0.1} wireframe />
        </Sphere>
      </Float>
    </>
  );
}

interface EnhancedThreeBackgroundProps {
  className?: string;
  intensity?: number;
}

export default function EnhancedThreeBackground({
  className = "",
  intensity = 0.7
}: EnhancedThreeBackgroundProps) {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setShouldRender(false);
      console.warn('WebGL not supported, Three.js background disabled');
    }

    return () => {
      setShouldRender(false);
    };
  }, []);

  if (!shouldRender) return null;
  return (
    <div className={`absolute inset-0 ${className}`} style={{ opacity: intensity }}>
      <Canvas
        key="enhanced-three-bg"
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false
        }}
        dpr={1}
        performance={{ min: 0.1 }}
        onCreated={({ gl }) => {
          gl.domElement.style.position = 'absolute';
          gl.domElement.style.top = '0';
          gl.domElement.style.left = '0';
          gl.domElement.style.pointerEvents = 'none';
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        
        {/* Environment for realistic lighting */}
        <Environment preset="city" background={false} />
        
        {/* Main animated scene */}
        <AnimatedScene />
        
        {/* Optional orbit controls for debugging (disabled in production) */}
        {process.env.NODE_ENV === 'development' && (
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            enableRotate={false}
            autoRotate 
            autoRotateSpeed={0.5}
          />
        )}
      </Canvas>
    </div>
  );
}
