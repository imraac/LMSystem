import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import WelcomeSection from './WelcomeSection';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import Login from '../../pages/user/Login';
import Register from './RegistrationForm';

const AuthForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUp = location.pathname === '/register';

  const toggleForm = (signUp) => {
    navigate(signUp ? '/register' : '/login');
  };

  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className="min-h-screen mx-auto flex items-center justify-center relative">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="absolute top-4 left-4 p-2 bg-[#FF6247] rounded-full text-white"
        aria-label="Back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="max-w-5xl w-full mx-auto flex rounded-lg overflow-hidden">
   
        <WelcomeSection />

     
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center bg-white">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              SkillQuest <span role="img" aria-label="Brain icon">🧠</span>
            </h2>
            <div className="inline-flex rounded-lg overflow-hidden border border-coral-300">
              <button
                className={`py-2 px-6 text-sm font-medium transition-colors duration-200 ${
                  !isSignUp ? 'bg-coral-500 text-white' : 'bg-white text-coral-700 hover:bg-coral-100'
                }`}
                onClick={() => toggleForm(false)}
              >
                Login
              </button>
              <button
                className={`py-2 px-6 text-sm font-medium transition-colors duration-200 ${
                  isSignUp ? 'bg-coral-500 text-white' : 'bg-white text-coral-700 hover:bg-coral-100'
                }`}
                onClick={() => toggleForm(true)}
              >
                Register
              </button>
            </div>
          </div>
          {!isSignUp ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
