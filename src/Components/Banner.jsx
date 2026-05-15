import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom"; // Link ব্যবহার করা ভালো

const slidesData = [
  {
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop",
    title: "Empower Your Learning",
    highlight: "Personalized Guidance",
    subtitle:
      "Connect with world-class tutors for expert-led learning experiences.",
    buttonText: "Find a Tuition",
    buttonLink: "/tuitions",
  },
  {
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    title: "Shape Your Future",
    highlight: "Expert Educators",
    subtitle:
      "Join our network of professional tutors and build a rewarding career.",
    buttonText: "Join as Tutor",
    buttonLink: "/register",
  },
  {
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop",
    title: "Master New Skills",
    highlight: "Quality Resources",
    subtitle:
      "Access high-quality study materials and track your academic progress.",
    buttonText: "Learn More",
    buttonLink: "/about",
  },
];

const Banner = () => {
  return (
    <div className="w-full group">
      <Swiper
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Navigation, Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="mySwiper w-full h-[300px] sm:h-[450px] lg:h-[550px]" // উচ্চতা একটু বাড়ানো হয়েছে প্রিমিয়াম লুকের জন্য
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full flex items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.5)), url(${slide.image})`,
              }}
            >
              {/* Content Container */}
              <div className="relative z-10 text-center text-white px-6 max-w-5xl">
                <h2 className="text-2xl sm:text-5xl lg:text-7xl font-black mb-4 drop-shadow-2xl leading-tight">
                  {slide.title} <br />
                  <span className="text-orange-500 italic font-serif">
                    {slide.highlight}
                  </span>
                </h2>
                <p className="text-sm sm:text-lg lg:text-xl mb-8 opacity-90 font-medium max-w-2xl mx-auto leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex justify-center gap-4">
                  <Link
                    to={slide.buttonLink}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 sm:px-10 sm:py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>

              {/* Decorative Overlay for Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modern UI Customization */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          background: rgba(255, 255, 255, 0.1);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          backdrop-filter: blur(5px);
          transition: all 0.3s;
          opacity: 0;
        }
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #f97316 !important; /* Orange Active Bullet */
          width: 30px !important;
          border-radius: 10px !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Banner;
