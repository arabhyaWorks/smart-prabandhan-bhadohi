import React, { useState } from "react";
import { AlertCircle, Plus, Calendar } from "lucide-react";

interface Issue {
  id: string;
  projectName: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Resolved";
  createdAt: string;
}

const mockIssues: Issue[] = [
  {
    id: "1",
    projectName: "Ram Path Development",
    title: "Material Shortage",
    description:
      "Facing shortage of construction materials due to supply chain issues",
    priority: "High",
    status: "Open",
    createdAt: "2024-03-15",
  },
  {
    id: "2",
    projectName: "Ram Path Development",
    title: "Weather Delay",
    description: "Construction delayed due to unexpected rainfall",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2024-03-10",
  },
];

export function Issues() {
  const [showForm, setShowForm] = useState(false);
  const [newIssue, setNewIssue] = useState({
    projectName: "",
    title: "",
    description: "",
    priority: "Medium" as const,
  });

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Issue Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
        >
          <Plus className="h-5 w-5 mr-1" />
          Report Issue
        </button>
      </div>

      {showForm && (
        <div
          style={{
            zIndex: 9999,
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div
          
           className="bg-white h-[90vh]  overflow-y-auto	 rounded-xl shadow-xl  p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Create New Issue
            </h2>

            <div className="space-y-4">
              
              <div className="flex gap-2">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Name
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="औद्योगिक विकास विभाग">
                      औद्योगिक विकास विभाग
                    </option>
                    <option value="नगरीय विकास विभाग">
                      नगरीय विकास विभाग{" "}
                    </option>
                    <option value="योजना विभाग">योजना विभाग </option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="औद्योगिक विकास विभाग">
                      औद्योगिक विकास विभाग
                    </option>
                    <option value="नगरीय विकास विभाग">
                      नगरीय विकास विभाग{" "}
                    </option>
                    <option value="योजना विभाग">योजना विभाग </option>
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department Name
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="औद्योगिक विकास विभाग">
                      औद्योगिक विकास विभाग
                    </option>
                    <option value="नगरीय विकास विभाग">
                      नगरीय विकास विभाग{" "}
                    </option>
                    <option value="योजना विभाग">योजना विभाग </option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Name
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="औद्योगिक विकास विभाग">
                      औद्योगिक विकास विभाग
                    </option>
                    <option value="नगरीय विकास विभाग">
                      नगरीय विकास विभाग{" "}
                    </option>
                    <option value="योजना विभाग">योजना विभाग </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Sample Collection
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="DD-MM-YYYY"
                  />
                  <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Test Name
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  placeholder="Enter Test Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Test Name
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  placeholder="Enter Test Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Test Name
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={3}
                  placeholder="Enter Test Name"
                />
              </div>


              <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sample Collection Site Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-orange-500">
                      <Plus className="w-8 h-8 text-gray-400" />
                      <span className="mt-2 text-center text-sm text-red-500">
                        only .jpg, .jpeg, .png Format Maximum size 200 KB
                      </span>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Add Test
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {mockIssues.map((issue) => (
            <li key={issue.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-gray-400 mr-2" />
                    <p className="text-sm font-medium text-orange-600 truncate">
                      {issue.title}
                    </p>
                  </div>
                  <div className="ml-2 flex items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        issue.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : issue.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {issue.priority}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        issue.status === "Resolved"
                          ? "bg-green-100 text-green-800"
                          : issue.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {issue.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {issue.projectName}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>
                      Reported on{" "}
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  {issue.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
