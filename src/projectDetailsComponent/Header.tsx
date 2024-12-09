import React from 'react';
import { BellIcon, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">PMS Bhadohi</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <BellIcon className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <UserCircle className="w-8 h-8 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
}