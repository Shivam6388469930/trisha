"use client";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Floating Particles
const FloatingParticles = ({ count = 80 }) => {
  const particlesRef = useRef();

  useEffect(() => {
    const particles = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      particles[i] = (Math.random() - 0.5) * 10;
    }

    particlesRef.current.setAttribute(
      "position",
      new THREE.BufferAttribute(particles, 3)
    );
  }, [count]);

  return (
    <points>
      <bufferGeometry ref={particlesRef} />
      <pointsMaterial size={0.05} transparent opacity={0.7} />
    </points>
  );
};

// Floating 3D Sphere
const FloatingSphere = () => {
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.rotation.y += 0.01;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime) * 0.25;
  });

  return (
    <Sphere ref={mesh} args={[1, 64, 128]} scale={2.6}>
      <MeshDistortMaterial
        color="#00a8ff"
        distort={0.5}
        speed={1.5}
        roughness={0.15}
        metalness={0.8}
      />
    </Sphere>
  );
};

// Gradient Background
const GradientPlane = () => {
  return (
    <mesh scale={[20, 15, 1]} position={[0, 0, -6]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color={"#0f0c29"} />
    </mesh>
  );
};

const AnimatedBackground = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
      <GradientPlane />
      <FloatingParticles count={120} />
      <FloatingSphere />

      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
    </Canvas>
  );
};

export default AnimatedBackground;
