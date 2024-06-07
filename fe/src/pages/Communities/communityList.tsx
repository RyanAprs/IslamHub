import axios from "axios";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);

  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  return (
    <div className="relative">
      <div
        className={`overflow-y-auto min-h-screen ${
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
                      isSelected ? "bg-blue-400" : "hover:bg-blue-400"
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
          </>
        )}
      </div>
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="top-32 fixed left-0 bg-blue-700 text-white p-4  rounded-r-full z-50 transition-all duration-300"
        >
          <FaBars />
        </button>
      )}
    </div>
  );
};

export default CommunityList;
