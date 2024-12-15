import React from "react";
import classNames from "classnames";
import { convertToIST } from "../utils/functions";

const status = ["योजना चरण", "प्रगति पर है", "रोक पर", "विलंबित", "पूर्ण हुआ"];
const ProjectOverview = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {project.projectName}{" "}
          <p
            className={classNames(
              "ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
              project.projectStatus === "1"
                ? "bg-green-100 text-green-800"
                : project.projectStatus === "कार्य प्रगति पर"
                ? "bg-blue-100 text-blue-800"
                : project.projectStatus === "प्रारंभिक चरण"
                ? "bg-yellow-100 text-yellow-800"
                : project.projectStatus === "योजना निर्माण"
                ? "bg-gray-100 text-gray-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {status[parseInt(project.projectStatus) - 1]}
          </p>
        </h2>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Project Department
              </h3>
              <p className="mt-1 text-gray-900">{project.projectDepartment}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Executing Agency
              </h3>
              <p className="mt-1 text-gray-900">{project.executingAgency}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Yojna Name</h3>
              <p className="mt-1 text-gray-900">{project.scheme || "N/A"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Project Sanction Date
              </h3>
              <p className="mt-1 text-gray-900">
                {convertToIST(project.projectSanctionDate) || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Project Manager
              </h3>
              <p className="mt-1 text-gray-900">
                {project.concernedProjectManager || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Contact Information
              </h3>

              <p className="mt-1 text-gray-900">
                {project.concernedOfficialName || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Approved Project Cost
              </h3>
              <p className="mt-1 text-gray-900">
                {project.approvedProjectCost + " Cr" || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                {/* Goals & Objectives */}
                Contract Cost
              </h3>
              <p className="mt-1 text-gray-900">
                {project.contractCost + " Cr" || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Total Released Funds
              </h3>
              <p className="mt-1 text-gray-900">
                {project.totalReleasedFunds + " Cr" || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Total Expenditure
              </h3>
              <p className="mt-1 text-gray-900">
                {project.totalExpenditure + " Cr" || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Goals & Objectives
              </h3>
              <p className="mt-1 text-gray-900">
                {project.projectGoal || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Financial Approval G.O. Number & Date
              </h3>
              <p className="mt-1 text-gray-900">
                {project.projectFinancialApprovalGoNumber || "N/A"} 
                {`(${convertToIST(project.projectFinancialApprovalDate) })`|| "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
