import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import {
  Building2,
  IndianRupee,
  Activity,
  Users,
  Download,
} from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";
import { ProjectStatusChart } from "../components/dashboard/ProjectStatusChart";
import { BudgetChart } from "../components/dashboard/BudgetChart";
import { DepartmentPieChart } from "../components/dashboard/dashboardPieChart";
import { DepartmentBarChart } from "../components/dashboard/DepartmentBarChart";
import { use } from "framer-motion/client";
import { endpoint } from "../utils/dataSet";
import { useEntities } from "../context/EntityContect";

const projectStatusData = [
  { name: "In Progress", value: 45 },
  { name: "Completed", value: 30 },
  { name: "On Hold", value: 15 },
  { name: "In Planning", value: 10 },
];

const budgetData = [
  {
    name: "Total",
    sanctioned: 209040.72,
    released: 13012.79,
    pending: 196027.93,
  },
];

const projectStatusLabels = [
  "In Planning",
  "In Progress",
  "On Hold",
  "Delayed",
  "Completed",
];

export function Dashboard() {
  const { entities, reloadEntities } = useEntities();

  const [projectStatus, setProjectStatus] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [stats, setStats] = useState({});
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  const fetchProjectStatus = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/stats/project-status`);
      // console.log(response.data.data);
      setProjectStatus(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/api/stats/department-count`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log(response.data);
      setDepartmentData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch Overall Stats Data
  const fetchStatsData = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/api/stats/budget-overview`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      // console.log(response.data);
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Export Chart as PNG
  const exportChartAsPNG = (ref, filename) => {
    if (ref.current) {
      html2canvas(ref.current, { useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${filename}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  useEffect(() => {
    fetchProjectStatus();
    fetchDepartmentData();
    fetchStatsData();
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard Overview
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={Building2}
          trend={{ value: 1.5, label: "from last month" }}
        />
        <StatCard
          title="Total Budget (Crore)"
          value={"₹" + stats?.totalBudget?.approved}
          icon={IndianRupee}
        />
        <StatCard
          title="In Progress Projects"
          value={stats?.activeProjects?.count}
          icon={Activity}
          trend={{ value: 8, label: "from last month" }}
        />
        <StatCard
          title="Executing Agencies"
          value={entities?.filter((entity) => entity.entity_type === 2).length}
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Project Status Distribution
            </h3>
            <ProjectStatusChart
              data={projectStatus.map((data) => ({
                ...data,
                name: projectStatusLabels[data.project_status - 1],
                value: data.count,
              }))}
            />
          </div>
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Budget Overview (in Lacs)
            </h3>
            <BudgetChart data={budgetData} />
          </div>
        </div>
      </div>

      {/* Department-wise Project Count - Pie Chart */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-6 py-5 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Department-wise Project Count
          </h3>
          <button
            onClick={() =>
              exportChartAsPNG(pieChartRef, "DepartmentWisePieChart")
            }
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-1" />
            Export as PNG
          </button>
          {/* <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
            onClick={() => exportChartAsPNG(pieChartRef, "DepartmentWisePieChart")}
          >
            Export as PNG
          </button> */}
        </div>
        <div ref={pieChartRef} className="p-6">
          <DepartmentPieChart data={departmentData} />
        </div>
      </div>

      {/* Department-wise Project Count - Bar Chart */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-6 py-5 flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Department-wise Project Count (Bar Chart)
          </h3>
          <button
            onClick={() =>
              exportChartAsPNG(barChartRef, "DepartmentWiseBarChart")
            }
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-1" />
            Export as PNG
          </button>
        </div>
        <div ref={barChartRef} className="p-6">
          <DepartmentBarChart data={departmentData} />
        </div>
      </div>

      <div className="rounded-lg bg-white shadow">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Department-wise Distribution
          </h3>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {departmentData.map((data, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500">
                  {data.name}
                </h4>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {data.value} Projects
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
