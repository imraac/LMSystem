import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from '../../components/user/LoginForm';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      toast({
        title: 'Validation Error',
        description: 'Please fill in both email and password.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    if (!email || !password) {
      setError('Email and password are required.');
      toast({
        title: 'Validation Error',
        description: 'Please fill in both email and password.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await login(data.user, data.access_token);
        toast({
          title: 'Login successful.',
          description: "You have been successfully logged in.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate(data.user.role === 'admin' ? "/admin-dashboard" : "/home");
      } else {
        setError(data.message || 'Login failed. Please try again.');
        toast({
          title: 'Login Failed',
          description: data.message || 'Login failed. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  );
}

export default Login;