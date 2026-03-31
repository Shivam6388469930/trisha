// 'use client';

// import { useState, useEffect } from 'react';
// import useSWR, { mutate } from 'swr';
// import { motion, AnimatePresence } from 'framer-motion';
// import toast, { Toaster } from 'react-hot-toast';

// const fetcher = (url) => fetch(url).then((res) => res.json());

// const ServicesAdmin = () => {
//   const { data, error } = useSWR('http://localhost:5000/v1/service', fetcher);
//   const services = data?.services || [];

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingService, setEditingService] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);
//   const [previewImage, setPreviewImage] = useState('');

//   const [formData, setFormData] = useState({
//     title: '',
//     category: '',
//     description: '',
//     price: '',
//     icon: 'Tool',
//     accentColor: '#00a8ff',
//     timeline: '',
//     revisions: '',
//     features: '',
//     technologies: '',
//     image: null,
//   });

//   useEffect(() => {
//     if (editingService) {
//       setFormData({
//         title: editingService.title || '',
//         category: editingService.category || '',
//         description: editingService.description || '',
//         price: editingService.price || '',
//         icon: editingService.icon || 'Tool',
//         accentColor: editingService.accentColor || '#00a8ff',
//         timeline: editingService.timeline || '',
//         revisions: editingService.revisions || '',
//         features: (editingService.features || []).join('\n'),
//         technologies: (editingService.technologies || []).join(', '),
//         image: null,
//       });
//       setPreviewImage(editingService.image ? `http://localhost:5000${editingService.image}` : '');
//     }
//   }, [editingService]);

//   const handleInputChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'image') {
//       const file = files[0];
//       setFormData({ ...formData, image: file });
//       if (file) {
//         setPreviewImage(URL.createObjectURL(file));
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === 'features') {
//         form.append(key, JSON.stringify(formData[key].split('\n').filter(Boolean)));
//       } else if (key === 'technologies') {
//         form.append(key, JSON.stringify(formData[key].split(',').map(t => t.trim()).filter(Boolean)));
//       } else if (formData[key] !== null && formData[key] !== '') {
//         form.append(key, formData[key]);
//       }
//     });

//     const url = editingService
//       ? `http://localhost:5000/v1/service/${editingService._id}`
//       : 'http://localhost:5000/v1/service';

//     const method = editingService ? 'PUT' : 'POST';

//     try {
//       const res = await fetch(url, {
//         method,
//         body: form,
//       });

//       const result = await res.json();
//       if (result.success) {
//         toast.success(editingService ? 'Service updated!' : 'Service created!');
//         mutate('http://localhost:5000/v1/service');
//         closeModal();
//       } else {
//         toast.error(result.message || 'Something went wrong');
//       }
//     } catch (err) {
//       toast.error('Network error');
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await fetch(`http://localhost:5000/v1/service/${deletingId}`, { method: 'DELETE' });
//       toast.success('Service deleted!');
//       mutate('http://localhost:5000/v1/service');
//       setDeletingId(null);
//     } catch (err) {
//       toast.error('Failed to delete');
//     }
//   };

//   const openEdit = (service) => {
//     setEditingService(service);
//     setIsModalOpen(true);
//   };

//   const openAdd = () => {
//     setEditingService(null);
//     setPreviewImage('');
//     setFormData({
//       title: '',
//       category: '',
//       description: '',
//       price: '',
//       icon: 'Tool',
//       accentColor: '#00a8ff',
//       timeline: '',
//       revisions: '',
//       features: '',
//       technologies: '',
//       image: null,
//     });
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingService(null);
//     setPreviewImage('');
//   };

//   if (error) return <div className="text-red-400 text-center pt-20">Failed to load services</div>;
//   if (!data) return <div className="text-white text-center pt-20">Loading...</div>;

//   return (
//     <>
//       <Toaster position="top-right" />
//       <div className="min-h-screen bg-black text-white py-10 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex justify-between items-center mb-10">
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
//               Admin - Services Panel
//             </h1>
//             <button
//               onClick={openAdd}
//               className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition"
//             >
//               + Add New Service
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             <AnimatePresence>
//               {services.map((service) => (
//                 <motion.div
//                   key={service._id}
//                   layout
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.9 }}
//                   className="bg-gray-900/80 backdrop-blur rounded-2xl border border-white/10 overflow-hidden"
//                 >
//                   {service.image && (
//                     <img
//                       src={`http://localhost:5000${service.image}`}
//                       alt={service.title}
//                       className="w-full h-48 object-cover"
//                     />
//                   )}
//                   <div className="p-6">
//                     <div className="flex justify-between items-start mb-3">
//                       <h3 className="text-xl font-bold">{service.title}</h3>
//                       <span className="text-3xl">{service.icon}</span>
//                     </div>
//                     <p className="text-white/70 text-sm mb-2">{service.category}</p>
//                     <p className="text-2xl font-bold text-blue-400 mb-4">₹{service.price.toLocaleString()}</p>

