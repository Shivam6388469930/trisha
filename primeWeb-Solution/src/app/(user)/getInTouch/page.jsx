// "use client";
// import React, { useState, useRef } from 'react';
// import axios from "axios";
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Sphere, MeshDistortMaterial } from '@react-three/drei';
// import * as THREE from 'three';

// // 3D Floating Icons for GetInTouch Form
// const FormFloatingIcons = () => {
//   const groupRef = useRef();
  
//   useFrame((state) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y += 0.003;
//       groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
//     }
//   });

//   const icons = [
//     { position: [3, 1, 0], color: '#00a8ff' },
//     { position: [-3, -1, 1], color: '#9c88ff' },
//     { position: [0, 2, -1], color: '#f368e0' },
//     { position: [2, -2, 2], color: '#00a8ff' },
//   ];

//   return (
//     <group ref={groupRef}>
//       {icons.map((icon, index) => (
//         <Sphere key={index} position={icon.position} args={[0.2, 16, 16]}>
//           <MeshDistortMaterial
//             color={icon.color}
//             attach="material"
//             distort={0.2}
//             speed={1.2}
//             roughness={0.3}
//             metalness={0.6}
//           />
//         </Sphere>
//       ))}
//     </group>
//   );
// };

// // 3D Background for Form
// const FormBackground = () => {
//   const meshRef = useRef();
  
//   useFrame((state, delta) => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += delta * 0.02;
//       meshRef.current.rotation.y += delta * 0.015;
//     }
//   });

//   return (
//     <mesh ref={meshRef} scale={[10, 10, 1]}>
//       <planeGeometry args={[1, 1, 16, 16]} />
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
//             vec2 pos = vUv * 2.0 - 1.0;
//             float d = length(pos);
//             float pulse = sin(time + d * 3.0) * 0.3 + 0.4;
            
//             vec3 color = mix(color1, color2, pulse);
//             color = mix(color, color3, vUv.x * 0.2 + vUv.y * 0.1);
            
//             gl_FragColor = vec4(color, 0.8);
//           }
//         `}
//         transparent
//       />
//     </mesh>
//   );
// };

// export default function GetInTouchForm() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     mobileNumber: "",
//     companyName: "",
//     country: "",
//     category: "",
//     budget: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [responseMsg, setResponseMsg] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResponseMsg("");

//     try {
//       const res = await axios.post(
//         "http://localhost:5000/v1/get-in-touch",
//         formData
//       );

//       setResponseMsg("Your inquiry has been submitted successfully!");
//       setFormData({
//         firstName: "",
//         lastName: "",
//         email: "",
//         mobileNumber: "",
//         companyName: "",
//         country: "",
//         category: "",
//         budget: "",
//         message: "",
//       });
//     } catch (err) {
//       setResponseMsg("Something went wrong! Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="get-in-touch-container">
//       {/* 3D Background */}
//       <div className="form-canvas">
//         <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
//           <FormBackground />
//           <FormFloatingIcons />
//           <ambientLight intensity={0.5} />
//           <pointLight position={[5, 5, 5]} intensity={0.6} />
//         </Canvas>
//       </div>

//       {/* Form Content */}
//       <div className="form-content">
//         <div className="form-header">
//           <h2 className="form-title">
//             Get In <span className="gradient-text">Touch</span>
//           </h2>
//           <p className="form-subtitle">
//             Ready to start your project? Fill out the form below and we'll get back to you within 24 hours.
//           </p>
//         </div>

//         {responseMsg && (
//           <div className={`response-message ${responseMsg.includes('successfully') ? 'success' : 'error'}`}>
//             <i className={`fas ${responseMsg.includes('successfully') ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
//             {responseMsg}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="enhanced-form">
//           {/* Name Row */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="firstName">First Name</label>
//               <input
//                 id="firstName"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter your first name"
//                 required
//                 className="form-input"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="lastName">Last Name</label>
//               <input
//                 id="lastName"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter your last name"
//                 className="form-input"
//               />
//             </div>
//           </div>

//           {/* Contact Row */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="email">Email Address</label>
//               <input
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 type="email"
//                 placeholder="Enter your email"
//                 required
//                 className="form-input"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="mobileNumber">Mobile Number</label>
//               <input
//                 id="mobileNumber"
//                 name="mobileNumber"
//                 value={formData.mobileNumber}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter your mobile number"
//                 required
//                 className="form-input"
//               />
//             </div>
//           </div>

