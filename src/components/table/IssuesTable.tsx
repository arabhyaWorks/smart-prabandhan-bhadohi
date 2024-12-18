import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Plus,
} from "lucide-react";
import classNames from "classnames";
import { convertToIST } from "../../utils/functions";
import { useEntities } from "../../context/EntityContect";

const priorityOptions = {
  1: "High",
  2: "Medium",
  3: "Low",
};

const statusOptions = {
  1: "Active",
  2: "In Progress",
  3: "Resolved",
  4: "Closed",
};

interface IssuesDetails {
  projectId: string;
  projectName: string;
  executiveAgencyId: string;
  executiveAgencyName: string;
  departmentId: string;
  departmentName: string;
  issueName: string;
  issueDescription: string;
  issueRaisedBy: string;
  issueRaisedDate: string;
  assignedTo: string;
  issueReportedOn: string;
  issueStatus: string;
  priority: string;
  issueClosedDate: string;
  issueClosedBy: string;
  images: Array<string>;
}

interface Header {
  main: {
    [key: string]: Array<string>;
  };
  subHeaders: {
    [key: string]: Array<string>;
  };
}

interface DataTableProps {
  searchTerm: string;
  projects: IssuesDetails[];
  headers: Header;
  subTableKeyName: string;
}

export const IssueTable = ({
  searchTerm,
  projects,
  headers,
  subTableKeyName,
}: DataTableProps) => {
  const { entities, reloadEntities, user, projectNameData } = useEntities();

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // console.log(projects);

  // Pagination calculations
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = projects.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(projects.length / entriesPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
  };

  useEffect(() => {}, [entities]);

  const getEntityName = (id: string) => {
    if (entities) {
      return entities.find((entity) => entity.id === id)?.entity_name;
    }
    // return id;
  };

  return (
    <div className="flex flex-col">
      {/* No. of Entries Control */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 ">
            <tr>
              {headers.main.hi.map((header, index) => (
                <th
                  key={index}
                  className={classNames(
                    "px-6 py-4 text-left text-sm font-bold text-orange-800 tracking-wider whitespace-normal border-2 border-gray-200",
                    index === 0 ? "w-16" : "w-40"
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentEntries.map((project, index) => (
              <React.Fragment key={index}>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="text-sm text-center text-gray-900 border-2 border-gray-100 px-6 py-4">
                    {/* {project.projectId} */}
                    {index + 1}
                  </td>
                  <td className="text-sm text-gray-900 border-2 border-gray-100 w-40 flex w-[300px] border-none px-6 py-4 ">
                    {project.projectName}
                  </td>
                  <td className="text-sm text-gray-900 border-2 border-gray-100 px-6 py-4">
                    {project.issueName}
                  </td>
                  <td className="text-sm text-gray-900 border-2 border-gray-100 px-6 py-4">
                    {priorityOptions[project.priority]}
                  </td>
                  <td className="text-sm text-gray-900 border-2 border-gray-100 px-6 py-4">
                    {statusOptions[project.issueStatus]}
                  </td>
                  <td className="text-sm text-gray-900 border-2 border-gray-100 px-6 py-4">
                    {getEntityName(project.issueRaisedBy)}
                  </td>
                  <td className="text-sm text-gray-900 border-2 border-gray-100 px-6 py-4">
                    {getEntityName(project.assignedTo)}
                  </td>
                  <td className="text-sm text-gray-900 border-2 border-gray-100 px-6 py-4">
                    {convertToIST(project.issueRaisedDate)}
                  </td>
                  <td className="text-sm text-gray-900 border-2 border-gray-100 px-6 py-4">
                    {convertToIST(project.issueReportedOn)}
                  </td>
                  <td className="text-sm text-gray-900 border-2 border-gray-100 px-6 py-4">
                    {project.issueClosedBy || "-"}
                  </td>
                  <td className="text-sm text-gray-900 border-2 border-gray-100 px-6 py-4">
                    {convertToIST(project.issueClosedDate) || "-"}
                  </td>
                  {/* <td className="text-sm text-gray-900 border-2 border-gray-100 px-6 py-4">
                    <button className="text-sm bg-orange-600 text-white font-semibold rounded-md px-6 py-1">
                      Edit
                    </button>
                  </td> */}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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

          {/* Page Numbers */}
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
