import { useEffect, useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const VideoUser = () => {
  const [videoData, setVideoData] = useState([]);
  const [user, setUser] = useState();
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
    setUser(userData);
  }, []);

  useEffect(() => {
    getVideoByUserId();
  }, []);

  const getVideoByUserId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/video/${id}/${id}`
      );
      setVideoData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const VideoList = () => (
    <>
      <div className="grid md:grid-cols-2  grid-cols-1 gap-3  text-black  justify-center">
        {videoData.map((video, index) => (
          <Link
            to={`/video/${video.video_id}`}
            key={index}
            className="shadow-lg cursor-pointer bg-gray-300 p-4 flex flex-col items-start rounded-xl max-h-auto border-gray-400 border-[2px]"
          >
            <video
              className="md:h-[230px] h-[170px] w-full object-cover rounded border-gray-400 shadow-md border-[2px]"
              controls
            >
              <source src={video.video} type="video/mp4" /> Your browser does
              not support the video tag.
            </video>
            <hr className="mt-3" />

            <div className="flex gap-2 items-start justify-start">
              <p className="rounded-full bg-slate-300 border-black border-[1px]">
                {video.user_image && video.user_image !== null ? (
                  <img
                    src={`http://localhost:3000/${video.user_image}`}
                    alt="user image"
                    className="rounded-full w-[50px] h-[50px] object-cover "
                  />
                ) : (
                  <FaUser className="text-black rounded-full w-[50px] h-[50px] object-cover" />
                )}
              </p>
              <div>
                <div>
                  <h1 className="text-[25px] uppercase ">{video.title}</h1>
                </div>
                <div className="flex gap-2  ">
                  <Link
                    className="md:text-[20px] text-[15px]"
                    to={`/profile/${video.user_video_id}`}
                  >
                    {video.name}{" "}
                  </Link>
                  <p>-</p>
                  <p className="md:text-[20px] text-[15px]">
                    {formatDistanceToNow(parseISO(video.createdAt))} ago
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="flex-col gap-8 ">
        <div>
          {Array.isArray(videoData) && videoData.length > 0 ? (
            <VideoList />
          ) : (
            <div className="min-h-screen flex justify-center">
              <h1>No Video Posted</h1>
            </div>
          )}
        </div>
        {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />{" "} */}
      </div>
    </>
  );
};

export default VideoUser;
