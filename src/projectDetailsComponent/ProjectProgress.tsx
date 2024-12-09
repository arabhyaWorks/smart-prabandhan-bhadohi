import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Project Estimate for construction of crated stone Boulder cutter to prevent of erosion in 450 meter length at right bank of river Ganga in village- Mahuji, Block- Dhanapur Tahsil- Sakaldiha, Distt- Chandauli.',
    Total: 100,
    Actual: 0
  },
  {
    name: 'Project Estimate for construction of crated stone Boulder cutter to prevent of erosion in 450 meter length at right bank of river Ganga in village- Mahuji, Block- Dhanapur Tahsil- Sakaldiha, Distt- Chandauli.',
    Total: 545,
    Actual: 0
  },
  {
    name: 'Project Estimate for construction of crated stone Boulder cutter to prevent of erosion in 450 meter length at right bank of river Ganga in village- Mahuji, Block- Dhanapur Tahsil- Sakaldiha, Distt- Chandauli.',
    Total: 84,
    Actual: 0
  },

];

const ProjectProgress = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Project Progress</h2>
          <h3 className="text-sm text-gray-600">Total Vs Current</h3>
        </div>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 120
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                interval={0}
                height={100}
                tick={{fontSize: 12}}
              />
              <YAxis 
                domain={[0, 125]}
                ticks={[0, 25, 50, 75, 100, 125]}
                label={{ 
                  value: 'Project Completed In %', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Bar dataKey="Total" fill="#4F46E5" />
              <Bar dataKey="Actual" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgress;