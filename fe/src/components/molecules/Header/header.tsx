import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Header: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getUserDataFromCookie = () => {
      const cookieData = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userData="));

      if (cookieData) {
        const userDataString = cookieData.split("=")[1];
        try {
          const userData = JSON.parse(decodeURIComponent(userDataString));
          return userData;
        } catch (error) {
          console.error("Error parsing JSON from cookie:", error);
          return null;
        }
      } else {
        return null;
      }
    };

    const userData = getUserDataFromCookie();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    const now = new Date();

    const expiresDate = new Date(now.getTime() + 24 * 60 * 60 * 100);

    const expiresUTC = expiresDate.toUTCString();
    document.cookie = `userData=; expires=${expiresUTC}; path=/;`;

    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-gray-800 text-white">
      <div>
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">
            Ryan<span className="text-gray-500">Blogs</span>
          </h1>
        </Link>
      </div>
      <nav className="text-lg text-white hidden gap-8 font-bold md:flex">
        <Link to="/" className="hover:text-gray-500 transition-all">
          <h1>Home</h1>
        </Link>
        <Link to="/blog" className="hover:text-gray-500 transition-all">
          <h1>Blogs</h1>
        </Link>
        <Link to="/contact" className="hover:text-gray-500 transition-all">
          <h1>Contact</h1>
        </Link>
      </nav>

      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center">
          {user && user.name && <p className="mr-2">{user.name}</p>}
          {user && user.image !== null && (
            <button onClick={toggleDropdown}>
              <img
                src={`http://localhost:3000/${user.image}`}
                alt="user image"
                className="h-[40px] w-[40px] object-cover rounded-full bg-gray-200"
              />
            </button>
          )}
          {!user ||
            (user.image === null && (
              <button
                onClick={toggleDropdown}
                className="cursor-pointer p-3 bg-gray-200 rounded-full"
              >
                <FaUser className="text-black " />
              </button>
            ))}
          {!user && (
            <button
              onClick={toggleDropdown}
              className="cursor-pointer p-3 bg-gray-200 rounded-full"
            >
              <FaUser className="text-black " />
            </button>
          )}
        </div>
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg">
            {user ? (
              <div className="flex flex-col">
                <Link
                  to={`/profile/${user.user_id}`}
                  className="px-6 py-2 block w-full text-left text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <nav className="text-left block md:hidden">
                  <Link
                    to="/blog"
                    className="px-6 py-2 block w-full text-gray-800 hover:bg-gray-200"
                  >
                    <h1>Blogs</h1>
                  </Link>
                  <Link
                    to="/contact"
                    className="px-6 py-2 block w-full text-gray-800 hover:bg-gray-200"
                  >
                    <h1>Contact</h1>
                  </Link>
                </nav>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 block w-full text-left text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col">
                <Link
                  to="/login"
                  className="block w-full text-left px-2 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Login
                </Link>
                <nav className="text-left block md:hidden">
                  <Link
                    to="/blog"
                    className="px-2 py-2 block w-full text-gray-800 hover:bg-gray-200"
                  >
                    <h1>Blogs</h1>
                  </Link>
                  <Link
                    to="/contact"
                    className="px-2 py-2 block w-full text-gray-800 hover:bg-gray-200"
                  >
                    <h1>Contact</h1>
                  </Link>
                </nav>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
