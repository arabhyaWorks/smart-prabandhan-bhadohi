import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    department: "Executive Engineer, U.P. Power Corporation Ltd.",
    title: "Capacity enhancement of 33/11 kv substation Banauli Bhadohi"
  },
  {
    department: "Bandhi Prakhand, Irrigation Department",
    title: "Project Estimate for construction of crated stone Boulder cutter to prevent of erosion in 450 meter length at right bank of river Ganga in village- Mahuji, Block- Dhanapur Tahsil- Sakaldiha, Distt- Bhadohi."
  },
  {
    department: "Uttar Pradesh Aawas Vikash Parisad, Varanasi-2",
    title: "Construction of Fire Station at IIDCIA, Bhadohi."
  },
  {
    department: "Executive Engineer, U.P. Power Corporation Ltd.",
    title: "Capacity Enhancement of 33/11 kv substation jalalpur Bhadohi"
  },
  {
    department: "Bandhi Prakhand, Irrigation Department",
    title: "Renovation of 3 Regulator at Km. 19.200, Km. 21.300 & Km. 22.350 & 2 V.R.B. at Km. 22.350 and Km. 18.000 on Royaltal Drain."
  }
];

export function OngoingProjects() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">
            On Going Projects <span className="text-orange-600">Bhadohi District</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-orange-400 text-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="p-6">
                <h3 className="font-semibold mb-3">{project.department}</h3>
                <p className="text-sm opacity-90">{project.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <button className="p-2 rounded-full bg-white shadow hover:bg-gray-50">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full bg-white shadow hover:bg-gray-50">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}