//                     <div className="flex gap-3 mt-6">
//                       <button
//                         onClick={() => openEdit(service)}
//                         className="flex-1 bg-blue-600 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => setDeletingId(service._id)}
//                         className="flex-1 bg-red-600 py-2 rounded-lg font-medium hover:bg-red-700 transition"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4"
//             onClick={closeModal}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 50 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 50 }}
//               className="bg-gray-900 rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="p-8">
//                 <h2 className="text-3xl font-bold mb-6 text-center">
//                   {editingService ? 'Edit Service' : 'Add New Service'}
//                 </h2>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                   <div className="grid grid-cols-2 gap-4">
//                     <input
//                       name="title"
//                       value={formData.title}
//                       onChange={handleInputChange}
//                       placeholder="Service Title"
//                       required
//                       className="bg-gray-800 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
//                     />
//                     <input
//                       name="category"
//                       value={formData.category}
//                       onChange={handleInputChange}
//                       placeholder="Category (e.g. E-Commerce)"
//                       required
//                       className="bg-gray-800 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
//                     />
//                   </div>

//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     placeholder="Description"
//                     rows="3"
//                     required
//                     className="w-full bg-gray-800 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
//                   />

//                   <div className="grid grid-cols-2 gap-4">
//                     <input
//                       name="price"
//                       type="number"
//                       value={formData.price}
//                       onChange={handleInputChange}
//                       placeholder="Price (₹)"
//                       required
//                       className="bg-gray-800 border border-white/20 rounded-lg px-4 py-3 text-white"
//                     />
//                     <input
//                       name="timeline"
//                       value={formData.timeline}
//                       onChange={handleInputChange}
//                       placeholder="Timeline (e.g. 4-6 weeks)"
//                       required
//                       className="bg-gray-800 border border-white/20 rounded-lg px-4 py-3 text-white"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <input
//                       name="icon"
//                       value={formData.icon}
//                       onChange={handleInputChange}
//                       placeholder="Icon (e.g. Shopping Cart)"
//                       className="bg-gray-800 border border-white/20 rounded-lg px-4 py-3 text-white"
//                     />
//                     <input
//                       name="accentColor"
//                       type="color"
//                       value={formData.accentColor}
//                       onChange={handleInputChange}
//                       className="h-12 rounded-lg cursor-pointer"
//                     />
//                   </div>

//                   <input
//                     name="revisions"
//                     type="number"
//                     value={formData.revisions}
//                     onChange={handleInputChange}
//                     placeholder="Revisions"
//                     required
//                     className="w-full bg-gray-800 border border-white/20 rounded-lg px-4 py-3 text-white"
//                   />

//                   <textarea
//                     name="features"
//                     value={formData.features}
//                     onChange={handleInputChange}
//                     placeholder="Features (one per line)"
//                     rows="5"
//                     className="w-full bg-gray-800 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
//                   />

//                   <input
//                     name="technologies"
//                     value={formData.technologies}
//                     onChange={handleInputChange}
//                     placeholder="Technologies (comma separated)"
//                     className="w-full bg-gray-800 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50"
//                   />

