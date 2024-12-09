import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, FolderPlus, Activity, CheckCircle } from 'lucide-react';

export function Steps() {
  const steps = [
    {
      icon: LogIn,
      title: 'Login or Register',
      description: 'Get started by creating your account',
      color: 'bg-blue-500',
    },
    {
      icon: FolderPlus,
      title: 'Create Project & Add Issue(s)',
      description: 'Add your project details and related issues',
      color: 'bg-purple-500',
    },
    {
      icon: Activity,
      title: 'Monitor Issues and Status',
      description: 'Track progress and manage issues in real-time',
      color: 'bg-green-500',
    },
    {
      icon: CheckCircle,
      title: 'Issue Resolved',
      description: 'Complete resolution and project success',
      color: 'bg-indigo-500',
    },
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900">Program Management Unit Steps</h2>
          <p className="mt-4 text-xl text-gray-600">Simple steps to get started with our platform</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl shadow-lg p-8"
            >
              <div className={`inline-flex p-4 rounded-xl ${step.color} text-white mb-6`}>
                <step.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <div className="absolute top-8 right-0 hidden lg:block">
                {index < steps.length - 1 && (
                  <div className="w-8 h-0.5 bg-gray-300 translate-x-full translate-y-4" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}