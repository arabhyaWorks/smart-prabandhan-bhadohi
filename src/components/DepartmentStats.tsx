import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface DepartmentStatsProps {
  department: string;
  projectCount: number;
}

export function DepartmentStats({ department, projectCount }: DepartmentStatsProps) {
  const navigate = useNavigate();

  const handleDepartmentClick = () => {
    // Navigate to projects page with department filter
    navigate('/projects', { 
      state: { 
        selectedDepartment: department,
        fromDashboard: true 
      }
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleDepartmentClick}
      className="bg-gray-50 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md hover:bg-orange-50"
    >
      <h4 className="text-sm font-medium text-gray-500">{department}</h4>
      <p className="mt-1 text-3xl font-semibold text-gray-900">
        {projectCount} {projectCount === 1 ? 'Project' : 'Projects'}
      </p>
    </motion.div>
  );
}