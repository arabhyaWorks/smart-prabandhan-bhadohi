
import React, { useState } from "react";
import { Bell, UserCircle, PanelLeft } from "lucide-react";
// import { ProfileDialog } from "./profile/ProfileDialog";
import { ProfileDialog } from "./Profile/ProfileDialog";

interface HeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Header({ isOpen, onToggle }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header
      style={{ zIndex: 40 }}
      className="sticky top-0 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
    >
      <button
        onClick={onToggle}
        className="p-2 duration-150 rounded hover:bg-gray-100"
      >
        <PanelLeft className="w-5 h-5 cursor-pointer" />
      </button>
      <div className="flex flex-1 gap-x-4 self-stretch items-center justify-end">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
          </button>
          <div
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
            aria-hidden="true"
          />
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button 
              onClick={() => setIsProfileOpen(true)}
              className="-m-1.5 flex items-center p-1.5"
            >
              <span className="sr-only">Open user menu</span>
              <UserCircle className="h-8 w-8 text-gray-400" />
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  Admin User
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <ProfileDialog 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </header>
  );
}
