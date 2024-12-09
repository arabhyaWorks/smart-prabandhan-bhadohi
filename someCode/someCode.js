const projectData = {
  id: 1,
  projectName: "स्मार्ट सिटी परियोजना",
  projectDescription: "स्मार्ट सिटी के लिए बुनियादी ढांचे का विकास",
  projectDepartment: "शहरी विकास विभाग",
  projectStatus: "कार्य प्रगति पर",
  projectApprovalDate: "2023-05-14T18:30:00.000Z",
  approvedProjectCost: "1000000000.00",
  contractDate: "2023-06-19T18:30:00.000Z",
  contractCost: "950000000.00",
  totalReleasedFunds: "500000000.00",
  totalExpenditure: "450000000.00",
  projectStartDate: "2023-06-30T18:30:00.000Z",
  originalCompletionDate: "2025-12-30T18:30:00.000Z",
  revisedCompletionDate: "2026-06-29T18:30:00.000Z",
  lastFundReceivedDate: "2023-06-30T18:30:00.000Z",
  lastMonthPhysicalProgress: "40.00",
  geoTaggedPhotosLastMonth: "gallery_image1.jpg",
};

console.log(projectData.length);

const tableHeaders = [
  "क्रम संख्या",
  "परियोजना का नाम",
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
];

const tableKeys = [

];

// All the data of the project
const projects = {
  projectName: "Project Name",
  projectDescription: "Project Description",
  projectDepartment: "Project Department",
  projectStatus: "Project Status",
  projectApprovalDate: "15-05-2023",
  approvedProjectCost: "₹100 करोड़",
  contractDate: "20-06-2023",
  contractCost: "₹95 करोड़",
  totalReleasedFunds: "₹50 करोड़",
  totalExpenditure: "₹45 करोड़",
  lastMonthPhysicalProgress: "40%",
  currentMonthPhysicalProgress: "50%",
  projectStartDate: "01-07-2023",
  originalCompletionDate: "31-12-2025",
  revisedCompletionDate: "30-06-2026",
  lastFundReceivedDate: "01-12-2023",
  utilizationCertificateSubmissionDate: "15-12-2023",
  governmentApprovalDateAndOrder: "20-05-2023, आदेश संख्या 101/2023",
  delayReason: "भूमि अधिग्रहण में देरी",
  schemeName: "औद्योगिक क्षेत्र विकास योजना",
  landAvailabilityDate: "15-06-2023",
  geoTaggedPhotosLastMonth: "फोटो लिंक 1",
  geoTaggedPhotosCurrentMonth: "फोटो लिंक 2",
  meetingInstructions: "निर्देश 1",
  complianceOfMeetingInstructions: "अनुपालन 1",
  feedback: "प्रतिक्रिया 1",

  //   meetingInstructions: [
  //     {
  //       desc: "निर्देश 1",
  //       date: "01-01-2023",
  //       compliance: "अनुपालन 1",
  //     },
  //   ],

  //   projectManager: {
  //     officialName: "Official Name",
  //     officialEmail: "Official Email",
  //     officialPhone: "Official Phone",
  //     officialDesignation: "Official Designation",
  //     officialDepartment: "Official Department",
  //   },
  //   concernedOfficial: [
  //     {
  //       officialName: "Official Name",
  //       officialEmail: "Official Email",
  //       officialPhone: "Official Phone",
  //       officialDesignation: "Official Designation",
  //       officialDepartment: "Official Department",
  //     },
  //   ],
  //   projectInspection: [
  //     {
  //       inspectionDate: "Inspection Date",
  //       inspectionAuthority: [
  //         {
  //           officialName: "Official Name",
  //           officialEmail: "Official Email",
  //           officialPhone: "Official Phone",
  //           officialDesignation: "Official Designation",
  //           officialDepartment: "Official Department",
  //         },
  //       ],
  //       InspectionType: "Inspection Type",
  //       inspectionInstruction: "Inspection Instruction",
  //       inspectionStatus: "Inspection Status",
  //       inspectionReport: "inspectionReport.pdf",
  //     },
  //   ],
  //   projectEssentialTest: [
  //     {
  //       testName: "Test Name",
  //       dateOfSampleCollection: "Date Of Sample Collection",
  //       samplingAuthority: "Sampling Authority",
  //       sampleTestLabName: "Sample Test Lab Name",
  //       sampleTestReport: "sampleTestReport.pdf",
  //       sampleCollectionSiteImage: [
  //         "sampleCollectionSiteImage1.jpg",
  //         "sampleCollectionSiteImage2.jpg",
  //       ],
  //     },
  //   ],
  //   projectGallery: [
  //     {
  //       image: "image1.jpg",
  //       imageDescription: "Image Description",
  //       lattitude: "Lattitude",
  //       longitude: "Longitude",
  //       elevation: "Elevation",
  //       accuracy: "Accuracy",
  //       time: "Time",
  //     },
  //   ],
  //   mileStones: [
  //     {
  //       milestoneName: "Milestone Name",
  //       milestoneFromDate: "Milestone From Date",
  //       milestoneCompletionDate: "Milestone Completion Date",
  //       milestoneActualCompletionDate: "Milestone Actual Completion Date",
  //       milestoneStatus: "Milestone Status",
  //       milestoneDescription: "Milestone Description",
  //       milestoneProgress: "Milestone Progress",
  //     },
  //   ],
  //   issues: [
  //     {
  //       issueName: "Issue Name",
  //       issueDescription: "Issue Description",
  //       issueRaisedBy: "Issue Raised By",
  //       issueRaisedDate: "Issue Raised Date",
  //       assignedTo: "Assigned To",
  //       issueReportedOn: "Issue Reported On",
  //       issueStatus: "Issue Status",
  //       issueClosedDate: "Issue Closed Date",
  //       issueClosedBy: "Issue Closed By",
  //     },
  //   ],
  //   budegetInstallment: [
  //     {
  //       installmentAmount: "Installment Amount",
  //       amountRecievedDate: "Amount Recieved Date",
  //       utilizationCertificate: "uc.pdf",
  //     },
  //   ],

  //projectDetails
  lastUpdatedDate: "Last Updated Date",
  lastUpdatedDateOnCMIS: "Last Updated Date",
  projectHandoverDate: "Project Handover",
  projectHandoverTo: "Project Handover To",
  parallelRequirements: "Parallel Requirements",
};

console.log(Object.values(projectData).length);
console.log(Object.values(projects).length);
