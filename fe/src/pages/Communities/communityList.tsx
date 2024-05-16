import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CommunityList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchCommunities();
  });

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/group-chat"
      );
      setGroups(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen overflow-y-auto w-[200px] bg-gray-400 ">
      <div className="flex items-center justify-center p-4 bg-gray-500">
        <Link to="/community" className="font-bold ">Communities</Link>
      </div>
      {groups.map((group) => {
        return (
          <Link
            to={`/community/${group.group_id}`}
            key={group._id}
            className="flex p-2 hover:bg-gray-500"
          >
            <h1>{group.title}</h1>
          </Link>
        );
      })}
    </div>
  );
};

export default CommunityList;
