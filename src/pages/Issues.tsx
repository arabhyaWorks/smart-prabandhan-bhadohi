import React, { useEffect, useState } from "react";
import { Plus, Download, Trash, X } from "lucide-react";
import { IssueTable } from "../components/table/IssuesTable";
import { projectIssuesHeaders } from "../utils/dataSet";
import axios from "axios";
import { endpoint } from "../utils/dataSet";
import { useEntities } from "../context/EntityContect";

interface ImagePreview {
  file: File;
  previewUrl: string;
}

const priorityOptions = [
  { value: "1", label: "High" },
  { value: "2", label: "Medium" },
  { value: "3", label: "Low" },
];

export function Issues() {
  const { entities, reloadEntities, user, projectNameData } = useEntities();
  const [searchTerm, setSearchTerm] = useState("");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    projectId: "",
    issueName: "",
    issueDescription: "",
    // issueRaisedBy: "",
    // issueRaisedDate: "",
    assignedTo: "",
    issueReportedOn: "",
    issueStatus: "1",
    priority: "",
    departmentId: "",
    executiveAgencyId: "",
  });

  const [selectedImages, setSelectedImages] = useState<ImagePreview[]>([]);

  const fetchIssues = async () => {
    setLoading(true);
    setError("");
    try {
      const params: any = {};
      if (
        user?.entityId &&
        user?.entityTypeId &&
        (user?.userRole === 3 || user?.userRole === 4)
      ) {
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

  useEffect(() => {}, [entities]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
      setSelectedImages((prev) => [...prev, ...newFiles]);
    }
  };

  // Remove image from selection
  const removeImage = (index: number) => {
    setSelectedImages((prev) => {
      const newImages = [...prev];
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(newImages[index].previewUrl);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      selectedImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, []);

  const resetForm = () => {
    setFormData({
      projectId: "",
      issueName: "",
      issueDescription: "",

      assignedTo: "",
      issueReportedOn: "",
      issueStatus: "",
      priority: "",
      departmentId: "",
      executiveAgencyId: "",
    });
    // Clean up image previews
    selectedImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    setSelectedImages([]);
  };

  const getFormattedDate = () => {
    const date = new Date();
    // Add 5 hours and 30 minutes for IST
    date.setMinutes(date.getMinutes() + 330); // (5 hours * 60) + 30 minutes = 330 minutes
    return date.toISOString().split("T")[0]; // Returns YYYY-MM-DD
  };

  const handleSubmit = async () => {
    setLoading(true);

    const data = {
      ...formData,

      issueRaisedBy: user?.entityId,
      issueRaisedDate: getFormattedDate(),
    };

    // console.log("data", data);

    const form = new FormData();

    // Append form data
    Object.entries(data).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });

    // Append images
    selectedImages.forEach((image) => {
      form.append("images", image.file);
    });

    // console.log("form data", formData);

    try {
      const response = await axios.post(`${endpoint}/api/issues`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(response.data);
      setShowModal(false);
      resetForm();
      fetchIssues();
    } catch (error) {
      console.error("Error submitting issue:", error);
      setError("Failed to submit issue. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getEntityIds = (projectId) => {
    const project = projectNameData.find((project) => project.id == projectId);
    if (project) {
      return {
        departmentId: project.departmentId,
        executiveAgencyId: project.executiveAgencyId,
      };
    }
    return {};
  };

  const selectProject = () => {
    // if (user?.userRole === 3 || user?.userRole === 4) {
    if (user?.entityTypeId === 1) {
      const projects = projectNameData
        .filter((project) => project.departmentId == user?.entityId)
        .map((project) => (
          <option key={project.id} value={project.id}>
            {project.projectName}
          </option>
        ));

      return projects;
    } else if (user?.entityTypeId === 2) {
      const projects = projectNameData
        .filter((project) => project.executiveAgencyId == user?.entityId)
        .map((project) => (
          <option key={project.id} value={project.id}>
            {project.projectName}
          </option>
        ));

      return projects;
    }
    // }
  };

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
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
          >
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
        ) : issues.length > 0 ? (
          <IssueTable
            headers={projectIssuesHeaders}
            projects={issues}
            searchTerm={searchTerm}
            subTableKeyName="issues"
          />
        ) : (
          <p className="text-center py-6 text-gray-600">No issues found.</p>
        )}
      </div>

      {showModal && (
        <div
          style={{ margin: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
        >
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Add New Issue
            </h2>

            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Project
                </label>
                <select
                  value={formData.projectId}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      projectId: e.target.value,
                      ...getEntityIds(e.target.value),
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Project</option>

                  {selectProject()}
                </select>
              </div>

              {/* Issue Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Name
                </label>
                <input
                  value={formData.issueName}
                  onChange={(e) =>
                    setFormData({ ...formData, issueName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter issue name"
                  type="text"
                />
              </div>

              {/* Issue Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.issueDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      issueDescription: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="Describe the issue"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assign to
                </label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) =>
                    setFormData({ ...formData, assignedTo: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Department</option>
                  {entities
                    ?.filter((entity) => entity.entity_type === 1)
                    .map((entity) => (
                      <option key={entity.id} value={entity.id}>
                        {entity.entity_name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Priority</option>
                  {priorityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Reported on
                </label>
                <input
                  type="date"
                  value={formData.issueReportedOn}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      issueReportedOn: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Images
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-orange-500">
                    <Plus size={24} className="text-gray-400" />
                    <p className="text-sm text-gray-400 mt-2">
                      Click to select multiple images
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {/* Image Previews */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {selectedImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden"
                    >
                      <img
                        src={image.previewUrl}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