//           {/* Company & Country */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="companyName">Company Name</label>
//               <input
//                 id="companyName"
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter your company name"
//                 required
//                 className="form-input"
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="country">Country</label>
//               <input
//                 id="country"
//                 name="country"
//                 value={formData.country}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter your country"
//                 required
//                 className="form-input"
//               />
//             </div>
//           </div>

//           {/* Category & Budget */}
//           <div className="form-row">
//             <div className="form-group">
//               <label htmlFor="category">Project Category</label>
//               <select
//                 id="category"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
                
//                 required
//                 className="form-select"
//               >
//                 <option value="">Select Category</option>
//                 <option value="Web Development">Web Development</option>
//                 <option value="Mobile App">Mobile App</option>
//                 <option value="E-Commerce">E-Commerce</option>
//                 <option value="Digital Marketing">Digital Marketing</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="budget">Project Budget</label>
//               <select
//                 id="budget"
//                 name="budget"
//                 value={formData.budget}
//                 onChange={handleChange}
//                 required
//                 className="form-select"
//               >
//                 <option value="">Select Budget</option>
//                 <option value="Less than $1000">Less than $1000</option>
//                 <option value="$1000 - $3000">$1000 - $3000</option>
//                 <option value="$3000 - $5000">$3000 - $5000</option>
//                 <option value="Above $5000">Above $5000</option>
//               </select>
//             </div>
//           </div>

//           {/* Message */}
//           <div className="form-group full-width">
//             <label htmlFor="message">Project Details</label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               rows="4"
//               placeholder="Tell us about your project requirements, timeline, and any specific details..."
//               className="form-textarea"
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`submit-button ${loading ? 'loading' : ''}`}
//           >
//             {loading ? (
//               <>
//                 <div className="button-spinner"></div>
//                 Processing...
//               </>
//             ) : (
//               <>
//                 <i className="fas fa-paper-plane"></i>
//                 Submit Inquiry
//               </>
//             )}
//           </button>
//         </form>

//         {/* Quick Info */}
//         <div className="form-footer">
//           <div className="info-item">
//             <i className="fas fa-clock"></i>
//             <span>Response within 24 hours</span>
//           </div>
//           <div className="info-item">
//             <i className="fas fa-lock"></i>
//             <span>Your data is secure</span>
//           </div>
//           <div className="info-item">
//             <i className="fas fa-headset"></i>
//             <span>Free consultation</span>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .get-in-touch-container {
//           position: relative;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 2rem;
//           overflow: hidden;
//         }

//         .form-canvas {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           z-index: 1;
//         }

//         .form-content {
//           position: relative;
//           z-index: 2;
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(20px);
//           border: 1px solid rgba(255, 255, 255, 0.1);
//           border-radius: 20px;
//           padding: 2.5rem;
//           max-width: 800px;
//           width: 100%;
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
//         }

//         .form-header {
//           text-align: center;
//           margin-bottom: 2rem;
//         }

//         .form-title {
//           font-size: 2.5rem;
//           font-weight: 700;
//           margin-bottom: 0.5rem;
//           color: white;
//         }

//         .gradient-text {
//           background: linear-gradient(135deg, #00a8ff 0%, #9c88ff 50%, #f368e0 100%);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: black;
//           background-clip: text;
//         }

//         .form-subtitle {
//           color: rgba(255, 255, 255, 0.8);
//           font-size: 1.1rem;
//           line-height: 1.6;
//         }

//         .response-message {
//           padding: 1rem;
//           border-radius: 10px;
//           margin-bottom: 2rem;
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           font-weight: 600;
//         }

//         .response-message.success {
//           background: rgba(46, 213, 115, 0.1);
//           color: #2ed573;
//           border: 1px solid rgba(46, 213, 115, 0.3);
//         }

//         .response-message.error {
//           background: rgba(255, 71, 87, 0.1);
//           color: #ff4757;
//           border: 1px solid rgba(255, 71, 87, 0.3);
//         }

//         .enhanced-form {
//           display: flex;
//           flex-direction: column;
//           gap: 1.5rem;
//         }

//         .form-row {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 1rem;
//         }

//         .form-group {
//           display: flex;
//           flex-direction: column;
//         }

//         .form-group.full-width {
//           grid-column: 1 / -1;
//         }

//         label {
//           color: white;
//           margin-bottom: 0.5rem;
//           font-weight: 600;
//           font-size: 0.9rem;
//         }

