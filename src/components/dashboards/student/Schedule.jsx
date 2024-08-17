import React from 'react';
import { FaAngleRight } from 'react-icons/fa';

const Schedule = () => (
  <section className="bg-white rounded-lg shadow-lg p-8">
    <h2 className="text-2xl font-bold mb-6 text-gray-900">Schedule</h2>
    <div className="bg-[#FFF2F1] p-6 rounded-lg mb-6 hover:shadow-md transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Exam Schedule</h3>
      <p className="text-gray-600 mb-4">Your next exam is scheduled for June 15th, 2024 at 10:00 AM.</p>
      <a href="#" className="text-primary hover:text-primary-dark font-medium flex items-center">
        View full schedule <FaAngleRight className="ml-2" />
      </a>
    </div>
    <a href="#" className="text-primary hover:text-primary-dark font-medium flex items-center">
      See more events <FaAngleRight className="ml-2" />
    </a>
  </section>
);

export default Schedule;
