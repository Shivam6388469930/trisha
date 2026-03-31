"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  MessageCircle,
  Phone,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Settings,
  Bell,
  Search,
  Folder,
  Code
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();



const menuItems = [
  { name: "Dashboard", icon: <Home size={20} />, link: "/admin" },
  { name: "Team Management", icon: <Users size={20} />, link: "/team" },
  { name: "Query", icon: <MessageCircle size={20} />, link: "/query" },
  { name: "Get in Touch", icon: <Phone size={20} />, link: "/touch" },
  { name: "Projects", icon: <Folder size={20} />, link: "/projects" },
  { name: "Services", icon: <Code size={20} />, link: "/admin-services" },
];


  return (
    <div className="min-h-screen flex bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-slate-800 to-slate-900 text-white h-screen p-4
        transition-all duration-300 fixed top-0 left-0 shadow-xl z-50
        ${isOpen ? "w-64" : "w-20"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-8">
          {isOpen && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">A</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Panel
              </h1>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all hover:scale-105"
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.link;

            return (
              <a
                key={idx}
                href={item.link}
                className={`flex items-center gap-3 px-3 py-5 rounded-xl transition-all group relative
                  ${isActive
                    ? "bg-blue-600 shadow-lg shadow-blue-500/25 text-white"
                    : "text-gray-300 hover:bg-slate-700 hover:text-white"
                  }`}
              >
                <div className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                  {item.icon}
                </div>

                {isOpen && <span className="text-sm font-medium">{item.name}</span>}

                {!isOpen && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                    {item.name}
                  </div>
                )}
              </a>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className={`absolute bottom-4 left-4 right-4 ${isOpen ? "" : "flex justify-center"}`}>
          <div className={`flex items-center gap-3 p-3 bg-slate-800 rounded-xl ${isOpen ? "justify-between" : "justify-center"}`}>
            {isOpen && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Admin User</span>
                  <span className="text-xs text-gray-400">Administrator</span>
                </div>
              </div>
            )}
            <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN AREA USING PADDING LEFT -> FIXES SLIDING ISSUE */}
      <div
        className={`flex-1 transition-all duration-300 min-h-screen 
        ${isOpen ? "pl-64" : "pl-20"}`}
      >

        {/* Header */}
        <header className="bg-black text-blacks shadow-sm border-b border-gray-800 p-4 flex justify-between items-center sticky top-0 z-40">
          <h2 className="text-xl font-semibold text-white">
            Welcome back, Admin! 👋
          </h2>

          <div className="flex items-center gap-4 text-black">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black"></span>
            </button>

            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
