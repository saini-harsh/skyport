import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./HotelDetailMain.css";
import { Container, Row, Col } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import Carousel from "react-bootstrap/Carousel";
import { FaUserFriends } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { Ri24HoursFill } from "react-icons/ri";
import { FaPumpSoap } from "react-icons/fa6";
import { IoRestaurant } from "react-icons/io5";
import { CgGym } from "react-icons/cg";
import HotelRoomsOverView from "./HotelRoomsOverView";
import HotelImagesGallery from "./HotelImagesGallery";
import FlightListSkeleton from "../../Flight/FlightList/FlightListSkeleton";


const HotelDetailMain = () => {

    const getGuestRoomDisplay = (paxString) => {
  if (!paxString) return "";

  const rooms = paxString.split("?");
  const totalRooms = rooms.length;

  let totalGuests = 0;

  rooms.forEach((room) => {
    const [adults, children] = room.split("_").map(Number);
    totalGuests += adults + children;
  });

  return `${totalGuests} Guest${totalGuests > 1 ? "s" : ""} | ${totalRooms} Room${totalRooms > 1 ? "s" : ""}`;
};

  
   const[showGallary, setShowGallery] = useState(false);
   const [hotelDetails, setHotelDetails] = useState('');
   const [hotelData, setHotelData] = useState(null);
  const navigate = useNavigate()
   
   const handleOpenGallery = () => {
     setShowGallery(true);
   };
  //  const storedData = localStorage.getItem('hotelId');
// const storedRoom = JSON.parse(localStorage.getItem("rooms"));
useEffect(() => {
  const storeBatchKey = localStorage.getItem('batchKey');
  const storedData = localStorage.getItem('hotelId');
  const storedRoom = JSON.parse(localStorage.getItem("rooms"));

      const requestData = {
        hid: storedData,
        BatchKey: storeBatchKey,
        Rooms:storedRoom
    };
   


    // console.log("requestData",requestData) 

const fetchHotelDetails = async () => {
  const response = await axios.post("https://admin.tripgoonline.com/api/Hotel/HotelDetail", requestData);
    setHotelData(response.data.data); 
    // setHotelDetails(response.data.data.rooms); 
  console.log("response data", response.data.data);
};
  fetchHotelDetails();
}, []);


  return (
    <div className='hotelmodifysearch-Main'>
    {/* <div className='hotelmodifysearch'>
            <img src="Images/flight_aero.png" alt="" style={{width:"40px", marginRight: "10px"}} />
        <div className='hotelmodifysearchinputs' style={{width:'30%'}}>
        <label htmlFor="" className='hotelmodifylabelstyling'>City name, Location or Specific hotel</label>
        <input type="text" name="" id="" className='hotelmodifyinputstyling' placeholder='Del'/>
        </div>
        <div className='hotelmodifysearchinputs' style={{width:'15%'}}>
        <label htmlFor="" className='hotelmodifylabelstyling'>Check-In</label>
        <input type="date" name="" id="" placeholder="Select date" className='hotelmodifyinputstyling'/>
        </div>
        <div className='hotelmodifysearchinputs' style={{width:'15%'}}>
         <label htmlFor="" className='hotelmodifylabelstyling'>Check-Out</label>
        <input type="date" name="" id="" placeholder="Select date" className='hotelmodifyinputstyling'/>
        </div>
        <div className='hotelmodifysearchinputs' style={{width:'15%'}}>
        <label htmlFor="" className='hotelmodifylabelstyling'>Rooms & Guests</label>
        <input type="text" name="" id="" className='hotelmodifyinputstyling'/>
        </div>
        <div style={{width:'15%'}}>
        <button className='hotelmodifysearch-btn'>Search</button>
        </div>
        </div> */}

   {hotelData && hotelData.rooms && hotelData.rooms.length > 0 ? (

    <div style={{position:'relative'}}>  
      <Container>
        <div className="hotel-detailMain">
          <div className="hotel-detailSubMain">
            <div className="hotel-detailHeading">
              <div >
                <div className="hotelListingstyling-name hotelListingstylingDetail-name">
                  {/* Hotel Name{" "} */}
                  {hotelData.HotelDetail.name}
                  {/* {item.Rooms[0].MealType} */}
                  <div className="rating-score" style={{ textAlign: 'center', fontSize: '18px' }}>
                      {[...Array(5)].map((_, index) => (
                        <span key={index} style={{ color: index < Number(hotelData.HotelDetail.star_rating) ? '#FFD700' : '#ccc',}}>★</span>))}
                        </div>
                </div>
                 
                <div className="hotel-Address">
                  <CiLocationOn /> <span>{hotelData.HotelDetail.address}</span>
                </div>
              </div>
                <div className="hotel-numberic-rating hotelDetail-ratings">
                          <div>
                            <div className="rating-label">Excellent</div>
                            <div className="rating-reviews">1134 reviews</div>
                          </div>
                          <div  className="rating-score rating-score-inNum">{hotelData.HotelDetail.star_rating}</div>
                     
                        </div>
            </div>
            <div className="hotelSilder_totalFare">
              <div className="hotel-ColbigSilder">
                <div className="hotel-bigSilder">
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="./Images/Images/hotel-bg.jpg"
                        alt="First slide"
                      />
                    </Carousel.Item>

                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="./Images/Images/hotel-bg1.jpg"
                        alt="Second slide"
                      />
                    </Carousel.Item>

                    <Carousel.Item>
                      <img
                        className="d-block w-100"
                        src="./Images/Images/hotel-bg2.jpg"
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </div>

            <div className="carousel-belowImag">
                <div><img src="./Images/Images/hotel-bg.jpg" alt="" className="carousel-smallImages" /></div>
                <div><img src="./Images/Images/hotel-bg2.jpg" alt="" className="carousel-smallImages"/></div>


                <div className="carouselImage-container" onClick={handleOpenGallery}  style={{ cursor: 'pointer' }}>
                <img src="./Images/Images/hotel-bg.jpg" alt="" className="carousel-smallImages" />
                <div className="carouselImageOverlay-full">
                <div className="carouselImageOverlay-text">+15</div>
                </div>
                </div>

        
            </div>
              </div>
              <div className="hotel-ColtotalFare">
                <div className="hotel-totalFare">
                    <div style={{display:'block'}}>
                    <div className="hoteRoom-Usage">Day Use Room 6Hrs (Check In 9am - Check Out 3pm) (6 Hours stay between 09:00 to 15:00)</div>
                    {/* <div className="hotel-Guests_Room">{hotelData.pax} x Guest | 1 x Room</div> */}
                    <div className="hotel-Guests_Room">{getGuestRoomDisplay(hotelData.pax)}</div>

                     </div>
                    <div className="hoteRoom-UsageCharges">
                    <div className='cross-pricing'>₹  6,500</div>
                    <div className='real-pricing'>₹ {Math.round(hotelData.rooms[0].TotalFare)}</div>
                    <div className='hotel-taxesFees'>+ ₹ {Math.round(hotelData.rooms[0].TotalTax)} Taxes & fees</div>
                    <div className='hotel-taxesFees' style={{color:"#737373"}}>Base price (Per Night)</div>
                    </div>
                </div>
                    
        <div className="hotel-amenities" style={{flexWrap:'wrap'}}>
        <div className="free_amenities"><FaUserFriends className="free_amenitiesIcons"/>Couple Friendly</div>
        <div className="free_amenities"><FaWifi className="free_amenitiesIcons"/>Free Wifi</div>
        <div className="free_amenities"><Ri24HoursFill className="free_amenitiesIcons"/>24-hour Room Service</div>
        <div className="free_amenities"><FaPumpSoap className="free_amenitiesIcons"/>Free toiletries</div>
        <div className="free_amenities"><IoRestaurant className="free_amenitiesIcons"/>Restaurant</div>
        <div className="free_amenities"><CgGym className="free_amenitiesIcons"/>Gym</div>
        </div>
        {/* <button className="hotel-BookNowBtn">Book Now</button> */}
              </div>
              
            </div>
          </div>
        </div>
        
      </Container>
      <HotelImagesGallery setShowGallery={setShowGallery} showGallary={showGallary}/>
      <HotelRoomsOverView hotelData={hotelData}/>
    </div>
    ) : (
         <FlightListSkeleton />

    )}
     </div>
  );
};

export default HotelDetailMain;
