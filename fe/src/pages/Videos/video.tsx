import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/molecules/Pagination/pagination";
import { FaUser } from "react-icons/fa";

const videos = [
  {
    video_id: "1",
    title: "Testingg",
    video: "ryan.mp4",
    name: "ryan",
    user_image: "ryan.jpg",
    description: "ini adalah video testing",
    comments: "testing comment",
  },
  {
    video_id: "2",
    title: "Testingg",
    video: "ryan.mp4",
    name: "ryan",
    user_image: "ryan.jpg",
    description: "ini adalah video testing",
    comments: "testing comment",
  },
  {
    video_id: "3",
    title: "Testingg",
    video: "ryan.mp4",
    name: "ryan",
    user_image: "ryan.jpg",
    description: "ini adalah video testing",
    comments: "testing comment",
  },
];

const Video = () => {
  const [videoData, setVideoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState();

  // useEffect(() => {
  //   const getUserDataFromCookie = () => {
  //     const cookieData = document.cookie
  //       .split("; ")
  //       .find((row) => row.startsWith("userData="));

  //     if (cookieData) {
  //       const userDataString = cookieData.split("=")[1];
  //       try {
  //         const userData = JSON.parse(decodeURIComponent(userDataString));
  //         return userData;
  //       } catch (error) {
  //         console.error("Error parsing JSON from cookie:", error);
  //         return null;
  //       }
  //     } else {
  //       return null;
  //     }
  //   };

  //   const userData = getUserDataFromCookie();
  //   setUser(userData);
  // }, []);

  // useEffect(() => {
  //   fetchBlogs();
  // }, [currentPage]);

  // const fetchBlogs = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/api/v1/blog?page=${currentPage}&perPage=4`
  //     );
  //     setBlogs(response.data.data);

  //     setTotalPages(response.data.total_page);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const search = async (q) => {
  //   try {
  //     if (q.length > 0) {
  //       const response = await axios.get(
  //         `http://localhost:3000/api/v1/blog/search`,
  //         {
  //           params: {
  //             query: q,
  //           },
  //         }
  //       );
  //       setBlogs(response.data.data);
  //       console.log(response.data.data);
  //       setTotalPages(1);
  //     } else if (q.length === 0) {
  //       fetchBlogs();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const VideoList = () => (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3  grid-cols-1 gap-3  text-black  justify-center">
        {videos.map((video, index) => (
          <Link
            to={`/video/${video.video_id}`}
            key={index}
            className="shadow-lg cursor-pointer bg-gray-300 p-4 flex flex-col items-start rounded-xl max-h-auto border-gray-400 border-[2px]"
          >
            <img
              className="h-[200px] w-full object-cover rounded border-gray-400 shadow-md border-[2px]"
              src={`http://localhost:3000/${video.video}`}
              alt="video image"
            />
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
              <div className="">
                <div>
                  <h1 className="text-2xl uppercase ">{video.title}</h1>
                </div>
                <div>{video.name} - 2 days ago</div>
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
        <div>
          <input
            type="text"
            placeholder="Cari video..."
            className="border-none py-4 w-full focus:outline-none text-black rounded-full"
            // onChange={({ target }) => search(target.value)}
          />
        </div>

        <div>
          {Array.isArray(videos) && videos.length > 0 ? (
            <VideoList />
          ) : (
            <div className="min-h-screen flex justify-center">
              <h1>No Video Posted</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Video;
