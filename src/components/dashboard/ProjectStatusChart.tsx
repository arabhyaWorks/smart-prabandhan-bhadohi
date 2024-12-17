import { parse } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#FFBB28", "#04B70D", "#0088FE", "#FB1216", "#00C49F"];

interface ProjectStatusChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
}

export function ProjectStatusChart({ data }: ProjectStatusChartProps) {
  const navigate = useNavigate();

  const handleDepartmentClick = (department) => {
    // Navigate to projects page with department filter
    console.log("Department clicked", department);
    console.log("Department clicked", department.index);
    navigate("/projects", {
      state: {
        selectedProjectStatus: `${parseInt(department.index) + 1}`,
        fromDashboard: true,
      },
    });
  };
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((data, index) => (
              <Cell
                onClick={() => handleDepartmentClick(data)}
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
