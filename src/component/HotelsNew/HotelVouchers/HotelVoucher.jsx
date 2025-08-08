import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdCheckboxOutline } from "react-icons/io";
import { LuBaggageClaim } from "react-icons/lu";
import "./HotelVoucher.css";
import { CiLocationOn } from "react-icons/ci";
import { Row, Col } from "react-bootstrap";

const HotelVoucher = () => {
  const [roomsConfig, setRoomsConfig] = useState([]);
  const [bookingDetail, setBookingDetail] = useState(null);

  // const [bookingVariable, setBookingVariable] = useState(null);

  // useEffect(() => {
  //   const bookingData = {
  //     success: true,
  //     message: "GetBookingDetail successfully.",
  //     data: {
  //       GetBookingDetailResult: {
  //         VoucherStatus: true,
  //         ResponseStatus: 1,
  //         Error: { ErrorCode: 0, ErrorMessage: "" },
  //         AddressLine1: "Hanuman Road, Connaught Place New Delhi 110001",
  //         AddressLine2: "",
  //         AgentRemarks: "",
  //         BookingAllowedForRoamer: true,
  //         BookingDate: "2025-07-10T05:29:48",
  //         BookingId: 1998966,
  //         BookingSource: "TBOHApi3",
  //         CheckInDate: "2025-07-11T00:00:00",
  //         CheckOutDate: "2025-07-18T00:00:00",
  //         City: "New Delhi",
  //         CountryCode: "IN",
  //         ConfirmationNo: "RRNOAC",
  //         HotelBookingStatus: "Confirmed",
  //         HotelCode: "1011663",
  //         HotelId: 152646,
  //         HotelName: "Exotic Villa",
  //         HotelPolicyDetail:
  //           "Early check out will attract full cancellation charge unless otherwise specified...",
  //         HotelRoomsDetails: [
  //           {
  //             AdultCount: 1,
  //             AvailabilityType: "NotAvailable",
  //             ChildCount: 0,
  //             Amenity: ["Free breakfast, Free self parking"],
  //             HotelPassenger: [
  //               {
  //                 FirstName: "Kajal",
  //                 LastName: "K",
  //                 Phoneno: "01244998999",
  //                 Title: "Mrs",
  //                 PAN: "NNAPS6341Q",
  //               },
  //             ],
  //             CancellationPolicies: [
  //               {
  //                 Charge: 100,
  //                 ChargeType: 2,
  //                 Currency: "INR",
  //                 FromDate: "2025-07-09T00:00:00",
  //               },
  //             ],
  //             Price: {
  //               CurrencyCode: "INR",
  //               RoomPrice: 33350.13,
  //               Tax: 4358.93,
  //               ExtraGuestCharge: 0,
  //               ChildCharge: 0,
  //               OtherCharges: 0,
  //               Discount: 0,
  //               PublishedPrice: 0,
  //               PublishedPriceRoundedOff: 0,
  //               OfferedPrice: 0,
  //               OfferedPriceRoundedOff: 0,
  //               AgentCommission: 0,
  //               AgentMarkUp: 0,
  //               ServiceTax: 0,
  //               TDS: 0,
  //             },
  //             RoomTypeName:
  //               "Deluxe Double Room with Balcony,1 Queen Bed,NonSmo",
  //           },
  //         ],
  //         InvoiceAmount: 37709,
  //         InvoiceNo: "MW/2526/7681",
  //         Latitude: "28.628621",
  //         Longitude: "77.212859",
  //         NoOfRooms: 1,
  //         StarRating: 4,
  //         TraceId: "9273fba7-5d4e-11f0-adc8-e2c89c64932c",
  //       },
  //     },
  //   };

  //   setBookingDetail(bookingData);
  //   console.log("Variable Booking Details:", bookingData);
  // }, []);

  useEffect(() => {
    const storedBookingID = localStorage.getItem("BookingID");

    const getBookingRequestData = {
      BookingId: storedBookingID,
    };

    const fetchBookingDetail = async () => {
      const response = await axios.post(
        "https://admin.tripgoonline.com/api/Hotel/GetBookingDetail",
        getBookingRequestData
      );
      console.log(
        "GetBookingDetail:",
        response.data.data.GetBookingDetailResult
      );
      setBookingDetail(response.data.data.GetBookingDetailResult);
    };

    // {console.log("HotelPassenger:", bookingDetail?.HotelRoomsDetails?.[0]?.HotelPassenger)}

    fetchBookingDetail();
  }, []);

  return (
    <div>
      <>
        <section className="order__section " style={{ position: "relative" }}>
          <div className="pageStickyHder">
            <div className="flightsContainer pageHeaderWrap">
              <div className="pageHeader">
                <h2
                  data-test="component-title"
                  className="fontSize20 blackFont whiteText headerTitle"
                />
              </div>
            </div>
          </div>

          <div>
            <span className="bgGradient"></span>
            <div className="container ticketContainers">
              <div className="row justify-content-center">
                <div className="col-xxl-12 col-xl-12 col-lg-12">
                  <div className="hotel__emailinvoice invoice__wrapper hotel__invoice">
                    <div className="invoice__textwrapper  mb__10">
                      <div className="invoice__leftbox">
                        <h3 className="dtext xs-32">
                          SkyPort DestinationsOnline{" "}
                        </h3>
                      </div>
                      <div className="invoice-buttons hotelinvoice-buttons">
                        <button className="print_btn">
                          <svg
                            width={20}
                            height={21}
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                              fill="#00C764"
                            />
                          </svg>
                        </button>{" "}
                        <button id="download_btn" className="download_btn">
                          <svg
                            width={25}
                            height={19}
                            viewBox="0 0 25 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                              fill="#2D7CFE"
                            />
                          </svg>
                        </button>
                        <button className="whatsapp_btn">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                          >
                            <path
                              d="M16 0C7.164 0 0 7.163 0 16c0 2.818.73 5.463 2 7.785L0 32l8.32-2.12A15.962 15.962 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.444 0-4.716-.666-6.677-1.821l-.476-.287-4.952 1.267 1.318-4.818-.31-.495A13.315 13.315 0 0 1 2.667 16C2.667 8.82 8.82 2.667 16 2.667 23.18 2.667 29.333 8.82 29.333 16 29.333 23.18 23.18 29.333 16 29.333zm8.286-9.286c-.39-.195-2.314-1.142-2.673-1.273-.36-.13-.623-.195-.886.196-.26.39-1.02 1.273-1.25 1.535-.23.26-.46.293-.85.098-.39-.196-1.647-.61-3.14-1.942-1.16-1.035-1.946-2.314-2.176-2.704-.23-.39-.024-.602.17-.79.18-.178.39-.462.58-.693.19-.23.26-.39.39-.65.13-.26.065-.487-.032-.682-.097-.195-.887-2.134-1.214-2.927-.32-.77-.648-.665-.886-.677l-.753-.013c-.26 0-.682.098-1.04.462s-1.37 1.34-1.37 3.268c0 1.928 1.404 3.79 1.6 4.054.195.26 2.77 4.235 6.71 5.937 3.94 1.703 3.94 1.136 4.65 1.063.71-.072 2.314-.94 2.64-1.85.33-.91.33-1.69.23-1.85-.098-.162-.358-.26-.747-.455z"
                              fill="#25D366"
                            />
                          </svg>
                        </button>
                        <button className="email_btn">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                          >
                            <path
                              d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z"
                              fill="#EA4335"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="reservation__contetn">
                      <span className="dtext fz-16 fw-400 lato d-block mb__10">
                        <span>
                          Hey{" "}
                          {bookingDetail?.HotelRoomsDetails?.[0]?.HotelPassenger?.find(
                            (p) => p.LeadPassenger
                          )?.FirstName || "Guest"}
                          ,
                        </span>
                      </span>
                      <div className="input-esingl input-check d-flex align-items-center gap-2 payment__save mb__15">
                        <IoMdCheckboxOutline
                          size={20}
                          color="#43a047"
                          className="overcheck"
                          alt="img"
                          style={{ marginTop: "-8px" }}
                        />
                        <label className="gratext fz-18 fw-600 lato booking-confirm ">
                          Congratulations! Your Booking has been confirmed.
                        </label>
                      </div>
                    </div>

                    <div className="themeholy-invoice invoice_style17">
                      <div className="download-inner" id="download_section">
                        <div className="row gx-0 justify-content-between my-4">
                          <div className="col-6">
                            <div className="info-box2 text-start">
                              <div style={{ display: "flex", gap: "20px" }}>
                                <div>
                                  <b>Booking ID:</b>
                                  <br />
                                  <span>{bookingDetail?.BookingId}</span>
                                </div>
                                {/* <div>
                            <b>Inbound Booking ID:</b>
                            <br />
                            <span>11324342</span>
                          </div> */}
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="info-box2 text-end">
                              <b>Payment Method:</b>
                              <br />
                              <span>Credit Card</span>
                            </div>
                          </div>
                        </div>

                        <div className="hotelPrebookVoucher">
                          <div className="hotelFinalBooking_hotelDetails ">
                            <div className="hotelFinalBooking_hotelNameAdd">
                              <div className="hotelListingstyling-name hotelFinalBooking-name">
                                {bookingDetail?.HotelName}
                                <div
                                  className="rating-score"
                                  style={{
                                    textAlign: "center",
                                    fontSize: "18px",
                                  }}
                                >
                                  {[...Array(5)].map((_, index) => (
                                    <span
                                      key={index}
                                      style={{
                                        color:
                                          index <
                                          Number(bookingDetail?.StarRating)
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
                                <span title={bookingDetail?.AddressLine1}>
                                  {bookingDetail?.AddressLine1}
                                </span>
                              </div>
                            </div>

                            <Row className="hotelFinalBooking_rowCols">
                              <Col md={4} className="hotelFinalBooking_Col1">
                                <img
                                  src="/Images/Images/hotelroom.jpg"
                                  alt=""
                                />
                              </Col>
                              <Col md={8} className="hotelFinalBooking_Col2">
                                <div className="hotelFinalBooking_CheckinDetails">
                                  <div className="hotelFinalBooking_checkIn">
                                    <h6>CHECK-IN </h6>
                                    {/* <h3>{bookingDetail?.InitialCheckInDate}</h3> */}
                                    <h3>
                                      {bookingDetail?.InitialCheckInDate
                                        ? new Date(
                                            bookingDetail?.InitialCheckInDate
                                          ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                          })
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
                                    {/* <h3>{bookingDetail?.InitialCheckOutDate}</h3> */}
                                    <h3>
                                      {bookingDetail?.InitialCheckOutDate
                                        ? new Date(
                                            bookingDetail?.InitialCheckOutDate
                                          ).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                          })
                                        : ""}
                                    </h3>
                                  </div>

                                  {/* <Link to='/hoteldetailsmain'>
                              <div className="hotelFinalBooking_changeRoom">CHANGE ROOM</div>
                            </Link> */}
                                </div>

                                <div className="hotelFinalBooking_roomsGuests">
                                  <h6>ROOMS & GUESTS</h6>
                                  <h6>
                                    <span style={{ fontWeight: "bold" }}>
                                      {bookingDetail?.NoOfRooms}
                                    </span>{" "}
                                    <span className="hotelFinalBooking_roomsGuests_Span">
                                      Rooms
                                    </span>{" "}
                                    <span style={{ fontWeight: "bold" }}>
                                      {bookingDetail?.HotelRoomsDetails?.[0]
                                        ?.HotelPassenger?.length || 0}
                                    </span>{" "}
                                    <span className="hotelFinalBooking_roomsGuests_Span">
                                      Guests
                                    </span>
                                  </h6>
                                </div>
                              </Col>
                            </Row>

                            <div className="hotelFinalBooking_roomType">
                              <h6>Name</h6>
                              <div>
                                {/* <span style={{ fontWeight: "bold" }}>1</span> Room */}
                                <span style={{ fontWeight: "bold" }}>
                                  {bookingDetail?.NoOfRooms}
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
                        </div>
                        <>
                          <p
                            style={{ paddingTop: "25px" }}
                            className="table-title"
                          >
                            <b> Guest Information:</b>
                          </p>

                          <table className="invoice-table table-stripe3 style5">
                            <thead>
                              <tr>
                                <th>Guest's :</th>
                                <th>Gender:</th>
                                <th>PAN No. :</th>
                                <th>Mobile Number :</th>
                                <th>Room No.:</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookingDetail?.HotelRoomsDetails?.flatMap(
                                (room, roomIndex) =>
                                  room.HotelPassenger?.map(
                                    (passenger, passengerIndex) => (
                                      <tr
                                        key={`${roomIndex}-${passengerIndex}`}
                                      >
                                        <td>{` ${passenger.FirstName} ${passenger.LastName}`}</td>
                                        <td>
                                          {passenger.PaxType === 1
                                            ? "Male"
                                            : "Female"}
                                        </td>
                                        <td>{passenger.PAN || "-"}</td>
                                        <td>{passenger.Phoneno || "-"}</td>
                                        <td>{room.RoomId || "-"}</td>
                                      </tr>
                                    )
                                  )
                              )}
                            </tbody>
                          </table>
                        </>

                        <table className="invoice-table table-stripe3">
                          <thead>
                            <tr>
                              <th>Description</th>

                              <th style={{ textAlign: "end" }}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Base Fare</td>
                              <td style={{ textAlign: "end" }}>
                                {" "}
                                ₹{" "}
                                {bookingDetail?.HotelRoomsDetails?.[0]?.Price
                                  ?.PublishedPriceRoundedOff || 0}
                              </td>
                            </tr>
                            <tr>
                              <td>Taxes & Fees</td>
                              <td style={{ textAlign: "end" }}>
                                ₹{" "}
                                {Math.round(
                                  bookingDetail?.HotelRoomsDetails?.[0]?.Price
                                    ?.Tax || 0
                                )}
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td>
                                <b>Total Amount:</b>
                              </td>
                              <td style={{ textAlign: "end" }}>
                                ₹{" "}
                                {bookingDetail?.HotelRoomsDetails?.[0]?.Price
                                  ?.PublishedPriceRoundedOff || 0}
                              </td>
                            </tr>
                          </tfoot>
                        </table>

                        <div
                          className=""
                          style={{ width: "100%", textAlign: "end" }}
                        >
                          <div>
                            <b>Payment Info:</b>
                            <p className="mb-0">
                              Credit Card No: 2456**********
                              <br />
                              A/C Name: TEST
                            </p>
                          </div>
                        </div>

                        <p className="invoice-note mt-3">
                          <svg
                            width={14}
                            height={18}
                            viewBox="0 0 14 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.64581 13.7917H10.3541V12.5417H3.64581V13.7917ZM3.64581 10.25H10.3541V9.00002H3.64581V10.25ZM1.58331 17.3334C1.24998 17.3334 0.958313 17.2084 0.708313 16.9584C0.458313 16.7084 0.333313 16.4167 0.333313 16.0834V1.91669C0.333313 1.58335 0.458313 1.29169 0.708313 1.04169C0.958313 0.791687 1.24998 0.666687 1.58331 0.666687H9.10415L13.6666 5.22919V16.0834C13.6666 16.4167 13.5416 16.7084 13.2916 16.9584C13.0416 17.2084 12.75 17.3334 12.4166 17.3334H1.58331ZM8.47915 5.79169V1.91669H1.58331V16.0834H12.4166V5.79169H8.47915ZM1.58331 1.91669V5.79169V1.91669V16.0834V1.91669Z"
                              fill="#2D7CFE"
                            />
                          </svg>{" "}
                          <b>NOTE: </b>This is computer generated receipt and
                          does not require physical signature.
                        </p>
                      </div>

                      <div className="hotelinvoiceBottom-buttons">
                        <div className="invoice-buttons hotelinvoice-buttons">
                          <button className="print_btn">
                            <svg
                              width={20}
                              height={21}
                              viewBox="0 0 20 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M16.25 13H3.75C3.38542 13 3.08594 13.1172 2.85156 13.3516C2.61719 13.5859 2.5 13.8854 2.5 14.25V19.25C2.5 19.6146 2.61719 19.9141 2.85156 20.1484C3.08594 20.3828 3.38542 20.5 3.75 20.5H16.25C16.6146 20.5 16.9141 20.3828 17.1484 20.1484C17.3828 19.9141 17.5 19.6146 17.5 19.25V14.25C17.5 13.8854 17.3828 13.5859 17.1484 13.3516C16.9141 13.1172 16.6146 13 16.25 13ZM16.25 19.25H3.75V14.25H16.25V19.25ZM17.5 8V3.27344C17.5 2.90885 17.3828 2.60938 17.1484 2.375L15.625 0.851562C15.3646 0.617188 15.0651 0.5 14.7266 0.5H5C4.29688 0.526042 3.71094 0.773438 3.24219 1.24219C2.77344 1.71094 2.52604 2.29688 2.5 3V8C1.79688 8.02604 1.21094 8.27344 0.742188 8.74219C0.273438 9.21094 0.0260417 9.79688 0 10.5V14.875C0.0260417 15.2656 0.234375 15.474 0.625 15.5C1.01562 15.474 1.22396 15.2656 1.25 14.875V10.5C1.25 10.1354 1.36719 9.83594 1.60156 9.60156C1.83594 9.36719 2.13542 9.25 2.5 9.25H17.5C17.8646 9.25 18.1641 9.36719 18.3984 9.60156C18.6328 9.83594 18.75 10.1354 18.75 10.5V14.875C18.776 15.2656 18.9844 15.474 19.375 15.5C19.7656 15.474 19.974 15.2656 20 14.875V10.5C19.974 9.79688 19.7266 9.21094 19.2578 8.74219C18.7891 8.27344 18.2031 8.02604 17.5 8ZM16.25 8H3.75V3C3.75 2.63542 3.86719 2.33594 4.10156 2.10156C4.33594 1.86719 4.63542 1.75 5 1.75H14.7266L16.25 3.27344V8ZM16.875 10.1875C16.3021 10.2396 15.9896 10.5521 15.9375 11.125C15.9896 11.6979 16.3021 12.0104 16.875 12.0625C17.4479 12.0104 17.7604 11.6979 17.8125 11.125C17.7604 10.5521 17.4479 10.2396 16.875 10.1875Z"
                                fill="#00C764"
                              />
                            </svg>
                          </button>{" "}
                          <button id="download_btn" className="download_btn">
                            <svg
                              width={25}
                              height={19}
                              viewBox="0 0 25 19"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.94531 11.1797C8.6849 10.8932 8.6849 10.6068 8.94531 10.3203C9.23177 10.0599 9.51823 10.0599 9.80469 10.3203L11.875 12.3516V6.375C11.901 5.98438 12.1094 5.77604 12.5 5.75C12.8906 5.77604 13.099 5.98438 13.125 6.375V12.3516L15.1953 10.3203C15.4818 10.0599 15.7682 10.0599 16.0547 10.3203C16.3151 10.6068 16.3151 10.8932 16.0547 11.1797L12.9297 14.3047C12.6432 14.5651 12.3568 14.5651 12.0703 14.3047L8.94531 11.1797ZM10.625 0.75C11.7969 0.75 12.8646 1.01042 13.8281 1.53125C14.8177 2.05208 15.625 2.76823 16.25 3.67969C16.8229 3.39323 17.4479 3.25 18.125 3.25C19.375 3.27604 20.4036 3.70573 21.2109 4.53906C22.0443 5.34635 22.474 6.375 22.5 7.625C22.5 8.01562 22.4479 8.41927 22.3438 8.83594C23.151 9.2526 23.7891 9.85156 24.2578 10.6328C24.7526 11.4141 25 12.2865 25 13.25C24.974 14.6562 24.4922 15.8411 23.5547 16.8047C22.5911 17.7422 21.4062 18.224 20 18.25H5.625C4.03646 18.1979 2.70833 17.651 1.64062 16.6094C0.598958 15.5417 0.0520833 14.2135 0 12.625C0.0260417 11.375 0.377604 10.2812 1.05469 9.34375C1.73177 8.40625 2.63021 7.72917 3.75 7.3125C3.88021 5.4375 4.58333 3.88802 5.85938 2.66406C7.13542 1.4401 8.72396 0.802083 10.625 0.75ZM10.625 2C9.08854 2.02604 7.78646 2.54688 6.71875 3.5625C5.67708 4.57812 5.10417 5.85417 5 7.39062C4.94792 7.91146 4.67448 8.27604 4.17969 8.48438C3.29427 8.79688 2.59115 9.33073 2.07031 10.0859C1.54948 10.8151 1.27604 11.6615 1.25 12.625C1.27604 13.875 1.70573 14.9036 2.53906 15.7109C3.34635 16.5443 4.375 16.974 5.625 17H20C21.0677 16.974 21.9531 16.6094 22.6562 15.9062C23.3594 15.2031 23.724 14.3177 23.75 13.25C23.75 12.5208 23.5677 11.8698 23.2031 11.2969C22.8385 10.724 22.3568 10.2682 21.7578 9.92969C21.2109 9.59115 21.0026 9.09635 21.1328 8.44531C21.2109 8.21094 21.25 7.9375 21.25 7.625C21.224 6.73958 20.9245 5.9974 20.3516 5.39844C19.7526 4.82552 19.0104 4.52604 18.125 4.5C17.6302 4.5 17.1875 4.60417 16.7969 4.8125C16.1719 5.04688 15.651 4.90365 15.2344 4.38281C14.7135 3.65365 14.0495 3.08073 13.2422 2.66406C12.4609 2.22135 11.5885 2 10.625 2Z"
                                fill="#2D7CFE"
                              />
                            </svg>
                          </button>
                          <button className="whatsapp_btn">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 32 32"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                            >
                              <path
                                d="M16 0C7.164 0 0 7.163 0 16c0 2.818.73 5.463 2 7.785L0 32l8.32-2.12A15.962 15.962 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.444 0-4.716-.666-6.677-1.821l-.476-.287-4.952 1.267 1.318-4.818-.31-.495A13.315 13.315 0 0 1 2.667 16C2.667 8.82 8.82 2.667 16 2.667 23.18 2.667 29.333 8.82 29.333 16 29.333 23.18 23.18 29.333 16 29.333zm8.286-9.286c-.39-.195-2.314-1.142-2.673-1.273-.36-.13-.623-.195-.886.196-.26.39-1.02 1.273-1.25 1.535-.23.26-.46.293-.85.098-.39-.196-1.647-.61-3.14-1.942-1.16-1.035-1.946-2.314-2.176-2.704-.23-.39-.024-.602.17-.79.18-.178.39-.462.58-.693.19-.23.26-.39.39-.65.13-.26.065-.487-.032-.682-.097-.195-.887-2.134-1.214-2.927-.32-.77-.648-.665-.886-.677l-.753-.013c-.26 0-.682.098-1.04.462s-1.37 1.34-1.37 3.268c0 1.928 1.404 3.79 1.6 4.054.195.26 2.77 4.235 6.71 5.937 3.94 1.703 3.94 1.136 4.65 1.063.71-.072 2.314-.94 2.64-1.85.33-.91.33-1.69.23-1.85-.098-.162-.358-.26-.747-.455z"
                                fill="#25D366"
                              />
                            </svg>
                          </button>
                          <button className="email_btn">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                            >
                              <path
                                d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l8 5.333 8-5.333V18H4z"
                                fill="#EA4335"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="p-3 ticketContainers hide-desktop">
          <div className="success-message text-center mb-4">
            <h4 className="fw-bold mb-2 text-black mt-2 ">
              Payment Successful!{" "}
              <img
                src="/Images/Images/verify.png"
                className="bi bi-check-circle"
                style={{ height: "26px" }}
              />
            </h4>
            <p className="" style={{ color: "rgb(138 136 136)" }}>
              Your booking has been confirmed. Voucher details have been sent to
              your email.
            </p>
          </div>

          <div className="booking-details mb-4">
            <div className="booking-card booking_cards_booking p-3 rounded-3 bg-primary-light mb-3">
              <h6 className="fw-bold mb-3">Booking Information</h6>
              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Booking ID</div>
                <div className="fw-medium">{bookingDetail?.BookingId}</div>
              </div>

              {/* <div className="d-flex justify-content-between mb-2">
          <div className="text-muted">Inbound Booking ID</div>
          <div className="fw-medium">123123124</div>
        </div> */}

              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Booking Date</div>
                <div>
                  {bookingDetail?.InitialCheckInDate
                    ? new Date(
                        bookingDetail?.InitialCheckInDate
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                </div>
              </div>
              {/* <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Airline PNR</div>
                <div>3423242</div>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Inbound Airline PNR</div>
                <div>53453453</div>
              </div> */}

              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Payment Method</div>
                <div>Visa •••• 4321</div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="text-muted">Amount Paid</div>
                <div className="fw-bold text-primary-color">
                  ₹{" "}
                  {bookingDetail?.HotelRoomsDetails?.[0]?.Price
                    ?.PublishedPriceRoundedOff || 0}
                </div>
              </div>
            </div>

            <div className="trip-card p-3 rounded-3 bg-primary-light mb-3">
              <div>
                <h6
                  className="fw-bold mb-3"
                  style={{
                    color: "#396ace",
                    background: "#9ebdd54a",
                    padding: "10px",
                  }}
                >
                  Hotel Details
                </h6>
                <div className="d-flex align-items-center mb-3">
                  {/* <div className="bus-icon me-3">
                    <img
                      style={{ width: "40px", borderRadius: "5px" }}
                      src={"/Images/hotel-icon.png"}
                    />
                  </div> */}
                  <div>
                    <h6 className="fw-bold mb-0">{bookingDetail?.HotelName}</h6>
                    <div className="text-muted small">
                      {bookingDetail?.AddressLine1}
                    </div>
                  </div>
                </div>

                <div className="journey-details mb-3">
                  <div className="d-flex mb-3">
                    <div className="journey-stops me-3">
                      <div className="departure-stop" />
                      <div className="journey-line" />
                      <div className="arrival-stop" />
                    </div>
                    <div className="journey-info flex-grow-1">
                      <div className="mb-3">
                        <div className="fw-bold"> Check-In</div>
                        <div className="text-muted small">
                          {" "}
                          {bookingDetail?.InitialCheckInDate
                            ? new Date(
                                bookingDetail?.InitialCheckInDate
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : ""}
                        </div>
                      </div>
                      <div>
                        <div className="fw-bold"> Check-Out</div>
                        <div className="text-muted small">
                          {bookingDetail?.InitialCheckOutDate
                            ? new Date(
                                bookingDetail?.InitialCheckOutDate
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-muted mediam mb-0">Guests</div>
                    <div className="text-muted mediam mb-0 text-end">
                      Room No
                    </div>
                  </div>
                </div>

                {bookingDetail?.HotelRoomsDetails?.flatMap((room, roomIndex) =>
                  room.HotelPassenger?.map((passenger, passengerIndex) => (
                    <div
                      className="col-12 mb-2"
                      key={`${roomIndex}-${passengerIndex}`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="fw-medium">
                          {passenger.FirstName} {passenger.LastName}
                        </div>
                        <div className="fw-medium">{room.RoomId || "-"}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="booking-card p-3 rounded-3 bg-primary-light ">
              <h6 className="fw-bold mb-3">Fare Summary</h6>

              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Base Fare</div>
                <div>
                  ₹{" "}
                  {bookingDetail?.HotelRoomsDetails?.[0]?.Price
                    ?.PublishedPriceRoundedOff || 0}
                </div>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <div className="text-muted">Tax & Fees</div>
                <div>
                  ₹{" "}
                  {Math.round(
                    bookingDetail?.HotelRoomsDetails?.[0]?.Price?.Tax || 0
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="text-muted">Total Amount:</div>
                <div className="fw-bold text-primary-color">
                  ₹{" "}
                  {bookingDetail?.HotelRoomsDetails?.[0]?.Price
                    ?.PublishedPriceRoundedOff || 0}
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons d-grid gap-2">
            <button className="btn btn-app" type="button">
              Download PDF Ticket
            </button>
            <Link className="btn btn-outline-secondary rounded-3">
              Resend Mail
            </Link>
            <Link to="/" className="btn btn-outline-secondary rounded-3">
              Back to Home
            </Link>
          </div>
        </div>
      </>
    </div>
  );
};

export default HotelVoucher;
