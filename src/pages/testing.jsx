import React, { useEffect, useState } from "react";
import axios from "axios";
import { useEntities } from "../context/EntityContect";

const Testing = () => {
  const { user, entities } = useEntities(); // Get user and entities from context
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch projects based on entityId and entityTypeId from user context
  const fetchProjects = async () => {
    if (!user?.entityId || !user?.entityTypeId) {
      setError("Entity ID or Entity Type ID is missing.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get("http://localhost:3000/api/projects", {
        params: {
          entityId: user.entityId,
          entityTypeId: user.entityTypeId,
        },
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

  // Fetch projects when the user is available
  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Projects List</h1>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
          <p>Loading projects...</p>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Table */}
      {!loading && !error && projects.length > 0 && (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Project ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Project Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Department
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Executing Agency
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.projectId}>
                <td className="border border-gray-300 px-4 py-2">
                  {project.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {project.projectName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {project.departmentName || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {project.executiveAgencyName || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-gray-600">No projects found for the given entity.</p>
      )}
    </div>
  );
};

export default Testing;
