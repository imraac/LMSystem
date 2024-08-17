import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Spinner, VStack, Text, useToast } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import TechStack from '../../components/course/TechStack';
import LearningOutcomes from '../../components/course/LearningOutcomes';

const CourseVideo = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/courses/${courseId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const data = await response.json();
        setCourseData(data);
        setCompleted(localStorage.getItem(`course_${courseId}_completed`) === 'true');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleMarkAsComplete = () => {
    setCompleted(true);
    localStorage.setItem(`course_${courseId}_completed`, 'true');
    toast({
      title: "Course Completed!",
      description: "Great job on finishing the course!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" padding={4}>
        <Text color="red.500" fontWeight="bold">Error: {error}</Text>
      </Box>
    );
  }

  if (!courseData) {
    return (
      <Box textAlign="center" padding={4}>
        <Text color="gray.500">No course data available</Text>
      </Box>
    );
  }

  const videoId = courseData.video?.split('v=')[1];

  return (
    <Box maxWidth="8xl" margin="auto" padding={6}>
      <Button 
        color="#FF6247" 
        variant="link" 
        marginBottom={6} 
        fontSize="lg" 
        onClick={() => navigate(-1)}
      >
        ← Back to Courses
      </Button>

      <Heading as="h1" size="2xl" marginBottom={6}>{courseData.title}</Heading>

      {videoId ? (
        <Box bg="gray.100" borderRadius="lg" overflow="hidden" marginBottom={6}>
          <iframe
            width="900px"
            height="500px"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={courseData.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      ) : (
        <Box textAlign="center" padding={4}>
          <Text color="gray.500">No video available for this course</Text>
        </Box>
      )}

      <Button 
        backgroundColor={completed ? "green.500" : "#FF6247"} 
        color="white"
        size="lg" 
        width="full"
        onClick={handleMarkAsComplete}
        disabled={completed}
        marginBottom={8}
      >
        {completed ? "Completed!" : "Mark as Complete"}
      </Button>

      <VStack spacing={8} align="stretch">
        <TechStack techStack={courseData.techStack} />
        <LearningOutcomes 
          outcomes={courseData.whatYouWillLearn.map(text => ({ text }))} 
        />
      </VStack>
    </Box>
  );
};

export default CourseVideo;
