import React from "react";
import { Card, Button } from "react-bootstrap";
import "./HotelComponent.css";
import { Link } from "react-router-dom";

const HotelCard = ({ imageUrl, altText, destination, links }) => {
  return (
    <div className="ecpl_rbx">
      <div className="mgdestn">
        <Link>
          <img variant="top" src={imageUrl} alt={altText} />
        </Link>
      </div>
      <div className="_pckgdscrptn">
        <h5 className="htlnking"><Link>{destination}</Link></h5>
        <div className="htlnking">
          {links.map((link, index) => (
            <Link key={index} className="htlnking-link">
              {link}
            </Link>
          ))}
        </div>
        {/* <Button variant="primary">Book Now</Button> */}
      </div>
    </div>
  );
};

const HotelsContainer = () => {
  const hotels = [
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/hyd-sm.webp",
      altText: "Hyderabad",
      destination: "Hyderabad",
      links: [
        "Hotels,",
        "Budget Hotels,",
        "3 Star Hotels,",
        "4 Star Hotels,",
        "5 Star Hotels",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/goa-sm.webp",
      altText: "Goa",
      destination: "Goa",
      links: [
        "Hotels,",
        "Budget Hotels,",
        "3 Star Hotels,",
        "4 Star Hotels,",
        "5 Star Hotels",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/mumb-sm.webp",
      altText: "Mumbai",
      destination: "Mumbai",
      links: [
        "Hotels,",
        "Budget Hotels,",
        "3 Star Hotels,",
        "4 Star Hotels,",
        "5 Star Hotels",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/pune-sm.webp",
      altText: "Pune",
      destination: "Pune",
      links: [
        "Hotels,",
        "Budget Hotels,",
        "3 Star Hotels,",
        "4 Star Hotels,",
        "5 Star Hotels",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/del-sm.webp",
      altText: "Delhi",
      destination: "Delhi",
      links: [
        "Hotels,",
        "Budget Hotels,",
        "3 Star Hotels,",
        "4 Star Hotels,",
        "5 Star Hotels",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/chennai-sm.webp",
      altText: "Chennai",
      destination: "Chennai",
      links: [
        "Hotels,",
        "Budget Hotels,",
        "3 Star Hotels,",
        "4 Star Hotels,",
        "5 Star Hotels",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/jaipur-sm.webp",
      altText: "Jaipur",
      destination: "Jaipur",
      links: [
        "Hotels,",
        "Budget Hotels,",
        "3 Star Hotels,",
        "4 Star Hotels,",
        "5 Star Hotels",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/shimla-sm.webp",
      altText: "Dehradun",
      destination: "Dehradun",
      links: [
        "Hotels,",
        "Budget Hotels,",
        "3 Star Hotels,",
        "4 Star Hotels,",
        "5 Star Hotels",
      ],
    },
    {
      imageUrl: "https://www.easemytrip.com/images/hotel-img/ahmd-sm.webp",
      altText: "Ahmedabad",
      destination: "Ahmedabad",
      links: [
        "Hotels,",
        "Budget Hotels,",
        "3 Star Hotels,",
        "4 Star Hotels,",
        "5 Star Hotels",
      ],
    },
  ];
  

  return (
  <div style={{background:'#fff',position:'relative',zIndex:'100',padding:'5px'}}>
      <div className="innerWrap">
      <div className="slchtl_mn">
        <div className="pg_tle f28 wt600">
          Book Hotels at Popular Destinations
        </div>
        <div className="_polrdestnbx mt20">
          {hotels.map((hotel, index) => (
            <HotelCard key={index} {...hotel} />
          ))}
        </div>
      </div>
      <div className="view_btn ctmrg">
        <Link >View More</Link>
      </div>
    </div>
  </div>
  );
};

export default HotelsContainer;
