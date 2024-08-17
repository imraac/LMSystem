import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProCourseCard({ id, title, description, image, tags }) {
  const navigate = useNavigate();
const handleClick = () => {
  navigate(`/pro-courses/${id}`);
};

  const displayTags = tags?.slice(0, 3) || [];
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105 hover:shadow-2xl border border-gray-200 flex flex-col cursor-pointer"
      style={{ height: "400px", width: "300px" }}
      onClick={handleClick}
    >
      <div className="relative h-[45%] w-full">
        <img
          src={image || "/default-thumbnail.jpg"}
          alt={`${title} thumbnail` || "Course thumbnail"}
          className="absolute inset-0 w-full h-full object-cover rounded-t-2xl"
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
          {title}
        </h3>
        <p className="text-gray-700 text-sm flex-grow overflow-hidden">
          {description}
        </p>
        {displayTags.length > 0 && (
          <div className="mt-2 flex flex-wrap">
            {displayTags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-coral-500 text-white text-xs px-2 py-1 rounded-full mr-2 mb-2"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProCourseCard;
