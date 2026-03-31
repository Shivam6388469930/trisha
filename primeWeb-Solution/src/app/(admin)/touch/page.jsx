"use client";

import React, { useEffect, useState } from "react";
import {
  FaEye, FaTrash, FaTimes, FaSearch, FaEnvelope, FaPhone,
  FaBuilding, FaGlobe, FaTag, FaMoneyBill, FaComment, FaUser
} from "react-icons/fa";

export default function Getintouch() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/v1/get-in-touch";

  // Fetch Data From Backend
  const getData = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete Entry
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const token = localStorage.getItem("token"); // REMOVE if you use cookies

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const json = await res.json();

      if (json.success) {
        setData((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(json.msg || "Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Filter Search
  const filteredData = data.filter((item) =>
    `${item.firstName} ${item.lastName} ${item.email} ${item.companyName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">

      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Enquiry Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and review all customer enquiries
            </p>
          </div>

          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search enquiries..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Budget</th>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-10">
                    Loading enquiries...
                  </td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-10">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                filteredData.map((item) => (
                  <tr key={item._id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-600 rounded-full text-white flex items-center justify-center">
                          {item.firstName[0]}
                          {item.lastName[0]}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium">
                            {item.firstName} {item.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.email}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.mobileNumber}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <p className="font-medium">{item.companyName}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <FaGlobe className="mr-2" /> {item.country}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs">
                        {item.category}
                      </span>
                    </td>

                    <td className="px-4 py-3 font-medium">{item.budget}</td>

                    <td className="px-4 py-3 max-w-[200px] line-clamp-2">
                      {item.message}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setSelected(item)}
                          className="px-3 py-1.5 border rounded-lg hover:bg-gray-100"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 p-5 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {selected.firstName} {selected.lastName}
              </h2>
              <button onClick={() => setSelected(null)}>
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-5">
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Mobile:</strong> {selected.mobileNumber}</p>
              <p><strong>Company:</strong> {selected.companyName}</p>
              <p><strong>Country:</strong> {selected.country}</p>
              <p><strong>Budget:</strong> {selected.budget}</p>

              <h3 className="mt-4 font-semibold">Message</h3>
              <p className="bg-gray-100 p-3 rounded-lg">{selected.message}</p>
            </div>

            <div className="p-4 border-t bg-gray-50 text-right">
              <button
                onClick={() => setSelected(null)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
