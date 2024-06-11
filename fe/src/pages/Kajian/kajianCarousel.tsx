import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bg from "../../assets/bg.png";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

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

const cards = [
  {
    title: "Judul Kajian 1",
    date: "01-01-2024",
    location: "Lokasi 1",
    description:
      "Deskripsi Kajian 1 Deskripsi Kajian 1 Deskripsi Kajian 1 Deskripsi Kajian 1 Deskripsi Kajian 1 Deskripsi Kajian 1",
    link: "",
  },
  {
    title: "Judul Kajian 2",
    date: "02-01-2024",
    location: "Lokasi 2",
    description:
      "Deskripsi Kajian 2 Deskripsi Kajian 2 Deskripsi Kajian 2 Deskripsi Kajian 2 Deskripsi Kajian 2 Deskripsi Kajian 2 ",
    link: "",
  },
];

export function KajianCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = cards.length;

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
          {cards.map((card, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card>
                  <CardContent className="flex gap-10">
                    <div className="flex bg-main-bg w-full h-auto md:h-[300px] rounded-xl ">
                      <div className="flex flex-col justify-between md:flex-col">
                        <div className="flex md:flex-row flex-col gap-4">
                          <img
                            src={bg}
                            className="md:h-[300px] w-[454px] object-cover rounded-t-xl md:rounded-l-xl"
                            alt="gambar kajian"
                          />
                          <div className="flex flex-col py-4 px-4 md:px-0 gap-4 justify-center">
                            <div>
                              <h1 className="text-[25px] font-bold">
                                {card.title}
                              </h1>
                              <div className="flex gap-3">
                                <p>{card.date}</p>
                                <p>-</p>
                                <p>{card.location}</p>
                              </div>
                            </div>
                            <div className="text-[20px]">
                              {card.description}
                            </div>
                            <div className="flex justify-center items-center md:justify-start">
                              <Link
                                to={card.link}
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
      <div className="flex justify-center gap-4 p-5">
        <CarouselPrevious onClick={handlePrevious} />
        <CarouselNext onClick={handleNext} />
      </div>
    </div>
  );
}
