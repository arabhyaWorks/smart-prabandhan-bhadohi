import React from "react";
import { convertToIST } from "../utils/functions";

const ProjectGallery = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Project Component Gallery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.projectGallery.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={
                  image.image ||
                  "https://pmschandauli.com//upload/project/9/main/240108045216.jpg"
                }
                // src="https://pmschandauli.com//upload/project/9/main/240108045216.jpg"
                alt={image.image}
                className="w-full h-64 object-cover rounded-lg shadow-sm"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                <h3 className="text-sm font-medium">
                  {image.imageDescription}
                </h3>
                <p className="text-xs mt-1">
                  Uploaded: {convertToIST(image.time)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectGallery;
