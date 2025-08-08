import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HotelFinalBooking.css";
import { useNavigate } from "react-router-dom";
import { BsInfoCircleFill } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { Container, Row, Col } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import HotelPromoCodes from "./HotelPromoCodes";
import { FaArrowLeft } from "react-icons/fa";
import FlightListSkeleton from "../../Flight/FlightList/FlightListSkeleton";
import HotelTechnicalError from "../HotelNotFound/HotelTechnicalError";
import HotelNotFound from "../HotelNotFound/HotelNotFound";
import HotelReviewPage from "./HotelReviewPage";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import HotelReviewPageMobile from "./HotelReviewPageMobile";

const HotelFinalBooking = () => {
  const [hotelPreBookData, setPreBookData] = useState(null);
  const [hotelBookData, setHotelBookData] = useState(null);
  const [roomsConfig, setRoomsConfig] = useState([]);
  const [showGSTFields, setShowGSTFields] = useState(false);
  const [guestInfo, setGuestInfo] = useState([]);
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gstCompanyName, setGstCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewModalMobile, setShowReviewModalMobile] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [errors, setErrors] = useState({});
  // Main traveller
  const [mainGuest, setMainGuest] = useState({
    title: "",
    firstName: "",
    lastName: "",
  });
  const [mobile, setMobile] = useState("");

  const location = useLocation();

  useEffect(() => {
    const storedConfig = localStorage.getItem("hotelRoomsConfig");
    if (storedConfig) {
      const parsed = JSON.parse(storedConfig);
      setRoomsConfig(parsed);

      const newGuestInfo = parsed.map((room) => {
        const passengers = [];
        for (let i = 0; i < (room.adults || 0); i++) {
          passengers.push({
            Title: "",
            FirstName: "",
            LastName: "",
            PaxType: 1,
            PAN: "",
            PassportNo: "",
            CompanyName: "",
            CorporateID: "",
            Errors: { FirstName: "", LastName: "", Title: "" },
          });
        }
        for (let i = 0; i < (room.children || 0); i++) {
          passengers.push({
            Title: "",
            FirstName: "",
            LastName: "",
            PaxType: 2,
            Errors: { FirstName: "", LastName: "", Title: "" },
          });
        }
        return { HotelPassenger: passengers };
      });

      setGuestInfo(newGuestInfo);
    }
  }, [location]);

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const checkInDate = localStorage.getItem("hotelCin");
    const checkOutDate = localStorage.getItem("hotelCout");

    console.log("Check-in:", checkInDate);
    console.log("Check-out:", checkOutDate);

    setCheckIn(checkInDate);
    setCheckOut(checkOutDate);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("hotelId");
    const storeBookingCode = localStorage.getItem("bookingCode");
    const storeBatchKey = localStorage.getItem("batchKey");
    const storedRoom = JSON.parse(localStorage.getItem("rooms"));

    const preBookRequestData = {
      hid: storedData,
      BookingCode: storeBookingCode,
      BatchKey: storeBatchKey,
      Rooms: storedRoom,
    };

    const fetchHotelPreBook = async () => {
      try {
        const response = await axios.post(
          "https://admin.tripgoonline.com/api/Hotel/PreBook",
          preBookRequestData
        );

        console.log("Hotel PreBook:", response.data);

        if (response.data?.success === false) {
          // Check if message says "No Available rooms..."
          if (response.data?.message?.includes("No Available rooms")) {
            setNotFound(true);
          } else {
            setError(true);
          }
        } else {
          setPreBookData(response.data);
        }
      } catch (err) {
        console.error("API failed:", err);
        setError(true);
      }
    };

    fetchHotelPreBook();
  }, []);

  const handleGuestInputChange = (roomIndex, passengerIndex, field, value) => {
    setGuestInfo((prev) => {
      const updated = [...prev];
      const passenger = updated[roomIndex].HotelPassenger[passengerIndex];

      passenger[field] = value;

      // Inline validation
      if (field === "FirstName") {
        passenger.Errors.FirstName = value.trim()
          ? ""
          : "First Name is required";
      }
      if (field === "LastName") {
        passenger.Errors.LastName = value.trim() ? "" : "Last Name is required";
      }
      if (field === "Title") {
        passenger.Errors.Title = value.trim() ? "" : "Title is required";
      }

      return updated;
    });
  };

  const handleGSTCheckboxChange = () => {
    setShowGSTFields(!showGSTFields);
  };

  const navigate = useNavigate();

  const validateTravellerForm = () => {
    const newErrors = {};

    if (!mainGuest.firstName?.trim()) {
      newErrors.firstName = "First Name is required";
    }

    if (!mainGuest.lastName?.trim()) {
      newErrors.lastName = "Last Name is required";
    }

    if (!mainGuest.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(mainGuest.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!mainGuest.mobile?.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mainGuest.mobile)) {
      newErrors.mobile = "Mobile number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleHotelBookNow = async (bookingId) => {
    if (!validateTravellerForm()) {
      return; // Stops if validation fails
    }

    localStorage.setItem("bookingId", bookingId);

    setLoading(true);

    let hasError = false;

    // Validate all guest inputs
    const updatedGuestInfo = [...guestInfo].map((room) => {
      const updatedPassengers = room.HotelPassenger.map((passenger) => {
        const updatedPassenger = { ...passenger };

        if (!passenger.Title?.trim()) {
          updatedPassenger.Errors.Title = "Title is required";
          hasError = true;
        } else {
          updatedPassenger.Errors.Title = "";
        }

        if (!passenger.FirstName?.trim()) {
          updatedPassenger.Errors.FirstName = "First Name is required";
          hasError = true;
        } else {
          updatedPassenger.Errors.FirstName = "";
        }

        if (!passenger.LastName?.trim()) {
          updatedPassenger.Errors.LastName = "Last Name is required";
          hasError = true;
        } else {
          updatedPassenger.Errors.LastName = "";
        }

        return updatedPassenger;
      });

      return { HotelPassenger: updatedPassengers };
    });

    setGuestInfo(updatedGuestInfo);

    if (!contactNumber.trim()) {
      alert("Contact number is required");
      hasError = true;
    }
    if (!email.trim()) {
      alert("Email is required");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    const hotelCode = localStorage.getItem("hotelId");
    const bookingCode = localStorage.getItem("bookingCode");
    const batchKey = localStorage.getItem("batchKey");
    const netAmount =
      hotelPreBookData?.data?.HotelResult[0].Rooms[0]?.TotalFare || 0;
    const cityCode = hotelPreBookData?.data?.HotelDetail?.city_code || "";

    const hotelRoomsDetails = updatedGuestInfo.map((room) => {
      let foundLead = false;

      const HotelPassenger = room.HotelPassenger.map((passenger) => {
        const isAdult = passenger.PaxType === 1;
        const isLead = !foundLead && isAdult;
        if (isLead) foundLead = true;

        return {
          Title: passenger.Title,
          FirstName: passenger.FirstName,
          LastName: passenger.LastName,
          PaxType: passenger.PaxType,
          LeadPassenger: isLead,
          Age: passenger.PaxType === 2 ? passenger.Age || 0 : 0,
          Email: null,
          MiddleName: "",
          PassportNo: null,
          PassportIssueDate: null,
          PassportExpDate: null,
          Phoneno: null,
          PaxId: 0,
          GSTCompanyAddress: null,
          GSTCompanyContactNumber: null,
          GSTCompanyName: null,
          GSTNumber: null,
          GSTCompanyEmail: null,
          PAN: "",
        };
      });

      return { HotelPassenger };
    });

    const requestData = {
      UserEmail: email,
      UserPhone: contactNumber,
      Type: "web",
      CheckIn: checkIn,
      CheckOut: checkOut,
      BookingCode: bookingCode,
      CityCode: cityCode,
      NetAmount: Math.round(netAmount),
      HotelCode: hotelCode,
      BatchKey: batchKey,
      HotelRoomsDetails: hotelRoomsDetails,
    };

    console.log(
      "City Code from HotelDetail:",
      hotelPreBookData?.data?.HotelDetail?.city_code
    );

    try {
      const response = await axios.post(
        "https://admin.tripgoonline.com/api/Hotel/Book",
        requestData
      );
      setHotelBookData(response.data);
      localStorage.setItem(
        "BookingID",
        response.data.data.BookResult.BookingId
      );
      console.log("Hotel Booked:", response.data);
      if (response.data && response.data.success === false) {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Hotel Booking Failed:", err);
    } finally {
      setLoading(false);
      navigate("/hotelvoucher");
    }
  };
  const ValidationInfo = hotelPreBookData?.data?.ValidationInfo || {};

  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [savedGuests, setSavedGuests] = useState([]);

  const [guestForm, setGuestForm] = useState({
    title: "Mr",
    firstName: "",
    lastName: "",
    isChild: false,
  });

  const handleInputChange = (field, value) => {
    setGuestForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveGuest = () => {
    if (editingIndex !== null) {
      // If editing, update
      const updatedGuests = [...savedGuests];
      updatedGuests[editingIndex] = guestForm;
      setSavedGuests(updatedGuests);
      setEditingIndex(null);
    } else {
      // If adding new
      setSavedGuests([...savedGuests, guestForm]);
    }
    // Reset
    setGuestForm({ title: "Mr", firstName: "", lastName: "", isChild: false });
    setShowAddGuest(false);
  };

  const handleEditGuest = (index) => {
    setGuestForm(savedGuests[index]);
    setEditingIndex(index);
    setShowAddGuest(true);
  };

  const handleDeleteGuest = (index) => {
    const updatedGuests = savedGuests.filter((_, i) => i !== index);
    setSavedGuests(updatedGuests);
  };

  const handleAddGuestClick = () => {
    setGuestForm({
      title: "",
      firstName: "",
      lastName: "",
      isChild: false,
    });
    setMobile("");
    setEmail("");
    setErrors({});
    setShowAddGuest(true);
  };

  return (
    <div>
      {error ? (
        <HotelTechnicalError />
      ) : notFound ? (
        <HotelNotFound />
      ) : hotelPreBookData ? (
        <>
          <div className="hotelPreBook" style={{ position: "relative" }}>
            <div
              className="hotelFinalBooking_MainBg"
              style={{ height: "150px" }}
            ></div>
            <div className="hotelFinalBooking_Main">
              <div className="hotelFinalBooking_Containers">
                <Container>
                  <Row>
                    <Col md={9}>
                      <div className="hotelFinalBooking_ReviewBooking">
                        <div className="hotelFinalBooking_reviewBook">
                          <Link to="/hoteldetailsmain">
                            <span style={{ color: "white" }}>
                              <FaChevronLeft />
                            </span>
                          </Link>
                          <h3>Review Your Booking</h3>
                        </div>
                        <div className="hotelFinalBooking_reviewBook">
                          <span>
                            <BsInfoCircleFill />
                          </span>
                          <h4>Fare Rules</h4>
                        </div>
                      </div>

                      <div className="hotelFinalBooking_hotelDetails">
                        <div className="hotelFinalBooking_hotelNameAdd">
                          <div className="hotelListingstyling-name hotelFinalBooking-name">
                            {hotelPreBookData?.data?.HotelDetail?.name}
                            <div
                              className="rating-score"
                              style={{ textAlign: "center", fontSize: "18px" }}
                            >
                              {[...Array(5)].map((_, index) => (
                                <span
                                  key={index}
                                  style={{
                                    color:
                                      index <
                                      Number(
                                        hotelPreBookData?.data?.HotelDetail
                                          ?.star_rating
                                      )
                                        ? "#FFD700"
                                        : "#ccc",
                                  }}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="hotel-Address">
                            <CiLocationOn />{" "}
                            <span>
                              {hotelPreBookData?.data?.HotelDetail?.address}
                            </span>
                          </div>
                        </div>

                        <Row className="hotelFinalBooking_rowCols">
                          <Col md={4} className="hotelFinalBooking_Col1">
                            <img src="/Images/Images/hotelroom.jpg" alt="" />
                          </Col>
                          <Col md={8} className="hotelFinalBooking_Col2">
                            <div className="hotelFinalBooking_CheckinDetails">
                              <div className="hotelFinalBooking_checkIn">
                                <h6>CHECK-IN </h6>
                                <h3>
                                  {checkIn
                                    ? new Date(checkIn).toLocaleDateString(
                                        "en-GB",
                                        {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        }
                                      )
                                    : ""}
                                </h3>
                              </div>
                              <div
                                style={{
                                  width: "80px",
                                  height: "2px",
                                  backgroundColor: "black",
                                }}
                              ></div>
                              <div className="hotelFinalBooking_checkOut">
                                <h6>CHECK-OUT</h6>
                                <h3>
                                  {checkOut
                                    ? new Date(checkOut).toLocaleDateString(
                                        "en-GB",
                                        {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        }
                                      )
                                    : ""}
                                </h3>
                              </div>

                              <Link to="/hoteldetailsmain">
                                <div className="hotelFinalBooking_changeRoom">
                                  CHANGE ROOM
                                </div>
                              </Link>
                            </div>

                            <div className="hotelFinalBooking_roomsGuests">
                              <h6>ROOMS & GUESTS</h6>
                              <h6>
                                <span style={{ fontWeight: "bold" }}>
                                  {roomsConfig.length}
                                </span>{" "}
                                <span className="hotelFinalBooking_roomsGuests_Span">
                                  Rooms
                                </span>{" "}
                                <span style={{ fontWeight: "bold" }}>
                                  {roomsConfig.reduce(
                                    (acc, r) =>
                                      acc + (r.adults || 0) + (r.children || 0),
                                    0
                                  )}
                                </span>{" "}
                                <span className="hotelFinalBooking_roomsGuests_Span">
                                  Guests
                                </span>
                              </h6>
                            </div>
                          </Col>
                        </Row>

                        <div className="hotelFinalBooking_roomType">
                          <h6>{hotelPreBookData?.data?.rooms[0]?.Name}</h6>
                          <div>
                            {/* <span style={{ fontWeight: "bold" }}>1</span> Room */}
                            <span style={{ fontWeight: "bold" }}>
                              {roomsConfig.length}
                            </span>{" "}
                            <span className="hotelFinalBooking_roomsGuests_Span">
                              Rooms
                            </span>{" "}
                          </div>

                          <div className="hotelFinalBooking_inclusion">
                            Inclusions
                          </div>
                        </div>
                      </div>

                      <div className="traveller_info hotelFinalBooking_guestInfo">
                        <h4>Guest Information</h4>

                        {roomsConfig.map((room, roomIndex) => (
                          <React.Fragment key={roomIndex}>
                            <Row>
                              <Col
                                sm={2}
                                className="hotelFinalBooking_guestRoomsCol"
                              >
                                <label className="hotelFinalBooking_guestLabel hotelFinalBooking_guestRooms">
                                  Room {roomIndex + 1}
                                </label>
                              </Col>
                            </Row>

                            {[...Array(room.adults || 0)].map(
                              (_, adultIndex) => (
                                <Row
                                  className="hotelFinalBooking_guestRow"
                                  key={`room${roomIndex}-adult${adultIndex}`}
                                >
                                  <Col
                                    sm={2}
                                    className="hotelFinalBooking_guestLabelCol"
                                  >
                                    <label className="hotelFinalBooking_guestLabel">
                                      Adult {adultIndex + 1}
                                    </label>
                                  </Col>
                                  <Col
                                    sm={10}
                                    className="hotelFinalBooking_guestInputsCol"
                                  >
                                    <Row className="hotelFinalBooking_inputRow">
                                      <Col
                                        sm={2}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <div className="hotelFinalBooking_SelectWrapper">
                                          <select
                                            className={`form-control hotelFinalBooking_input ${
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.Title
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                            value={
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Title
                                            }
                                            onChange={(e) =>
                                              handleGuestInputChange(
                                                roomIndex,
                                                adultIndex,
                                                "Title",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">Title</option>
                                            <option value="Mr">Mr.</option>
                                            <option value="Ms">Ms.</option>
                                            <option value="Mrs">Mrs.</option>
                                          </select>
                                          {guestInfo[roomIndex].HotelPassenger[
                                            adultIndex
                                          ].Errors.Title && (
                                            <div className="invalid-feedback">
                                              {
                                                guestInfo[roomIndex]
                                                  .HotelPassenger[adultIndex]
                                                  .Errors.Title
                                              }
                                            </div>
                                          )}
                                        </div>
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="First Name"
                                          className={`form-control hotelFinalBooking_input ${
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].Errors.FirstName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].FirstName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              adultIndex,
                                              "FirstName",
                                              e.target.value
                                            )
                                          }
                                        />
                                        {guestInfo[roomIndex].HotelPassenger[
                                          adultIndex
                                        ].Errors.FirstName && (
                                          <div className="invalid-feedback">
                                            {
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.FirstName
                                            }
                                          </div>
                                        )}
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Last Name"
                                          className={`form-control hotelFinalBooking_input ${
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].Errors.LastName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].LastName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              adultIndex,
                                              "LastName",
                                              e.target.value
                                            )
                                          }
                                        />
                                        {guestInfo[roomIndex].HotelPassenger[
                                          adultIndex
                                        ].Errors.LastName && (
                                          <div className="invalid-feedback">
                                            {
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.LastName
                                            }
                                          </div>
                                        )}
                                      </Col>

                                      {ValidationInfo?.PanMandatory && (
                                        <Col
                                          sm={6}
                                          className="hotelFinalBooking_inputRowCol"
                                        >
                                          <input
                                            type="text"
                                            placeholder="PAN Number"
                                            className="form-control hotelFinalBooking_input"
                                            autoComplete="off"
                                          />
                                        </Col>
                                      )}

                                      {ValidationInfo?.PassportMandatory && (
                                        <Col
                                          sm={6}
                                          className="hotelFinalBooking_inputRowCol"
                                        >
                                          <input
                                            type="text"
                                            placeholder="Passport Number"
                                            className="form-control hotelFinalBooking_input"
                                            autoComplete="off"
                                          />
                                        </Col>
                                      )}

                                      {/* {ValidationInfo?.CorporateBookingAllowed && (
              <>
                <Col sm={6} className="hotelFinalBooking_inputRowCol">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="form-control hotelFinalBooking_input"
                    autoComplete="off"
                  />
                </Col>
                <Col sm={6} className="hotelFinalBooking_inputRowCol">
                  <input
                    type="text"
                    placeholder="Corporate ID"
                    className="form-control hotelFinalBooking_input"
                    autoComplete="off"
                  />
                </Col>
              </>
            )} */}
                                    </Row>
                                  </Col>
                                </Row>
                              )
                            )}

                            {[...Array(room.children || 0)].map(
                              (_, childIndex) => (
                                <Row
                                  className="hotelFinalBooking_guestRow"
                                  key={`room${roomIndex}-child${childIndex}`}
                                >
                                  <Col
                                    sm={2}
                                    className="hotelFinalBooking_guestLabelCol"
                                  >
                                    <label className="hotelFinalBooking_guestLabel">
                                      Child {childIndex + 1}
                                    </label>
                                  </Col>
                                  <Col
                                    sm={10}
                                    className="hotelFinalBooking_guestInputsCol"
                                  >
                                    <Row className="hotelFinalBooking_inputRow">
                                      <Col
                                        sm={2}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <div className="hotelFinalBooking_SelectWrapper">
                                          <select
                                            className="form-control hotelFinalBooking_input"
                                            value={
                                              guestInfo[roomIndex]
                                                .HotelPassenger[
                                                (room.adults || 0) + childIndex
                                              ].Title
                                            }
                                            onChange={(e) =>
                                              handleGuestInputChange(
                                                roomIndex,
                                                (room.adults || 0) + childIndex,
                                                "Title",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">Title</option>
                                            <option value="Master">
                                              Master
                                            </option>
                                            <option value="Miss">Miss</option>
                                          </select>
                                        </div>
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="First Name"
                                          className="form-control hotelFinalBooking_input"
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              (room.adults || 0) + childIndex
                                            ].FirstName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              (room.adults || 0) + childIndex,
                                              "FirstName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Last Name"
                                          className="form-control hotelFinalBooking_input"
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              (room.adults || 0) + childIndex
                                            ].LastName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              (room.adults || 0) + childIndex,
                                              "LastName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              )
                            )}
                          </React.Fragment>
                        ))}

                        <Row>
                          <Col sm={2}></Col>
                          <Col
                            sm={10}
                            className="hotelFinalBooking_inputRowCol"
                          >
                            <div
                              className="hotelFinalBooking_bookingDetailsForm"
                              id="contactDetails"
                            >
                              <p className="hotelFinalBooking_font14 hotelFinalBooking_bold appendBottom15">
                                Booking details will be sent to
                              </p>
                            </div>

                            <Row className="hotelFinalBooking_adultItemRow">
                              <Col
                                sm={2}
                                xs={4}
                                className="hotelFinalBooking_inputRowCol"
                              >
                                <div className="hotelFinalBooking_adultItem">
                                  <div className="hotelFinalBooking_selectItem">
                                    <select className="form-control hotelFinalBooking_input">
                                      <option>India (+91)</option>
                                      <option>United States (+1)</option>
                                      <option>United Kingdom (+44)</option>
                                    </select>
                                  </div>
                                </div>
                              </Col>

                              <Col
                                sm={5}
                                xs={8}
                                className="hotelFinalBooking_inputRowCol"
                              >
                                <div className="hotelFinalBooking_adultItem">
                                  <input
                                    className="form-control hotelFinalBooking_input"
                                    type="text"
                                    placeholder="Contact No"
                                    value={contactNumber}
                                    onChange={(e) =>
                                      setContactNumber(e.target.value)
                                    }
                                  />
                                </div>
                              </Col>

                              <Col sm={5} xs={12}>
                                <div className="hotelFinalBooking_adultItem">
                                  <input
                                    className="form-control hotelFinalBooking_input"
                                    type="text"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>
                              </Col>
                            </Row>
                            {/* <Col  className="hotelFinalBooking_inputRowCol">
                                    <input type="text" placeholder="PanMandatory" className="form-control hotelFinalBooking_input" autoComplete="off" />
                                  </Col> */}

                            <div className="hotelFinalBooking_gstSection">
                              <label className="hotelFinalBooking_checkboxContainer">
                                <input
                                  type="checkbox"
                                  checked={showGSTFields}
                                  onChange={handleGSTCheckboxChange}
                                />
                                <span className="hotelFinalBooking_checkboxLabel">
                                  <span className="hotelFinalBooking_boldFont">
                                    I have a GST number{" "}
                                    <span style={{ color: "#9b9b9b" }}>
                                      (Optional)
                                    </span>
                                  </span>
                                </span>
                              </label>

                              {showGSTFields && (
                                <div className="hotelFinalBooking_gstFields">
                                  <Row className="hotelFinalBooking_adultItemRow">
                                    <Col sm={6}>
                                      <label className="hotelFinalBooking_label">
                                        Company Name
                                      </label>
                                      <input
                                        className="form-control hotelFinalBooking_input"
                                        type="text"
                                        placeholder="Company Name"
                                      />
                                    </Col>
                                    <Col
                                      sm={6}
                                      className="hotelFinalBooking_inputRowCol"
                                    >
                                      <label className="hotelFinalBooking_label">
                                        GST No
                                      </label>
                                      <input
                                        className="form-control hotelFinalBooking_input"
                                        type="text"
                                        placeholder="GST No"
                                      />
                                    </Col>
                                  </Row>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>

                    <Col md={3}>
                      <div className="hotelFinalBooking_priceSummary">
                        <div className="hotelFinalBooking_fareSummary">
                          <div>Fare Summary</div>
                          <div>1 Guest</div>
                        </div>
                        <div className="hotelFinalBooking_BasefareSummary">
                          <div>Base Fare -</div>
                          <div>
                            ₹{" "}
                            {Math.round(
                              hotelPreBookData?.data?.rooms[0]?.TotalFare
                            )}
                          </div>
                        </div>
                        <div className="hotelFinalBooking_BasefareSummary">
                          <div>Taxes & Surcharges -</div>
                          <div>
                            ₹{" "}
                            {Math.round(
                              hotelPreBookData?.data?.rooms[0]?.TotalTax
                            )}
                          </div>
                        </div>
                        <div className="hotelFinalBooking_BasefareSummary">
                          <div>Discount -</div>
                          <div>₹0</div>
                        </div>
                        <div className="hotelFinalBooking_PayAmt">
                          <div>You Pay: -</div>
                          <div>
                            ₹
                            {Math.round(
                              hotelPreBookData?.data?.HotelResult[0]?.Rooms[0]
                                ?.NetAmount
                            )}
                          </div>
                        </div>
                        {/* <button onClick={handleHotelBookNow} className="hotelFinalBooking_continueBtn">Continue</button> */}
                        <button
                          onClick={() => setShowReviewModal(true)}
                          className="hotelFinalBooking_continueBtn"
                        >
                          Continue
                        </button>
                      </div>
                      <div>
                        <HotelPromoCodes />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>

          <div className="hotelPreBook-Mobile">
            <div className="hotelPreBookMobile-wrapper">
              <div className="hotelPreBookMobile-header">
                <Link to="/hoteldetailmain">
                  <FaArrowLeft className="hotelback-icon" />
                </Link>
                <span className="hotelPreBookMobile-headerText">
                  Hotel Review & Traveller
                </span>
              </div>

              <div className="hotelPreBookMobile-card">
                <div className="hotelPreBookMobile-titleRow">
                  <div className="hotel-DetailMobile-hotelName">
                    <div className="hotelListingstyling-name hotelFinalBooking-name">
                      {hotelPreBookData?.data?.HotelDetail?.name}
                      <div
                        className="rating-score"
                        style={{ textAlign: "center", fontSize: "18px" }}
                      >
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            style={{
                              color:
                                index <
                                Number(
                                  hotelPreBookData?.data?.HotelDetail
                                    ?.star_rating
                                )
                                  ? "#FFD700"
                                  : "#ccc",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <div className="hotel-Address hotel-AddressMobile">
                        <CiLocationOn />{" "}
                        <span>
                          {hotelPreBookData?.data?.HotelDetail?.address}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="hotelPreBookMobile-divider" />

                <div className="hotelPreBookMobile-roomRow">
                  <div className="hotelPreBookMobile-roomInfo">
                    <h4 className="hotelPreBookMobile-roomTitle">
                      {hotelPreBookData?.data?.rooms[0]?.Name}
                    </h4>
                    <ul className="hotelPreBookMobile-roomList">
                      <li>Breakfast not included Welcome Drink</li>
                      <li>
                        10% Discount on Food & Soft Beverages…{" "}
                        <span className="hotelPreBookMobile-viewMore">
                          View more
                        </span>
                      </li>
                    </ul>
                    <div className="hotelPreBookMobile-guestInfo">
                      <span>
                        <span style={{ fontWeight: "bold" }}>
                          {(roomsConfig || []).reduce(
                            (acc, r) =>
                              acc + (r?.adults || 0) + (r?.children || 0),
                            0
                          )}
                        </span>{" "}
                        Guests
                      </span>{" "}
                      |{" "}
                      <span>
                        <span style={{ fontWeight: "bold" }}>
                          {roomsConfig?.length || 0}
                        </span>{" "}
                        Rooms
                      </span>
                    </div>
                  </div>
                  <div className="hotelPreBookMobile-roomImage">
                    <img src="/Images/Images/hotelroom.jpg" alt="Room" />
                  </div>
                </div>

                <div className="hotelPreBookMobile-dashedDivider"></div>

                <h4 className="hotelPreBookMobile-sectionTitle">
                  Travel Dates and Guests
                </h4>

                <div className="hotelPreBookMobile-dateBox">
                  <div className="hotelPreBookMobile-dateItem">
                    <p className="hotelPreBookMobile-dateLabel">Check-In</p>
                    <p className="hotelPreBookMobile-dateDay">
                      {checkIn
                        ? new Date(checkIn).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </p>
                  </div>
                  <div className="hotelPreBookMobile-nightCircle">1N</div>
                  <div className="hotelPreBookMobile-dateItem">
                    <p className="hotelPreBookMobile-dateLabel">Check-Out</p>
                    <p className="hotelPreBookMobile-dateDay">
                      {checkOut
                        ? new Date(checkOut).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : ""}
                    </p>
                    {/* <p className="hotelPreBookMobile-dateTime">12:00 PM</p> */}
                  </div>
                </div>

                <p className="hotelPreBookMobile-inclusionsLink">Inclusions</p>
              </div>
            </div>

            <div className="hotelTravellerMobile-wrapper">
              <div className="hotelPreBookMobile-priceCard">
                <h4 className="hotelPreBookMobile-sectionTitle">
                  Price Breakup
                </h4>
                <p className="hotelPreBookMobile-priceSubtitle">
                  A detailed breakdown of costs associated with hotel
                </p>
                <hr className="hotelPreBookMobile-divider" />

                <div className="hotelPreBookMobile-priceRow">
                  <span>Base Fare -</span>
                  <span>
                    ₹{" "}
                    {Math.round(
                      hotelPreBookData?.data?.rooms?.[0]?.TotalFare || 0
                    )}
                  </span>
                </div>
                <div className="hotelPreBookMobile-priceRow">
                  <span>Taxes & Surcharges -</span>
                  <span>
                    ₹{" "}
                    {Math.round(
                      hotelPreBookData?.data?.rooms?.[0]?.TotalTax || 0
                    )}
                  </span>
                </div>
                <div className="hotelPreBookMobile-priceRow">
                  <span>Discount -</span>
                  <span>₹ 0</span>
                </div>
                <div className="hotelPreBookMobile-grandTotal">
                  <span>You Pay: -</span>
                  <span className="hotelPreBookMobile-grandTotalAmount">
                    ₹{" "}
                    {Math.round(
                      hotelPreBookData?.data?.HotelResult?.[0]?.Rooms?.[0]
                        ?.NetAmount || 0
                    )}
                  </span>
                </div>
              </div>
            </div>



              {roomsConfig.map((room, roomIndex) => (
                          <React.Fragment key={roomIndex}>
                            <Row>
                              <Col
                                sm={2}
                                className="hotelFinalBooking_guestRoomsCol"
                              >
                                <label className="hotelFinalBooking_guestLabel hotelFinalBooking_guestRooms">
                                  Room {roomIndex + 1}
                                </label>
                              </Col>
                            </Row>

                            {[...Array(room.adults || 0)].map(
                              (_, adultIndex) => (
                                <Row
                                  className="hotelFinalBooking_guestRow"
                                  key={`room${roomIndex}-adult${adultIndex}`}
                                >
                                  <Col
                                    sm={2}
                                    className="hotelFinalBooking_guestLabelCol"
                                  >
                                    <label className="hotelFinalBooking_guestLabel">
                                      Adult {adultIndex + 1}
                                    </label>
                                  </Col>
                                  <Col
                                    sm={10}
                                    className="hotelFinalBooking_guestInputsCol"
                                  >
                                    <Row className="hotelFinalBooking_inputRow">
                                      <Col
                                        sm={2}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <div className="hotelFinalBooking_SelectWrapper">
                                          <select
                                            className={`form-control hotelFinalBooking_input ${
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.Title
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                            value={
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Title
                                            }
                                            onChange={(e) =>
                                              handleGuestInputChange(
                                                roomIndex,
                                                adultIndex,
                                                "Title",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">Title</option>
                                            <option value="Mr">Mr.</option>
                                            <option value="Ms">Ms.</option>
                                            <option value="Mrs">Mrs.</option>
                                          </select>
                                          {guestInfo[roomIndex].HotelPassenger[
                                            adultIndex
                                          ].Errors.Title && (
                                            <div className="invalid-feedback">
                                              {
                                                guestInfo[roomIndex]
                                                  .HotelPassenger[adultIndex]
                                                  .Errors.Title
                                              }
                                            </div>
                                          )}
                                        </div>
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="First Name"
                                          className={`form-control hotelFinalBooking_input ${
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].Errors.FirstName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].FirstName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              adultIndex,
                                              "FirstName",
                                              e.target.value
                                            )
                                          }
                                        />
                                        {guestInfo[roomIndex].HotelPassenger[
                                          adultIndex
                                        ].Errors.FirstName && (
                                          <div className="invalid-feedback">
                                            {
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.FirstName
                                            }
                                          </div>
                                        )}
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Last Name"
                                          className={`form-control hotelFinalBooking_input ${
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].Errors.LastName
                                              ? "is-invalid"
                                              : ""
                                          }`}
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              adultIndex
                                            ].LastName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              adultIndex,
                                              "LastName",
                                              e.target.value
                                            )
                                          }
                                        />
                                        {guestInfo[roomIndex].HotelPassenger[
                                          adultIndex
                                        ].Errors.LastName && (
                                          <div className="invalid-feedback">
                                            {
                                              guestInfo[roomIndex]
                                                .HotelPassenger[adultIndex]
                                                .Errors.LastName
                                            }
                                          </div>
                                        )}
                                      </Col>

                                      {ValidationInfo?.PanMandatory && (
                                        <Col
                                          sm={6}
                                          className="hotelFinalBooking_inputRowCol"
                                        >
                                          <input
                                            type="text"
                                            placeholder="PAN Number"
                                            className="form-control hotelFinalBooking_input"
                                            autoComplete="off"
                                          />
                                        </Col>
                                      )}

                                      {ValidationInfo?.PassportMandatory && (
                                        <Col
                                          sm={6}
                                          className="hotelFinalBooking_inputRowCol"
                                        >
                                          <input
                                            type="text"
                                            placeholder="Passport Number"
                                            className="form-control hotelFinalBooking_input"
                                            autoComplete="off"
                                          />
                                        </Col>
                                      )}

                                      {/* {ValidationInfo?.CorporateBookingAllowed && (
              <>
                <Col sm={6} className="hotelFinalBooking_inputRowCol">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="form-control hotelFinalBooking_input"
                    autoComplete="off"
                  />
                </Col>
                <Col sm={6} className="hotelFinalBooking_inputRowCol">
                  <input
                    type="text"
                    placeholder="Corporate ID"
                    className="form-control hotelFinalBooking_input"
                    autoComplete="off"
                  />
                </Col>
              </>
            )} */}
                                    </Row>
                                  </Col>
                                </Row>
                              )
                            )}

                            {[...Array(room.children || 0)].map(
                              (_, childIndex) => (
                                <Row
                                  className="hotelFinalBooking_guestRow"
                                  key={`room${roomIndex}-child${childIndex}`}
                                >
                                  <Col
                                    sm={2}
                                    className="hotelFinalBooking_guestLabelCol"
                                  >
                                    <label className="hotelFinalBooking_guestLabel">
                                      Child {childIndex + 1}
                                    </label>
                                  </Col>
                                  <Col
                                    sm={10}
                                    className="hotelFinalBooking_guestInputsCol"
                                  >
                                    <Row className="hotelFinalBooking_inputRow">
                                      <Col
                                        sm={2}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <div className="hotelFinalBooking_SelectWrapper">
                                          <select
                                            className="form-control hotelFinalBooking_input"
                                            value={
                                              guestInfo[roomIndex]
                                                .HotelPassenger[
                                                (room.adults || 0) + childIndex
                                              ].Title
                                            }
                                            onChange={(e) =>
                                              handleGuestInputChange(
                                                roomIndex,
                                                (room.adults || 0) + childIndex,
                                                "Title",
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">Title</option>
                                            <option value="Master">
                                              Master
                                            </option>
                                            <option value="Miss">Miss</option>
                                          </select>
                                        </div>
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="First Name"
                                          className="form-control hotelFinalBooking_input"
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              (room.adults || 0) + childIndex
                                            ].FirstName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              (room.adults || 0) + childIndex,
                                              "FirstName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Col>
                                      <Col
                                        sm={5}
                                        className="hotelFinalBooking_inputRowCol"
                                      >
                                        <input
                                          type="text"
                                          placeholder="Last Name"
                                          className="form-control hotelFinalBooking_input"
                                          value={
                                            guestInfo[roomIndex].HotelPassenger[
                                              (room.adults || 0) + childIndex
                                            ].LastName
                                          }
                                          onChange={(e) =>
                                            handleGuestInputChange(
                                              roomIndex,
                                              (room.adults || 0) + childIndex,
                                              "LastName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              )
                            )}
                          </React.Fragment>
                        ))}

            <div className="hotelTravellerMobile-wrapper">
              <div className="hotelTravellerMobile-card">
                <h4 className="hotelTravellerMobile-title">
                  Traveller Details
                </h4>
                <p className="hotelTravellerMobile-subtitle">
                  Enter your details as per your Aadhar Card
                </p>

                <div className="hotelTravellerMobile-row">
                  <div className="hotelTravellerMobile-inputGroup">
                    <label>Title</label>
                    <select>
                      <option>Mr</option>
                      <option>Mrs</option>
                      <option>Ms</option>
                    </select>
                  </div>
                  <div className="hotelTravellerMobile-inputGroup">
                    <label>First (& Middle Name if any)</label>
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      value={mainGuest.firstName}
                      onChange={(e) =>
                        setMainGuest({
                          ...mainGuest,
                          firstName: e.target.value,
                        })
                      }
                    />
                    {errors.firstName && (
                      <p className="hotelTravellerMobileerror">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="hotelTravellerMobile-inputGroup">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    value={mainGuest.lastName}
                    onChange={(e) =>
                      setMainGuest({ ...mainGuest, lastName: e.target.value })
                    }
                  />
                  {errors.lastName && (
                    <p className="hotelTravellerMobileerror">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <p
                  className="hotelTravellerMobile-addMore"
                  onClick={handleAddGuestClick}
                >
                  + Add More Guest
                </p>

                {savedGuests.length > 0 && (
                  <div className="hotelTravellerMobile-savedGuests">
                    <h4>Saved Guests</h4>
                    {savedGuests.map((guest, index) => (
                      <div
                        key={index}
                        className="hotelTravellerMobile-savedGuestItem"
                      >
                        <input type="checkbox" />
                        {guest.title} {guest.firstName} {guest.lastName} {}
                        <span
                          className="hotelTravellerMobile-editIcon"
                          onClick={() => handleEditGuest(index)}
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                        >
                          <MdEdit />
                        </span>
                        <span
                          className="hotelTravellerMobile-deleteIcon"
                          onClick={() => handleDeleteGuest(index)}
                          style={{ marginLeft: "10px", cursor: "pointer" }}
                        >
                          <MdOutlineDeleteOutline />
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {showAddGuest && (
                  <div className="hotelTravellerMobile-addGuest">
                    <h4>Add Guests</h4>
                    <p className="hotelTravellerMobile-warning">
                      Name should be same as in Government Id proof
                    </p>

                    <div className="hotelTravellerMobile-row">
                      <div className="hotelTravellerMobile-inputGroup">
                        <label>Title</label>
                        <select
                          value={guestForm.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                        >
                          <option>Mr</option>
                          <option>Mrs</option>
                          <option>Ms</option>
                        </select>
                      </div>
                      <div className="hotelTravellerMobile-inputGroup">
                        <label>First Name</label>
                        <input
                          type="text"
                          placeholder="Enter First Name"
                          value={guestForm.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="hotelTravellerMobile-inputGroup">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Enter Last Name"
                        value={guestForm.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                      />
                    </div>

                    <div className="hotelTravellerMobile-inputGroup">
                      <label>
                        <input
                          type="checkbox"
                          checked={guestForm.isChild}
                          onChange={(e) =>
                            handleInputChange("isChild", e.target.checked)
                          }
                        />
                        Child Below 12 Years old
                      </label>
                    </div>

                    <button
                      onClick={handleSaveGuest}
                      className="hotelTravellerMobile-saveBtn"
                    >
                      Save Guest
                    </button>

                    <div className="hotelTravellerMobile-footer">
                      <button
                        className="hotelTravellerMobile-doneBtn"
                        onClick={() => setShowAddGuest(false)}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <h4 className="hotelTravellerMobile-subsection">
                Contact Information
              </h4>

              <div className="hotelTravellerMobile-inputGroup">
                <label>Email Id</label>
                <input
                  type="email"
                  placeholder="Please Enter Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="hotelTravellerMobile-row">
                <div className="hotelTravellerMobile-inputGroup">
                  <label>Mobile No</label>
                  <div className="hotelTravellerMobile-mobileRow">
                    <select>
                      <option>+91</option>
                      <option>+1</option>
                      <option>+44</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Please Enter Mobile No"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="hotelTravellerMobile-priceBar">
                <div>
                  <div className="hotelPreBookMobile-guestInfo">
                    <span>
                      <span style={{ fontWeight: "bold" }}>
                        {(roomsConfig || []).reduce(
                          (acc, r) =>
                            acc + (r?.adults || 0) + (r?.children || 0),
                          0
                        )}
                      </span>{" "}
                      Guests
                    </span>{" "}
                    |{" "}
                    <span>
                      <span style={{ fontWeight: "bold" }}>
                        {roomsConfig?.length || 0}
                      </span>{" "}
                      Rooms
                    </span>
                  </div>
                  <strong style={{ color: "#878787" }}>
                    ₹{" "}
                    {Math.round(
                      hotelPreBookData?.data?.HotelResult[0]?.Rooms[0]
                        ?.NetAmount
                    )}
                  </strong>
                </div>
                {/* <button onClick={handleHotelBookNow}>Continue</button> */}
                <button
                  onClick={() => setShowReviewModalMobile(true)}
                  className="hotelFinalBooking_continueBtn"
                >
                  Continue
                </button>
              </div>
            </div>

            <HotelPromoCodes />
          </div>

          {showReviewModalMobile && (
            <HotelReviewPageMobile
              setReviewModal={setShowReviewModalMobile}
              handleConfirmClick={() => {
                setShowReviewModalMobile(false);
                handleHotelBookNow();
              }}
              formData={guestInfo.flatMap((r) =>
                r.HotelPassenger.filter((p) => p.PaxType === 1)
              )}
              childData={guestInfo.flatMap((r) =>
                r.HotelPassenger.filter((p) => p.PaxType === 2)
              )}
            />
          )}

          {showReviewModal && (
            <HotelReviewPage
              setReviewModal={setShowReviewModal}
              handleConfirmClick={() => {
                setShowReviewModal(false);
                handleHotelBookNow();
              }}
              formData={guestInfo.flatMap((r) =>
                r.HotelPassenger.filter((p) => p.PaxType === 1)
              )}
              childData={guestInfo.flatMap((r) =>
                r.HotelPassenger.filter((p) => p.PaxType === 2)
              )}
            />
          )}
        </>
      ) : (
        <FlightListSkeleton />
      )}
    </div>
  );
};

export default HotelFinalBooking;
