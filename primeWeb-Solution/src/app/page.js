


'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Building2, 
  Calendar, 
  Shield, 
  Server, 
  Cloud, 
  Zap, 
  TrendingUp,
  Code2,
  Palette,
  Smartphone,
  Database,
  Globe,
  Lock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Award,
  Users,
  Clock,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  Code,
  Video,
  Megaphone,
  BarChart3,
  Share2

} from 'lucide-react';
import { BASE_URL } from '../../api';

// Enhanced 3D Animated Background
const AnimatedBackground = () => {
  const meshRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.05) * 0.05;
      meshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        transparent
        uniforms={{
          time: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vPosition;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float wave1 = sin(pos.x * 15.0 + time * 2.0) * cos(pos.y * 10.0 + time) * 0.1;
            float wave2 = sin(pos.y * 12.0 - time * 1.8) * 0.08;
            pos.z += wave1 + wave2;
            vPosition = pos;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            vec2 center = vec2(0.5, 0.5);
            float dist = distance(vUv, center);
            
            float wave1 = sin(vUv.x * 20.0 + time * 2.5) * 0.5 + 0.5;
            float wave2 = cos(vUv.y * 18.0 - time * 2.0) * 0.5 + 0.5;
            float pulse = sin(dist * 15.0 - time * 3.0) * 0.3 + 0.7;
            
            vec3 color1 = vec3(0.02, 0.01, 0.08);
            vec3 color2 = vec3(0.05, 0.08, 0.25);
            vec3 color3 = vec3(0.00, 0.50, 0.85);
            vec3 color4 = vec3(0.40, 0.10, 0.70);
            
            vec3 color = mix(color1, color2, vUv.y);
            color = mix(color, color3, wave1 * 0.4);
            color = mix(color, color4, wave2 * 0.3);
            color += vec3(pulse * 0.15);
            
            float sparkle = step(0.99, fract(sin(vUv.x * 200.0 + vUv.y * 100.0) * 43758.5453));
            color += vec3(sparkle * 0.2);
            
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};

// Floating Tech Icons
const FloatingIcons = () => {
  const icons = useRef([]);
  
  useFrame((state) => {
    icons.current.forEach((icon, i) => {
      if (icon) {
        icon.position.y += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
        icon.rotation.y += 0.01;
      }
    });
  });

  return (
    <group>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          ref={el => icons.current[i] = el}
          position={[
            Math.sin(i) * 3,
            Math.cos(i * 1.5) * 2,
            -2 - i * 0.5
          ]}
        >
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#00d4ff" : "#8b5cf6"} 
            emissive={i % 2 === 0 ? "#0066cc" : "#4c1d95"}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

// Enhanced Code Particles
const CodeParticles = ({ count = 200 }) => {
  const points = useRef();
  const particles = useRef(new Float32Array(
    Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 25)
  ));

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.04} 
        color="#3b82f6" 
        transparent 
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Animated Counter
const Counter = ({ value, label, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const end = typeof value === 'string' ? parseInt(value) : value;
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
        {isInView ? count : 0}{suffix}
      </div>
      <p className="text-gray-400 mt-2 text-sm md:text-base">{label}</p>
    </div>
  );
};

// Service Slider Card
const ServiceCard = ({ service, index, isActive }) => {
  const router = useRouter();
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.5,
        scale: isActive ? 1 : 0.95,
        y: isActive ? 0 : 20
      }}
      transition={{ duration: 0.5 }}
      className={`relative cursor-pointer transition-all duration-500 ${
        isActive ? 'scale-100' : 'scale-95 opacity-50 hover:opacity-75'
      }`}
      onClick={() => !isActive && service.onClick()}
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-3xl  transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`} />
      
      <div className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border rounded-3xl p-6 md:p-8 transition-all duration-500 h-full ${
        isActive 
          ? 'border-cyan-500/50 shadow-2xl shadow-cyan-500/25' 
          : 'border-white/10 hover:border-cyan-500/30'
      }`}>
        <div className="relative z-10">
          <div className={`text-5xl md:text-6xl mb-6 transition-all duration-500 ${
            isActive ? 'scale-110' : ''
          }`}>
            <Icon size={48} className="text-cyan-700" />
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
            {service.title}
          </h3>
          
          <p className="text-cyan-900 font-medium mb-4 text-sm">
            {service.category}
          </p>
          
          <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
            {service.description}
          </p>

          <div className="mb-6">
            <span className="text-2xl md:text-3xl font-bold text-cyan-700">
              ₹{service.price.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm"> starting</span>
          </div>

          <div className="space-y-2 mb-6">
            {service.features.slice(0, 4).map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {isActive && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/contact')}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all mt-4"
            >
              Get Started
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Tech Stack Section
const TechStack = () => {
 const techs = [
  { name: "React / Next.js", icon: "⚛️", color: "from-cyan-500 to-blue-500" },
  { name: "Node.js", icon: "🟢", color: "from-green-500 to-emerald-500" },
  { name: "MongoDB", icon: "🍃", color: "from-green-600 to-green-400" },
  { name: "PostgreSQL", icon: "🐘", color: "from-blue-600 to-indigo-500" },
  { name: "TypeScript", icon: "📘", color: "from-blue-500 to-blue-700" },
  { name: "Tailwind CSS", icon: "🎨", color: "from-cyan-400 to-teal-500" },
  { name: "Docker", icon: "🐳", color: "from-blue-400 to-sky-500" },
  { name: "AWS / Azure", icon: "☁️", color: "from-orange-400 to-yellow-500" },
  { name: "GraphQL", icon: "🔺", color: "from-pink-500 to-purple-500" },
  { name: "Python", icon: "🐍", color: "from-yellow-400 to-blue-500" },
  { name: "Java", icon: "☕", color: "from-orange-500 to-red-500" },
  { name: "Next.js", icon: "▲", color: "from-gray-800 to-black" },
  { name: "NestJS", icon: "🟥", color: "from-red-500 to-pink-500" },
  { name: "PHP", icon: "🐘", color: "from-indigo-500 to-purple-500" },
  { name: "WordPress", icon: "📰", color: "from-blue-500 to-blue-700" },
  { name: ".NET", icon: "🟣", color: "from-purple-600 to-indigo-600" }
];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {techs.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/10 hover:border-cyan-500/50 transition-all"
        >
          <div className="text-3xl mb-2">{tech.icon}</div>
          <p className="text-sm font-medium text-white">{tech.name}</p>
          <div className={`h-1 w-12 mx-auto mt-2 bg-gradient-to-r ${tech.color} rounded-full`} />
        </motion.div>
      ))}
    </div>
  );
};

