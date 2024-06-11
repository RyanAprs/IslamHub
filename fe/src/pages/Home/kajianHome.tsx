import { Link } from "react-router-dom";
import { KajianCarousel } from "../Kajian/kajianCarousel";

const KajianHome = ({ id }) => {
  return (
    <div
      id={id}
      className="min-h-screen font-poppins bg-third-bg w-full flex pt-12 md:pt-0 flex-col gap-8 p-8 md:px-32 font-semibold"
    >
      <div className="flex md:justify-between justify-center  items-center text-white  md:pt-20 pt-10 ">
        <div className="text-xl md:text-4xl ">Informasi Kajian Terbaru</div>
        <Link
          to="/kajian"
          className="px-4 py-2 bg-white rounded-full border-2 border-black text-black text-sm"
        >
          Lihat Semua
        </Link>
      </div>
      <KajianCarousel />
    </div>
  );
};

export default KajianHome;
