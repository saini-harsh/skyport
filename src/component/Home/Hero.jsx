import React from "react";
// import FlightBooking from '../BookingSearch/FlightBooking'
import HolidayPackages from "./Home/HolidayPackage";
import WhyUs from "./Home/WhyUs";
import SliderCode from "./Home/SliderCode";
import TopCities from "./TopCities/TopCities";
import FlightBooking from "../Flight/BookingSearch/FlightBooking";
// import SectionOne from "../TourPackages/TourBanner/SectionOne";
// import International from "../TourPackages/TourBanner/International";
import ReasonsToBook from "./Home/ReasonToBook";
import SectionFive from "./Home/SectionFIve";
import Sections from "./Home/Sections";
import Advantage from "./Home/Advantage";
import AboutHome from "./Home/AboutHome";
import TopInter from "./TopCities/TopInter";
import MobileApp from "../Flight/FlightSearchMobile/MobileApp";
import HotelData from "./Home/HotelData";
import WebOffer from "./Home/WebOffer";
import BookingForm from "../Flight/BookingSearch/BookingForm";
import WhyUss from "./Home/WhyUss";
import Deals from "../Flight/FlightSearchMobile/Deals";
import { Container } from "react-bootstrap";
import FlightDeals from "../Flight/BookingSearch/FlightDeals";
import EnquiryPopup from "../TourPackages/Common/EnquiryPopup";
import EnquiryIcons from "../TourPackages/Common/EnquiryIcons";

const Hero = () => {
  return (
    <div>
      <BookingForm/>
   
      <WebOffer />
      <Deals />
      <FlightDeals />
      {/* <FlightBooking /> */}
      {/* <Sections />
      <Advantage /> */}
      {/* <SectionOne /> */}
      
      {/* <SectionFive/> */}
      {/* <ReasonsToBook /> */}
      <TopCities />
      {/* <HotelData /> */}
      {/* <TopInter /> */}

      {/* <Sections/> */}
      {/* <SectionOne /> */}

      {/* <SliderCode /> */}
      {/* <International /> */}
      {/* <HolidayPackages /> */}
      {/* <WhyUs /> */}
      <WhyUss />
     {/* <MobileApp 
        backgroundImage="/Images/mobile_app_trip_old.jpeg"
        title="Download Our Mobile App"
        description="Book the flight ticket and hotel with the huge discount. Refer friends and get generous bonuses from theirs orders."
      /> */}

      <AboutHome />
      <EnquiryPopup/>
    </div>
  );
};

export default Hero;
