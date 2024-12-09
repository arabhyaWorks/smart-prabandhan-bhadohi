import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Seal_of_Uttar_Pradesh.svg"
              alt="Logo"
              className="h-10 w-10"
            />
            <div className="ml-4">
              <h1 className="text-xl font-bold text-gray-900">Project Monitering System</h1>
              <p className="text-sm text-gray-500">Bhadohi</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Projects</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center text-gray-600">
                <Globe className="h-5 w-5" />
                <span className="ml-2">English</span>
              </button>
              <a
                href="/login"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}