import React from "react";
import { convertToIST } from "../utils/functions";

const inspections = [
  {
    date: "19/Jun/2023",
    type: "Self",
    instruction: "परियोजना के कार्य प्रगति की जाँच करें",
    report: "Inspection Report not Uploaded",
    status: "Pending",
  },
  {
    date: "02/Jun/2023",
    type: "Self",
    instruction: "परियोजना के कार्य प्रगति की जाँच करें",
    report: "Inspection Report not Uploaded",
    status: "Pending",
  },
  {
    date: "19/Jun/2023",
    type: "Self",
    instruction: "परियोजना के कार्य प्रगति की जाँच करें",
    report: "Inspection Report not Uploaded",
    status: "Pending",
  },
];

const ProjectInspection = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Project Inspection
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sr/No.
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inspection Date
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Officer / Inspection Authority
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inspection Type
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inspection Instruction
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Inspection Report
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {project.projectInspection.map((data, index) => (
                <tr key={index}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {convertToIST(data.inspectionDate)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.officialName || "--"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.inspectionType}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {data.inspectionInstruction}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600">
                    {data.inspectionReport}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectInspection;
