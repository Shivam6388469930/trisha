"use client";
import React, { useState, useEffect } from "react";
import { Eye, Trash2, Search, X, Mail, Phone } from "lucide-react";

export default function QueryPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000/v1/queries";

  // ⭐ Fetch Queries
  const getQueries = async () => {
    try {
      setLoading(true);

      const res = await fetch(API_URL);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch queries");

      const queries = data.queries?.map((q) => ({
        ...q,
        status: "new", // backend does not send status
      }));

      setUsers(queries);
      setFilteredUsers(queries);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getQueries();
  }, []);

  // 🔍 Filtering
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          u.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((u) => u.status === statusFilter);
    }

    setFilteredUsers(filtered);
  }, [searchTerm, statusFilter, users]);

  // 🗑 Delete Query
  const handleDelete = async (id) => {
    if (!confirm("Delete this query?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete query");
    }
  };

  // Status Badge UI
  const getStatusBadge = (status) => {
    const styles = {
      new: "bg-blue-100 text-blue-700",
      replied: "bg-green-100 text-green-700",
      closed: "bg-gray-200 text-gray-700",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs border ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6 text-black">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Customer Queries</h1>
        <span className="text-sm bg-gray-100 px-3 py-2 rounded-lg">
          Total: {filteredUsers.length}
        </span>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, message..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="px-3 py-2 border rounded-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="replied">Replied</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Loader */}
      {loading && <div className="text-center py-10 text-gray-600">Loading...</div>}

      {/* Table */}
      {!loading && (
        <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs">Customer</th>
                  <th className="px-6 py-4 text-left text-xs">Contact</th>
                  <th className="px-6 py-4 text-left text-xs">Message</th>
                  <th className="px-6 py-4 text-left text-xs">Status</th>
                  <th className="px-6 py-4 text-left text-xs">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">

                      {/* Name column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center rounded-full">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4 text-sm">
                        {user.email}
                        <br />
                        <span className="text-gray-500">{user.phoneNumber}</span>
                      </td>

                      {/* Message */}
                      <td className="px-6 py-4 text-sm max-w-xs line-clamp-2">
                        {user.message}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {getStatusBadge(user.status)}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelected(user)}
                            className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(user._id)}
                            className="px-3 py-2 bg-red-50 text-red-700 rounded-lg"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                      No queries found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
            <div className="flex justify-between p-4 border-b">
              <h3 className="text-lg font-bold">{selected.name}</h3>
              <button onClick={() => setSelected(null)}>
                <X className="text-gray-600" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail size={20} />
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <p className="font-medium">{selected.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone size={20} className="text-green-600" />
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <p className="font-medium">{selected.phoneNumber}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium">Message</p>
                <div className="p-3 bg-gray-50 text-black rounded-lg border">
                  {selected.message}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
