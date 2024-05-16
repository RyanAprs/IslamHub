import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/molecules/Pagination/pagination";
import { FaUser } from "react-icons/fa";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [user, setUser] = useState();

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
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/blog?page=${currentPage}&perPage=4`
      );
      setBlogs(response.data.data);

      setTotalPages(response.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  const search = async (q) => {
    try {
      if (q.length > 0) {
        const response = await axios.get(
          `http://localhost:3000/api/v1/blog/search`,
          {
            params: {
              query: q,
            },
          }
        );
        setBlogs(response.data.data);
        console.log(response.data.data);
        setTotalPages(1);
      } else if (q.length === 0) {
        fetchBlogs();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const BlogList = () => (
    <>
      <div className="flex items-center justify-end">
        {user === null ? null : (
          <Link
            to="/blog/create"
            className="bg-gray-500 p-2 rounded mb-4 flex items-center"
          >
            <h1>Create Blog</h1>
          </Link>
        )}
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6  text-black  justify-center">
        {blogs.map((blog, index) => (
          <Link
            to={`detail/${blog.blog_id}`}
            key={index}
            className="shadow-lg cursor-pointer bg-gray-400 p-4 flex flex-col items-start rounded max-h-auto border-gray-500 border-[2px]"
          >
            <img
              className="h-[300px] w-full object-cover rounded border-gray-500 shadow-md border-[2px]"
              src={`http://localhost:3000/${blog.image}`}
              alt="blog image"
            />
            <hr className="mt-3" />
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
              <p>
                {blog.author} - {blog.createdAt.slice(0, 10)}
              </p>
            </div>
            <div>
              <p>
                {blog.description.length > 100
                  ? `${blog.description.slice(0, 100)}...`
                  : blog.description}
              </p>
              {blog.description.length > 100 && (
                <span className="text-slate-100 cursor-pointer text-sm underline">
                  ...read more
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="p-4 flex flex-col gap-3">
        <div>
          <input
            type="text"
            placeholder="Search blog..."
            className="border-none p-2 w-full focus:outline-none text-black rounded-full"
            onChange={({ target }) => search(target.value)}
          />
        </div>

        {Array.isArray(blogs) && blogs.length > 0 ? (
          <BlogList />
        ) : (
          <div className="min-h-screen flex justify-center">
            <h1>No Blog Posted</h1>
          </div>
        )}
      </div>
      <div className="p-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />{" "}
      </div>
    </>
  );
};

export default Blogs;
