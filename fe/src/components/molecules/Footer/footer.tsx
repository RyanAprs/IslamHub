import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-white">&copy; 2024 Ryan Adi Prasetyo</p>
        <div className="flex space-x-4 text-white">
          <Link to="https://www.instagram.com/rreiyyan/">
            <FaInstagram size={25} />
          </Link>
          <Link to="https://www.linkedin.com/in/ryan-adi-prasetyo">
            <FaLinkedin size={25} />
          </Link>
          <Link to="https://github.com/RyanAprs">
            <FaGithub size={25} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
