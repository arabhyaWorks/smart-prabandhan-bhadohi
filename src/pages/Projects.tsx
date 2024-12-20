import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useLocation } from "react-router-dom";

import axios from "axios";
import { useEntities } from "../context/EntityContect"; // Import useEntities hook
import { endpoint } from "../utils/dataSet";
import { headers } from "../utils/dataSet";
import { Plus, Download, Table, LayoutGrid } from "lucide-react";
import { DataTable } from "../components/table/SuperProjectTable";
import { ProjectFilters } from "../components/table/ProjectFilters";
import Drawer from "../components/drawer/Drawer";
import ProjectForm from "../components/drawer/dataEntryForm";
import classNames from "classnames";
import { convertToIST } from "../utils/functions";
import { ProjectTableDataKeys } from "../utils/dataSet";
import exportData from "../utils/exportXl";

export const MeetingLogModal = ({
  projectName,
  projectId,
  closeModal,
  showModal,
}) => {
  const meetingHeaders = [
    "क्रम संख्या",
    "समीक्षा बैठक निर्देश",
    "समीक्षा बैठक दिनांक",
    "दिये गये निर्देश के सापेक्ष अनुपालन",
    "अभ्यूक्ति",
  ];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [meetingLogs, setMeetingLogs] = useState([]);

  const fetchMeetingLogs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${endpoint}/api/projects/${projectId}/meetings`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        setMeetingLogs(response.data.data);
      } else {
        setError("Failed to fetch meeting logs. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching meeting logs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetingLogs();
  }, [projectId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (!showModal) return null;

  return (
    <div
      style={{
        zIndex: 9999,
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed",
        // position: "absolute"
        transitionDuration: "1000ms",
      }}
      className="duration-1000		 inset-0 bg-black bg-opacity-15 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-auto max-h-[80vh] w-[90%]">
        <h2 className="text-lg font-bold text-gray-900 p-4 border-b">
          Meeting Logs
        </h2>
        <h3 className="text-sm font-semibold text-gray-900 p-4 border-b">
          {projectName}
        </h3>
        <div className="p-5">
          <table className="min-w-full  divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {meetingHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-sm font-bold text-orange-800 tracking-wider border-2 border-gray-200"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {meetingLogs.map((meeting, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 border-2 border-gray-200 text-center">
                    {meeting.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-2 border-gray-200">
                    {meeting.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-2 border-gray-200">
                    {/* {new Date(meeting.date).toLocaleString()} */}
                    {convertToIST(meeting.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-2 border-gray-200">
                    {meeting.compliance}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-2 border-gray-200">
                    {meeting.feedback}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Modal Buttons */}
        <div className=" pr-5 pb-5 flex justify-end gap-3 mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          {/* <button
            // onClick={uploadBudgetUc}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Submit
          </button> */}
        </div>
      </div>
    </div>
  );
};

export const CreateMeetingLog = ({
  projectName,
  projectId,
  closeModal,
  showModal,
}) => {
  const meetingHeaders = [
    "क्रम संख्या",
    "समीक्षा बैठक निर्देश",
    "समीक्षा बैठक दिनांक",
    "दिये गये निर्देश के सापेक्ष अनुपालन",
    "अभ्यूक्ति",
  ];

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [compliance, setCompliance] = useState("");
  const [feedback, setFeedback] = useState("");

  const submitMeetingLog = async () => {
    if (!description || !date || !compliance || !feedback) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        `${endpoint}/api/projects/${projectId}/meetings`,
        {
          description,
          date,
          compliance,
          feedback,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        alert("Meeting log submitted successfully.");
        closeModal();
      } else {
        console.error("Failed to submit meeting log.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!showModal) return null;

  return (
    <div
      style={{
        zIndex: 9999,
        margin: 0,
        padding: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: "fixed",
        // position: "absolute"
        transitionDuration: "1000ms",
      }}
      className="duration-1000		 inset-0 bg-black bg-opacity-15 flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-auto max-h-[80vh] w-[90%]">
        <h2 className="text-lg font-bold text-gray-900 p-4 border-b">
          Meeting Logs
        </h2>
        <h3 className="text-sm font-semibold text-gray-900 p-4 border-b">
          {projectName}
        </h3>
        <div className="p-5">
          <div>
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  समीक्षा बैठक निर्देश
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="समीक्षा बैठक निर्देश"
                  type="text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  दिये गये निर्देश के सापेक्ष अनुपालन
                </label>
                <textarea
                  value={compliance}
                  onChange={(e) => setCompliance(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="दिये गये निर्देश के सापेक्ष अनुपालन"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  अभ्यूक्ति
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="अभ्यूक्ति"
                />
              </div>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              समीक्षा बैठक दिनांक
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        {/* Modal Buttons */}
        <div className=" pr-5 pb-5 flex justify-end gap-3 mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={submitMeetingLog}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export function Projects() {
  const location = useLocation();
  const { state } = location;
  const [activeView, setActiveView] = useState("full"); // 'full' or 'simplified'

  const { user } = useEntities(); // Access user data from the context
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedExecutiveAgency, setSelectedExecutiveAgency] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showCreateMeetingLog, setShowCreateMeetingLog] = useState(false);

  const [visibleColumns, setVisibleColumns] = useState(
    headers.hi.map((_, index) => index.toString())
  );
  const columns = headers.hi.map((header, index) => ({
    key: index.toString(),
    label: header,
  }));

  const projectStatuses = [
    // "योजना चरण में",
    // "विवादित",
    // "प्रगति पर है",
    // "विलंबित",
    // "पूर्ण हुआ",

    "योजना चरण",
    "प्रगति पर है",
    "विवादित",
    "विलंबित",
    "पूर्ण हुआ",
    "कोर्ट केस",
  ];

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
        console.log(response.data.data);
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

  useEffect(() => {
    // Check if navigating from dashboard with department filter
    if (state?.fromDashboard && state?.selectedDepartment) {
      setSelectedDepartment(state.selectedDepartment);
      // Clear the state to prevent filter from persisting on manual navigation
      window.history.replaceState({}, document.title);
    }

    if (state?.fromDashboard && state?.selectedProjectStatus) {
      setSelectedStatus(state.selectedProjectStatus);
      // Clear the state to prevent filter from persisting on manual navigation
      window.history.replaceState({}, document.title);
    }
  }, [state]);

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

  const simplifiedTableKeys = [
    "id",
    "projectName",
    "projectStatus",
    "projectSanctionDate",
    "approvedProjectCost",
    "contractCost",
    "totalReleasedFunds",
    "totalExpenditure",
    "lastMonthPhysicalProgress",
    "currentMonthPhysicalProgress",
    "projectCompletionDate",
    "meetingfeedback",
  ];

  const activeKeys =
    activeView === "full" ? ProjectTableDataKeys : simplifiedTableKeys;
  const activeHeaders = {
    hi: headers.hi.filter((_, index) =>
      activeKeys.includes(ProjectTableDataKeys[index])
    ),
    en: headers.en.filter((_, index) =>
      activeKeys.includes(ProjectTableDataKeys[index])
    ),
  };

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
            onClick={(e) => {
              e.preventDefault();
              exportData(activeView, filteredProjects);
            }}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView("full")}
              className={classNames(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeView === "full"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Table className="w-4 h-4" />
              Detailed View
            </button>
            <button
              onClick={() => setActiveView("simplified")}
              className={classNames(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                activeView === "simplified"
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
              Simple View
            </button>
          </div>
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
            activeView={activeView}
            activeKeys={activeKeys}
            activeHeaders={activeHeaders}
            onMeetingLogsClick={(projectName, projectId) => {
              console.log(projectName, projectId);
              setProjectName(projectName);
              setProjectId(projectId);
              setShowModal(true);
            }}
            onMeetingLogCreateClick={(projectName, projectId) => {
              console.log(projectName, projectId);
              setProjectName(projectName);
              setProjectId(projectId);
              setShowCreateMeetingLog(true);
            }}
          />
        </div>
      )}

      <MeetingLogModal
        projectName={projectName}
        projectId={projectId}
        closeModal={() => setShowModal(false)}
        showModal={showModal}
      />

      <CreateMeetingLog
        projectName={projectName}
        projectId={projectId}
        closeModal={() => setShowCreateMeetingLog(false)}
        showModal={showCreateMeetingLog}
      />

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
