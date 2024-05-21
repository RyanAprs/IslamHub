import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const [userId, setUserId] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [bio, setBio] = useState();
  const [user, setUser] = useState();
  const [userData, setUserData] = useState();
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
    getUserDetail();
  }, [id]);

  const getUserDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/${id}`
      );
      setUserId(response.data.data.user_id);
      setName(response.data.data.name);
      setImage(response.data.data.image);
      setBio(response.data.data.bio);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setItemUser = () => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
  };

  return (
    <div className="flex flex-col gap-16 bg-main-gradient pt-[160px] px-32 text-color-primary min-h-screen text-2xl font-poppins">
      <div className="flex justify-between items-start">
        <div className="flex gap-8">
          <div>
            {image !== null ? (
              <img
                src={`http://localhost:3000/${image}`}
                alt="profile picture"
                className="w-[300px] h-[300px] bg-white shadow-lg object-cover mt-3  border-black  rounded-full"
              />
            ) : (
              <div className=" relative w-[250px] h-[250px] shadow-lg object-cover mt-3  border-black rounded-full flex justify-center items-center">
                <FaUser size={150} className="absolute" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between pt-8">
            <div className="flex flex-col gap-8">
              <h5 className="text-[60px] font-bold">{name}</h5>
              <p>
                {bio !== "" ? (
                  <p className="text-[25px]">{bio}</p>
                ) : (
                  <p className="text-[25px]">Belum ada bio.</p>
                )}
              </p>
            </div>
            <div className="py-8 flex flex-wrap gap-4 ">
              {(user && user.user_id !== userId) || user === null ? (
                ""
              ) : (
                <>
                  <Link
                    to={`/profile/update/${userId}`}
                    onClick={setItemUser}
                    className="bg-blue-600 text-color-dark font-bold py-3 px-4 text-lg rounded-xl"
                  >
                    Edit Profile
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="cursor-pointer">
          <BsGear size={40} />
        </div>
      </div>
      <div className="underline font-bold flex ml-16 text-[25px]">Videos</div>
    </div>
  );
};

export default Profile;