//         .form-input,
//         .form-select,
//         .form-textarea {
//         //   background: rgba(255, 255, 255, 0.1);
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           border-radius: 10px;
//           padding: 0.75rem 1rem;
//           color: white;
//           font-size: 1rem;
//           transition: all 0.3s ease;
//         }

//         .form-input::placeholder,
//         .form-textarea::placeholder {
//           color: rgba(255, 255, 255, 0.6);
//         }

//         .form-input:focus,
//         .form-select:focus,
//         .form-textarea:focus {
//           outline: none;
//           border-color: #00a8ff;
//           background: rgba(255, 255, 255, 0.15);
//           box-shadow: 0 0 0 3px rgba(0, 168, 255, 0.1);
//         }

//         .form-select {
//           appearance: none;
//           background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
//           background-repeat: no-repeat;
//           background-position: right 1rem center;
//           background-size: 1rem;
//         }

//         .form-textarea {
//           resize: vertical;
//           min-height: 120px;
//         }

//         .submit-button {
//           background: linear-gradient(135deg, #00a8ff 0%, #9c88ff 100%);
//           color: white;
//           border: none;
//           border-radius: 10px;
//           padding: 1rem 2rem;
//           font-size: 1.1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           margin-top: 1rem;
//         }

//         .submit-button:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 25px rgba(0, 168, 255, 0.3);
//         }

//         .submit-button:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .submit-button.loading {
//           background: linear-gradient(135deg, #9c88ff 0%, #f368e0 100%);
//         }

//         .button-spinner {
//           width: 1rem;
//           height: 1rem;
//           border: 2px solid transparent;
//           border-top: 2px solid white;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .form-footer {
//           display: flex;
//           justify-content: center;
//           gap: 2rem;
//           margin-top: 2rem;
//           padding-top: 2rem;
//           border-top: 1px solid rgba(255, 255, 255, 0.1);
//         }

//         .info-item {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: rgba(255, 255, 255, 0.7);
//           font-size: 0.9rem;
//         }

//         .info-item i {
//           color: #00a8ff;
//         }

//         @media (max-width: 768px) {
//           .form-content {
//             padding: 1.5rem;
//           }

//           .form-row {
//             grid-template-columns: 1fr;
//           }

//           .form-title {
//             font-size: 2rem;
//           }

//           .form-footer {
//             flex-direction: column;
//             gap: 1rem;
//             align-items: center;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

