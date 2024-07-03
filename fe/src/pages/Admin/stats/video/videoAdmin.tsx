import axios from "axios";
import SideBarAdmin from "../../../../components/atoms/sideBarAdmin/sideBarAdmin";
import { useEffect, useRef, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../../../firebase";
import { useToast } from "@chakra-ui/react";

const VideoAdmin = () => {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const toast = useToast();
  const videoRefs = useRef([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(`http://192.168.56.1:3000/api/v1/video`);
      setVideos(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (video) => {
    console.log(video);

    setVideoToDelete(video);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      // Buat referensi non-root menggunakan path video
      const videoRef = ref(storage, videoToDelete.video);
      await deleteObject(videoRef);

      const response = await axios.delete(
        `http://192.168.56.1:3000/api/v1/video/${videoToDelete.video_id}`
      );
      if (response.status === 200) {
        setVideos(
          videos.filter((video) => video.video_id !== videoToDelete.video_id)
        );
        toast({
          title: "Video deleted successfully",
          status: "success",
          position: "top",
          isClosable: true,
        });
        window.location.reload();
      }
    } catch (error) {
      console.log("Request error:", error.message);
      toast({
        title: "Error deleting video",
        status: "error",
        position: "top",
        isClosable: true,
      });
    } finally {
      setShowModal(false);
      setVideoToDelete(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setVideoToDelete(null);
  };

  const handlePlay = (index) => {
    videoRefs.current.forEach((video, idx) => {
      if (index !== idx && video) {
        video.pause();
      }
    });
  };

  return (
    <div className="flex min-h-screen">
      <SideBarAdmin />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Data Video</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video, index) => (
            <div key={video.id} className="border p-4 rounded shadow">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="h-[200px] w-full object-cover rounded-xl"
                controls
                onPlay={() => handlePlay(index)}
              >
                <source src={video.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <h2 className="text-xl font-semibold">{video.title}</h2>
              <p>{video.description}</p>
              <button
                onClick={() => handleDelete(video)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this video?</p>
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

export default VideoAdmin;
