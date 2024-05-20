import { useEffect, useState } from "react";
import SideBarGroupChat from "./communityList";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUsers } from "react-icons/fa";

const Chat = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/community"
      );
      setCommunities(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CommunityList = () => (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3  grid-cols-1 gap-3  text-black  justify-center">
        {communities.map((community, index) => (
          <Link
            to={`/community/${community.community_id}`}
            key={index}
            className="shadow-lg cursor-pointer bg-gray-300 p-4 flex flex-col items-start rounded-xl max-h-auto border-gray-400 border-[2px]"
          >
            {community && community.image !== null ? (
              <img
                className="h-[200px] w-full object-cover rounded border-gray-400 shadow-md border-[2px]"
                src={`http://localhost:3000/communityImage/${community.image}`}
                alt="community image"
              />
            ) : (
              <div className="h-[200px] flex justify-center items-center w-full object-cover rounded border-gray-400 shadow-md border-[2px]">
                <FaUsers size={200} />
              </div>
            )}
            <hr className="mt-3" />

            <div className="flex gap-2 items-start justify-start">
              <div className="">
                <div>
                  <h1 className="text-2xl uppercase ">{community.title}</h1>
                </div>
                <div>{community.name} - 2 days ago</div>
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
        <div className="flex justify-center items-center ">
          <div className=" rounded-full flex items-center justify-center border-black border-2">
            <input
              type="text"
              placeholder="Cari Komunitas..."
              className="border-none py-4 pl-4  border-black w-[454px] h-[71px] focus:outline-none text-black  rounded-full"
              // onChange={({ target }) => search(target.value)}
            />
          </div>
        </div>

        <div>
          {Array.isArray(communities) && communities.length > 0 ? (
            <CommunityList />
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

export default Chat;
