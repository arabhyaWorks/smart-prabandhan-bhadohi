import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Download, Filter } from "lucide-react";
import { DataTable } from "../components/table/ProjectTable";
import { ProjectFilters } from "../components/table/ProjectFilters";
import { projectInspection, projectInspectionHeader } from "../utils/dataSet";

export default function ProjectInsection() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Projects Inspection
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all development projects
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
          <button className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500">
            <Plus className="h-5 w-5 mr-1" />
            New Inspection
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden	">
        <div className="border-b border-gray-200 p-4">
          {/* <ProjectFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedExecutiveAgency={selectedExecutiveAgency}
            onSelectedExecutiveAgency={setSelectedExecutiveAgency}
          /> */}
        </div>
        <DataTable
          headers={projectInspectionHeader}
          projects={projectInspection}
          searchTerm={searchTerm}
          subTableKeyName="inspectionDetails"
        />
      </div>
    </div>
  );
}
