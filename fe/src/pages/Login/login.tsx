import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../config/hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 h-screen w-full md:h-[550px] md:w-[550px] flex flex-col justify-center p-8 rounded shadow-lg gap-10">
        <div className="flex justify-center">
          <h1 className="text-white text-3xl mb-4 font-semibold">Sign In</h1>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={handleLogin}
          className="login flex items-center justify-center flex-col gap-2"
        >
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
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Login
          </button>
          <div className="flex flex-col items-center gap-3 p-3">
            <Link
              className="hover:underline text-blue-500 "
              to="/reset-password"
            >
              Lost password?
            </Link>
            <p className="text-white">
              do not have an account?{" "}
              <Link className="underline text-blue-500" to="/register">
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