//                   <div>
//                     <label className="block text-sm font-medium mb-2">Service Image</label>
//                     <input
//                       type="file"
//                       name="image"
//                       accept="image/*"
//                       onChange={handleInputChange}
//                       className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
//                     />
//                     {previewImage && (
//                       <img src={previewImage} alt="Preview" className="mt-4 rounded-lg max-h-64 mx-auto" />
//                     )}
//                   </div>

//                   <div className="flex gap-4 pt-6">
//                     <button
//                       type="submit"
//                       className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition"
//                     >
//                       {editingService ? 'Update Service' : 'Create Service'}
//                     </button>
//                     <button
//                       type="button"
//                       onClick={closeModal}
//                       className="flex-1 bg-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-600 transition"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirm Modal */}
//       <AnimatePresence>
//         {deletingId && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4"
//             onClick={() => setDeletingId(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               className="bg-gray-900 rounded-2xl p-8 border border-red-500/50 max-w-md"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <h3 className="text-2xl font-bold text-red-400 mb-4">Delete Service?</h3>
//               <p className="text-white/80 mb-8">This action cannot be undone.</p>
//               <div className="flex gap-4">
//                 <button
//                   onClick={handleDelete}
//                   className="flex-1 bg-red-600 py-3 rounded-xl font-bold hover:bg-red-700"
//                 >
//                   Yes, Delete
//                 </button>
//                 <button
//                   onClick={() => setDeletingId(null)}
//                   className="flex-1 bg-gray-700 py-3 rounded-xl font-bold hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default ServicesAdmin;



'use client';

import { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const fetcher = (url) => fetch(url).then((res) => res.json());

const ServicesAdmin = () => {
  const { data, error, isLoading } = useSWR('http://localhost:5000/v1/service', fetcher, {
    revalidateOnFocus: false,
  });

  const services = data?.services || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    timeline: '',
    revisions: '',
    features: '',
    technologies: '',
    image: null,
  });

  useEffect(() => {
    if (editingService) {
      setFormData({
        title: editingService.title || '',
        category: editingService.category || '',
        description: editingService.description || '',
        price: editingService.price || '',
        timeline: editingService.timeline || '',
        revisions: editingService.revisions || '',
        features: (editingService.features || []).join('\n'),
        technologies: (editingService.technologies || []).join(', '),
        image: null,
      });
      setPreviewImage(editingService.image || '');
    }
  }, [editingService]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({ ...formData, image: file });
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'features') {
        form.append(key, JSON.stringify(value.split('\n').map(f => f.trim()).filter(Boolean)));
      } else if (key === 'technologies') {
        form.append(key, JSON.stringify(value.split(',').map(t => t.trim()).filter(Boolean)));
      } else if (value !== null && value !== '') {
        form.append(key, value);
      }
    });

    const url = editingService
      ? `http://localhost:5000/v1/service/${editingService._id}`
      : 'http://localhost:5000/v1/service';

    try {
      const res = await fetch(url, {
        method: editingService ? 'PUT' : 'POST',
        body: form,
      });

      const result = await res.json();
      if (result.success) {
        toast.success(editingService ? 'Service updated!' : 'Service created!');
        mutate('http://localhost:5000/v1/service');
        closeModal();
      } else {
        toast.error(result.message || 'Operation failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error. Is backend running?');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/v1/service/${deletingId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Service deleted!');
        mutate('http://localhost:5000/v1/service');
      } else {
        toast.error('Delete failed');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setDeletingId(null);
    }
  };

  const openEdit = (service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const openAdd = () => {
    setEditingService(null);
    setPreviewImage('');
    setFormData({
      title: '',
      category: '',
      description: '',
      price: '',
     
      timeline: '',
      revisions: '',
      features: '',
      technologies: '',
      image: null,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setPreviewImage('');
  };

  // Loading & Error States
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading services...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-red-400 text-xl text-center">
          Failed to load services
          <br />
          <span className="text-sm">Is your backend running on port 5000?</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      <div className="min-h-screen text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Services Admin Panel
            </h1>
            <button
              onClick={openAdd}
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              + Add New Service
            </button>
          </div>

          {/* Services Grid */}
          {services.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/60 text-xl">No services yet. Create your first one!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {services.map((service) => (
                  <motion.div
                    key={service._id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -8 }}
                    className="bg-gray-900/90 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
                  >
                    {service.image && (
                      <div className="relative overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      </div>
                    )}

                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                          <p className="text-white/60 text-sm mt-1">{service.category}</p>
                        </div>
                        <span className="text-5xl">{service.icon}</span>
                      </div>

                      <div className="my-6">
                        <p className="text-3xl font-bold text-cyan-400">
                          ₹{service.price.toLocaleString()}
                        </p>
                        <p className="text-white/70 text-sm mt-2">
                          {service.timeline} • {service.revisions} revisions
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => openEdit(service)}
                          className="flex-1 bg-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeletingId(service._id)}
                          className="flex-1 bg-red-600 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 100 }}
              className="text-white rounded-3xl border border-white/20 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-10">
                <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  {editingService ? 'Edit Service' : 'Create New Service'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Service Title"
                      required
                      className="w-full bg-gray-800/50 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition"
                    />
                    <input
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="Category (e.g. Web Development)"
                      required
                      className="w-full bg-gray-800/50 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>

                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Service description..."
                    rows="4"
                    required
                    className="w-full bg-gray-800/50 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 focus:outline-none focus:border-blue-500 transition"
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <input
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Price in ₹"
                      required
                      className="w-full bg-gray-800/50 border border-white/20 rounded-xl px-5 py-4 text-white"
                    />
                    <input
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      placeholder="Timeline (e.g. 4-6 weeks)"
                      required
                      className="w-full bg-gray-800/50 border border-white/20 rounded-xl px-5 py-4 text-white"
                    />
                  </div>

                  {/* <div className="grid grid-cols-2 gap-6">
                    <input
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      placeholder="Icon (e.g. Shopping Cart)"
                      className="w-full bg-gray-800/50 border border-white/20 rounded-xl px-5 py-4 text-white"
                    />
                    <div className="flex items-center gap-4">
                      <label className="text-white/80">Accent Color:</label>
                      <input
                        name="accentColor"
                        type="color"
                        value={formData.accentColor}
                        onChange={handleInputChange}
                        className="h-12 w-24 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div> */}

                  <input
                    name="revisions"
                    type="number"
                    value={formData.revisions}
                    onChange={handleInputChange}
                    placeholder="Number of revisions"
                    required
                    className="w-full bg-gray-800/50 border border-white/20 rounded-xl px-5 py-4 text-white"
                  />

                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    placeholder="Features (one per line)"
                    rows="6"
                    className="w-full bg-gray-800/50 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50 font-mono text-sm"
                  />

                  <input
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="Technologies (comma separated: React, Node.js, MongoDB)"
                    className="w-full bg-gray-800/50 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-white/50"
                  />

                  <div className="space-y-4">
                    <label className="block text-lg font-medium">Service Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleInputChange}
                      className="block w-full text-sm text-gray-400 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-purple-600 file:text-white hover:file:from-blue-700 hover:file:to-purple-700 cursor-pointer"
                    />
                    {previewImage && (
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full max-h-96 object-contain rounded-xl border border-white/20"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-8">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all hover:scale-105"
                    >
                      {editingService ? 'Update Service' : 'Create Service'}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-700 py-5 rounded-2xl font-bold text-xl hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deletingId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4"
            onClick={() => setDeletingId(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-gray-900 rounded-3xl p-10 border border-red-500/50 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-3xl font-bold text-red-400 mb-4">Delete Service?</h3>
              <p className="text-white/80 mb-10">This action cannot be undone.</p>
              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeletingId(null)}
                  className="flex-1 bg-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServicesAdmin;