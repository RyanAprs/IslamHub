import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    if (userData) {
      setUser(userData);
    }
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-green-600 mb-8">IslamHub</h1>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Temukan Komunitas Islam yang Inspiratif dan Konten Islami yang
        Mencerahkan
      </h2>
      <p className="text-gray-600 text-lg mb-8 max-w-2xl">
        IslamHub adalah platform yang dirancang khusus untuk memperkuat ikatan
        komunitas muslim dan menyediakan konten Islami berkualitas tinggi.
        Bergabunglah dengan komunitas, obrolan langsung, dan tonton video Islami
        yang mendidik dan menginspirasi.
      </p>
      {user ? (
        ""
      ) : (
        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition duration-300"
        >
          Bergabung Sekarang
        </Link>
      )}
    </div>
  );
};

export default Home;
