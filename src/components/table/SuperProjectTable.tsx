import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { ProjectTableDataKeys } from "../../utils/dataSet";
import { convertToIST } from "../../utils/functions";
import { MeetingLogModal } from "../../pages/Projects";

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

interface DataTableProps {
  searchTerm: string;
  projects: Array<string>;
  headers: {
    hi: Array<string>;
    en: Array<string>;
  };
  visibleColumns: string[];
  onMeetingLogsClick: (projectName: string, projectId: string) => void;
  onMeetingLogCreateClick: (projectName: string, projectId: string) => void;
  activeView: string;
  activeKeys: ProjectTableDataKeys;
  activeHeaders: {
    hi: Array<string>;
    en: Array<string>;
  };
}

export const DataTable = ({
  searchTerm,
  projects,
  headers,
  visibleColumns,
  onMeetingLogsClick,
  onMeetingLogCreateClick,
  activeKeys,
  activeHeaders,
}: DataTableProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(100);
  const [showModal, setShowModal] = useState(false);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = projects.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(projects.length / entriesPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10px)] relative">
      <div className="p-4 flex items-center justify-between bg-white border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {[10, 25, 50, 100].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstEntry + 1} to{" "}
          {Math.min(indexOfLastEntry, projects.length)} of {projects.length}{" "}
          entries
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                {activeHeaders.hi.map(
                  (header, index) =>
                    visibleColumns.includes(index.toString()) && (
                      <th
                        key={header}
                        className={classNames(
                          "px-6 py-4 text-left text-sm font-bold text-orange-800 tracking-wider border-2 border-gray-100",
                          index === 0 ? "w-16" : "w-40"
                        )}
                      >
                        {header}
                      </th>
                    )
                )}
              </tr>
              <tr>
                {activeHeaders.hi.map(
                  (header, index) =>
                    visibleColumns.includes(index.toString()) && (
                      <th
                        key={header}
                        className={classNames(
                          "px-6 py-4 text-left text-center text-sm font-bold text-orange-800 tracking-wider border-2 border-gray-100",
                          index === 0 ? "w-16" : "w-40"
                        )}
                      >
                        {index + 1}
                      </th>
                    )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEntries.map((project, rowIndex) => (
                <>
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {activeKeys.map(
                      (key, index) =>
                        visibleColumns.includes(index.toString()) && (
                          <td
                            key={index}
                            className={classNames(
                              "px-6 py-4 text-sm text-gray-900 border-2 border-gray-100",
                              index === 0 ? "text-center" : "whitespace-normal"
                            )}
                            style={{
                              maxWidth:
                                key === "projectName"
                                  ? "500px"
                                  : key === "viewMeetingLog"
                                  ? "300px"
                                  : "200px",
                              overflowWrap: "break-word",
                              whiteSpace: "normal",
                            }}
                          >
                            {key === "id" ? (
                              <p>{rowIndex + 1}</p>
                            ) : // project[key]
                            //
                            key === "projectStatus" ? (
                              <div className="w-20 flex-row justify-center align-center">
                                <p
                                  className={classNames(
                                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                                    project.projectStatus === "Complete"
                                      ? "bg-green-100 text-green-800"
                                      : project.projectStatus ===
                                        "कार्य प्रगति पर"
                                      ? "bg-blue-100 text-blue-800"
                                      : project.projectStatus ===
                                        "प्रारंभिक चरण"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : project.projectStatus ===
                                        "योजना निर्माण"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-red-100 text-red-800"
                                  )}
                                >
                                  {projectStatuses[parseInt(project[key]) - 1]}
                                </p>
                              </div>
                            ) : key === "projectUpdate" ||
                              key === "projectGallery" ||
                              key === "meetingInstructions" ||
                              key === "complianceOfMeetingInstructions" ? (
                              <button
                                className={classNames(
                                  "bg-[#4AA3E0] px-2 py-[1px] rounded shadow text-white",
                                  key === "projectGallery"
                                    ? "bg-[#FFB74D]"
                                    : key === "meetingInstructions"
                                    ? "bg-[#66BB6A]"
                                    : key === "complianceOfMeetingInstructions"
                                    ? "bg-[#5A87D2]"
                                    : ""
                                )}
                              >
                                {project[key]}
                              </button>
                            ) : key === "projectName" ? (
                              <button
                                onClick={() =>
                                  navigate(`/projectDetail/${project.id}`)
                                }
                                className="text-black-500 hover:underline focus:outline-none"
                              >
                                {project[key]}
                              </button>
                            ) : key.includes("Date") ? (
                              <div className="">
                                <p className="">
                                  {convertToIST(project[key])
                                    .split("-")
                                    .join("/")}
                                </p>
                              </div>
                            ) : key === "viewMeetingLog" ? (
                              <div className=" w-[140px]">
                                <button
                                  onClick={() =>
                                    onMeetingLogsClick(
                                      project.projectName,
                                      project.id
                                    )
                                  }
                                  className="text-white w-full font-semibold rounded-md px-4 py-1  bg-blue-400 hover:underline focus:outline-none"
                                >
                                  View Meeting Log
                                </button>
                                <button
                                  onClick={() =>
                                    onMeetingLogCreateClick(
                                      project.projectName,
                                      project.id
                                    )
                                  }
                                  className="text-white mt-3 w-full font-semibold rounded-md px-4 py-1 bg-orange-400 hover:underline focus:outline-none"
                                >
                                  Create Meeting Log
                                </button>
                              </div>
                            ) : (
                              project[key]
                            )}
                          </td>
                        )
                    )}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 flex items-center justify-between border-t bg-white">
        <div className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`px-3 py-1 rounded ${
                    currentPage === pageNum
                      ? "bg-orange-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
