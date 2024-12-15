import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import { useEntities } from "../context/EntityContect"; // Import useEntities hook
import { endpoint } from "../utils/dataSet";
import { headers } from "../utils/dataSet";
import { Plus, Download } from "lucide-react";
import { DataTable } from "../components/table/SuperProjectTable";
import { ProjectFilters } from "../components/table/ProjectFilters";
import Drawer from "../components/drawer/Drawer";
import ProjectForm from "../components/drawer/dataEntryForm";

export function Projects() {
  const { user } = useEntities(); // Access user data from the context
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedExecutiveAgency, setSelectedExecutiveAgency] = useState("");

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState(
    headers.hi.map((_, index) => index.toString())
  );
  const columns = headers.hi.map((header, index) => ({
    key: index.toString(),
    label: header,
  }));

  // Toggle visibility of columns
  const handleToggleColumn = (columnKey: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  // Fetch projects based on user context
  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      // Ensure user data exists
      if (!user?.entityId || !user?.entityTypeId || !user?.userRole) {
        setError("User entity data is missing.");
        return;
      }

      const payload = {
        entityId: user.entityId,
        entityTypeId: user.entityTypeId,
      };

      const response = await axios.get(`${endpoint}/api/projects/`, {
        headers: { "Content-Type": "application/json" },
        params: user.userRole == 3 || user.userRole == 4 ? payload : {},
      });

      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        setError("Failed to fetch projects. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching projects."
      );
    } finally {
      setLoading(false);
    }
  };

  // Filtered projects based on search and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project?.projectName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
      project?.executingAgency
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase());

    const matchesDepartment =
      !selectedDepartment || project?.projectDepartment === selectedDepartment;

    const matchesStatus =
      !selectedStatus || project?.projectStatus === selectedStatus;

    const matchesExecutiveAgency =
      !selectedExecutiveAgency ||
      project?.executingAgency === selectedExecutiveAgency;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesStatus &&
      matchesExecutiveAgency
    );
  });

  // Fetch projects when component mounts or user data changes
  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all development projects
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
          >
            <Plus className="h-5 w-5 mr-1" />
            New Project
          </button>
        </div>
      </div>

      {/* Loader */}
      {loading && <p>Loading projects...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Table */}
      {!loading && !error && (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <ProjectFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedDepartment={selectedDepartment}
              onDepartmentChange={setSelectedDepartment}
              selectedStatus={selectedStatus}
              onStatusChange={setSelectedStatus}
              selectedExecutiveAgency={selectedExecutiveAgency}
              onSelectedExecutiveAgency={setSelectedExecutiveAgency}
              columns={columns}
              visibleColumns={visibleColumns}
              onToggleColumn={handleToggleColumn}
            />
          </div>
          <DataTable
            headers={headers}
            projects={filteredProjects}
            searchTerm={searchTerm}
            visibleColumns={visibleColumns}
          />
        </div>
      )}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Create New Project"
      >
        <div className="p-6">
          <ProjectForm onSubmitSuccess={() => setIsDrawerOpen(false)} />
        </div>
      </Drawer>
    </div>
  );
}
