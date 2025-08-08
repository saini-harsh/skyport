import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HotelDetailMobile.css';
import { FaArrowLeft, FaBed } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const HotelDetailMobile = () => {
  const [roomsActiveTab, setRoomsActiveTab] = useState('Room');
  const [hotelData, setHotelData] = useState(null);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);

  useEffect(() => {
    const storeBatchKey = localStorage.getItem('batchKey');
    const storedData = localStorage.getItem('hotelId');
    const storedRoom = JSON.parse(localStorage.getItem("rooms"));

    const requestData = {
      hid: storedData,
      BatchKey: storeBatchKey,
      Rooms: storedRoom
    };

    const fetchHotelDetails = async () => {
      try {
        const response = await axios.post(
          "https://admin.tripgoonline.com/api/Hotel/HotelDetail",
          requestData
        );
        setHotelData(response.data.data);
        console.log("Mobile hotelData:", response.data.data);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
      }
    };

    fetchHotelDetails();
  }, []);

  const navigate = useNavigate();
const handleBookNowClick = (hotelId, bookingCode) => {
  console.log("Booking for hotel:", hotelId, "bookingCode:", bookingCode);

  localStorage.setItem("hotelId", hotelId);
  localStorage.setItem("bookingCode", bookingCode);

  navigate("/hotelfinalbooking");
};


  return (
    <div className="hotel-DetailMobile">
      <div className="hotel-DetailMobile-header">
        <div className='hotel-DetailMobile-hotelName'>
          <Link to="/hotelmodify">
            <FaArrowLeft className="hotelback-icon" />
          </Link>
<div className="hotelListingstyling-name">
  <div className="hotel-name-star-container">
    <div
      title={hotelData?.HotelDetail?.name}
      className="hotel-name-text"
    >
      {hotelData ? hotelData.HotelDetail.name : "Hotel Name"}
    </div>

    <div className="rating-score">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          style={{
            color:
              hotelData && index < Number(hotelData.HotelDetail.star_rating)
                ? '#FFD700'
                : '#ccc',
          }}
        >
          ★
        </span>
      ))}
    </div>
  </div>

  <div className="hotel-Address hotel-AddressMobile">
    <CiLocationOn />
    <span title={hotelData?.HotelDetail?.address}>
      {hotelData ? hotelData.HotelDetail.address : "Address"}
    </span>
  </div>
</div>


        </div>

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
        </div>
