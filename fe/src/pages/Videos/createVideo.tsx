import axios from "axios";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/atoms/backButton/backButton";

const CreateVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user_video_id, setUser_video_id] = useState("");
  const [video, setVideo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      setUser_video_id(userData.user_id);
    }
  }, []);

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("user_video_id", user_video_id);
      formData.append("video", video);

      const response = await axios.post(
        "http://localhost:3000/api/v1/video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status_code === 200) {
        navigate(`/profile/${id}`);
        console.log(response.data.data);
        console.log("create video berhasil");
      } else {
        console.log("create video gagal");
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        console.log("No response received from server:", error.request);
      } else {
        console.log("Request error:", error.message);
      }
    }
  };

  //   const onImageUpload = (e) => {
  //     const file = e.target.files[0];
  //     setImage(file);
  //     setImagePreview(URL.createObjectURL(file));
  //   };

  return (
    <div className="flex flex-col items-center gap-8  justify-center pt-[140px]">
      <div className="text-[36px] font-bold">Create Video</div>
      <div className=" w-full flex flex-col justify-center  px-8 rounded shadow-lg gap-10">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center justify-center flex-col gap-2">
          <input
            type="text"
            placeholder="Title"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full h-[150px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            placeholder="Image"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
            onChange={(e) => setVideo(e.target.value)}
          />
          <div className="flex gap-4">
            <BackButton path={`/profile/${user_video_id}`} />
            <button
              onClick={handleCreate}
              className="bg-blue-500 p-2 rounded-xl mb-4 flex justify-center items-center gap-2"
            >
              <FaSave />
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
