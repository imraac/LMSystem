import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests

function QuizResults({ quizData, answers, onRestart }) {
  const navigate = useNavigate();

  const score = answers.reduce((acc, answer, index) => {
    const correctIndex = quizData[index].options.indexOf(quizData[index].correctAnswer);
    return answer === correctIndex ? acc + 1 : acc;
  }, 0);

  useEffect(() => {
    // Send quiz results to the backend
    const saveQuizResults = async () => {
      try {
        const resultData = {
          user_id: 1,  // Replace with the actual user ID
          category: quizData[0].category, // Assuming category is part of quizData
          score: score,
          total_questions: quizData.length,
          answers: answers,
        };

        const response = await axios.post('http://127.0.0.1:5000/save-quiz-result', resultData);
        console.log('Quiz results saved:', response.data);
      } catch (error) {
        console.error('Error saving quiz results:', error);
      }
    };

    saveQuizResults();
  }, [score, quizData, answers]);

  const handleLabsNavigation = () => {
    navigate('/labs');
  };

  return (
    <div className="min-h-screen bg-[#f7a08f] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Quiz Results</h1>
        <p className="text-xl mb-4 text-center">Your score: {score} / {quizData.length}</p>
        {quizData.map((question, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">{question.questionText}</p>
            <p className="text-green-600">
              Correct answer: {question.correctAnswer}
            </p>
            <p className={answers[index] === quizData[index].options.indexOf(quizData[index].correctAnswer) ? "text-green-600" : "text-red-600"}>
              Your answer: {answers[index] !== null ? question.options[answers[index]] : "No answer selected"}
            </p>
          </div>
        ))}
        <button 
          onClick={onRestart}
          className="w-full bg-[#f7a08f] text-white py-2 px-4 rounded hover:bg-[#e5907f] mt-4"
        >
          Restart Quiz
        </button>
        <button 
          onClick={handleLabsNavigation}
          className="w-full bg-[#f7a08f] text-white py-2 px-4 rounded hover:bg-[#e5907f] mt-4"
        >
          Go to Labs
        </button>
      </div>
    </div>
  );
}

export default QuizResults;
