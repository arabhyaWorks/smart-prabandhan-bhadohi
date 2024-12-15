import React, { useEffect, useState } from "react";
import { Plus, Download } from "lucide-react";
import { InspectionTable } from "../components/table/InspectionTable";
import { projectInspectionHeader } from "../utils/dataSet";
import axios from "axios";
import { endpoint } from "../utils/dataSet";
import { useEntities } from "../context/EntityContect"; // Import the useEntities hook

export default function ProjectInspection() {
  const { user } = useEntities(); // Access the user context
  const [searchTerm, setSearchTerm] = useState("");
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchInspections = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};

      // Add entityId and entityTypeId if user exists
      if (user?.entityId && user?.entityTypeId && user?.userRole == 3 || user?.userRole == 4) {
        params["entityId"] = user.entityId;
        params["entityTypeId"] = user.entityTypeId;
      }

      const response = await axios.get(`${endpoint}/api/inspections`, {
        params,
      });
      console.log(response.data.data);
      setInspections(response.data.data);
    } catch (error) {
      console.error("Error fetching inspections:", error);
      setError("Failed to fetch inspections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchInspections();
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects Inspection</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all development projects
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => console.log("Export Data")}
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
          <button className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500">
            <Plus className="h-5 w-5 mr-1" />
            New Inspection
          </button>
        </div>
      </div>

      {/* Inspections Table */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 p-4">
          {/* You can add filters here later */}
        </div>
        {/* Loader */}
        {loading ? (
          <p className="text-center text-sm text-gray-600">Loading inspections...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <InspectionTable
            headers={projectInspectionHeader}
            projects={inspections}
            searchTerm={searchTerm}
            subTableKeyName="inspections"
          />
        )}
      </div>
    </div>
  );
}