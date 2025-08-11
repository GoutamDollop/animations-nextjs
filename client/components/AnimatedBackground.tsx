import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Points,
  PointMaterial,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";

function FloatingOrbs() {
  const orbs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
      scale: Math.random() * 2 + 1,
      color: [
        "#FF6B6B",
        "#4ECDC4",
        "#45B7D1",
        "#96CEB4",
        "#FFEAA7",
        "#DDA0DD",
        "#98D8C8",
        "#F7DC6F",
      ][i % 8],
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  return (
    <>
      {orbs.map((orb) => (
        <FloatingOrb key={orb.id} {...orb} />
      ))}
    </>
  );
}

function FloatingOrb({ position, scale, color, speed }: any) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 2;
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Sphere ref={ref} position={position} args={[scale, 32, 32]}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);

    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 0.7, 0.7);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Points
      ref={ref}
      positions={particles.positions}
      colors={particles.colors}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
      />
    </Points>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#4ECDC4"
        />
        <pointLight position={[0, 10, -10]} intensity={0.5} color="#FF6B6B" />

        <FloatingOrbs />
        <ParticleField />
      </Canvas>
    </div>
  );
}
