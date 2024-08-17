import React from 'react';

function QuizOption({ label, text, onClick, selected }) {
  return (
    <button
      className={`w-full text-left bg-gray-100 hover:bg-gray-200 p-3 rounded mb-2 flex items-center ${
        selected ? 'bg-blue-100' : ''
      }`}
      onClick={onClick}
    >
      <span className="font-bold mr-2">{label}</span> {text}
    </button>
  );
}

export default QuizOption;
