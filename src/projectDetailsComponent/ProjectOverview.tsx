import React from "react";
import classNames from "classnames";
import { convertToIST } from "../utils/functions";

const status = ["योजना चरण", "प्रगति पर है", "विवादित", "विलंबित", "पूर्ण हुआ"];

const ProjectOverview = ({ project }) => {
  return (
    <div className=" rounded-lg bg-white shadow-sm">
      <div className="p-8">
        {/* Project Title Section */}
        <div className="mb-8 border-b border-orange-100 pb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {project.projectName}
            </h2>
            <span
              className={classNames(
                "px-4 py-1 rounded-full text-sm font-semibold",
                project.projectStatus === "1"
                  ? "bg-green-100 text-green-800"
                  : project.projectStatus === "2"
                  ? "bg-blue-100 text-blue-800"
                  : project.projectStatus === "3"
                  ? "bg-yellow-100 text-yellow-800"
                  : project.projectStatus === "4"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800"
              )}
            >
              {status[parseInt(project.projectStatus) - 1]}
            </span>
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <InfoCard
              title="Project Department"
              value={project.projectDepartment}
              bgColor="bg-blue-50"
              textColor="text-blue-700"
            />
            <InfoCard
              title="Executing Agency"
              value={project.executingAgency}
              bgColor="bg-purple-50"
              textColor="text-purple-700"
            />
            <InfoCard
              title="Yojna Name"
              value={project.scheme || "N/A"}
              bgColor="bg-green-50"
              textColor="text-green-700"
            />
            <InfoCard
              title="Project Manager"
              value={project.concernedProjectManager || "N/A"}
              bgColor="bg-orange-50"
              textColor="text-orange-700"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <InfoCard
              title="Approved Project Cost"
              value={
                project.approvedProjectCost
                  ? `₹${project.approvedProjectCost} Cr`
                  : "N/A"
              }
              bgColor="bg-pink-50"
              textColor="text-pink-700"
            />
            <InfoCard
              title="Contract Cost"
              value={
                project.contractCost ? `₹${project.contractCost} Cr` : "N/A"
              }
              bgColor="bg-indigo-50"
              textColor="text-indigo-700"
            />
            <InfoCard
              title="Total Released Funds"
              value={
                project.totalReleasedFunds
                  ? `₹${project.totalReleasedFunds} Cr`
                  : "N/A"
              }
              bgColor="bg-teal-50"
              textColor="text-teal-700"
            />
            <InfoCard
              title="Total Expenditure"
              value={
                project.totalExpenditure
                  ? `₹${project.totalExpenditure} Cr`
                  : "N/A"
              }
              bgColor="bg-cyan-50"
              textColor="text-cyan-700"
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-8 pt-6 border-t border-orange-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-amber-700 mb-2">
                Goals & Objectives
              </h3>
              <p className="text-amber-900">{project.projectGoal || "N/A"}</p>
            </div>
            <div className="bg-rose-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-rose-700 mb-2">
                Financial Approval G.O. Number & Date
              </h3>
              <p className="text-rose-900">
                {project.projectFinancialApprovalGoNumber || "N/A"}
                {project.projectFinancialApprovalDate &&
                  ` (${convertToIST(project.projectFinancialApprovalDate)})`}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-8 pt-6 border-t border-orange-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gren-700 mb-2">
                Project Sanction Date
              </h3>
              <p className="text-green-900">
                {convertToIST(project.projectSanctionDate) || "N/A"}
              </p>
            </div>
            <div className="bg-teal-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-teal-700 mb-2">
                Contact Information
              </h3>
              <p className="text-teal-900">
                {project.contactInformation || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for info cards
const InfoCard = ({ title, value, bgColor, textColor }) => (
  <div
    className={`${bgColor} rounded-lg p-4 transition-all duration-300 hover:shadow-md`}
  >
    <h3 className={`text-sm font-medium ${textColor} mb-1`}>{title}</h3>
    <p className="text-gray-900 font-semibold">{value}</p>
  </div>
);

export default ProjectOverview;
