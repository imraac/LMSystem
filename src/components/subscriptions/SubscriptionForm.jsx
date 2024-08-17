import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

const SubscriptionForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { plan, isYearly, calculatePrice } = location.state || {};
  const { user, authToken } = useAuth();
  const toast = useToast();

  const getPrice = (price) =>
    typeof calculatePrice === "function" ? calculatePrice(price) : price;

  const [amount, setAmount] = useState(getPrice(plan?.price || 0));
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  if (!amount || !phoneNumber) {
    setError("Please fill in all fields.");
    toast({
      title: "Validation Error",
      description: "Please fill in all fields.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
    setIsLoading(false);
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, 
      },
      body: JSON.stringify({
        user_id: user?.id,
        amount: Number(amount),
        phone_number: phoneNumber,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast({
        title: "Subscription successful.",
        description: `Subscription successful with amount: ${amount} and phone number: ${phoneNumber}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/pro-courses");
      }, 10000); 
    } else {
      setError(data.message || "Subscription failed. Please try again.");
      toast({
        title: "Subscription Failed",
        description: data.message || "Subscription failed. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  } catch (err) {
    console.error("Subscription error:", err);
    setError("An error occurred. Please try again.");
    toast({
      title: "Error",
      description: "An unexpected error occurred. Please try again later.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold">{plan?.name} Plan</h2>
          <p className="text-3xl font-bold">
            KSH {amount.toLocaleString()}
            <span className="text-sm ml-1">/{isYearly ? "year" : "month"}</span>
          </p>
          <p className="text-gray-700 mt-4">{plan?.description}</p>
          <ul className="text-gray-700 text-sm space-y-2 mt-4">
            {plan?.features?.map((feature, index) => (
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

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              type="number"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
              placeholder="Enter the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-coral-500 focus:border-coral-500 sm:text-sm"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                isLoading
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "text-white bg-coral-500 hover:bg-coral-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 transition-colors duration-200`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Processing...</span>
              ) : (
                <span>Purchase Now</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