// Why Choose Us Section
const WhyChooseUs = () => {


const features = [

   {
    icon: Code,
    title: "Web Development",
    description: "Modern, scalable and responsive website development"
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Cross-platform mobile apps for Android & iOS"
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Professional video editing for YouTube & branding"
  },
  {
    icon: Megaphone,
    title: "Meta Ads",
    description: "High-converting Facebook & Instagram ad campaigns"
  },
  {
    icon: BarChart3,
    title: "Google Ads",
    description: "ROI-focused Google Ads for maximum conversions"
  },
  {
    icon: Share2,
    title: "Social Media Marketing",
    description: "Grow your brand presence across all social platforms"
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Enterprise-grade security with SSL encryption and best practices"
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Highly optimized apps with 95+ Lighthouse performance score"
  },
  {
    icon: TrendingUp,
    title: "SEO Optimized",
    description: "Advanced SEO strategies to boost your online visibility"
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "24/7 support and maintenance for your business"
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "100% satisfaction guarantee with premium quality work"
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We follow agile methods to deliver projects on time"
  },

  // Services Section
 
];
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all group"
        >
          <feature.icon size={40} className="text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
          <p className="text-gray-400 text-sm">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

// Process Section
const Process = () => {
  const steps = [
    { number: "01", title: "Discovery", description: "Understanding your vision and requirements" },
    { number: "02", title: "Planning", description: "Architecture design and timeline planning" },
    { number: "03", title: "Development", description: "Agile development with regular updates" },
    { number: "04", title: "Testing", description: "Rigorous testing across all platforms" },
    { number: "05", title: "Deployment", description: "Smooth launch with monitoring" },
    { number: "06", title: "Support", description: "Ongoing maintenance and improvements" },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent mb-4">
              {step.number}
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
            <p className="text-gray-400 text-sm">{step.description}</p>
          </div>
          {index < steps.length - 1 && (
            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
              <ArrowRight className="text-cyan-400" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

// Testimonials Section
const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Fashion Store",
      text: "Exceptional work! The e-commerce platform they built for us exceeded all expectations. Sales increased by 200% in the first month.",
      rating: 5,
      image: "👨‍💼"
    },
    {
      name: "Priya Sharma",
      company: "Tech Corp",
      text: "Professional team, delivered ahead of schedule. The website is fast, secure, and looks amazing. Highly recommended!",
      rating: 5,
      image: "👩‍💼"
    },
    {
      name: "Amit Patel",
      company: "Booking Hub",
      text: "The booking system they developed transformed our business. Seamless integration and excellent support throughout.",
      rating: 5,
      image: "👨‍💻"
    }
  ];

  const [current, setCurrent] = useState(0);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: -current * 100 + '%' }}
          transition={{ duration: 0.5 }}
          className="flex"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl">{testimonial.image}</div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                    <p className="text-cyan-400 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">"{testimonial.text}"</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === index ? 'w-8 bg-cyan-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Contact Form
const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  phoneNumber: "",
  message: ""
});

