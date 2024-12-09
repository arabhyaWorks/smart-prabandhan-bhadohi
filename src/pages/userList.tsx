import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Download, Filter, Calendar } from "lucide-react";
import { DataTable } from "../components/table/dataTable";
import { ProjectFilters } from "../components/table/ProjectFilters";
import { users, usersHeaders } from "../utils/dataSet";
import { UsersFilter } from "../components/users/usersFilters";

export default function UsersList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedExecutiveAgency, setSelectedExecutiveAgency] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredProjects = users.slice(0, -1).filter((project) => {
    const matchesSearch =
      project.executingOfficerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.executingAgency
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      project.executingOfficerDesignation
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const exportData = () => {
    const csvContent = [
      ["Project Name", "Department", "Status", "Amount Sanctioned", "Progress"],
      ...filteredProjects.map((project) => [
        project.projectName,
        project.departmentName,
        project.projectStatus,
        project.approvedProjectCost,
        `${project.physicalProgress}%`,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="">
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden	">
        <div className="border-b border-gray-200 p-4">
          <UsersFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            createNewUser={() => setShowModal(true)}
            exportData={() => exportData()}
          />
        </div>
        <DataTable
          headers={usersHeaders}
          projects={filteredProjects}
          searchTerm={searchTerm}
        />
      </div>

      {showModal && (
        <div
          style={{
            zIndex: 9999,
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl shadow-xl  p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              उपयोगकर्ता जोड़ें
            </h2>

            <div className="space-y-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कार्यकारी एजेंसी
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="औद्योगिक विकास विभाग">
                    औद्योगिक विकास विभाग
                  </option>
                  <option value="नगरीय विकास विभाग">नगरीय विकास विभाग </option>
                  <option value="योजना विभाग">योजना विभाग </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कार्यकारी अधिकारी का नाम
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  placeholder="कार्यकारी अधिकारी का नाम दर्ज करें"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कार्यकारी अधिकारी पदनाम
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  placeholder="कार्यकारी अधिकारी पदनाम दर्ज करें"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कार्यकारी ईमेल/उपयोगकर्ता नाम
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  placeholder="कार्यकारी ईमेल/उपयोगकर्ता नाम दर्ज करें"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कार्यकारी अधिकारी मोबाइल
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  placeholder="अधिशाषी अधिकारी का मोबाइल दर्ज करें"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                रद्द करें
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                दर्ज करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
