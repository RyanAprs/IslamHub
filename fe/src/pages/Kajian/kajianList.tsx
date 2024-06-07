import { Link } from "react-router-dom";
import bg from "../../assets/bg.png";

const KajianList = ({ id }) => {
  return (
    <div
      id={id}
      className="min-h-screen font-poppins bg-third-bg w-full flex flex-col gap-8 p-8 md:px-32"
    >
      <div className="text-xl md:text-4xl text-main-bg font-bold flex md:justify-start  justify-center md:pt-20 pt-10 ">
        <h1>Informasi Kajian Terbaru</h1>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex bg-main-bg w-full h-auto md:h-[300px] shadow-xl">
          <div className="flex flex-col justify-between md:flex-col itemster">
            <div className="flex md:flex-row flex-col gap-4">
              <img
                src={bg}
                className="md:h-[300px] w-[454px] object-cover "
                alt="gambar kajian"
              />
              <div className="flex flex-col py-2 gap-4 justify-center">
                <div>
                  <h1 className="text-[25px] font-bold">Judul Kajian</h1>
                  <div className="flex gap-3">
                    <p>tanggal</p>
                    <p>-</p>
                    <p>lokasi</p>
                  </div>
                </div>
                <div className="text-[20px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Quisquam debitis, ducimus iste voluptates cumque,
                </div>
                <Link
                  to=""
                  className="w-[159px] rounded-full p-2 border-third-bg border-[1px]"
                >
                  Lihat Selengkapnya
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KajianList;
