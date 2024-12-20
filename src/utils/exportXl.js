import { headers } from "./dataSet";
import { convertToIST } from "./functions";

const projectStatuses = [
  "योजना चरण",
  "प्रगति पर है",
  "विवादित",
  "विलंबित",
  "पूर्ण हुआ",
  "कोर्ट केस",
];

const ProjectTableDataKeys = [
  "id",
  "projectName",
  "projectStatus",
  "projectDepartment",
  "executingAgency",
  "scheme",
  "projectSanctionDate",
  "projectFinancialApprovalGoNumber",
  "projectFinancialApprovalDate",
  "approvedProjectCost",
  "contractDate",
  "contractCost",
  "totalReleasedFunds",
  "totalExpenditure",

  "lastMonthPhysicalProgress",
  "currentMonthPhysicalProgress",
  "actualProjectStartDate",
  "projectCompletionDate",
  "revisedProjectCompletionDate",

  "lastFundReceivedDate",
  "utilizationCertificateSubmissionDate",
  "delayReason",
  "landHandoverDate",
  "lastUpdatedDateOnCmis",

  // "totalApprovedBudget",
  // "revisedProjectCost",
  // "revisedProjectSanctionDate",
  // "estimatedCompletionDate",
  // "actualCompletionDate",
  // "workOrderFormationDate",
  // "lastUpdatedDate",

  // "landHandoverDate",

  "geoTaggedPhotosLastMonth",
  "geoTaggedPhotosCurrentMonth",
  "meetingDescription",
  "meetingCompliance",
  "meetingfeedback",
];

const detailedHeaders = [
  "क्रम संख्या",
  "परियोजना का नाम", // projectName
  "परियोजना अद्यतन स्थिति", // projectStatus
  "विभाग का नाम", // projectDepartment
  "कार्यदायी संस्था", // executingAgency
  "योजना का नाम", // scheme (19place)
  "परियोजना स्वीकृति की तिथि", // projectSanctionDate
  "परियोजना हेतु शासन द्वारा जारी वित्तीय स्वीकृति का  शासनादेश संख्या", // projectFinancialApprovalGoNumber
  "परियोजना हेतु शासन द्वारा जारी वित्तीय स्वीकृति का दिनांक", // projectFinancialApprovalDate
  "परियोजना की स्वीकृत लागत (करोड़ में) (₹)", // approvedProjectCost

  "अनुबन्ध की तिथि", // contractDate
  "अनुबंध की धनराशि (करोड़ मे)", // contractCost
  "कुल अवमुक्त धनराशि (₹)", // totalReleasedFunds
  "कुल व्यय धनराशि (₹)", // totalExpenditure

  "गत माह की भौतिक प्रगति (%)", // lastMonthPhysicalProgress
  "वर्तमान माह की भौतिक प्रगति (%)", // currentMonthPhysicalProgress

  "कार्य प्रारंभ की वास्तविक तिथि", // actualProjectStartDate
  "अनुबन्ध के अनुसार कार्य पूर्ण करने की तिथि", // projectCompletionDate

  "मूल निर्धारित तिथि तक कार्य पूर्ण न होने की स्थिति मे विभाग द्वारा निर्धारित नई लक्षित तिथि", // revisedProjectCompletionDate
  "परियोजना पर अन्तिम बार धनराशि कब प्राप्त हुई", // lastFundReceivedDate
  "उपयोग प्रमाण पत्र प्रस्तुत करने की तिथि", // utilizationCertificateSubmissionDate
  "यदि परियोजना मूल निर्धारित तिथि तक पूर्ण न  होने पर विलम्ब का कारण ", // delayReason nhi tha headers me // add in the projects
  "कार्यदायी संस्था को भूमि उपलब्ध होने की तिथि", // landAvailabilityDate (land hand over date) nhi tha header me

  // "संशोधित परियोजना लागत (₹)", // revisedProjectCost
  // "वित्तीय स्वीकृति तिथि", // projectFinancialApprovalDate
  // "संशोधित परियोजना स्वीकृति तिथि", // revisedProjectSanctionDate
  // "संशोधित पूर्णता तिथि", // revisedProjectCompletionDate
  // "प्रारंभिक पूर्णता तिथि (एजेंसी द्वारा अनुमानित)", // estimatedCompletionDate
  // "वास्तविक पूर्णता तिथि", // actualCompletionDate
  // "कार्य आदेश निर्माण की तिथि", // workOrderFormationDate
  // "भूमि हस्तांतरण की तिथि", // landHandoverDate
  // "अंतिम अद्यतन तिथि", // lastUpdatedDate
  "सीएमआईएस पर अंतिम अद्यतन तिथि", // lastUpdatedDateOnCmis

  "पिछले माह की जियोटैग फोटो", // geoTaggedPhotosLastMonth
  "वर्तमान माह की जियोटैग फोटो", // geoTaggedPhotosCurrentMonth
  "समीक्षा बैठक निर्देश", // meetingDescription
  "दिये गये निर्देश के सापेक्ष अनुपालन", // meetingCompliance
  "अभ्यूक्ति", // meetingfeedback meetingComment
];

