import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Download } from "lucide-react";
import ProjectOverview from "./ProjectOverview";
import ProjectMetrics from "./ProjectMetrics";
import ProjectSchedule from "./ProjectSchedule";
import ProjectInspection from "./ProjectInspection";
import ProjectEssentialTest from "./ProjectEssentialTest";
import ProjectBudget from "./ProjectBudget";
import ProjectGallery from "./ProjectGallery";
import ProjectProgress from "./ProjectProgress";
import generateAndDownloadPDF from "../utils/pdfDownloader";
import { endpoint } from "../utils/dataSet";
import ProjectMeetingLogs from "./ProjectMeetingLogs";
import Drawer from "../components/drawer/Drawer";

import EditProjectForm from "../components/drawer/EditProjectForm";

const data = {
  "id": 34,
  "projectName": "भदोही के सी0एच0सी0 भदोही में 50 शैय्या फील्ड हास्पीटल (ई0सी0आर0पी0-2)",
  "projectStatus": "2",
  "projectGoal": null,
  "projectDepartment": "चिकित्सा स्वास्थ्य एवं परिवार कल्याण",
  "departmentId": 6,
  "executingAgency": "उ.प्र. राज्य निर्माण सहकारी संध लि. लखनऊ (यू.पी.आर.एन.एस.एस.)",
  "executingAgencyId": 20,
  "scheme": null,
  "description": null,
  "fundSanctionedBy": null,
  "concernedOfficialName": null,
  "concernedProjectManager": null,
  "projectSanctionDate": "2022-08-24T00:00:00.000Z",
  "projectFinancialApprovalGoNumber": null,
  "projectFinancialApprovalDate": null,
  "actualProjectStartDate": "2023-03-19T00:00:00.000Z",
  "projectCompletionDate": "2024-03-16T00:00:00.000Z",
  "revisedProjectSanctionDate": null,
  "revisedProjectCompletionDate": "2024-12-31T00:00:00.000Z",
  "estimatedCompletionDate": null,
  "actualCompletionDate": null,
  "workOrderFormationDate": null,
  "landHandoverDate": null,
  "contactInformation": 1,
  "lastUpdatedDate": null,
  "lastUpdatedDateOnCmis": null,
  "projectHandoverDate": null,
  "projectHandoverTo": null,
  "parallelRequirements": null,
  "totalApprovedBudget": "3.05",
  "revisedProjectCost": null,
  "approvedProjectCost": "3.05",
  "contractDate": "2023-03-16T00:00:00.000Z",
  "contractCost": "2.22",
  "totalReleasedFunds": "6.88",
  "totalExpenditure": "6.55",
  "delayReason": null,
  "lastMonthPhysicalProgress": "85.00",
  "currentMonthPhysicalProgress": "85.00",
  "lastFundReceivedDate": "2024-12-17T00:00:00.000Z",
  "utilizationCertificateSubmissionDate": "https://project-management-system-uploads.s3.ap-south-1.amazonaws.com/utilization_certificates/34/1734438544174_Project_Charter_53.pdf",
  "geoTaggedPhotosLastMonth": null,
  "geoTaggedPhotosCurrentMonth": "https://project-management-system-uploads.s3.ap-south-1.amazonaws.com/projects/34/1734442889181_WhatsApp%20Image%202024-12-17%20at%2016.33.40.jpeg",
  "meetingInstructions": [
      {
          "id": 223,
          "description": null,
          "date": null,
          "compliance": null,
          "projectId": 34,
          "feedback": "अगस्त माह 2024 में धनराशि रू0 1.3611 प्राप्त। (जी-1) भू-तल एवं प्रथम तल का टाइल्स तथा फायर फायटिंग का कार्य प्रगति पर।"
      }
  ],
  "projectInspection": [],
  "projectEssentialTest": [],
  "projectGallery": [
      {
          "id": 83,
          "image": "https://project-management-system-uploads.s3.ap-south-1.amazonaws.com/projects/34/1734442889181_WhatsApp%20Image%202024-12-17%20at%2016.33.40.jpeg",
          "imageDescription": "50BED FIELD HOSPITAL AT C H C BHADOHI FRONT (VIEW)",
          "latitude": null,
          "longitude": null,
          "elevation": null,
          "accuracy": null,
          "time": "2024-12-17T13:41:27.000Z",
          "projectId": 34
      }
  ],
  "mileStones": [
      {
          "id": 150,
          "milestoneName": null,
          "milestoneFromDate": "2024-12-01T00:00:00.000Z",
          "milestoneCompletionDate": "2024-12-30T00:00:00.000Z",
          "milestoneActualCompletionDate": "2024-12-30T00:00:00.000Z",
          "milestoneStatus": "85",
          "milestoneDescription": null,
          "milestoneProgress": "85.00",
          "projectId": 34
      },
      {
          "id": 151,
          "milestoneName": null,
          "milestoneFromDate": "2024-11-01T00:00:00.000Z",
          "milestoneCompletionDate": "2024-11-30T00:00:00.000Z",
          "milestoneActualCompletionDate": "2024-11-30T00:00:00.000Z",
          "milestoneStatus": "85",
          "milestoneDescription": null,
          "milestoneProgress": "85.00",
          "projectId": 34
      }
  ],
  "issues": [],
  "budgetInstallment": [
      {
          "id": 101,
          "installmentAmount": "1.00",
          "installmentExpenditure": "1.00",
          "amountReceivedDate": "2024-12-17T00:00:00.000Z",
          "utilizationCertificate": "https://project-management-system-uploads.s3.ap-south-1.amazonaws.com/utilization_certificates/34/1734380350854_Project_Charter_34.pdf",
          "projectId": 34
      },
      {
          "id": 102,
          "installmentAmount": "1.00",
          "installmentExpenditure": "1.00",
          "amountReceivedDate": "2024-12-17T00:00:00.000Z",
          "utilizationCertificate": "https://project-management-system-uploads.s3.ap-south-1.amazonaws.com/utilization_certificates/34/1734380400056_Project_Charter_138.pdf",
          "projectId": 34
      },
      {
          "id": 103,
          "installmentAmount": "1.00",
          "installmentExpenditure": "1.00",
          "amountReceivedDate": "2024-12-17T00:00:00.000Z",
          "utilizationCertificate": "https://project-management-system-uploads.s3.ap-south-1.amazonaws.com/utilization_certificates/34/1734380684826_Project_Charter_34.pdf",
          "projectId": 34
      },
      {
          "id": 109,
          "installmentAmount": "1.00",
          "installmentExpenditure": "1.00",
          "amountReceivedDate": "2024-12-17T00:00:00.000Z",
          "utilizationCertificate": "https://project-management-system-uploads.s3.ap-south-1.amazonaws.com/utilization_certificates/34/1734438544174_Project_Charter_53.pdf",
          "projectId": 34
      },
      {
          "id": 98,
          "installmentAmount": null,
          "installmentExpenditure": null,
          "amountReceivedDate": "2023-09-29T00:00:00.000Z",
          "utilizationCertificate": null,
          "projectId": 34
      }
  ]
}

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(data);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const fetchProjectDetail = async (projectId) => {
  //   try {
  //     const response = await axios.get(`${endpoint}/api/projects/${projectId}`);
  //     if (response.status === 200) {
  //       setProject(response.data);
  //       console.log(response.data);
  //     } else {
  //       throw new Error(`Unexpected response code: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching project details:", error.message);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   fetchProjectDetail(id);
  // }, []);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <h1 className="text-2xl font-semibold text-gray-800 ">
            Project Charter
          </h1>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => generateAndDownloadPDF(project)}
            className="px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md text-sm font-medium"
          >
            <Download className="w-4 h-4 inline-block mr-2" />
            Download PDF
          </button>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-md text-sm font-medium"
          >
            Edit Details
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-md text-sm font-medium"
          >
            Back
          </button>
        </div>
      </div>

      <ProjectOverview project={project} />

      {/* <ProjectMetrics /> */}
      {/* <ProjectBudget project={project} /> */}
      {/* <ProjectInspection project={project} /> */}
      {/* <ProjectEssentialTest project={project} /> */}
      <ProjectMeetingLogs meetingInstructions={project.meetingInstructions} />
      <ProjectSchedule project={project} />
      <ProjectGallery project={project} />
      {/* <ProjectProgress /> */}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Create New Project"
      >
        <div className="p-6">
          <EditProjectForm
            projectData={project}
            onSubmitSuccess={() => setIsDrawerOpen(false)}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default ProjectDetails;
