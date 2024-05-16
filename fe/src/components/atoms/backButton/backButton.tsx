import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const backButton = ({ path }) => {
  return (
    <>
      <Link
        to={path}
        className="bg-gray-500 p-2 rounded mb-4 flex justify-center items-center gap-2 "
      >
        <FaArrowLeft />
        Back
      </Link>
    </>
  );
};

export default backButton;
