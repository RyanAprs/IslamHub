import { Link } from "react-router-dom";
import BackButton from "../../components/atoms/backButton/backButton";
import { useEffect, useState } from "react";
import Pagination from "../../components/molecules/Pagination/pagination";
import axios from "axios";

const KajianList = () => {
  const [kajian, setKajian] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchKajian();
  }, [currentPage]);

  const fetchKajian = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/kajian?page=${currentPage}&perPage=12`
      );
      const data = response.data.data;

      setKajian(data);
      setTotalPages(response.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const KajianList = () => (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
      {kajian.map((kajianItem, index) => (
        <div
          key={index}
          className="flex justify-center w-full h-60 bg-main-bg shadow-xl"
        >
          <div className="w-1/2 h-full">
            <img
              src={kajianItem.image}
              alt="Kajian"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col w-1/2 px-4 justify-evenly">
            <div>
              <h1 className="text-black font-bold text-xl">
                {kajianItem.title}
              </h1>
              <p className="text-black text-sm">
                {kajianItem.date} - {kajianItem.lokasi}
              </p>
            </div>
            <div>
              <p className="text-black mt-2">{kajianItem.description}</p>
            </div>
            <div>
              <Link
                to={`/detail/${kajianItem.kajian_id}`}
                className="border-2 border-black p-2 rounded-full text-sm"
              >
                Lihat Selengkapnya
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="pt-[100px] px-5 min-h-screen">
      <div className="flex flex-col p-8 w-full gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex text-4xl font-bold mb-4 w-2/3 justify-between">
            <div className="flex items-center w-full justify-start">
              <BackButton path="/" />
            </div>
            <div className="flex items-center w-full justify-end">
              <h1>LIST SEMUA KAJIAN</h1>
            </div>
          </div>
          <div>
            {Array.isArray(kajian) && kajian.length > 0 ? (
              <KajianList />
            ) : (
              <div className="min-h-screen flex justify-center">
                <h1>Tidak ada Kajian</h1>
              </div>
            )}
          </div>
        </div>

        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default KajianList;
