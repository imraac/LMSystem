import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext"; 
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </AuthProvider>
  </React.StrictMode>
);
