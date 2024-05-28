import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [totalData, setTotalData] = useState(null);

  useEffect(() => {
    fetchTotalData();
  }, []);

  const fetchTotalData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/admin/count-data"
      );
      setTotalData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-main-gradient">
      {totalData && (
        <div>
          {Object.entries(totalData).map(([key, value]) => (
            <div key={key}>
              <h2>
                Total {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                {value.total_data}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
