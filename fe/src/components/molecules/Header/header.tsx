import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";

const Header: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [userImage, setUserImage] = useState("");
  const [userId, setUserId] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    const userCookie = Cookies.get("userData");

    if (userCookie) {
      const userDataObj = JSON.parse(userCookie);
      setUser(userDataObj);
      setUserId(userDataObj.user_id);
    }
  }, []);

  useEffect(() => {
    getUserDetail();
  }, [userId]);

  const getUserDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/${userId}`
      );
      setUserImage(response.data.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    const now = new Date();

    const expiresDate = new Date(now.getTime() + 24 * 60 * 60 * 100);

    const expiresUTC = expiresDate.toUTCString();
    document.cookie = `userData=; expires=${expiresUTC}; path=/;`;

    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header
      className={`fixed font-poppins top-0 left-0 right-0 z-50 flex justify-between items-center py-4 md:py-4 px-5 md:px-10 text-black shadow-lg transition-colors duration-300 ${
        isScrolled ? "bg-blue-600" : "bg-transparent"
      }`}
    >
      <div className="font-poppins text-[24px] text-black">
        <Link to="/" className="font-bold">
          IslamHub
        </Link>
      </div>
      <div className="flex gap-16 items-center text-[24px]">
        <div className="text-lg text-black hidden gap-16 font-bold md:flex">
          <Link
            to="/"
            className={`hover:text-gray-500 transition-all ${
              location.pathname === "/" ? "text-white" : ""
            }`}
          >
            <h1>Home</h1>
          </Link>
          <Link
            to="/video"
            className={`hover:text-gray-500 transition-all ${
              location.pathname === "/video" ? "text-white" : ""
            }`}
          >
            <h1>Videos</h1>
          </Link>
          <Link
            to="/community"
            className={`hover:text-gray-500 transition-all ${
              location.pathname === "/community" ? "text-white" : ""
            }`}
          >
            <h1>Communities</h1>
          </Link>
          <Link
            to="/contact"
            className={`hover:text-gray-500 transition-all ${
              location.pathname === "/contact" ? "text-white" : ""
            }`}
          >
            <h1>Contact</h1>
          </Link>
        </div>

        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-4">
            {user && user.name && (
              <p className="font-bold text-[20px]">{user.name}</p>
            )}
            {user && userImage !== null ? (
              <button onClick={toggleDropdown}>
                <img
                  src={userImage}
                  alt="user image"
                  className="h-[50px] w-[50px] object-cover rounded-full bg-gray-200"
                />
              </button>
            ) : (
              <button
                onClick={toggleDropdown}
                className="cursor-pointer p-3 bg-gray-200 rounded-full"
              >
                <FaUser className="text-black" />
              </button>
            )}
          </div>
          {isOpen && (
            <div className="absolute top-full right-0 mt-2 bg-blue-500 border border-blue-300 rounded-xl shadow-lg">
              {user ? (
                <div className="flex flex-col">
                  <Link
                    to={`/profile/${user.user_id}`}
                    className="px-6 py-2 block w-full text-left text-black hover:bg-blue-400"
                  >
                    Profile
                  </Link>
                  <nav className="text-left block md:hidden">
                    <Link
                      to="/video"
                      className="px-6 py-2 block w-full text-black hover:bg-blue-400"
                    >
                      <h1>Videos</h1>
                    </Link>
                    <Link
                      to="/community"
                      className="px-6 py-2 block w-full text-black hover:bg-blue-400"
                    >
                      <h1>Communities</h1>
                    </Link>
                    <Link
                      to="/contact"
                      className="px-6 py-2 block w-full text-black hover:bg-blue-400"
                    >
                      <h1>Contact</h1>
                    </Link>
                  </nav>
                  <button
                    onClick={handleLogout}
                    className="px-6 py-2 block w-full text-left text-black hover:bg-blue-400"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col">
                  <Link
                    to="/login"
                    className="block w-full text-left px-2 py-2 text-black hover:bg-blue-400"
                  >
                    Login
                  </Link>
                  <nav className="text-left block md:hidden">
                    <Link
                      to="/community"
                      className="px-2 py-2 block w-full text-black hover:bg-blue-400"
                    >
                      <h1>Communities</h1>
                    </Link>
                    <Link
                      to="/video"
                      className="px-2 py-2 block w-full text-black hover:bg-blue-400"
                    >
                      <h1>Videos</h1>
                    </Link>
                  </nav>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
