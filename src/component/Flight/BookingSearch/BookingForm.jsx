import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import "./BookingForm.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { BsArrowLeftRight } from "react-icons/bs";
// import FlightDeal from "../../../components/MainHome/Home/innerComponents/FlightDeal";
import { MdFlight, MdOutlineFlight } from "react-icons/md";
import { FaHotel, FaSuitcaseRolling, FaWallet } from "react-icons/fa";
import moment from "moment";
import { BiSolidOffer } from "react-icons/bi";
import { IoBagHandleOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import Slider from "react-slick";
import "./gdvfdty.css";
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { CountriesArray } from "../FlightSearchMobile/Countries";
// import { cities2 } from "./Cities";
import RecentSearch from "./RecentSearch";
import SidePanel from "./SidePanel";
import WalletOffer from "./WalletOffer";
import axios from "axios";
import { CountriesArray } from "./CountriesArray";
import HeroCarousel from "../../Home/HeroCarousel";
import RecentBookings from "../../Home/RecentBookings";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { AiOutlineSwap } from "react-icons/ai";
import Deals from "../FlightSearchMobile/Deals";

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

export const fares = [
  { date: "2024-05-01", fare: "$200" },
  { date: "2024-05-02", fare: "$220" },
  { date: "2024-05-03", fare: "$240" },
  { date: "2024-05-04", fare: "$230" },
  { date: "2024-05-05", fare: "$250" },
  { date: "2024-05-06", fare: "$260" },
  { date: "2024-05-07", fare: "$270" },
  { date: "2024-05-08", fare: "$280" },
  { date: "2024-05-09", fare: "$290" },
  { date: "2024-05-10", fare: "$300" },
  { date: "2024-05-11", fare: "$310" },
  { date: "2024-05-12", fare: "$320" },
  { date: "2024-05-13", fare: "$330" },
  { date: "2024-05-14", fare: "$340" },
  { date: "2024-05-15", fare: "$350" },
  { date: "2024-05-16", fare: "$360" },
  { date: "2024-05-17", fare: "$370" },
  { date: "2024-05-18", fare: "$380" },
  { date: "2024-05-19", fare: "$390" },
  { date: "2024-05-20", fare: "$400" },
  { date: "2024-05-21", fare: "$410" },
  { date: "2024-05-22", fare: "$420" },
  { date: "2024-05-23", fare: "$430" },
  { date: "2024-05-24", fare: "$440" },
  { date: "2024-05-25", fare: "$450" },
  { date: "2024-05-26", fare: "$460" },
  { date: "2024-05-27", fare: "$470" },
  { date: "2024-05-28", fare: "$480" },
  { date: "2024-05-29", fare: "$490" },
  { date: "2024-05-30", fare: "$500" },
  { date: "2024-05-31", fare: "$510" },

  { date: "2024-04-01", fare: "$520" },
  { date: "2024-04-02", fare: "$530" },
  { date: "2024-04-03", fare: "$540" },
  { date: "2024-04-04", fare: "$550" },
  { date: "2024-04-05", fare: "$560" },
  { date: "2024-04-06", fare: "$570" },
  { date: "2024-04-07", fare: "$580" },
  { date: "2024-04-08", fare: "$590" },
  { date: "2024-04-09", fare: "$600" },
  { date: "2024-04-10", fare: "$610" },
  { date: "2024-04-11", fare: "$620" },
  { date: "2024-04-12", fare: "$630" },
  { date: "2024-04-13", fare: "$640" },
  { date: "2024-04-14", fare: "$650" },
  { date: "2024-04-15", fare: "$660" },
  { date: "2024-04-16", fare: "$670" },
  { date: "2024-04-17", fare: "$680" },
  { date: "2024-04-18", fare: "$690" },
  { date: "2024-04-19", fare: "$700" },
  { date: "2024-04-20", fare: "$710" },
  { date: "2024-04-21", fare: "$720" },
  { date: "2024-04-22", fare: "$730" },
  { date: "2024-04-23", fare: "$740" },
  { date: "2024-04-24", fare: "$750" },
  { date: "2024-04-25", fare: "$760" },
  { date: "2024-04-26", fare: "$770" },
  { date: "2024-04-27", fare: "$780" },
  { date: "2024-04-28", fare: "$790" },
  { date: "2024-04-29", fare: "$800" },
  { date: "2024-04-30", fare: "$810" },
];

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

const CACHE_NAME = "search-data-cache";
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 1 month in milliseconds
export const insertSearchDataIntoCache = async (searchData) => {
  const cache = await caches.open(CACHE_NAME);

  // Add the new search data with a timestamp
  const timestampedData = { ...searchData, timestamp: new Date().getTime() };
  const response = new Response(JSON.stringify(timestampedData), {
    headers: { "Content-Type": "application/json" },
  });

  // Use a unique key for the search (e.g., origin + timestamp)
  const cacheKey = `${searchData.Segments[0].Origin}-${timestampedData.timestamp}`;
  await cache.put(new Request(cacheKey), response);

  // Enforce the limit of 8 most recent searches
  const keys = await cache.keys();
  if (keys.length > 8) {
    // Sort keys by timestamp to find the oldest entries
    const keyDataPairs = await Promise.all(
      keys.map(async (key) => {
        const response = await cache.match(key);
        const data = await response.json();
        return { key, timestamp: data.timestamp };
      })
    );

    // Sort by timestamp and delete the oldest entries
    keyDataPairs.sort((a, b) => a.timestamp - b.timestamp);
    const keysToDelete = keyDataPairs.slice(0, keys.length - 8);
    for (let { key } of keysToDelete) {
      await cache.delete(key);
    }
  }
};
export const fetchValidSearchDataFromCache = async () => {
  const cache = await caches.open(CACHE_NAME);
  const keys = await cache.keys();

  const validSearchData = [];
  for (let key of keys) {
    const response = await cache.match(key);
    const data = await response.json();

    if (new Date().getTime() - data.timestamp < CACHE_DURATION) {
      validSearchData.push(data);
    } else {
      // Clean up expired entries
      await cache.delete(key);
    }
  }

  // Sort the data by timestamp (most recent first) before returning
  validSearchData.sort((a, b) => b.timestamp - a.timestamp);
  return validSearchData.slice(0, 8); // Ensure only the 8 most recent are returned
};

const BookingForm = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);

  const handleChnageCurrency = (amount) => {
    if (!isNaN(amount) && exchangeRate) {
      const convertedValue = amount * exchangeRate;
      return convertedValue.toFixed(2);
    }
  };
  const [rooms, setRooms] = useState([{ adults: 1, children: 0, infants: 0 }]);
  const [active, setActive] = useState(true);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [labelClicked, setLabelClicked] = useState(false);

  const handleSearchFlight = () => {
    setActive(true);
    setActive2(false);
    setActive3(false);
    setEndDate(null);
  };
  const handleSearchFlightRound = () => {
    setActive2(true);
    setActive(false);
    setActive3(false);
  };
  const handleSearchFlightMultiPle = () => {
    setActive3(true);
    setActive(false);
    setActive2(false);
  };

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
      setDateRangeConfig(1, 40, 60);
    } else {
      setDateRangeConfig(2, 40, 50);
    }
  };

  const setDateRangeConfig = (numberOfMonths, daysize) => {
    setNumberOfMonths(numberOfMonths);
  };

  const [numberOfMonths, setNumberOfMonths] = useState(2);

  const updateRoom = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    setRooms(updatedRooms);
  };

  const [startDate, setStartDate] = useState(moment().add(1, "days"));

  const [endDate, setEndDate] = useState(
    active2 ? moment().add(2, "days") : null
  );
  useEffect(() => {
    setEndDate(active2 ? moment().add(2, "days") : null);
  }, [active2]);
  const [focusedInput, setFocusedInput] = useState(null);
  const [calVisible, setCalVisible] = useState(false);

  const isSameDay = (date1, date2) => date1.isSame(date2, "day");

  const renderDayContents = (day) => {
    // const fare = fares.find((item) => isSameDay(day, item.date));
    const isStartDate = startDate && isSameDay(day, startDate);
    const isEndDate = endDate && isSameDay(day, endDate);
    const isInRange =
      startDate && endDate && day.isBetween(startDate, endDate, "day", "[]");

    let classNames = ["DayPicker-Day"];
    if (isStartDate) classNames.push("DayPicker-Day--start");
    if (isEndDate) classNames.push("DayPicker-Day--end");
    if (isInRange) classNames.push("DayPicker-Day--range");

    return (
      <div className={classNames.join(" ")}>
        <span style={{ fontWeight: "600", fontSize: "13px" }}>
          {day.format("D")}
        </span>
        <br />
      </div>
    );
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

  const handleChange = () => {};

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();



  
    const cabinMapping = {
      Economy: 2,
      "Premium Economy": 3,
      Business: 4,
      "First Class": 6,
    };

    const tripTypeMapping = {
      OneWay: 1,
      RoundTrip: 2,
      MultiCity: 3,
    };

    // const cabin = cabinMapping[event.target.cabinClass.value];
    const cabin = cabinMapping[selectedClass];
    const tripType = tripTypeMapping[active ? "OneWay" : "RoundTrip"];

    const SearchData = {
      EndUserIp: "192.168.10.10",
      TokenId: "4ba5b7e1-12c2-429c-b427-f8128bf5b157",
      AdultCount: rooms[0].adults,
      ChildCount: rooms[0].children,
      InfantCount: rooms[0].infants,
      JourneyType: tripType,
      Segments: [
        {
          Origin: extractBracketValue(searchInput),
          Destination: extractBracketValue(searchInput2),
          FlightCabinClass: cabin,
          PreferredDepartureTime:
            startDate && startDate.startOf("day").format("YYYY-MM-DD"),
          PreferredArrivalTime: endDate
            ? endDate && endDate.startOf("day").format("YYYY-MM-DD")
            : startDate && startDate.startOf("day").format("YYYY-MM-DD"),
        },
      ],
    };

    if (
      SearchData.Segments[0].Destination === null ||
      SearchData.Segments[0].Origin === null ||
      SearchData.Segments[0].PreferredDepartureTime === null
    ) {
      alert("Missing Search Data.");
    } else {
      await insertSearchDataIntoCache({
        ...SearchData,
        originCountryCode:
          destination2?.COUNTRYCODE?.trim().toUpperCase() || "",
        destinationCountryCode:
          destination1?.COUNTRYCODE?.trim().toUpperCase() || "",
      });

      if (active) {
        navigate(
          `/flightList/${encodeURIComponent(
            `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
          )}`
        );
      }

      if (active2) {
        const countryCode1 =
          destination1?.COUNTRYCODE?.trim().toUpperCase() || "";
        const countryCode2 =
          destination2?.COUNTRYCODE?.trim().toUpperCase() || "";
        console.log("COUNTRYCODE1:", JSON.stringify(countryCode1));
        console.log("COUNTRYCODE2:", JSON.stringify(countryCode2));
        if (countryCode1 !== countryCode2) {
          navigate(
            `/international-round/${encodeURIComponent(
              `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
            )}`
          );
        } else {
          navigate(
            `/round/${encodeURIComponent(
              `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
            )}`
          );
        }
      }
    }
  };

  const [clickDestination, SetClickDestination] = useState(false);
  const [clickDestination2, SetClickDestination2] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Flights",
          text: `Check out this page: ${window.location.href}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error.message);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "in",
    name: "India",
  });
  // const nationalityOptions = [
  //   { code: "in", name: "India" },
  //   // Add more countries as needed
  // ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  // useEffect(() => {
  //   const getLocationAndSetOrigin = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(async (position) => {
  //         const { latitude, longitude } = position.coords;
  //         try {
  //           const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
  //           const data = await response.json();
  //           console.log('Detected city:', data.city);

  //           if (data.city) {
  //             const airportCode = cityToAirportCode[data.city] || data.city;
  //             setSearchInput(airportCode);
  //           }
  //         } catch (err) {
  //           console.error('Error during reverse geocoding:', err);
  //           setError('Unable to detect your city.');
  //         }
  //       }, (err) => {
  //         console.error('Geolocation error:', err);
  //         setError('Location permission denied.');
  //       });
  //     } else {
  //       setError('Geolocation is not supported by your browser.');
  //     }
  //   };

  //   getLocationAndSetOrigin();
  // }, []);

  const [destinationCity, setDestinationCity] = useState("");
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [isItemSelected2, setIsItemSelected2] = useState(false);
  const [destination1, setDestination1] = useState({
    AIRPORTCODE: "DEL",
    AIRPORTNAME: "Indira Gandhi Airport",
    CITYCODE: "DEL",
    CITYNAME: "Delhi",
    COUNTRYNAME: "India",
    COUNTRYCODE: "IN",
    TOPCITIES: 1,
    MARKUPFEE: null,
    MARKUPTYPE: null,
    NOOFAIRPORT: null,
    AIRPORTCITY: null,
    id: 856,
  });
  const [destination2, setDestination2] = useState({
    AIRPORTCODE: "BOM",
    AIRPORTNAME: "Chhatrapati Shivaji International Airport",
    CITYCODE: "BOM",
    CITYNAME: "Mumbai",
    COUNTRYNAME: "India",
    COUNTRYCODE: "IN",
    TOPCITIES: 1,
    MARKUPFEE: null,
    MARKUPTYPE: null,
    NOOFAIRPORT: null,
    AIRPORTCITY: null,
    id: 857,
  });
  const [searchedAirport, setSearchedAirport] = useState(
    "DEL, Indira Gandhi International Airport"
  );
  const [searchedAirport2, setSearchedAirport2] = useState(
    "BOM, Chhatrapati Shivaji International Airport"
  );
  const handleCitySelect = (city) => {
    setDestinationCity(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`);
    setSearchedAirport(`${city["CITYCODE"]},${city["AIRPORTNAME"]}`);
    setSelectedCityCode(city["AIRPORTCODE"]);
    SetClickDestination(false); // Close the city suggestion div
    setSearchInput(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`); // Clear the search input after selecting a city
    setIsItemSelected(true);
    setDestination1(city);
  };

  const [destinationCity2, setDestinationCity2] = useState("");
  const [selectedCityCode2, setSelectedCityCode2] = useState("");
  const handleCitySelect2 = (city) => {
    setDestinationCity2(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`);
    setSelectedCityCode2(city["AIRPORTCODE"]);
    setSearchedAirport2(`${city["CITYCODE"]},${city["AIRPORTNAME"]}`);
    SetClickDestination2(false); // Close the city suggestion div
    setSearchInput2(`${city["CITYNAME"]} (${city["AIRPORTCODE"]})`); // Clear the search input after selecting a city
    setIsItemSelected2(true);
    setDestination2(city);
  };

  // console.log(
  //   selectedCityCode,
  //   destinationCity,
  //   selectedCityCode2,
  //   destinationCity2
  // );

  // const [searchInput, setSearchInput] = useState("");
  // const [searchInput2, setSearchInput2] = useState("");

  // const handleInputChange = (event) => {
  //   const userInput = event.target.value.toLowerCase();
  //   setSearchInput(userInput);
  //   setIsItemSelected(false);
  // };

  // const handleInputChange2 = (event) => {
  //   const userInput = event.target.value.toLowerCase();
  //   setSearchInput2(userInput);
  //   setIsItemSelected2(false);
  // };

  // const [searchInput, setSearchInput] = useState();
  const [searchInput, setSearchInput] = useState("Delhi (DEL)");
  const [searchInput2, setSearchInput2] = useState("Mumbai (BOM)");
  const [cities2, setCities2] = useState([]);
  const [cities22, setCities22] = useState([]);

  const fetchDatas = (value) => {
    fetch("https://admin.tripgoonline.com/api/airport")
      .then((response) => response.json())
      .then((json) => {
        const results = json.data
          .filter((user) => {
            return (
              user &&
              ((user.CITYNAME &&
                user.CITYNAME.toLowerCase().includes(value.toLowerCase())) ||
                (user.AIRPORTNAME &&
                  user.AIRPORTNAME.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.CITYCODE &&
                  user.CITYCODE.toLowerCase().includes(value.toLowerCase())) ||
                (user.COUNTRYNAME &&
                  user.COUNTRYNAME.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.COUNTRYCODE &&
                  user.COUNTRYCODE.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.AIRPORTCODE &&
                  user.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())))
            );
          })
          .map((user) => {
            let priority = 3;

            if (
              user.AIRPORTCODE &&
              user.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 1; // Highest priority for city code matches
            } else if (
              user.CITYNAME &&
              user.CITYNAME.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 2; // Second priority for city name matches
            } else if (
              user.COUNTRYNAME &&
              user.COUNTRYNAME.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 3; // Third priority for country name matches
            }

            return { ...user, priority };
          })
          .sort((a, b) => a.priority - b.priority);

        console.log("RESULTS", results);
        setCities2(results);
      });
  };

  const handleInputChange = (value) => {
    setSearchInput(value.toLowerCase());
    fetchDatas(value.toLowerCase());
    SetClickDestination(true);
    setIsItemSelected(false);
  };
  const fetchDatass = (value) => {
    fetch("https://admin.tripgoonline.com/api/airport")
      .then((response) => response.json())
      .then((json) => {
        const results = json.data
          .filter((user) => {
            return (
              user &&
              ((user.CITYNAME &&
                user.CITYNAME.toLowerCase().includes(value.toLowerCase())) ||
                (user.AIRPORTNAME &&
                  user.AIRPORTNAME.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.CITYCODE &&
                  user.CITYCODE.toLowerCase().includes(value.toLowerCase())) ||
                (user.COUNTRYNAME &&
                  user.COUNTRYNAME.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.COUNTRYCODE &&
                  user.COUNTRYCODE.toLowerCase().includes(
                    value.toLowerCase()
                  )) ||
                (user.AIRPORTCODE &&
                  user.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())))
            );
          })
          .map((user) => {
            let priority = 3;

            if (
              user.AIRPORTCODE &&
              user.AIRPORTCODE.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 1; // Highest priority for city code matches
            } else if (
              user.CITYNAME &&
              user.CITYNAME.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 2; // Second priority for city name matches
            } else if (
              user.COUNTRYNAME &&
              user.COUNTRYNAME.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 3; // Third priority for country name matches
            }

            return { ...user, priority };
          })
          .sort((a, b) => a.priority - b.priority);

        // console.log("RESULTS",results)
        setCities22(results);
      });
  };
  const handleInputChange2 = (value) => {
    setSearchInput2(value.toLowerCase());
    fetchDatass(value.toLowerCase());
    SetClickDestination2(true);
    setIsItemSelected2(false);
  };

  const [flightBookingsData, setFlightBookingsData] = useState([]);

  // useEffect(() => {
  //   const fetchFlightBookingData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://admin.tripgoonline.com/api/details"
  //       );
  //       console.log("dghfytdftyfv", response);
  //       if (response.data.success) {
  //         console.log("bookings from db", response.data.data);
  //         setFlightBookingsData(response.data.data);
  //       } else {
  //         console.error(
  //           "Failed to fetch flight booking data:",
  //           response.data.message
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error fetching flight booking data:", error);
  //     }
  //   };

  //   fetchFlightBookingData();
  // }, []);

  useEffect(() => {
    localStorage.setItem(
      "walletData",
      JSON.stringify({
        Id: 91,
        Username: "AGN091",
        "Company Name": "Trip Navigate",
        "First Name": "Guruansh Singh",
        Email: "guruansh@holidaychacha.com",
        Phone: "9739504090",
        Wallet: "7200000",
        "Credit Limit": "0",
      })
    );
  }, []);

  const [selectedFare, setSelectedFare] = useState("Direct Flights");

  const handleFareChange = (e) => {
    setSelectedFare(e.target.value);
    console.log("Selected Fare:", e.target.value);
  };

  const [selectedClass, setSelectedClass] = useState("Economy"); // Initial selected class

  // Function to handle class selection
  const handleClassSelect = (className) => {
    setSelectedClass(className);
  };
  const slides = [
    {
      backgroundImage:
      "",
      overlayColor: "#053355",
      imgMark: "/Images/dream-feather-bg.png",
      title: "Your Gateway to the World",
      subtitle: "Anytime. Anywhere",
    }
    // {
    //   backgroundImage:
    //     "https://img.freepik.com/premium-photo/view-from-airplane-window-with-blue-sky-clouds_125869-683.jpg?w=996",
    //   overlayColor: "#190a0a",
    //   imgMark: "/Images/dream-feather-bg.png",
    //   title: "Unlock Exclusive Flight Offers",
    //   subtitle: "Hotel Discounts, and Business Travel Solutions Today",
    // },
    // {
    //   backgroundImage:
    //     "https://img.freepik.com/premium-photo/passenger-airplane-flying-night-clouds-amazing-sky-sunset_475211-5.jpg?w=900",
    //   overlayColor: "#190a0a",
    //   imgMark: "/Images/dream-feather-bg.png",
    //   title: "Experience Hassle-Free Bookings",
    //   subtitle: "Luxury Travel, and Unmatched Service Only on TripGo",
    // },
  ];

  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(!showContent);
  };
  const [cacheData, setCacheData] = useState("");
  useEffect(() => {
    const data = async () => {
      const cachedSearches = await fetchValidSearchDataFromCache();
      if (cachedSearches) {
        setCacheData(cachedSearches);
      }
    };
    data();
  }, []);

  console.log("CACHE DATAaaa", cacheData);
  const handleSwapCities = () => {
  // Swap the input values
  const tempSearchInput = searchInput;
  const tempSearchedAirport = searchedAirport;

  setSearchInput(searchInput2);
  setSearchedAirport(searchedAirport2);

  setSearchInput2(tempSearchInput);
  setSearchedAirport2(tempSearchedAirport);

  // Optional: also reset selection flags if needed
  SetClickDestination(false);
  SetClickDestination2(false);
};

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
          style={{ height: "425px" }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="backgroundBanner banner banner-image"
                style={{
                  backgroundImage: `url(${slide.backgroundImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundColor:"#053355",
                }}
                data-v-0b3b4b19=""
                data-v-b9cf504c=""
              >
                <div
                  className=""
                  style={{
                    height:"100%",
                    backgroundColor: slide.overlayColor,
                    opacity: slide.overlayOpacity || "0.8",
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
                >
                  <div className="sfp-change-trip">
                    <div
                      onClick={handleSearchFlight}
                      className={`sfp-trip ${active ? "active" : ""}`}
                    >
                      One Way
                    </div>
                    <div
                      onClick={handleSearchFlightRound}
                      className={`sfp-trip ${active2 ? "active" : ""}`}
                    >
                      Round Trip
                    </div>
                    <div
                      className={`sfp-trip ${active3 ? "active" : ""}`}
                      onClick={handleSearchFlightMultiPle}
                    >
                      MultiCity
                    </div>
                    <div className="sfp-trip-layer layer-left"></div>
                  </div>
                </div>
              </div>
              <div className="fsw ">
                <div className="fsw_inner returnPersuasion">
                  <div className="flt_fsw_inputBox searchCity inactiveWidget ">
                    <label htmlFor="fromCity">
                      <span className="lbl_input appendBottom10">From</span>
                      <input
                        data-cy="fromCity"
                        id="fromCity"
                        //  autoComplete="off"
                        type="text"
                        className="fsw_inputField lineHeight36 latoBlack font30"
                        readOnly=""
                        defaultValue="Delhi"
                        value={searchInput}
                        autoComplete="off"
                        onFocus={() => {
                          setSearchInput("");
                          setSearchedAirport("");
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
                          {searchedAirport}
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

                          border: "1px solid #cdcdcd",
                          display:
                            searchInput && clickDestination ? "block" : "none",
                          width: "100%",
                          zIndex: 9,
                          top: "-42px",
                          maxHeight: 300,
                          overflow: "auto",
                          scrollbarWidth: "thin",
                        }}
                      >
                        {cities2.map((city, index) => (
                          //                           <div className="after_search_city"
                          // >
                          //   <div className="mflexcol" onClick={() => handleCitySelect(city)}>
                          //     <img src="https://www.easemytrip.com/Content/img/planeicon.svg" alt="Flight" className="mgr10" />
                          //     <div>
                          //       <p>
                          //         <span id="spn12" className="flsctrhead">
                          //            {city["CITYNAME"]}
                          //                                       ({city["CITYCODE"]})
                          //         </span>
                          //       </p>
                          //       <p id="airport12" className="autosrpt">
                          //         {city["AIRPORTNAME"]}
                          //       </p>
                          //     </div>
                          //     <div className="flcountry">  {city["COUNTRYNAME"]} </div>
                          //   </div>
                          // </div>
                          <div
                            role="option"
                            id="react-autowhatever-1-section-0-item-0"
                            aria-selected="false"
                            className="react-autosuggest__suggestion react-autosuggest__suggestion--first"
                            onClick={() => handleCitySelect(city)}
                          >
                            <div className="makeFlex">
                              <img
                                className="icLocAlt appendRight8-bookings_form"
                                src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/ic-flight-onward.png"
                                alt="icon"
                              />
                              <div className="makeFlex flexOne column">
                                <div className="makeFlex flexOne spaceBetween">
                                  <div className="makeFlex flexOne spaceBetween appendRight10">
                                    <div className="makeFlex column flexOne appendRight10">
                                      <p className="font_search_bookingss appendBottom5 blackText">
                                        {city["CITYNAME"]},{" "}
                                        {city["COUNTRYNAME"]}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="font14 lightGreyText latoBold">
                                    {city["CITYCODE"]}
                                  </div>
                                </div>
                                <p className="font12_bookingForm_ad greyText appendBottom3 lineHeight14">
                                  {" "}
                                  {city["AIRPORTNAME"]}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="fltSwipCircle" onClick={handleSwapCities}>
                      <AiOutlineSwap color="#f73030" size={20} />
                    
                    </span>
                  </div>

                  <div className="flt_fsw_inputBox searchToCity inactiveWidget ">
                    <label htmlFor="toCity">
                      <span className="lbl_input appendBottom10">To</span>
                      <input
                        data-cy="toCity"
                        id="toCity"
                        type="text"
                        className="fsw_inputField lineHeight36 latoBlack font30"
                        readOnly=""
                        defaultValue="Mumbai"
                        autoComplete="off"
                        value={searchInput2}
                        onFocus={() => {
                          setSearchInput2("");
                          setSearchedAirport2("");
                          SetClickDestination2(true);
                        }}
                        onBlur={() => {
                          if (isItemSelected2) SetClickDestination2(false);
                        }} // readOnly
                        onChange={(e) => handleInputChange2(e.target.value)}
                      />
                      <p
                        className="code makeRelative"
                        title="BOM, Chhatrapati Shivaji International Airport India"
                      >
                        <span
                          data-cy="defaultToValue"
                          title=""
                          className="truncate airPortName "
                        >
                          {searchedAirport2}
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

                          border: "1px solid #cdcdcd",
                          display:
                            searchInput2 && clickDestination2
                              ? "block"
                              : "none",
                          width: "100%",
                          zIndex: 9,
                          top: "-42px",
                          maxHeight: 300,
                          overflow: "auto",
                          scrollbarWidth: "thin",
                        }}
                      >
                        {cities22.map((city, index) => (
                          <div
                            role="option"
                            id="react-autowhatever-1-section-0-item-0"
                            aria-selected="false"
                            className="react-autosuggest__suggestion react-autosuggest__suggestion--first"
                            onClick={() => handleCitySelect2(city)}
                          >
                            <div className="makeFlex">
                              <img
                                className="icLocAlt appendRight8-bookings_form"
                                src="https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/ic-flight-onward.png"
                                alt="icon"
                              />
                              <div className="makeFlex flexOne column">
                                <div className="makeFlex flexOne spaceBetween">
                                  <div className="makeFlex flexOne spaceBetween appendRight10">
                                    <div className="makeFlex column flexOne appendRight10">
                                      <p className="font_search_bookingss appendBottom5 blackText">
                                        {city["CITYNAME"]},{" "}
                                        {city["COUNTRYNAME"]}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="font14 lightGreyText latoBold">
                                    {city["CITYCODE"]}
                                  </div>
                                </div>
                                <p className="font12_bookingForm_ad greyText appendBottom3 lineHeight14">
                                  {" "}
                                  {city["AIRPORTNAME"]}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flt_fsw_inputBox dates inactiveWidget ">
                    <label htmlFor="departure">
                      <span className="lbl_input appendBottom10">
                        Departure
                      </span>
                      <input
                        data-cy="departure"
                        id="departure"
                        type="text"
                        className="fsw_inputField font20"
                        defaultValue="Monday, 3 Jun 2024"
                        onChange={handleChange}
                        value={startDate ? startDate.format("MM/DD/YYYY") : ""}
                        readOnly
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
                      {active2
                        ? calVisible && (
                            <DayPickerRangeController
                              startDate={startDate}
                              endDate={endDate}
                              onDatesChange={handleDatesChange}
                              isOutsideRange={(day) =>
                                day.isBefore(moment(), "day")
                              }
                              focusedInput={focusedInput}
                              onFocusChange={(focused) =>
                                setFocusedInput(focused)
                              }
                              renderDayContents={renderDayContents}
                              numberOfMonths={numberOfMonths}
                            />
                          )
                        : calVisible && (
                            <DayPickerRangeController
                              startDate={startDate}
                              endDate={null}
                              onDatesChange={({ startDate }) => {
                                setStartDate(startDate);
                                setCalVisible(false);
                              }}
                              isOutsideRange={(day) =>
                                day.isBefore(moment(), "day")
                              }
                              focusedInput={focusedInput}
                              onFocusChange={(focused) => {
                                if (focused) setFocusedInput("startDate");
                              }}
                              renderDayContents={renderDayContents}
                              numberOfMonths={numberOfMonths}
                            />
                          )}
                    </div>
                  </div>
                  <div
                    className="flt_fsw_inputBox dates reDates inactiveWidget "
                    style={{ opacity: active2 ? "1" : "0.3" }}
                  >
                    <div data-cy="returnArea">
                      <label
                        onChange={handleChange}
                        onClick={() => {
                          handleSearchFlightRound();
                          toggleCalendar("endDate");
                        }}
                      >
                        <span className="lbl_input appendBottom10">Return</span>
                        <p
                          data-cy="departureDate"
                          className="blackText font20 code lineHeight36"
                        >
                          <span className="font30 latoBlack">
                            {active2 && endDate ? endDate.format("D") : "--"}{" "}
                          </span>
                          <span>
                            {active2 && endDate
                              ? endDate.format("MMM")
                              : "Month"}
                          </span>
                          <span className="shortYear">
                            {active2 && endDate ? endDate.format("YY") : ""}
                          </span>
                        </p>
                        <p data-cy="departureDay" className="code ">
                          {active2 && endDate
                            ? endDate.format("dddd")
                            : "Select a date"}
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
                        Travellers &amp; Class
                      </span>
                      <input
                        data-cy="travellers"
                        id="travellers"
                        type="text"
                        placeholder={`${rooms[0].adults} Adults, ${rooms[0].children} Child, ${rooms[0].infants} Infants`}
                        className="fsw_inputField font30 latoBlack"
                        readOnly=""
                        onClick={() => setLabelClicked(!labelClicked)}
                        defaultValue="0 Infant, 0 Adult, 1 Children"
                      />
                      <p
                        data-cy="travellerText"
                        className="blackText font20 code lineHeight36"
                      >
                        <span className="appendRight10">
                          <span className="font30 latoBlack">
                            {rooms[0].adults +
                              rooms[0].children +
                              rooms[0].infants}
                            &nbsp;
                          </span>
                          Traveller
                        </span>
                      </p>
                      <p className="" style={{ fontSize: "12px" }}>
                        {selectedClass}
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
                          <div className="list-persons-count">
                            <div id="roomshtml">
                              <div className="box" id="divroom1">
                                <div className="roomTxt">
                                  <span>Room 1:</span>
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
                                            0,
                                            "adults",
                                            Math.max(rooms[0].adults - 1, 1)
                                          )
                                        }
                                      >
                                        -
                                      </Link>
                                      <span
                                        id="Adults_room_1_1"
                                        className="PlusMinus_number"
                                      >
                                        {rooms[0].adults}
                                      </span>
                                      <Link
                                        type="button"
                                        id="Adults_room_1_1_plus"
                                        className="add hoteladultclass"
                                        onClick={() =>
                                          updateRoom(
                                            0,
                                            "adults",
                                            rooms[0].adults + 1 <=
                                              9 - rooms[0].children
                                              ? rooms[0].adults + 1
                                              : rooms[0].adults
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
                                        <div style={{ fontSize: "10px" }}>
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
                                            0,
                                            "children",
                                            Math.max(rooms[0].children - 1, 0)
                                          )
                                        }
                                      >
                                        -
                                      </Link>
                                      <span
                                        id="Children_room_1_1"
                                        className="PlusMinus_number"
                                      >
                                        {rooms[0].children}
                                      </span>
                                      <Link
                                        type="button"
                                        id="Children_room_1_1_plus"
                                        className="add hotelchildclassss"
                                        onClick={() =>
                                          updateRoom(
                                            0,
                                            "children",
                                            rooms[0].children + 1 <=
                                              9 - rooms[0].adults
                                              ? rooms[0].children + 1
                                              : rooms[0].children
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
                                    marginTop: "5px",
                                  }}
                                >
                                  <div className="">
                                    <span className="txt">
                                      <div id="Label9">
                                        Infant
                                        <div style={{ fontSize: "10px" }}>
                                          <em>(0-2 years)</em>
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="right pull-right">
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
                                            0,
                                            "infants",
                                            Math.max(rooms[0].infants - 1, 0)
                                          )
                                        }
                                      >
                                        -
                                      </Link>
                                      <span
                                        id="Children_room_1_1"
                                        className="PlusMinus_number"
                                      >
                                        {rooms[0].infants}
                                      </span>
                                      <Link
                                        type="button"
                                        id="Children_room_1_1_plus"
                                        className="add hotelchildclass"
                                        onClick={() =>
                                          updateRoom(
                                            0,
                                            "infants",
                                            Math.min(
                                              rooms[0].infants + 1,
                                              rooms[0].adults
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

                                <div className="clear"></div>
                              </div>
                            </div>
                            <hr />
                            <div className="makeFlex hrtlCenter appendBottom20 flightFare">
                              <div className="specialFareContainer relative makeFlex flex-column centerContainer">
                                <div className="makeFlex flex-column">
                                  {[
                                    "Economy",
                                    "First Class",
                                    "Premium Economy",
                                    "Business",
                                  ].map((clas, index) => (
                                    <div
                                      className="fareCardItem_class"
                                      key={index}
                                    >
                                      <div>
                                        <span className="customRadioBtn sizeSm primary">
                                          <input
                                            type="radio"
                                            name="clas"
                                            value={clas}
                                            checked={selectedClass === clas}
                                            onClick={() =>
                                              handleClassSelect(clas)
                                            }
                                          />
                                          <span className="outer">
                                            <span className="inner" />
                                          </span>
                                        </span>
                                      </div>
                                      <div>
                                        <div
                                          className="white-space-no-wrap blackText lineHeight18 darkGreyText appendBottom3"
                                          style={{
                                            color:
                                              selectedClass === clas
                                                ? "rgb(0, 140, 255)"
                                                : "rgb(74, 74, 74)",
                                          }}
                                        >
                                          {clas}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Link
                              className="apply_btn"
                              to="#"
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
                    {/* <div className="introGBFlt">
                      <div className="introGBFltTooltip whiteText">
                        Save on bookings with more than 9 travellers
                      </div>
                    </div> */}
                  </div>
                  <div className="flt_fsw_inputBox dates reDates inactiveWidget search_flight_bookingsss ">
                    <button className="mat-stroked-button" type="submit">
                      Search{" "}
                    </button>
                  </div>
                </div>

                <div
                  className={`makeFlex hrtlCenter ${
                    showContent ? "" : "appendBottom10"
                  } flightFare`}
                >
                  <div
                    className="ng-tns-c8-3 ng-star-inserted"
                    style={{
                      cursor: "pointer",
                      marginLeft: "19px",
                      marginTop: "-6px",
                      marginRight: "15px",
                    }}
                  >
                    <a
                      className="active"
                      rel="noopener"
                      style={{ color: "#1d489f" }}
                      onClick={handleClick}
                    >
                      <IoIosArrowDropdownCircle size={20} /> You’ve Searched
                    </a>
                  </div>

                  <div className="specialFareContainer relative makeFlex centerContainer">
                    <div className="makeFlex hrtlCenter">
                      {[
                        "Direct Flights",
                        "Defence Fare",
                        "Student Fare",
                        "Senior Citizen Fare",
                      ].map((fare, index) => (
                        <div className="fareCardItem" key={index}>
                          <div>
                            <span className="customRadioBtn sizeSm primary">
                              <input
                                type="radio"
                                name="fareType"
                                value={fare}
                                checked={selectedFare === fare}
                                onChange={handleFareChange}
                              />
                              <span className="outer">
                                <span className="inner" />
                              </span>
                            </span>
                          </div>
                          <div>
                            <div
                              className="white-space-no-wrap blackText latoBold darkGreyText appendBottom3"
                              style={{
                                color:
                                  selectedFare === fare
                                    ? "#2196F3"
                                    : "rgb(74, 74, 74)",
                                lineHeight: "22px",
                              }}
                            >
                              {fare}
                            </div>
                          </div>

                          {fare === "Senior Citizen Fare" && (
                            <span
                              className="tooltip"
                              style={{ backgroundColor: "rgb(255, 255, 255)" }}
                            >
                              Applicable only for serving/retired Indian Armed
                              Forces personnel & their dependents. A valid Armed
                              Forces ID or dependent card is required at the
                              airport to avail this.
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {showContent && (
                  <div style={{ paddingLeft: "10px", color: "#333" }}>
                    <RecentSearch cacheData={cacheData} />
                  </div>
                )}
                {/* <p data-cy="submit" className="makeFlex vrtlCenter ">
  <a className="primaryBtn font24 latoBold widgetSearchBtn ">Search</a>
</p> */}
              </div>
            </form>
          </div>
        </div>
    
      </Container>
    </div>
  );
};

export default BookingForm;
