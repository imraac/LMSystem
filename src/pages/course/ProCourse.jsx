import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Box, Center, Text } from "@chakra-ui/react";
import ProCoursesList from "../../components/course/ProCoursesList";

function ProCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/courses/pro");
        // Set the response data into courses state
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError(
          "An error occurred while fetching courses. Please try again later."
        );
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
    <Box bg="gray.50" minH="100vh" py={16} px={4}>
      <Box maxW="7xl" mx="auto">
        <Text
          fontSize="5xl"
          fontWeight="extrabold"
          color="gray.900"
          textAlign="center"
          mb={4}
        >
          Pro Courses
        </Text>
        <Text
          color="gray.600"
          textAlign="center"
          mb={16}
          fontSize="lg"
          fontWeight="medium"
        >
          Challenging multi-step experiences with quizzes and progress-tracking
        </Text>
        <ProCoursesList courses={courses} />
      </Box>
    </Box>
  );
}

export default ProCourse;
