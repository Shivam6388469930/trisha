'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import useSWR from 'swr';
import '../../css/project.css';
import { BASE_URL } from '@/app/lib/api';
// Fetcher for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

// 3D Floating Icons
const FloatingIcons = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  const icons = [
    { position: [4, 2, -1], color: '#00a8ff', size: 0.4 },
    { position: [-3, 3, 0], color: '#9c88ff', size: 0.3 },
    { position: [2, -2, 1], color: '#f368e0', size: 0.35 },
    { position: [-4, -1, -2], color: '#00a8ff', size: 0.25 },
    { position: [3, -3, 2], color: '#9c88ff', size: 0.32 },
    { position: [-2, 2, -1], color: '#f368e0', size: 0.28 },
  ];

  return (
    <group ref={groupRef}>
      {icons.map((icon, i) => (
        <Sphere key={i} args={[icon.size, 16, 16]} position={icon.position}>
          <MeshDistortMaterial
            color={icon.color}
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};

// Floating Code Particles
const CodeElements = ({ count = 30 }) => {
  const pointsRef = useRef();

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 12;
    positions[i + 1] = (Math.random() - 0.5) * 12;
    positions[i + 2] = (Math.random() - 0.5) * 12;

    colors[i] = Math.random() * 0.3 + 0.2;
    colors[i + 1] = Math.random() * 0.5 + 0.3;
    colors[i + 2] = Math.random() * 0.7 + 0.3;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
};

// Full 3D Background
const ThreeScene = () => (
  <Canvas
    camera={{ position: [0, 0, 10], fov: 75 }}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      background: 'black',
    }}
  >
    <ambientLight intensity={0.6} />
    <pointLight position={[10, 10, 10]} intensity={0.8} />
    <directionalLight position={[-5, 5, 5]} intensity={0.5} />
    <CodeElements count={30} />
    <FloatingIcons />
  </Canvas>
);

// Project Card Component
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gray-900/80 rounded-2xl shadow-xl backdrop-blur-lg border border-white/10 overflow-hidden group"
      whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0, 168, 255, 0.3)' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Header Image + Icon + Status */}
      <div
        className="h-48 relative overflow-hidden"
        style={{
          background: `linear-gradient(45deg, ${project.accentColor || '#00a8ff'}30, ${project.accentColor || '#00a8ff'}60)`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">{project.icon || 'Pin'}</div>
        </div>

        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
            project.status === 'Completed'
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : project.status === 'In Progress'
              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
          }`}
        >
          {project.status}
        </div>

        {/* Hover Buttons */}
        <motion.div
          className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="flex gap-4">
            {project.liveUrl && project.liveUrl !== '#' && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Live Demo
              </motion.a>
            )}
            {project.githubUrl && project.githubUrl !== '#' && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                GitHub
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-white/60 text-sm">{project.year}</span>
        </div>

        <p className="text-white/80 mb-4 leading-relaxed">{project.description}</p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(project.technologies || []).map((tech, i) => (
            <span
              key={i}
              className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-2">
          {(project.features || []).slice(0, 3).map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
              <span className="text-blue-400">Checkmark</span>
              {feature}
            </div>
          ))}
          {project.features && project.features.length > 3 && (
            <div className="text-white/60 text-sm">
              +{project.features.length - 3} more features
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Main Page Component
const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const { data, error, isLoading } = useSWR(
    'http://localhost:5000/v1/project',
    fetcher
  );

  const projects = data?.success ? data.projects : [];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'completed') return project.status === 'Completed';
    if (activeFilter === 'progress') return project.status === 'In Progress';
    if (activeFilter === 'planned') return project.status === 'Planned';
    return true;
  });

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'completed', label: 'Completed' },
    { key: 'progress', label: 'In Progress' },
    { key: 'planned', label: 'Planned' },
  ];

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <ThreeScene />
        <div className="relative z-10 text-white text-3xl font-light">
          Loading Projects...
        </div>
      </div>
    );
  }

  // Error State
  if (error || !data?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <ThreeScene />
        <div className="relative z-10 bg-black/60 backdrop-blur px-10 py-8 rounded-2xl border border-red-500/30 text-center">
          <p className="text-red-400 text-xl mb-2">Failed to load projects</p>
          <p className="text-white/80 text-sm">
            Make sure your backend is running on{' '}
            <code className="bg-white/10 px-2 rounded">localhost:5000</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden">
      <ThreeScene />

      <div className="relative z-10 mt-20 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1
            className="text-5xl font-bold bg-clip-text text-transparent mb-6"
            style={{
              backgroundImage: 'linear-gradient(45deg, #00a8ff, #9c88ff, #f368e0)',
            }}
          >
            My Projects
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto mb-10">
            A collection of projects showcasing full-stack development, modern tech, and creativity.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-10 mb-10">
            {[
              { label: 'Total', value: projects.length },
              { label: 'Completed', value: projects.filter(p => p.status === 'Completed').length },
              { label: 'In Progress', value: projects.filter(p => p.status === 'In Progress').length },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-white/70 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="inline-flex bg-gray-900/80 rounded-2xl p-2 backdrop-blur-lg border border-white/10">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeFilter === f.key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-white/80 hover:text-blue-400 hover:bg-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <div className="bg-gray-900/80 rounded-2xl p-10 backdrop-blur-lg border border-white/10 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Let's Build Something Amazing
            </h3>
            <p className="text-white/80 mb-8">
              Open to new opportunities and exciting projects!
            </p>
            <motion.a
              href="/getInTouch"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectsPage;