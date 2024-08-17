

import React from 'react';

const QuizQuestion = ({ question, options, selectedAnswer, onSelectAnswer }) => {
  if (!Array.isArray(options) || options.some(option => typeof option !== 'string')) {
    console.error('Options should be an array of strings');
    return <p className="text-red-600">Invalid options</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">{question}</h2>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-4 rounded-lg border ${
              selectedAnswer === index ? 'bg-green-600 text-white border-green-500' : 'bg-gray-100 border-gray-300'
            } hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-500`}
            onClick={() => onSelectAnswer(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