const [isSubmitting, setIsSubmitting] = useState(false);
const [submitStatus, setSubmitStatus] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch(`${ BASE_URL}/v1/queries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed");
    }

    setSubmitStatus("success");

    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    });

  } catch (err) {
    console.error(err);
    setSubmitStatus("error");
  }

  setIsSubmitting(false);
};

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission
  //   console.log(formData);
  //   setSubmitted(true);
  //   setTimeout(() => setSubmitted(false), 3000);
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="tel"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
        />
      </div>
      <textarea
        placeholder="Tell us about your project..."
        rows={5}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
        required
      />
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
      >
        Send Message
      </motion.button>
      
      {submitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/20 border border-green-500 rounded-xl p-4 text-center text-green-400"
        >
          Thank you! We'll get back to you within 24 hours.
        </motion.div>
      )}
    </form>
  );
};

export default function Home() {
  const router = useRouter();
  const [activeService, setActiveService] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Online Store Solution",
      description: "Full-featured e-commerce platform with payment integration, inventory management, and powerful admin dashboard. Perfect for retail businesses looking to scale online.",
      price: 15000,
      icon: ShoppingBag,
      features: [
        "Product Management System",
        "Multiple Payment Gateways",
        "Advanced Inventory Control",
        "Order Management Dashboard",
        "Customer Analytics",
        "Marketing Tools Integration"
      ],
      tech: ["React", "Node.js", "MongoDB", "Stripe", "Redis"]
    },
    {
      id: 2,
      title: "Business Website",
      category: "Corporate Solution",
      description: "Professional corporate website with modern design, SEO optimization, and content management system. Ideal for establishing strong online presence.",
      price: 8999,
      icon: Building2,
      features: [
        "Responsive Design",
        "SEO Optimized Structure",
        "CMS Integration",
        "Contact Forms & Maps",
        "Blog Platform",
        "Analytics Dashboard"
      ],
      tech: ["Next.js", "Tailwind", "Sanity.io", "TypeScript"]
    },
    {
      id: 3,
      title: "Booking System",
      category: "Appointment Platform",
      description: "Complete booking and scheduling system with calendar sync, automated notifications, and customer management. Perfect for service-based businesses.",
      price: 11999,
      icon: Calendar,
      features: [
        "Calendar Integration",
        "Automated Reminders",
        "Payment Processing",
        "Customer Portal",
        "Staff Management",
        "Reports & Analytics"
      ],
      tech: ["React", "Node.js", "PostgreSQL", "Google Calendar API"]
    },
    {
      id: 4,
      title: "Custom Web App",
      category: "Tailored Solutions",
      description: "Custom web applications built to your exact specifications. From CRMs to complex business systems, we bring your vision to life.",
      price: 25000,
      icon: Code2,
      features: [
        "Custom Features",
        "Scalable Architecture",
        "API Integration",
        "Admin Dashboard",
        "User Authentication",
        "Data Visualization"
      ],
      tech: ["React/Next.js", "Node.js/Python", "MongoDB/PostgreSQL", "AWS/Azure"]
    },
    {
      id: 5,
      title: "Mobile App Development",
      category: "iOS & Android",
      description: "Cross-platform mobile applications using React Native. Seamless experience across all devices with native performance.",
      price: 35000,
      icon: Smartphone,
      features: [
        "Cross-Platform",
        "Push Notifications",
        "Offline Support",
        "App Store Deployment",
        "User Analytics",
        "In-App Purchases"
      ],
      tech: ["React Native", "Node.js", "Firebase", "MongoDB"]
    },
    {
      id: 6,
      title: "Security & Deployment",
      category: "Infrastructure Setup",
      description: "Enterprise-grade security implementation, CI/CD pipelines, and cloud deployment services. Ensure your application is secure and scalable.",
      price: 20000,
      icon: Shield,
      features: [
        "SSL Implementation",
        "DDoS Protection",
        "CI/CD Pipeline",
        "Cloud Deployment",
        "Backup Solutions",
        "Security Audits"
      ],
      tech: ["Docker", "Kubernetes", "AWS/Azure", "GitHub Actions", "CloudFlare"]
    }
  ];

  const nextService = () => {
    setActiveService((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setActiveService((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
          <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>

          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
              <AnimatedBackground />
              <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade />
              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                <TechSphere />
              </Float>
              <CodeParticles />
              <FloatingIcons />
              <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
          </div>

          <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-500/30"
              >
                <span className="text-cyan-400 text-sm font-medium">🚀 Your Trusted Tech Partner</span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Innovate
                </span>
                <br />
                <span className="text-white">With Confidence</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                We build high-performance web solutions that drive growth, enhance security, and deliver exceptional user experiences.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/services")}
                  className="w-full sm:w-auto px-8 md:px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all"
                >
                  View Our Work
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 md:px-10 py-4 border-2 border-cyan-500 rounded-full font-semibold text-lg hover:bg-cyan-500/10 transition-all"
                >
                  Get Free Consultation
                </motion.button>
              </div>

              <div className="mt-16 flex flex-wrap justify-center gap-8">
                {[
                  { value: "30+", label: "Projects Delivered" },
                  { value: "100", label: "Client Satisfaction", suffix: "%" },
                  { value: "24/7", label: "Support Available" },
                  { value: "4.9", label: "Client Rating", suffix: "/5" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-cyan-400">{stat.value}{stat.suffix || ''}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Slider Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-900 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Our Services
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                Comprehensive web solutions tailored to your business needs
              </p>
            </motion.div>

            <div className="relative">
              <button
                onClick={prevService}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-xl rounded-full p-2 hover:bg-white/20 transition-all hidden md:block"
              >
                <ChevronLeft size={30} className="text-white" />
              </button>
              
              <div className="overflow-hidden px-4 md:px-12">
                <div className="grid md:grid-cols-3 gap-6">
                  {services.map((service, index) => {
                    const isActive = index === activeService;
                    const isAdjacent = Math.abs(index - activeService) === 1;
                    const display = isActive || isAdjacent || (activeService === 0 && index === services.length - 1) || (activeService === services.length - 1 && index === 0);
                    
                    if (!display) return null;
                    
                    return (
                      <div key={service.id} className={isActive ? 'md:col-span-1' : 'hidden md:block'}>
                        <ServiceCard 
                          service={service} 
                          index={index} 
                          isActive={isActive}
                          onClick={() => setActiveService(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <button
                onClick={nextService}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-xl rounded-full p-2 hover:bg-white/20 transition-all hidden md:block"
              >
                <ChevronRight size={30} className="text-white" />
              </button>
            </div>
            
            <div className="flex justify-center gap-2 mt-8 md:hidden">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeService === index ? 'w-8 bg-cyan-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Why Choose Us?
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                We deliver excellence through innovation and dedication
              </p>
            </motion.div>
            <WhyChooseUs />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-900 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Technology Stack
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                Cutting-edge technologies for modern web solutions
              </p>
            </motion.div>
            <TechStack />
          </div>
        </section>

        {/* Development Process */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Our Process
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                A systematic approach to bring your ideas to life
              </p>
            </motion.div>
            <Process />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-zinc-900 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  What Our Clients Say
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                Trusted by businesses worldwide
              </p>
            </motion.div>
            <Testimonials />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                  Let's Work Together
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-400">
                Ready to start your project? Get in touch with us today
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-gray-300">
                    <Mail size={24} className="text-cyan-400" />
                    <span>info.trishaconsultancyservice@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <Phone size={24} className="text-cyan-400" />
                    <span>+91 6388469930</span>
                    <span>+91 6306339464</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300">
                    <MapPin size={24} className="text-cyan-400" />
                    <span>Delhi-NCR,India</span>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                  <h4 className="text-xl font-bold mb-4">Business Hours</h4>
                  <div className="space-y-2 text-gray-300">
                    <p>Monday -Saturday : 9:00 AM - 8:00 PM</p>
                    <p>Sunday: 11:00 AM - 8:00 PM</p>
                 
                  </div>
                </div>
              </div>
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

// Add TechSphere component (add this before the Home component)
const TechSphere = () => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.003;
      ref.current.rotation.x += 0.002;
    }
  });

  return (
    <Sphere ref={ref} args={[1.5, 128, 128]} position={[0, 0, 0]}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.3}
        speed={1}
        roughness={0.2}
        metalness={0.8}
        emissive="#1e3a8a"
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
};