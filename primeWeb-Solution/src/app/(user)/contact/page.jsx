'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import '../../css/contact.css';
import { BASE_URL } from '../../../../api';

// 3D Floating Contact Icons
const FloatingIcons = () => {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const icons = [
    { position: [2, 1, 0], color: '#00a8ff', type: 'email' },
    { position: [-2, -1, 1], color: '#9c88ff', type: 'phone' },
    { position: [0, 2, -1], color: '#f368e0', type: 'location' },
    { position: [1, -2, 2], color: '#00a8ff', type: 'linkedin' },
    { position: [-1, 0, -2], color: '#9c88ff', type: 'github' },
  ];

  return (
    <group ref={groupRef}>
      {icons.map((icon, index) => (
        <Sphere key={index} position={icon.position} args={[0.3, 16, 16]}>
          <MeshDistortMaterial
            color={icon.color}
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.2}
            metalness={0.7}
          />
        </Sphere>
      ))}
    </group>
  );
};

// 3D Animated Background
// const ContactBackground = () => {
//   const meshRef = useRef();
//   const { viewport } = useThree();
  
//   useFrame((state, delta) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += delta * 0.05;
//       meshRef.current.rotation.y += delta * 0.03;
//       meshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
//     }
//   });

//   return (
//     <mesh ref={meshRef} scale={[viewport.width * 1.2, viewport.height * 1.2, 1]}>
//       <planeGeometry args={[1, 1, 32, 32]} />
//       <shaderMaterial
//         uniforms={{
//           time: { value: 0 },
//           color1: { value: new THREE.Color('#0f0c29') },
//           color2: { value: new THREE.Color('#302b63') },
//           color3: { value: new THREE.Color('#24243e') }
//         }}
//         vertexShader={`
//           varying vec2 vUv;
//           void main() {
//             vUv = uv;
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//           }
//         `}
//         fragmentShader={`
//           uniform float time;
//           uniform vec3 color1;
//           uniform vec3 color2;
//           uniform vec3 color3;
//           varying vec2 vUv;
          
//           void main() {
//             vec2 pos = vUv * 3.0 - 1.5;
//             float d = length(pos);
//             float pulse = sin(time * 1.2 + d * 5.0) * 0.5 + 0.5;
            
//             vec3 color = mix(color1, color2, pulse);
//             color = mix(color, color3, vUv.x * 0.3 + vUv.y * 0.2);
            
//             // Connection lines effect
//             float lines = sin(pos.x * 10.0 + time * 2.0) * sin(pos.y * 10.0 + time * 2.0);
//             color += lines * 0.1;
            
//             gl_FragColor = vec4(color, 1.0);
//           }
//         `}
//       />
//     </mesh>
//   );
// };

// 3D Connection Lines
const ConnectionLines = () => {
  const linesRef = useRef();
  const [geometry] = useState(() => {
    const geometry = new THREE.BufferGeometry();
    const points = [];
    
    // Create connection lines between points
    for (let i = 0; i < 20; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8
      );
      
      points.push(start, end);
    }
    
    const positions = new Float32Array(points.length * 3);
    points.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  });

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#00a8ff" transparent opacity={0.3} />
    </lineSegments>
  );
};

// Contact Form Component
const ContactForm = () => {
   const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        throw new Error(data.message || "Failed to submit query");
      }

      setSubmitStatus("success");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });

    } catch (err) {
      setSubmitStatus("error");
    }

    setIsSubmitting(false);

    setTimeout(() => {
      setSubmitStatus("");
    }, 3000);
  };

  return (
   

    <form className="contact-form" onSubmit={handleSubmit}>
      
      {/* Name */}
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your full name"
        />
      </div>

      {/* Email */}
      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email address"
        />
      </div>

      {/* Phone Number */}
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          placeholder="Enter your phone number"
        />
      </div>

      {/* Message */}
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Write your message here"
        ></textarea>
      </div>

      {/* Submit Button */}
      <button 
        type="submit"
        className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <div className="spinner"></div>
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      {/* Success / Error Message */}
      {submitStatus === "success" && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          Message sent successfully!
        </div>
      )}

      {submitStatus === "error" && (
        <div className="error-message">
          <i className="fas fa-times-circle"></i>
          Failed to send message. Try again!
        </div>
      )}
    </form>
  );
};

// Contact Information Component
const ContactInfo = () => {
  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'trishaconsultancyservices.tcs@gmail.com',
      link: 'mailto:trishaconsultancyservices.tcs@gmail.com',
      color: '#00a8ff'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+91 9598705515',
      link: 'tel:+919598705515',
      color: '#9c88ff'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'Noida Sector 62',
      link: '#',
      color: '#f368e0'
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      value: 'linkedin.com/in/sudhirmaurya07',
      link: 'www.linkedin.com/in/sudhirmaurya07',
      color: '#00a8ff'
    },
    
    
  ];

  return (
    <div className="contact-info">
      <h3>Get In Touch</h3>
      <p>I'm always open to discussing new opportunities, creative projects, or just having a chat about technology.</p>
      
      <div className="contact-methods">
        {contactMethods.map((method, index) => (
          <a 
            key={index} 
            href={method.link} 
            className="contact-method"
            target={method.link.startsWith('http') ? '_blank' : '_self'}
            rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
          >
            <div className="method-icon" style={{ backgroundColor: `${method.color}20` }}>
              <i className={method.icon} style={{ color: method.color }}></i>
            </div>
            <div className="method-details">
              <h4>{method.title}</h4>
              <p>{method.value}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

// Main Contact Component
const ContactPage = () => {
  const [activeSection, setActiveSection] = useState('contact');

  return (
    <div className="contact-container">
      

      {/* 3D Background Canvas */}
      <div className="contact-canvas">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          {/* <ContactBackground /> */}
          <FloatingIcons />
          <ConnectionLines />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.8}
          />
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        </Canvas>
      </div>

      {/* Contact Content */}
      <div className="contact-content mb-6">
        <div className="container">
          {/* Header Section */}
          <div className="contact-header">
            <h1 className="contact-title">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="contact-subtitle">
              Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
            </p>
          </div>

          {/* Contact Sections */}
          <div className="contact-sections">
            {/* Contact Form Section */}
            <div className="contact-section">
              <div className="section-card">
                <h2>Send Me a Message</h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="contact-section">
              <div className="section-card">
                <ContactInfo />
              </div>
            </div>
          </div>

          {/* Quick Response Info */}
          <div className="response-info">
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="info-content">
                <h3>Quick Response</h3>
                <p>I typically respond to messages within 24 hours. For urgent inquiries, feel free to call directly.</p>
              </div>
            </div>
            
            <div className="info-card">
              <div className="info-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="info-content">
                <h3>Available for Projects</h3>
                <p>Currently available for freelance projects and full-time opportunities starting December 2024.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default ContactPage;