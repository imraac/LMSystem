import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaAngleRight } from 'react-icons/fa';

const EnrolledCourses = () => {
  const [courseCount, setCourseCount] = useState(0);

  useEffect(() => {
    const fetchCourseCount = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/courses/count');
        setCourseCount(response.data.count);
      } catch (error) {
        console.error('Error fetching course count:', error);
      }
    };

    fetchCourseCount();
  }, []);

  return (
    <section className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Enrolled Courses</h2>
      <div className="bg-[#FFF2F1] p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {courseCount} {courseCount === 1 ? 'course' : 'courses'} enrolled
        </h3>
        {courseCount === 0 ? (
          <p className="text-gray-600">You are not enrolled in any courses.</p>
        ) : (
          <a
            href="/all-courses" 
            className="text-primary hover:text-primary-dark font-medium flex items-center"
          >
            View all courses <FaAngleRight className="ml-2" />
          </a>
        )}
      </div>
    </section>
  );
};

export default EnrolledCourses;
