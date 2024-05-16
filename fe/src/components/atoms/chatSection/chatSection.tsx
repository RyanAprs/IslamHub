import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowAltCircleRight, FaTrash } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const ChatSection = () => {
  const [user_id, setUser_id] = useState();
  const [chat, setChat] = useState();
  const [dataChats, setDataChats] = useState([]);
  const [error, setError] = useState();
  const [name, setName] = useState();
  const [community_id, setCommunity_id] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [idChatToDelete, setIdChatToDelete] = useState();

  const { id } = useParams();

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/chat/${id}`
        );
        setDataChats(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

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

    setCommunity_id(id);
    fetchComment();

    const userData = getUserDataFromCookie();
    if (userData) {
      setUser_id(userData.user_id);
      setName(userData.name);
    }
  }, [id]);

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

  const handleCreate = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/chat", {
        user_id,
        community_id,
        chat,
        name,
      });

      if (response.data.status_code === 200) {
        window.location.reload();
        console.log("create chat berhasil");
      } else {
        console.log("create chat gagal");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        setError(error.response.data.message);
      } else if (error.request) {
        console.log("No response received from server:", error.request);
      } else {
        console.log("Request error:", error.message);
      }
    }
  };

  const handleDelete = async (chatId) => {
    setIdChatToDelete(chatId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    console.log(idChatToDelete);

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/chat/${idChatToDelete}`
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Request error:", error);
    } finally {
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col flex-grow ">
      <div className="w-full flex-grow overflow-y-auto  bg-blue-500 h-[40px]">
        {dataChats && dataChats.length > 0 ? (
          dataChats.map((dataChat, index) => (
            <div className="p-2" key={index}>
              <div className="p-4 bg-white rounded-xl  flex justify-between items-center">
                <div>
                  <h1>{dataChat.name}</h1>
                  <p>{dataChat.chat}</p>
                </div>
                <div>
                  {user_id === dataChat.user_id ? (
                    <button onClick={() => handleDelete(dataChat.chat_id)}>
                      <FaTrash />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <h1>No Chat Posted</h1>
          </div>
        )}
      </div>

      <div className="p-4 bg-gray-300">
        {error && <p className="text-red-500 bg-gray-300">{error}</p>}
        {user_id ? (
          <div className="flex gap-3 ">
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
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this chat?</p>
            <div className="flex justify-center mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition-colors duration-300"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
