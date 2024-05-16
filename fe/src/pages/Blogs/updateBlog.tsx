import axios from "axios";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/atoms/backButton/backButton";

const UpdateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [user_blog_id, setUser_blog_id] = useState("");
  const [author, setAuthor] = useState("");
  const { id } = useParams();
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
    if (userData) {
      setAuthor(userData.name);
      setUser_blog_id(userData.user_id);
    }
  }, []);

  useEffect(() => {
    const getBlogById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/blog/${id}`
        );
        setTitle(response.data.data.title);
        setDescription(response.data.data.description);
        setImage(response.data.data.image);
        localStorage.setItem("image", response.data.data.image);
      } catch (error) {
        console.log(error);
      }
    };

    getBlogById();
  }, [id]);

  const imagePrevious = localStorage.getItem("image");

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("author", author);
      formData.append("user_blog_id", user_blog_id);
      formData.append("image", image);

      const response = await axios.put(
        `http://localhost:3000/api/v1/blog/${id}`,
        formData
      );
      if (response.data.status_code === 200) {
        navigate(`/blog/detail/${id}`);
        console.log(response.data.data);
        console.log("Update blog berhasil");
      } else {
        console.log("Update blog gagal");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        console.log("No response received from server:", error.request);
      } else {
        console.log("Request error:", error.message);
      }
    }
  };

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="min-h-screen w-full flex flex-col justify-center p-8 rounded shadow-lg gap-10">
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
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="mb-4 max-w-[300px]"
            />
          )}
          {!imagePreview && (
            <img
              src={`http://localhost:3000/${image}`}
              alt="Image Preview"
              className="mb-4 max-w-[300px]"
            />
          )}
          <input
            type="file"
            placeholder="Image"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
            onChange={onImageUpload}
          />
          <div className="flex gap-4">
            <BackButton path={`/blog/detail/${id}`} />
            <button
              onClick={handleUpdate}
              className="bg-gray-500 p-2 rounded mb-4 flex justify-center items-center gap-2"
            >
              <FaSave />
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
