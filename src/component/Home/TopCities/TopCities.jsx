import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./TopCity.css";
import Left from "./wing.png";
import Right from "./wing2.png";
import { Link } from "react-router-dom";

const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
};

const tomorrowDate = getTomorrowDate();

 const international = [
  {
    origin: "Georgetown",
    img: "https://images.ixigo.com/image/upload/international-flights/0961c7b42f2ca80db9f21f3cc92ead20-mjvxq.webp",
    data: [
      {
        destination: "Dubai",
        link: `/flightList/dest_GEO*org_DXB*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Paris",
        link: `/flightList/dest_GEO*org_CDG*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Tokyo",
        link: `/flightList/dest_GEO*org_HND*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "London",
        link: `/flightList/dest_GEO*org_LHR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
    ],
  },
  {
    origin: "Georgetown",
    img: "https://images.ixigo.com/image/upload/international-flights/4908135a0884d82aba928cc61ea10829-zxfmm.webp",
    data: [
      {
        destination: "Rome",
        link: `/flightList/dest_GEO*org_FCO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Malé",
        link: `/flightList/dest_GEO*org_MLE*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Cape Town",
        link: `/flightList/dest_GEO*org_CPT*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Beijing",
        link: `/flightList/dest_GEO*org_PEK*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
    ],
  },
  {
    origin: "Georgetown",
    img: "https://images.ixigo.com/image/upload/international-flights/85a1ec7f8c85db1c8574e407bb5893dc-cgjoa.webp",
    data: [
      {
        destination: "Bora Bora",
        link: `/flightList/dest_GEO*org_BOB*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Sydney",
        link: `/flightList/dest_GEO*org_SYD*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Santorini",
        link: `/flightList/dest_GEO*org_JTR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Mumbai",
        link: `/flightList/dest_GEO*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
    ],
  },
  {
    origin: "London",
    img: "https://images.ixigo.com/image/upload/international-flights/6b26dab0b2ddaefe4a1854e4d0c0aa2b-ymcjd.webp",
    data: [
      {
        destination: "Dubai",
        link: `/flightList/dest_LON*org_DXB*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Paris",
        link: `/flightList/dest_LON*org_CDG*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Rome",
        link: `/flightList/dest_LON*org_FCO*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Tokyo",
        link: `/flightList/dest_LON*org_HND*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
    ],
  },
  {
    origin: "Melbourne",
    img: "https://images.ixigo.com/image/upload/international-flights/01c0f855ac7608f63e6aa1bce4389d5a-wvnvc.webp",
    data: [
      {
        destination: "London",
        link: `/flightList/dest_MLB*org_LHR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Santorini",
        link: `/flightList/dest_MLB*org_JTR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Malé",
        link: `/flightList/dest_MLB*org_MLE*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Beijing",
        link: `/flightList/dest_MLB*org_PEK*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
    ],
  },
  {
    origin: "Kathmandu",
    img: "https://images.ixigo.com/image/upload/international-flights/3ad8f80d0c76536dfc29851458881c26-hsphw.webp",
    data: [
      {
        destination: "Bora Bora",
        link: `/flightList/dest_KTM*org_BOB*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Dubai",
        link: `/flightList/dest_KTM*org_DXB*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Sydney",
        link: `/flightList/dest_KTM*org_SYD*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
      {
        destination: "Cape Town",
        link: `/flightList/dest_KTM*org_CPT*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2`,
      },
    ],
  },
];




const TopCities = () => {
  return (
    <div className="top-second-cities-container">
      <Container>
        <div className="_toprflcont">
          <div className="_hdrtxt">
           
            <div className="top_cities_flight_serach">
              Inter-Caribbean destinations
            </div>
          
          </div>
        </div>
        <Row style={{ padding: "10px" }}>
          {international.map((item, index) => (
            <Col md={4}>
              <div className="d-flex border rounded align-items-center overflow-hidden border-light shadow-sm mb-3 top_cities_mainnn_cont">
                <div
                  style={{
                    width: "60px",
                  
                    position: "relative",
                  }}
                >
                  <Image
                    src={item.img}
                    alt="Mumbai Flights"
                    title="Mumbai Flights"
                    width={50}
                    height={60}
                    className="object-cover top_cities_images_all"
                  />
                </div>
                <div className="px-3 py-2">
                  <p className="fw-bold mb-1" style={{ color: "#404040" }}>
                    {item.origin} Flights
                  </p>
                  <div className="d-flex align-items-center gap-1 flex-row">
                    <p className="text-muted mb-0">To:</p>
                    <div className="d-flex  gap-2 top_citites_fontt">
                      {item.data.map((datas, i) => (
                        <>
                          <Link
                            to={datas.link}
                            className="text-[#1d489f] text-decoration-none"
                          >
                            {datas.destination}
                          </Link>
                          {i !== item.data.length - 1 && (
                            <span className="text-[#1d489f]">•</span>
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
             
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TopCities;
