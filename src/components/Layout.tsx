import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Sidebar as Sidebar2 } from "./Sidebar2";
import { Header } from "./Header";

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full flex ">
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className="transition-all duration-300 bg-white-900 w-full"
        style={{
          paddingLeft: isSidebarOpen ? "250px" : "80px",
        }}
      >
        <Header isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <main className="py-10 ">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
