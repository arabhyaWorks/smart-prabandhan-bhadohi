import React from "react";
import { convertToIST } from "../utils/functions";

const ProjectMeetingLogs = ({ meetingInstructions }) => {
  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("hi-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const meetingHeaders = [
    "क्रम संख्या",
    "समीक्षा बैठक निर्देश",
    "समीक्षा बैठक दिनांक",
    "दिये गये निर्देश के सापेक्ष अनुपालन",
    "अभ्यूक्ति",
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Project Meeting Logs
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {meetingHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="px-6 py-4 text-left text-sm font-bold text-orange-800 tracking-wider border-2 border-gray-200"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* {meetingInstructions.length > 0 ? ( */}
                {meetingInstructions?.map((meeting, index) => (
 <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 border-2 border-gray-200 text-center">
                    {meeting.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-2 border-gray-200">
                    {meeting.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-2 border-gray-200">
                    {/* {new Date(meeting.date).toLocaleString()} */}
                    {convertToIST(meeting.date)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-2 border-gray-200">
                    {meeting.compliance}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 border-2 border-gray-200">
                    {meeting.feedback}
                  </td>
                </tr>
                ))}
              {/* ) : (
                <tr>
                  <td
                    className="px-4 py-4 text-sm text-gray-500 text-center"
                    colSpan={7}
                  >
                    No Project Meeting Logs Found...
                  </td>
                </tr>
              )} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectMeetingLogs;
