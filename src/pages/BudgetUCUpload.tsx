import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Download, Filter, Calendar } from "lucide-react";
import { DataTable } from "../components/table/ProjectTable";
import { ProjectFilters } from "../components/table/ProjectFilters";
import { budgetUcupload, BudgetUcHeaders } from "../utils/dataSet";

export default function BudgetUcUpload() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Projects Budget Recieved Installament
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
            Add Projects Budget Recieved Installament
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden	">
        <div className="border-b border-gray-200 p-4"></div>
        <DataTable
          headers={BudgetUcHeaders}
          projects={budgetUcupload}
          searchTerm={searchTerm}
          subTableKeyName="budgetDetails"
        />
      </div>

      {showModal && (
        <div
          style={{
            zIndex: 9999,
          }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="bg-white rounded-xl shadow-xl  p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Add Projects Budget Recieved Installment
            </h2>

            <div className="space-y-4">

              <div className="flex gap-2">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department Name
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="औद्योगिक विकास विभाग">
                    औद्योगिक विकास विभाग
                  </option>
                  <option value="नगरीय विकास विभाग">नगरीय विकास विभाग </option>
                  <option value="योजना विभाग">योजना विभाग </option>
                </select>
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="औद्योगिक विकास विभाग">
                    औद्योगिक विकास विभाग
                  </option>
                  <option value="नगरीय विकास विभाग">नगरीय विकास विभाग </option>
                  <option value="योजना विभाग">योजना विभाग </option>
                </select>
              </div>
                </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Installment Amount (In Lac)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  placeholder="Enter Installment Amount (In Lac)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instalment Expenditure (In Lac)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  placeholder="Enter Instalment Expenditure (In Lac)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remark
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  placeholder="Enter Remark"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Recived Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="DD-MM-YYYY"
                  />
                  <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Utilization certificate(UC)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:border-orange-500">
                    <Plus className="w-8 h-8 text-gray-400" />
                    <span className="mt-2 text-sm text-red-500">
                      (only .jpg, .jpeg, .png Format Maximum size 200 KB )
                    </span>
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Update Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
