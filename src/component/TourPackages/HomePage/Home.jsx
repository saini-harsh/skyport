import React from 'react';
import "./css/Home.css";
import BannerSection from './BannerSection';
import TopTrendingSection from './TopTrendingSection';
import AddSection from './AddSection';
import PopularIndianSection from './PopularIndianSection';
import PopularTourSection from './PopularTourSection';
import PopularInternationalSection from './PopularInternationalSection';
import HolidayThemesSection from './HolidayThemesSection';
import SupportSection from './SupportSection';
import MobileApp from '../../Flight/FlightSearchMobile/MobileApp';
import FooterSection from '../FooterSection';
import EnquiryPopup from '../Common/EnquiryPopup';
import WebOffer from '../../Home/Home/WebOffer';

const Home = () => {
    return (
        <>
            <div style={{ overflowX: "hidden" }}>
                <BannerSection />
                {/* <div className='container'>
                  <WebOffer defaultTab="Holidays" />
                </div> */}
                <TopTrendingSection />
                <AddSection />
                <PopularIndianSection sheading="DESTINATION" fheading="Popular" secheading="Indian Destination"  />
                <PopularTourSection />
                <PopularInternationalSection />
                <HolidayThemesSection />
                <SupportSection />
                <MobileApp
                    backgroundImage="/Images/tour/mobile_app_trip_holiday.png"
                    title="Download Our Mobile App"
                    description="Book exciting holiday packages at unbeatable prices. Refer your friends and earn attractive rewards from their bookings."
                />
                <FooterSection />
                <EnquiryPopup />
            </div>
        </>
    )
}

export default Home