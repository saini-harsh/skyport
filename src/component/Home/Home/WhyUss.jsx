import React from 'react'
import { Container } from 'react-bootstrap'
import './Home.css'
const WhyUss = () => {
  return (
    <div style={{ padding: "40px 0px" }}>
      <Container>
        <>
          <div className="d-flex justify-content-between">
            <div className="_hdrtxt">Why book with us?</div>
          </div>
          <div
            className="d-flex uspsec justify-content-between "
            style={{ gap: "20px" }}
          >
            <div className="trcard">
              <img src="/Images/Icons/esy-flights.svg" alt=" Easy Booking" />
              <div className="crdttl">Easy Booking</div>
              <div className="crdbdy">
                Book Flights Easily and Grab Exciting Offers!"
              </div>
            </div>
            <div className="trcard">
              <img src="/Images/Icons/down-arrows.svg" alt="Lowest Price" />
              <div className="crdttl">Lowest Price</div>
              <div className="crdbdy">
                Guaranteed Low Rates on Flights!
              </div>
            </div>
            <div className="trcard">
              <img src="/Images/Icons/return-boxs.svg" alt="Instant Refund" />
              <div className="crdttl">Instant Refund</div>
              <div className="crdbdy">
                Get Quick and Easy Refunds on All Your Travel Bookings!
              </div>
            </div>
            <div className="trcard">
              <img src="/Images/Icons/24-hoursa.svg" alt=" 24/7 Support" />
              <div className="crdttl">24/7 Support</div>
              <div className="crdbdy">
                24/7 Support for All Your Flight Queries — We're Here to Help!
              </div>
            </div>
            <div className="trcard">
              <img src="/Images/Icons/hot-sales.svg" alt=" Exciting Deals" />
              <div className="crdttl">Exciting Deals</div>
              <div className="crdbdy">
                Unlock Exciting Deals on Flights!
              </div>
            </div>
          </div>
        </>
      </Container>
    </div>
  );
}

export default WhyUss