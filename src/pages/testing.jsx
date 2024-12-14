import React, { useEffect, useState } from "react";
import axios from "axios";

const Testing = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        entityId: 1,
        entityTypeId: 1,
      };

      const response = await axios.get("http://localhost:3000/api/projects/", {
        headers: {
          "Content-Type": "application/json",
        },
        params: payload, // Pass the parameters here for the GET request
      });

      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        setError("Failed to fetch projects. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while fetching projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Projects List</h1>
      {loading && <p>Loading projects...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && projects.length > 0 && (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Project ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Project Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Department</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Executing Agency</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Approved Budget</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="border border-gray-300 px-4 py-2">{project.id}</td>
                <td className="border border-gray-300 px-4 py-2">{project.projectName}</td>
                <td className="border border-gray-300 px-4 py-2">{project.projectStatus}</td>
                <td className="border border-gray-300 px-4 py-2">{project.projectDepartment}</td>
                <td className="border border-gray-300 px-4 py-2">{project.executingAgency}</td>
                <td className="border border-gray-300 px-4 py-2">₹{Number(project.approvedProjectCost).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && projects.length === 0 && <p>No projects found for the given entity.</p>}
    </div>
  );
};

export default Testing;