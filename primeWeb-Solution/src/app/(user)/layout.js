"use client";

import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Top Navbar */}
      <Navbar />
      

      {/* Page Content */}
      <main className=" bg-black flex-1">
        {children}
      </main>
      <Footer/>
     

    </div>
  );
}
