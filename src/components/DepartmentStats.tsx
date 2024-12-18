import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface DepartmentStatsProps {
  department: string;
  projectCount: number;
  issuesCount: number;
}

export function DepartmentStats({
  department,
  projectCount,
  issuesCount,
}: DepartmentStatsProps) {
  const navigate = useNavigate();

  const handleDepartmentClick = () => {
    // Navigate to projects page with department filter
    navigate("/projects", {
      state: {
        selectedDepartment: department,
        fromDashboard: true,
      },
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-gray-50 rounded-lg p-4"
    >
      <h4 className="text-sm font-medium text-gray-500">{department}</h4>
      <p
        onClick={handleDepartmentClick}
        className="mt-1 bg-blue-100 cursor-pointer   transition-all hover:shadow-md hover:bg-orange-50 p-2 rounded-md text-3xl font-semibold text-blue-900"
      >
        {projectCount} {projectCount === 1 ? "Project" : "Projects"}
      </p>
      <p
        onClick={() => {
          navigate("/issue-management");
        }}
        className="mt-2 cursor-pointer bg-red-200 p-2 rounded-md  text-2xl font-medium text-red-500"
      >
        {issuesCount} {issuesCount === 1 ? "Issue" : "Issues"}
      </p>
    </motion.div>
  );
}
