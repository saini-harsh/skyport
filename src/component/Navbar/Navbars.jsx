import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import Lelo from "./logo-lelotrip.png";
import "./Navbars.css";
import {
  FaCrown,
  FaEnvelope,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaRegUser,
  FaUserAlt,
  FaUserCircle,
  FaPlane,
  FaChevronDown,
} from "react-icons/fa";
import { IoMdGlobe, IoMdNotificationsOutline } from "react-icons/io";
import {
  MdChatBubbleOutline,
  MdEmail,
  MdLogout,
  MdWhatsapp,
} from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

import ProtectedLink from "../ProtectedLink";
import { useAuth } from "../../context/AuthContext";
import { CountriesArray } from "./Countries";
import { FaPhoneVolume, FaRegCircleUser, FaXTwitter } from "react-icons/fa6";
import { IoPersonCircleOutline, IoTicketOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { RiWallet3Line } from "react-icons/ri";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { loggedOut } from "../../redux/slices/login";
// import { useAuth } from "../../context/AuthContext";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};
const Navbars = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [names, setNames] = useState("");
  useEffect(() => {
    const emaill = localStorage.getItem("email");
    setEmail(emaill);
    const names = localStorage.getItem("names");
    setNames(names);
  }, [isAuth, loggedOut]);
  const handleAuthClick = () => {
    if (isAuth) {
      dispatch(loggedOut());
    } else {
      handleShow();
      setExpanded(false);
      setShowSideNav(false);
    }
  };

  const [otpSent, setOtpSent] = useState(false);
  const handleClose = () => {
    setShow(false);
    // setOtpSent(false)
  };
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setExpanded(false);
  };
  const [expanded, setExpanded] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // For dropdown
  const [selectedCountry, setSelectedCountry] = useState({
    code: "in",
    name: "India",
  });

  const width = useWindowWidth();

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleToggle = () => {
    const isPhone = width <= 998;
    if (isPhone) {
      setShowSideNav(true); // Show custom side nav
      setExpanded(false); // Make sure collapse nav stays closed
    } else {
      setExpanded(expanded ? false : "expanded"); // Toggle Bootstrap collapse on desktop
      setShowSideNav(false); // Just in case it's open, hide it
    }
  };

  const [showHelpDropdown, setShowHelpDropdown] = useState(false);

  const toggleHelpDropdown = () => {
    setShowHelpDropdown((prev) => !prev);
  };
  const [showMore, setShowMore] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);

  const [showSupport, setShowSupport] = useState(false);
  const handleMyAccount = () => {
    navigate("/bookings/flight");
    setShowSideNav(false);
  };
  const handleSupport = () => {
    navigate("/contact");
    setShowSideNav(false);
  };
  const handleLoginClick = () => {
    handleShow();
    setExpanded(false);
    setShowSideNav(false);
  };
  const handleLoginFunc = () => {
    setShowSideNav(false);
    setShow(true);
  };


  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="main-nav">
      <div
        id="opct3"
        className="_opcMenu"
        style={{ display: showSideNav ? "block" : "none" }}
      ></div>
      <Navbar
        // bg="#053355"
        expand="lg"
        // className="p-0"
        collapseOnSelect
        expanded={expanded}
        className={`p-0 ${isHome ? 'navbar-home_sky' : 'navbar-other_sky'}`}
        style={{ border: "none", backgroundColor: "#053355" }}
      >
        <Container>
          <Navbar.Toggle onClick={handleToggle}>
            <HiOutlineMenuAlt2 size={24} />
          </Navbar.Toggle>
          <div
            id="mySidenav_v3"
            className="_sidenav"
            style={{ width: "75%", display: showSideNav ? "block" : "none" }}
          >
            <div className="">
              <a
                className="closemenu_v3"
                onClick={(e) => {
                  e.preventDefault();
                  setShowSideNav(false);
                }}
              >
                ×
              </a>

              <div
                id="divSignInPnl"
                className="divSignInPnl"
                onClick={handleAuthClick}
              >
                <div
                  className="_menuProf menu_top_Tg menu_trip_go_card"
                  style={{ gap: "15px", alignItems: "center", border: "none" }}
                >
                  <div
                    style={{
                      background: "#fff",
                      borderRadius: "50px",
                      padding: "5px",
                    }}
                  >
                    <AiOutlineUser size={35} color="#1d489f" />
                  </div>
                  {isAuth ? (
                    <div className="_logRt">
                      <div className="_logSinup"> Hi {names}</div>
                      <div className="_logDt"> {email}</div>
                    </div>
                  ) : (
                    <div className="_logRt">
                      <div className="_logSinup">Login or Signup</div>
                      <div className="_logDt"> and Grab Exclusive deals</div>
                    </div>
                  )}
                </div>
              </div>

              <div
                style={{
                  width: "90%",
                  margin: "auto",
                }}
              >
                <div
                  className="_menuProf"
                  style={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="inner_account_nav" onClick={handleMyAccount}>
                    <div className="inner_acc">
                      <FaRegUser color="#fff" size={20} />
                    </div>
                    <p>My Account</p>
                  </div>

                  <div className="inner_account_nav">
                    <div className="inner_acc">
                      <MdChatBubbleOutline color="#fff" size={20} />
                    </div>
                    <p className="">Notifications</p>
                  </div>
                  <div className="inner_account_nav" onClick={handleSupport}>
                    <div className="inner_acc">
                      <IoMdNotificationsOutline color="#fff" size={20} />
                    </div>
                    <p>Support</p>
                  </div>
                </div>
              </div>
              <div className="_sidMenu">
                <div className="_sidMenu_tggg" onClick={handleMyAccount}>
                  <a>
                    <div className="_bxIcn">
                      <div className="_menuIcn">
                        <IoTicketOutline color="#1d489f" size={25} />
                      </div>
                      <div className="_logRgt">
                        <div className="_hTxt"> My Booking</div>
                        <p className="_mTxt">
                          {" "}
                          View and manage your <br />
                          bookings
                        </p>
                      </div>
                    </div>
                    <i
                      className={`_arwwLft ${showHelpDropdown ? "rotate" : ""}`}
                    />
                  </a>
                </div>

                <div className="_sidMenu_tggg">
                  <a>
                    <div className="_bxIcn">
                      <div className="_menuIcn">
                        <RiWallet3Line color="#1d489f" size={25} />
                      </div>
                      <div className="_logRgt">
                        <div className="_hTxt">SkyPort DestinationsWallet</div>
                        <p className="_mTxt">
                          {" "}
                          Use your wallet for hassle- <br />
                          free booking
                        </p>
                      </div>
                    </div>
                    <i
                      className={`_arwwLft ${showHelpDropdown ? "rotate" : ""}`}
                    />
                  </a>
                </div>
              </div>

              <div className="_sidMenu" style={{ marginTop: "10px" }}>
                <div className="_sidMenu_tggg">
                  <Link
                    to="https://instagram.com/tripgo_online?igshid=YmMyMTA2M2Y="
                    target="_blank"
                  >
                    <div className="_bxIcn">
                      <div className="_menuIcn">
                        {/* Instagram Gradient or closest solid color */}
                        <FaInstagram color="#E4405F" size={25} />
                      </div>
                      <div className="_logRgt">
                        <div className="_hTxt">Instagram</div>
                      </div>
                    </div>
                    <i
                      className={`_arwwLft ${showHelpDropdown ? "rotate" : ""}`}
                    />
                  </Link>
                </div>

                <div className="_sidMenu_tggg">
                  <Link
                    to="https://www.facebook.com/TravelTGO/"
                    target="_blank"
                  >
                    <div className="_bxIcn">
                      <div className="_menuIcn">
                        {/* Facebook Blue */}
                        <FaFacebookSquare color="#1877F2" size={25} />
                      </div>
                      <div className="_logRgt">
                        <div className="_hTxt">Facebook</div>
                      </div>
                    </div>
                    <i
                      className={`_arwwLft ${showHelpDropdown ? "rotate" : ""}`}
                    />
                  </Link>
                </div>

                <div className="_sidMenu_tggg ">
                  <Link to="https://twitter.com/tripgoonline" target="_blank">
                    <div className="_bxIcn">
                      <div className="_menuIcn">
                        {/* X (Twitter) Black */}
                        <FaXTwitter color="#000000" size={25} />
                      </div>
                      <div className="_logRgt">
                        <div className="_hTxt">Twitter</div>
                      </div>
                    </div>
                    <i
                      className={`_arwwLft ${showHelpDropdown ? "rotate" : ""}`}
                    />
                  </Link>
                </div>
              </div>

              <div className="_sidMenu">
                <a>
                  <div className="_bxIcn" onClick={toggleHelpDropdown}>
                    <div className="_menuIcn" style={{ marginTop: "7px" }}>
                      <i
                        className="_yourBoking"
                        style={{
                          background:
                            "url('https://images.emtcontent.com/flag/flag_IN.svg')",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                    </div>
                    <div className="_logRgt">
                      <p className="_mTxt">Country / Region</p>
                      <div className="_hTxt">India</div>
                    </div>
                  </div>
                  <i
                    className={`_arwwLft ${showHelpDropdown ? "rotate" : ""}`}
                  />
                </a>
              </div>
              <div className="_sidMenu">
                <a onClick={handleAuthClick}>
                  <div className="_bxIcn" onClick={toggleHelpDropdown}>
                    <div className="_menuIcn" style={{ marginTop: "7px" }}>
                      <BsBoxArrowInRight size={25} color="#aa0000" />
                    </div>
                    <div className="_logRgt">
                      <div className="_hTxt" style={{ color: "#aa0000" }}>
                        {isAuth ? "Sign Out" : "Login"}
                      </div>
                    </div>
                  </div>
                  <i
                    className={`_arwwLft ${showHelpDropdown ? "rotate" : ""}`}
                  />
                </a>
              </div>

              <div className="_sidMenu tLogout" style={{ display: "none" }}>
                <a>
                  <div className="_bxIcn">
                    <div className="_menuIcn">
                      <i className="_logOut" />
                    </div>
                    <div className="_logRgt">
                      <div className="_hTxt">
                        {" "}
                        {isAuth ? "Sign Out" : "Login"}
                      </div>
                    </div>
                  </div>
                  <i className="_arwwLft" />
                </a>
              </div>
            </div>

            <link id="linkb2bMenu" href="" rel="stylesheet" />

            <div className="bg_ovrly" style={{ display: "none" }} />
          </div>

          <Navbar.Collapse
            id="navbarCollapse"
            style={{
              order: expanded && "4",
              paddingBottom: expanded && "10px",
              marginTop: "20px",
            }}
          >
            <Nav className="me-auto py-4 py-lg-0">
              {/* <NavDropdown
                title={
                  <span style={{ display: 'flex', alignItems: 'center',flexDirection:"row", color: '#ffffff', fontWeight: 600 }}>
                    More travel
                    <FaChevronDown style={{ marginLeft: 6, fontSize: '0.9em' }} />
                  </span>
                }
                id="moreTravelDropdown"
                className="more-travel-dropdown border"
              >
                <NavDropdown.Item as={Link} to="/flights" className="dropdown-item-flex">
                  <FaPlane className="dropdown-icon" />
                  Flight
                </NavDropdown.Item>
              </NavDropdown>  */}

              <div className="nav-item moreTravel">
                <button className="more-travel-btn">
                  <span>More Travel</span>
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                  </svg>
                </button>
                <div className="option-list ">
                  <ul className="first-menu">
                    <li>
                      <a
                        tabIndex={0}
                        title="Flights"
                        className="item-link "
                        href="//www.onetravel.com/cheap-flights"
                      >
                        <div className="left-sec">
                          <svg
                            viewBox="0 0 20 20"
                            className="sv svg-1-25 text-gray-700  "
                            aria-hidden="true"
                          >
                            <use className="sv-icon" xlinkHref="#flights_v2" />
                          </svg>
                          Flights
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        tabIndex={0}
                        title="Hotels"
                        className="item-link "
                        href="//www.onetravel.com/hotels"
                      >
                        <div className="left-sec">
                          <svg
                            viewBox="0 0 20 20"
                            className="sv svg-1-25 text-gray-700  "
                            aria-hidden="true"
                          >
                            <use className="sv-icon" xlinkHref="#hotels_v2" />
                          </svg>
                          Hotels
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        tabIndex={0}
                        title="Cars"
                        className="item-link "
                        href="//www.onetravel.com/car-rentals"
                      >
                        <div className="left-sec">
                          <svg
                            viewBox="0 0 20 20"
                            className="sv svg-1-25 text-gray-700  "
                            aria-hidden="true"
                          >
                            <use className="sv-icon" xlinkHref="#car_v2" />
                          </svg>
                          Cars
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        tabIndex={0}
                        title="Packages"
                        className="item-link "
                        href="//www.onetravel.com/vacations"
                      >
                        <div className="left-sec">
                          <svg
                            viewBox="0 0 20 20"
                            className="sv svg-1-25 text-gray-700  "
                            aria-hidden="true"
                          >
                            <use className="sv-icon" xlinkHref="#package_v2" />
                          </svg>
                          Packages
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <Nav.Link
                as={Link}
                to="/"
                className="d-flex align-items-center hvr-underline-reveal"
                style={{ color: "#fff" }}
              >
                <img
                  src="/Images/Icons/flightss.png"
                  width={40}
                  alt="Flights Icon"
                  className="navbar_icons_Image"
                />
                Flights
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/hotel"
                className="d-flex align-items-center hvr-underline-reveal"
                onClick={() => setExpanded(false)}
              >
                <img
                  src="/Images/Icons/hotelss.png"
                  width={40}
                  alt="Hotel Icon"
                  className="navbar_icons_Image"
                />
                Hotels
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/tour"
                onClick={() => setExpanded(false)}
                className="d-flex align-items-center hvr-underline-reveal"
              >
                <img
                  src="/Images/Icons/holidayss.png"
                  width={40}
                  alt="Holidays Icon"
                  className="navbar_icons_Image"
                />
                Holidays
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/buses"
                onClick={() => setExpanded(false)}
                className="d-flex align-items-center hvr-underline-reveal"
              >
                <img
                  src="/Images/Icons/busess.png"
                  width={40}
                  alt="Bus Icon"
                  className="navbar_icons_Image"
                />
                Buses
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/cabs"
                onClick={() => setExpanded(false)}
                className="d-flex align-items-center hvr-underline-reveal"
              >
                <img
                  src="/Images/Icons/cabss.png"
                  width={40}
                  alt="Cabs Icon"
                  className="navbar_icons_Image"
                />
                Cabs
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/bookings/flight"
                onClick={() => setExpanded(false)}
                className="d-flex align-items-center hvr-underline-reveal"
              >
                <img
                  src="/Images/Icons/mybookingss.png"
                  alt="My Bookings"
                  style={{ height: "28px", width: "28px", marginRight: "8px" }}
                />
                My Bookings
              </Nav.Link> */}

              {/* <Nav
                className="ml-auto support_link"
                onMouseLeave={handleMouseLeave}
              >
                <NavDropdown
                  title={
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src="/Images/Icons/supportss.png"
                        alt="Support"
                        style={{
                          height: "28px",
                          width: "28px",
                          marginRight: "8px",
                        }}
                      />
                      Support
                    </span>
                  }
                  id="navbarDropdown"
                  className="no-border support_link"
                  style={{ padding: "0px" }}
                  show={showDropdown}
                  onMouseEnter={handleMouseEnter}
                >
                  <NavDropdown.Item>
                    <div className="cus_icon">
                      <FaUserCircle className="icon" />
                    </div>
                    <div className="cus_txt">
                      <span className="title">Account Manager</span>
                      <span className="sub_txt">
                        +91 92112 52356 <br /> support@tripgoonline.com
                      </span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <div className="cus_icon">
                      <IoMdGlobe className="icon" />
                    </div>
                    <div className="cus_txt">
                      <span className="title">Customer Support</span>
                      <span className="sub_txt">
                        support@tripgoonline.com
                        <br /> +91 92112 52356
                      </span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <div className="cus_icon whatsapp_icon">
                      <MdWhatsapp className="icon" />
                    </div>
                    <div className="cus_txt">
                      <span className="title" style={{ marginTop: "6px" }}>
                        +91 92112 52356
                      </span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setShowDropdown(false)}>
                    <div className="cus_icon">
                      <FaEnvelope className="icon" />
                    </div>
                    <div className="cus_txt">
                      <span className="title">For Booking</span>
                      <span className="sub_txt">
                        <Link
                          className="mail_link"
                          to="mailto:support@tripgoonline.com"
                        >
                          support@tripgoonline.com
                        </Link>
                      </span>
                    </div>
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => setShowDropdown(false)}>
                    <div className="cus_icon">
                      <FaEnvelope className="icon" />
                    </div>
                    <div className="cus_txt">
                      <span className="title">For Refund</span>
                      <span className="sub_txt">
                        <Link
                          className="mail_link"
                          to="mailto:support@tripgoonline.com"
                        >
                          support@tripgoonline.com
                        </Link>
                      </span>
                    </div>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav
                className="ml-auto support_link"
                onMouseLeave={() => {
                  setShowMore(false);
                  setShowSupport(false);
                }}
              >
                <NavDropdown
                  title={
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src="/Images/Icons/more.png"
                        alt="More"
                        style={{
                          height: "30px",
                          width: "30px",
                          marginRight: "5px",
                        }}
                      />
                      More
                    </span>
                  }
                  id="moreDropdown"
                  className="no-border support_link"
                  show={showMore}
                  onMouseEnter={() => setShowMore(true)}
                  onMouseLeave={() => setShowMore(false)}
                >
                 
                  <NavDropdown.Item
                    className="support_link"
                    style={{ display: "flex", alignItems: "center" }}
                    as={Link}
                    to="/insurance"
                  >
                    <img
                      src="/Images/Icons/insurancess.png"
                      alt="My Bookings"
                      style={{
                        height: "28px",
                        width: "28px",
                        marginRight: "8px",
                      }}
                    />
                    Insurance
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="support_link"
                    style={{ display: "flex", alignItems: "center" }}
                    as={Link}
                    to="/visa"
                  >
                    <img
                      src="/Images/Icons/visass.png"
                      alt="My Bookings"
                      style={{
                        height: "28px",
                        width: "28px",
                        marginRight: "8px",
                      }}
                    />
                    Visa
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="support_link"
                    style={{ display: "flex", alignItems: "center" }}
                    as={Link}
                    to="/forex"
                  >
                    <img
                      src="/Images/Icons/forexss.png"
                      alt="My Bookings"
                      style={{
                        height: "28px",
                        width: "28px",
                        marginRight: "8px",
                      }}
                    />
                    Forex
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav> */}
            </Nav>
            {/* <div
              className="flex flex-middle px-1"
              style={{ marginLeft: "12px" }}
            >
              <div className="d-flex c-pointer">
                <button
                  onClick={handleAuthClick}
                  style={{ width: "max-content", display: expanded && "none" }}
                  className="hero-navbar-btnn h-10 br-6 bg-secondary-500 hover:bg-secondary-600 text-white border-transparent cursor-pointer py-1 px-3 font-weight-bold text-  border-solid text-500 border-1 rounded-0 line-height-solid box-border"
                >
                  <IoPersonCircleOutline
                    size={22}
                    color="#fff"
                    style={{ marginTop: "-2px", marginRight: "2px" }}
                  />{" "}
                  {isAuth ? "Logout" : "Log In / Sign Up"}
                </button>
              </div>
            </div> */}

            <div className="header-right-sec">
              <a
                href="tel:+592 615 8808"
                role="button"
                className="utility__phone utility__phone-number is-active inner"
                aria-label="1-646-738-4863 Book Now - Call us 24/7"
              >
                <div
                  className="utility__phone-number-image"
                  width={42}
                  height={42}
                >
                  <span className="dialer" />
                </div>
                <span className="utility__phone-msg" id="utility__phone-msg">
                  <b id="utility__phone-number">+592 615 8808</b>
                  <span className="d-block travel__expert">
                    Book Now - Call us 24/7
                  </span>
                </span>
                <div className="tooltip-feature">
                  <div className="benefits-title">
                    Benefits of booking with an agent
                  </div>
                  <div className="benefits-content">
                    <div className="points-container">
                      <div className="point-wrap">
                        <div className="icon-check" />
                        <div className="content">
                          Phone only deals available
                        </div>
                      </div>
                      <div className="point-wrap">
                        <div className="icon-check" />
                        <div className="content">24 hour cancellation</div>
                      </div>
                    </div>
                    <div className="points-container">
                      <div className="point-wrap">
                        <div className="icon-check" />
                        <div className="content">
                          Personalized travel assistance
                        </div>
                      </div>
                      <div className="point-wrap">
                        <div className="icon-check" />
                        <div className="content">
                          2X ClubMiles reward points
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              {/* <div className="nav-item currency-menu d-none d-md-block">
                <button
                  className=" navigation-link-new currency-btn css-1ujsas3"
                  type="button"
                  id="currency-button"
                >
                  <span className="flag flag-USD" /> <span>USD $ / EN </span>
                  <span className="css-1n4a93h">
                    <svg
                      className="css-vubbuv"
                      focusable="false"
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      data-testid="ExpandMoreIcon"
                    >
                      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
                    </svg>
                  </span>
                  <span className="css-w0pj6f" />
                </button>
              </div> */}
              <div className="nav-item helpMenu">
                <a className="navigation-link-new" type="link">
                  Help
                </a>
              </div>
              <button className="btn-signin css-79xub" type="button">
                <span className="icon_grey">
                  <svg
                    viewBox="0 0 18 18"
                    className="sv svg-1-25 text-gray-700  "
                    aria-hidden="true"
                  >
                    <use className="sv-icon" xlinkHref="#sv_user_new_grey" />
                  </svg>
                </span>
                <span className="icon_blue">
                  <IoPersonCircleOutline size={23} />
                </span>
                <span className="text">
                  Sign In <span className="seprator-slash">/</span> Join
                </span>
                <span className=" css-w0pj6f" />
              </button>
            </div>
          </Navbar.Collapse>
          <Navbar.Brand as={Link} to="/">
            <img className="logo-main me-2" src="/Images/logo.png" alt="Logo" />
          </Navbar.Brand>

          <div
            className="flex flex-middle px-1 singupbtn"
            style={{ marginLeft: "12px" }}
          >
            <div
              className="sharenation"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "7px",
              }}
            >
              <div
                className="_langview b2cpanel dropdown-header"
                onClick={toggleDropdown}
              >
                <span id="spnFlgImgHead">
                  <img
                    src={`https://flagcdn.com/w20/${selectedCountry.code}.png`}
                    alt=""
                  />
                </span>
                <span id="spnCC">{selectedCountry.name}</span>
                <i className={`_arrwdnlang ${isOpen ? "open" : ""}`}></i>
                {isOpen && (
                  <div className="dropdown-options">
                    {CountriesArray.map((country, index) => (
                      <div
                        key={index}
                        className="option"
                        onClick={() => handleCountrySelect(country)}
                      >
                        <img
                          src={`https://flagcdn.com/w20/${country.code}.png`}
                          alt=""
                        />
                        <span>{country.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      <SignUp
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
        otpSent={otpSent}
        setOtpSent={setOtpSent}
      />
    </div>
  );
};

export default Navbars;
