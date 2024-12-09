import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import classNames from "classnames";
import StepIndicator from "./StepIndicator";
import FormField from "./FormField";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../utils/functions";
import axios from "axios";
import { endpoint } from "../../utils/dataSet";
import { useEntities } from "../../context/EntityContect";
import { set } from "date-fns";

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

const ProjectForm = ({ onSubmitSuccess }) => {
  const { entities, reloadEntities } = useEntities();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    projectStatus: "",
    projectGoal: "",
    projectDepartment: "",
    departmentId: "",
    executingAgency: "",
    executingAgencyId: "",
    scheme: "",
    fundSanctionedBy: "",
    concernedOfficialName: "",
    concernedProjectManager: "",
    projectSanctionDate: "",
    projectFinancialApprovalGoNumber: "",
    projectFinancialApprovalDate: "",
    actualProjectStartDate: "",
    projectCompletionDate: "",
    revisedProjectSanctionDate: "",
    revisedProjectCompletionDate: "",
    estimatedCompletionDate: "",
    actualCompletionDate: "",
    workOrderFormationDate: "",
    landHandoverDate: "",
    contactInformation: 1,

    totalApprovedBudget: "",
    revisedProjectCost: "",

    approvedProjectCost: "",
    contractCost: "",

    totalReleasedFunds: "",
    totalExpenditure: "",

    contractDate: "",
    delayReason: "",
    meetingInstructions: "",
  });
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

  console.log;
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

  const handleDateChange = (date: Date | null, field: keyof FormData) => {
    setFormData((prev) => ({ ...prev, [field]: formatDate(date) }));
    console.log(formatDate(date));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormData((prev) => ({
      ...prev,

      contactInformation: 1,
    }));

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

    console.log({ ...formData, ...inst });
    

    try {
      const response = await fetch(
        `${endpoint}/api/uploadWholeData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, ...inst }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
      onSubmitSuccess?.();
      // Handle success (e.g., show success message, redirect, etc.)
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderProjectInformation = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Project Department"
          name="projectDepartment,departmentId"
          type="select"
          value={formData.departmentId} // Use the ID to match the selected option
          onChange={handleEntityChange}
          options={entities
            ?.filter((entity) => entity.entity_type === 1)
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
        type="textarea"
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

      <FormField
        label=" Project Contact Information "
        name="contactInformation"
        type="text"
        value={formData.contactInformation}
        onChange={handleInputChange}
        placeholder="Enter contact information"
      />
    </div>
  );

  const renderFinancialInformation = () => (
    <div className="space-y-6 animate-fadeIn">
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
      <FormField
        label="परियोजना की स्वीकृत लागत (Approved Project Cost)"
        name="approvedProjectCost"
        type="number"
        value={formData.approvedProjectCost}
        onChange={handleInputChange}
        placeholder="Enter amount"
      />
      <FormField
        label="अनुबन्ध के अनुसर परियोजना की धनराशि (Contract Cost)"
        name="contractCost"
        type="number"
        value={formData.contractCost}
        onChange={handleInputChange}
        placeholder="Enter amount"
      />

      <FormField
        label="कुल अवमुक्त धनराशि (Total Released Funds)"
        name="totalReleasedFunds"
        type="number"
        value={formData.totalReleasedFunds}
        onChange={handleInputChange}
        placeholder="Enter amount"
      />
      <FormField
        label="कुल व्यय धनराशि (Total Expenditure)"
        name="totalExpenditure"
        type="number"
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
          required
        />
        <FormField
          label="Total Expenditure "
          name="revisedCost"
          type="number"
          value={formData.revisedCost}
          onChange={handleInputChange}
          placeholder="Enter revised cost"
          required
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
          value={formData.projectSanctionDate}
          onChange={(date) => handleDateChange(date, "projectSanctionDate")}
          placeholder="Select date"
        />
        <FormField
          label="परियोजना हेतु शासन द्वारा जारी वित्तीय स्वीकृति का दिनांक (Project Financial Approval Date)"
          name="projectFinancialApprovalDate"
          type="date"
          value={formData.projectFinancialApprovalDate}
          onChange={(date) =>
            handleDateChange(date, "projectFinancialApprovalDate")
          }
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
          value={formData.contractDate}
          onChange={(date) => handleDateChange(date, "contractDate")}
          placeholder="Select date"
        />
        <FormField
          label="कार्य प्रारंभ की वास्तविक तिथि (Actual Project Start Date)"
          name="actualProjectStartDate"
          type="date"
          value={formData.actualProjectStartDate}
          onChange={(date) => handleDateChange(date, "actualProjectStartDate")}
          placeholder="Select date"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="अनुबन्ध के अनुसार कार्य पूर्ण करने की तिथि (Project Completion Date as per work order)"
          name="projectCompletionDate"
          type="date"
          value={formData.projectCompletionDate}
          onChange={(date) => handleDateChange(date, "projectCompletionDate")}
          placeholder="Select date"
        />
        <FormField
          label="Revised Project Sanction Date"
          name="revisedProjectSanctionDate"
          type="date"
          value={formData.revisedProjectSanctionDate}
          onChange={(date) =>
            handleDateChange(date, "revisedProjectSanctionDate")
          }
          placeholder="Select date"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="मूल निर्धारित तिथि तक कार्य पूर्ण न होने की स्थिति मे विभाग द्वारा निर्धारित नई लक्षित तिथि (Revised Project Completion Date)"
          name="revisedProjectCompletionDate"
          type="date"
          value={formData.revisedProjectCompletionDate}
          onChange={(date) =>
            handleDateChange(date, "revisedProjectCompletionDate")
          }
          placeholder="Select date"
          required
        />

        {/* Confusion with revised project completion date */}
        {/* <FormField
          label="Estimated date of completion of work as per executing agency in case of project delay"
          name="estimatedCompletionDate"
          type="date"
          value={formData.estimatedCompletionDate}
          onChange={(date) => handleDateChange(date, "estimatedCompletionDate")}
          placeholder="Select date"
          required
        /> */}

        <FormField
          label="यदि परियोजना मूल निर्धारित तिथि तक पूर्ण न  होने पर विलम्ब का कारण` (Reason for delay in case project not completed by original scheduled date)"
          name="delayReason"
          type="text"
          value={formData.delayReason}
          onChange={handleInputChange}
          placeholder="Enter Enter Delay Reason"
        />

        <FormField
          label="Meeting instructions given in the meeting"
          name="meetingInstructions"
          type="text"
          value={formData.meetingInstructions}
          onChange={handleInputChange}
          placeholder="Enter the instructions given in the meeting"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Actual Completion Date "
          name="actualCompletionDate"
          type="date"
          value={formData.actualCompletionDate}
          onChange={(date) => handleDateChange(date, "actualCompletionDate")}
          placeholder="Select date"
          required
        />
        <FormField
          label="Work Order Formation Date"
          name="workOrderFormationDate"
          type="date"
          value={formData.workOrderFormationDate}
          onChange={(date) => handleDateChange(date, "workOrderFormationDate")}
          placeholder="Select date"
          required
        />
      </div>

      <FormField
        label="कार्यदायी संस्था को भूमि उपलब्ध होने की तिथि (Date of Land Handover to Executing Agency)"
        name="landHandoverDate"
        type="date"
        value={formData.landHandoverDate}
        onChange={(date) => handleDateChange(date, "landHandoverDate")}
        placeholder="Select date"
        required
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className={classNames(
              "flex items-center px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-white",
              isSubmitting
                ? "bg-green-500 cursor-wait"
                : "bg-green-600 hover:bg-green-700"
            )}
          >
            <Save className="w-5 h-5 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit Project"}
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;
