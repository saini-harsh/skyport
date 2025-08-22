import React, { useEffect, useRef, useState } from "react";

// Import ./BusBookingForm.css'Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Card, Form, Spinner } from "react-bootstrap";
import { BsArrowLeftRight } from "react-icons/bs";
// import FlightDeal from "../../../components/MainHome/Home/innerComponents/FlightDeal";
import { MdFlight, MdOutlineFlight } from "react-icons/md";
import { FaCity, FaHotel, FaSuitcaseRolling, FaWallet } from "react-icons/fa";
import moment from "moment";
import { BiSolidOffer } from "react-icons/bi";
import { IoBagHandleOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import Slider from "react-slick";
// import "./gdvfdty.css";
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { CountriesArray } from "../FlightSearchMobile/Countries";
// import { cities2 } from "./Cities";

import axios from "axios";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { AiOutlineSwap } from "react-icons/ai";
import {
  services,
  nationalityOptions,
} from "../../Hotel/HotelSearch/HotelSearchData";
import WebOffer from "../../Home/Home/WebOffer";
import ReasonsToBook from "../../Home/Home/ReasonToBook";
import PopularDestinations from "../../Hotel/HotelSearch/HotelSearchMobile/PopularDestinations";
import HotelsContainer from "../../Hotel/HotelSearch/HotelComponent";
import Foot from "../../Footer/Foot";
import WhyUss from "../../Home/Home/WhyUss";
import AboutHome from "../../Home/Home/AboutHome";
import WhyBookUsNew from "../../Home/Home/WhyBookUsNew";
import HotelChains from "./HotelChains";
import MobileApp from "../../Flight/FlightSearchMobile/MobileApp";
import SectionsHotel from "../../Hotel/HotelSearch/SectionsHotel";
import { toast } from "react-toastify";

// import { useDispatch } from "react-redux";
// import { flightSearch } from "../../../redux/services/operations/flight";

export const data = [
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_204,dpr_2/offermgmt/images/banner/RR_Hifive_0712.png",
  },
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/CTINT_RR_FLIGHTS_29052023.png",
  },
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/BBD/GiftCards_RR_12072023.png",
  },
  {
    img: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_LMD_H_3001.jpg",
  },
];

