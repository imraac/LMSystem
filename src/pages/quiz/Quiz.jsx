

import React, { useEffect, useState } from 'react';
import QuizQuestion from '../../components/quiz/QuizQuestion';
import QuizNavigation from '../../components/quiz/QuizNavigation';
import ProgressBar from '../../components/quiz/ProgressBar';
import QuizResults from '../../components/quiz/QuizResults';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Quiz() {
  const { category } = useParams();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/questions/${category.toLowerCase()}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch quiz data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched quiz data:', data); // Debugging line

        // Validate and process quiz data format
        if (data.questions && Array.isArray(data.questions) && data.questions.every(question => 
          typeof question.questionText === 'string' &&
          typeof question.correctAnswer === 'string' &&
          (typeof question.options === 'string' || Array.isArray(question.options)) &&
          (typeof question.options === 'string' ? JSON.parse(question.options).every(option => typeof option === 'string') : question.options.every(option => typeof option === 'string'))
        )) {
          // Parse the options field from JSON string to array if necessary
          const processedQuestions = data.questions.map(question => ({
            ...question,
            options: typeof question.options === 'string' ? JSON.parse(question.options) : question.options,
          }));

          setQuizData(processedQuestions);
          setAnswers(new Array(processedQuestions.length).fill(null));
          setCurrentQuestion(0);
          setQuizFinished(false);
          setIsAnswered(false);
        } else {
          throw new Error('Invalid quiz data format');
        }
      } catch (error) {
        console.error(error); 
        toast.error('Failed to load quiz data');
        setError('Failed to load quiz data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [category]);

  const handleAnswerSelect = (index) => {
    setAnswers(prevAnswers => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = index;
      return newAnswers;
    });
    setIsAnswered(true);
  };

  const handleNavigate = (nextQuestion) => {
    setCurrentQuestion(nextQuestion);
    setIsAnswered(false);
  };

  const handleComplete = () => {
    setQuizFinished(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(quizData.length).fill(null));
    setQuizFinished(false);
    setIsAnswered(false);
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (quizFinished) {
    return (
      <QuizResults
        quizData={quizData}
        answers={answers}
        onRestart={handleRestart}
      />
    );
  }

  if (quizData.length === 0) {
    return <p>No questions available.</p>;
  }

  const question = quizData[currentQuestion];

  return (
    <div className="p-4">
      <ProgressBar current={currentQuestion + 1} total={quizData.length} />
      {question ? (
        <div>
          <QuizQuestion
            question={question.questionText}
            options={question.options}
            selectedAnswer={answers[currentQuestion]}
            onSelectAnswer={handleAnswerSelect}
          />
          <QuizNavigation
            currentQuestion={currentQuestion}
            totalQuestions={quizData.length}
            onNavigate={handleNavigate}
            onComplete={handleComplete}
            isAnswered={isAnswered}
          />
        </div>
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  );
}

export default Quiz;