<div className="hotel-DetailMobile-roomsTabMain">
        <div className="hotel-DetailMobile-roomsTab">
          <div
            className={roomsActiveTab === 'Room' ? 'hotel-tab hotel-tab-active' : 'hotel-tab'}
            onClick={() => setRoomsActiveTab('Room')}
          >
            Room
          </div>
          <div
            className={roomsActiveTab === 'Overview' ? 'hotel-tab hotel-tab-active' : 'hotel-tab'}
            onClick={() => setRoomsActiveTab('Overview')}
          >
            Overview
          </div>
          <div
            className={roomsActiveTab === 'Details' ? 'hotel-tab hotel-tab-active' : 'hotel-tab'}
            onClick={() => setRoomsActiveTab('Details')}
          >
            Details
          </div>
        </div>


  {roomsActiveTab === 'Room' && hotelData && hotelData.rooms?.map((room, index) => (
  <div className="room-card" key={index}>
    <div className="room-card-top">
      <img
        src="/Images/Images/hotelroom.jpg"
        alt="Room"
        className="room-image"
      />
      <div className="room-info">
        <h4 className="room-title">
          {room.RoomType || "Room Type"}
        </h4>
        <div className="room-bed">
            <label className="hotel-radio-label">
            <input
              type="radio"
              name="roomSelection"
              className="custom-radio"
              checked={selectedRoomIndex === index}
              onChange={() => setSelectedRoomIndex(index)}
            />
            <span className="custom-radio-mark"></span>
            {room.Name[0]}
          </label>
        </div>
      </div>
    </div>

    <div className="room-card-bottom">
      <div className="room-details">
        <h5 className="room-selection">
          {/* <label className="hotel-radio-label">
            <input
              type="radio"
              name="roomSelection"
              className="custom-radio"
              checked={selectedRoomIndex === index}
              onChange={() => setSelectedRoomIndex(index)}
            />
            <span className="custom-radio-mark"></span>
            {room.Name[0]}
          </label> */}
        </h5>

        <ul className="room-details-list">
          <li><span className="green-text">Booking is {room.IsRefundable ? 'Refundable' : 'Non-Refundable'}</span></li>
          <li>{room.Inclusion}</li>
          <li>{room.RoomPromotion || 'No Promotion Available'}</li>
        </ul>
      </div>
      <div className="room-price">
        <div className="strike-price">₹ 7,521</div>
        <div className="final-price">₹ {Math.round(room.TotalFare)}</div>
        <div className="tax-info">
          +₹{Math.round(room.TotalTax)} Taxes & fees<br />Per night
        </div>
      </div>
    </div>
  </div>
))}


        {roomsActiveTab === 'Overview' && (
          <div className="hotel-overview">
            <h3 className="hotel-overview-title">About the property</h3>
            <p className="hotel-overview-subtitle">
              <strong>{hotelData ? hotelData.HotelDetail.name : ""}</strong>
            </p>
            <div
              className="hotel-overview-description"
              dangerouslySetInnerHTML={{
                __html: hotelData?.HotelDetail.description || "No description available."
              }}
            />
            {/* <p className="hotel-overview-link">View More 
            Details</p> */}

{hotelData?.HotelDetail?.ameneties && (() => {
  const amenities = Array.isArray(hotelData.HotelDetail.ameneties)
    ? hotelData.HotelDetail.ameneties
    : typeof hotelData.HotelDetail.ameneties === 'string'
      ? hotelData.HotelDetail.ameneties.split(',').map(a => a.trim())
      : [];

  return amenities.length > 0 ? (
    <div className="hotel-amenities-section">
      <h3 className="hotel-overview-title">Amenities</h3>
      <div className="hotel-amenities-grid">
        {amenities.slice(0, 6).map((amenity, index) => (
          <div key={index} className="hotel-amenity-item">
            <span>{amenity}</span>
          </div>
        ))}
        {amenities.length > 6 && (
          <div className="hotel-amenity-item more-amenities">
            +{amenities.length - 6} more
          </div>
        )}
      </div>
    </div>
  ) : null;
})()}


            
               <div className="hotel-overview-highlights">
              <div className="hotel-overview-item">
                <img src="/Images/Images/safe.png" alt="Hygiene Plus" className="hotel-overview-icon" />
                <div>
                  <p className="hotel-overview-item-title">Hygiene Plus</p>
                  <p className="hotel-overview-item-desc">This property has self-selected and self-certified</p>
                </div>
              </div>

              <div className="hotel-overview-item">
                <img src="/Images/Images/check-in-desk.png" alt="Check-in/out" className="hotel-overview-icon" />
                <div>
                  <p className="hotel-overview-item-title">Check-in/out</p>
                  <p className="hotel-overview-item-desc">Hassle-free check in</p>
                </div>
              </div>

              <div className="hotel-overview-item">
                <img src="/Images/Images/doctor.png" alt="Medical Support" className="hotel-overview-icon" />
                <div>
                  <p className="hotel-overview-item-title">Medical and Doctor Support</p>
                  <p className="hotel-overview-item-desc">Free medical support for emergencies</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {roomsActiveTab === 'Details' && (
          <div className="hotel-propertyRules">
            <h3 className="hotel-propertyRules-title">Property Rules & Information</h3>
            {/* <p className="hotel-propertyRules-subtitle">
              Check-In: 02:00 PM | Check-Out: 11:00 AM
            </p> */}
            <div className="hotel-propertyRules-box">
              <h4 className="hotel-propertyRules-heading">General Restrictions</h4>
              <ul className="hotel-propertyRules-list">
                <li>Passport and Aadhaar are accepted as ID proofs.</li>
                <li>Outside food is not allowed.</li>
                <li>Smoking within the premises is not allowed.</li>
              </ul>
            </div>
          </div>
        )}

      <div className="hotel-detail-footer">
  <div className="footer-price-info">
    <div className="footer-price">
      ₹ {hotelData ? Math.round(hotelData.rooms[selectedRoomIndex].TotalFare) : "0"}
    </div>
    <div className="footer-tax">
      +₹ {hotelData ? Math.round(hotelData.rooms[selectedRoomIndex].TotalTax) : "0"} Taxes & fees
    </div>
  </div>
<button
  className="footer-continue-btn"
  onClick={() =>
    handleBookNowClick(
      hotelData?.HotelDetail?.hotel_code,
      hotelData?.rooms[selectedRoomIndex]?.BookingCode
    )
  }
>
  Continue
</button>

</div>

</div>
      </div>
    </div>
  );
};

export default HotelDetailMobile;
