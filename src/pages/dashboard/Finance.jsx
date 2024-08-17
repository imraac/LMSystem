import React from 'react';
import CurrentSubscription from '../../components/dashboards/finance/CurrentSubscription';
import PaymentHistory from '../../components/dashboards/finance/PaymentHistory';
import PlanCard from '../../components/subscriptions/PlanCard';

const Finance = () => {
  const plans = [
    {
      name: "Lite",
      price: 7,
      description:
        "Just using this for yourself? Lite is the way to go for the lite platform.",
      features: [
        "Unlimited access to PRO courses",
        "Quizzes with hand-picked meme prizes",
        "30-day moneyback guarantee",
      ],
    },
    {
      name: "Pro",
      price: 19,
      description:
        "Want to go beyond the basics? Pro offers advanced features for serious users.",
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
        "Invite to private Discord chat",
        "All PRO-tier benefits",
        "30-day moneyback guarantee",
      ],
    },
  ];

  const isYearly = false; 
  const calculatePrice = (price) => (isYearly ? price * 12 : price);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-[#FF6247] text-white p-6 rounded-b-lg shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Finance</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Your Finances</h2>
          <p className="mt-2 text-gray-600">Track your course payments, view invoices, and manage subscriptions here.</p>
        </section>
        <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              isYearly={isYearly}
              calculatePrice={calculatePrice}
            />
          ))}
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CurrentSubscription />
          <PaymentHistory />
        </div>
      </main>
    </div>
  );
};

export default Finance;
