import { useState } from "react";
import { Link } from "react-router-dom";
import { useAdminLogin } from "../../config/hooks/useAdminLogin";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAdminLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="min-h-screen bg-main-gradient flex flex-col items-center justify-center p-8 gap-5">
      <div className="font-poppins gap-2 flex flex-col items-center text-center p-4">
        <div className="font-bold text-[24px]">IslamHub</div>
        <div className="text-red-500 font-bold text-[18px]">Admin Only</div>
        <div className="border-blue-600 border-2 w-full md:w-[556px] flex flex-col justify-center p-10 rounded-xl shadow-lg gap-10 bg-white">
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleLogin} className="login flex flex-col gap-2">
            <div>
              <label htmlFor="email" className="font-bold">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="border-[1px] border-blue-500 bg-transparent rounded-xl p-4 mb-4 w-full mt-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="font-bold">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="border-[1px] border-blue-500 bg-transparent rounded-xl p-4 mb-4 w-full mt-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-black">
                Belum punya akun?{" "}
                <Link className="text-blue-600" to="/register">
                  Daftar
                </Link>
              </div>
              <Link className="text-blue-600" to="/reset-password">
                Lupa password?
              </Link>
            </div>
            <div className="flex flex-col md:items-end items-center mt-3">
              <button
                disabled={isLoading}
                className={`bg-blue-600 text-black font-bold px-4 py-2 w-[192px] h-[60px] rounded-xl hover:bg-blue-700 transition-colors duration-300 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Loading..." : "Masuk"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
