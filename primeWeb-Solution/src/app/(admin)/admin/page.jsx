'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';

const AdminHomePage = () => {
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 4000, projects: 24 },
    { month: 'Feb', revenue: 3000, projects: 18 },
    { month: 'Mar', revenue: 5000, projects: 30 },
    { month: 'Apr', revenue: 2780, projects: 22 },
    { month: 'May', revenue: 1890, projects: 15 },
    { month: 'Jun', revenue: 6390, projects: 42 },
    { month: 'Jul', revenue: 7490, projects: 48 },
  ];

  const projectTypeData = [
    { name: 'E-Commerce', value: 35 },
    { name: 'Portfolio', value: 25 },
    { name: 'Business', value: 20 },
    { name: 'Web Apps', value: 15 },
    { name: 'Others', value: 5 },
  ];

  const COLORS = ['#00a8ff', '#9c88ff', '#f368e0', '#ff9ff3', '#54a0ff'];

  const stats = [
    {
      title: 'Total Revenue',
      value: '₹2,45,680',
      change: '+12.5%',
      trend: 'up',
      icon: '💰',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Active Projects',
      value: '18',
      change: '+3 this week',
      trend: 'up',
      icon: '🚀',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'New Clients',
      value: '24',
      change: '+8.2%',
      trend: 'up',
      icon: '👥',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Pending Tasks',
      value: '7',
      change: '-2 today',
      trend: 'down',
      icon: '📋',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const recentProjects = [
    {
      id: 1,
      name: 'E-Commerce Store',
      client: 'Fashion Hub',
      status: 'In Progress',
      progress: 75,
      budget: '₹15,000'
    },
    {
      id: 2,
      name: 'Portfolio Website',
      client: 'John Designer',
      status: 'Completed',
      progress: 100,
      budget: '₹999'
    },
    {
      id: 3,
      name: 'Business Website',
      client: 'Tech Solutions',
      status: 'Review',
      progress: 90,
      budget: '₹2,499'
    },
    {
      id: 4,
      name: 'SaaS Application',
      client: 'Startup XYZ',
      status: 'Planning',
      progress: 25,
      budget: '₹29,999'
    }
  ];

  const quickActions = [
    { icon: '➕', title: 'Add Project', color: 'bg-blue-500' },
    { icon: '👤', title: 'Add Client', color: 'bg-green-500' },
    { icon: '📊', title: 'Generate Report', color: 'bg-purple-500' },
    { icon: '⚙️', title: 'Settings', color: 'bg-orange-500' }
  ];

  const notifications = [
    { id: 1, message: 'New project inquiry from Sarah Johnson', time: '5 min ago', type: 'info' },
    { id: 2, message: 'Project "E-Commerce Store" deadline approaching', time: '1 hour ago', type: 'warning' },
    { id: 3, message: 'Payment received from Tech Solutions', time: '2 hours ago', type: 'success' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screenp-6  ">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-black mt-2">Welcome back! Here's what's happening today.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
              <span className={`text-sm font-semibold ${
                stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-white text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Revenue & Projects</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  borderColor: '#374151', 
                  color: 'white',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="#00a8ff" name="Revenue (₹)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="projects" fill="#9c88ff" name="Projects" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Project Types Chart */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-semibold mb-4 text-white">Project Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {projectTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  borderColor: '#374151', 
                  color: 'white',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Projects</h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {project.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{project.name}</h4>
                    <p className="text-white text-sm">{project.client}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                    project.status === 'Review' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-white'
                  }`}>
                    {project.status}
                  </div>
                  <p className="text-white text-sm mt-1 font-semibold">{project.budget}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions & Notifications */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={action.title}
                  className="flex flex-col items-center justify-center p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-all duration-200 hover:scale-105 group"
                >
                  <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center text-white text-xl mb-3 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <span className="text-white text-sm font-semibold text-center">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            variants={itemVariants}
            className="bg-gray-800 rounded-2xl p-6 border border-gray-700"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Recent Notifications</h3>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    notification.type === 'success' ? 'bg-green-500' :
                    notification.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{notification.message}</p>
                    <p className="text-white text-xs mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;