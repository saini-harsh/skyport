import React, { useState, useRef, useEffect } from "react";
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import "./css/FullDetail.css";
import { Container } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "axios";
import ItinearySection from "./ItinearySection";

const FullDetail = ({ data }) => {
  const [isFullContent, setIsFullContent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleContent = () => {
    setIsFullContent(!isFullContent);
  };
  const [formData, setFormData] = useState({
    // city: "",
    adult: 0,
    child: 0,
    infant: 0,
    name: "",
    email: "",
    phone: "",
  });

  // Function to handle changes in form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { name, email, phone, adult, child, infant, city } = formData;
    const { name, email, phone, adult, child, infant } = formData;

    // Per-field validation using SweetAlert2
    // if (!city) {
    //   Swal.fire("Missing Field", "Please enter your city.", "warning");
    //   return;
    // }
    if (!name) {
      Swal.fire("Missing Field", "Please enter your name.", "warning");
      return;
    }
    if (!email) {
      Swal.fire("Missing Field", "Please enter your email.", "warning");
      return;
    }
     if (!phone.trim()) {
      Swal.fire("Missing Field", "Please enter your phone number.", "warning");
      return;
    }
    const phonePattern = /^\+?[0-9\s\-]{10,20}$/;
    if (!phonePattern.test(phone.trim())) {
      Swal.fire("Invalid Phone", "Please enter a valid phone number (e.g., +91 9310147852).", "warning");
      return;
    }
    // At least one passenger should be selected
    if (adult === 0) {
      Swal.fire("No Passengers", "Please select at least one passenger.", "warning");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await axios.post("https://admin.tripgoonline.com/api/HolidayPackages/package_enquiry", {
        name,
        email,
        phone,
        adult,
        children: child,
        infant,
        package_id: data && data.packagedetail.id,
        // city,
      });
      

      if (response.data.success === true) {
        Swal.fire("Success", response.data.message, "success");
        setFormData({
          // city: "",
          adult: 0,
          child: 0,
          infant: 0,
          name: "",
          email: "",
          phone: "",
        });
      } else {
        Swal.fire("Error", response.data.message, "error");
      }
    } catch (error) {
      console.error("API error:", error);
      Swal.fire("Error", "Failed to submit query. Please try again.", "error");
    } finally{
      setIsSubmitting(false);
    }
  };


  // adult child infant inc dec
  const handleCountChange = (field, operation) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        operation === "inc"
          ? prev[field] + 1
          : prev[field] > 0
          ? prev[field] - 1
          : 0,
    }));
  };

  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    setIsSticky(window.scrollY > 220);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    <div style={{ background: "#fff" }}>
      <div
        // className="tourPackage-ful-strip"
        className={`tourPackage-ful-strip ${isSticky ? "sticky" : ""}`}
      >
        <Container>
          <div
            // className="tourPackageFullDetailUnderline"
            className="tourPackageFullDetailUnderline"
            style={{ width: "100%" }}
          >
            <ul className="tourPackagefullDetailUnder">
              <li className="">
                <a href="#overview">Overview</a>
              </li>
              <li className="">
                <a href="#ltinerary">ltinerary</a>
              </li>
              <li className="">
                <a href="#inclusion">inclusion</a>
              </li>
              <li className="">
                <a href="#exclusion">exclusion</a>
              </li>
              <li className="">
                <a href="#Hotels">Hotels</a>
              </li>
              <li className="">
                <a href="#term-condition">Terms & Conditions</a>
              </li>
            </ul>
            <div className="tourPackageUnderLineIcon">
              <FaDownload size={28} className="tourPackageUnderLineIcon1" />
              <FaShareAlt size={28} className="tourPackageUnderLineIcon2" />
            </div>
          </div>
        </Container>
      </div>
      <div className="tourPackagefullDetail">
        <div className="tourPackagefullDetail">
          {/* {Object.keys(data).map((key) => ( */}
          <div className="tourPackagefullDetailmain">
            <div className="tourPackagefullDetailinner1">
              <div className="tourPackagefullDetailinnerMain">
                <div className="">
                  <div id="overview">
                    
                    <Swiper
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      navigation={true}
                      modules={[Navigation, Autoplay]}
                      className="mySwiper"
                    >
                      {data.packagedetail.package_gallery.map((item) => (
                        <SwiperSlide>
                          <img
                            src={item.image}
                            alt=""
                            className="tourPaclageDetailinnerimg"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                  <div className="tourpackageDesc">
                    <h2 className="tourpackageDeshead1">Description</h2>
                    <div className="tourpackageDescIner">
                      {isFullContent ? (
                        <p className="tourpackageDescpara1">
                          {data.packagedetail.package_overview}
                          <button
                            onClick={toggleContent}
                            className="tourpackageDescbtn"
                          >
                            {isFullContent ? "Read Less" : "Read More"}
                          </button>
                        </p>
                      ) : (
                        <p className="tourpackageDescpara1">
                          {data.packagedetail.package_overview.substring(
                            0,
                            220
                          )}
                          ...
                          <button
                            onClick={toggleContent}
                            className="tourpackageDescbtn"
                          >
                            {isFullContent ? "Read Less" : "Read More"}
                          </button>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <ItinearySection data={data} />
              </div>
              <div className="tourPackageForm" id="enquirenew">
                <div className="tourPackageFormMainDiv">
                  <div className="tourPackageFormSecDiv border rounded-lg">
                    <form action="#" >
                      <div className="tourPackageFormDiv bg-[#9dc54194] p-[15px] rounded-t-2xl text-center">
                        <h2 className="tourPackageFormDivh1 text-[16px] font-[500]">
                          Want to Go For A Amazing Holiday?
                        </h2>
                        <p className="text-[12px]">
                          Provide Your Details to Know Best Holiday Deals
                        </p>
                      </div>
                      {/* <div className="tourPackageFormPackage">
                        <label htmlFor="" className="text-[13px]">
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="City"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="tourPackageFormPackageInput"
                        />
                      </div> */}
                      
                      <div className="tourPackageFormName">
                        <div className="tourPackageFormLabelDiv">
                          <label
                            htmlFor=""
                            className="tourPackageFormNameLabel"
                          >
                            Your Name
                            <div>
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your Name"
                                className="tourPackageFormNameLabelInput"
                              />
                            </div>
                          </label>
                        </div>
                        <div className="tourPackageFormLabelDiv">
                          <label
                            htmlFor=""
                            className="tourPackageFormNameLabel"
                          >
                            Your Email
                            <div>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Your Email"
                                className="tourPackageFormNameLabelInput"
                              />
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="tourPackageFormContact">
                        <label htmlFor="" className="tourPackageFormNameLabel">
                          Contact Number
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+919898XXXXXX"
                          className="tourPackageFormContactInput"
                        />
                      </div>
                      <div className="tourPackageFormAdult">
                        <div className="tourPackageFormAdultInner">
                          <p className="tourPackageFormAdultInner1">Adult</p>
                          <div className="tourPackageFormAdultInnerFlex">
                            <button
                              type="button"
                              onClick={() => handleCountChange("adult", "inc")}
                              className="tourPackageFormAdultInnerbtn"
                            >
                              +
                            </button>
                            <p className="tourPackageFormAdultInnerPara">{formData.adult}</p>
                            <button
                              type="button"
                              onClick={() => handleCountChange("adult", "dec")}
                              className="tourPackageFormAdultInnerbtn"
                            >
                              -
                            </button>
                          </div>
                        </div>
                        <div className="tourPackageFormAdultInner">
                          <p className="tourPackageFormAdultInner1">Child</p>
                          <div className="tourPackageFormAdultInnerFlex">
                            <button 
                              type="button"
                              onClick={() => handleCountChange("child", "inc")}
                              className="tourPackageFormAdultInnerbtn"
                            >
                              +
                            </button>
                            <p className="tourPackageFormAdultInnerPara">
                              {formData.child}
                            </p>
                            <button 
                               type="button"
                                onClick={() => handleCountChange("child", "dec")}
                                className="tourPackageFormAdultInnerbtn"
                            >
                              -
                            </button>
                          </div>
                        </div>
                        <div className=".tourPackageFormAdultInner ">
                          <p className="tourPackageFormAdultInner1">Infant</p>
                          <div className="tourPackageFormAdultInnerFlex">
                            <button 
                              type="button"
                              onClick={() => handleCountChange("infant", "inc")}
                              className="tourPackageFormAdultInnerbtn"
                            >
                              +
                            </button>
                            <p className="tourPackageFormAdultInnerPara">
                              {formData.infant}
                            </p>
                            <button
                               type="button"
                              onClick={() => handleCountChange("infant", "dec")}
                              className="tourPackageFormAdultInnerbtn"
                              style={{ fontSize: "15px" }}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="tourPackageFormQuery">
                        <button
                          className="tourPackageFormQuerybtn"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                           {isSubmitting ? (
                                <span className="spinner"></span>
                            ) : (
                                "Send Enquiry"
                            )}
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="tourPackageDetail">
                    <div className="tourPackageDetailHotel">
                      <div className="tourPackageDetailHotelInner">
                        <div className="">
                          <img
                            src="https://tripoholidays.in/public/images/hotel-icon.png"
                            alt=""
                            width={32}
                          />
                        </div>
                        <p>Hotel</p>
                      </div>
                      <div className="tourPackageDetailHotelInner">
                        <div className="">
                          <img
                            src="https://tripoholidays.in/public/images/binoculars-icon.png"
                            alt=""
                            width={32}
                            // height={20}
                          />
                        </div>
                        <p>Sightseeing</p>
                      </div>
                      <div className="tourPackageDetailHotelInner">
                        <div className="">
                          <img
                            src="https://tripoholidays.in/public/images/sedan-icon.png"
                            alt=""
                            width={35}
                            // height={20}
                          />
                        </div>
                        <p>Transfers</p>
                      </div>
                      <div className="tourPackageDetailHotelInner">
                        <div className="">
                          <img
                            src="https://tripoholidays.in/public/images/dinner-icon.png"
                            alt=""
                            width={35}
                            // height={20}
                          />
                        </div>
                        <p>Meals</p>
                      </div>
                    </div>
                    <div className="tourPackageDetailDuration">
                      <div className="tourPackageDetailDurationLine"></div>
                      <p className="tourPackageDetailDurationpara">
                        Duration & Details
                      </p>
                      <div className="tourPackageDetailDurationLine"></div>
                    </div>
                    <div className="tourPackageDetailDays">
                      <p>
                        <span className="tourPackageDetailDaySpan font-[600]">
                          {" "}
                          Duration:
                        </span>{" "}
                        9 Nights & 10 Days
                      </p>
                      <p>
                        <span className="tourPackageDetailDaySpan font-[600]">
                          Places to Visit:{" "}
                        </span>
                        3N lucerne + 2N Interlaken + 2N Montreux + 2N Zurich
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tourPackageDetailIcons">
                  <div>
                    <img
                      src="https://tripoholidays.in/public/images/customer-care.png"
                      alt=""
                      // className="w-[40px]"
                      width={50}
                    />
                  </div>
                  <div>
                    <p className="tourPackageDetailIconsPara">Need Help?</p>
                    <div className="tourPackageDetailIconsPara2">
                      <p>
                        <span>Call Us:</span>+91 92112 52356
                      </p>
                      <p>
                        <span>Mail Us:</span> support@TripGoOnline.com
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className="right-side-tour-package">
                  <h3>Similar Tour package </h3>
                  <div className="package-card-alpha">
                    <div className="package-thumb">
                      <a href="https://www.turio-wp.egenslab.com/tour/louvre-museum/">
                        <img
                          width={856}
                          height={578}
                          src="https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-05-1.jpg"
                          className="attachment-package-card size-package-card wp-post-image"
                          alt=""
                          decoding="async"
                          loading="lazy"
                          srcSet="https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-05-1.jpg 856w, https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-05-1-300x203.jpg 300w, https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-05-1-768x519.jpg 768w"
                          sizes="(max-width: 856px) 100vw, 856px"
                        />{" "}
                      </a>
                      <p className="card-lavel">
                      <IoMdTime style={{marginRight:'5px'}}/>
                        <span>3 Days 4 Nights</span>
                      </p>
                    </div>
                    <div className="package-card-body">
                      <h3 className="p-card-title">
                        <a href="https://www.turio-wp.egenslab.com/tour/louvre-museum/">
                          Louvre Museum{" "}
                        </a>
                      </h3>
                      <div className="p-card-bottom">
                        <div className="book-btn">
                          <a href="https://www.turio-wp.egenslab.com/tour/louvre-museum/">
                            Book Now <i className="bx bxs-right-arrow-alt" />
                          </a>
                        </div>
                        <div className="p-card-info">
                          <span>Starting From</span>
                          <h6>$83 </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="package-card-alpha">
                    <div className="package-thumb">
                      <a href="https://www.turio-wp.egenslab.com/tour/sri-mahaadeva-temple/">
                        <img
                          width={856}
                          height={578}
                          src="https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-04.png"
                          className="attachment-package-card size-package-card wp-post-image"
                          alt=""
                          decoding="async"
                          loading="lazy"
                          srcSet="https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-04.png 856w, https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-04-300x203.png 300w, https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-04-768x519.png 768w"
                          sizes="(max-width: 856px) 100vw, 856px"
                        />{" "}
                      </a>
                      <p className="card-lavel">
                        <IoMdTime style={{marginRight:'5px'}}/>
                        <span>3 Days 4 Nights</span>
                      </p>
                    </div>
                    <div className="package-card-body">
                      <h3 className="p-card-title">
                        <a href="https://www.turio-wp.egenslab.com/tour/sri-mahaadeva-temple/">
                          Sri Mahaadeva Temple{" "}
                        </a>
                      </h3>
                      <div className="p-card-bottom">
                        <div className="book-btn">
                          <a href="https://www.turio-wp.egenslab.com/tour/sri-mahaadeva-temple/">
                            Book Now <i className="bx bxs-right-arrow-alt" />
                          </a>
                        </div>
                        <div className="p-card-info">
                          <span>Starting From</span>
                          <h6>
                            $58 <del>$76</del>{" "}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="package-card-alpha">
                    <div className="package-thumb">
                      <a href="https://www.turio-wp.egenslab.com/tour/grand-place/">
                        <img
                          width={856}
                          height={578}
                          src="https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-03.png"
                          className="attachment-package-card size-package-card wp-post-image"
                          alt=""
                          decoding="async"
                          loading="lazy"
                          srcSet="https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-03.png 856w, https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-03-300x203.png 300w, https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/Destination-Image-03-768x519.png 768w"
                          sizes="(max-width: 856px) 100vw, 856px"
                        />{" "}
                      </a>
                      <p className="card-lavel">
                      <IoMdTime style={{marginRight:'5px'}}/>
                        <span>3 Days 4 Nights</span>
                      </p>
                    </div>
                    <div className="package-card-body">
                      <h3 className="p-card-title">
                        <a href="https://www.turio-wp.egenslab.com/tour/grand-place/">
                          Grand Place{" "}
                        </a>
                      </h3>
                      <div className="p-card-bottom">
                        <div className="book-btn">
                          <a href="https://www.turio-wp.egenslab.com/tour/grand-place/">
                            Book Now <i className="bx bxs-right-arrow-alt" />
                          </a>
                        </div>
                        <div className="p-card-info">
                          <span>Starting From</span>
                          <h6>
                            $49 <del>$66</del>{" "}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="package-card-alpha">
                    <div className="package-thumb">
                      <a >
                        <img
                          width={856}
                          height={578}
                          src="https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/zena-al-yousef-FGMhOB3phgY-unsplash-1-1.png"
                          className="attachment-package-card size-package-card wp-post-image"
                          alt=""
                          decoding="async"
                          loading="lazy"
                          srcSet="https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/zena-al-yousef-FGMhOB3phgY-unsplash-1-1.png 856w, https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/zena-al-yousef-FGMhOB3phgY-unsplash-1-1-300x203.png 300w, https://turio-wp.b-cdn.net/wp-content/uploads/2022/07/zena-al-yousef-FGMhOB3phgY-unsplash-1-1-768x519.png 768w"
                          sizes="(max-width: 856px) 100vw, 856px"
                        />{" "}
                      </a>
                      <p className="card-lavel">
                      <IoMdTime style={{marginRight:'5px'}}/>
                        <span>3 Days 4 Nights</span>
                      </p>
                    </div>
                    <div className="package-card-body">
                      <h3 className="p-card-title">
                        <a>
                          The Charms of Belgium{" "}
                        </a>
                      </h3>
                      <div className="p-card-bottom">
                        <div className="book-btn">
                          <a href="https://www.turio-wp.egenslab.com/tour/the-charms-of-belgium/">
                            Book Now <i className="bx bxs-right-arrow-alt" />
                          </a>
                        </div>
                        <div className="p-card-info">
                          <span>Starting From</span>
                          <h6>
                            $55 <del>$65</del>{" "}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                      <nav aria-label="Page navigation"></nav>{" "}
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="newBottomStrip">
          <div className="stick_filter" id="bknowstick">
            <div className="divpayt mflex">
              <div className="fare">
                <p className="tlprice" id="showprde">
                  <span className="ng-binding">
                    ₹ {data.packagedetail.offer_price}
                  </span>
                </p>
                <p className="pptxt">per person on twin sharing</p>
              </div>
              <div className="btnsec">
                <div
                  className="ng-scope"
                >
                  <a id="myBtt" href="#enquirenew">Enquire Now</a>
                </div>
              </div>
            </div>
          </div>

        </div>
        </>
  );
};

export default FullDetail;
