import BackButton from "../../components/atoms/backButton/backButton";

const KajianList = () => {
  return (
    <div className="pt-[100px] px-5 min-h-screen">
      <div className="flex items-start">
        <BackButton path="/" />
      </div>
      <div className="flex items-center justify-center">Kajian List</div>
    </div>
  );
};

export default KajianList;
