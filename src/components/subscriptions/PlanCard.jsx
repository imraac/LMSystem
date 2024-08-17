import React from "react";
import { useNavigate } from "react-router-dom";

const PlanCard = ({ plan, isYearly, calculatePrice }) => {
  const navigate = useNavigate();

  const handleSelectPlan = () => {
   navigate("/subscribe", { state: { plan, isYearly } });
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 sm:p-8 flex flex-col items-start transition-transform duration-300 hover:shadow-xl hover:scale-105 max-w-xs sm:max-w-xs w-full h-[420px]">
      <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">
        {plan.name}
      </h2>
      <p className="text-3xl font-bold mb-4 text-center sm:text-left">
        KSH {calculatePrice(plan.price).toLocaleString()}
        <span className="text-sm ml-1">/{isYearly ? "year" : "month"}</span>
      </p>
      <p className="text-gray-700 text-sm mb-6 text-center sm:text-left">
        {plan.description.length > 100
          ? `${plan.description.substring(0, 100)}...`
          : plan.description}
      </p>
      <button
        className="bg-coral-500 text-white py-2 px-4 rounded-md hover:bg-coral-600 transition duration-300 mb-4 w-full"
        onClick={handleSelectPlan}
      >
        Select {plan.name}
      </button>
      <hr className="w-full border-t border-gray-300 mb-4" />
      <ul className="text-gray-700 text-sm space-y-2">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="w-5 h-5 text-coral-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlanCard;
