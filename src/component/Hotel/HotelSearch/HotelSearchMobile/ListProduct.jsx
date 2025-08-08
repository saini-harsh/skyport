import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "./ListProduct.css";

const productItems = [
  { key: "flight", label: "Flight", icon: "/Images/Icons/flightss.png", link: "/" },
  { key: "hotel", label: "Hotel", icon: "/Images/Icons/hotelss.png", link: "/hotel" },
  { key: "tour", label: "Tours", icon: "/Images/Icons/holidayss.png", link: "/tour" },
  { key: "cabs", label: "Cabs", icon: "/Images/Icons/cabss.png", link: "/cabs" },
  { key: "buses", label: "Buses", icon: "/Images/Icons/busess.png", link: "/buses" },
  { key: "visa", label: "Visa", icon: "/Images/Icons/visass.png", link: "/visa" },
  { key: "insurance", label: "Insurance", icon: "/Images/Icons/insurancess.png", link: "/insurance" },
  { key: "forex", label: "Forex", icon: "/Images/Icons/forexss.png", link: "/forex" },
];

const ListProduct = ({ active }) => {
  const swiperRef = useRef(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const checkNavButtons = () => {
    if (swiperRef.current) {
      setShowPrev(!swiperRef.current.isBeginning);
      setShowNext(!swiperRef.current.isEnd);
    }
  };

  useEffect(() => {
    const swiper = swiperRef.current;
    if (swiper) {
      checkNavButtons();
      swiper.on("slideChange", checkNavButtons);
      swiper.on("resize", checkNavButtons);
    }
    return () => {
      if (swiper) {
        swiper.off("slideChange", checkNavButtons);
        swiper.off("resize", checkNavButtons);
      }
    };
  }, []);

  const handleSlideNext = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      const newIndex = Math.min(swiper.activeIndex + 3, swiper.slides.length - 1);
      swiper.slideTo(newIndex, 300); // Smooth transition for buttons
    }
  };

  const handleSlidePrev = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      const newIndex = Math.max(swiper.activeIndex - 3, 0);
      swiper.slideTo(newIndex, 300);
    }
  };

  return (
    <div className="hotelsearchmobile">
      <section
        className="first outer listProduct app-hide list_product_phone_container"
        id="mainhotelhedermob"
        style={{ position: "relative" }}
      >
        <Swiper
          speed={100} // Applies to button navigation only
          slidesPerView={5}
          spaceBetween={10}
          freeMode={true}
          freeModeMomentum={true}
          freeModeMomentumRatio={0.5} // Controls swipe momentum duration
          freeModeMomentumVelocityRatio={0.4}
          touchRatio={1.5}
          resistanceRatio={0.5}
          simulateTouch={true}
          breakpoints={{
            320: { slidesPerView: 5 },
            480: { slidesPerView: 5 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 5 },
            1200: { slidesPerView: 5 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            checkNavButtons();
          }}
        >
          {productItems.map((item) => (
            <SwiperSlide key={item.key}>
              <div className={`_innerbx ${active === item.key ? "actvMenu" : ""}`}>
                <Link to={item.link}>
                  <div
                    className="produt-icon hotel-icon"
                    style={{ backgroundImage: `url(${item.icon})` }}
                  />
                  <span className="_icnPttl">{item.label}</span>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {showNext && (
          <div className="custom-next3" onClick={handleSlideNext}>
            <FaChevronRight color="#1d489f" className="fav_chevronnr" />
          </div>
        )}

        {showPrev && (
          <div className="custom-prev3" onClick={handleSlidePrev}>
            <FaChevronLeft color="#1d489f" className="fav_chevronnr" />
          </div>
        )}
      </section>
    </div>
  );
};

export default ListProduct;
