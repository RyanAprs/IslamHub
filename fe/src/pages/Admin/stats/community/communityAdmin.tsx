import { useEffect, useState } from "react";
import SideBarAdmin from "../../../../components/atoms/sideBarAdmin/sideBarAdmin";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../../../firebase";

const CommunityAdmin = () => {
  const [communities, setCommunities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [communityToDelete, setCommunityToDelete] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const response = await axios.get(
        `http://192.168.56.1:3000/api/v1/community`
      );
      setCommunities(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (community) => {
    setCommunityToDelete(community);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      if (communityToDelete.image) {
        const imageRef = ref(storage, communityToDelete.image);
        if (imageRef.fullPath !== "") {
          await deleteObject(imageRef);
        }
      }
      const response = await axios.delete(
        `http://192.168.56.1:3000/api/v1/community/${communityToDelete.community_id}`
      );
      if (response.status === 200) {
        setCommunities(
          communities.filter(
            (community) =>
              community.community_id !== communityToDelete.community_id
          )
        );
        toast({
          title: "Community deleted successfully",
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("Request error:", error.message);
      toast({
        title: "Error deleting community",
        status: "error",
        position: "top",
        isClosable: true,
      });
    } finally {
      setShowModal(false);
      setCommunityToDelete(null);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setCommunityToDelete(null);
  };

  return (
    <div className="flex min-h-screen">
      <SideBarAdmin />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Community Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {communities.map((community) => (
            <div key={community.id} className="border p-4 rounded shadow">
              {community.image !== null ? (
                <img
                  src={community.image}
                  alt="user image"
                  className="h-[40px] w-[40px] object-cover rounded-full bg-gray-200"
                />
              ) : (
                <FaUsers
                  size={30}
                  className="object-cover rounded-full bg-gray-200"
                />
              )}
              <h2 className="text-xl font-semibold">{community.title}</h2>
              <h2 className="text-lg">created by {community.name}</h2>
              <button
                onClick={() => handleDelete(community)}
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
            <p>Are you sure you want to delete this community?</p>
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

export default CommunityAdmin;
