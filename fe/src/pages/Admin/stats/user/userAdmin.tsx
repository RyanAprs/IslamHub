import { useEffect, useState } from "react";
import SideBarAdmin from "../../../../components/atoms/sideBarAdmin/sideBarAdmin";
import axios from "axios";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../../../firebase";
import { FaUser } from "react-icons/fa";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [userCookie, setUserCookie] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const toast = useToast();

  useEffect(() => {
    const userCookie = Cookies.get("userData");

    if (userCookie) {
      const userDataObj = JSON.parse(userCookie);
      setUserCookie(userDataObj);
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://192.168.56.1:3000/api/v1/user`);
      setUsers(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (userToDelete.image) {
        const imageRef = ref(storage, userToDelete.image);
        if (imageRef.fullPath !== "") {
          await deleteObject(imageRef);
        }
      }

      const response = await axios.delete(
        `http://192.168.56.1:3000/api/v1/user/${userToDelete.user_id}`
      );
      if (response.status === 200) {
        setUsers(users.filter((user) => user.user_id !== userToDelete.user_id));
        toast({
          title: "User deleted successfully",
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("Request error:", error.message);
      toast({
        title: "Error deleting user",
        status: "error",
        position: "top",
        isClosable: true,
      });
    } finally {
      setShowModal(false);
      setUserToDelete(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  return (
    <div className="flex min-h-screen">
      <SideBarAdmin />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">User Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <div key={user.id} className="border p-4 rounded shadow">
              {user.image !== null ? (
                <img
                  src={user.image}
                  alt="user image"
                  className="h-[40px] w-[40px] object-cover rounded-full bg-gray-200"
                />
              ) : (
                <FaUser
                  size={30}
                  className="object-cover rounded-full bg-gray-200"
                />
              )}
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p>{user.email}</p>
              {userCookie.user_id !== user.user_id && (
                <button
                  onClick={() => handleDelete(user)}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Are you sure you want to delete this user?</p>
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

export default UserAdmin;
