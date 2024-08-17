import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import RegistrationForm from "../../components/user/RegistrationForm";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
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
    <RegistrationForm
      username={username}
      setUsername={setUsername}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      role={role}
      setRole={setRole}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      error={error}
      success={success}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;
