import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import SideBarAdmin from "../../../../components/atoms/sideBarAdmin/sideBarAdmin";
import { Link } from "react-router-dom";

const KajianAdmin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <SideBarAdmin />
      <div className="flex flex-col px-12 py-8  justify-between  w-full">
        <div className="text-4xl font-bold">
          <h1>LIST KAJIAN</h1>
        </div>
        <div className="flex justify-end">
          <button className="flex  justify-between gap-2 items-center bg-third-bg p-3 h-auto text-white rounded-xl">
            <FaPlus />
            <Link to="">Tambah Kajian</Link>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 px-12 py-8 gap-4">
        <Link to="" className="flex justify-center w-full h-50 bg-main-bg">
          <div className="bg-third-bg w-full h-full text-white flex justify-center items-center">
            Gambar
          </div>
          <div className="flex flex-col w-full py-4 px-2">
            <h1 className="text-black font-bold">Kajian 1</h1>
            <p className="text-black text-sm">12-6-2024 - Magelang</p>
            <p className="text-black mt-2">
              deskripsi Kajian 1 deskripsi Kajian 1 deskripsi Kajian 1 deskripsi
              Kajian 1
            </p>
          </div>
          <div className="flex gap-8 flex-col justify-center px-4">
            <button>
              <FaEdit />
            </button>
            <button>
              <FaTrash />
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default KajianAdmin;
