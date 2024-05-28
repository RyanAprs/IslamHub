import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./config/context/authContext.tsx";
import { AdminAuthContextProvider } from "./config/context/adminAuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <AdminAuthContextProvider>
        <App />
      </AdminAuthContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
