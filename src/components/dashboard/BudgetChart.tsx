import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

interface BudgetChartProps {
  data: Array<{
    name: string;
    sanctioned: number;
    released: number;
    pending: number;
  }>;
}

export function BudgetChart() {
  const [chartData, setChartData] = useState<BudgetChartProps['data']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBudgetOverview = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/budget-overview');
      const data = response.data.data;
      console.log('Budget Overview:', data);

      // Transform API response into chart data format
      const transformedData = [
        {
          name: 'Budget Overview',
          sanctioned: parseFloat(data.totalApprovedBudget),
          released: parseFloat(data.totalReleasedFunds),
          pending: parseFloat(data.totalPendingBudget),
          expenditure: parseFloat(data.totalExpenditure),
        },
      ];

      setChartData(transformedData);
    } catch (err) {
      console.error('Error fetching budget overview:', err);
      setError('Failed to fetch budget overview data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetOverview();

    console.log(
      chartData
    )
  }, []);

  if (loading) {
    return <div>Loading chart data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
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
          <Bar dataKey="expenditure" name="Expenditure" fill="#FB1216" />
          <Bar dataKey="pending" name="Pending Budget" fill="#FB1216" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}