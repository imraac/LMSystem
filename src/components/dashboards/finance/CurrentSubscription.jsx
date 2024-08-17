import React from 'react';

const CurrentSubscription = () => {
  const currentPlan = {
    name: 'Standard Plan',
    expiry: '2024-12-31',
    renewalPrice: '$20/month',
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Subscription</h2>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Plan: {currentPlan.name}</h3>
        <p className="mt-2 text-gray-600">Expiry Date: {currentPlan.expiry}</p>
        <p className="mt-2 text-gray-600">Renewal Price: {currentPlan.renewalPrice}</p>
        <button className="mt-4 w-full bg-[#FF6247] text-white py-2 rounded-lg hover:bg-[#e55d43] transition-colors">
          Renew Subscription
        </button>
      </div>
    </section>
  );
};

export default CurrentSubscription;
