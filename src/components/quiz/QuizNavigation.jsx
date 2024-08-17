


import React from 'react';

function QuizNavigation({ currentQuestion, totalQuestions, onNavigate, onComplete, isAnswered }) {
  return (
    <div className="flex justify-end mt-4">
      {currentQuestion === totalQuestions - 1 ? (
        <button
          className={`py-2 px-6 rounded-lg font-semibold ${
            isAnswered ? 'bg-[#f7a08f] text-white hover:bg-[#e5907f]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={onComplete}
          disabled={!isAnswered}
        >
          FINISH
        </button>
      ) : (
        <button
          className={`py-2 px-6 rounded-lg font-semibold ${
            isAnswered ? 'bg-[#f7a08f] text-white hover:bg-[#e5907f]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={() => onNavigate(currentQuestion + 1)}
          disabled={!isAnswered}
        >
          CONTINUE
        </button>
      )}
    </div>
  );
}

export default QuizNavigation;

