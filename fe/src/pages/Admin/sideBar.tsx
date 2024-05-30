import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
                className="cursor-pointer flex items-center justify-center"
              >
                <FaTimes size={20} />
              </div>
              <div className="font-bold text-xl justify-center items-center ">Admin</div>
            </div>
            <div className="overflow-y-auto h-screen border-t-[2px] border-black">
              <Link
                to=""
                className="flex p-3 rounded-xl transition-all mt-1 hover:bg-blue-400"
              >
                <h1>Users</h1>
              </Link>
              <Link
                to=""
                className="flex p-3 rounded-xl transition-all mt-1 hover:bg-blue-400"
              >
                <h1>Communities</h1>
              </Link>
              <Link
                to=""
                className="flex p-3 rounded-xl transition-all mt-1 hover:bg-blue-400"
              >
                <h1>Videos</h1>
              </Link>
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

export default SideBar;
