import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Row, Col, Image, Container } from "react-bootstrap";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import "./TopCities.css";

// const data = [
//   {
//     img: "https://www.easemytrip.com/images/desk-img/mumbai-img.png",
//     desti: "Delhi",
//     ori: "Mumbai",
//     overall: "DEL-BOM",
//     url: `/flightList/dest_BOM*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/bangalore-img.png",
//     desti: "Delhi",
//     ori: "Banglore",
//     overall: "DEL-BLR",
//     url: `/flightList/dest_BLR*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/dubai-img.png",
//     desti: "Delhi",
//     ori: "Dubai",
//     overall: "DEL-DXB",
//     url: `/flightList/dest_DXB*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/ahmedabad-img.png",
//     desti: "Delhi",
//     ori: "Ahmedabad",
//     overall: "DEL-AMD",
//     url: `/flightList/dest_AMD*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/jaipur-img.png",
//     desti: "Mumbai",
//     ori: "Jaipur",
//     overall: "BOM-JAI",
//     url: `/flightList/dest_JAI*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/lucknow-img.png",
//     desti: "Delhi",
//     ori: "Lucknow",
//     overall: "DEL-LKO",
//     url: `/flightList/dest_LKO*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/chennai-img.png",
//     desti: "Mumbai",
//     ori: "Chennai",
//     overall: "BOM-MAA",
//     url: `/flightList/dest_MAA*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`
//   },
//   {
//     img:"https://www.easemytrip.com/images/desk-img/dubai-img.png",
//     desti: "Mumbai",
//     ori: "Dubai",
//     overall: "BOM-DXB",
//     url: `/flightList/dest_DXB*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`
//   },
//   {
//     img: "https://www.easemytrip.com/images/desk-img/kolkata-img.png",
//     desti: "Delhi",
//     ori: "Kolkata",
//     overall: "DEL-CCU",
//     url: `/flightList/dest_CCU*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`
//   },
// ];
const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};
const TopCities = () => {
  const tomorrowDate = getTomorrowDate();
  const [activeTab, setActiveTab] = useState("domestic");

  const swiperRef = useRef(null);
  const domestic = [
    {
      img: "https://images.ixigo.com/image/upload/flightshome/79ee38cdbe961dccc3474b0bb92a3e06-nehrw.png",
      origin: "Mumbai",
      data: [
        {
          destination: "Goa",
          link: `/flightList/dest_BOM*org_GOI*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_BOM*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_BOM*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Ahmedabad",
          link: `/flightList/dest_BOM*org_AMD*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      img: "https://images.ixigo.com/image/upload/flightshome/4c3658a4867b64f0cd3806ba996b65b9-hgqbk.png",
      origin: "Delhi",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_DEL*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Goa",
          link: `/flightList/dest_DEL*org_GOI*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_DEL*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Pune",
          link: `/flightList/dest_DEL*org_PNQ*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      img: "https://images.ixigo.com/image/upload/flightshome/2aa9b6f5152b47e8fe6f3c6869005b64-kwkop.png",
      origin: "Kolkata",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_CCU*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_CCU*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_CCU*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bagdogra",
          link: `/flightList/dest_CCU*org_IXB*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      img: "https://images.ixigo.com/image/upload/flightshome/d68be4fa4a16e49ad3c604ff56a6e381-aavhe.png",
      origin: "Chennai",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_MAA*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_MAA*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Madurai",
          link: `/flightList/dest_MAA*org_IXM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Coimbatore",
          link: `/flightList/dest_MAA*org_CJB*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      img: "https://images.ixigo.com/image/upload/flightshome/233a5d159be13a22fe3c08f5d2843886-znstx.png",
      origin: "Hyderabad",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_HYD*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Goa",
          link: `/flightList/dest_HYD*org_GOI*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_HYD*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_HYD*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      img: "https://images.ixigo.com/image/upload/flightshome/ff1243e5e4925d7d2a0b7132efd1f028-dyasj.png",
      origin: "Ahmedabad",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_AMD*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_AMD*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_AMD*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Goa",
          link: `/flightList/dest_AMD*org_GOI*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
  ];

  const international = [
    {
      origin: "Dubai",
      img: "https://images.ixigo.com/image/upload/international-flights/0961c7b42f2ca80db9f21f3cc92ead20-mjvxq.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_DXB*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_DXB*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_DXB*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Chennai",
          link: `/flightList/dest_DXB*org_MAA*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      origin: "Bangkok",
      img: "https://images.ixigo.com/image/upload/international-flights/4908135a0884d82aba928cc61ea10829-zxfmm.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_BKK*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_BKK*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_BKK*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Kolkata",
          link: `/flightList/dest_BKK*org_CCU*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      origin: "Singapore",
      img: "https://images.ixigo.com/image/upload/international-flights/85a1ec7f8c85db1c8574e407bb5893dc-cgjoa.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_SIN*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_SIN*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_SIN*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Chennai",
          link: `/flightList/dest_SIN*org_MAA*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      origin: "London",
      img: "https://images.ixigo.com/image/upload/international-flights/6b26dab0b2ddaefe4a1854e4d0c0aa2b-ymcjd.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_LON*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_LON*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_LON*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Hyderabad",
          link: `/flightList/dest_LON*org_HYD*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      origin: "Melbourne",
      img: "https://images.ixigo.com/image/upload/international-flights/01c0f855ac7608f63e6aa1bce4389d5a-wvnvc.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_MLB*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_MLB*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_MLB*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Amritsar",
          link: `/flightList/dest_MLB*org_ATQ*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
    {
      origin: "Kathmandu",
      img: "https://images.ixigo.com/image/upload/international-flights/3ad8f80d0c76536dfc29851458881c26-hsphw.webp",
      data: [
        {
          destination: "Mumbai",
          link: `/flightList/dest_KTM*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Delhi",
          link: `/flightList/dest_KTM*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Bangalore",
          link: `/flightList/dest_KTM*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
        {
          destination: "Kolkata",
          link: `/flightList/dest_KTM*org_CCU*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
        },
      ],
    },
  ];

  return (
    <div className="GI_OFFERS_B2C_IN_V2 TG__topCities">
      <div className="sc-1umf7nv-105 igBafX">
        <div className="sc-1umf7nv-107 bIEKkd">
          <h2 color="#222222" className="sc-jXbUNg dRpmLD">
            Popular Flight Routes
          </h2>
          <ul
            className="sc-1umf7nv-111 kFlkOL"
            style={{ marginBottom: "15px" }}
          >
            <li
              className={`sc-1umf7nv-112 eqzCTD ${
                activeTab === "domestic" ? "active" : ""
              }`}
              onClick={() => setActiveTab("domestic")}
            >
              Domestic Flights
            </li>

            <li
              className={`sc-1umf7nv-112 eqzCTD ${
                activeTab === "international" ? "active" : ""
              }`}
              onClick={() => setActiveTab("international")}
            >
              International Flights
            </li>
          </ul>
        </div>
        {activeTab === "international" && (
          <>
            {international.map((item) => (
              <div className="d-flex border rounded align-items-center overflow-hidden border-light shadow-sm mb-2">
                <div
                  style={{
                    width: "50px",
                    height: "60px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={item.img}
                    alt="International Flight"
                    width={50}
                    height={60}
                    className="object-cover"
                  />
                </div>
                <div className="px-3 py-2">
                  <p className="fw-bold mb-1" style={{ color: "#404040" }}>
                    {item.origin} Flights
                  </p>
                  <div className="d-flex align-items-start gap-1 flex-wrap">
                    <p className="text-muted mb-0">To:</p>
                    {item.data.map((datas, i) => (
                      <div className="d-flex flex-wrap gap-2">
                        <Link
                          to={datas.link}
                          className="text-[#1d489f] text-decoration-none top_citires_forntt"
                        >
                          {datas.destination}
                        </Link>
                        {i !== item.data.length - 1 && (
                          <span className="text-[#1d489f]">•</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === "domestic" && (
          <>
            {domestic.map((item) => (
              <div className="d-flex border rounded align-items-center overflow-hidden border-light shadow-sm mb-2">
                <div
                  style={{
                    width: "50px",
                    height: "60px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={item.img}
                    alt="Domestic Flight"
                    width={50}
                    height={60}
                    className="object-cover"
                  />
                </div>
                <div className="px-3 py-2">
                  <p className="fw-bold mb-1" style={{ color: "#404040" }}>
                    {item.origin} Flights
                  </p>
                  <div className="d-flex align-items-start gap-1 flex-wrap">
                    <p className="text-muted mb-0">To:</p>
                    {item.data.map((datas,i) => (
                      <div className="d-flex flex-wrap gap-2">
                        <Link
                          to={datas.link}
                          className="text-[#1d489f] text-decoration-none top_citires_forntt"
                        >
                          {datas.destination}
                        </Link>
                        {i !== item.data.length - 1 && (
                          <span className="text-[#1d489f]">•</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* <div className="d-flex border rounded align-items-center overflow-hidden border-light shadow-sm mb-2">
      <div style={{ width: '50px', height: '60px', position: 'relative' }}>
        <Image
          src="https://images.ixigo.com/image/upload/flightshome/79ee38cdbe961dccc3474b0bb92a3e06-nehrw.png"
          alt="Mumbai Flights"
          title="Mumbai Flights"
          width={50}
          height={60}
          className="object-cover"
        />
      </div>
      <div className="px-3 py-2">
      <p className="fw-bold mb-1" style={{color:'#404040'}}>Mumbai Flights</p>
        <div className="d-flex align-items-start gap-1 flex-wrap">
          <p className="text-muted mb-0">To:</p>
          <div className="d-flex flex-wrap gap-2">
            <a href="https://www.ixigo.com/cheap-flights/mumbai-goa-bom-goi" className="text-[#1d489f] text-decoration-none">
              Goa
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-new-delhi-bom-del" className="text-[#1d489f] text-decoration-none">
              Delhi
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-bengaluru-bom-blr" className="text-[#1d489f] text-decoration-none">
              Bangalore
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-ahmedabad-bom-amd" className="text-[#1d489f] text-decoration-none">
              Ahmedabad
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="d-flex border rounded align-items-center overflow-hidden border-light shadow-sm mb-2">
      <div style={{ width: '50px', height: '60px', position: 'relative' }}>
        <Image
          src="https://images.ixigo.com/image/upload/flightshome/79ee38cdbe961dccc3474b0bb92a3e06-nehrw.png"
          alt="Mumbai Flights"
          title="Mumbai Flights"
          width={50}
          height={60}
          className="object-cover"
        />
      </div>
      <div className="px-3 py-2">
      <p className="fw-bold mb-1" style={{color:'#404040'}}>Mumbai Flights</p>
        <div className="d-flex align-items-start gap-1 flex-wrap">
          <p className="text-muted mb-0">To:</p>
          <div className="d-flex flex-wrap gap-2">
            <a href="https://www.ixigo.com/cheap-flights/mumbai-goa-bom-goi" className="text-[#1d489f] text-decoration-none">
              Goa
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-new-delhi-bom-del" className="text-[#1d489f] text-decoration-none">
              Delhi
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-bengaluru-bom-blr" className="text-[#1d489f] text-decoration-none">
              Bangalore
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-ahmedabad-bom-amd" className="text-[#1d489f] text-decoration-none">
              Ahmedabad
            </a>
          </div>
        </div>
      </div>
    </div><div className="d-flex border rounded align-items-center overflow-hidden border-light shadow-sm mb-2">
      <div style={{ width: '50px', height: '60px', position: 'relative' }}>
        <Image
          src="https://images.ixigo.com/image/upload/flightshome/79ee38cdbe961dccc3474b0bb92a3e06-nehrw.png"
          alt="Mumbai Flights"
          title="Mumbai Flights"
          width={50}
          height={60}
          className="object-cover"
        />
      </div>
      <div className="px-3 py-2">
      <p className="fw-bold mb-1" style={{color:'#404040'}}>Mumbai Flights</p>
        <div className="d-flex align-items-start gap-1 flex-wrap">
          <p className="text-muted mb-0">To:</p>
          <div className="d-flex flex-wrap gap-2">
            <a href="https://www.ixigo.com/cheap-flights/mumbai-goa-bom-goi" className="text-[#1d489f] text-decoration-none">
              Goa
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-new-delhi-bom-del" className="text-[#1d489f] text-decoration-none">
              Delhi
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-bengaluru-bom-blr" className="text-[#1d489f] text-decoration-none">
              Bangalore
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-ahmedabad-bom-amd" className="text-[#1d489f] text-decoration-none">
              Ahmedabad
            </a>
          </div>
        </div>
      </div>
    </div><div className="d-flex border rounded align-items-center overflow-hidden border-light shadow-sm mb-2">
      <div style={{ width: '50px', height: '60px', position: 'relative' }}>
        <Image
          src="https://images.ixigo.com/image/upload/flightshome/79ee38cdbe961dccc3474b0bb92a3e06-nehrw.png"
          alt="Mumbai Flights"
          title="Mumbai Flights"
          width={50}
          height={60}
          className="object-cover"
        />
      </div>
      <div className="px-3 py-2">
      <p className="fw-bold mb-1" style={{color:'#404040'}}>Mumbai Flights</p>
        <div className="d-flex align-items-start gap-1 flex-wrap">
          <p className="text-muted mb-0">To:</p>
          <div className="d-flex flex-wrap gap-2">
            <a href="https://www.ixigo.com/cheap-flights/mumbai-goa-bom-goi" className="text-[#1d489f] text-decoration-none">
              Goa
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-new-delhi-bom-del" className="text-[#1d489f] text-decoration-none">
              Delhi
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-bengaluru-bom-blr" className="text-[#1d489f] text-decoration-none">
              Bangalore
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-ahmedabad-bom-amd" className="text-[#1d489f] text-decoration-none">
              Ahmedabad
            </a>
          </div>
        </div>
      </div>
    </div><div className="d-flex border rounded align-items-center overflow-hidden border-light shadow-sm mb-2">
      <div style={{ width: '50px', height: '60px', position: 'relative' }}>
        <Image
          src="https://images.ixigo.com/image/upload/flightshome/79ee38cdbe961dccc3474b0bb92a3e06-nehrw.png"
          alt="Mumbai Flights"
          title="Mumbai Flights"
          width={50}
          height={60}
          className="object-cover"
        />
      </div>
      <div className="px-3 py-2">
        <p className="fw-bold mb-1" style={{color:'#404040'}}>Mumbai Flights</p>
        <div className="d-flex align-items-start gap-1 flex-wrap">
          <p className="text-muted mb-0">To:</p>
          <div className="d-flex flex-wrap gap-2">
            <a href="https://www.ixigo.com/cheap-flights/mumbai-goa-bom-goi" className="text-[#1d489f] text-decoration-none">
              Goa
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-new-delhi-bom-del" className="text-[#1d489f] text-decoration-none">
              Delhi
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-bengaluru-bom-blr" className="text-[#1d489f] text-decoration-none">
              Bangalore
            </a>
            <span className="text-[#1d489f]">•</span>
            <a href="https://www.ixigo.com/cheap-flights/mumbai-ahmedabad-bom-amd" className="text-[#1d489f] text-decoration-none">
              Ahmedabad
            </a>
          </div>
        </div>
      </div>
    </div> */}
      </div>
    </div>
  );
};

export default TopCities;
