import axios from "axios";
import { useEffect, useState } from "react";
import { FaPen, FaTrash, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BackButton from "../../components/atoms/backButton/backButton";
import { formatDistanceToNow, parseISO } from "date-fns";
import { storage } from "../../firebase";
import { ref, deleteObject } from "firebase/storage";

const DetailVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [userVideoId, setUserVideoId] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const [createdAt, setCreatedAt] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchVideoById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/video/${id}`
        );
        setVideo(response.data.data.video);
        setUserVideoId(response.data.data.user_video_id);
        setUserImage(response.data.data.user_image);
        setTitle(response.data.data.title);
        setName(response.data.data.name);
        setDescription(response.data.data.description);
        setCreatedAt(response.data.data.createdAt);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideoById();
  }, [id]);

  const handleDelete = async () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const videoRef = ref(storage, video);
      await deleteObject(videoRef);

      const response = await axios.delete(
        `http://localhost:3000/api/v1/video/${id}`
      );
      if (response.status === 200) {
        navigate("/video");
      }
    } catch (error) {
      console.log("Request error:", error.message);
    } finally {
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen pt-[100px] md:pt-[100px] bg-main-gradient flex flex-col md:p-2">
      <div className="flex md:px-4 px-1">
        <BackButton path="/video" />
      </div>
      <div className="md:px-4 px-1 flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center">
            {video ? (
              <video
                className="md:h-[500px] h-[250px] w-full md:w-[1000px] object-fill rounded border-gray-400 shadow-md border-[2px]"
                controls
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Loading video...</p>
            )}
          </div>
          <div className=" px-4 md:px-24 flex flex-col gap-5">
            <div>
              <div>
                <div className="md:text-3xl text-2xl font-bold">{title}</div>
                <div>
                  {createdAt ? (
                    <p>{formatDistanceToNow(parseISO(createdAt))} ago</p>
                  ) : (
                    <p>Loading date...</p>
                  )}
                </div>
              </div>
              <div className="text-md">
                {showFullDescription
                  ? description
                  : description.length > 50
                  ? `${description.slice(0, 20)}...`
                  : description}
                {description.length > 50 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-500 ml-2"
                  >
                    {showFullDescription
                      ? "tampilkan lebih sedikit"
                      : "Lainnya"}
                  </button>
                )}
              </div>
            </div>
            <Link
              to={`/profile/${userVideoId}`}
              className="flex gap-3 mb-3 items-center py-2 w-max"
            >
              <div className="flex gap-5 mb-3 items-center">
                <div className="rounded-full bg-slate-300 border-black border-[1px]">
                  {userImage ? (
                    <img
                      src={`http://localhost:3000/${userImage}`}
                      alt="user image"
                      className="rounded-full w-[50px] h-[50px] object-cover"
                    />
                  ) : (
                    <FaUser className="text-black rounded-full w-[50px] h-[50px] object-cover" />
                  )}
                </div>
                <div className="text-lg font-bold uppercase">{name}</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {(user && user.user_id !== userVideoId) || !user ? null : (
        <div className="flex justify-center items-center gap-4 p-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 flex gap-2 items-center"
          >
            <FaTrash />
            Delete
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300 flex gap-2 items-center">
            <FaPen />
            Update
          </button>
        </div>
      )}
      {/* <div className="p-4 rounded mt-4"><CommentSection /></div> */}

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this blog?</p>
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
    </div>
  );
};

export default DetailVideo;
