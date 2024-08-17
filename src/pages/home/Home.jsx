import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import HeroSection from '../../components/home/HeroSection';
import RecommendedSection from '../../components/home/RecommendedSection';
import LabsSection from '../../components/home/LabsSection';
import '../../index.css'; 

function Home() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-custom">
          <h2 className="text-5xl font-semibold text-gray-900">
            Hi, {user ? user.username : 'Student'} 👋🏽
          </h2>
        </div>
      </header>
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
        <RecommendedSection courses={courses} searchTerm={searchTerm} />
        {!searchTerm && <LabsSection />}
      </main>
    </div>
  );
}

export default Home;