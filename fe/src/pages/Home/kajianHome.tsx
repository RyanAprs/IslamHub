import { KajianCarousel } from "../Kajian/kajianCarousel";

const KajianHome = ({ id }) => {
  return (
    <div
      id={id}
      className="min-h-screen font-poppins bg-third-bg w-full flex pt-12 md:pt-0 flex-col gap-8 p-8 md:px-32"
    >
      <div className="text-xl md:text-4xl text-main-bg font-bold flex md:justify-start  justify-center md:pt-20 pt-10 ">
        <h1>Informasi Kajian Terbaru</h1>
      </div>
      <KajianCarousel />
    </div>
  );
};

export default KajianHome;
