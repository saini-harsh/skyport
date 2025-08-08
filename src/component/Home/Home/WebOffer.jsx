import React, { useEffect, useRef, useState } from "react";
import "./WebOffer.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Container } from "react-bootstrap";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WebOffer = ({ defaultTab = "All" }) => {
  const swiperRef = useRef(null);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ["All", "Flights", "Hotels", "Holidays", "Cabs", "Bus"];

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get(
          "https://admin.tripgoonline.com/api/AllOffers"
        );
        if (res.data.success && res.data.data) {
          setOffers(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const filteredData = offers.filter((item) => {
    if (activeTab === "All") return true;
    return item.offer_type?.toLowerCase().includes(activeTab.toLowerCase());
  });

  // Show 5 skeleton slides
  const skeletonSlides = Array(5)
    .fill(0)
    .map((_, index) => (
      <SwiperSlide key={index} style={{ width: 306, marginRight: 24 }}>
        <ul className="sc-zdy0j7-12 kJCovN">
          <li className="sc-1bhhs5y-1 hHlOgt">
            <div className="sc-1bhhs5y-2 jWnEia">
              <Skeleton height={200} />
              <div style={{ padding: "10px 0" }}>
                <Skeleton height={20} width={80} />
                <Skeleton height={15} width={60} style={{ marginTop: 10 }} />
              </div>
            </div>
          </li>
        </ul>
      </SwiperSlide>
    ));

  return (
    <div
      className="GI_OFFERS_B2C_IN_V2 TG_OFFERS_B2C_IN_V2 TG_offer_forWebb"
      style={{ background: "#fff" }}
    >
      <Container style={{ position: "relative" }}>
        <div className="sc-zdy0j7-2 gTYlcV">
          <div className="sc-zdy0j7-3 ydnqq">
            <div className="sc-zdy0j7-4 dBaZvf">Exclusive Offer's</div>
          </div>

          {/* {defaultTab === "All" && (
            <ul
              className="sc-zdy0j7-8 gnOAiE"
              style={{ justifyContent: "center" }}
            >
              {tabs.map((tab) => (
                <li
                  key={tab}
                  className={`sc-zdy0j7-9 desction_offer_ul ${
                    activeTab === tab ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                  style={{ cursor: "pointer" }}
                >
                  {tab}
                </li>
              ))}
            </ul>
          )} */}
        </div>

        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            "@0.00": { slidesPerView: 2, spaceBetween: 10 },
            "@0.75": { slidesPerView: 3, spaceBetween: 20 },
            "@1.00": { slidesPerView: 3, spaceBetween: 40 },
            "@1.50": { slidesPerView: 5, spaceBetween: 10 },
          }}
          autoplay
          loop={!loading}
          className="mySwiper"
          style={{ paddingBottom: "20px" }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {loading
            ? skeletonSlides
            : offers.map((item, index) => (
                <SwiperSlide
                  key={index}
                  style={{ width: 306, marginRight: 24 }}
                >
                  <ul className="sc-zdy0j7-12 kJCovN">
                    <li className="sc-1bhhs5y-1 hHlOgt">
                      <div className="sc-1bhhs5y-2 jWnEia">
                        <div className="sc-1bhhs5y-3 ewsLKf">
                          <img
                            alt="offer img"
                            src={item.image}
                            loading="lazy"
                            className="sc-1bhhs5y-4 fxtiol"
                            style={{
                              height: "200px",
                              objectFit: "cover",
                              width: "100%",
                            }}
                          />
                        </div>
                        <div className="sc-1bhhs5y-5 cPvMEt">
                          <p className="sc-1bhhs5y-8 hSlkMg">{item.name}</p>
                          <div className="sc-1bhhs5y-24 liLUOt">
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#5C6472",
                                fontWeight: "500",
                              }}
                            >
                              {item.description || item.price}
                            </span>
                            <span
                              style={{
                                fontSize: "12px",
                                color: "#5C6472",
                                fontWeight: "500",
                              }}
                            >
                              {item.url ? (
                                <a target="_blank" rel="noreferrer" style={{color:'#f73030',textDecoration:'underline'}}>
                                  Know more
                                </a>
                              ) : (
                                "Know more"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </SwiperSlide>
              ))}
        </Swiper>

        {!loading && (
          <>
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
          </>
        )}
      </Container>
    </div>
  );
};

export default WebOffer;
