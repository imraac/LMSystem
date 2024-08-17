import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../common/LoginModal';
import {
  FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaPython,
  FaNodeJs, FaDatabase, FaPhp, FaJava, FaDocker
} from 'react-icons/fa';
import { 
  SiRedux, SiTypescript, SiExpress, SiDjango, SiFlask, 
  SiRubyonrails, SiLaravel, SiSpring, SiKubernetes, SiRuby
} from 'react-icons/si';
import { Box, Text, Icon, useToast } from '@chakra-ui/react';

const icons = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: FaJsSquare,
  react: FaReact,
  redux: SiRedux,
  typescript: SiTypescript,
  'node.js': FaNodeJs,
  express: SiExpress,
  mongodb: FaDatabase,
  sql: FaDatabase,
  python: FaPython,
  django: SiDjango,
  flask: SiFlask,
  ruby: SiRuby,
  rails: SiRubyonrails,
  php: FaPhp,
  laravel: SiLaravel,
  java: FaJava,
  spring: SiSpring,
  docker: FaDocker,
  kubernetes: SiKubernetes,
};

function CategoryCard({ name }) {
  const { isAuthenticated, login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const IconComponent = icons[name.toLowerCase()] || FaReact;

  const handleClick = () => {
    if (isAuthenticated) {
      navigate(`/quiz/${name.toLowerCase()}`);
    } else {
      setShowModal(true);
    }
  };

  const handleLogin = async () => {
    try {
      await login();
      setShowModal(false);
      navigate(`/quiz/${name.toLowerCase()}`);
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: "Login failed",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSignUp = () => {
    setShowModal(false);
    navigate('/signup');
  };

  return (
    <>
      <Box 
        bg="white" 
        shadow="md" 
        rounded="lg" 
        p={6} 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        transition="transform 0.2s, box-shadow 0.2s" 
        _hover={{ transform: 'scale(1.05)', shadow: 'lg' }} 
        cursor="pointer"
        onClick={handleClick}
      >
        <Icon as={IconComponent} w={16} h={16} mb={2} color="gray.700" />
        <Text fontWeight="semibold" fontSize="lg" color="gray.800">{name}</Text>
      </Box>
      {showModal && (
        <LoginModal 
          onClose={() => setShowModal(false)}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
        />
      )}
    </>
  );
}

export default CategoryCard;