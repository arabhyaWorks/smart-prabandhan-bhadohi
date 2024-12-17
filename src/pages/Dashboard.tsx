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
import { endpoint } from "../utils/dataSet";
import { useEntities } from "../context/EntityContect";
import { DepartmentStats } from "../components/DepartmentStats";

export function Dashboard() {
  const { user, entities, reloadEntities } = useEntities();

  const [dashboardStats, setDashboardStats] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);

  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  const fetchDashboardStats = async () => {
    if (!user?.entityId || !user?.entityTypeId) {
      setError("Entity ID or Entity Type ID is missing.");
      return;
    }

    setLoading(true);
    setError("");

    const paramsData = {
      entityId: user.entityId,
      entityTypeId: user.entityTypeId,
    };

    console.log("paramsData", paramsData);

    try {
      const response = await axios.get(
        `${endpoint}/api/entity-overview`,
        user.userRole == 1 ? {} : { params: paramsData }
      );

      if (response.data.success) {
        console.log("response.data.data", response.data.data);
        setDashboardStats(response.data.data);
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
      setDepartmentData(response.data.data || []);
    } catch (error) {
      console.error(error);
      setDepartmentData([]);
    }
  };

  const renderDepartmentStats = () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {departmentData.map((dept) => (
        <DepartmentStats
          key={dept.name}
          department={dept.name}
          projectCount={dept.value}
        />
      ))}
    </div>
  );
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
    if (user) {
      fetchDashboardStats();
    }
    fetchDepartmentData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const projectStatusData =
    dashboardStats?.projectStatusDistribution?.map((data, index) => ({
      name: data.status,
      value: data.count,
      index: index,
    })) || [];

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
          value={dashboardStats?.totalProjects || 0}
          icon={Building2}
          trend={{ value: 1.5, label: "from last month" }}
        />
        <StatCard
          title="Total Budget (Crore)"
          value={`₹${dashboardStats?.cumulativeTotalBudget || 0}`}
          icon={IndianRupee}
        />
        <StatCard
          title="In Progress Projects"
          value={dashboardStats?.inProgressProjects || 0}
          icon={Activity}
          trend={{ value: 8, label: "from last month" }}
        />
        <StatCard
          title="Executing Agencies"
          value={
            user?.userRole == 3 || user?.userRole == 4
              ? dashboardStats?.totalRelatedEntities || 0
              : entities?.filter((entity) => entity.entity_type === 2).length ||
                0
          }
          icon={Users}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Project Status Distribution
            </h3>
            <ProjectStatusChart data={projectStatusData} />
          </div>
        </div>

        <div className="rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Budget Overview (in Crores)
            </h3>
            <BudgetChart data={dashboardStats} />
          </div>
        </div>
      </div>

      {user?.userRole == 1 && (
        <>
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
            </div>
            <div ref={pieChartRef} className="p-6">
              <DepartmentPieChart data={departmentData} />
            </div>
          </div>

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
              {/* <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              </div> */}

              {renderDepartmentStats()}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
