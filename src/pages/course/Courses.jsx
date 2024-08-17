import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Box, Center, Text } from '@chakra-ui/react';
import CoursesList from '../../components/course/CoursesList';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/courses');
        const activeCourses = response.data.filter(course => !course.isArchived); // Filter out archived courses
        setCourses(activeCourses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('An error occurred while fetching courses. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center minH="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box bg="gray.50" minH="100vh" py={16} px={4} sm={{ px: 6 }} lg={{ px: 8 }}>
      <Box maxW="7xl" mx="auto">
        <Text fontSize="5xl" fontWeight="extrabold" color="gray.900" textAlign="center" mb={4}>
          Courses
        </Text>
        <Text color="gray.600" textAlign="center" mb={16} fontSize="lg" fontWeight="medium">
          Challenging multi-step experiences with quizzes and progress-tracking
        </Text>
        <CoursesList courses={courses} />
      </Box>
    </Box>
  );
};

export default Courses;
