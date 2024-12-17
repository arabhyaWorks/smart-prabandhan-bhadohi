import React, { useEffect, useState } from "react";
import { Plus, Download } from "lucide-react";
import { BudgetTable } from "../components/table/budgetTable";
import { BudgetUcHeaders } from "../utils/dataSet";
import axios from "axios";
import { endpoint } from "../utils/dataSet";
import { useEntities } from "../context/EntityContect";

export default function BudgetUcUpload() {
  const { user, projectNameData } = useEntities(); // Access user context
  const [file, setFile] = useState<File | null>(null); // File state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // Store the PDF preview URL

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [budgetUcupload, setBudgetUcupload] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedProject, setSelectedProject] = useState("");
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [expenditureAmount, setExpenditureAmount] = useState("");
  const [amountReceivedDate, setAmountReceivedDate] = useState("");

  // Fetch Budget UC Uploads
  const fetchBudgetUcupload = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (
        (user?.entityId && user?.entityTypeId && user?.userRole === 3) ||
        user?.userRole === 4
      ) {
        params["entityId"] = user.entityId;
        params["entityTypeId"] = user.entityTypeId;
      }

      const response = await axios.get(`${endpoint}/api/projects-with-budgets`, {
        params,
      });
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

  // Handle File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Only accept PDFs
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile)); // Generate a URL for the PDF preview
      } else {
        alert("Only PDF files are allowed.");
        setFile(null);
        setPreviewUrl(null);
      }
    }
  };

  // Upload Budget UC
  const uploadBudgetUc = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || selectedProject === "" || installmentAmount === "" || amountReceivedDate === "") {
      alert("Please fill all required fields and upload a PDF file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("utilizationCertificate", file); // Use the key expected by the backend
      formData.append("installmentAmount", installmentAmount);
      formData.append("installmentExpenditure", expenditureAmount || "0");
      formData.append("amountReceivedDate", amountReceivedDate);

      const response = await axios.post(
        `${endpoint}/api/projects/${selectedProject}/budget-installments`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response.data);
      fetchBudgetUcupload();
      setShowModal(false);
      resetFormFields();
      alert("Budget UC uploaded successfully");
    } catch (error) {
      console.error("Error uploading budget UC:", error);
      alert("Failed to upload Budget UC. Please try again.");
    }
  };

  // Reset Form Fields
  const resetFormFields = () => {
    setFile(null);
    setPreviewUrl(null);
    setInstallmentAmount("");
    setExpenditureAmount("");
    setAmountReceivedDate("");
    setSelectedProject("");
  };

  return (
    <div>
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
          {/* <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Download className="h-4 w-4 mr-1" />
            Export
          </button> */}
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
          style={{ zIndex: 9999 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Add Projects Budget Received Installment
            </h2>
            <div className="space-y-4 mt-10">
              {/* Select Project */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Project
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Project</option>
                  {projectNameData.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Installment Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Installment Amount (In Crore)
                </label>
                <input
                  value={installmentAmount}
                  onChange={(e) => setInstallmentAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Installment Amount (In Crore)"
                  type="text"
                />
              </div>

              {/* Expenditure Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expenditure Amount (In Crore)
                </label>
                <input
                  value={expenditureAmount}
                  onChange={(e) => setExpenditureAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter Expenditure Amount (In Crore)"
                  type="text"
                />
              </div>

              {/* Upload File */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload PDF
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-orange-500">
                    {previewUrl ? (
                      <iframe
                        src={previewUrl}
                        className="w-full h-64 rounded-lg"
                        title="PDF Preview"
                      ></iframe>
                    ) : (
                      <>
                        <Plus size={24} className="text-gray-400" />
                        <p className="text-sm text-gray-400 mt-2">
                          Click to select a PDF file
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {/* Amount Received Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Received Date
                </label>
                <input
                  type="date"
                  value={amountReceivedDate}
                  onChange={(e) => setAmountReceivedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetFormFields();
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