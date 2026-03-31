



'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

// Floating 3D Icons Background
const FloatingIcons = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const icons = [
    { position: [5, 3, -2], color: '#00a8ff', size: 0.5 },
    { position: [-4, 4, 0], color: '#9c88ff', size: 0.4 },
    { position: [3, -3, 1], color: '#f368e0', size: 0.45 },
    { position: [-5, -2, -3], color: '#00a8ff', size: 0.35 },
    { position: [4, -4, 2], color: '#9c88ff', size: 0.4 },
    { position: [-3, 3, -1], color: '#f368e0', size: 0.38 },
    { position: [2, 5, 1], color: '#00a8ff', size: 0.3 },
    { position: [-2, -5, 2], color: '#9c88ff', size: 0.32 },
  ];

  return (
    <group ref={groupRef}>
      {icons.map((icon, i) => (
        <Sphere key={i} position={icon.position} args={[icon.size, 32, 32]}>
          <MeshDistortMaterial
            color={icon.color}
            attach="material"
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

// 3D Background Scene
const ThreeScene = () => (
  <Canvas
    camera={{ position: [0, 0, 12], fov: 75 }}
    style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
  >
    <ambientLight intensity={0.6} />
    <pointLight position={[10, 10, 10]} intensity={1} />
    <directionalLight position={[-5, 5, 5]} intensity={0.6} />
    <FloatingIcons />
  </Canvas>
);

// Service Card Component
const ServiceCard = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gray-900/90 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.04, y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={service.image || '/placeholder-service.jpg'}
          alt={service.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <motion.div
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-bold text-lg border border-white/30"
          animate={{ scale: isHovered ? 1.1 : 1 }}
        >
          ₹{service.price.toLocaleString()}
        </motion.div>

        <div className="absolute bottom-4 left-5 text-white">
          <h3 className="text-2xl font-bold">{service.title}</h3>
          <p className="text-white/80 text-sm">{service.category}</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <p className="text-gray-300 leading-relaxed">{service.description}</p>

        <div>
          <h4 className="text-white font-semibold mb-3">What's Included:</h4>
          <div className="space-y-2">
            {service.features.slice(0, 4).map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                {feature}
              </div>
            ))}
            {service.features.length > 4 && (
              <p className="text-gray-400 text-xs italic">+ {service.features.length - 4} more...</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {service.technologies.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-between text-sm text-gray-400">
          <span>⏱ {service.timeline}</span>
          <span>🔄 {service.revisions} Revisions</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push(`/getInTouch?service=${service._id}&title=${encodeURIComponent(service.title)}`)}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all"
        >
          Get This Service →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync URL query with filter
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setActiveCategory(category);
  }, [searchParams]);

  // Update URL when category changes
  const updateCategory = (category) => {
    setActiveCategory(category);
    router.push(`/services?category=${category}`, { scroll: false });
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/v1/service');
        setServices(res.data.services || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load services. Please try again later.');
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Filter logic
  const filteredServices = services.filter(service => {
    const cat = service.category?.toLowerCase() || '';
    if (activeCategory === 'all') return true;
    if (activeCategory === 'ecommerce') return cat.includes('store') || cat.includes('e-commerce') || cat.includes('shop');
    if (activeCategory === 'business') return cat.includes('business') || cat.includes('corporate');
    if (activeCategory === 'portfolio') return cat.includes('portfolio') || cat.includes('personal');
    if (activeCategory === 'application') return cat.includes('app') || cat.includes('platform') || cat.includes('web application');
    if (activeCategory === 'website') return cat.includes('website') || cat.includes('landing') || cat.includes('site');
    return true;
  });

  const categories = [
    { key: 'all', label: 'All Services', icon: '✨' },
    { key: 'website', label: 'Websites', icon: '🌐' },
    { key: 'ecommerce', label: 'E-Commerce', icon: '🛒' },
    { key: 'business', label: 'Business', icon: '🏢' },
    { key: 'portfolio', label: 'Portfolio', icon: '🎨' },
    { key: 'application', label: 'Web Apps', icon: '⚡' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-2xl">Loading Services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ThreeScene />

      <div className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              My Services
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              High-quality web solutions crafted with modern technologies
            </p>
          </motion.div>

          {/* Category Filters - Responsive */}
          <div className="mb-12 overflow-x-auto pb-4">
            <div className="flex gap-3 justify-center flex-wrap min-w-[600px] sm:min-w-0">
              {categories.map((cat) => {
                const count = services.filter(s => {
                  const c = s.category?.toLowerCase() || '';
                  if (cat.key === 'all') return true;
                  if (cat.key === 'website') return c.includes('website') || c.includes('landing');
                  if (cat.key === 'ecommerce') return c.includes('store') || c.includes('shop');
                  if (cat.key === 'business') return c.includes('business');
                  if (cat.key === 'portfolio') return c.includes('portfolio');
                  if (cat.key === 'application') return c.includes('app') || c.includes('platform');
                  return false;
                }).length;

                return (
                  <motion.button
                    key={cat.key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateCategory(cat.key)}
                    className={`px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
                      activeCategory === cat.key
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-xl'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 backdrop-blur-md border border-white/10'
                    }`}
                  >
                    {cat.icon} {cat.label} ({count})
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Services Grid */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No services found in this category.</p>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredServices.map((service, i) => (
                <ServiceCard key={service._id} service={service} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}