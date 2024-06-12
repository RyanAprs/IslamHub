import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "./config/context/authContext.tsx";
import { AdminAuthContextProvider } from "./config/context/adminAuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminAuthContextProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </AdminAuthContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
