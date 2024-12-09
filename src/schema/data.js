const data = {
  id: "id",

  projectName: "project name",
  projectStatus: "project status",
  projectGoal: "goals&Benefits", //ADD

  projectDepartment: "project department",
  departmentId: "department id ", //ADD

  executingAgency: "executing agency", //ADD
  execytingAgencyId: "executing agency id", //ADD

  scheme: "scheme",
  description: "description",

  fundSanctionedBy: "fund sanctioned by", //ADD

  //   fetch it from milestone table based on months and project id
  lastMonthPhysicalProgress: "40%",
  currentMonthPhysicalProgress: "50%",

  //   fetch it from the budget table based on project id
  //   total released fund would be the sum of all the installments amount of the project
  //   totalExpenditure would the sum of all the installments expenditure of the project
  totalReleasedFunds: "₹50 करोड़",
  totalExpenditure: "₹45 करोड़",

  //   last time when was the fund received
  //   last time when was the utilization certificate submitted

  lastFundReceivedDate: "01-12-2023",
  utilizationCertificateSubmissionDate: "15-12-2023",

  // fetch from the photo gallery based on the months

  geoTaggedPhotosLastMonth: "फोटो लिंक 1",
  geoTaggedPhotosCurrentMonth: "फोटो लिंक 2",

  concernedOfficialName:
    "Concerned Official Name, Designation & Contact for project department", //ADD
  concernedProjectManager: "Concerned Project Manager Name & Contact", //ADD

  projectSanctionDate: "project sanction date", //projectApprovalDate
  projectFinalcialApprovalGONumber: "project Financial Approval Go Ref NO", // add
  projectFinalcialApprovalDate: "project Financial Approval Date", //governmentApprovalDateAndOrder
  actualProjectStartDate: "actual project start date", //projectStartDate
  projectCompletionDate: "Project Completion date", // originalCompletionDate
  revisedProjectSanctionDate: "Revised project Sanction date", //add
  revisedProjectCompletionDate: "Revised project Completion date", //revisedCompletionDate
  estimatedCompletionDate:
    "Estimated date of completion of work as per executing agency", //add
  actualCompletionDate: "Actual Completion Date", //add
  workOrderFormationDate: "Work Order Formation Date", //add
  landHandoverDate: "Date of Land Handover to Executing Agency", //land availability date
  contactInformation: "user id", //add

  meetingInstructions: [
    {
      desc: "निर्देश 1",
      date: "01-01-2023",
      compliance: "अनुपालन 1",
      projectId: "1",
      feedback: "प्रतिक्रिया 1",
    },
  ],

  projectInspection: [
    {
      inspectionDate: "Inspection Date",
      officialName: "Official Name",
      officialEmail: "Official Email",
      officialPhone: "Official Phone",
      officialDesignation: "Official Designation",
      officialDepartment: "Official Department",
      InspectionType: "Inspection Type",
      inspectionInstruction: "Inspection Instruction",
      inspectionStatus: "Inspection Status",
      inspectionReport: "inspectionReport.pdf",
      projectId: "1",
    },
  ],

  projectEssentialTest: [
    {
      testName: "Test Name",
      dateOfSampleCollection: "Date Of Sample Collection",
      samplingAuthority: "Sampling Authority",
      sampleTestLabName: "Sample Test Lab Name",
      sampleTestReport: "sampleTestReport.pdf",
      sampleCollectionSiteImage: [
        "sampleCollectionSiteImage1.jpg",
        "sampleCollectionSiteImage2.jpg",
      ],
      projectId: "1",
    },
  ],

  projectGallery: [
    {
      image: "image1.jpg",
      imageDescription: "Image Description",
      lattitude: "Lattitude",
      longitude: "Longitude",
      elevation: "Elevation",
      accuracy: "Accuracy",
      time: "Time",
      projectId: "1",
    },
  ],

  mileStones: [
    {
      milestoneName: "Milestone Name",
      milestoneFromDate: "Milestone From Date",
      milestoneCompletionDate: "Milestone Completion Date",
      milestoneActualCompletionDate: "Milestone Actual Completion Date",
      milestoneStatus: "Milestone Status",
      milestoneDescription: "Milestone Description",
      milestoneProgress: "Milestone Progress",
      projectId: "1",
    },
  ],

  issues: [
    {
      issueName: "Issue Name",
      issueDescription: "Issue Description",
      issueRaisedBy: "Issue Raised By",
      issueRaisedDate: "Issue Raised Date",
      assignedTo: "Assigned To",
      issueReportedOn: "Issue Reported On",
      issueStatus: "Issue Status",
      issueClosedDate: "Issue Closed Date",
      issueClosedBy: "Issue Closed By",

      projectId: "1",
    },
  ],

  budegetInstallment: [
    {
      installmentAmount: "Installment Amount",
      installmentExpenditure: "Installment Expenditure",
      amountRecievedDate: "Amount Recieved Date",
      utilizationCertificate: "uc.pdf",
      projectId: "1",
    },
  ],

  lastUpdatedDate: "Last Updated Date",
  lastUpdatedDateOnCMIS: "Last Updated Date",
  projectHandoverDate: "Project Handover",
  projectHandoverTo: "Project Handover To",
  parallelRequirements: "Parallel Requirements",
};

const departments = [
  {
    department_id: "1",
    department_name: "Department of Drinking Water and Sanitation",
    number_of_projects: "0",
    status: "1",
  },
];

const executingAgency = [
  {
    executing_agency_id: "1",
    executing_agency_name: "Executing Agency Name",
    executing_agency_address: "Executing Agency Address",
    executing_agency_phone: "Executing Agency Phone",
    executing_agency_email: "Executing Agency Email",
    executing_agency_website: "Executing Agency Website",
    status: "1",
  },
];

const user = [
  {
    userId: "1",
    officialName: "Official Name",
    officialEmail: "Official Email",
    officialPhone: "Official Phone",
    officialDesignation: "Official Designation",
    officialDepartment: "Official Department",
    username: "Username",
    password: "Password",
    role: "1 for Admin, 2 for Manager, 3 for User",
    departmentId: "1",
    status: "1",
    createdAt: "Created At",
    updatedAt: "Updated At",
  },
];

const ProjectCreation = {
  projectName: "Smart City Development Phase 1",
  projectStatus: "In Progress",
  projectGoal: "Develop smart infrastructure and digital services",
  projectDepartment: "Urban Development",
  departmentId: 1,
  executingAgency: "Metro Infrastructure Ltd",
  executingAgencyId: 1,
  scheme: "Smart Cities Mission",
  description:
    "Implementation of smart city solutions including IoT sensors, digital governance platforms, and smart traffic management",
  fundSanctionedBy: "State Urban Development Authority",
  concernedOfficialName: "Mr. Raj Kumar, Chief Urban Planner, +91-9876543210",
  concernedProjectManager: "Ms. Priya Singh, Project Director, +91-9876543211",
  projectSanctionDate: "2024-01-15",
  projectFinancialApprovalGoNumber: "UDA/2024/SC/001",
  projectFinancialApprovalDate: "2024-01-20",
  actualProjectStartDate: "2024-02-01",
  projectCompletionDate: "2025-02-01",
  revisedProjectSanctionDate: null,
  revisedProjectCompletionDate: null,
  estimatedCompletionDate: "2025-01-15",
  actualCompletionDate: null,
  workOrderFormationDate: "2024-01-25",
  landHandoverDate: "2024-01-30",
  contactInformation: 1001,
};
