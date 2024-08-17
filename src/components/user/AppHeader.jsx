import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function AppHeader() {
  const location = useLocation();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          SkillQuest <span role="img" aria-label="Brain icon">🧠</span>
        </h1>
        <nav>
          <Link
            to="/register"
            className={`px-4 py-2 rounded-lg mr-2 ${
              location.pathname === '/register' ? 'bg-coral-500 text-white' : 'bg-coral-300 text-coral-700'
            }`}
          >
            Register
          </Link>
          <Link
            to="/login"
            className={`px-4 py-2 rounded-lg ${
              location.pathname === '/login' ? 'bg-coral-500 text-white' : 'bg-coral-300 text-coral-700'
            }`}
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;