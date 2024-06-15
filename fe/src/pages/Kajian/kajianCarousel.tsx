import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import axios from "axios";

function Card({ children }) {
  return <div className="shadow-xl rounded-lg p-4">{children}</div>;
}

function CardContent({ children, className }) {
  return <div className={` ${className}`}>{children}</div>;
}

function Carousel({ children, className }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>{children}</div>
  );
}

function CarouselContent({ children, style }) {
  return (
    <div
      className="flex transition-transform duration-700 ease-in-out "
      style={style}
    >
      {children}
    </div>
  );
}

function CarouselItem({ children }) {
  return <div className="flex-shrink-0 w-full">{children}</div>;
}

function CarouselPrevious({ onClick }) {
  return (
    <button onClick={onClick} className="text-main-bg">
      <BsArrowLeftCircle size={40} />
    </button>
  );
}

function CarouselNext({ onClick }) {
  return (
    <button onClick={onClick} className="text-main-bg">
      <BsArrowRightCircle size={40} />
    </button>
  );
}

export function KajianCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [kajian, setKajian] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalSlides = kajian.length;

  useEffect(() => {
    fetchKajian();
  }, [currentPage]);

  const fetchKajian = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/kajian?page=${currentPage}&perPage=3`
      );
      const data = response.data.data;
      setKajian(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [totalSlides]);

  return (
    <div className="flex flex-col items-center">
      <Carousel className="w-full ">
        <CarouselContent
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {kajian.map((kajian, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card>
                  <CardContent className="flex gap-10">
                    <div className="flex bg-main-bg w-full h-auto md:h-[350px] rounded-xl">
                      <div className="flex flex-col justify-between ">
                        <div className="flex md:flex-row flex-col gap-4">
                          <div>
                            <img
                              src={kajian.image}
                              className="md:h-[350px] w-full md:min-w-[500px] object-cover md:rounded-l-xl"
                              alt="gambar kajian"
                            />
                          </div>
                          <div className="flex flex-col py-4 px-4 md:px-0 gap-4 justify-evenly">
                            <div>
                              <h1 className="text-4xl font-semibold">
                                {kajian.title}
                              </h1>
                              <div className="flex text-lg">
                                <p>{kajian.date}</p>
                                <p>-</p>
                                <p>{kajian.lokasi}</p>
                              </div>
                            </div>
                            <div className="text-xl">{kajian.description}</div>
                            <div className="flex justify-center items-center md:justify-start">
                              <Link
                                to={`/kajian/${kajian.kajian_id}`}
                                className="w-[159px] flex justify-center items-center rounded-full p-1 border-third-bg border-[1px]"
                              >
                                Lihat Selengkapnya
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className={`flex justify-center gap-4 p-5 ${kajian.length > 1 ? 'block' : 'hidden'}`}>
        <CarouselPrevious onClick={handlePrevious} />
        <CarouselNext onClick={handleNext} />
      </div>
    </div>
  );
}
