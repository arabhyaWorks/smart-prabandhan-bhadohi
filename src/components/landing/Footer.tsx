import React from 'react';
import { motion } from 'framer-motion';
import UpLogo from "../../assets/Up_logo.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <img
              src={UpLogo}
              alt="Logo"
              className="h-16 w-16 mb-4"
            />
            <h3 className="text-xl font-bold mb-4">Project Monitering System</h3>
            <p className="text-gray-400 max-w-md">
              A comprehensive platform for managing and monitoring development projects in Bhadohi district.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Projects</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Bhaodhi District</li>
              <li className="text-gray-400">Uttar Pradesh, India</li>
              <li className="text-gray-400">support@pmsbhadohi.gov.in</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2024 Program Management System. All rights reserved.</p>
          <p className="text-gray-400 mt-4 md:mt-0">Designed and Developed by 3i Consulting Pvt Ltd</p>
        </div>
      </div>
    </footer>
  );
}