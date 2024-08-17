// pages/Labs.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/labs/SearchBar';
import CategoryGrid from '../../components/labs/CategoryGrid';

function Labs() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-4">LABS</h1>
        </div>
        <p className="text-gray-600 text-center mb-16 text-lg font-medium">Test Your Knowledge with Quizzes</p>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <h2 className="text-2xl font-semibold mt-12 mb-6 text-gray-800">Categories</h2>
        <CategoryGrid searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default Labs;