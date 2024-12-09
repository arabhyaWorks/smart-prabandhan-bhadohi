const projects = {
  id: "1",
  projectName: "Project Name",
  projectDescription: "Project Description",
  // Goals & Objectives
  projectObjectives: "Project Objectives",
  projectDepartment: "Project Department",
  projectStatus: "Project Status",
  projectApprovalDate: "15-05-2023",
  approvedProjectCost: "₹100 करोड़",
  contractDate: "20-06-2023",
  contractCost: "₹95 करोड़",
  totalReleasedFunds: "₹50 करोड़",
  totalExpenditure: "₹45 करोड़",

  //
  // fetch the physical progress from milestone table based on months
  lastMonthPhysicalProgress: "40%",
  currentMonthPhysicalProgress: "50%",

  projectStartDate: "01-07-2023",
  originalCompletionDate: "31-12-2025",
  revisedCompletionDate: "30-06-2026",
  // fetch the last fund received date from budget table

  lastFundReceivedDate: "01-12-2023",
  utilizationCertificateSubmissionDate: "15-12-2023",
  governmentApprovalDateAndOrder: "20-05-2023, आदेश संख्या 101/2023",
  delayReason: "भूमि अधिग्रहण में देरी",
  schemeName: "औद्योगिक क्षेत्र विकास योजना",
  landAvailabilityDate: "15-06-2023",

  geoTaggedPhotosLastMonth: "फोटो लिंक 1",
  geoTaggedPhotosCurrentMonth: "फोटो लिंक 2",
  meetingInstructions: [
    {
      desc: "निर्देश 1",
      date: "01-01-2023",
      compliance: "अनुपालन 1",
      projectId: "1",
      feedback: "प्रतिक्रिया 1",
    },
  ],

  projectManager: {
    officialName: "Official Name",
    officialEmail: "Official Email",
    officialPhone: "Official Phone",
    officialDesignation: "Official Designation",
    officialDepartment: "Official Department",
    projectId: "1",
  },
  concernedOfficial: [
    {
      officialName: "Official Name",
      officialEmail: "Official Email",
      officialPhone: "Official Phone",
      officialDesignation: "Official Designation",
      officialDepartment: "Official Department",
      projectId: "1",
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
      amountRecievedDate: "Amount Recieved Date",
      utilizationCertificate: "uc.pdf",
      projectId: "1",
    },
  ],

  //projectDetails
  lastUpdatedDate: "Last Updated Date",
  lastUpdatedDateOnCMIS: "Last Updated Date",
  projectHandoverDate: "Project Handover",
  projectHandoverTo: "Project Handover To",
  parallelRequirements: "Parallel Requirements",
};

const projectsCreation = {
  id: "1",
  projectName: "Project Name",
  projectDescription: "Project Description",
  // Goals & Objectives
  projectObjectives: "Project Objectives",
  projectDepartment: "Project Department",
  projectStatus: "Project Status",
  projectApprovalDate: "15-05-2023",
  approvedProjectCost: "₹100 करोड़",
  contractDate: "20-06-2023",
  contractCost: "₹95 करोड़",
  totalReleasedFunds: "₹50 करोड़",
  totalExpenditure: "₹45 करोड़",

  // Not required
  lastMonthPhysicalProgress: "40%",
  currentMonthPhysicalProgress: "50%",

  projectStartDate: "01-07-2023",
  originalCompletionDate: "31-12-2025",
  revisedCompletionDate: "30-06-2026",

  // not required
  lastFundReceivedDate: "01-12-2023",
  utilizationCertificateSubmissionDate: "15-12-2023",

  governmentApprovalDateAndOrder: "20-05-2023, आदेश संख्या 101/2023",
  delayReason: "भूमि अधिग्रहण में देरी",
  schemeName: "औद्योगिक क्षेत्र विकास योजना",
  landAvailabilityDate: "15-06-2023",

  // not required
  geoTaggedPhotosLastMonth: "फोटो लिंक 1",
  geoTaggedPhotosCurrentMonth: "फोटो लिंक 2",

  // not required
  meetingInstructions: [
    {
      desc: "निर्देश 1",
      date: "01-01-2023",
      compliance: "अनुपालन 1",
      projectId: "1",
      feedback: "प्रतिक्रिया 1",
    },
  ],

  // required
  projectManager: {
    officialName: "Official Name",
    officialEmail: "Official Email",
    officialPhone: "Official Phone",
    officialDesignation: "Official Designation",
    officialDepartment: "Official Department",
    projectId: "1",
  },

  // required
  concernedOfficial: [
    {
      officialName: "Official Name",
      officialEmail: "Official Email",
      officialPhone: "Official Phone",
      officialDesignation: "Official Designation",
      officialDepartment: "Official Department",
      projectId: "1",
    },
  ],

  // not required
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

  // not required
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

  // not required
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

  // not required
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

  // not required
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

  // not required
  budegetInstallment: [
    {
      installmentAmount: "Installment Amount",
      amountRecievedDate: "Amount Recieved Date",
      utilizationCertificate: "uc.pdf",
      projectId: "1",
    },
  ],

  // not required
  lastUpdatedDate: "Last Updated Date",
  lastUpdatedDateOnCMIS: "Last Updated Date",
  projectHandoverDate: "Project Handover",
  projectHandoverTo: "Project Handover To",
  parallelRequirements: "Parallel Requirements",
};

const users = [
  {
    officialName: "Official Name",
    officialEmail: "Official Email",
    officialPhone: "Official Phone",
    officialDesignation: "Official Designation",
    officialDepartment: "Official Department",
    username: "username",
    password: "password",
    role: 1,
    departmentId: 1,
    status: 1,
  },
];

const department = [
  {
    departmentId: 1,
    departmentName: "Department Name",
    departmentHead: "Department Head",
    departmentEmail: "Department Email",
    numberOfProjects: 10,
    status: 1,
    // ("derivered data can be fetched at the time of query data from projects table")
  },
];

const sendData = {
  projectName: "शहरी जल निकासी परियोजना",
  projectDescription: "जल निकासी सुधार के लिए निर्माण कार्य।",
  projectObjectives: "शहर में बाढ़ की समस्या का समाधान।",
  projectDepartment: "शहरी विकास विभाग",
  projectStatus: "निर्माणाधीन",
  projectApprovalDate: "2023-02-01",
  approvedProjectCost: 1200000000.0,
  contractDate: "2023-03-15",
  contractCost: 1150000000.0,
  totalReleasedFunds: 500000000.0,
  totalExpenditure: 450000000.0,
  projectStartDate: "2023-04-01",
  originalCompletionDate: "2025-12-31",
  revisedCompletionDate: "2026-06-30",
  governmentApprovalDateAndOrder: "2023-02-10, आदेश संख्या 202/2023",
  delayReason: "साइट निरीक्षण में देरी।",
  schemeName: "अमृत योजना",
  landAvailabilityDate: "2023-03-01",
  projectManager: {
    officialName: "अजय शर्मा",
    officialEmail: "ajay.sharma@example.com",
    officialPhone: "9876543210",
    officialDesignation: "वरिष्ठ अभियंता",
    officialDepartment: "शहरी विकास विभाग",
  },
  concernedOfficial: [
    {
      officialName: "नीरज वर्मा",
      officialEmail: "neeraj.verma@example.com",
      officialPhone: "9123456789",
      officialDesignation: "अधिशासी अभियंता",
      officialDepartment: "शहरी विकास विभाग",
    },
  ],
};
