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
import { AlertCircle, UserPlus } from "lucide-react";
import { use } from "framer-motion/client";
import { set } from "date-fns";

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
    return false;
  }
};

const USER_ROLES = [
  { id: 1, name: "Super Admin" },
  { id: 2, name: "Admin" },
  { id: 3, name: "Project Manager" },
  { id: 4, name: "Data Operator" },
];

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

  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userPhone, setUserPhone] = useState(null);
  const [userDesignation, setUserDesignation] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [entityId, setEntityId] = useState(null);
  const [entityName, setEntityName] = useState(null);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    axios
      .get(`${endpoint}/api/users`)
      .then((res) => {
        console.log(res.data.data);
        setUsersData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data");
    const entityData = JSON.parse(entityId);
    console.log(entityData);
    console.log(
      userName,
      userEmail,
      userPhone,
      userDesignation,
      userPassword,
      userRole,
      entityId,
      entityName
    );

    if (
      userName !== null &&
      userEmail !== null &&
      userPhone !== null &&
      userDesignation !== null &&
      userPassword !== null &&
      userRole !== null &&
      entityId !== null &&
      entityName !== null
    ) {
      const payload = {
        entityId: entityId.id,
        entityName: entityName,
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
        userDesignation: userDesignation,
        userPassword: userPassword,
        userRole: userRole,
      };

      console.log(
        payload.entityId,
        payload.entityName,
        payload.userName,
        payload.userEmail,
        payload.userPhone,
        payload.userDesignation,
        payload.userPassword,
        payload.userRole
      );

      // axios
      //   .post(`${endpoint}/api/users`, payload)
      //   .then(async (res) => {
      //     console.log(res.data);
      //     const accountDetails = `
      //     Account Details:
      //     ---------------
      //     Name: ${userName}
      //     Username/Email: ${userEmail}
      //     Password: ${userPassword}
      //     Role: ${userRole}
      //     Entity: ${entityName}

      //     Please keep these credentials safe.`;

      //     const copied = await copyToClipboard(accountDetails);
      //     if (copied) {
      //       alert("Account details copied to clipboard");
      //     }
      //     alert("User created successfully");

      //     setUserName(null);
      //     setUserEmail(null);
      //     setUserPhone(null);
      //     setUserDesignation(null);
      //     setUserPassword(null);
      //     setUserRole(null);
      //     setEntityId(null);
      //     setEntityName(null);
      //     setError("");
      //     fetchUsers();
      //     setShowModal(false);
      //   })
      //   .catch((err) => {
      //     console.log(err.response.data); // Log backend error message
      //     setError(err.response.data.message);
      //   });
    } else {
      setError("Please fill all the fields");
      return;
    }
  };

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

      {/* {showModal && (
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
                <div className="text-red-500 text-sm font-medium">{error}</div>
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
      )} */}

      <h1>{(entityName, entityId)}</h1>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New User Account</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entity
                </label>
                <select
                  name="entityId"
                  value={entityId}
                  onChange={(e) => {
                    const value = JSON.parse(e.target.value);
                    console.log(value);

                    setEntityId(value);
                    setEntityName(value.entity_name);
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Entity</option>
                  {entities
                    ?.filter(
                      (entity) =>
                        entity.entity_type === 2 || entity.entity_type === 3
                    )
                    .map((entity) => (
                      <option key={entity.id} value={entity}>
                        {entity.entity_name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User Role
                </label>
                <select
                  name="userRole"
                  value={userRole}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserRole(value);
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select Role</option>
                  {USER_ROLES.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserName(value);
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter user's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={userEmail}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserEmail(value);
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="userPhone"
                  value={userPhone}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserPhone(value);
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  name="userDesignation"
                  value={userDesignation}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserDesignation(value);
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter designation"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="userPassword"
                  value={userPassword}
                  onChange={(e) => {
                    const value = e.target.value;
                    setUserPassword(value);
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter password"
                />
              </div>

              {error && (
                <div className="flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
