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

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchProjectDetail = async (projectId) => {
    try {
      const response = await axios.get(`${endpoint}/api/projects/${projectId}`);
      if (response.status === 200) {
        setProject(response.data);
        console.log(response.data);
      } else {
        throw new Error(`Unexpected response code: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching project details:", error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchProjectDetail(id);
  }, []);

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
      <ProjectBudget project={project} />
      <ProjectInspection project={project} />
      <ProjectEssentialTest project={project} />
      <ProjectMeetingLogs meetingInstructions={project.meetingInstructions} />
      <ProjectSchedule project={project} />
      <ProjectGallery project={project} />
      <ProjectProgress />

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
