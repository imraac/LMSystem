import React, { useState, useEffect } from 'react';
import SemesterSelector from '../../components/dashboards/results/SemesterSelector';
import SubjectCard from '../../components/dashboards/results/SubjectCard';
import axios from 'axios';

const Results = () => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [resultsData, setResultsData] = useState([]);

  useEffect(() => {
    // Fetch all quiz results from the backend
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get-all-quiz-results');
        setResultsData(response.data);
        if (response.data.length > 0) {
          setSelectedSemester(response.data[0].category); // Set the first result's category as the selected semester
        }
      } catch (error) {
        console.error('Error fetching quiz results:', error);
      }
    };

    fetchResults();
  }, []);

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const renderResults = () => {
    const semesterData = resultsData.filter((result) => result.category === selectedSemester);
    return semesterData.length > 0 ? (
      semesterData.map((subject, index) => (
        <SubjectCard key={index} subject={subject} />
      ))
    ) : (
      <p>No results available for this category.</p>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-[#FF6247] text-white p-6 rounded-b-lg shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Results</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">View All Quiz Results</h2>
          <p className="mt-2 text-gray-600">Check the quiz results for all categories.</p>
          <SemesterSelector
            semesters={resultsData.map((result) => ({ semester: result.category }))}
            selectedSemester={selectedSemester}
            onSemesterChange={handleSemesterChange}
          />
          <div className="mt-6">
            {renderResults()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Results;
