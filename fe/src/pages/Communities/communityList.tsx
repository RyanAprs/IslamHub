import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CommunityList = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetchCommunities();
  });

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/community"
      );
      setCommunities(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen overflow-y-auto w-[200px] bg-gray-400 border-">
      <div className="flex items-center justify-center p-4 bg-gray-500">
        <Link to="/community" className="font-bold ">
          Communities
        </Link>
      </div>
      {communities.map((community) => {
        return (
          <Link
            to={`/community/${community.community_id}`}
            key={community._id}
            className="flex p-2 hover:bg-gray-500"
          >
            <h1>{community.title}</h1>
          </Link>
        );
      })}
    </div>
  );
};

export default CommunityList;
