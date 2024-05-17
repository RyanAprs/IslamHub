import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const location = useLocation();

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

  return (
    <div className="min-h-screen overflow-y-auto w-[200px] bg-gray-500 border-black border-[1px] p-2 relative">
      <div className="flex items-center justify-center p-4 bg-gray-500">
        <Link to="/community" className="font-bold text-xl border-b-2 border-black w-full">
          Communities
        </Link>
      </div>
      {communities.map((community) => {
        const isSelected = community.community_id === selectedCommunityId;
        return (
          <Link
            to={`/community/${community.community_id}`}
            key={community._id}
            className={`flex p-3 rounded-xl transition-all mt-1 ${
              isSelected ? "bg-gray-400" : "hover:bg-gray-400"
            }`}
            onClick={() => setSelectedCommunityId(community.community_id)}
          >
            <h1>{community.title}</h1>
          </Link>
        );
      })}
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
            <div className="flex items-center justify-center flex-col gap-2">
              <input
                type="text"
                placeholder="Community Name"
                className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
                // value={name}
                // onChange={(e) => setName(e.target.value)}
              />
              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={closeModal}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  // onClick={confirmDelete}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700 transition-colors duration-300"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityList;
