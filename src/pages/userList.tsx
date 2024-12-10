import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Download, Filter, Calendar } from "lucide-react";
import { DataTable } from "../components/table/dataTable";
import { ProjectFilters } from "../components/table/ProjectFilters";
import { users, usersHeaders } from "../utils/dataSet";
import { UsersFilter } from "../components/users/usersFilters";
import axios from "axios";
import { endpoint } from "../utils/dataSet";

import { useEntities } from "../context/EntityContect";

const headersKeys = [
  "id",
  "entityName",
  "userName",
  "userDesignation",
  "userEmail",
  "userPhone",
];

export default function UsersList() {
  const { entities, reloadEntities } = useEntities();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userDesignation, setUserDesignation] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [entityId, setEntityId] = useState("");
  const [entityName, setEntityName] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    axios
      .get("http://localhost:3000/api/users")
      .then((res) => {
        // console.log(res.data.data);
        console.log(entities);
        setUsersData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const filteredProjects = usersData?.slice(0, -1).filter((project) => {
  //   const matchesSearch =
  //     project.executingOfficerName
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()) ||
  //     project.executingAgency
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase()) ||
  //     project.executingOfficerDesignation
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase());

  //   return matchesSearch;
  // });

  const exportData = () => {
    // const csvContent = [
    //   ["Project Name", "Department", "Status", "Amount Sanctioned", "Progress"],
    //   ...filteredProjects.map((project) => [
    //     project.projectName,
    //     project.departmentName,
    //     project.projectStatus,
    //     project.approvedProjectCost,
    //     `${project.physicalProgress}%`,
    //   ]),
    // ]
    //   .map((row) => row.join(","))
    //   .join("\n");
    // const blob = new Blob([csvContent], { type: "text/csv" });
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "projects.csv";
    // a.click();
    // window.URL.revokeObjectURL(url);
  };

  const createUser = () => {
    if (
      userName === "" ||
      userEmail === "" ||
      userPhone === "" ||
      userDesignation === "" ||
      userPassword === "" ||
      entityId === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
  
    const payload = {
      entityId: entityId,
      entityName: entityName,
      userName: userName,
      userEmail: userEmail,
      userPhone: userPhone,
      userDesignation: userDesignation,
      userPassword: userPassword,
      userRole: 5,
    };
  
    console.log("Payload:", payload); // Add this to inspect the payload
  
    axios
      .post(`${endpoint}/api/users`, payload)
      .then((res) => {
        console.log(res.data);
        fetchUsers();
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err.response.data); // Log backend error message
        setError(err.response.data.message);
      });
  };
  return (
    <div className="">
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg overflow-hidden	">
        <div className="border-b border-gray-200 p-4">
          <UsersFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            createNewUser={() => setShowModal(true)}
            exportData={() => exportData()}
          />
        </div>
        <DataTable
          headers={usersHeaders}
          projects={usersData}
          searchTerm={searchTerm}
          headerKeys={headersKeys}
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
              उपयोगकर्ता जोड़ें
            </h2>

            <div className="space-y-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कार्यकारी एजेंसी
                </label>
                <select
                  onChange={(e) => {
                    const value = e.target.value;
                    setEntityId(value);
                    const index = entities.findIndex(
                      (entity) => entity.id === Number(value)
                    );
                    setEntityName(entities[index].entity_name);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option key={"entity"} value={"entity"}>
                    Select Executive Agency
                  </option>
                  {entities
                    ?.filter((entity) => entity.entity_type === 2)
                    .map((entity) => (
                      <option key={entity.id} value={entity.id}>
                        {entity.entity_name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कार्यकारी अधिकारी का नाम
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="कार्यकारी अधिकारी का नाम दर्ज करें"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कार्यकारी अधिकारी पदनाम
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  value={userDesignation}
                  onChange={(e) => setUserDesignation(e.target.value)}
                  placeholder="कार्यकारी अधिकारी पदनाम दर्ज करें"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कार्यकारी ईमेल/उपयोगकर्ता नाम
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="कार्यकारी ईमेल/उपयोगकर्ता नाम दर्ज करें"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कार्यकारी अधिकारी मोबाइल
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  value={userPhone}
                  maxLength={10}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="अधिशाषी अधिकारी का मोबाइल दर्ज करें"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  कार्यकारी अधिकारी पासवर्ड
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={1}
                  maxLength={10}
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="अधिशाषी अधिकारी का कृपया पासवर्ड दर्ज करें"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm font-medium">
                  {error}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                रद्द करें
              </button>
              <button
                onClick={createUser}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                दर्ज करें
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
