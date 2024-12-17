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

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Projects Milestone
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all project milestone
          </p>
        </div>
        {/* <div className="flex items-center gap-4">
          <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
          <button className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500">
            <Plus className="h-5 w-5 mr-1" />
            New Issue
          </button>
        </div> */}
      </div>

      <div className=" h-full flex flex-row justify-center align-center ">
        <img
          className="w-1/2 h-1/2 mt-20"
          src="https://cdni.iconscout.com/illustration/premium/thumb/website-launching-coming-soon-illustration-download-in-svg-png-gif-file-formats--business-landing-page-ui-web-app-pack-illustrations-1782224.png"
          alt="Milestone"
        />
      </div>
    </div>
  );
}
