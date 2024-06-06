import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/molecules/Pagination/pagination";
import { FaUser } from "react-icons/fa";
import { formatDistanceToNow, parseISO } from "date-fns";

const Video = () => {
  const [videoData, setVideoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVideos();
  }, [currentPage]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/video?page=${currentPage}&perPage=12`
      );
      setVideoData(response.data.data);
      setTotalPages(response.data.total_page);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };


  const search = async (q) => {
    try {
      if (q.length > 0) {
        const response = await axios.get(
          `http://localhost:3000/api/v1/video/search`,
          {
            params: {
              query: q,
            },
          }
        );
        setVideoData(response.data.data);
        setTotalPages(1);
      } else if (q.length === 0) {
        fetchVideos();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const VideoList = () => (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3  grid-cols-1 gap-3  text-black  justify-center">
        {videoData.map((video, index) => {
          return (
            <Link
              to={`/video/${video.video_id}`}
              key={index}
              className="shadow-lg cursor-pointer bg-gray-300 p-4 flex flex-col items-start rounded-xl max-h-auto border-gray-400 border-[2px]"
            >
              <video
                className="h-[200px] w-full object-cover rounded border-gray-400 shadow-md border-[2px]"
                controls
              >
                <source src={video.video} type="video/mp4" /> Your browser does
                not support the video tag.
              </video>
              <hr className="mt-3" />

              <div className="flex gap-2 items-start justify-start">
                <p className="rounded-full bg-slate-300 border-black border-[1px]">
                  {video.user_image !== null ? (
                    <img
                      src={video.user_image}
                      alt="user image"
                      className="rounded-full w-[50px] h-[50px] object-cover "
                    />
                  ) : (
                    <FaUser className="text-black rounded-full w-[50px] h-[50px] object-cover" />
                  )}
                </p>
                <div className="">
                  <div>
                    <h1 className="text-2xl uppercase ">{video.title}</h1>
                  </div>
                  <div className="flex gap-2  ">
                    <Link to={`/profile/${video.user_video_id}`}>{video.name} </Link>
                    <p>-</p>
                    <p>{formatDistanceToNow(parseISO(video.createdAt))} ago</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      <div className="px-4 py-20 flex bg-main-gradient pt-[100px] md:pt-[140px] flex-col gap-8 min-h-screen">
        <div className="border-[1px] border-black  rounded-full">
          <input
            type="text"
            placeholder="Cari video..."
            className="border-none py-4 pl-4  border-black w-full focus:outline-none text-black  rounded-full"
            onChange={({ target }) => search(target.value)}
          />
        </div>
        <div>
          {Array.isArray(videoData) && videoData.length > 0 ? (
            <VideoList />
          ) : (
            <div className="min-h-screen flex justify-center">
              <h1>No Video Posted</h1>
            </div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />{" "}
      </div>
    </>
  );
};

export default Video;
