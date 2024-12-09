const data = {
  projectName: "THis is project name",
  projectDescription: "this is project description",
  projectDepartment: "nagar_nigam",
  projectApprovalDate: "2024-12-12T18:30:00.000Z",
  approvedProjectCost: 10000,
  contractCost: 0,
  totalReleasedFunds: 100000,
  totalExpenditure: 0,
  projectStartDate: "2024-12-10T18:30:00.000Z",
  governmentApprovalDateAndOrder: "Provide Default/Static Data Here",
  delayReason: "None",
  schemeName: "finance_commission",
  projectManager: {
    officialName: "Static Project Manager Name",
    officialEmail: "manager@example.com",
    officialPhone: "9876543210",
    officialDesignation: "Senior Engineer",
    officialDepartment: "nagar_nigam",
  },
  concernedOfficial: [
    {
      officialName: "Static Concerned Official Name",
      officialEmail: "official@example.com",
      officialPhone: "9123456789",
      officialDesignation: "Executive Engineer",
      officialDepartment: "nagar_nigam",
    },
  ],
};

const projects = {
  id: "1",
  projectName: "Project Name",
  projectDescription: "Project Description",
  // Goals & Objectives
  projectObjectives: "Project Objectives",
  projectDepartment: "Project Department",
  projectStatus: "Project Status",

  // project prorgess
  projectProgress: "Project Progress",

  projectApprovalDate: "15-05-2023",
  approvedProjectCost: "₹100 करोड़",

  contractDate: "20-06-2023",
  contractCost: "₹95 करोड़",


  // totalReleasedFunds: "₹50 करोड़",
  // totalExpenditure: "₹45 करोड़",

  // fetch the physical progress from milestone table based on months
  // lastMonthPhysicalProgress: "40%",
  // currentMonthPhysicalProgress: "50%",
  //  delayReason,

  // totalReleasedFunds: "₹50 करोड़",
  // totalExpenditure: "₹45 करोड़",

  //
  // fetch the physical progress from milestone table based on months
  // lastMonthPhysicalProgress: "40%",
  // currentMonthPhysicalProgress: "50%",

  projectStartDate: "01-07-2023",
  originalCompletionDate: "31-12-2025",
  revisedCompletionDate: "30-06-2026",
  // fetch the last fund received date from budget table

  // lastFundReceivedDate: "01-12-2023",
  // utilizationCertificateSubmissionDate: "15-12-2023",
  governmentApprovalDateAndOrder: "20-05-2023, आदेश संख्या 101/2023",
  delayReason: "भूमि अधिग्रहण में देरी",
  schemeName: "औद्योगिक क्षेत्र विकास योजना",
  landAvailabilityDate: "15-06-2023",

  // geoTaggedPhotosLastMonth: "फोटो लिंक 1",
  // geoTaggedPhotosCurrentMonth: "फोटो लिंक 2",
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

export const headers = {
  hi: [
    "क्रम संख्या",
    "Serial Number",

    "परियोजना का नाम",
    "Project Name",

    "परियोजना अद्यतन स्थिति",
    "विभाग का नाम",
    "परियोजना स्वीकृति की तिथि",
    "स्वीकृत लागत (करोड़ में)",
    "अनुबन्ध की तिथि",
    "अनुबन्ध की धनराशि (करोड़ में)",
    "अवमुक्त धनराशि (करोड़ में)",
    "व्यय धनराशि (करोड़ में)",
    "भौतिक प्रगति प्रतिशत (गत माह में)",
    "भौतिक प्रगति प्रतिशत (वर्तमान माह में)",
    "कार्य प्रारम्भ की तिथि",
    "कार्य पूर्ण करने की मूल निर्धारित तिथि",
    "मूल निर्धारित तिथि तक कार्य पूर्ण न होने की स्थिति में विभाग द्वारा निर्धारित नई लक्षित तिथि",
    "परियोजना पर अन्तिम बार धनराशि कब प्राप्त हुई",
    "कालम 15 के सापेक्ष सम्बन्धित विभाग को उपभोग प्रमाण पत्र प्रेषित करने की तिथि",
    "परियोजना हेतु शासन द्वारा जारी वित्तीय स्वीकृति का दिनांक एवं शासनादेश संख्या",
    "यदि परियोजना मूल निर्धारित तिथि (कालम-13) तक पूर्ण न होने पर विलम्ब का कारण",
    "परियोजना किसी योजनान्तर्गत संचालित है",
    "कार्यदायी संस्था को भूमि उपलब्ध होने की तिथि",
    "कार्य की जियोटैग फोटोग्राफ्स (गत माह की)",
    "कार्य की जियोटैग फोटोग्राफ्स (अद्यतन माह की)",
    "समीक्षा बैठक में दिये गये निर्देश",
    "दिये गये निर्देश के सापेक्ष अनुपालन",
    "अभ्यूक्ति",
  ],
  en: [
    "Serial Number",
    "Project Name",
    "Project Update Status",
    "Executing Agency",
    "Date of Project Approval and Government Order Number",
    "Date and Government Order Number of Financial Approval Issued by Government for the Project",
    "Approved Cost of the Project",
    "Date of Project Completion as per Contract Formation",
    "Total Amount Released for the Project So Far",
    "Total Expenditure on the Project So Far",
    "Milestone Progress %",
    "Physical Progress %",
    "Estimated Date of Completion According to Executing Agency",
    "Reasons for Delay in the Project",
    "Date of Revised Approval",
    "Cost of the Project as per Revised Approval",
    "Date of Project Completion as per Revised Approval",
    "Department Name",
    "Project Category/Scheme Name",
    "Date of Contract Formation",
    "Date of Land Availability to Executing Agency",
    "Project Update Log",
    "Project Gallery",
    "Meeting Instructions",
    "Meeting Instructions Compliance",
  ],
};


export const headers = [
  "क्रम संख्या",
  "Serial Number",

  "परियोजना का नाम",
  "Project Name",

  "परियोजना अद्यतन स्थिति",
  "Project Update Status",

  "विभाग का नाम",
  "Department Name",

  "परियोजना स्वीकृति की तिथि",
  "Date of Project Approval",


  // Financials 

  "स्वीकृत लागत (करोड़ में)",
  "Approved Cost (in Crores)",
  
  "अनुबन्ध की धनराशि (करोड़ में)",
  "Contract Cost (in Crores)",
  
  "अनुबन्ध की तिथि",
  "Date of Contract Formation",


  "अवमुक्त धनराशि (करोड़ में)",
  "Total Released Funds (in Crores)",

  "व्यय धनराशि (करोड़ में)",
  "Total Expenditure (in Crores)",

  "भौतिक प्रगति प्रतिशत (गत माह में)",
  "Physical Progress Percentage (Last Month)",

  "भौतिक प्रगति प्रतिशत (वर्तमान माह में)",
  "Physical Progress Percentage (Current Month)",

  "कार्य प्रारम्भ की तिथि",
  "Start Date of Work",

  "कार्य पूर्ण करने की मूल निर्धारित तिथि",
  "Original Target Completion Date",

  "मूल निर्धारित तिथि तक कार्य पूर्ण न होने की स्थिति में विभाग द्वारा निर्धारित नई लक्षित तिथि",
  "Revised Target Completion Date (if delayed)",

  "परियोजना पर अन्तिम बार धनराशि कब प्राप्त हुई",
  "Date of Last Fund Release",

  "कालम 15 के सापेक्ष सम्बन्धित विभाग को उपभोग प्रमाण पत्र प्रेषित करने की तिथि",
  "Date of Submission of Utilization Certificate",

  "परियोजना हेतु शासन द्वारा जारी वित्तीय स्वीकृति का दिनांक एवं शासनादेश संख्या",
  "Date and Government Order Number of Financial Approval",

  "यदि परियोजना मूल निर्धारित तिथि (कालम-13) तक पूर्ण न होने पर विलम्ब का कारण",
  "Reasons for Delay",

  "परियोजना किसी योजनान्तर्गत संचालित है",
  "Project Scheme/Category",

  "कार्यदायी संस्था को भूमि उपलब्ध होने की तिथि",
  "Date of Land Availability to Executing Agency",

  "कार्य की जियोटैग फोटोग्राफ्स (गत माह की)",
  "Geo-tagged Photos of Work (Last Month)",

  "कार्य की जियोटैग फोटोग्राफ्स (अद्यतन माह की)",
  "Geo-tagged Photos of Work (Current Month)",

  "समीक्षा बैठक में दिये गये निर्देश",
  "Instructions Given in Review Meeting",

  "दिये गये निर्देश के सापेक्ष अनुपालन",
  "Compliance with Instructions",

  "अभ्यूक्ति",
  "Remarks"
];