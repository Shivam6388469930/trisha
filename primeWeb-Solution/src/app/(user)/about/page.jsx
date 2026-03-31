'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BASE_URL } from '../../../../api';

// -----------------------
// CLEAN COMPANY 3D BACKGROUND
// -----------------------
const CompanyBackground = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={[15, 10, 1]} position={[0, 0, -5]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial
        color={new THREE.Color('#0d0f24')}
      />
    </mesh>
  );
};

// Floating Tech Particles
const TechParticles = ({ count = 40 }) => {
  const meshRef = useRef();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0008;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#6b8cff"
        transparent
        opacity={0.6}
      />
    </points>
  );
};

// Full 3D Scene
const ThreeScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <CompanyBackground />
      <TechParticles count={50} />
      <ambientLight intensity={0.6} />
    </Canvas>
  );
};

// ----------------------------------------------------
// COMPANY ABOUT PAGE
// ----------------------------------------------------
const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('services');

  // COMPANY INFO
  const companyInfo = {
    name: "Your Company Name",
    title: "Software & IT Development Company",
    mission:
      "We build scalable, modern and high-performance digital solutions for startups and enterprises.",
    established: "2024",
    contact: {
      phone: "+91 638869930",
      email: "contact@yourcompany.com"
    }
  };

  // TEAM

  const [team, setTeam] = useState([]);

useEffect(() => {
  const fetchTeam = async () => {
    try {
      const res = await fetch(`${ BASE_URL}/v1/team`, {
        method: "GET",
      });

      const data = await res.json();
      console.log("TEAM:", data);

      setTeam(data?.data || []); // adjust based on your controller response
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  fetchTeam();
}, []);

 

  // SERVICES
  const services = [
    "Web Application Development",
    "Mobile App Development",
    "Custom Software Development",
    "Frontend Development",
    "Backend/API Development",
    "UI/UX Design",
    "IT Consulting",
    "Data Analysis",
    "Excel Expert",
    "PowerBI Developer",
    "Tableau Developer",
    "Digital Marketing"
  ];

  // MOTION VARIANTS
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative bg-black">

      {/* <ThreeScene /> */}

      <div className="relative z-10 mt-20">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1
              className="text-5xl font-bold bg-clip-text text-transparent mb-4"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #00a8ff, #9c88ff, #f368e0)",
              }}
            >
              About Our Company
            </h1>
            <p className="text-xl text-white max-w-2xl mx-auto">
              {companyInfo.mission}
            </p>
          </motion.div>

          {/* TABS */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-900/80 rounded-2xl shadow-xl p-2 mb-8 backdrop-blur-lg"
          >
            <div className="flex space-x-2">
              {['services', 'team'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'text-white/90 hover:text-blue-400 hover:bg-white/5'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>

          {/* SERVICES */}
          {activeTab === 'services' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-900/60 border border-white/10 rounded-2xl p-6 text-white shadow-lg hover:shadow-blue-400/20 hover:scale-[1.03] transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2">{service}</h3>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* TEAM */}
          {activeTab === 'team' && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {team.map((member, index) => (
  <motion.div
    key={index}
    variants={itemVariants}
    className="bg-gray-900/70 p-8 rounded-2xl border border-white/10 shadow-xl hover:scale-[1.03] transition-all"
  >
    <div
      className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-3xl font-bold mb-4 text-white border-4 border-white/20"
      style={{
        background: "linear-gradient(45deg, #00a8ff, #9c88ff, #f368e0)",
      }}
    >
      {member.avatar || member.name.substring(0,2)}
    </div>

    <h3 className="text-xl font-bold text-center text-white">
      {member.name}
    </h3>
    
    <h3 className="text-xl font-bold text-center text-white">
      {member.designation}
    </h3>

    <p className="text-blue-400 text-center">{member.role}</p>

    <p className="text-white/70 text-center mt-4">
      {member.description}
    </p>
  </motion.div>
))}

            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AboutPage;