// -------------------------------------------------------------------
// 3D Floating Icons
// -------------------------------------------------------------------
const FormFloatingIcons = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  const icons = [
    { position: [3, 1, 0], color: "#00a8ff" },
    { position: [-3, -1, 1], color: "#9c88ff" },
    { position: [0, 2, -1], color: "#f368e0" },
    { position: [2, -2, 2], color: "#00a8ff" },
  ];

  return (
    <group ref={groupRef}>
      {icons.map((icon, index) => (
        <Sphere key={index} position={icon.position} args={[0.2, 16, 16]}>
          <MeshDistortMaterial
            color={icon.color}
            distort={0.2}
            speed={1.2}
            roughness={0.3}
            metalness={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
};

// -------------------------------------------------------------------
// 3D Background
// -------------------------------------------------------------------
const FormBackground = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.02;
      meshRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          color1: { value: new THREE.Color("#0f0c29") },
          color2: { value: new THREE.Color("#302b63") },
          color3: { value: new THREE.Color("#24243e") },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          varying vec2 vUv;

          void main() {
            vec2 pos = vUv * 2.0 - 1.0;
            float d = length(pos);
            float pulse = sin(time + d * 3.0) * 0.3 + 0.4;

            vec3 color = mix(color1, color2, pulse);
            color = mix(color, color3, vUv.x * 0.2 + vUv.y * 0.1);

            gl_FragColor = vec4(color, 0.8);
          }
        `}
        transparent
      />
    </mesh>
  );
};

// -------------------------------------------------------------------
// FORM COMPONENT
// -------------------------------------------------------------------
export default function GetInTouchForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    companyName: "",
    country: "",
    category: "",
    budget: "", // <-- updated to text input
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  // ---------------------------
  // AUTO FILL: category from URL
  // ---------------------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const categoryFromURL = params.get("category");

      if (categoryFromURL) {
        setFormData((prev) => ({
          ...prev,
          category: categoryFromURL,
        }));
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const router=useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");
router.push('/services')

    try {
      await axios.post("http://localhost:5000/v1/get-in-touch", formData);

      setResponseMsg("Your inquiry has been submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        companyName: "",
        country: "",
        category: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      setResponseMsg("Something went wrong! Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
 
    <div className="get-in-touch-container">

      {/* Background Canvas */}
      <div className="form-canvas">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <FormBackground />
          <FormFloatingIcons />
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={0.6} />
        </Canvas>
      </div>
    

      {/* Form Content */}
      <div className="form-content">
    <div className="flex justify-end items-center pt-6 z-50">
    <button className="flex items-center text-blue-500 hover:text-blue-700 font-medium transition-all duration-200" onClick={()=>router.back()}>
      <FaArrowLeft className="mr-2" />
      Back
    </button>
  </div>
        <div className="form-header">
          <h2 className="form-title">
            Get In <span className="text-violet-500">Touch</span>
          </h2>
          <p className="form-subtitle">
            Ready to start your project? Fill out the form below and we'll get
            back to you within 24 hours.
          </p>
        </div>

        {responseMsg && (
          <div
            className={`response-message ${
              responseMsg.includes("successfully") ? "success" : "error"
            }`}
          >
            <i
              className={`fas ${
                responseMsg.includes("successfully")
                  ? "fa-check-circle"
                  : "fa-exclamation-circle"
              }`}
            ></i>
            {responseMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="enhanced-form">
          {/* Row 1 */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                placeholder="Enter your first name"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Enter your last name"
                className="form-input"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row">
            <div className="form-group">
              <label>Email Address</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                type="text"
                placeholder="Enter your mobile number"
                required
                className="form-input"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                type="text"
                placeholder="Enter your company name"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Country</label>
              <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                type="text"
                placeholder="Enter your country"
                required
                className="form-input"
              />
            </div>
          </div>

          {/* CATEGORY (Auto-filled but editable) + BUDGET TEXT FIELD */}
          <div className="form-row">
            <div className="form-group">
              <label>Project Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                type="text"
                placeholder="Project Category"
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Project Budget</label>
              <input
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                type="text"
                placeholder="Enter your budget"
                required
                className="form-input"
              />
            </div>
          </div>

          {/* MESSAGE */}
          <div className="form-group full-width">
            <label>Project Details</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about your project..."
              className="form-textarea"
            ></textarea>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <>
                <div className="button-spinner"></div> Processing...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i> Submit Inquiry
              </>
            )}
          </button>
        </form>

        {/* FOOTER */}
        <div className="form-footer">
          <div className="info-item">
            <i className="fas fa-clock"></i>
            <span>Response within 24 hours</span>
          </div>
          <div className="info-item">
            <i className="fas fa-lock"></i>
            <span>Your data is secure</span>
          </div>
          <div className="info-item">
            <i className="fas fa-headset"></i>
            <span>Free consultation</span>
          </div>
        </div>
      </div>

      {/* 🔥 CSS — EXACT SAME, NOT MODIFIED */}
     <style jsx>{`
        .get-in-touch-container {
          position: relative;
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          overflow: hidden;
        }

        .form-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .form-content {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          max-width: 800px;
          width: 100%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: white;
        }

        .gradient-text {
          background: linear-gradient(135deg, #00a8ff 0%, #9c88ff 50%, #f368e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: black;
          background-clip: text;
        }

        .form-subtitle {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .response-message {
          padding: 1rem;
          border-radius: 10px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
        }

        .response-message.success {
          background: rgba(46, 213, 115, 0.1);
          color: #2ed573;
          border: 1px solid rgba(46, 213, 115, 0.3);
        }

        .response-message.error {
          background: rgba(255, 71, 87, 0.1);
          color: #ff4757;
          border: 1px solid rgba(255, 71, 87, 0.3);
        }

        .enhanced-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        label {
          color: white;
          margin-bottom: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
        //   background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #00a8ff;
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 0 3px rgba(0, 168, 255, 0.1);
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1rem;
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          background: linear-gradient(135deg, #00a8ff 0%, #9c88ff 100%);
          color: white;
          border: none;
          border-radius: 10px;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 168, 255, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .submit-button.loading {
          background: linear-gradient(135deg, #9c88ff 0%, #f368e0 100%);
        }

        .button-spinner {
          width: 1rem;
          height: 1rem;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .form-footer {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .info-item i {
          color: #00a8ff;
        }

        @media (max-width: 768px) {
          .form-content {
            padding: 1.5rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-title {
            font-size: 2rem;
          }

          .form-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }
        }
      `}</style>
    </div>
      </>
  );
}
