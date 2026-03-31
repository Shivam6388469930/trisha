'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // current URL path

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/project' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Close mobile menu when screen resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to check if link is active
  const isLinkActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <span className=" text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">
                  <span className="text-violet-500">Trisha</span>
                  <span className="text-white"> Consultancy</span>
                  <span className="text-white"> Services</span>

                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`relative text-lg font-medium transition-all duration-300
                      ${active ? 'text-violet-400' : 'text-gray-300 hover:text-white'}`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute -bottom-2 left-0 right-0 h-1 bg-violet-500 rounded-full"></span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden
            ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="px-5 py-6 bg-black/95 backdrop-blur-2xl border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-4 rounded-xl text-lg font-medium transition-all
                      ${active
                        ? 'bg-violet-500/20 text-violet-400 border border-violet-500/40 shadow-lg shadow-violet-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navbar;
