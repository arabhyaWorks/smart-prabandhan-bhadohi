import React from 'react';
import { Mail, Phone, Building2, UserCircle, Shield, LogOut, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
  name: string;
  designation: string;
  email: string;
  agency: string;
  phone: string;
  role: string;
  onClose: () => void;
}

export function ProfileCard({ name, designation, email, agency, phone, role, onClose }: ProfileCardProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
    onClose();
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg shadow-xl p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-28 h-18  rounded-full flex items-center justify-center">
            <UserCircle className="w-24 h-24 text-orange-500" />
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm flex items-center justify-center ">
            {role}
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
          <p className="text-orange-600 font-medium">{designation}</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
          <div className="flex items-center gap-3 p-3 hover:bg-orange-50 rounded-lg transition-colors">
            <Mail className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 hover:bg-orange-50 rounded-lg transition-colors">
            <Building2 className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Agency</p>
              <p className="text-gray-900">{agency}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 hover:bg-orange-50 rounded-lg transition-colors">
            <Phone className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-gray-900">{phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 hover:bg-orange-50 rounded-lg transition-colors">
            <Shield className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-gray-500">Role</p>
              <p className="text-gray-900">{role}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.location.href = 'mailto:support@pmsbhadohi.com'}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            Contact Support
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}