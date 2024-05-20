import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaPlus, FaUsers } from "react-icons/fa";

const Chat = () => {
  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [user_id, setUser_id] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

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

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/community"
      );
      setCommunities(response.data.data);
      console.log(response.data.data);
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

  const search = async (q) => {
    try {
      if (q.length > 0) {
        const response = await axios.get(
          `http://localhost:3000/api/v1/community/search`,
          {
            params: {
              query: q,
            },
          }
        );
        setCommunities(response.data.data);
        console.log(response.data.data);
      } else if (q.length === 0) {
        fetchCommunities();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CommunityList = () => (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3  grid-cols-1 gap-3  text-black  justify-center">
        {communities.map((community, index) => (
          <Link
            to={`/community/${community.community_id}`}
            key={index}
            className="shadow-lg cursor-pointer bg-gray-300 p-4 flex flex-col items-start rounded-xl max-h-auto border-gray-400 border-[2px]"
          >
            {community && community.image !== null ? (
              <img
                className="h-[200px] w-full object-cover rounded border-gray-400 shadow-md border-[2px]"
                src={`http://localhost:3000/communityImage/${community.image}`}
                alt="community image"
              />
            ) : (
              <div className="h-[200px] flex justify-center items-center w-full object-cover rounded border-gray-400 shadow-md border-[2px]">
                <FaUsers size={200} />
              </div>
            )}
            <hr className="mt-3" />

            <div className="flex gap-2 items-start justify-start">
              <div className="">
                <div>
                  <h1 className="text-2xl uppercase ">{community.title}</h1>
                </div>
                <div>{community.name} - 2 days ago</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="px-4 py-20 flex bg-main-gradient pt-[140px] flex-col gap-8 min-h-screen">
        <div className="flex justify-center items-center ">
          <div className=" rounded-full flex items-center justify-center border-black border-2">
            <input
              type="text"
              placeholder="Cari Komunitas..."
              className="border-none py-4 pl-4  border-black w-[454px] h-[71px] focus:outline-none text-black  rounded-full"
              onChange={({ target }) => search(target.value)}
            />
          </div>
        </div>

        <div>
          {Array.isArray(communities) && communities.length > 0 ? (
            <CommunityList />
          ) : (
            <div className="min-h-screen flex justify-center">
              <h1>No Community Posted</h1>
            </div>
          )}
        </div>
        <button
          onClick={handleShowModal}
          className="absolute bg-blue-700 text-white hover:bg-blue-800 transition-all shadow-lg p-4 rounded-full bottom-5 right-4"
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
                  <Link to="/login" className="bg-blue-400 px-3 py-2 rounded">
                    Login
                  </Link>
                  <button
                    onClick={closeModal}
                    className="bg-red-600 px-3 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
