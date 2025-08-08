import React from "react";
// import ListProduct from "../../Hotel/HotelSearch/HotelSearchMobile/ListProduct";
// import TopHeader from "../../Hotel/HotelSearch/HotelSearchMobile/TopHeader";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import { FaWallet } from "react-icons/fa";
// import { BiSolidOffer } from "react-icons/bi";
// import Slider from "react-slick";
// import Reuse from "../../data/Reuse";
// import { data, settings } from "../BookingSearch/FlightBooking";
// import FlightDeal from "../../../components/MainHome/Home/innerComponents/FlightDeal";
import FlightSearchForm from "./FlightSearchForm";
// import WhyUs from "../../Home/Home/WhyUs";
// import TopCities from "../../Home/TopCities/TopCities";
// import SectionOne from "../../TourPackages/TourBanner/SectionOne";
import SliderCode from "../../Home/Home/SliderCode";
// import International from "../../TourPackages/TourBanner/International";
// import HolidayPackages from "../../Home/Home/HolidayPackage";
import "../../Hotel/HotelSearch/HotelSearchMobile/AppDownloadBanner.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/AutoSuggest.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/DatePickerComponent.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/ListProduct.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/OffersAndDeals.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/PopularDestinations.css";
import "../../Hotel/HotelSearch/HotelSearchMobile/RoomSelectionComponent.css";
import ListProduct from "../../Hotel/HotelSearch/HotelSearchMobile/ListProduct";
import Sections from "../../Home/Home/Sections";
import Advantage from "../../Home/Home/Advantage";
import OfferSection from "./OfferSection";
import HotelMobile from "./HotelMobile";
import AboutHome from "../../Home/Home/AboutHome";
import TopCities from "./TopCities";
import MobileApp from "./MobileApp";
// import "../../Hotel/HotelSearch/HotelSearchMobile/SearchForm.css";
// import "../../Hotel/HotelSearch/HotelSearchMobile/TopHeader.css";

const FlightSearchMobile = () => {
  return (
    <div id="hotelSearch" className="hotelsearchmobile">
      {/* <TopHeader heading="Flight Search" showNationality={true} /> */}
      {/* <ListProduct active="flight" /> */}
      <FlightSearchForm />
     
      <div>&nbsp;</div>
      <TopCities />
      <OfferSection />
      {/* <Sections /> */}
      {/* <HotelMobile /> */}
      {/* <SliderCode /> */}
      <Advantage />
       {/* <MobileApp
              backgroundImage="/Images/mobile_app_trip_old.jpeg"
              title="Download Our Mobile App"
              description="Book the flight ticket and hotel with the huge discount. Refer friends and get generous bonuses from theirs orders."
            /> */}
      <AboutHome />
      {/* <WhyUs/> */}
      {/* <International/> */}
      {/* <TopCities/> */}

      {/* <SectionOne/> */}
      {/* <SliderCode/> */}
      {/* <International/> */}
      {/* <HolidayPackages/> */}
    </div>
  );
};

export default FlightSearchMobile;
