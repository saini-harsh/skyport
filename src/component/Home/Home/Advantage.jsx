import React from 'react'
import './Advantage.css'
import { MdLockReset } from "react-icons/md";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { BiSolidBookmarkAltPlus } from "react-icons/bi";
import { MdOutlineEditLocation } from "react-icons/md";

const Advantage = () => {
  return (
    <section className="section benefit-section bg-light-300">
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-lg-6 text-center wow fadeInUp"
            data-wow-delay="0.2s"
            style={{
              visibility: "visible",
              animationDelay: "0.2s",
              animationName: "fadeInUp",
            }}
          >
            <div className="section-header text-center">
              <h2 className="mb-2 sections_h_fives">
                Our{" "}
                <span
                  className="text-decoration-underline"
                  style={{ color: "#CF3425" }}
                >
                  Benefits
                </span>{" "}
                &amp; Key Advantages
              </h2>
              <p className="sub-title">
                TripGo, a tour operator specializing in dream destinations,
                offers a variety of benefits for travelers.
              </p>
            </div>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-6 col-lg-3 d-flex">
            <div
              className="card benefit-card mb-0 flex-fill wow fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              <div className="card-body text-center">
                <div className="benefit-icon mb-2  text-gray-9 mx-auto">
                  <img
                    src="/Images/Icons/esy-flights.svg"
                    className="isax isax-lock-1"
                    style={{ height: "32px" }}
                    color="#fff"
                  />
                </div>
                <h5 className="mb-2">Easy Booking</h5>
                <p className="mb-0" style={{ fontSize: "14px" }}>
                  Book Flights Easily and Grab Exciting Offers!"
                </p>
                <span className="icon-view text-secondary">
                  <i className="isax isax-lock-1" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3 d-flex">
            <div
              className="card benefit-card mb-0 flex-fill wow fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              <div className="card-body text-center">
                <div className="benefit-icon mb-2 text-white mx-auto">
                  <img
                    src="/Images/Icons/down-arrows.svg"
                    alt=" Easy Booking"
                    style={{ height: "32px" }}
                  />
                </div>
                <h5 className="mb-2">Lowest Price</h5>
                <p className="mb-0" style={{ fontSize: "14px" }}>
                  Guaranteed Low Rates on Hotels, Holiday Packages, and Flights!
                </p>
                <span className="icon-view text-orange">
                  <i className="isax isax-magicpen" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3 d-flex">
            <div
              className="card benefit-card mb-0 flex-fill wow fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              <div className="card-body text-center">
                <div className="benefit-icon mb-2 text-white mx-auto">
                  <img
                    src="/Images/Icons/return-boxs.svg"
                    alt=" Easy Booking"
                    style={{ height: "32px" }}
                  />
                </div>
                <h5 className="mb-2">Instant Refund</h5>
                <p className="mb-0" style={{ fontSize: "14px" }}>
                  Get Quick and Easy Refunds on All Your Travel Bookings!
                </p>
                <span className="icon-view text-purple">
                  <i className="isax isax-receipt-add" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3 d-flex">
            <div
              className="card benefit-card mb-0 flex-fill wow fadeInUp"
              data-wow-delay="0.2s"
              style={{
                visibility: "visible",
                animationDelay: "0.2s",
                animationName: "fadeInUp",
              }}
            >
              <div className="card-body text-center">
                <div className="benefit-icon mb-2 text-white mx-auto">
                  <img
                    src="/Images/Icons/24-hoursa.svg"
                    alt=" Easy Booking"
                    style={{ height: "32px" }}
                  />
                </div>
                <h5 className="mb-2">24/7 Support</h5>
                <p className="mb-0" style={{ fontSize: "14px" }}>
                  24/7 Support for All Your Travel Queries — We're Here to
                  Help!
                </p>
                <span className="icon-view text-teal">
                  <i className="isax isax-location-tick" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Advantage