import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/atoms/backButton/backButton";
import Pagination from "../../components/molecules/Pagination/pagination";

const BlogUser = () => {
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
    if ((user && user.user_id) || user === null) {
      getBlogByUserId();
    }
    <button className="bg-gray-500 p-2 rounded mb-4 flex justify-center items-center gap-2 ">
      <FaArrowLeft />
      Back
    </button>;
  }, [user, id, currentPage]);

  const getBlogByUserId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/blog/${id}/${id}?page=${currentPage}&perPage=4`
      );
      const blogs = response.data.data;
      console.log(response.data);
      setBlogs(blogs);
      setTotalPages(response.data.total_page);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="flex  justify-between">
        <BackButton path={`/profile/${id}`} />
        {(user && user.user_id !== id) || user === null ? null : (
          <Link
            to="/blog/create"
            className="bg-gray-500 p-2 rounded mb-4 flex items-center"
          >
            <h1>Create Blog</h1>
          </Link>
        )}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4  text-black  justify-center">
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog, index) => {
            const dateSlice = blog.createdAt.slice(0, 10);
            const descLength = blog.description.length;
            const truncatedDesc =
              descLength > 100
                ? `${blog.description.slice(0, 100)}...`
                : blog.description;
            const showReadMore = descLength > 100;

            return (
              <Link
                to={`/blog/detail/${blog.blog_id}`}
                key={index}
                className="shadow-lg cursor-pointer bg-gray-400 p-4 flex flex-col items-start rounded border-gray-500 border-[2px]"
              >
                <img
                  className="h-[350px] w-full object-cover rounded border-gray-500 shadow-md border-[2px]"
                  src={`http://localhost:3000/${blog.image}`}
                  alt="blog image"
                />
                <div className="">
                  <h1 className="text-2xl uppercase mb-2">{blog.title}</h1>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="rounded-full bg-slate-300 border-black border-[1px]">
                    {blog.user_image && blog.user_image !== null ? (
                      <img
                        src={`http://localhost:3000/${blog.user_image}`}
                        alt="user image"
                        className="rounded-full w-[50px] h-[50px] object-cover "
                      />
                    ) : (
                      <FaUser className="text-black rounded-full w-[50px] h-[50px] object-cover" />
                    )}
                  </p>
                  <p>{blog.author}</p>-<p>{dateSlice}</p>
                </div>
                <div>
                  <p>{truncatedDesc}</p>
                  {showReadMore && (
                    <span className="text-slate-100 cursor-pointer text-sm underline">
                      ...read more
                    </span>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="flex justify-center">
            <p>No blog posted.</p>
          </div>
        )}
      </div>
      <div className="p-4">
        <Pagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default BlogUser;
