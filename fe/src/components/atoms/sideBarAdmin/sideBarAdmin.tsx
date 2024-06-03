import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const SideBarAdmin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

  return (
    <div className="relative min-h-screen">
      <div
        className={`overflow-y-auto ${
          isSidebarOpen
            ? "bg-blue-500 w-[200px] border-black border-[1px] p-2"
            : "bg-blue-200 w-0 p-0 border-0"
        } relative transition-all duration-300`}
      >
        {isSidebarOpen && (
          <>
            <div className="flex items-center justify-between p-4 bg-blue-500">
              <div
                onClick={toggleSidebar}
                className="cursor-pointer flex items-start justify-start"
              >
                <FaTimes size={20} />
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="font-bold text-xl flex flex-col justify-center items-center gap-2 ">
                {user && user.image !== null ? (
                  <div>
                    <img
                      src={`http://localhost:3000/${user.image}`}
                      alt="profile picture"
                      className=" flex items-center justify-center w-[80px] h-[100px] bg-white shadow-lg object-cover mt-3 border-black rounded-full"
                    />
                  </div>
                ) : (
                  <div className="relative w-[100px] h-[100px] bg-white  shadow-lg object-cover mt-3 border-black rounded-full flex justify-center items-center">
                    <FaUser
                      size={50}
                      className="absolute md:relative w-[50px] h-[50px]"
                    />
                  </div>
                )}
                <div>{user && user.name}</div>
              </div>
              <div className="overflow-y-auto h-screen border-black">
                <Link
                  to="/admin/dashboard"
                  className={`flex p-3 rounded-xl transition-all mt-1 hover:bg-blue-400 ${
                    location.pathname === "/admin/dashboard"
                      ? "bg-blue-400"
                      : ""
                  }`}
                >
                  <h1>Dashboard</h1>
                </Link>
                <Link
                  to="/admin/dashboard/users"
                  className={`flex p-3 rounded-xl transition-all mt-1 hover:bg-blue-400 ${
                    location.pathname === "/admin/dashboard/users"
                      ? "bg-blue-400"
                      : ""
                  }`}
                >
                  <h1>Users</h1>
                </Link>
                <Link
                  to=""
                  className={`flex p-3 rounded-xl transition-all mt-1 hover:bg-blue-400 ${
                    location.pathname === "/admin/dashboard/communities"
                      ? "bg-blue-400"
                      : ""
                  }`}
                >
                  <h1>Communities</h1>
                </Link>
                <Link
                  to=""
                  className={`flex p-3 rounded-xl transition-all mt-1 hover:bg-blue-400 ${
                    location.pathname === "/admin/dashboard/videos"
                      ? "bg-blue-400"
                      : ""
                  }`}
                >
                  <h1>Videos</h1>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="top-8 fixed left-0 bg-blue-700 text-white p-4  rounded-r-full z-50 transition-all duration-300"
        >
          <FaBars />
        </button>
      )}
    </div>
  );
};

export default SideBarAdmin;
