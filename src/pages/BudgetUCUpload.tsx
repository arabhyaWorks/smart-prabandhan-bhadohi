import React, { useEffect, useState } from "react";
import { Plus, Download, Calendar } from "lucide-react";
import { BudgetTable } from "../components/table/BudgetTable";
import { budgetUcupload, BudgetUcHeaders } from "../utils/dataSet";
import axios from "axios";
import { endpoint } from "../utils/dataSet";
import { useEntities } from "../context/EntityContect";
import { set } from "date-fns";

export default function BudgetUcUpload() {
  // const { user } = useEntities(); // Access user context
  const { user, entities, projectNameData, setProjectNameData } = useEntities(); // Access user context

  // const user = {
  //   id: 17,
  //   userName: "Testing",
  //   userEmail: "user@testing.com",
  //   userRole: 3,
  //   entityId: 16,
  //   entityName: "उत्तर प्रदेश जल निगम (RURAL)",
  //   entityTypeId: 1,
  //   userDesignation: "testing",
  //   userPhoneNumber: "1234567890",
  // };
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [budgetUcupload, setBudgetUcupload] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedExecutiveAgency, setSelectedExecutiveAgency] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const [installmentAmount, setInstallmentAmount] = useState("");
  const [expenditureAmount, setExpenditureAmount] = useState("");
  const [amountReceivedDate, setAmountReceivedDate] = useState("");
  const [utilizationCertificate, setUtilizationCertificate] = useState("");

  const fetchBudgetUcupload = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};

      // Include entityId and entityTypeId in the request if user exists
      if (
        (user?.entityId && user?.entityTypeId && user?.userRole == 3) ||
        user?.userRole == 4
      ) {
        params["entityId"] = user.entityId;
        params["entityTypeId"] = user.entityTypeId;
      }

      const response = await axios.get(
        `${endpoint}/api/projects-with-budgets`,
        {
          params,
        }
      );
      setBudgetUcupload(response.data.data);
    } catch (error) {
      console.error("Error fetching budget uploads:", error);
      setError("Failed to fetch budget uploads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBudgetUcupload();
  }, [user]);

  const uploadBudgetUc = async (e) => {
    e.preventDefault();
    console.log("uploading budget uc");
    console.log("selectedProject", selectedProject);
    console.log("installmentAmount", installmentAmount);
    console.log("expenditureAmount", expenditureAmount);
    console.log("amountReceivedDate", amountReceivedDate);
    console.log("utilizationCertificate", utilizationCertificate);

    if (
      selectedProject === "" ||
      installmentAmount === "" ||
      // expenditureAmount === "" ||
      amountReceivedDate === "" 
      // utilizationCertificate === ""
    ) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await axios.post(
        `${endpoint}/api/projects/${selectedProject}/budget-installments`,
        {
          projectId: selectedProject,
          installmentAmount,
          installmentExpenditure: expenditureAmount,
          amountReceivedDate,
          utilizationCertificate,
        }
      );
      console.log(response.data);
      fetchBudgetUcupload();
      setShowModal(false);
      setInstallmentAmount("");
      setExpenditureAmount("");
      setAmountReceivedDate("");
      setUtilizationCertificate("");

      alert("Budget UC uploaded successfully");
    } catch (error) {
      console.error("Error uploading budget uc:", error);
    }
  };

  useEffect(() => {
    fetchBudgetUcupload();
  }, [projectNameData]);

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Projects Budget Received Installment
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all development projects
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
          >
            <Plus className="h-5 w-5 mr-1" />
            Add Projects Budget Received Installment
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden">
        {loading ? (
          <p className="text-center py-6 text-gray-600">Loading data...</p>
        ) : error ? (
          <p className="text-center py-6 text-red-600">{error}</p>
        ) : (
          <BudgetTable
            headers={BudgetUcHeaders}
            projects={budgetUcupload}
            searchTerm={searchTerm}
            subTableKeyName="budgetDetails"
          />
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            zIndex: 9999,
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Add Projects Budget Received Installment
            </h2>
            <div className="space-y-4 mt-10">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Project
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value={""}>Select Project</option>
                  {user?.userRole == 1 || user?.userRole == 2
                    ? projectNameData.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.projectName}
                        </option>
                      ))
                    : projectNameData
                        .filter(
                          (project) =>
                            project[
                              user.entityTypeId == 1
                                ? "departmentId"
                                : "executiveAgencyId"
                            ] == user.entityId
                        )
                        .map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.projectName}
                          </option>
                        ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Installment Amount (In Crore)
                </label>
                <input
                  value={installmentAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.match(/^\d*\.?\d{0,2}$/)) {
                      setInstallmentAmount(value);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Installment Amount (In Crore)"
                  type="text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expenditure Amount (In Crore)
                </label>
                <input
                  value={expenditureAmount}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.match(/^\d*\.?\d{0,2}$/)) {
                      setExpenditureAmount(value);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Installment Amount (In Crore)"
                  type="text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Utilization Certificate
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={utilizationCertificate}
                    onChange={(e) => setUtilizationCertificate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter the link Utilization Certificate"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Received Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={amountReceivedDate}
                    onChange={(e) => setAmountReceivedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setInstallmentAmount("");
                  setExpenditureAmount("");
                  setAmountReceivedDate("");
                  setUtilizationCertificate("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={uploadBudgetUc}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
