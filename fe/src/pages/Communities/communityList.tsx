import axios from "axios";
import { useEffect, useState } from "react";
import { FaBars, FaPlus, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [title, setTitle] = useState("");
  const [user_id, setUser_id] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
    if (userData) {
      setUser_id(userData.user_id);
      setName(userData.name);
    }
  }, []);

  useEffect(() => {
    fetchCommunities();
  }, []);

  useEffect(() => {
    const currentCommunityId = location.pathname.split("/")[2];
    setSelectedCommunityId(currentCommunityId);
  }, [location]);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/community"
      );
      setCommunities(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/community",
        {
          user_id,
          title,
          name,
        }
      );
      if (response.data.status_code === 200) {
        window.location.reload();
      } else {
        console.log("create community failed");
      }
    } catch (error) {
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
    <div className="relative">
      <div
        className={`overflow-y-auto ${
          isSidebarOpen
            ? "bg-gray-500 w-[200px] border-black border-[1px] p-2"
            : "bg-gray-200 w-0 p-0 border-0"
        } relative transition-all duration-300`}
      >
        {isSidebarOpen && (
          <>
            <div className="flex items-center justify-between p-4 bg-gray-500">
              <div
                onClick={toggleSidebar}
                className="cursor-pointer flex items-center justify-center"
              >
                <FaTimes size={20} />
              </div>
              <Link to="/community" className="font-bold text-xl">
                Communities
              </Link>
            </div>
            <div className="overflow-y-auto h-[500px] border-t-[2px] border-black">
              {communities.map((community) => {
                const isSelected =
                  community.community_id === selectedCommunityId;
                return (
                  <Link
                    to={`/community/${community.community_id}`}
                    key={community._id}
                    className={`flex p-3 rounded-xl transition-all mt-1 ${
                      isSelected ? "bg-gray-400" : "hover:bg-gray-400"
                    }`}
                    onClick={() =>
                      setSelectedCommunityId(community.community_id)
                    }
                  >
                    <h1>{community.title}</h1>
                  </Link>
                );
              })}
            </div>
            <button
              onClick={handleShowModal}
              className="absolute bg-gray-700 text-white hover:bg-gray-800 transition-all shadow-lg p-4 rounded-full bottom-5 right-4"
            >
              <FaPlus />
            </button>
            {showModal && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 flex flex-col gap-4 rounded-lg shadow-lg">
                  <div className="flex items-center justify-center">
                    <p>Create Community</p>
                  </div>
                  {user_id ? (
                    <div className="flex items-center justify-center flex-col gap-2">
                      <div className="text-red-500">{error}</div>
                      <input
                        type="text"
                        placeholder="Community Name"
                        className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <div className="flex gap-4 justify-center mt-4">
                        <button
                          onClick={closeModal}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleCreate}
                          className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700 transition-colors duration-300"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-5 items-center">
                      <h4>Login to create a community</h4>
                      <Link
                        to="/login"
                        className="bg-gray-400 px-3 py-2 rounded"
                      >
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="top-32 fixed left-0 bg-gray-700 text-white px-2 py-2 rounded-r-full z-50 transition-all duration-300"
        >
          <FaBars />
        </button>
      )}
    </div>
  );
};

export default CommunityList;
