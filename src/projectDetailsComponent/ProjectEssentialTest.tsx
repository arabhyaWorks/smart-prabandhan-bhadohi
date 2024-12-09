// import React from "react";

// const ProjectEssentialTest = ({ project }) => {
//   const data = {
//     testId: 2,
//     testName: "सड़क सामग्री की गुणवत्ता परीक्षण",
//     dateOfSampleCollection: "2023-07-14T18:30:00.000Z",
//     samplingAuthority: "गुणवत्ता अधिकारी",
//     sampleTestLabName: "राष्ट्रीय परीक्षण प्रयोगशाला",
//     sampleTestReport: "quality_test_report.pdf",
//     sampleCollectionSiteImage: [
//       "road_sample_image1.jpg",
//       "road_sample_image2.jpg",
//     ],
//   };
//   return (
//     <div className="bg-white rounded-lg shadow">
//       <div className="p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">
//           Project Essential Test
//         </h2>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Sr.No.
//                 </th>
//                 <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Test Name
//                 </th>
//                 <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date of Sample Collection
//                 </th>
//                 <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Sampling Authority
//                 </th>
//                 <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Sample Test Lab Name
//                 </th>
//                 <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Sample Collection Site Image
//                 </th>
//                 <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Report of Sample Collection
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td
//                   className="px-4 py-4 text-sm text-gray-500 text-center"
//                   colSpan={7}
//                 >
//                   No Project ESSENTIAL TEST...
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectEssentialTest;

import React from "react";

const ProjectEssentialTest = ({ project }) => {
  // Use the project prop if available, otherwise use the hardcoded data
  const testData = project?.projectEssentialTest || []

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("hi-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Project Essential Test
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sr.No.
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Name
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Sample Collection
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sampling Authority
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sample Test Lab Name
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sample Collection Site Image
                </th>
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report of Sample Collection
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testData.length > 0 ? (
                testData.map((test, index) => (
                  <tr key={test.testId || index}>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {test.testName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {formatDate(test.dateOfSampleCollection)}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {test.samplingAuthority}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {test.sampleTestLabName}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      {test.sampleCollectionSiteImage?.map((img, idx) => (
                        <div key={idx} className="text-blue-600 underline">
                          {img}
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">
                      <a
                        href={test.sampleTestReport}
                        className="text-blue-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {test.sampleTestReport}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-4 py-4 text-sm text-gray-500 text-center"
                    colSpan={7}
                  >
                    No Project ESSENTIAL TEST...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectEssentialTest;
