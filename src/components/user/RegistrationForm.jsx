import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Select,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import { useNavigate } from "react-router-dom";

const colorScheme = "#FF6247";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();


  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
 
    setPasswordStrength(newPassword.length > 8 ? "Strong" : "Weak");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        toast({
          title: "Registration Successful",
          description: data.message || "You have successfully registered.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
      toast({
        title: "Registration Failed",
        description: err.message || "An error occurred during registration.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormControl isRequired isInvalid={!!error}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          _focus={{
            borderColor: colorScheme,
            boxShadow: `0 0 0 1px ${colorScheme}`,
          }}
        />
      </FormControl>
      <FormControl isRequired isInvalid={!!error}>
        <FormLabel htmlFor="email">Email Address</FormLabel>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          _focus={{
            borderColor: colorScheme,
            boxShadow: `0 0 0 1px ${colorScheme}`,
          }}
        />
      </FormControl>
      <FormControl isRequired isInvalid={!!error}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <InputGroup>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange} 
            placeholder="Enter your password"
            _focus={{
              borderColor: colorScheme,
              boxShadow: `0 0 0 1px ${colorScheme}`,
            }}
          />
          <InputRightElement>
            <Button
              variant="link"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              color={colorScheme}
            >
              {showPassword ? (
                <ViewOffIcon color={colorScheme} />
              ) : (
                <ViewIcon color={colorScheme} />
              )}
            </Button>
          </InputRightElement>
        </InputGroup>
        <PasswordStrengthIndicator password={password} />
      </FormControl>
      <FormControl isRequired isInvalid={!!error}>
        <FormLabel htmlFor="role">Role</FormLabel>
        <Select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          _focus={{
            borderColor: colorScheme,
            boxShadow: `0 0 0 1px ${colorScheme}`,
          }}
        >
          <option value="">Select your role</option>
          <option value="student">Student</option>
        </Select>
      </FormControl>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      {success && <p className="text-green-600">{success}</p>}
      <Button
        type="submit"
        backgroundColor={colorScheme}
        _hover={{ backgroundColor: "#FF3B30" }}
        color="white"
        width="full"
      >
        Register
      </Button>
    </form>
  );
};

export default RegistrationForm;
