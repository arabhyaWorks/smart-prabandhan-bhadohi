import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import classNames from "classnames";
import StepIndicator from "./StepIndicator";
import FormField from "./FormField";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { endpoint } from "../../utils/dataSet";
import { useEntities } from "../../context/EntityContect";

const yojnaCategories = [
  "Sansad Nidhi",
  "Vidhayak Nidhi",
  "Purvanchal Vikas Nidhi",
  "Others",
];

const projectStatuses = [
  "योजना चरण में",
  "प्रगति पर है",
  "रोक पर",
  "विलंबित",
  "पूर्ण हुआ",
];

const STEPS = [
  { title: "Project Info", description: "Basic details" },
  { title: "Financials", description: "Budget & costs" },
  { title: "Schedule", description: "Timeline & dates" },
];

export const convertISOToDateInput = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EditProjectForm = ({ onSubmitSuccess, projectData }) => {
  const { entities, reloadEntities, user, setUser } = useEntities();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: projectData.projectName,
    description: projectData.description,
    projectStatus: projectData.projectStatus,
    projectGoal: projectData.projectGoal,
    projectDepartment: projectData.projectDepartment,
    departmentId: projectData.departmentId,
    executingAgency: projectData.executingAgency,
    executingAgencyId: projectData.executingAgencyId,
    scheme: projectData.scheme,
    fundSanctionedBy: projectData.fundSanctionedBy,
    concernedOfficialName: projectData.concernedOfficialName,
    concernedProjectManager: projectData.concernedProjectManager,
    // projectSanctionDate: "",
    projectFinancialApprovalGoNumber:
      projectData.projectFinancialApprovalGoNumber,
    // projectFinancialApprovalDate: "",
    // actualProjectStartDate: "",
    // projectCompletionDate: "",
    // revisedProjectSanctionDate: "",
    // revisedProjectCompletionDate: "",
    // estimatedCompletionDate: "",
    // actualCompletionDate: "",
    // workOrderFormationDate: "",
    // landHandoverDate: "",
    contactInformation: projectData.contactInformation,

    totalApprovedBudget: projectData.totalApprovedBudget,
    revisedProjectCost: projectData.revisedProjectCost,

    approvedProjectCost: projectData.approvedProjectCost,
    contractCost: projectData.contractCost,

    totalReleasedFunds: projectData.totalReleasedFunds,
    totalExpenditure: projectData.totalExpenditure,

    // contractDate: "",
    delayReason: projectData.delayReason,
    meetingInstructions: projectData.meetingInstructions,

    // meetingInstructions: [],
    projectInspection: projectData.projectInspection,
    projectEssentialTest: projectData.projectEssentialTest,
    projectGallery: projectData.projectGallery,
    mileStones: projectData.mileStones,
    issues: projectData.issues,
    budgetInstallment: projectData.budgetInstallment,
  });

  const [projectSanctionDate, setProjectSanctionDate] = useState(
    convertISOToDateInput(projectData.projectSanctionDate)
  );
  const [projectFinancialApprovalDate, setProjectFinancialApprovalDate] =
    useState(convertISOToDateInput(projectData.projectFinancialApprovalDate));
  const [actualProjectStartDate, setActualProjectStartDate] = useState(
    convertISOToDateInput(projectData.actualProjectStartDate)
  );
  const [projectCompletionDate, setProjectCompletionDate] = useState(
    convertISOToDateInput(projectData.projectCompletionDate)
  );
  const [revisedProjectSanctionDate, setRevisedProjectSanctionDate] = useState(
    convertISOToDateInput(projectData.revisedProjectSanctionDate)
  );
  const [revisedProjectCompletionDate, setRevisedProjectCompletionDate] =
    useState(convertISOToDateInput(projectData.revisedProjectCompletionDate));
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState(
    convertISOToDateInput(projectData.estimatedCompletionDate)
  );
  const [actualCompletionDate, setActualCompletionDate] = useState(
    convertISOToDateInput(projectData.actualCompletionDate)
  );
  const [workOrderFormationDate, setWorkOrderFormationDate] = useState(
    convertISOToDateInput(projectData.workOrderFormationDate)
  );
  const [landHandoverDate, setLandHandoverDate] = useState(
    convertISOToDateInput(projectData.landHandoverDate)
  );
  const [contractDate, setContractDate] = useState(
    convertISOToDateInput(projectData.contractDate)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEntityChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    // console.log(name.split(","), value);
    const [entityType, id] = name.split(",");
    const index = entities.findIndex((entity) => entity.id === Number(value));
    console.log({
      [entityType]: entities[index].entity_name,
      [id]: entities[index].id,
    });

    setFormData((prev) => ({
      ...prev,
      [entityType]: entities[index].entity_name,
      [id]: entities[index].id,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormData((prev) => ({
      ...prev,
      contactInformation: 1,
    }));

    const dates = {
      projectSanctionDate,
      projectFinancialApprovalDate,
      actualProjectStartDate,
      projectCompletionDate,
      revisedProjectSanctionDate,
      revisedProjectCompletionDate,
      estimatedCompletionDate,
      actualCompletionDate,
      workOrderFormationDate,
      landHandoverDate,
      contractDate,
    };

    const inst = {
      meetingInstructions: [
        {
          description: null,
          date: null,
          compliance: null,

          feedback: formData.meetingInstructions,
        },
      ],
    };

    console.log({ ...formData, ...inst, ...dates });
  };

  const sendData = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    // const inst = {
    //   meetingInstructions: [
    //     {
    //       description: null,
    //       date: null,
    //       compliance: null,

    //       feedback: formData.meetingInstructions,
    //     },
    //   ],
    // };

    const dates = {
      projectSanctionDate,
      projectFinancialApprovalDate,
      actualProjectStartDate,
      projectCompletionDate,
      revisedProjectSanctionDate,
      revisedProjectCompletionDate,
      estimatedCompletionDate,
      actualCompletionDate,
      workOrderFormationDate,
      landHandoverDate,
      contractDate,
    };

    console.log({
      ...formData,
      // ...inst,
      ...dates,
    });
    try {
      const response = await fetch(
        `${endpoint}/api/updateWholeData/${projectData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            //  ...inst,
            ...dates,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      if (result.success) {
        alert("Project data updated successfully");
        onSubmitSuccess?.();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderProjectInformation = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <h1>{user?.entityId}</h1> */}
        <FormField
          label="Project Department"
          name="projectDepartment,departmentId"
          type="select"
          value={formData.departmentId} // Use the ID to match the selected option
          onChange={handleEntityChange}
          options={entities
            ?.filter((entity) => entity.id == user?.entityId)
            .map((entity) => ({
              value: entity.id, // The value should match `departmentId`
              label: entity.entity_name,
            }))}
          required
        />
        <FormField
          label="Executing Agency"
          name="executingAgency,executingAgencyId"
          type="select"
          value={formData.executingAgencyId} // Bind to executingAgencyId
          onChange={handleEntityChange}
          options={entities
            ?.filter((entity) => entity.entity_type === 2)
            .map((entity) => ({
              value: entity.id, // ID as the option value
              label: entity.entity_name, // Display name as the option label
            }))}
          required
        />
      </div>

      <FormField
        label="Yojna Name"
        name="scheme"
        type="select"
        value={formData.scheme}
        onChange={(e) => {
          setFormData((prev) => ({
            ...prev,
            scheme: e.target.value,
          }));
        }}
        options={yojnaCategories.map((category, index) => ({
          value: category,
          label: category,
        }))}
        required
      />

      <FormField
        label="Project Name"
        name="projectName"
        type="text"
        value={formData.projectName}
        onChange={handleInputChange}
        placeholder="Enter project name"
        required
      />

      <FormField
        label="Description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Enter project description"
      />

      <FormField
        label="Goal & Objectives"
        name="projectGoal"
        type="text"
        value={formData.projectGoal}
        onChange={handleInputChange}
        placeholder="Enter project goals & objectives"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Fund Sanctioned By"
          name="fundSanctionedBy"
          type="select"
          value={formData.fundSanctionedBy} // Bind to fundSanctionedBy
          onChange={(e) => {
            console.log(e.target.value);
            setFormData((prev) => ({
              ...prev,
              fundSanctionedBy: e.target.value, // Update fundSanctionedBy
            }));
          }}
          options={[
            {
              value: "State Government",
              label: "State Government",
            },
            {
              value: "Central Government",
              label: "Central Government",
            },
            {
              value: "Both Central & State Government",
              label: "Both Central & State Government",
            },
          ]}
          required
        />
        <FormField
          label="Project Status"
          name="projectStatus"
          type="select"
          value={formData.projectStatus}
          onChange={(e) => {
            console.log(e.target.value);
            setFormData((prev) => ({
              ...prev,
              projectStatus: e.target.value,
            }));
          }}
          options={
            projectStatuses.map((status, index) => ({
              value: index + 1,
              label: status,
            })) || []
          }
          required
        />
      </div>

      <FormField
        label="Concerned Official Name, Designation & Contact for project department"
        name="concernedOfficialName"
        type="text"
        value={formData.concernedOfficialName}
        onChange={handleInputChange}
        placeholder="Enter official name"
      />

      <FormField
        label="Concerned Project Manager Name & Contact of executing agency"
        name="concernedProjectManager"
        type="text"
        value={formData.concernedProjectManager}
        onChange={handleInputChange}
        placeholder="Enter project manager name"
      />

      {/* <FormField
        label=" Project Contact Information "
        name="contactInformation"
        type="text"
        value={formData.contactInformation}
        onChange={handleInputChange}
        placeholder="Enter contact information"
      /> */}
    </div>
  );

  const renderFinancialInformation = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
      <FormField
        label="परियोजना की स्वीकृत लागत (Approved Project Cost)"
        name="approvedProjectCost"
        type="text"
        value={formData.approvedProjectCost}
        onChange={handleInputChange}
        placeholder="Enter amount"
        required
      />
      <FormField
        label="अनुबन्ध के अनुसर परियोजना की धनराशि (Contract Cost)"
        name="contractCost"
        type="text"
        value={formData.contractCost}
        onChange={handleInputChange}
        placeholder="Enter amount"
        required
      />

      <FormField
        label="कुल अवमुक्त धनराशि (Total Released Funds)"
        name="totalReleasedFunds"
        type="text"
        value={formData.totalReleasedFunds}
        onChange={handleInputChange}
        placeholder="Enter amount"
      />
      <FormField
        label="कुल व्यय धनराशि (Total Expenditure)"
        name="totalExpenditure"
        type="text"
        value={formData.totalExpenditure}
        onChange={handleInputChange}
        placeholder="Enter amount"
      />
      {/* <FormField
        label="Cost of the project as per revised acceptance in(Lac)"
        name="revisedProjectCost"
        type="number"
        value={formData.revisedProjectCost}
        onChange={handleInputChange}
        placeholder="Enter amount"
      /> */}
      {/* </div> */}

      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Total Released Funds (in Lac)"
          name="financialProgress"
          type="text"
          value={formData.financialProgress}
          onChange={handleInputChange}
          placeholder="Enter progress"
          //required
        />
        <FormField
          label="Total Expenditure "
          name="revisedCost"
          type="number"
          value={formData.revisedCost}
          onChange={handleInputChange}
          placeholder="Enter revised cost"
          //required
        />
      </div> */}
    </div>
  );

  const renderScheduleInformation = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="परियोजना स्वीकृति की तिथि (Project Sanction Date)"
          name="projectSanctionDate"
          type="date"
          value={projectSanctionDate}
          onChange={setProjectSanctionDate}
          placeholder="Select date"
          required
        />
        <FormField
          label="परियोजना हेतु शासन द्वारा जारी वित्तीय स्वीकृति का दिनांक (Project Financial Approval Date)"
          name="projectFinancialApprovalDate"
          type="date"
          value={projectFinancialApprovalDate}
          onChange={setProjectFinancialApprovalDate}
          placeholder="Select date"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="परियोजना हेतु शासन द्वारा जारी वित्तीय स्वीकृति का शासनादेश संख्या (Project Financial Approval GO Ref No.)"
          name="projectFinancialApprovalGoNumber"
          type="text"
          value={formData.projectFinancialApprovalGoNumber}
          onChange={handleInputChange}
          placeholder="Enter GO number"
        />
        <FormField
          label="अनुबन्ध की तिथि (Contract Date)"
          name="contractDate"
          type="date"
          // value={formData.contractDate}
          // onChange={(date) => handleDateChange(date, "contractDate")}
          value={contractDate}
          onChange={setContractDate}
          placeholder="Select date"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="कार्य प्रारंभ की वास्तविक तिथि (Actual Project Start Date)"
          name="actualProjectStartDate"
          type="date"
          // value={formData.actualProjectStartDate}
          // onChange={(date) => handleDateChange(date, "actualProjectStartDate")}
          value={actualProjectStartDate}
          onChange={setActualProjectStartDate}
          placeholder="Select date"
        />
        <FormField
          label="अनुबन्ध के अनुसार कार्य पूर्ण करने की तिथि (Project Completion Date as per work order)"
          name="projectCompletionDate"
          type="date"
          // value={formData.projectCompletionDate}
          // onChange={(date) => handleDateChange(date, "projectCompletionDate")}
          value={projectCompletionDate}
          onChange={setProjectCompletionDate}
          placeholder="Select date"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Revised Project Sanction Date"
          name="revisedProjectSanctionDate"
          type="date"
          // value={formData.revisedProjectSanctionDate}
          // onChange={(date) =>
          //   handleDateChange(date, "revisedProjectSanctionDate")
          // }
          value={revisedProjectSanctionDate}
          onChange={setRevisedProjectSanctionDate}
          placeholder="Select date"
        />
        <FormField
          label="मूल निर्धारित तिथि तक कार्य पूर्ण न होने की स्थिति मे विभाग द्वारा निर्धारित नई लक्षित तिथि (Revised Project Completion Date)"
          name="revisedProjectCompletionDate"
          type="date"
          // value={formData.revisedProjectCompletionDate}
          // onChange={(date) =>
          //   handleDateChange(date, "revisedProjectCompletionDate")
          // }
          value={revisedProjectCompletionDate}
          onChange={setRevisedProjectCompletionDate}
          placeholder="Select date"
          // required
        />

        {/* Confusion with revised project completion date */}
        {/* <FormField
          label="Estimated date of completion of work as per executing agency in case of project delay"
          name="estimatedCompletionDate"
          type="date"
          // value={formData.estimatedCompletionDate}
          // onChange={(date) => handleDateChange(date, "estimatedCompletionDate")}
          value={estimatedCompletionDate}
          onChange={setEstimatedCompletionDate}
          placeholder="Select date"
          required
        /> */}

        {/* <FormField
          label="यदि परियोजना मूल निर्धारित तिथि तक पूर्ण न  होने पर विलम्ब का कारण` (Reason for delay in case project not completed by original scheduled date)"
          name="delayReason"
          type="text"
          value={formData.delayReason}
          onChange={handleInputChange}
          placeholder="Enter Delay Reason"
        /> */}

        {/* <FormField
          label="Meeting instructions given in the meeting"
          name="meetingInstructions"
          type="text"
          value={formData.meetingInstructions}
          onChange={handleInputChange}
          placeholder="Enter the instructions given in the meeting"
        /> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Actual Completion Date "
          name="actualCompletionDate"
          type="date"
          // value={formData.actualCompletionDate}
          // onChange={(date) => handleDateChange(date, "actualCompletionDate")}
          value={actualCompletionDate}
          onChange={setActualCompletionDate}
          placeholder="Select date"
          // required
        />
        <FormField
          label="Work Order Formation Date"
          name="workOrderFormationDate"
          type="date"
          // value={formData.workOrderFormationDate}
          // onChange={(date) => handleDateChange(date, "workOrderFormationDate")}
          value={workOrderFormationDate}
          onChange={setWorkOrderFormationDate}
          placeholder="Select date"
          // required
        />
      </div>

      <FormField
        label="कार्यदायी संस्था को भूमि उपलब्ध होने की तिथि (Date of Land Handover to Executing Agency)"
        name="landHandoverDate"
        type="date"
        // value={formData.landHandoverDate}
        // onChange={(date) => handleDateChange(date, "landHandoverDate")}
        value={landHandoverDate}
        onChange={setLandHandoverDate}
        placeholder="Select date"
        // required
      />
    </div>
  );

  const handleAddEntry = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], {}],
    }));
  };

  const handleEntryChange = (field, index, key, value) => {
    const updatedEntries = formData[field].map((entry, i) =>
      i === index ? { ...entry, [key]: value } : entry
    );
    setFormData((prev) => ({
      ...prev,
      [field]: updatedEntries,
    }));
  };

  const handleRemoveEntry = (field, index) => {
    const updatedEntries = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: updatedEntries,
    }));
  };

  const renderDynamicSection = (field, fieldsConfig) => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">{field.replace(/([A-Z])/g, " $1")}</h3>
      {formData[field].map((entry, index) => (
        <div key={index} className="border p-4 rounded-md space-y-2">
          {fieldsConfig.map(({ label, name, type }) => (
            <div key={name}>
              {type === "date" ? (
                <input
                  // type="date"
                  value={entry[name] || ""}
                  onChange={(e) =>
                    handleEntryChange(field, index, name, e.target.value)
                  }
                  placeholder={`Select ${label}`}
                  className="w-full border p-2 rounded"
                />
              ) : (
                <input
                  type={type}
                  value={entry[name] || ""}
                  onChange={(e) =>
                    handleEntryChange(field, index, name, e.target.value)
                  }
                  placeholder={`Enter ${label}`}
                  className="w-full border p-2 rounded"
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleRemoveEntry(field, index)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAddEntry(field)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Entry
      </button>
    </div>
  );

  const formatToDDMMYY = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return ""; // Handle invalid dates
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year
    return `${day}-${month}-${year}`;
  };

  const formatToInputDate = (ddmmyy) => {
    const [day, month, year] = ddmmyy.split("-");
    if (!day || !month || !year) return ""; // Handle invalid formats
    return `20${year}-${month}-${day}`; // Reformat to yyyy-MM-dd for input
  };

  const renderDynamicSections = () => (
    <div className="space-y-6">
      {/* Project Inspection Section */}
      {renderDynamicSection("projectInspection", [
        { label: "Inspection Date", name: "inspectionDate", type: "date" },
        { label: "Official Name", name: "officialName", type: "text" },
        { label: "Official Email", name: "officialEmail", type: "text" },
        { label: "Official Phone", name: "officialPhone", type: "text" },
        {
          label: "Official Designation",
          name: "officialDesignation",
          type: "text",
        },
        {
          label: "Official Department",
          name: "officialDepartment",
          type: "text",
        },
        { label: "Inspection Type", name: "inspectionType", type: "text" },
        {
          label: "Inspection Instruction",
          name: "inspectionInstruction",
          type: "text",
        },
        { label: "Inspection Status", name: "inspectionStatus", type: "text" },
        { label: "Inspection Report", name: "inspectionReport", type: "text" },
      ])}

      {/* Project Essential Test Section */}
      {renderDynamicSection("projectEssentialTest", [
        { label: "Test Name", name: "testName", type: "text" },
        {
          label: "Sample Collection Date",
          name: "dateOfSampleCollection",
          type: "date",
        },
        {
          label: "Sampling Authority",
          name: "samplingAuthority",
          type: "text",
        },
        {
          label: "Sample Test Lab Name",
          name: "sampleTestLabName",
          type: "text",
        },
        { label: "Sample Test Report", name: "sampleTestReport", type: "text" },
        {
          label: "Sample Collection Site Images",
          name: "sampleCollectionSiteImages",
          type: "text",
        },
      ])}

      {/* Project Gallery Section */}
      {renderDynamicSection("projectGallery", [
        { label: "Image", name: "image", type: "text" },
        { label: "Image Description", name: "imageDescription", type: "text" },
        { label: "Latitude", name: "latitude", type: "number" },
        { label: "Longitude", name: "longitude", type: "number" },
        { label: "Elevation", name: "elevation", type: "number" },
        { label: "Accuracy", name: "accuracy", type: "number" },
        { label: "Time", name: "time", type: "date" },
      ])}

      {/* Milestones Section */}
      {renderDynamicSection("mileStones", [
        { label: "Milestone Name", name: "milestoneName", type: "text" },
        {
          label: "Milestone From Date",
          name: "milestoneFromDate",
          type: "date",
        },
        {
          label: "Milestone Completion Date",
          name: "milestoneCompletionDate",
          type: "date",
        },
        {
          label: "Milestone Actual Completion Date",
          name: "milestoneActualCompletionDate",
          type: "date",
        },
        { label: "Milestone Status", name: "milestoneStatus", type: "text" },
        {
          label: "Milestone Description",
          name: "milestoneDescription",
          type: "text",
        },
        {
          label: "Milestone Progress",
          name: "milestoneProgress",
          type: "text",
        },
      ])}

      {/* Issues Section */}
      {renderDynamicSection("issues", [
        { label: "Issue Name", name: "issueName", type: "text" },
        { label: "Issue Description", name: "issueDescription", type: "text" },
        { label: "Issue Raised By", name: "issueRaisedBy", type: "text" },
        { label: "Issue Raised Date", name: "issueRaisedDate", type: "date" },
        { label: "Assigned To", name: "assignedTo", type: "text" },
        { label: "Issue Reported On", name: "issueReportedOn", type: "date" },
        { label: "Issue Status", name: "issueStatus", type: "text" },
        { label: "Issue Closed Date", name: "issueClosedDate", type: "date" },
        { label: "Issue Closed By", name: "issueClosedBy", type: "text" },
      ])}

      {/* Budget Installment Section */}
      {renderDynamicSection("budgetInstallment", [
        {
          label: "Installment Amount",
          name: "installmentAmount",
          type: "number",
        },
        {
          label: "Installment Expenditure",
          name: "installmentExpenditure",
          type: "number",
        },
        {
          label: "Amount Received Date",
          name: "amountReceivedDate",
          type: "date",
        },
        {
          label: "Utilization Certificate",
          name: "utilizationCertificate",
          type: "text",
        },
      ])}
    </div>
  );

  return (
    <form className="space-y-8">
      <StepIndicator currentStep={currentStep} steps={STEPS} />

      <div className="mb-8">
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Project Information
            </h2>
            {renderProjectInformation()}
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Financial Information
            </h2>
            {renderFinancialInformation()}
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Schedule Information
            </h2>
            {renderScheduleInformation()}
          </div>
        )}
        {/* {currentStep === 4 && (
          <div className="space-y-6">{renderDynamicSections()}</div>
        )} */}
      </div>

      <div className="flex justify-between pt-6 border-t">
        <button
          type="button"
          onClick={prevStep}
          className={classNames(
            "flex items-center px-6 py-3 rounded-lg transition-all duration-200",
            currentStep === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-white bg-orange-600 hover:bg-orange-700 shadow-md hover:shadow-lg"
          )}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </button>

        {currentStep < 3 && (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        )}

        {currentStep === 3 && (
          <button
            className={classNames(
              "flex items-center px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-white",
              isSubmitting
                ? "bg-green-500 cursor-wait"
                : "bg-green-600 hover:bg-green-700"
            )}
            onClick={sendData}
          >
            <Save className="w-5 h-5 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Project"}
          </button>
        )}
      </div>
    </form>
  );
};

export default EditProjectForm;