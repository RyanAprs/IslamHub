import axios from "axios";
import { useEffect, useState } from "react";
import { FaSave, FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/atoms/backButton/backButton";

const UpdateProfile = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [bio, setBio] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
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
    setUser(userData);
  }, []);

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/${id}`
        );
        if (response.status === 200) {
          const userData = response.data.data;

          setName(userData.name);
          setUserId(userData.user_id);
          setImage(userData.image);
          setEmail(userData.email);
          setBio(userData.bio);
          if (userData.image !== null) {
            setImagePreview(`http://localhost:3000/${userData.image}`);
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user by id:", error);
        setError("Failed to fetch user data");
      }
    };

    getUserById();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("user_id", userId);
      formData.append("name", name || "");
      formData.append("email", email || "");
      formData.append("bio", bio || "");
      formData.append("image", image);

      const response = await axios.put(
        `http://localhost:3000/api/v1/user/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const user = response.data.data;
        const expirationDate = new Date();
        console.log(user);
        expirationDate.setDate(expirationDate.getDate() + 1);
        // Check if userData exists in cookies
        const existingUserData = getCookie("userData");
        let updatedUserData;

        if (existingUserData) {
          const parsedUserData = JSON.parse(existingUserData);

          updatedUserData = { ...parsedUserData, ...user };
        } else {
          updatedUserData = user;
        }

        document.cookie = `userData=${JSON.stringify(
          updatedUserData
        )}; expires=${expirationDate.toUTCString()}`;

        navigate(`/profile/${id}`);
        window.location.reload();
      } else {
        setError("Failed to update user data");
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

  function getCookie(name) {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  }

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
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-[250px] h-[250px] bg-white shadow-lg object-cover mt-3 border-black rounded-full"
            />
          ) : (
            <div className="relative w-[250px] h-[250px] shadow-lg object-cover mt-3 border-black rounded-full flex justify-center items-center">
              <FaUser size={150} className="absolute" />
            </div>
          )}
          <input
            type="file"
            placeholder="Image"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
            onChange={onImageUpload}
          />
          <input
            type="text"
            placeholder="Name"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bio"
            className="border-2 border-gray-300 rounded p-4 mb-4 w-full"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <div className="flex gap-4">
            <BackButton path={`/profile/${id}`} />
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

export default UpdateProfile;
