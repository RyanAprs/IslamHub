import axios from "axios";
import { useEffect, useState } from "react";
import { FaPen, FaTrash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import BackButton from "../../components/atoms/backButton/backButton";

const DetailVideo = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [userVideoId, setUserVideoId] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);

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
        console.log(response.data.data);
        setVideo(response.data.data.video);
        setUserVideoId(response.data.data.user_video_id);
        setUserImage(response.data.data.user_image);
        setTitle(response.data.data.title);
        setName(response.data.data.name);
        setDescription(response.data.data.description);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideoById();
  }, [id]);

  return (
    <div className="min-h-screen pt-[100px] md:pt-[100px] bg-main-gradient flex flex-col md:p-2">
      <div className="flex md:px-4 px-1">
        <BackButton path="/video" />
      </div>
      <div className="md:px-4 px-1 flex flex-col gap-3">
        <div className="flex items-center justify-center">
          {video ? (
            <video
              className="md:h-[500px] h-[250px] w-full md:w-[1000px] object-fill  rounded border-gray-400 shadow-md border-[2px]"
              controls
            >
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>Loading video...</p>
          )}
        </div>
        <div className="px-4 md:px-24">
          <h1 className="md:text-3xl text-2xl font-bold">{title}</h1>
          <p className="text-md">{description}</p>

          <Link
            to={`/profile/${userVideoId}`}
            className="flex gap-3 mb-3 items-center py-2 w-max"
          >
            <div className="flex gap-1 mb-3 items-center">
              <p className="rounded-full bg-slate-300 border-black border-[1px]">
                {userImage ? (
                  <img
                    src={`http://localhost:3000/${userImage}`}
                    alt="user image"
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                ) : (
                  <FaUser className="text-black rounded-full w-[50px] h-[50px] object-cover" />
                )}
              </p>
              <p className="text-lg font-bold uppercase">{name}</p>
            </div>
          </Link>
        </div>
      </div>
      {(user && user.user_id !== userVideoId) || !user ? null : (
        <div className="flex justify-center items-center gap-4 p-4">
          <Link
            to=""
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 flex gap-2 items-center"
          >
            <FaTrash />
            Delete
          </Link>
          <Link
            to={`/blog/update/${id}`}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300 flex gap-2 items-center"
          >
            <FaPen />
            Update
          </Link>
        </div>
      )}
      <div className="p-4 rounded mt-4">{/* <CommentSection /> */}</div>
    </div>
  );
};

export default DetailVideo;
