import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Users, Target, AlertCircle } from "lucide-react";
import { endpoint } from "../../utils/dataSet";
import axios from "axios";

export function Stats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboardStats, setDashboardStats] = useState([]); // Initialize as empty array

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/entity-overview`);

      if (response.data.success) {
        const data = response.data.data;

        const stats = [
          {
            id: 1,
            name: "Total Running Projects",
            value: data.totalProjects || 0,
            icon: FileText,
            color: "bg-blue-100 text-blue-600",
            iconBg: "bg-blue-600",
          },
          {
            id: 2,
            name: "In Progress Projects",
            value: data.inProgressProjects || 0,
            icon: Target,
            color: "bg-purple-100 text-purple-600",
            iconBg: "bg-purple-600",
          },
          {
            id: 3,
            name: "In Planning Projects",
            value: data.projectStatusDistribution?.[0]?.count || 0,
            icon: Users,
            color: "bg-green-100 text-green-600",
            iconBg: "bg-green-600",
          },
          {
            id: 4,
            name: "Total Approved Budget",
            value: data.totalApprovedBudget || 0,
            icon: AlertCircle,
            color: "bg-red-100 text-red-600",
            iconBg: "bg-red-600",
          },
        ];
        setDashboardStats(stats);
      } else {
        setError("Failed to fetch data. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while fetching data."
      );
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardStats.length > 0 &&
            dashboardStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden rounded-2xl ${stat.color} p-6`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${stat.iconBg} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-4xl font-bold">
                      {stat.value}{" "}
                      {index === 3 && <span className="text-sm">Cr</span>}
                    </p>
                    <p className="text-sm mt-1">{stat.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
