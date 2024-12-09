import React from 'react';
import { X } from 'lucide-react';
import { ProfileCard } from './ProfileCard';

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDialog({ isOpen, onClose }: ProfileDialogProps) {
  if (!isOpen) return null;

  // This would typically come from your auth context or API
  const profileData = {
    name: "आर.के. उपाध्याय",
    designation: "कार्यकारी अभियंता",
    email: "eeetdshuptri@upptcl.org",
    agency: "पावर ट्रांसमिशन डिवीजन-III, शाहुपुरी",
    phone: "9415311051",
    role: "Super Admin"
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X  className="w-7 h-7 text-red-500" />
              <span className="text-red-500 font-medium">Close</span>
            </button>
          </div>
          
          <div className="p-6">
            <ProfileCard {...profileData} onClose={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}