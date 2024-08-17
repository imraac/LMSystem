import React from 'react';

const SemesterSelector = ({ semesters, selectedSemester, onSemesterChange }) => {
  return (
    <div className="mt-4">
      <label htmlFor="semester" className="block text-lg font-medium text-gray-700">Select Category</label>
      <select
        id="semester"
        className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6247] transition"
        value={selectedSemester}
        onChange={onSemesterChange}
      >
        {semesters.map((sem, index) => (
          <option key={index} value={sem.semester}>{sem.semester}</option>
        ))}
      </select>
    </div>
  );
};

export default SemesterSelector;
