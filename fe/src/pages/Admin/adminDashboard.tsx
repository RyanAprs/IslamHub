import axios from "axios";
import { useEffect, useState } from "react";
import { FaUser, FaUsers, FaVideo } from "react-icons/fa";
import SideBarAdmin from "../../components/atoms/sideBarAdmin/sideBarAdmin";

const AdminDashboard = () => {
  const [totalDataUser, setTotalDataUser] = useState({
    title: "",
    total_data: 0,
  });
  const [totalDataCommunity, setTotalDataCommunity] = useState({
    title: "",
    total_data: 0,
  });
  const [totalDataVideo, setTotalDataVideo] = useState({
    title: "",
    total_data: 0,
  });
  const [totalDataKajian, setTotalDataKajian] = useState({
    title: "",
    total_data: 0,
  });

  useEffect(() => {
    fetchTotalData();
  }, []);

  const fetchTotalData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.56.1:3000/api/v1/admin/count-data"
      );
      if (
        response.data &&
        response.data.data &&
        response.data.data.user &&
        response.data.data.community &&
        response.data.data.kajian &&
        response.data.data.video
      ) {
        setTotalDataUser(response.data.data.user);
        setTotalDataCommunity(response.data.data.community);
        setTotalDataVideo(response.data.data.video);
        setTotalDataKajian(response.data.data.kajian);
      } else {
        console.log("Data structure is not as expected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <SideBarAdmin />
      <div className="flex flex-col p-8">
        <div className="text-2xl font-bold">Total Data</div>
        <div className="grid grid-cols-1 md:grid-cols-3 py-8 gap-4">
          <div className="shadow-lg h-48 w-80 cursor-pointer bg-blue-300 p-4 flex  items-center justify-around rounded-xl border-blue-400 border-[2px]">
            <div className="flex flex-col gap-4 items-center text-xl font-bold">
              <h2>{totalDataUser.title}</h2>
              <p>{totalDataUser.total_data}</p>
            </div>
            <div>
              <FaUser size={90} />
            </div>
          </div>
          <div className="shadow-lg  w-80 h-48 cursor-pointer bg-blue-300 p-4 flex gap-6  items-center justify-around rounded-xl border-blue-400 border-[2px]">
            <div className="flex flex-col gap-4 items-center text-xl font-bold">
              <h2>{totalDataCommunity.title}</h2>
              <p>{totalDataCommunity.total_data}</p>
            </div>
            <div>
              <FaUsers size={90} />
            </div>
          </div>
          <div className="shadow-lg  w-80 h-48 cursor-pointer bg-blue-300 p-4 flex  items-center justify-around rounded-xl border-blue-400 border-[2px]">
            <div className="flex flex-col gap-4 items-center text-xl font-bold">
              <h2>{totalDataVideo.title}</h2>
              <p>{totalDataVideo.total_data}</p>
            </div>
            <div>
              <FaVideo size={90} />
            </div>
          </div>
          <div className="shadow-lg  w-80 h-48 cursor-pointer bg-blue-300 p-4 flex  items-center justify-around rounded-xl border-blue-400 border-[2px]">
            <div className="flex flex-col gap-4 items-center text-xl font-bold">
              <h2>{totalDataKajian.title}</h2>
              <p>{totalDataKajian.total_data}</p>
            </div>
            <div>
              <FaVideo size={90} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
