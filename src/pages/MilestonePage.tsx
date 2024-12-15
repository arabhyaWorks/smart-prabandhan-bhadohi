import React, { useEffect, useState } from "react";
import { Plus, Download } from "lucide-react";
import { IssueTable } from "../components/table/IssuesTable";
import { projectIssuesHeaders } from "../utils/dataSet";
import axios from "axios";
import { endpoint } from "../utils/dataSet";
import { useEntities } from "../context/EntityContect";

export default function MilestonePage() {
  const { user } = useEntities(); // Fetch user data from context
  const [searchTerm, setSearchTerm] = useState("");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchIssues = async () => {
    setLoading(true);
    setError("");
    try {
      const params: any = {};

      // Include entityId and entityTypeId if user exists
      if (user?.entityId && user?.entityTypeId && user?.userRole == 3 || user?.userRole == 4)  {
        params["entityId"] = user.entityId;
        params["entityTypeId"] = user.entityTypeId;
      }

      const response = await axios.get(`${endpoint}/api/entity/issues`, {
        params,
      });

      setIssues(response.data.data);
    } catch (err) {
      console.error("Error fetching issues:", err);
      setError("Failed to fetch issues.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchIssues();
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects Issues</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all project issues
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
          <button className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500">
            <Plus className="h-5 w-5 mr-1" />
            New Issue
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden">
        {loading ? (
          <p className="text-center py-6 text-gray-600">Loading issues...</p>
        ) : error ? (
          <p className="text-center py-6 text-red-600">{error}</p>
        ) : (
          <IssueTable
            headers={projectIssuesHeaders}
            projects={issues}
            searchTerm={searchTerm}
            subTableKeyName="issues"
          />
        )}
      </div>
    </div>
  );
}