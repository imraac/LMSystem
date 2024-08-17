import React from 'react';

const SubscriptionPlans = () => {
  const plans = [
    { name: 'Basic Plan', price: '$10/month', features: ['Access to basic courses', 'Monthly webinars'] },
    { name: 'Standard Plan', price: '$20/month', features: ['Access to all courses', 'Weekly webinars', 'Priority support'] },
    { name: 'Premium Plan', price: '$30/month', features: ['All Standard Plan features', '1-on-1 mentorship', 'Exclusive content'] },
  ];

  return (
    <section className="mt-4">
      <h2 className="text-xl font-semibold">Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {plans.map((plan, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="text-2xl font-bold">{plan.price}</p>
            <ul className="mt-2 space-y-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-600">{feature}</li>
              ))}
            </ul>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700">Subscribe</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionPlans;
