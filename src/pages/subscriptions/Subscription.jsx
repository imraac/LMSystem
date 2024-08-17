import React, { useState } from "react";
import PlanCard from "../../components/subscriptions/PlanCard";
import ToggleSwitch from "../../components/subscriptions/ToggleSwitch";
import Header from "../../components/subscriptions/Header";

const Subscription = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Lite",
      price: 7,
      description:
        "Just using this for yourself? Lite is the way to go for the lite platform.",
      features: [
        "Unlimited access to PRO courses",
        "Quizzes with hand-picked prizes",
        "30-day moneyback guarantee",
      ],
    },
    {
      name: "Pro",
      price: 19,
      description:
        "Want to go beyond the basics? Pro offers advanced features for users.",
      features: [
        "All PRO-tier benefits",
        "Invite to private Discord chat",
        "30-day moneyback guarantee",
      ],
    },
    {
      name: "Team",
      price: 31,
      description:
        "Managing a team? Team plan offers bulk pricing and exclusive benefits.",
      features: [
        "Better bulk pricing",
        "All PRO-tier benefits",
        "30-day moneyback guarantee",
      ],
    },
  ];

  const togglePlan = () => {
    setIsYearly(!isYearly);
  };

  const calculatePrice = (price) => {
    return isYearly ? price * 12 : price;
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
      <Header />
      <ToggleSwitch isYearly={isYearly} togglePlan={togglePlan} />
      <div className="flex flex-col items-center pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              isYearly={isYearly}
              calculatePrice={calculatePrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
