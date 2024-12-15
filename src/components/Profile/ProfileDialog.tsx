import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ProfileCard } from "./ProfileCard";

interface ProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const USER_ROLES = ["Super Admin", "Admin", "Project Manager", "Data Operator"];
export function ProfileDialog({ isOpen, onClose }: ProfileDialogProps) {
  const [profileData, setProfileData] = useState<any>(null);

  // Fetch user data from local storage or context
  useEffect(() => {
    if (isOpen) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log(parsedUser);
        const userData = {
          name: parsedUser.userName || "No Name Available",
          designation: parsedUser.userDesignation || "No Designation Provided",
          email: parsedUser.userEmail || "No Email Available",
          agency: parsedUser.entityName || "No Agency Assigned",
          phone: parsedUser.userPhone || "No Phone Number",
          role: USER_ROLES[parsedUser.userRole - 1] || "No Role Assigned",
        };
        setProfileData(userData);
      } else {
        setProfileData(null);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        zIndex: 999,
      }}
      className="fixed inset-0 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
          onClick={onClose}
        />

        <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-7 h-7 text-red-500" />
              <span className="text-red-500 font-medium">Close</span>
            </button>
          </div>

          <div className="p-6">
            {profileData ? (
              <ProfileCard {...profileData} onClose={onClose} />
            ) : (
              <div className="text-center text-gray-500">
                <p>No user data found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
