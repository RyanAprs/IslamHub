import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          email,
          name,
          password,
        }
      );
      if (response.data.status_code === 200) {
        navigate("/login");
        console.log("login berhasil");
        console.log(response.data.data);
      } else {
        console.log("login gagal");
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        console.log("No response received from server:", error.request);
      } else {
        console.log("Request error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 h-screen w-full md:h-[550px] md:w-[550px] flex flex-col justify-center p-8 rounded shadow-lg gap-10">
        <div className="flex justify-center">
          <h1 className="text-white text-3xl mb-4 font-semibold">Sign Up</h1>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center justify-center flex-col gap-2">
          <input
            type="text"
            placeholder="Name"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white w-full px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Register
          </button>
          <p className="text-white mt-3">
            already have an account?{" "}
            <Link className="underline text-blue-500" to="/login">
              SignIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