const simplifiedTableKeys = [
  "id",
  "projectName",
  "projectStatus",
  "projectSanctionDate",
  "approvedProjectCost",
  "contractCost",
  "totalReleasedFunds",
  "totalExpenditure",
  "lastMonthPhysicalProgress",
  "currentMonthPhysicalProgress",
  "projectCompletionDate",
  "meetingfeedback",
];

const simplifiedHeaders = [
  "क्रम संख्या",
  "परियोजना का नाम", // projectName
  "परियोजना अद्यतन स्थिति", // projectStatus
  "परियोजना स्वीकृति की तिथि", // projectSanctionDate
  "परियोजना की स्वीकृत लागत (करोड़ में) (₹)", // approvedProjectCost
  "अनुबंध की धनराशि (करोड़ मे)", // contractCost
  "कुल अवमुक्त धनराशि (₹)", // totalReleasedFunds
  "कुल व्यय धनराशि (₹)", // totalExpenditurep
  "गत माह की भौतिक प्रगति (%)", // lastMonthPhysicalProgress
  "वर्तमान माह की भौतिक प्रगति (%)", // currentMonthPhysicalProgress
  "अभ्यूक्ति", // meetingfeedback meetingComment
  "अनुबन्ध के अनुसार कार्य पूर्ण करने की तिथि", // projectCompletionDate
];

const dataKeysHeaders = {
  detailed: {
    headers: detailedHeaders,
    keys: ProjectTableDataKeys,
  },

  simplified: {
    headers: simplifiedHeaders,
    keys: simplifiedTableKeys,
  },
};

const detailedData = (data) => {
  return data.map((project, projectId) => [
    projectId + 1,
    project.projectName,
    projectStatuses[parseInt(project.projectStatus) - 1],
    project.projectDepartment,
    project.executingAgency,
    project.scheme,
    convertToIST(project.projectSanctionDate),
    project.projectFinancialApprovalGoNumber,
    convertToIST(project.projectFinancialApprovalDate),
    project.approvedProjectCost,
    convertToIST(project.contractDate),
    project.contractCost,
    project.totalReleasedFunds,
    project.totalExpenditure,
    project.lastMonthPhysicalProgress,
    project.currentMonthPhysicalProgress,
    convertToIST(project.actualProjectStartDate),
    convertToIST(project.projectCompletionDate),
    convertToIST(project.revisedProjectCompletionDate),
    convertToIST(project.lastFundReceivedDate),
    convertToIST(project.utilizationCertificateSubmissionDate),
    project.delayReason,
    convertToIST(project.landHandoverDate),
    convertToIST(project.lastUpdatedDateOnCmis),
    project.geoTaggedPhotosLastMonth,
    project.geoTaggedPhotosCurrentMonth,
    project.meetingDescription,
    project.meetingCompliance,
    project.meetingfeedback,
  ]);
};

const simplifiedData = (data) => {
  return data.map((project, projectId) => [
    projectId + 1,
    project.projectName.split(" ").join(" "),
    projectStatuses[parseInt(project.projectStatus) - 1],
    convertToIST(project.projectSanctionDate),
    project.approvedProjectCost,
    project.contractCost,
    project.totalReleasedFunds,
    project.totalExpenditure,
    project.lastMonthPhysicalProgress,
    project.currentMonthPhysicalProgress,
    convertToIST(project.projectCompletionDate),
    project.meetingfeedback,
  ]);
};

const exportData = (active, data) => {
  const csvContent = [
    active === "full"
      ? dataKeysHeaders.detailed.headers
      : dataKeysHeaders.simplified.headers,
    ...(active === "full" ? detailedData(data) : simplifiedData(data)),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "projects.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};

export default exportData;
