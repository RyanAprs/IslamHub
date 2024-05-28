import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [data, setData] = useState();

    useEffect(() => {
      fetchTotalVideo();
    }, []);

    const fetchTotalVideo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/admin/count-data"
        );
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="bg-main-gradient">
      <h1>Welcome Admin</h1>
    </div>
  );
};

export default AdminDashboard;
