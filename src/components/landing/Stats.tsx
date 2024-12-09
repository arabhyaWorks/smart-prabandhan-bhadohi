import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Users, Target, AlertCircle } from 'lucide-react';

export function Stats() {
  const stats = [
    { 
      id: 1, 
      name: 'Total Running Projects', 
      value: '18', 
      icon: FileText, 
      color: 'bg-blue-100 text-blue-600',
      iconBg: 'bg-blue-600'
    },
    { 
      id: 2, 
      name: 'In Planning Projects', 
      value: '2', 
      icon: Target, 
      color: 'bg-purple-100 text-purple-600',
      iconBg: 'bg-purple-600'
    },
    { 
      id: 3, 
      name: 'Total Milestone Of Projects', 
      value: '0', 
      icon: Users, 
      color: 'bg-green-100 text-green-600',
      iconBg: 'bg-green-600'
    },
    { 
      id: 4, 
      name: 'Total Issues of Projects', 
      value: '0', 
      icon: AlertCircle, 
      color: 'bg-red-100 text-red-600',
      iconBg: 'bg-red-600'
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
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
                  <p className="text-4xl font-bold">{stat.value}</p>
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