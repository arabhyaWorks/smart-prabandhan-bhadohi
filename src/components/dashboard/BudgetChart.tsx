import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BudgetChartProps {
  data: Array<{
    name: string;
    sanctioned: number;
    released: number;
    pending: number;
  }>;
}

export function BudgetChart({ data }: BudgetChartProps) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sanctioned" name="Sanctioned Budget" fill="#0088FE" />
          <Bar dataKey="released" name="Released Budget" fill="#00C49F" />
          <Bar dataKey="pending" name="Pending Budget" fill="#FB1216" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}