import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import './sidebar.css'
import {
  LayoutDashboard,
  Database,
  Calendar,
  ClipboardCheck,
  PenTool,
  Receipt,
  FolderOpen,
  Milestone,
  AlertCircle,
  BarChart2,
  Image,
  User,
  Users,
  LogOut,
  InspectionPanel,
  FileCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", route: "/dashboard" },
  { icon: Database, label: "Issues", route: "/projectDashboard" },
  { icon: FolderOpen, label: "All Projects", route: "/projects" },
  { icon: Users, label: "All Users", route: "/users" },
  {
    icon: InspectionPanel,
    label: "Inspection Panel",
    route: "/projectInspection",
  },
  // {
  //   icon: FileCheck,
  //   label: "Project Essential Test",
  //   route: "/projectTest",
  // },
  { icon: Receipt, label: "Budget & UC Upload", route: "/budget-uc-upload" },
  { icon: Milestone, label: "Milestones", route: "/milestones" },
  { icon: AlertCircle, label: "Issue Management", route: "/issue-management" },
  { icon: BarChart2, label: "Reports", route: "/reports" },
  { icon: Image, label: "Gallery", route: "/gallery" },
  // {
  //   icon: PenTool,
  //   label: "Project Essential Test",
  //   route: "/project-essential-test",
  // },
  // { icon: User, label: "Profile", route: "/profile" },
  // {
  //   icon: Calendar,
  //   label: "Project Date Extend",
  //   route: "/project-date-extend",
  // },
  // {
  //   icon: ClipboardCheck,
  //   label: "Project Inspection",
  //   route: "/project-inspection",
  // },
];

interface SidebarProps {
  isOpen: boolean;
}
const indiaLogo =
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Seal_of_Uttar_Pradesh.svg";

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      <motion.div
        // className={`${
        //   !isOpen ? "w-20" : "w-[250px]"
        // } bg-white h-screen  fixed left-0 top-0 border-r border-gray-200 flex flex-col transition-all duration-300 z-20`}
      
        className={classNames(
          "w-20 bg-white h-screen  fixed left-0 top-0 border-r border-gray-200 flex flex-col transition-all duration-300 z-20",
          {
            "w-20": !isOpen,
            "w-[250px]": isOpen,
          },
          // 'sm:hidden'
          // "hidden sm:block"
          // "lg:bg-red-800 md:bg-green-600 sm:bg-blue-500"
          'sidebarContainer'
        )}


      >
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={indiaLogo} alt="India Logo" className="w-10 h-10" />
            {isOpen && (
              <h1 className="text-xl font-bold text-gray-900">PMS Bhadohi</h1>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.route;
              return (
                <li key={item.label}>
                  <a
                    href={item.route}
                    className={`flex items-center gap-3 px-3 py-[0.62rem] rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors ${
                      isActive ? "bg-orange-50 text-orange-600" : ""
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {isOpen && <p> {item.label}</p>}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <a
            href="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!!isOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        </div>
      </motion.div>
    </>
  );
}