export var settings = {
  dots: false,
  autoplay: true,
  autoplaySpeed: 1500,
  infinite: true,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const extractBracketValue = (str) => {
  const regex = /\(([^)]+)\)/;
  const match = regex.exec(str);
  return match ? match[1] : null;
};
const cityToAirportCode = {
  Dubai: "DXB",
  Delhi: "DEL",
  Mumbai: "BOM",
  "New York": "JFK",
  London: "LHR",
  Paris: "CDG",
  Singapore: "SIN",
  // Add more cities as needed
};
const HotelSearchNew = () => {
  const bookusdata = [
    {
      img: "/Images/Icons/esy-flights.svg",
      head: "Easy Booking",
      desc: " Book Flights Easily and Grab Exciting Offers!",
    },
    {
      img: "/Images/Icons/down-arrows.svg",
      head: "Lowest Price",
      desc: "Guaranteed Low Rates on Hotels, Holiday Packages, and Flights",
    },
    {
      img: "/Images/Icons/return-boxs.svg",
      head: "Instant Refund",
      desc: "Get Quick and Easy Refunds on All Your Travel Bookings!",
    },
    {
      img: "/Images/Icons/24-hoursa.svg",
      head: "24/7 Support",
      desc: "24/7 Support for All Your Travel Queries — We're Here to Help!",
    },
    {
      img: "/Images/Icons/hot-sales.svg",
      head: "Exciting Deals",
      desc: "Unlock Exciting Deals on Flights, Hotels, Buses, Car Rentals, and Tours!",
    },
  ];
  const [rooms, setRooms] = useState([
    { adults: 1, children: 0, childrenAges: [] },
  ]);
  const [labelClicked, setLabelClicked] = useState(false);
  const [numberOfMonths, setNumberOfMonths] = useState(2);
  const [daysize, setDaySize] = useState(2);
  const [startDate, setStartDate] = useState(moment().add(1, "days"));
  // const [startDate, setStartDate] = useState(moment().add(1, "days"));
  const [endDate, setEndDate] = useState(null);
  const [searchedHotel, setSearchedHotel] = useState("");
  // const [searchedHotel, setSearchedHotel] = useState(
  //   "NATIONAL CAPITAL TERRITORY OF DELHI,"
  // );
  // useEffect(() => {
  //   setEndDate(active2 ? moment().add(2, "days") : null);
  // }, [active2]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [calVisible, setCalVisible] = useState(false);
  const [clickDestination, SetClickDestination] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setBreakpoints();
    };
    window.addEventListener("resize", handleResize);
    setBreakpoints();
    return () => window.removeEventListener("resize", handleResize);
  });

  const setBreakpoints = () => {
    const isSmallScreen = window.innerWidth <= 768;
    const isMediumScreen = window.innerWidth > 768 && window.innerWidth <= 992;
    if (isSmallScreen) {
      setDateRangeConfig(1, 30, 30);
    } else if (isMediumScreen) {
      setDateRangeConfig(2, 30, 60);
    } else {
      setDateRangeConfig(2, 40, 50);
    }
  };

  const setDateRangeConfig = (numberOfMonths, daysize) => {
    setNumberOfMonths(numberOfMonths);
    setDaySize(daysize);
  };

  const addRoom = () => {
    if (rooms.length < 6) {
      setRooms([...rooms, { adults: 2, children: 0, childrenAges: [] }]);
    }
  };

  const removeRoom = (index) => {
    if (rooms.length > 1) {
      const updatedRooms = [...rooms];
      updatedRooms.splice(index, 1);
      setRooms(updatedRooms);
    }
  };

  const updateRoom = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    if (field === "children") {
      updatedRooms[index].childrenAges = Array(value).fill(null); // Reset children ages
    }
    setRooms(updatedRooms);
  };

  const updateChildAge = (roomIndex, childIndex, age) => {
    const updatedRooms = [...rooms];
    updatedRooms[roomIndex].childrenAges[childIndex] = age;
    setRooms(updatedRooms);
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate && endDate) {
      setFocusedInput(null);
      setCalVisible(false);
    } else if (startDate) {
      setFocusedInput("endDate");
    }
  };

  const toggleCalendar = (input) => {
    setCalVisible(!calVisible);
    if (!calVisible) {
      if (input === "startDate") {
        setFocusedInput("startDate");
      } else if (input === "endDate") {
        setFocusedInput("endDate");
      } else {
        setCalVisible(!calVisible);
        if (!calVisible) setFocusedInput("startDate");
        else setFocusedInput(null);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      toast.error(`Please fill out all fields ${startDate} ${endDate}`);
      return;
    }
    const formDataToPass = {
      ...formData,
      from: selectedCityId,
      city: selectedCityName,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      rooms: JSON.stringify(rooms), // Convert rooms array to JSON string
    };

    console.log("form data filled", {
      ...formData,
      from: selectedCityId,
      city: selectedCityName,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      rooms: rooms,
    });
    localStorage.setItem("hotelRoomsConfig", JSON.stringify(rooms));
    localStorage.setItem("hotelCin", startDate.format("YYYY-MM-DD"));
    localStorage.setItem("hotelCout", endDate.format("YYYY-MM-DD"));


    const queryString = new URLSearchParams(formDataToPass).toString();
    navigate(`/hotelmodify?${queryString}`);
  };

  const handleInputChange = (value) => {
    setSearchInput(value.toLowerCase());
    SetClickDestination(true);
    setIsItemSelected(false);

    if (value.length === 3) {
      fetchDatas(value.toLowerCase());
    } else {
      setCities2([]); // clear suggestions if less than 3 characters
    }
  };

  const [searchInput, setSearchInput] = useState("Enter City Name");
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [cities2, setCities2] = useState([]);
  const [destinationCity, setDestinationCity] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [destination1, setDestination1] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");

  const handleCitySelect = (city) => {
    setDestinationCity(`${city["CityName"]}`);
    setSelectedCityId(`${city["id"]}`);
    setSelectedCityName(city["CityName"]); // if needed for display

    setSearchedHotel(`${city["CityName"]}`);
    SetClickDestination(false); // Close the city suggestion div
    setSearchInput(`${city["CityName"]} (${city["CountryName"]})`);
    setIsItemSelected(true);
    setDestination1(city);
  };

  const fetchDatas = async (value) => {
    try {
      const requestData = {
        city: value,
      };

      const response = await axios.post(
        "https://admin.tripgoonline.com/api/Hotel/CityList",
        requestData
      );

      // If API returns JSON directly in response.data
      const json = response.data;
      console.log("json responseee", json);

      const results = json.data
        .filter((user) => {
          return (
            user &&
            ((user.CityName &&
              user.CityName.toLowerCase().includes(value.toLowerCase())) ||
              (user.CountryName &&
                user.CountryName.toLowerCase().includes(value.toLowerCase())))
          );
        })
        .map((user) => {
          let priority = 3;

          if (
            user.CityName &&
            user.CityName.toLowerCase().includes(value.toLowerCase())
          ) {
            priority = 1;
          } else if (
            user.CountryName &&
            user.CountryName.toLowerCase().includes(value.toLowerCase())
          ) {
            priority = 2;
          }

          return { ...user, priority };
        })
        .sort((a, b) => a.priority - b.priority);

      console.log("RESULTS", results);
      setCities2(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // const fetchDatas = (value) => {
  //   fetch("https://admin.tripgoonline.com/api/Hotel/CityList")
  //     .then((response) => response.json())
  //     .then((json) => {
  //       console.log("json responseee", json);
  //       const results = json.data
  //         .filter((user) => {
  //           return (
  //             user &&
  //             ((user.CityName &&
  //               user.CityName.toLowerCase().includes(value.toLowerCase())) ||
  //               (user.CountryName &&
  //                 user.CountryCode
  //                   .toLowerCase()
  //                   .includes(value.toLowerCase())) )
  //           );
  //         })
  //         .map((user) => {
  //           let priority = 3;

  //           if (
  //             user.CityName &&
  //             user.CityName.toLowerCase().includes(value.toLowerCase())
  //           ) {
  //             priority = 1;
  //           } else if (
  //             user.CountryName &&
  //             user.CountryName.toLowerCase().includes(value.toLowerCase())
  //           ) {
  //             priority = 2;
  //           }

  //           return { ...user, priority };
  //         })
  //         .sort((a, b) => a.priority - b.priority);

  //       console.log("RESULTS", results);
  //       setCities2(results);
  //     });
  // };

  const slides = [
    {
      backgroundImage:
        "https://www.harbourhotels.co.uk/media/d4ipp450/1c57cb2a162815dd23ef3db35d0e8521.jpg",
      overlayColor: "#05335536",
      imgMark: "/Images/dream-feather-bg.png",
      title: "Search Hotels",
      subtitle: "Smooth Hotel Booking, Unbeatable Low Prices",
    },
    {
      backgroundImage:
        "https://3.imimg.com/data3/FM/MD/MY-1906485/hotel-booking.jpg",
      overlayColor: "#190a0a",
      imgMark: "/Images/dream-feather-bg.png",
      title: "Unlock Exclusive Hotel Deals",
      subtitle:
        " Premium Stays, Corporate Rates, and Seamless Hospitality Solutions",
    },
    {
      backgroundImage:
        "https://www.harbourhotels.co.uk/media/d4ipp450/1c57cb2a162815dd23ef3db35d0e8521.jpg",
      overlayColor: "#190a0a",
      imgMark: "/Images/dream-feather-bg.png",
      title: "Experience Hassle-Free Hotel Bookings",
      subtitle: "Premium Stays, and Unmatched Service – Only on TripGo",
    },
  ];

  return (
    <div
      className="bookimg_form_containerrr"
      // style={{
      //   background:
      //     "url('https://images.pexels.com/photos/30247232/pexels-photo-30247232/free-photo-of-airplane-wing-above-clouds-at-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   width: "100%",
      // }}
    >
      <div style={{ position: "relative" }}>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 50000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
          style={{ height: "300px" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="backgroundBanner banner banner-image"
                style={{
                  backgroundImage: `url(${slide.backgroundImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
                data-v-0b3b4b19=""
                data-v-b9cf504c=""
              >
                <div
                  className="overlay"
                  style={{
                    backgroundColor: slide.overlayColor,
                    opacity: slide.overlayOpacity || "0.5",
                  }}
                ></div>

                {slide.imgMark && (
                  <img
                    src={slide.imgMark}
                    alt="img-mark"
                    className="img-mark"
                    data-v-0b3b4b19=""
                  />
                )}
                <h1 className="description" data-v-0b3b4b19="">
                  <div>{slide.title}</div>
                  <div>{slide.subtitle}</div>
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Container>
        <div className="flightWidgetSection appendBottom40">
          <div className="searchWidgetContainer">
            <form
              onSubmit={handleSubmit}
              data-cy="flightSW"
              className="fltWidgetSection appendBottom40 primaryTraveler "
            >
              <div className="makeFlex hrtlCenter">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                ></div>
              </div>
              <div className="fsw ">
                <div className="fsw_inner returnPersuasion">
                  <div
                    className="flt_fsw_inputBox searchCity inactiveWidget "
                    style={{ width: "475px" }}
                  >
                    <label htmlFor="fromCity">
                      <span className="lbl_input appendBottom10 ">
                        Enter City Name, Location, or Specific hotel
                      </span>
                      <input
                        data-cy="fromCity"
                        id="fromCity"
                        type="text"
                        className="fsw_inputField lineHeight36 latoBlack font30"
                        readOnly=""
                        defaultValue="Delhi"
                        value={searchInput}
                        autoComplete="off"
                        onFocus={() => {
                          setSearchInput("");
                          setSearchedHotel("");
                          SetClickDestination(true);
                        }}
                        onBlur={() => {
                          if (isItemSelected) SetClickDestination(false);
                        }}
                        onChange={(e) => handleInputChange(e.target.value)}
                      />

                      <p
                        className="code makeRelative"
                        title="DEL, Delhi Airport India"
                      >
                        <span
                          data-cy="defaultFromValue"
                          title=""
                          className="truncate airPortName "
                        >
                          {searchedHotel}
                        </span>
                      </p>
                    </label>
                    <div style={{ position: "relative" }}>
                      <div
                        className="cityselect"
                        style={{
                          position: "absolute",
                          color: "black",
                          backgroundColor: "white",
                          padding: "10px",
                          border: "1px solid #e3e3e3",
                          display: clickDestination ? "block" : "none",
                          width: "100%",
                          zIndex: 9,
                          top: "-18px",
                          maxHeight: 300,
                          borderRadius: "8px",
                          overflow: "auto",
                          scrollbarWidth: "thin",
                        }}
                      >
                        {cities2.length !== 0 ? (
                          <>
                            {cities2.map((city, index) => (
                              <div
                                key={index}
                                style={{
                                  borderBottom: "1px solid grey",
                                  paddingBottom: 5,
                                  marginBottom: 5,
                                  cursor: "pointer",
                                }}
                                onClick={() => handleCitySelect(city)}
                              >
                                <Row>
                                  <Col md={1} style={{ alignItems: "center" }}>
                                    <FaCity
                                      size={22}
                                      style={{
                                        textAlign: "center",
                                        height: "100%",
                                        color: "#2d3290",
                                      }}
                                    />
                                  </Col>
                                  <Col md={11}>
                                    <Row>
                                      <div
                                        className="flightFromName"
                                        style={{
                                          color: "#2d3290",
                                          fontWeight: 600,
                                        }}
                                      >
                                        {city.CityName}
                                        {/* ({city["AIRPORTCODE"]}) */}
                                      </div>
                                    </Row>
                                    <Row style={{ color: "grey" }}>
                                      <Col md={10} style={{ paddingRight: 0 }}>
                                        <div
                                          className="flightFromNameInner"
                                          style={{
                                            fontSize: 10,
                                            fontWeight: 600,
                                          }}
                                        >
                                          {city.CountryName}
                                        </div>
                                      </Col>
                                      <Col md={2} style={{ paddingLeft: 0 }}>
                                        <div
                                          style={{
                                            textAlign: "center",
                                            fontWeight: "700",
                                            fontSize: 10,
                                          }}
                                        >
                                          {city.CountryCode}
                                        </div>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </div>
                            ))}
                          </>
                        ) : (
                          // <Spinner />
                          <div
                            style={{
                              padding: "10px 5px",
                              fontSize: "12px",
                              textAlign: "center",
                              margin: "auto",
                              width: "100%",
                            }}
                          >
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />{" "}
                            Please wait we are fetching city list...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flt_fsw_inputBox dates inactiveWidget ">
                    <label htmlFor="departure">
                      <span className="lbl_input appendBottom10">Check-In</span>
                      <input
                        data-cy="departure"
                        id="departure"
                        type="text"
                        className="fsw_inputField font20"
                        defaultValue="Monday, 3 Jun 2024"
                        onChange={handleChange}
                        value={startDate ? startDate.format("MM/DD/YYYY") : ""}
                        readOnly
                        required
                        onClick={toggleCalendar}
                      />
                      <p
                        data-cy="departureDate"
                        className="blackText font20 code lineHeight36"
                      >
                        <span className="font30 latoBlack">
                          {startDate ? startDate.format("D") : "--"}{" "}
                        </span>
                        <span>
                          {startDate ? startDate.format("MMM") : "Month"}
                        </span>
                        <span className="shortYear">
                          {startDate ? startDate.format("YY") : ""}
                        </span>
                      </p>
                      <p data-cy="departureDay" className="code ">
                        {startDate ? startDate.format("dddd") : "Select a date"}
                      </p>
                    </label>
                    <div
                      style={{
                        position: "absolute",
                        zIndex: "2000",
                      }}
                    >
                      {calVisible && (
                        <DayPickerRangeController
                          startDate={startDate}
                          endDate={endDate}
                          onDatesChange={handleDatesChange}
                          focusedInput={focusedInput}
                          onFocusChange={(focused) => setFocusedInput(focused)}
                          isOutsideRange={(day) =>
                            day.isBefore(moment(), "day")
                          } // Disable days before today
                          // renderDayContents={renderDayContents}
                          numberOfMonths={numberOfMonths} // Allow selecting a range of dates when active2 is true
                          daySize={daysize}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className="flt_fsw_inputBox dates reDates inactiveWidget "
                    // style={{ opacity: active2 ? "1" : "0.3" }}
                  >
                    <div data-cy="returnArea">
                      <label
                        onChange={handleChange}
                        onClick={() => {
                          toggleCalendar("endDate");
                        }}
                        htmlFor="returnDate"
                      >
                        <span className="lbl_input appendBottom10">
                          Check-Out
                        </span>
                        <input
                          type="text"
                          id="returnDateInput"
                          name="returnDate"
                          className="fsw_inputField font20"
                          defaultValue="Monday, 3 Jun 2024"
                          onChange={handleChange}
                          value={endDate ? endDate.format("MM/DD/YYYY") : ""}
                          readOnly
                          onClick={() => {
                            toggleCalendar("endDate");
                          }}
                        />
                        <p
                          data-cy="departureDate"
                          className="blackText font20 code lineHeight36"
                          onClick={() => {
                            toggleCalendar("endDate");
                          }}
                        >
                          <span className="font30 latoBlack">
                            {endDate ? endDate.format("D") : "--"}{" "}
                          </span>
                          <span>
                            {endDate ? endDate.format("MMM") : "Month"}
                          </span>
                          <span className="shortYear">
                            {endDate ? endDate.format("YY") : ""}
                          </span>
                        </p>
                        <p data-cy="departureDay" className="code ">
                          {endDate ? endDate.format("dddd") : "Select a date"}
                        </p>
                      </label>
                    </div>
                  </div>
                  <div
                    data-cy="flightTraveller"
                    className="flt_fsw_inputBox flightTravllers inactiveWidget "
                  >
                    <label htmlFor="travellers">
                      <span className="lbl_input appendBottom5">
                        Rooms &amp; Guests
                      </span>
                      <input
                        type="text"
                        placeholder={`${rooms.reduce(
                          (total, room) => total + room.adults + room.children,
                          0
                        )} Persons in ${rooms.length} ${
                          rooms.length === 1 ? "Room" : "Rooms"
                        }`}
                        className="fsw_inputField font30 latoBlack"
                        readOnly=""
                        onClick={() => setLabelClicked(!labelClicked)}
                        defaultValue="0 Adult, 1 Children"
                      />
                      <p
                        onClick={() => setLabelClicked(!labelClicked)}
                        className="blackText font20 code lineHeight36"
                      >
                        <span className="appendRight10">
                          {`${rooms.reduce(
                            (total, room) =>
                              total + room.adults + room.children,
                            0
                          )} Guest, ${rooms.length} ${
                            rooms.length === 1 ? "Room" : "Rooms"
                          }`}
                          &nbsp;
                          {/* </span> */}
                        </span>
                      </p>
                    </label>
                    <div
                      className="onlytraveller normaltraveller"
                      style={{
                        display: labelClicked ? "block" : "none",
                      }}
                    >
                      <ul className="traveller_list">
                        <li>
                          <div
                            className="list-persons-count"
                            style={{ marginBottom: "8px" }}
                          >
                            <ul className="traveller_list">
                              {rooms.map((room, index) => (
                                <li>
                                  <div className="list-persons-count">
                                    <div id="roomshtml">
                                      <div
                                        className="box"
                                        key={`divroom${index + 1}`}
                                        id={`divroom${index + 1}`}
                                      >
                                        <div className="roomTxt">
                                          <span>Room {index + 1}:</span>
                                        </div>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginTop: "10px",
                                          }}
                                        >
                                          <div className="">
                                            <div className="txt">
                                              <span id="Label7">Adult</span>
                                              <div style={{ fontSize: "10px" }}>
                                                <em>(12+ years)</em>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="right pull-right">
                                            <div
                                              id="field1"
                                              className="right PlusMinusRow"
                                            >
                                              <Link
                                                type="button"
                                                id="Adults_room_1_1_minus"
                                                className="sub hoteladultclass"
                                                onClick={() =>
                                                  updateRoom(
                                                    index,
                                                    "adults",
                                                    Math.max(room.adults - 1, 1)
                                                  )
                                                }
                                              >
                                                -
                                              </Link>
                                              <span
                                                id="Adults_room_1_1"
                                                className="PlusMinus_number"
                                              >
                                                {room.adults}
                                              </span>
                                              <Link
                                                type="button"
                                                id="Adults_room_1_1_plus"
                                                className="add hoteladultclass"
                                                onClick={() =>
                                                  updateRoom(
                                                    index,
                                                    "adults",
                                                    Math.min(room.adults + 1, 6)
                                                  )
                                                }
                                              >
                                                +
                                              </Link>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="spacer"></div>
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <div className="">
                                            <span className="txt">
                                              <div id="Label9">
                                                Child <br />
                                                <div
                                                  style={{ fontSize: "10px" }}
                                                >
                                                  <em>(2-12 years)</em>
                                                </div>
                                              </div>
                                            </span>
                                          </div>
                                          <div className="right">
                                            <div
                                              id="field2"
                                              className="right PlusMinusRow"
                                            >
                                              <Link
                                                type="button"
                                                id="Children_room_1_1_minus"
                                                className="sub hotelchildclass"
                                                onClick={() =>
                                                  updateRoom(
                                                    index,
                                                    "children",
                                                    Math.max(
                                                      room.children - 1,
                                                      0
                                                    )
                                                  )
                                                }
                                              >
                                                -
                                              </Link>
                                              <span
                                                id="Children_room_1_1"
                                                className="PlusMinus_number"
                                              >
                                                {room.children}
                                              </span>
                                              <Link
                                                type="button"
                                                id="Children_room_1_1_plus"
                                                className="add hotelchildclassss"
                                                onClick={() =>
                                                  updateRoom(
                                                    index,
                                                    "children",
                                                    Math.min(
                                                      room.children + 1,
                                                      6
                                                    )
                                                  )
                                                }
                                              >
                                                +
                                              </Link>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="clear"></div>
                                        {room.children > 0 && (
                                          <div className="childresAgeTxt">
                                            Age(s) of Children
                                          </div>
                                        )}
                                        {room.childrenAges.map(
                                          (age, childIndex) => (
                                            <select
                                              key={childIndex}
                                              value={age || ""}
                                              onChange={(e) =>
                                                updateChildAge(
                                                  index,
                                                  childIndex,
                                                  e.target.value
                                                )
                                              }
                                            >
                                              <option value="">Age</option>
                                              {[...Array(12)].map(
                                                (age, index) => (
                                                  <option
                                                    key={index + 1}
                                                    value={age}
                                                  >
                                                    {index + 1}
                                                  </option>
                                                )
                                              )}
                                            </select>
                                          )
                                        )}
                                        <div className="clear"></div>
                                      </div>
                                    </div>

                                    <Link
                                      id="addhotelRoom"
                                      to="#"
                                      className="cus_add_remove_btn addroom"
                                      style={{
                                        display:
                                          index === rooms.length - 1
                                            ? "inline-block"
                                            : "none",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        addRoom();
                                      }}
                                    >
                                      Add Room
                                    </Link>
                                    <Link
                                      id="removehotelRoom"
                                      to="#"
                                      className="cus_add_remove_btn removeroom"
                                      style={{
                                        display:
                                          rooms.length > 1
                                            ? "inline-block"
                                            : "none",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        removeRoom(index);
                                      }}
                                    >
                                      Remove Room
                                    </Link>
                                  </div>
                                </li>
                              ))}
                            </ul>

                            <Link
                              className="apply_btn"
                              onClick={(e) => {
                                e.preventDefault();
                                setLabelClicked(false);
                              }}
                            >
                              Done
                            </Link>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="flt_fsw_inputBox dates reDates inactiveWidget search_flight_bookingsss ">
                    <div>
                      {" "}
                      <button className="mat-stroked-button" type="submit">
                        Search Hotel
                      </button>
                    </div>
                  </div>
                </div>
                <div className="makeFlex hrtlCenter appendBottom20 flightFare"></div>
              </div>
            </form>
          </div>
        </div>
      </Container>
      <WebOffer />
      {/* <ReasonsToBook/> */}
      <HotelsContainer />
      <SectionsHotel />
      <WhyBookUsNew bookusdata={bookusdata} />
      <MobileApp
        backgroundImage="https://jaanveertoursandtravels.com/assets/img/product/tour/hotel.jpg"
        title="Download Our Mobile App"
        description="Book the flight ticket and hotel with the huge discount. Refer friends and get generous bonuses from theirs orders."
      />
      <HotelChains />
      <AboutHome />
    </div>
  );
};

export default HotelSearchNew;
