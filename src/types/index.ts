export interface ProjectApprovalInfo {
  date: string;
  orderNumber: string;
}

export interface Project {
  id: string;
  projectName: string;
  projectStatus: string;
  executingAgency: string;
  approvalDateAndOrderNumber: string;
  financialApprovalDateAndOrderNumber: string;
  approvedProjectCost: string;
  completionDateAsPerContract: string;
  totalReleasedFunds: string;
  totalExpenditure: string;
  milestoneProgress: string;
  physicalProgress: string;
  estimatedCompletionDateByAgency: string;
  delayReason: string;
  revisedApprovalDate: string;
  revisedProjectCost: string;
  revisedCompletionDate: string;
  departmentName: string;
  projectCategory: string;
  contractFormationDate: string;
  landAvailabilityDate: string;
  projectUpdate: string;
  projectGallery: string;
  meetingInstructions: string;
  complianceOfMeetingInstructions: string;
}


export interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  department: string;
}