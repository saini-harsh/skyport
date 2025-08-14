import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./FlightInternational.css";
import { FlightListInfo } from "../FlightList/FlightListInfo";
import { FlightListInfoInternational } from "./FlightListInfoInternational";

export const formatLayoverTime = (arrivalTime, nextDepartureTime) => {
  const arrival = new Date(arrivalTime);
  const nextDeparture = new Date(nextDepartureTime);
  const layoverMinutes = Math.floor(
    (nextDeparture.getTime() - arrival.getTime()) / (1000 * 60)
  );
  const layoverHours = Math.floor(layoverMinutes / 60);
  const layoverMinutesRemainder = layoverMinutes % 60;
  return `${layoverHours}h : ${layoverMinutesRemainder}m`;
};export const formatDuration = (minutes) => {
  const hrs = String(Math.floor(minutes / 60)).padStart(2, "0");
  const mins = String(minutes % 60).padStart(2, "0");
  return `${hrs}h ${mins}m`;
};






const InternationalFlightListCard = ({
  e,
  handleMoreFare,
  handleClick,
  activeId,
  showModal,
  setShowModal,
  formatTime,
  handlebookmodal,
  handleChnageCurrency,
  handleChangeCurrency2,
  fareRules,
  // returnFlight,
  // departureFlight,
}) => {
  const [departureFlight, setDepartureFlight] = useState("");
  const [returnFlight, setReturnFlight] = useState("");

  // useEffect(() => {
  //   if (e && e.sI && e.sI.length > 0) {
  //     // Filter flights for departure (isRs = false)
  //     const outboundFlights = e.sI.filter((flight) => !flight.isRs);

  //     // Filter flights for return (isRs = true)
  //     const inboundFlights = e.sI.filter((flight) => flight.isRs);

  //     // Update state with all departure flights
  //     if (outboundFlights.length > 0) {
  //       setDepartureFlight(outboundFlights); // Store all outbound flights in an array
  //     }

  //     // Update state with all return flights
  //     if (inboundFlights.length > 0) {
  //       setReturnFlight(inboundFlights); // Store all return flights in an array
  //     }
  //   }
  // }, [e]);

  return (
    <>
      {e && (
        <div className="internationtrip_search">
          <div className="lis">
            <div className="li-c">
              <div className="fg-wr">
                <div className="fg-wl">
                  <div className="fg-wlm">
                    <div className="fg-wll">
                      <div className="flgi">
                        <div className="flgi-l">
                          <img
                            alt="Flight"
                            width={40}
                            src={`/Images/AirlineLogo/${e.Segments[0][0].Airline.AirlineCode}.gif`}
                          />
                          {/* {e.isLcc} */}
                        </div>
                        <div className="flgi-r">
                          <div className="flnmm ng-binding">
                            {e.Segments[0][0].Airline.AirlineName}
                          </div>
                          <div className="flnm1">
                            <span className="ng-binding">
                              {e.Segments[0][0].Airline.AirlineCode}-
                              {e.Segments[0][0].Airline.FlightNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="fg-wlr">
                      <div className="flgi">
                        <div className="flgi-l">
                          <img
                            alt="Flight"
                            width={40}
                            src={`/Images/AirlineLogo/${e.Segments[1][0].Airline.AirlineCode}.gif`}
                          />
                        </div>
                        <div className="flgi-r">
                          <div className="flnmm ng-binding">
                            {e.Segments[1][0].Airline.AirlineName}
                          </div>
                          <div className="flnm1">
                            <span className="ng-binding">
                              {" "}
                              {e.Segments[0][0].Airline.AirlineCode}-{" "}
                              {e.Segments[0][0].Airline.AirlineCode}-
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="fg-wrr" style={{ position: "relative" }}>
                  <div className="flgi-rm">
                    <div className="flgi-rm3 intButton">
                      <button
                        id="BK_20"
                        className="ng-scope"
                        onClick={() => handlebookmodal(e.ResultIndex)}
                      >
                        Book Now
                      </button>
                    </div>

                    <div className="freflex">
                      <div className="fare_rt">
                        <div className="rtintfre ng-scope">
                          <i className="CurrncyCD_Rs" />

                          <span className="ng-binding ng-scope">
                            $ {Math.round(e.Fare.PublishedFare)}
                          </span>
                        </div>
                      </div>
                      <div className="clr" />

                      <div
                        className="cou-text-app3 ng-binding ng-scope"
                        style={{ display: "block" }}
                      >
                        Rs.999 Discount Applied
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lism">
                <div className="lism-l">
                  <div className="dptt">
                    <span> Departure</span>
                  </div>
                  <div className="lis-de">
                    <div className="list-main">
                      <div className="flig flig_ow ng-scope">
                        <label className=" radio_label">
                          <div className="bkp-c">
                            <div className="flig-h">
                              <div className="flig1">
                                <div className="fligm">
                                  <div className="flig-r">
                                    <div className="flig-sr">
                                      <span className="ng-binding">
                                        {" "}
                                        {
                                          e.Segments[0][0].Origin.Airport
                                            .CityCode
                                        }
                                      </span>{" "}
                                      <strong>
                                        <span className="ng-binding">
                                          {new Date(
                                            e.Segments[0][0].Origin.DepTime
                                          ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                          })}
                                        </span>
                                      </strong>
                                    </div>
                                    <span className="intrtcy fltl ng-binding">
                                      {e.Segments[0][0].Origin.Airport.CityName}
                                    </span>

                                    <div className="trvd ng-binding">
                                      {formatTime(
                                        e.Segments[0][0].Origin.DepTime
                                      )}
                                    </div>
                                    <div className="distancenv2 tleft ng-binding" />
                                  </div>
                                </div>
                              </div>
                              <div className="flig1 wde36">
                                <div className="stp">
                                  <span className="ng-binding">
                                    {" "}
                                    {formatLayoverTime(
                                      e.Segments[0][0].Origin.DepTime,
                                      e.Segments[0][e.Segments[0].length - 1]
                                        .Destination.ArrTime
                                    )}
                                  </span>{" "}
                                  <span className="n"> | </span>
                                  <span className="n ng-scope">
                                    {" "}
                                    {e.Segments[0].length - 1 === 0
                                      ? "Non-Stop"
                                      : `${e.Segments[0].length - 1} Stops`}
                                  </span>
                                </div>
                                <div className="ln" />
                                <div className="sr-d ng-binding"></div>
                              </div>
                              <div className="flig1">
                                <div className="flig-sr txt-r">
                                  <span className="ng-binding">
                                    {
                                      e.Segments[0][e.Segments[0].length - 1]
                                        .Destination.Airport.CityCode
                                    }
                                  </span>{" "}
                                  <strong>
                                    <span className="ng-binding">
                                      {" "}
                                      {new Date(
                                        e.Segments[0][
                                          e.Segments[0].length - 1
                                        ].Destination.ArrTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      })}
                                    </span>
                                  </strong>{" "}
                                </div>
                                <span className="fltr intrtcy ng-binding">
                                  {
                                    e.Segments[0][e.Segments[0].length - 1]
                                      .Destination.Airport.CityName
                                  }
                                </span>
                                <div className="trvd txt-r ng-binding">
                                  {formatTime(
                                    e.Segments[0][e.Segments[0].length - 1]
                                      .Destination.ArrTime
                                  )}
                                </div>
                                {/* <div className="distancenv2 tright ng-binding">
                                  (19 km from Dubai)
                                </div> */}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="full-str ng-binding ng-hide"
                                style={{
                                  padding: "3px 6px",
                                  color: "#3a3a3a",
                                  fontSize: 13,
                                  background: "#fffbed",
                                  float: "left",
                                  width: "auto",
                                  margin: "0 0 7px 15px",
                                  border: 0,
                                  borderLeft: "3px solid #efdc9c",
                                }}
                                id="divNote"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lism-r">
                  <div className="dptt">
                    <span> Return </span>
                  </div>
                  <div className="lis-de">
                    <div className="list-main">
                      <div className="flig flig_ow ng-scope">
                        <label className=" radio_label">
                          <div className="bkp-c">
                            <div className="flig-h">
                              <div className="flig1">
                                <div className="fligm">
                                  <div className="flig-r">
                                    <div className="flig-sr">
                                      <span className="ng-binding">
                                        {" "}
                                        {
                                          e.Segments[1][0].Origin.Airport
                                            .CityCode
                                        }
                                      </span>{" "}
                                      <strong>
                                        <span className="ng-binding">
                                          {new Date(
                                            e.Segments[1][0].Origin.DepTime
                                          ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: false,
                                          })}
                                        </span>
                                      </strong>
                                    </div>
                                    <span className="intrtcy fltl ng-binding">
                                      {e.Segments[1][0].Origin.Airport.CityName}
                                    </span>

                                    <div className="trvd ng-binding">
                                      {formatTime(
                                        e.Segments[1][0].Origin.DepTime
                                      )}
                                    </div>
                                    <div className="distancenv2 tleft ng-binding" />
                                  </div>
                                </div>
                              </div>
                              <div className="flig1 wde36">
                                <div className="stp">
                                  <span className="ng-binding">
                                    {" "}
                                    {formatLayoverTime(
                                      e.Segments[1][0].Origin.DepTime,
                                      e.Segments[1][e.Segments[1].length - 1]
                                        .Destination.ArrTime
                                    )}
                                  </span>{" "}
                                  <span className="n"> | </span>
                                  <span className="n ng-scope">
                                    {" "}
                                    {e.Segments[1].length - 1 === 0
                                      ? "Non-Stop"
                                      : `${e.Segments[1].length - 1} Stops`}
                                  </span>
                                </div>
                                <div className="ln" />
                                <div className="sr-d ng-binding"></div>
                              </div>
                              <div className="flig1">
                                <div className="flig-sr txt-r">
                                  <span className="ng-binding">
                                    {
                                      e.Segments[1][e.Segments[1].length - 1]
                                        .Destination.Airport.CityCode
                                    }
                                  </span>{" "}
                                  <strong>
                                    <span className="ng-binding">
                                      {" "}
                                      {new Date(
                                        e.Segments[1][
                                          e.Segments[1].length - 1
                                        ].Destination.ArrTime
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: false,
                                      })}
                                    </span>
                                  </strong>{" "}
                                </div>
                                <span className="fltr intrtcy ng-binding">
                                  {
                                    e.Segments[1][e.Segments[1].length - 1]
                                      .Destination.Airport.CityName
                                  }
                                </span>
                                <div className="trvd txt-r ng-binding">
                                  {formatTime(
                                    e.Segments[1][e.Segments[1].length - 1]
                                      .Destination.ArrTime
                                  )}
                                </div>
                                {/* <div className="distancenv2 tright ng-binding">
                                  (19 km from Dubai)
                                </div> */}
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="full-str ng-binding ng-hide"
                                style={{
                                  padding: "3px 6px",
                                  color: "#3a3a3a",
                                  fontSize: 13,
                                  background: "#fffbed",
                                  float: "left",
                                  width: "auto",
                                  margin: "0 0 7px 15px",
                                  border: 0,
                                  borderLeft: "3px solid #efdc9c",
                                }}
                                id="divNote"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="li-fld">
              <div className="refu ng-scope" style={{ float: "left" }}>
                {e.IsRefundable === true ? "REFUNDABLES" : "NON-REFUNDABLES"}
              </div>

              <span
                id={20}
                style={{ marginTop: 6 }}
                onClick={() => {
                  handleClick(e.ResultIndex, "SrdvP");
                }}
              >
                Flight Detail
              </span>
            </div>
            {activeId === e.ResultIndex && (
              <FlightListInfoInternational
                idx={e.ResultIndex}
                flight={e}
                departureFlight={departureFlight}
                returnFlight={returnFlight}
                handleChnageCurrency={handleChnageCurrency}
                handleChangeCurrency2={handleChangeCurrency2}
                isInterNational={true}
                SrdvIndex="SrdvP"
                fareRules={fareRules}
              />
            )}
          </div>

          {/* <div className="internationtrip_search">
            <Container className="refendable11 refendable11onword">
              <Row className="price1">
                <Col
                  className="price111 price111onword"
                  style={{ paddingInline: "5px" }}
                >
                  <Row className="flight11" flight="UL">
                    <Col className="flight112" flightcraft="">
                      <div className="stopscount" stop="1">
                        <div
                          id="divUL196UL225UL226UL195"
                          className="Price33827 allshow block-content-2 custom_block_content flight-list-v2 ULSri Lankan Airlines 0Stops bingo_button_4"
                        >
                          <div className="box-result custom_box_result">
                            <div className="inter_trip_left">
                              <h4>Depart</h4>

                              <ul
                                className="list-search-result result_list"
                                style={{ display: "flex" }}
                              >
                                <li>
                                  <Image
                                    src={`/Images/AirlineLogo/${e.Segments[0][0].Airline.AirlineCode}.gif`}
                                    alt=""
                                  />
                                  <div className="flight_name obflight_name">
                                    {e.Segments[0][0].Airline.AirlineName}
                                    <span className="flight_no">
                                      {e.Segments[0][0].Airline.AirlineCode}-{" "}
                                      {e.Segments[0][0].Airline.FlightNumber}
                                    </span>
                                  </div>
                                </li>
                                <li className="depart_time cus_dep_arr_time">
                                  <span className="date departdate">
                                    {e.Segments[0][0].Origin.Airport.CityCode}{" "}
                                    &nbsp;
                                    {new Date(
                                      e.Segments[0][0].Origin.DepTime
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    })}
                                  </span>
                                  {e.Segments[0][0].Origin.Airport.CityName}
                                  <div className="date_time">
                                    {formatTime(
                                      e.Segments[0][0].Origin.DepTime
                                    )}
                                  </div>
                                </li>
                                <li className="flight_time_between">
                                  <span className="duration departdur">
                                   
                                    <div className="cus_tooltip">
                                      {e.flightType}
                                      {e.Segments[0].length - 1 === 0
                                        ? "Non-Stop"
                                        : `${e.Segments[0].length - 1} Stops`}
                                      <span className="tooltiptext">
                                        
                                      </span>
                                    </div>
                                  </span>
                                  <div className="time_separete"></div>
                                  <div className="flight_rel">
                                    
                                  </div>
                                </li>
                                <li className="arrive_time cus_dep_arr_time">
                                  <span className="date arivedate">
                                    {
                                      e.Segments[0][e.Segments[0].length - 1]
                                        .Destination.Airport.CityCode
                                    }
                                    &nbsp; &nbsp;
                                    {new Date(
                                      e.Segments[0][
                                        e.Segments[0].length - 1
                                      ].Destination.ArrTime
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    })}
                                  </span>
                                  {
                                    e.Segments[0][e.Segments[0].length - 1]
                                      .Destination.Airport.CityName
                                  }
                                  <div className="date_time">
                                    {formatTime(
                                      e.Segments[0][e.Segments[0].length - 1]
                                        .Destination.ArrTime
                                    )}
                                  </div>
                                </li>
                              </ul>

                              <div className="clearfix"></div>
                              <div className="hr_seperator"></div>
                              <h4>Return</h4>
                              
                              <ul
                                className="list-search-result result_list"
                                style={{ display: "flex" }}
                              >
                                <li>
                                  <Image
                                    src={`/Images/AirlineLogo/${e.Segments[1][0].Airline.AirlineCode}.gif`}
                                    alt=""
                                  />
                                  <div className="flight_name">
                                    {e.Segments[1][0].Airline.AirlineName}
                                    <span className="flight_no">
                                      {e.Segments[1][0].Airline.AirlineCode}{" "}
                                      {e.Segments[1][0].Airline.FlightNumber}
                                    </span>
                                  </div>
                                </li>
                                <li className="depart_time cus_dep_arr_time">
                                  <span className="date">
                                    {" "}
                                    {
                                      e.Segments[1][0].Origin.Airport.CityName
                                    }{" "}
                                    &nbsp;
                                    {new Date(
                                      e.Segments[1][0].Origin.DepTime
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    })}
                                  </span>
                                  {e.Segments[1][0].Origin.Airport.CityName}
                                  <div className="date_time cus_dep_arr_time">
                                    {formatTime(
                                      e.Segments[1][0].Origin.DepTime
                                    )}
                                  </div>
                                </li>
                                <li className="flight_time_between">
                                  <span className="duration">
                                   
                                    <div className="cus_tooltip">
                                      {e.Segments[1].length - 1 === 0
                                        ? "Non-Stop"
                                        : `${e.Segments[1].length - 1} Stops`}
                                      <span className="tooltiptext">
                                        
                                      </span>
                                    </div>
                                  </span>
                                  <div className="time_separete"></div>
                                  <div className="flight_rel">
                                    {" "}
                                    
                                  </div>
                                </li>
                                <li className="arrive_time cus_dep_arr_time">
                                  <span className="date">
                                    {
                                      e.Segments[1][e.Segments[1].length - 1]
                                        .Destination.Airport.CityCode
                                    }{" "}
                                    &nbsp; &nbsp;
                                    {new Date(
                                      e.Segments[1][
                                        e.Segments[1].length - 1
                                      ].Destination.ArrTime
                                    ).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    })}
                                  </span>
                                  {
                                    e.Segments[1][e.Segments[1].length - 1]
                                      .Destination.Airport.CityCode
                                  }
                                  <div className="date_time">
                                    {formatTime(
                                      e.Segments[1][e.Segments[1].length - 1]
                                        .Destination.ArrTime
                                    )}
                                  </div>
                                </li>
                              </ul>
                            
                            </div>
                            <div className="book_flight">
                              <div className="refundable clr_green">
                               
                              </div>
                              <span className="fli_price airlineprice">
                                <span className="mainprice">
                                  ₹{Math.round(e.Fare.PublishedFare)}
                                </span>
                              </span>
                              <div className="bookbtn_morefare">
                                <div className="book_btn">
                                  <Button
                                    className="btn small colorful-transparent hover-colorful btn_green checkout_flight"
                                    faretype="offer 1"
                                    fareindex="OB2"
                                    faretraceid="23c6201f-d7df-45aa-a04e-9d2b533ea956"
                                    fareuid="OB2"
                                    resultindex="LS1DOFQuIyxYLCYpQSxWLFEsMGBgCmAK"
                                    flightindex="NDU0UFEuMzk1MyMoUi01NSwsQyhWNTRQUS4zNGAKYAo="
                                    onClick={() =>
                                      handlebookmodal(e.ResultIndex)
                                    }
                                  >
                                    Book Now
                                  </Button>
                                </div>
                                <div className="more_farebtn"></div>
                              </div>
                            </div>

                            <div className="clearfix"></div>
                            <div className="flight_details">
                              <div className="main_flight_btn">
                                <a
                                  className="details_btn flightdetailajax"
                                  // onClick={() => {
                                  //   handleClick(e.totalPriceList[0].id, "SrdvP");
                                  // }}
                                >
                                  Flight Details
                                </a>
                              </div>
                              <div
                          className="flight_details_info"
                          is_show="0"
                          id="show_UL196UL225UL226UL195"
                        >
                          <h4>Please wait loading...</h4>
                        </div>
                            </div>
                            {activeId === e.totalPriceList[0].id && (
                          <FlightListInfoInternational
                            idx={e.FareSourceCode}
                            flight={e}
                            departureFlight={departureFlight}
                            returnFlight={returnFlight}
                            handleChnageCurrency={handleChnageCurrency}
                            handleChangeCurrency2={handleChangeCurrency2}
                            isInterNational={true}
                            SrdvIndex="SrdvP"
                            fareRules={fareRules}
                          />
                        )}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </div> */}
        </div>
      )}
      {e && (
        <div className="mobile_international_cont">
          <div
            className="managlist"
            onClick={() => handlebookmodal(e.ResultIndex)}
          >
            <label
              className="check-box"
              style={{
                padding: "0 0 0 0",
                display: "none",
                margin: "5px 0 13px 11px",
              }}
            >
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
            <div className="air-top">
              <div className="iner-sc flwrap">
                <div className="fl_sub_inf">
                  <div className="fl-num mfl0 ">
                    <span className="ontyp">Onward </span>
                    <br />

                    <span className="air-name ng-binding">
                      {e.Segments[0][0].Airline.AirlineName}
                    </span>
                    <br />
                    <span className="ng-binding">
                      {" "}
                      {e.Segments[0][0].Airline.AirlineCode}-
                    </span>
                    <span className="ng-binding">
                      {e.Segments[0][0].Airline.FlightNumber}-
                    </span>
                  </div>
                  <div className="hrline" />
                  <div className="fl-num">
                    <span className="ontyp">Return </span>
                    <br />
                    <span className="air-name ng-binding">
                      {e.Segments[1][0].Airline.AirlineName}
                    </span>
                    <br />
                    <span className="ng-binding">
                      {" "}
                      {e.Segments[1][0].Airline.AirlineCode}-
                    </span>
                    <span className="ng-binding">
                      {e.Segments[1][0].Airline.FlightNumber}
                    </span>
                  </div>
                </div>
                <div className="fl_cost">
                  {/* <span
          className="cross-pr-grid ng-scope"
          style={{ display: "block" }}
        >
          <div
            className="CurrncyCD_Rs cross-pr-txt"
          
          >
            66,868
          </div>
        </span> */}

                  <span className="ti_prc_new ng-scope">
                    <span className="ttl_b_amt CurrncyCD_Rs">
                      {" "}
                      ${Math.round(e.Fare.PublishedFare)}
                    </span>
                  </span>
                </div>
                <div className="dicappl ng-binding ng-scope">
                  $ 5250 Discount Applied
                </div>
              </div>
            </div>
            <div className="clr" />
            <div className="iner-sc">
              <div className="fl-flgt">
                <div className="fl_logo">
                  <img
                    width={30}
                    className="imgRTIMG"
                    style={{ display: "block" }}
                    src={`/Images/AirlineLogo/${e.Segments[0][0].Airline.AirlineCode}.gif`}
                  />
                </div>
                <div className="fl-timg-l">
                  <span className="fl_deprt ng-binding">
                    {" "}
                    {new Date(
                      e.Segments[0][0].Origin.DepTime
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                  <span className="fl_sctr ng-binding">
                    {" "}
                    {e.Segments[0][0].Origin.Airport.CityName}
                  </span>

                  <div className="distancenv2 tleft ng-binding" />
                </div>
                <div className="fl_info_col">
                  <div className="duratn-bdr text-center append_bottom10">
                    <span className="gray_dot--solid sml-dot-l" />
                    <span className="text_gray text-center ng-binding">
                      {formatLayoverTime(
                        e.Segments[0][0].Origin.DepTime,
                        e.Segments[0][e.Segments[0].length - 1].Destination
                          .ArrTime
                      )}
                      | &nbsp;{" "}
                      <span className="n ng-scope">
                        {" "}
                        {e.Segments[0].length - 1 === 0
                          ? "Non-Stop"
                          : `${e.Segments[0].length - 1} Stops`}
                      </span>
                    </span>
                    <span className="gray_dot--solid sml-dot-r" />
                  </div>
                  <p className="text_gray text-center ng-binding">
                    {e.Segments[0].map((item) => (
                      <span>{item.Origin.Airport.CityCode}</span>
                    ))}
                    , &nbsp;
                    {e.Segments[0].map((item) => (
                      <span>{item.Destination.Airport.CityCode}</span>
                    ))}
                  </p>
                </div>
                <div className="fl-timg-r">
                  <span className="fl_arive ng-binding">
                    {" "}
                    {new Date(
                      e.Segments[0][
                        e.Segments[0].length - 1
                      ].Destination.ArrTime
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                  <span className="fl_sctr ng-binding">
                    {" "}
                    {
                      e.Segments[0][e.Segments[0].length - 1].Destination
                        .Airport.CityName
                    }
                  </span>
                  <div className="distancenv2 tright ng-binding" />
                </div>
              </div>
              <div className="fl-more"></div>
              <div className="clr" />
            </div>

            <div className="iner-sc">
              <div className="fl-flgt">
                <div className="fl_logo">
                  <img
                    width={30}
                    className="imgRTIMG"
                    style={{ display: "block" }}
                    src={`/Images/AirlineLogo/${e.Segments[1][0].Airline.AirlineCode}.gif`}
                  />
                </div>
                <div className="fl-timg-l">
                  <span className="fl_deprt ng-binding">
                    {new Date(
                      e.Segments[1][0].Origin.DepTime
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                  <span className="fl_sctr ng-binding">
                    {" "}
                    {e.Segments[1][0].Origin.Airport.CityName}
                  </span>

                  <div className="distancenv2 tleft ng-binding" />
                </div>
                <div className="fl_info_col">
                  <div className="duratn-bdr text-center append_bottom10">
                    <span className="gray_dot--solid sml-dot-l" />
                    <span className="text_gray text-center ng-binding">
                      {formatLayoverTime(
                        e.Segments[1][0].Origin.DepTime,
                        e.Segments[1][e.Segments[1].length - 1].Destination
                          .ArrTime
                      )}{" "}
                      | &nbsp;{" "}
                      <span className="n ng-scope">
                        {" "}
                        {e.Segments[1].length - 1 === 0
                          ? "Non-Stop"
                          : `${e.Segments[1].length - 1} Stops`}
                      </span>
                    </span>
                    <span className="gray_dot--solid sml-dot-r" />
                  </div>
                  <p className="text_gray text-center ng-binding">
                    {e.Segments[1].map((item) => (
                      <span>{item.Origin.Airport.CityCode}</span>
                    ))}
                    , &nbsp;
                    {e.Segments[1].map((item) => (
                      <span>{item.Destination.Airport.CityCode}</span>
                    ))}
                    {/* {e.Segments[1][0].Origin.Airport.CityCode},{" "}
                    {
                      e.Segments[1][e.Segments[1].length - 1].Destination
                        .Airport.CityCode
                    }{" "} */}
                  </p>
                </div>
                <div className="fl-timg-r">
                  <span className="fl_arive ng-binding">
                    {" "}
                    {new Date(
                      e.Segments[1][
                        e.Segments[1].length - 1
                      ].Destination.ArrTime
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                  <span className="fl_sctr ng-binding">
                    {" "}
                    {
                      e.Segments[1][e.Segments[1].length - 1].Destination
                        .Airport.CityCode
                    }{" "}
                  </span>
                  <div className="distancenv2 tright ng-binding" />
                </div>
              </div>
              <div className="fl-more">{/* ngIf: sg.l_IB.length >1 */}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InternationalFlightListCard;
