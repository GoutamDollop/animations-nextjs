import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const ref = useRef<THREE.Points>(null);

  const sphere = useMemo(() => {
    const sphereGeometry = new THREE.SphereGeometry(1, 48, 48);
    const positions = sphereGeometry.attributes.position.array;
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#4F46E5"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingShapes() {
  const shapes = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.1,
      color: ["#4F46E5", "#7C3AED", "#F59E0B", "#10B981", "#EF4444"][
        Math.floor(Math.random() * 5)
      ],
      speed: Math.random() * 0.02 + 0.01,
    }));
  }, []);

  return (
    <>
      {shapes.map((shape) => (
        <FloatingShape key={shape.id} {...shape} />
      ))}
    </>
  );
}

function FloatingShape({ position, scale, color, speed }: any) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      ref.current.rotation.x = state.clock.elapsedTime * speed;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.3}
          color="#7C3AED"
        />

        <AnimatedSphere />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
