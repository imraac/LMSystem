import React from 'react';

const PaymentHistory = () => {
  const payments = [
    { date: '2024-08-01', amount: 'ksh2', description: 'Standard Plan - Monthly Renewal' },
    { date: '2024-07-01', amount: 'ksh7', description: 'Standard Plan - Monthly Renewal' },
    { date: '2024-06-01', amount: 'ksh16', description: 'Standard Plan - Monthly Renewal' },
  ];

  return (
    <section className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment History</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-2 text-gray-600">Date</th>
            <th className="py-2 text-gray-600">Amount</th>
            <th className="py-2 text-gray-600">Description</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2 text-gray-700">{payment.date}</td>
              <td className="py-2 text-gray-700">{payment.amount}</td>
              <td className="py-2 text-gray-700">{payment.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PaymentHistory;
