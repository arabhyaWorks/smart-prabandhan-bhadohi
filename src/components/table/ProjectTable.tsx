import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import classNames from "classnames";

interface InspectionDetail {
  srNo: string;
  inspectionDate: string;
  inspectionTitle: string;
  inspectionAuthority: string;
  inspectionType: string;
  inspectionInstruction: string;
  inspectionReport: string;
  complianceStatus: string;
  action: Array<string>;
}

interface ProjectTable {
  srNo: string;
  projectName: string;
  inspectionDetails: InspectionDetail[];
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
  projects: ProjectTable[];
  headers: Header;
  subTableKeyName: string;
}
const subTable = (
  inspectionDetails: InspectionDetail[],
  headers: Header["subHeaders"]
) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {headers.hi.map((header, index) => (
            <th
              key={index}
              className={classNames(
                "px-6 py-4 text-left text-sm font-bold text-orange-800 tracking-wider whitespace-normal border-2 border-gray-200",
                index === 0 ? "w-16" : "w-40",
                index === 0 && "border-l-0",
                index === headers.hi.length - 1 && "border-r-0",
                "border-t-0"
              )}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-red-200 ">
        {inspectionDetails.map((detail, index) => (
          <tr key={index} className="hover:bg-gray-50 transition-colors">
            {Object.keys(detail).map((key, index) => (
              <td
                key={index}
                className={classNames(
                  "px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-2 border-gray-100",
                  index === 0 ? "w-16 text-center" : "w-40",
                  index === 0 && "border-l-0",
                  index === Object.keys(detail).length - 1 && "border-r-0",
                  "border-b-0"
                )}
              >
                {detail[key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export const DataTable = ({
  searchTerm,
  projects,
  headers,
  subTableKeyName
}: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Pagination calculations
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = projects.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(projects.length / entriesPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), totalPages));
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
                  {Object.keys(project).map((key, index) => (
                    <td
                      className={classNames(
                        "text-sm",
                        "text-gray-900 border-2 border-gray-100",
                        index === 0 ? "w-16 text-center" : "w-40",
                        key === "projectName" && "flex w-[300px] border-none ",
                        key === subTableKeyName ? "px-0 py-0" : "px-6 py-4 "
                      )}
                    >
                      {key === subTableKeyName
                        ? subTable(project[key], headers.subHeaders)
                        : project[key]}
                    </td>
                  ))}
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
