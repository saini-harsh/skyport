import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import './HotelRoomsOverView.css';
import { Link } from 'react-router-dom';
import { TiTickOutline } from "react-icons/ti";
import { CiLocationOn } from "react-icons/ci";

const HotelRoomsOverView = ({ hotelData }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPlainText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  // const amenitiesHotelList = JSON.parse(hotelData.HotelDetail.ameneties);
  
const amenitiesHotelList = Array.isArray(hotelData.HotelDetail.ameneties)
  ? hotelData.HotelDetail.ameneties
  : typeof hotelData.HotelDetail.ameneties === "string"
    ? hotelData.HotelDetail.ameneties.split(",").map(item => item.trim())
    : [];


  
const navigate = useNavigate();

const handleBookNowClick = (hotelId, bookingCode) => {
  console.log("Booking for hotel:", hotelId, "bookingCode:", bookingCode);

  localStorage.setItem("hotelId", hotelId);
  localStorage.setItem("bookingCode", bookingCode);

  navigate("/hotelfinalbooking");
};

  return (
    <div className='hotel-RoomsOverViewMain'>
      <Container>
       
        <div className={isSticky ? 'hotel-RoomsOverViewMenu sticky' : 'hotel-RoomsOverViewMenu'}>
          <a href="#rooms-section" className='hotel-RoomsOverViewMenuItems'>Rooms</a>

          <a
            href="#overview-section"
            className='hotel-RoomsOverViewMenuItems'
            onClick={(e) => {
              if (window.innerWidth <= 600) {
                e.preventDefault();
                setShowOverview(true);
                setTimeout(() => {
                  document.getElementById('overview-section').scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }
            }}
          >
            Overview
          </a>

          <a
            href="#amenities-section"
            className='hotel-RoomsOverViewMenuItems'
            onClick={(e) => {
              if (window.innerWidth <= 600) {
                e.preventDefault();
                setShowAmenities(true);
                setTimeout(() => {
                  document.getElementById('amenities-section').scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }
            }}
          >
            Amenities
          </a>

          <a href="#location-section" className='hotel-RoomsOverViewMenuItems'>Location</a>
          <a href="#booking-policy-section" className='hotel-RoomsOverViewMenuItems booking-policy-link'>Booking Policy</a>
        </div>

        <div className='hotel-RoomsOverViewMenuFinalBooking'>
          <div className='hotel-RoomsOverViewRoomsBenefits'>
            <div>Room Type</div>
            <div>Benefits</div>
            <div>Per Night Price</div>
          </div>

          <div id='rooms-section'>
            {hotelData.rooms?.map((room, index) => (
              <Row className='hotel-finalRoomType-Row' key={index}>
                <Col className='hotel-finalRoomType-Col'>
                  <div className="hotel-finalRoomType">{room.Name[0]}</div>
                  <div><img src="/Images/Images/hotelroom.jpg" alt="" className='hotel-finalRoomTypeImg' /></div>
                  <div className='hotel-finalRoomType-Btn'>Double</div>
                </Col>

                <Col className='hotel-finalRoomType-Col'>
                  <div className='hotel-RoomsOnly'>ROOM ONLY</div>
                  <div className="hotel-RoomsOverViewMain">
                    {/* <div className="hotel-RoomsOnly-Item">
                      <TiTickOutline className="hotel-RoomsOnly-Icons" />
                      <span>{room.Inclusion}</span>
                    </div> */}
                    {room.Inclusion.split(',').map((inclusion, index) => (
                      <div key={index} className="hotel-RoomsOnly-Item">
                        <TiTickOutline className="hotel-RoomsOnly-Icons" />
                        <span>{inclusion.trim()}</span>
                      </div>
                    ))}

                  </div>
                </Col>

                <Col className='hotel-finalRoomType-Col'>
                  <div className="hoteRoom-UsageCharges">
                    <div className='cross-pricing'>₹ 6,500</div>
                    <div className='real-pricing'>₹ {Math.round(room.TotalFare)}</div>
                    <div className='hotel-taxesFees'>+ ₹ {Math.round(room.TotalTax)} Taxes & fees</div>
                    <div className='hotel-taxesFees' style={{ color: "#737373" }}>Base price (Per Night)</div>
                  </div>
                  <div className='hotel-bookNowgetOffer'>Book Now and Get ₹ 180 OFF</div>
                </Col>

                <Col className='hotel-finalRoomType-Col'>
                    <button
                      className="hotel-RoomsOnly-ItemBookNowBtn"
                      onClick={() => handleBookNowClick(hotelData.HotelDetail.hotel_code, room.BookingCode)}
                    >
                      Book Now
                    </button>
                  </Col>

              </Row>
            ))}
          </div>
        </div>
    

      <div className='hotel-RoomOverView-Description'>
        
          <div
            id="overview-section"
            className='hotel-Rooms-Des'
            style={{ display: window.innerWidth > 600 || showOverview ? 'block' : 'none' }}
          >
            <div className="hotelListingstyling-name hotelListingstylingDetail-name">
              {hotelData.HotelDetail.name}
               <div className="rating-score" style={{ textAlign: 'center', fontSize: '18px' }}>
                      {[...Array(5)].map((_, index) => (
                        <span key={index} style={{ color: index < Number(hotelData.HotelDetail.star_rating) ? '#FFD700' : '#ccc',}}>★</span>))}
                        </div>
            </div>
            <div className="hotel-Address">
              <CiLocationOn /> <span>{hotelData.HotelDetail.address}</span>
            </div>
            <div className='hotel-Rooms-Des-Below'>Hotel Description</div>
            <p style={{ padding: '10px 0px', fontSize: '14px' }}>
              {getPlainText(hotelData.HotelDetail.description)}
            </p>
          </div>

          <div
            id="amenities-section"
            className='hotel-Rooms-Des hotel-Rooms-BookingAmeni'
            style={{ display: window.innerWidth > 600 || showAmenities ? 'block' : 'none' }}
          >
            <div className='hotel-Rooms-Ameni-Below'>Amenities</div>
            <div className="hotel-amenities-lists">
              {amenitiesHotelList.map((amenity, index) => (
                <div key={index} className="free_amenitiesList">
                  <TiTickOutline className="hotel-RoomsOnly-Icons" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div id="location-section" className='hotel-Rooms-Des hotel-Rooms-BookingLocation'>
            <div className='hotel-Rooms-Ameni-Below'>Location</div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.912651138735!2d77.70505981528504!3d12.960495790867054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae12a94f6dff9b%3A0x59d5f5a79a58fda7!2sBrookefield%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1717588123456!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div id="booking-policy-section" className='hotel-Rooms-Des hotel-Rooms-BookingPolicy'>
            <div className='hotel-Rooms-Ameni-Below'>Booking Policy</div>
            <div>
              <div>
                <ul className='hotel-Rooms-BookingPolicyList' style={{listStyle:'disc', fontSize:'13px', padding: '0 20px', marginBottom: '20px'}}>
                  <li>As per the government regulations, every guest above the 18 years has to carry a valid Photo ID. The identification proofs can be Driving License, Voters Card, Passport and Ration Card. Without valid ID, guests will not be allowed to check in.</li>
                  <li>Tripgoonline.com will not be responsible for the check-in denied by the hotel due to the above-mentioned reason.</li>
                  <li>The primary guest checking-in to the hotel must be minimum of 18 years old. Children accompanying adults may be between 1 and 12 years.</li>
                  <li>Guests will be charged for extra bed, food and other facilities which are not mentioned in the booking and may vary as per the hotel.</li>
                  <li>If an extra bed is included in your booking, you may be provided with a folding cot or a mattress as an extra bed (depends on hotel).</li>
                  <li>Generally, check-in / check-out time varies from hotel to hotel and can be checked on the confirmation voucher, However, for early check-in or late check-out, you are advised to confirm the same directly from the concerned hotel.</li>
                  <li>The room tariff is inclusive of all taxes but the amount paid does not include charges for any additional services and facilities (such as room service, mini bar, snacks or telephone calls). These services will be charged by the hotel at the time of check-out.</li>
                  <li>If the hotel denies accommodation to the guests posing as a 'couple' on not providing suitable ID proof, Tripgoonline.comwill not be responsible for this condition and won’t provide any refund for such bookings.</li>
                  <li>The hotel reserves the right to decline accommodation to locals/city residents. Tripgoonline.comwill not be responsible for any check-in declined by the hotel or any refunds due to the above-mentioned reason.</li>
                  <li>For any modifications, users have to pay applicable cancellation/modification charges. Modified bookings will be subject to availability and may depend on the booking policy of the hotel. The cancellation/modification charges are standard and any waiver is on the discretion of the hotel.</li>
                  <li>In case of cancellation or modification, entire benefit (discount / cash back) on the actual booking amount will be forfeited.</li>
                  <li>Tripgoonline.com reserves the right, at any time, without prior notice and liability and without assigning any reason whatsoever, to add/alter/modify/change or vary all of these terms and conditions or to replace, wholly or in part, this offer by another offer, whether similar to this offer or not, or to extend or withdraw it altogether.</li>
                  <li>In case of partial/full cancellation, the offer stands void, and the discount / cash back will be rolled back before processing the refunds.</li>
                  <li>Gala dinner charges which are applicable for Christmas and New Year dates would be extra and payable directly to the hotel. Please check with the hotel directly for more information on the same.</li>
                  <li>In case of any amendment (date change) in your hotel reservation, Tripgoonline.comwould inform and advise you about the availability and applicable new rates.</li>
                  <li>If payment has been received by credit/debit card, the refund shall be credited to the same card by which the payment was received. For all other cases, the refund will be made by Account Payee Cheque only.</li>
                  <li>Guests are requested to read the terms & conditions before making any booking under the offers running on Tripgoonline.com</li>
                  <li>If any city taxes applicable then it will be directly payable to hotel. For more information, kindly connect with hotelier directly.</li>
                  <li>All the information pertaining to the hotel including the category of the hotel, images, room type, amenities and facilities available at the hotel are as per the information provided by the hotel to Tripgoonline.com This information is for reference only. Any discrepancy that may exist between the website pictures and actual settings of the hotel shall be raised by the User with the hotel directly, and shall be resolved between the User and hotel. Tripgoonline.comwill have no responsibility in that process of resolution, and shall not take any liability for such discrepancies.</li>
                  <li>Refund, if any shall be processed by Tripgoonline.comto the customer only upon receipt of the same from the concerned Hotel.</li>
                  <li>For any query or clarification, please write to us at tripgoonline.com</li>
                </ul>
              </div>

            </div>
          </div>
        
      </div>
      </Container>
    </div>
  );
};

export default HotelRoomsOverView;
