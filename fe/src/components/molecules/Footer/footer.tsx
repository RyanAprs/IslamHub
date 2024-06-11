import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-third-bg py-4 md:pb-1 pb-20 z-50 md:fixed flex right-0 left-0 bottom-0">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-white font-bold">&copy; 2024 IslamHub</p>
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
