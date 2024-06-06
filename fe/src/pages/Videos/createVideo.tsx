import axios from "axios";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/atoms/backButton/backButton";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import Cookies from "js-cookie";

const CreateVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userVideoId, setUserVideoId] = useState("");
  const [video, setVideo] = useState();
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = Cookies.get("userData");

    if (userCookie) {
      const userDataObj = JSON.parse(userCookie);
      setUserVideoId(userDataObj.user_id);
    }
  }, []);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("No file selected");
      return;
    }

    const validExtensions = [
      "video/mp4",
      "video/avi",
      "video/mkv",
      "video/webm",
    ];

    if (!validExtensions.includes(file.type)) {
      setError(
        "Invalid file type. Please select a valid video file (MP4, AVI, MKV, WEBM)."
      );
      return;
    }

    setError("");
    setVideo(file);

    const videoRef = ref(storage, `videos/${file.name + v4()}`);
    const uploadTask = uploadBytesResumable(videoRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload video gagal:", error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setVideoUrl(downloadURL);
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      }
    );
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/video", {
        user_video_id: userVideoId,
        title,
        description,
        video: videoUrl,
      });

      if (response.data.status_code === 200) {
        navigate(`/profile/${userVideoId}`);
      } else {
        console.log("Gagal membuat video");
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Error lainnya:", error.message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 justify-center pt-[140px]">
      <div className="text-[36px] font-bold">Create Video</div>
      <div className="w-full flex flex-col justify-center px-8 rounded shadow-lg gap-10">
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
            placeholder="video"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
            onChange={handleVideoChange}
          />
          {progress > 0 && (
            <p className="text-green-600">Uploading {progress.toFixed(2)}%</p>
          )}
          <div className="flex gap-4">
            <BackButton path={`/profile/${userVideoId}`} />
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
