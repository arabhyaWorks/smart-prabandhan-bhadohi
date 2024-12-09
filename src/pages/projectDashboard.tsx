import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import StatCard from "../components/DashboardStatCard";
import DashboardHeader from "../components/DashboardHeader";

const departmentData = [
  {
    title: "Bandhi Prakhand, Irrigation Department",
    projectCount: 3,
    issuesCount: 0,
  },
  { title: "C & DS Unit 24", projectCount: 25, issuesCount: 0 },
  {
    title: "Construction Division Building, PWD,Varanasi",
    projectCount: 3,
    issuesCount: 0,
  },
  {
    title: "Construction Division, PWD,Chandauli",
    projectCount: 12,
    issuesCount: 0,
  },
  {
    title: "Executive Engineer, Chandraprabha, Irrigation Department",
    projectCount: 4,
    issuesCount: 0,
  },
  {
    title: "Executive Engineer, U.P. Power Corporation Ltd.",
    projectCount: 10,
    issuesCount: 0,
  },
  { title: "Forest Department", projectCount: 2, issuesCount: 0 },
  {
    title: "Irrigation Department, Laghudal Prakhand",
    projectCount: 5,
    issuesCount: 0,
  },
  {
    title: "Irrigation Department, Musakhand Prakhand",
    projectCount: 1,
    issuesCount: 0,
  },
  {
    title: "Irrigation Department, Tubewell division",
    projectCount: 1,
    issuesCount: 0,
  },
  { title: "Jal Nigam Urban", projectCount: 1, issuesCount: 0 },
  { title: "Mandiparisad , Varanasi", projectCount: 1, issuesCount: 0 },
  {
    title: "Provincial Division, PWD, Chandauli",
    projectCount: 17,
    issuesCount: 0,
  },
  { title: "Rajkiya Nirman Nigam, Bhadohi", projectCount: 1, issuesCount: 0 },
  { title: "Rajkiya Nirman Nigam, Varanasi", projectCount: 11, issuesCount: 0 },
  { title: "Rural Engineering Department", projectCount: 0, issuesCount: 0 },
];

const ProjectDashboard = () => {
  return (
    <main className="max-w-7xl mx-auto py-2">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {departmentData.map((dept, index) => (
          <motion.div
            key={dept.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <StatCard
              title={dept.title}
              projectCount={dept.projectCount}
              issuesCount={dept.issuesCount}
            />
          </motion.div>
        ))}
      </div>
    </main>
  );
};

export default ProjectDashboard;
