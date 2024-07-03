import { useEffect, useState } from "react";
import SideBarAdmin from "../../../../components/atoms/sideBarAdmin/sideBarAdmin";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const ChatAdmin = () => {
  const [chats, setChats] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [chatToDelete, setChatToDelete] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get(`http://192.168.56.1:3000/api/v1/chat`);
      setChats(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (chat) => {
    setChatToDelete(chat);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://192.168.56.1:3000/api/v1/chat/${chatToDelete.chat_id}`
      );
      if (response.status === 200) {
        setChats(chats.filter((chat) => chat.chat_id !== chatToDelete.chat_id));
        toast({
          title: "Chat deleted successfully",
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("Request error:", error.message);
      toast({
        title: "Error deleting chat",
        status: "error",
        position: "top",
        isClosable: true,
      });
    } finally {
      setShowModal(false);
      setChatToDelete(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setChatToDelete(null);
  };

  return (
    <div className="flex min-h-screen">
      <SideBarAdmin />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Data Chat</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {chats.map((chat) => (
            <div key={chat.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{chat.name}</h2>
              <h2 className="text-xl ">{chat.chat}</h2>
              <button
                onClick={() => handleDelete(chat)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
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

export default ChatAdmin;
