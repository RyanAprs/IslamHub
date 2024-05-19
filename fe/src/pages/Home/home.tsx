import { Link } from "react-router-dom";
import quranImg from "../../assets/quran.png";
import { useEffect, useState } from "react";

const Home = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUserDataFromCookie = () => {
      const cookieData = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userData="));

      if (cookieData) {
        const userDataString = cookieData.split("=")[1];
        try {
          const userData = JSON.parse(decodeURIComponent(userDataString));
          return userData;
        } catch (error) {
          console.error("Error parsing JSON from cookie:", error);
          return null;
        }
      } else {
        return null;
      }
    };

    const userData = getUserDataFromCookie();
    setUser(userData);
  }, []);

  return (
    <div className="min-h-screen bg-main-gradient flex flex-col md:flex-row items-center justify-between p-8 md:px-32 gap-5 pt-[100px]">
      <div className="font-poppins gap-6 md:gap-14 flex flex-col items-center md:items-start text-center md:text-left">
        {/* {!user ? <div className="font-bold text-[24px]">IslamHub</div> : ""} */}
        <div className="gap-4 flex flex-col">
          <div className="text-[24px] font-semibold text-blue-800">
            Halo, Selamat datang <span>{user ? `${user.name}` : "sobat"}</span>
          </div>
          <div className="text-[32px] md:text-[48px] font-bold flex flex-col text-black">
            <span>
              Pelajarilah <span className="text-red-600">Agamamu</span>
            </span>
            <span>disini sobat Insyaallah</span>
            <span>Berkah</span>
          </div>
          <div className="flex flex-col text-[16px] md:text-[18px]">
            Belajarlah Dengan giat niscaya keberkahan <span>menyertaimu</span>
          </div>
          {user ? (
            ""
          ) : (
            <div className="flex gap-4 md:gap-9 items-center font-bold flex-col md:flex-row">
              <Link
                className="bg-blue-600 text-white rounded-xl px-10 py-3"
                to="/register"
              >
                Daftar
              </Link>
              <Link
                className="bg-transparent border-blue-600 border-[2px] text-blue-600 rounded-xl px-10 py-3"
                to="/login"
              >
                Masuk
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <img
          className="w-60 h-60 md:w-96 md:h-96"
          src={quranImg}
          alt="IslamHub Logo"
        />
      </div>
    </div>
  );
};

export default Home;
