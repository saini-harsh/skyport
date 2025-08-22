import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import "./Deals.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Deals = () => {
  const swiperRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const getTomorrowMidnight = () => {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0); // set to midnight
      return tomorrow;
    };

    const updateTimer = () => {
      const now = new Date();
      const diff = getTomorrowMidnight() - now;

      if (diff <= 0) {
        setTimeLeft("00 : 00 : 00");
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")} : ${minutes
          .toString()
          .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`
      );
    };

    updateTimer(); // initialize immediately
    const timerId = setInterval(updateTimer, 1000); // update every second

    return () => clearInterval(timerId); // cleanup
  }, []);
  const filteredDeals = [
    {
      airline: "Air India",
      logo: "/Images/AirlineLogo/AI.gif",
      offer: "Flat 5% off",
      date: "Mon, 21 May",
      fromTime: "02:52",
      fromCode: "DEL",
      toTime: "02:52",
      toCode: "DEL",
    },
    {
      airline: "Indigo",
      logo: "/Images/AirlineLogo/6E.gif",
      offer: "Flat 5% off",
      date: "Mon, 21 May",
      fromTime: "02:52",
      fromCode: "DEL",
      toTime: "02:52",
      toCode: "DEL",
    },
    {
      airline: "Air India",
      logo: "/Images/AirlineLogo/AI.gif",
      offer: "Flat 5% off",
      date: "Mon, 21 May",
      fromTime: "02:52",
      fromCode: "DEL",
      toTime: "02:52",
      toCode: "DEL",
    },
    {
      airline: "Indigo",
      logo: "/Images/AirlineLogo/6E.gif",
      offer: "Flat 5% off",
      date: "Mon, 21 May",
      fromTime: "02:52",
      fromCode: "DEL",
      toTime: "02:52",
      toCode: "DEL",
    },
    {
      airline: "Air India",
      logo: "/Images/AirlineLogo/AI.gif",
      offer: "Flat 5% off",
      date: "Mon, 21 May",
      fromTime: "02:52",
      fromCode: "DEL",
      toTime: "02:52",
      toCode: "DEL",
    },
    {
      airline: "Indigo",
      logo: "/Images/AirlineLogo/6E.gif",
      offer: "Flat 5% off",
      date: "Mon, 21 May",
      fromTime: "02:52",
      fromCode: "DEL",
      toTime: "02:52",
      toCode: "DEL",
    },
  ];
  // const filteredDeals = dealsData.filter(deal => deal.airline === "Indigo");

  return (
    <div className="Deals_TG_Container">
     <Container>
     <Row style={{ padding: "30px 0px 15px 0px" }}>
        <Col>
          <h4 style={{ fontWeight: "700" }}>Offers - Daily Deals</h4>
          <div className="from_to_TG_to">
            <IoLocationSharp size={20} color="#053355" />
            From / Mumbai
          </div>
        </Col>
        <Col style={{ textAlign: "end" }}>
          <h6 style={{ fontWeight: "600", color: "#053355" }}>Closed At</h6>
          <h4 style={{ fontWeight: "700", color: "#f73131" }}>{timeLeft}</h4>
        </Col>
      </Row>
      <Row >
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={20}
          autoplay={{ delay: 3000 }}
          loop
          className="mySwiper"
          style={{ paddingBottom: "20px" }}
           onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {filteredDeals.map((deal, index) => (
            <SwiperSlide key={index} style={{ width: 230, marginRight: 24 }}>
              <div className="deals_of_day_cont">
                <div className="deal_of_dayy_swiper">
                  <div>
                    <img
                      src={deal.logo}
                      alt={deal.airline}
                      style={{ width: "32px", height: "32px" }}
                    />
                    <span style={{ fontWeight: "700", marginLeft: "8px" }}>
                      {deal.airline}
                    </span>
                  </div>
                  <span className="deal_flat_off">{deal.offer}</span>
                </div>
                <p
                  style={{
                    padding: "5px 0px",
                    fontSize: "15px",
                    color: "#5e5e5e",
                  }}
                >
                  {deal.date}
                </p>
                <div className="deal_of_dayy_Dest">
                  <div>
                    <p className="deal_day_fW">{deal.fromTime}</p>
                    <p>{deal.fromCode}</p>
                  </div>
                  <div style={{ textAlign: "end" }}>
                    <p className="deal_day_fW">{deal.toTime}</p>
                    <p>{deal.toCode}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
          <div
                  className="custom-next3"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <FaChevronRight />
                </div>
                <div
                  className="custom-prev3"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  <FaChevronLeft />
                </div>
      </Row>
     </Container>
    </div>
  );
};

export default Deals;
