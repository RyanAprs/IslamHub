import { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const chats = [
  {
    name: "ryan",
    chat: "testt",
  },
  {
    name: "ryan",
    chat: "testt",
  },
  {
    name: "ryan",
    chat: "testt",
  },
  {
    name: "ryan",
    chat: "testt",
  },
  {
    name: "ryan",
    chat: "testt",
  },
  {
    name: "ryan",
    chat: "testt",
  },
  {
    name: "ryan",
    chat: "testt",
  },
  {
    name: "ryan",
    chat: "testt",
  },
  {
    name: "ryan",
    chat: "testt",
  },
  {
    name: "ryan",
    chat: "testt",
  },
  {
    name: "ryan",
    chat: "testt",
  },
  {
    name: "ryan",
    chat: "testt",
  },
];

const ChatSection = () => {
  const [user_id, setUser_id] = useState();
  const [chat, setChat] = useState();

  const handleCreate = () => {};

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
      setUser_id(userData.user_id);
    }
  });

  return (
    <div className="flex flex-col flex-grow ">
      <div className="w-full flex-grow overflow-y-auto  bg-blue-500 h-[40px]">
        {chats && chats.length > 0 ? (
          chats.map((dataChat, index) => (
            <div className="p-2" key={index}>
              <div className="p-4 bg-white rounded-xl  flex justify-between items-center">
                <div>
                  <h1>{dataChat.name}</h1>
                  <p>{dataChat.chat}</p>
                </div>
                <div>
                  <button
                  //   onClick={() => handleDelete(dataChat.comment_id)}
                  >
                    <FaTrash />
                  </button>
                  {/* {user_id === comment.user_id ? (
                  ) : (
                    ""
                  )} */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <h1>No Comment Posted</h1>
          </div>
        )}
      </div>
      {user_id ? (
        <div className="flex gap-3 p-4 bg-gray-300">
          <input
            type="text"
            className="w-full p-4 rounded"
            placeholder="Message..."
            value={chat}
            onChange={(e) => setChat(e.target.value)}
          />
          <button
            className="bg-gray-400 py-2 px-6 rounded"
            onClick={handleCreate}
          >
            <FaArrowAltCircleRight size={40} />
          </button>
        </div>
      ) : (
        <div className="flex justify-center gap-5 items-center">
          <h4>You Should Login For Chat</h4>
          <Link to="/login" className="bg-gray-400 px-3 py-2 rounded">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
