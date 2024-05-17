import { useParams } from "react-router-dom";
import CommunityList from "./communityList";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import ChatSection from "../../components/atoms/chatSection/chatSection";

const DetailCommunity = () => {
  const [communityImage, setCommunityImage] = useState();
  const [communityTitle, setCommunityTitle] = useState();
  const [admin, setAdmin] = useState();

  const { id } = useParams();

  useEffect(() => {
    fetchCommunityById();
  });

  const fetchCommunityById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/community/${id}`
      );
      setCommunityTitle(response.data.data.title);
      setAdmin(response.data.data.name);
      setCommunityImage(response.data.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex pt-[72px]">
      <CommunityList />
      <div className="flex flex-col w-full">
        <nav className="bg-gray-500 h-15 w-full border-black border-[1px]">
          <ul className="flex px-3 items-center">
            {communityImage !== null ? (
              <button>
                <img
                  src={`http://localhost:3000/${communityImage}`}
                  alt="user image"
                  className="h-[40px] w-[40px] object-cover rounded-full bg-gray-200"
                />
              </button>
            ) : (
              <button className="cursor-pointer h-[40px] w-[40px] flex items-center p-3 bg-gray-200 rounded-full">
                <FaUsers size={40} className="text-black" />
              </button>
            )}
            <li className="p-4 text-white">{communityTitle}</li>
          </ul>
        </nav>
        <ChatSection admin={admin} />
      </div>
    </div>
  );
};

export default DetailCommunity;
