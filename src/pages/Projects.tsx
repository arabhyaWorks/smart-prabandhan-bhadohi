import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

import axios from "axios";
import { Link } from "react-router-dom";
import { Plus, Search, Download, Filter } from "lucide-react";
import { DataTable } from "../components/table/SuperProjectTable";
import { ProjectFilters } from "../components/table/ProjectFilters";
import Drawer from "../components/drawer/Drawer";
import ProjectForm from "../components/drawer/ProjectForm";
import { projectsData, headers } from "../utils/dataSet";
import { endpoint } from "../utils/dataSet";

export function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedExecutiveAgency, setSelectedExecutiveAgency] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(
    headers.hi.map((_, index) => index.toString())
  );

  const columns = headers.hi.map((header, index) => ({
    key: index.toString(),
    label: header,
  }));

  const handleToggleColumn = (columnKey: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  async function fetchProjects() {
    const url = `${endpoint}/api/projects`;

    const params = {
      department: "",
      status: "",
    };

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true", // Add this header
        },
        params: params,
      });

      console.log("Response Data:", response.data);
      // return response.data;
      

      return setProjects(response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.executingAgency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      !selectedDepartment || project.departmentName === selectedDepartment;
    const matchesStatus =
      !selectedStatus || project.projectStatus === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const exportToExcel = (projects) => {
    // Import required library
    // const XLSX = require('xlsx');
   
    // Map data to Hindi headers
    const headerMap = {
      "id": "क्रम संख्या",
      "projectName": "परियोजना का नाम",
      "projectStatus": "परियोजना अद्यतन स्थिति",
      "projectDepartment": "विभाग का नाम", 
      "executingAgency": "कार्यान्वयन एजेंसी",
      "scheme": "योजना का नाम",
      "totalApprovedBudget": "कुल स्वीकृत बजट (₹)",
      "revisedProjectCost": "संशोधित परियोजना लागत (₹)",
      "projectSanctionDate": "परियोजना स्वीकृति की तिथि",
      "projectFinancialApprovalGoNumber": "वित्तीय स्वीकृति गो संदर्भ संख्या",
      "projectFinancialApprovalDate": "वित्तीय स्वीकृति तिथि",
      "actualProjectStartDate": "कार्य प्रारंभ की तिथि",
      "projectCompletionDate": "कार्य पूर्ण करने की तिथि",
      "revisedProjectSanctionDate": "संशोधित परियोजना स्वीकृति तिथि",
      "revisedProjectCompletionDate": "संशोधित पूर्णता तिथि",
      "estimatedCompletionDate": "प्रारंभिक पूर्णता तिथि (एजेंसी द्वारा अनुमानित)",
      "actualCompletionDate": "वास्तविक पूर्णता तिथि",
      "workOrderFormationDate": "कार्य आदेश निर्माण की तिथि", 
      "landHandoverDate": "भूमि हस्तांतरण की तिथि",
      "lastUpdatedDate": "अंतिम अद्यतन तिथि",
      "lastUpdatedDateOnCmis": "सीएमआईएस पर अंतिम अद्यतन तिथि",
      "lastMonthPhysicalProgress": "पिछले माह की भौतिक प्रगति (%)",
      "currentMonthPhysicalProgress": "वर्तमान माह की भौतिक प्रगति (%)",
      "totalReleasedFunds": "कुल स्वीकृत धनराशि (₹)",
      "totalExpenditure": "कुल व्यय (₹)",
      "lastFundReceivedDate": "अंतिम किस्त प्राप्ति की तिथि",
      "utilizationCertificateSubmissionDate": "उपयोग प्रमाण पत्र प्रस्तुत करने की तिथि",
      "meetingDescription": "समीक्षा बैठक निर्देश",
      "meetingCompliance": "समीक्षा अनुपालन",
      "meetingfeedback": "समीक्षा प्रतिक्रिया"
    };
   
    // Format data for Excel
    const excelData = projects.map(project => {
      const rowData = {};
      Object.keys(headerMap).forEach(key => {
        if (key.includes('Date')) {
          rowData[headerMap[key]] = project[key] ? new Date(project[key]).toLocaleDateString() : '';
        } else if (key.includes('Budget') || key.includes('Cost') || key.includes('Funds') || key.includes('Expenditure')) {
          rowData[headerMap[key]] = project[key] ? `₹${Number(project[key]).toLocaleString('en-IN')}` : '';
        } else {
          rowData[headerMap[key]] = project[key] || '';
        }
      });
      return rowData;
    });
   
    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
   
    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Projects");
   
    // Auto-size columns
    const colWidths = [];
    excelData.forEach(row => {
      Object.entries(row).forEach(([key, value], i) => {
        const width = Math.max(
          key.length,
          value ? value.toString().length : 0
        );
        colWidths[i] = Math.max(colWidths[i] || 0, width);
      });
    });
    ws['!cols'] = colWidths.map(w => ({ wch: w + 2 }));
   
    // Generate Excel file
    XLSX.writeFile(wb, "projects.xlsx");
   };
   
   // Usage in your React component:
   const exportData = () => {
    exportToExcel(filteredProjects);
   };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all development projects
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={exportData}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-1" />
            Export
          </button>
          <button
            onClick={() => setIsDrawerOpen(true)}
            // onClick={() => window.location.href = "/projectCreation"}
            className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500"
          >
            <Plus className="h-5 w-5 mr-1" />
            New Project
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden	">
        <div className="border-b border-gray-200 p-4">
          <ProjectFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            selectedExecutiveAgency={selectedExecutiveAgency}
            onSelectedExecutiveAgency={setSelectedExecutiveAgency}
            columns={columns}
            visibleColumns={visibleColumns}
            onToggleColumn={handleToggleColumn}
          />
        </div>
        <DataTable
          headers={headers}
          projects={filteredProjects}
          searchTerm={searchTerm}
          visibleColumns={visibleColumns}
        />
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Create New Project"
      >
        <div className="p-6">
          <ProjectForm onSubmitSuccess={() => setIsDrawerOpen(false)} />
        </div>
      </Drawer>
    </div>
  );
}
