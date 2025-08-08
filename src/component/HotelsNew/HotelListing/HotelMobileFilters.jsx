import React from 'react';
import './HotelMobileFilters.css';
import { Col, Container, Row } from 'react-bootstrap';
import { FaFilter } from "react-icons/fa";
import { MdSort } from "react-icons/md";
import { MdToggleOff } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoIosStar } from "react-icons/io";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";



function HotelMobileFilters() {
  return (
    <div className='Hotel-menuContainerMain' style={{position:'relative'}}>
      <div className="Hotel-menuContainer">
      <Link to="/filter"><div className="hotelFilter-menuItem"><FaFilter className='hotel-menuIcons'/>Filter</div></Link>
      <Link to="/time"> <div className="hotelFilter-menuItem"><IoIosStar className='hotel-menuIcons' />Rating</div></Link>
      <Link to="/airlines"> <div className="hotelFilter-menuItem"><RiMoneyRupeeCircleFill className='hotel-menuIcons' />Price</div></Link>
       <Link to="/"> <div className="hotelFilter-menuItem"> <MdToggleOff className='hotel-menuIcons'/> Breakfast</div></Link>
      <Link to="/sort"><div className="hotelFilter-menuItem"><MdSort className='hotel-menuIcons' />Sort</div></Link> 
    </div>
     
    </div>
  )
}

export default HotelMobileFilters
