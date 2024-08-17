import React from 'react';

const SubjectCard = ({ subject }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-4">
      <h3 className="text-lg font-semibold text-gray-800">{subject.category}</h3>
      <p className="text-gray-600">Score: <span className="font-bold text-[#FF6247]">{subject.score}</span></p>
      <p className="text-gray-600">Total Questions: <span className="font-bold text-[#FF6247]">{subject.total_questions}</span></p>
      <details className="mt-2">
        <summary className="cursor-pointer text-[#FF6247] hover:underline">View Answers</summary>
        <p className="mt-2 text-gray-700">Answers: {JSON.stringify(subject.answers)}</p>
      </details>
    </div>
  );
};

export default SubjectCard;
