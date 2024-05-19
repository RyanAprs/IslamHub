import { useParams } from "react-router-dom";
import CommunityList from "./communityList";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaEllipsisV, FaUsers, FaWindowRestore } from "react-icons/fa";
import ChatSection from "../../components/atoms/chatSection/chatSection";

const DetailCommunity = () => {
  const [image, setImage] = useState();
  const [communityTitle, setCommunityTitle] = useState("");
  const [admin, setAdmin] = useState();
  const [adminId, setAdminId] = useState();
  const [user_id, setUser_id] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeteleModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [error, setError] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState();

  const { id } = useParams();

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
    const fetchCommunityById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/community/${id}`
        );
        setCommunityTitle(response.data.data.title);
        setAdmin(response.data.data.name);
        setAdminId(response.data.data.user_id);
        setImage(response.data.data.image);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCommunityById();
  }, [id]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(true);
    setShowModal(false);
  };

  const handleUpdatModal = () => {
    setShowUpdateModal(true);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setShowUpdateModal(false);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/community/${id}`
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Request error:", error.message);
    } finally {
      setShowModal(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", communityTitle);
      formData.append("name", name);
      formData.append("user_id", user_id);
      formData.append("image", image);

      const response = await axios.put(
        `http://localhost:3000/api/v1/community/${id}`,
        formData
      );
      if (response.data.status_code === 200) {
        window.location.reload();
      } else {
        console.log("Update community gagal");
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
  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex pt-[115px] min-h-screen">
      <CommunityList />
      <div className="flex flex-col w-full">
        <nav className="bg-blue-500 h-15 w-full border-black border-[1px]">
          <div className="flex px-3 items-center justify-between">
            <div className="flex items-center pl-2">
              {image !== null ? (
                <button>
                  <img
                    src={`http://localhost:3000/communityImage/${image}`}
                    alt="user image"
                    className="h-[40px] w-[40px] object-cover rounded-full bg-gray-200"
                  />
                </button>
              ) : (
                <button className="cursor-pointer h-[40px] w-[40px] flex items-center p-3 bg-gray-200 rounded-full">
                  <FaUsers size={40} className="text-black" />
                </button>
              )}
              <div className="p-4 text-white">{communityTitle}</div>
            </div>
            {adminId === user_id ? (
              <button
                onClick={handleShowModal}
                className="flex items-center justify-between pr-4"
              >
                <FaEllipsisV />
              </button>
            ) : (
              ""
            )}
          </div>
        </nav>
        <ChatSection admin={admin} />
      </div>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 flex flex-col gap-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-center flex-col gap-2">
              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={handleUpdatModal}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
                >
                  Update
                </button>
                <button
                  onClick={handleDeleteModal}
                  className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700 transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeteleModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <p>Are you sure want to delete this community?</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition-colors duration-300"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 flex flex-col gap-2 rounded-lg shadow-lg">
            <div className="flex items-center justify-center">
              <p>Update Community</p>
            </div>
            <div className="flex items-center justify-center flex-col gap-2">
              <div className="text-red-500">{error}</div>
              <input
                type="text"
                placeholder="Community Name"
                className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
                value={communityTitle}
                onChange={(e) => setCommunityTitle(e.target.value)}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="mb-4 max-w-[150px]"
                />
              )}
              {!imagePreview && (
                <img
                  src={`http://localhost:3000/communityImage/${image}`}
                  alt="Image Preview"
                  className="mb-4 max-w-[150px]"
                />
              )}
              <input
                type="file"
                placeholder="Image"
                className="border-2 border-gray-300 rounded p-3 w-full"
                onChange={onImageUpload}
              />
              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={closeModal}
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-3 py-2 rounded mr-2 hover:bg-green-700 transition-colors duration-300"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCommunity;
