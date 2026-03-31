"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:5000/v1/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [modalType, setModalType] = useState(null); // add | edit
  const [selectedProject, setSelectedProject] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: [""],
    features: [""],
    status: "Planned",
    year: "",
    icon: "📌",
    accentColor: "#00a8ff",
    liveUrl: "",
    githubUrl: "",
  });

  // ============================
  // 🔥 Fetch All Projects
  // ============================
  const fetchProjects = async () => {
    const res = await axios.get(API_URL);
    setProjects(res.data.projects);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // ============================
  // OPEN ADD MODAL
  // ============================
  const openAddModal = () => {
    setModalType("add");
    setForm({
      title: "",
      description: "",
      technologies: [""],
      features: [""],
      status: "Planned",
      year: "",
      icon: "📌",
      accentColor: "#00a8ff",
      liveUrl: "",
      githubUrl: "",
    });
  };

  // ============================
  // OPEN EDIT MODAL
  // ============================
  const openEditModal = (project) => {
    setModalType("edit");
    setSelectedProject(project);
    setForm({
      ...project,
      technologies: project.technologies || [""],
      features: project.features || [""],
    });
  };

  // ============================
  // DELETE PROJECT
  // ============================
  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    await axios.delete(`${API_URL}/${id}`);
    fetchProjects();
  };

  // ============================
  // HANDLE INPUT
  // ============================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle array input
  const handleArrayChange = (index, field, value) => {
    const arr = [...form[field]];
    arr[index] = value;
    setForm({ ...form, [field]: arr });
  };

  const addArrayField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayField = (field, index) => {
    const arr = [...form[field]];
    arr.splice(index, 1);
    setForm({ ...form, [field]: arr });
  };

  // ============================
  // SUBMIT (ADD / EDIT)
  // ============================
  const handleSubmit = async () => {
    if (modalType === "add") {
      await axios.post(API_URL, form);
      alert("Project Added!");
    } else {
      await axios.put(`${API_URL}/${selectedProject._id}`, form);
      alert("Project Updated!");
    }

    setModalType(null);
    fetchProjects();
  };

  // ============================
  // UI START
  // ============================
  return (
    <div className="p-6 text-black">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>

        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Add Project
        </button>
      </div>

      {/* PROJECT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-5 shadow-md rounded-xl border"
          >
            <h2 className="text-xl font-semibold">{project.title}</h2>

            <p className="text-sm text-gray-500 mt-1">
              {project.status} • {project.year}
            </p>

            <p className="mt-2 text-gray-700 text-sm">{project.description}</p>

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => openEditModal(project)}
                className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <FaEdit /> Edit
              </button>

              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ======================== */}
      {/* MODAL (ADD / EDIT) */}
      {/* ======================== */}
      {modalType && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {modalType === "add" ? "Add Project" : "Edit Project"}
            </h2>

            {/* Basic Fields */}
            <input
              name="title"
              placeholder="Project Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-3"
            />

            {/* Technologies */}
            <h3 className="font-semibold mt-3">Technologies</h3>
            {form.technologies.map((t, i) => (
              <div className="flex gap-2 mt-1" key={i}>
                <input
                  value={t}
                  onChange={(e) =>
                    handleArrayChange(i, "technologies", e.target.value)
                  }
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={() => removeArrayField("technologies", i)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  X
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayField("technologies")}
              className="text-blue-600 text-sm mt-1"
            >
              + Add Technology
            </button>

            {/* Features */}
            <h3 className="font-semibold mt-4">Features</h3>
            {form.features.map((f, i) => (
              <div className="flex gap-2 mt-1" key={i}>
                <input
                  value={f}
                  onChange={(e) =>
                    handleArrayChange(i, "features", e.target.value)
                  }
                  className="border p-2 rounded w-full"
                />
                <button
                  onClick={() => removeArrayField("features", i)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  X
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayField("features")}
              className="text-blue-600 text-sm mt-1"
            >
              + Add Feature
            </button>

            {/* Status */}
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-3"
            >
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Year */}
            <input
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-3"
            />

            {/* URLs */}
            <input
              name="liveUrl"
              placeholder="Live URL"
              value={form.liveUrl}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-3"
            />

            <input
              name="githubUrl"
              placeholder="GitHub URL"
              value={form.githubUrl}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-3"
            />

            {/* Buttons */}
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setModalType(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {modalType === "add" ? "Add" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
