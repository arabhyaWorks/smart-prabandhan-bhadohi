import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Bell, Users, Database, MessageSquare, Clock } from 'lucide-react';

export function Features() {
  const features = [
    {
      name: 'Dashboard',
      description: 'The PMS Bhadohi portal provides a summary of the projects and their issues on a dashboard.',
      icon: BarChart2,
      color: 'bg-blue-500',
    },
    {
      name: 'Track Issues Status',
      description: 'Real-time monitoring and status updating in the issue resolution process.',
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      name: 'Follow-Up',
      description: 'Periodic meetings at state and ministry levels to identify bottlenecks in projects.',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      name: 'Data Management',
      description: 'Efficient handling and processing of project-related data and documents.',
      icon: Database,
      color: 'bg-indigo-500',
    },
    {
      name: 'Feedback',
      description: 'Project proponents and ministry officials can provide feedback on issue resolution.',
      icon: MessageSquare,
      color: 'bg-pink-500',
    },
    {
      name: 'Notifications',
      description: 'Latest notifications for stakeholders about project updates and issues.',
      icon: Bell,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900">Key Features</h2>
          <p className="mt-4 text-xl text-gray-600">
            Comprehensive tools and features to manage projects effectively
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.color} text-white mb-6`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.name}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}