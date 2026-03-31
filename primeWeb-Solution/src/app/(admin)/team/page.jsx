

"use client";

import React, { useState, useEffect } from "react";
import {
  Search, Plus, Edit, Trash2, Eye, X, Users,
  Mail, Phone, Building, BadgeCheck
} from "lucide-react";
import axios from "axios";

// Update this URL if your backend runs on different port
const API_URL = "http://localhost:5000/v1/team";

// --------------------------------------------------------------------
// TEAM MEMBER FORM (Add + Edit) - Unchanged UI
// --------------------------------------------------------------------
function TeamMemberForm({ onSubmit, initialData = {}, onClose }) {
  const [formData, setFormData] = useState({
    id: initialData._id || null,
    name: initialData.name || "",
    designation: initialData.designation || "",
    department: initialData.department || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(initialData.image || null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, previewImage);
    onClose();
  };

  const getDepartmentColor = (dept) => {
    const colors = {
      founder: "bg-purple-100 text-purple-800",
      developer: "bg-blue-100 text-blue-800",
      business: "bg-green-100 text-green-800",
      design: "bg-pink-100 text-pink-800",
      marketing: "bg-orange-100 text-orange-800"
    };
    return colors[dept] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {formData.id ? "Edit Team Member" : "Add Team Member"}
              </h2>
              <p className="text-gray-500 text-sm">
                {formData.id ? "Update member details" : "Add a new team member"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Users size={32} className="text-gray-400" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                <Plus size={16} />
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <p className="text-gray-500 text-sm mt-2">Click to upload photo</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Enter full name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
              <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} required placeholder="Enter designation" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                <select name="department" value={formData.department} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Department</option>
                  <option value="founder">Founder</option>
                  <option value="developer">Developer</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
              {formData.department && (
                <div className="flex items-center justify-center">
                  <span className={`px-3 py-2 rounded-full text-xs font-medium ${getDepartmentColor(formData.department)}`}>
                    {formData.department}
                  </span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter email address" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Enter phone number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg">
              {formData.id ? "Update Member" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// VIEW MODAL - Unchanged
// --------------------------------------------------------------------
function ViewModal({ member, onClose }) {
  const getDepartmentColor = (dept) => {
    const colors = {
      founder: "bg-purple-100 text-purple-800 border-purple-200",
      developer: "bg-blue-100 text-blue-800 border-blue-200",
      business: "bg-green-100 text-green-800 border-green-200",
      design: "bg-pink-100 text-pink-800 border-pink-200",
      marketing: "bg-orange-100 text-orange-800 border-orange-200"
    };
    return colors[dept] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
              <BadgeCheck size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Member Details</h2>
              <p className="text-gray-500 text-sm">Team member information</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center overflow-hidden mb-4">
              {member.image ? (
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              ) : (
                <Users size={48} className="text-gray-400" />
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
            <p className="text-gray-600">{member.designation}</p>
            <span className={`mt-2 px-3 py-1 rounded-full text-sm font-medium border ${getDepartmentColor(member.department)}`}>
              {member.department}
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="text-blue-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{member.email || "Not provided"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="text-green-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{member.phone || "Not provided"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Building className="text-purple-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-medium text-gray-900 capitalize">{member.department}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// MAIN PAGE - Only logic changed, UI 100% same
// --------------------------------------------------------------------
export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [viewingMember, setViewingMember] = useState(null);

  // Fetch all members on load
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(API_URL);
        const members = res.data.data || res.data;
        setTeamMembers(members);
        setFilteredMembers(members);
      } catch (err) {
        console.error(err);
        alert("Failed to load team members");
      }
    };
    fetchMembers();
  }, []);

  // Filtering (unchanged logic)
  useEffect(() => {
    let filtered = teamMembers;
    if (searchTerm) {
      filtered = filtered.filter(member =>
        member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.department?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (departmentFilter !== "all") {
      filtered = filtered.filter(member => member.department === departmentFilter);
    }
    setFilteredMembers(filtered);
  }, [searchTerm, departmentFilter, teamMembers]);

  // ADD + EDIT - Now talks to real API
  const handleSaveMember = async (data, previewImage) => {
    
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("designation", data.designation);
    formData.append("department", data.department);
    if (data.email) formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    if (data.image instanceof File) formData.append("image", data.image);

    try {
      if (data.id) {
        await axios.put(`${API_URL}/${data.id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }

      // Refresh list
      const res = await axios.get(API_URL);
      const members = res.data.data || res.data;
      setTeamMembers(members);
      setFilteredMembers(members);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save member");
    }
  };

  // DELETE - Now talks to real API
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this team member?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      const res = await axios.get(API_URL);
      const members = res.data.data || res.data;
      setTeamMembers(members);
      setFilteredMembers(members);
    } catch (err) {
      alert("Failed to delete member");
    }
  };

  const getDepartmentColor = (dept) => {
    const colors = {
      founder: "bg-purple-100 text-purple-800",
      developer: "bg-blue-100 text-blue-800",
      business: "bg-green-100 text-green-800",
      design: "bg-pink-100 text-pink-800",
      marketing: "bg-orange-100 text-orange-800"
    };
    return colors[dept] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen text-black bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600 mt-2">Manage your team members and their details</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
              Total: <span className="font-semibold text-gray-800">{filteredMembers.length} members</span>
            </div>
            <button
              onClick={() => {
                setEditingMember(null);
                setIsFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
            >
              <Plus size={20} />
              Add Member
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, designation, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
          </div>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="all">All Departments</option>
            <option value="founder">Founder</option>
            <option value="developer">Developer</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>

        {filteredMembers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div key={member._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-gray-600 text-sm">{member.designation}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDepartmentColor(member.department)}`}>
                    {member.department}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {member.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail size={16} />
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} />
                      <span>{member.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setViewingMember(member);
                      setIsViewOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditingMember(member);
                      setIsFormOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <Users size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No team members found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or add a new team member.</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Member
            </button>
          </div>
        )}

        {isFormOpen && (
          <TeamMemberForm
            onSubmit={handleSaveMember}
            initialData={editingMember || {}}
            onClose={() => {
              setIsFormOpen(false);
              setEditingMember(null);
            }}
          />
        )}
        {isViewOpen && (
          <ViewModal member={viewingMember} onClose={() => setIsViewOpen(false)} />
        )}
      </div>
    </div>
  );
}