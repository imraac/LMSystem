import React, { useState, useEffect } from 'react';

const KeyMetrics = () => {
  const [totalPaid, setTotalPaid] = useState('$0');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/payment-summary');
        if (!response.ok) {
          throw new Error('Failed to fetch payment summary');
        }
        const data = await response.json();
        setTotalPaid(`ksh ${data.total_paid}`);
      } catch (error) {
        setError('Failed to fetch payment summary');
        console.error('Error fetching payment summary:', error);
      }
    };

    fetchPaymentSummary();
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Payment Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#FFE8E7] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-[#FF6247] mb-2">Total Payable</h3>
          <p className="text-3xl font-bold text-[#FF6247]">ksh 10,000</p>
        </div>
        <div className="bg-[#E8FFE8] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-[#4CAF50] mb-2">Total Paid</h3>
          <p className="text-3xl font-bold text-[#4CAF50]"> {totalPaid}</p>
        </div>
        <div className="bg-[#FFF7E8] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-[#FFB74D] mb-2">Other Fees</h3>
          <p className="text-3xl font-bold text-[#FFB74D]">ksh 300</p>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </section>
  );
};

export default KeyMetrics;
