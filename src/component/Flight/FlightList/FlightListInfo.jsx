// import  from "./FlightDetails.module.css";
// import './FlightDetails.css'
import "./FlightListInfo.css";
// import axios from "axios";
import React, { useState } from "react";
import Box from "@mui/material/Box";
// import { } from '@mui/material/Tab';
// import { TabContext } from '@mui/lab/TabContext';
// import { TabList } from '@mui/lab/TabList';
// import { TabPanel } from '@mui/lab/TabPanel';
import flightDetails1 from "./images/flightDetails1.PNG";
import arrowForward from "./images/arrowForward.png";
import clock from "./images/clock.png";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import { Col, Container, Row } from "react-bootstrap";
import { HiMiniHandThumbUp } from "react-icons/hi2";
import { FaRegThumbsUp } from "react-icons/fa";

export const formatTime = (arrTime) => {
  const date = new Date(arrTime);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = days[date.getDay()];
  const dateNum = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${dateNum} ${month} ${year}`;
};

export const FlightListInfo = ({
  idx,
  flight,
  handleChnageCurrency,
  isInterNational,
  fareRules,
  SrdvIndex,
}) => {
  const [value, setValue] = useState("1");
  console.log("farerules3", fareRules);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const formatLayoverTime = (arrivalTime, nextDepartureTime) => {
    const arrival = new Date(arrivalTime);
    const nextDeparture = new Date(nextDepartureTime);
    const layoverMinutes = Math.floor(
      (nextDeparture.getTime() - arrival.getTime()) / (1000 * 60)
    );
    const layoverHours = Math.floor(layoverMinutes / 60);
    const layoverMinutesRemainder = layoverMinutes % 60;
    return `${layoverHours}h : ${layoverMinutesRemainder}m`;
  };

  const formatPolicyInfo = (policyInfo) => {
    if (policyInfo.startsWith("__nls__")) {
      policyInfo = policyInfo.slice(7); // Remove the initial __nls__
    }
    return policyInfo.replace(/__nls__/g, "\n");
  };

  const renderFareRulesForSrdvTJ = () => {
    if (!fareRules) return null;
    return Object.keys(fareRules).map((route, index) => {
      const rules = fareRules[route];
      return (
        <div
          key={index}
          className="m-info-tips2 mar20"
          style={{ display: "block" }}
        >
          <div className="bg-head">
            <div className="fltl-mr">
              <FaRegThumbsUp
                style={{ textAlign: "center", marginTop: "5px" }}
              />
            </div>
            <div className="fltl">
              <h2 className="m-info-tips2_tit">Good to Know</h2>
              <p className="grn-txt 25">Information you should know &nbsp;</p>
            </div>
            <div className="clr"></div>
          </div>
          <div
            className="left_gtk"
            style={{
              maxHeight: "300px",
              overflow: "auto",
              scrollbarWidth: "thin",
              paddingInline: "15px",
            }}
          >
            <div key={index}>
              <h3>{route}</h3>
              <table className="fare-rule-table" style={{ minWidth: "100%" }}>
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>Type</th>
                    <th style={{ width: "15%" }}>Amount</th>
                    <th style={{ width: "55%" }}>Policy Info</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.fr && rules.fr.DATECHANGE && (
                    <>
                      <tr>
                        <td>Date Change</td>
                        <td>
                          {rules.fr.DATECHANGE.DEFAULT &&
                            rules.fr.DATECHANGE.DEFAULT.amount}
                          {rules.fr.DATECHANGE.BEFORE_DEPARTURE &&
                            rules.fr.DATECHANGE.BEFORE_DEPARTURE.amount}
                        </td>
                        <td>
                          {rules.fr.DATECHANGE.DEFAULT &&
                            formatPolicyInfo(
                              rules.fr.DATECHANGE.DEFAULT.policyInfo
                            )
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                          {rules.fr.DATECHANGE.BEFORE_DEPARTURE &&
                            rules.fr.DATECHANGE.BEFORE_DEPARTURE.policyInfo}
                        </td>
                      </tr>
                      {/* {renderFareComponents(rules.fr.DATECHANGE.DEFAULT.fcs)} */}
                    </>
                  )}

                  {rules.fr && rules.fr.CANCELLATION && (
                    <>
                      <tr>
                        <td>CANCELLATION</td>
                        <td>
                          {rules.fr.CANCELLATION.DEFAULT &&
                            rules.fr.CANCELLATION.DEFAULT.amount}
                          {rules.fr.CANCELLATION.BEFORE_DEPARTURE &&
                            rules.fr.CANCELLATION.BEFORE_DEPARTURE.amount}
                        </td>
                        <td>
                          {rules.fr.CANCELLATION.DEFAULT &&
                            formatPolicyInfo(
                              rules.fr.CANCELLATION.DEFAULT.policyInfo
                            )
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                          {rules.fr.CANCELLATION.BEFORE_DEPARTURE &&
                            rules.fr.CANCELLATION.BEFORE_DEPARTURE.policyInfo}
                        </td>
                      </tr>
                      {/* {renderFareComponents(rules.fr.DATECHANGE.DEFAULT.fcs)} */}
                    </>
                  )}

                  {rules.fr && rules.fr.NO_SHOW && (
                    <>
                      <tr>
                        <td>NO SHOW</td>
                        <td>
                          {rules.fr.NO_SHOW.DEFAULT &&
                            rules.fr.NO_SHOW.DEFAULT.amount}
                          {rules.fr.NO_SHOW.BEFORE_DEPARTURE &&
                            rules.fr.NO_SHOW.BEFORE_DEPARTURE.amount}
                        </td>
                        <td>
                          {rules.fr.NO_SHOW.DEFAULT &&
                            formatPolicyInfo(
                              rules.fr.NO_SHOW.DEFAULT.policyInfo
                            )
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                          {rules.fr.NO_SHOW.BEFORE_DEPARTURE &&
                            rules.fr.NO_SHOW.BEFORE_DEPARTURE.policyInfo}
                        </td>
                      </tr>
                      {/* {renderFareComponents(rules.fr.DATECHANGE.DEFAULT.fcs)} */}
                    </>
                  )}

                  {rules.fr && rules.fr.SEAT_CHARGEABLE && (
                    <>
                      <tr>
                        <td>SEAT CHARGEABLE</td>
                        <td>
                          {rules.fr.SEAT_CHARGEABLE.DEFAULT &&
                            rules.fr.SEAT_CHARGEABLE.DEFAULT.amount}
                          {rules.fr.SEAT_CHARGEABLE.BEFORE_DEPARTURE &&
                            rules.fr.SEAT_CHARGEABLE.BEFORE_DEPARTURE.amount}
                        </td>
                        <td>
                          {rules.fr.SEAT_CHARGEABLE.DEFAULT &&
                            formatPolicyInfo(
                              rules.fr.SEAT_CHARGEABLE.DEFAULT.policyInfo
                            )
                              .split("\n")
                              .map((line, index) => (
                                <React.Fragment key={index}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                          {rules.fr.SEAT_CHARGEABLE.BEFORE_DEPARTURE &&
                            rules.fr.SEAT_CHARGEABLE.BEFORE_DEPARTURE
                              .policyInfo}
                        </td>
                      </tr>
                      {/* {renderFareComponents(rules.fr.DATECHANGE.DEFAULT.fcs)} */}
                    </>
                  )}
                  {/* Add more rows for other rule types as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {idx === flight.ResultIndex ? (
        <div className="detailDiv">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Flight Information"
                    value="1"
                    sx={{
                      fontSize: "16px",
                      paddingRight: "15px",
                      fontSize: "12px",
                    }}
                    className="tabFlightData"
                  />
                  <Tab
                    label="Fare Details And Rules"
                    value="2"
                    sx={{
                      fontSize: "16px",
                      paddingRight: "15px",
                      marginLeft: "25px",
                      fontSize: "12px",
                    }}
                  />
                  <Tab
                    label="Baggage Information"
                    value="3"
                    sx={{
                      fontSize: "16px",
                      paddingRight: "15px",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  />
                  <Tab
                    label="Cancellation And Change Rules"
                    value="4"
                    sx={{
                      fontSize: "16px",
                      paddingRight: "15px",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1" style={{ padding: "5px" }}>
                <div className="block-content-2 custom_block_content">
                  <div className="box-result custom_box_result">
                    <div className="flight_tags depart_tags">
                      <span style={{ zIndex: 2 }}>Departure</span>
                    </div>
                    {flight.Segments[0].map((e, indexx) => (
                      <div key={indexx} style={{ marginBlock: "10px" }}>
                        <div className="FlightInfoDetailsMain">
                          <p className="flightInfoDetailsPara">
                            {e.Origin.Airport.AirportCode} →{" "}
                            {e.Destination.Airport.AirportCode}
                          </p>
                          <img
                            src={arrowForward}
                            alt=""
                            className="flightInfoImageMain"
                          />
                          <p className="flightInfoDetailsPara">
                            {e.Airline.AirlineCode}-{e.Airline.FlightNumber}
                          </p>
                        </div>
                        <div className="flightInforDetailsMain2">
                          <div
                            className="imgdiv"
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              width: "15%",
                            }}
                          >
                            <img
                              src={`/Images/AirlineLogo/${e.Airline.AirlineCode}.gif`}
                              alt=""
                              className="flightInfoImagetag"
                            />
                            <div className="flightInfoDivtag1">
                              <p
                                className="flightInfoDivPara1"
                                style={{ margin: "0px" }}
                              >
                                {e.Airline.AirlineName}
                              </p>
                              <p className="flightInfoPara4">
                                {e.Airline.FlightNumber}
                              </p>
                            </div>
                          </div>
                          <div className="flightInfoMainDiv2">
                            <p className="flightInfoPara2">
                              {new Date(e.Origin.DepTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </p>
                            <p className="flightInfoPara3">
                              {e.Origin.Airport.CityName}{" "}
                              {new Date(e.Origin.DepTime).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                            <p className="flightInfoPara4">
                              {formatTime(e.Origin.DepTime)}
                            </p>
                            {e.Origin.Airport.Terminal && (
                              <p className="flightInfoPara4">
                                Terminal - {e.Origin.Airport.Terminal}
                              </p>
                            )}
                          </div>
                          <div className="flightInfoMainDiv5">
                            <img
                              src={clock}
                              alt=""
                              className="flightInfoImage2"
                            />
                            <p className="flightInfoPara12">{e.Duration} m</p>
                          </div>
                          <div
                            className="flightInfoMainDiv2"
                            //  style={{ marginLeft: "180px", paddingTop: "0px" }}
                          >
                            <p className="flightInfoPara2">
                              {" "}
                              {new Date(
                                e.Destination.ArrTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })}
                            </p>
                            <p className="flightInfoPara3">
                              {" "}
                              {e.Destination.Airport.CityName}{" "}
                              {new Date(
                                e.Destination.ArrTime
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            <p className="flightInfoPara4">
                              {formatTime(e.Destination.ArrTime)}
                            </p>
                            {e.Destination.Airport.Terminal && (
                              <p className="flightInfoPara4">
                                Terminal - {e.Destination.Airport.Terminal}
                              </p>
                            )}
                          </div>
                        </div>
                        {indexx < flight.Segments[0].length - 1 && (
                          // <div className="inner_booking">
                          <div
                            className="layover_time"
                            style={{ marginBlock: "20px" }}
                          >
                            <div className="layover_txt">
                              Layover:
                              <span>
                                {formatLayoverTime(
                                  e.Destination.ArrTime,
                                  flight.Segments[0][indexx + 1].Origin.DepTime
                                )}
                              </span>
                            </div>
                          </div>
                          // </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {flight.Segments[1] && (
                  <div className="block-content-2 custom_block_content">
                    <div className="box-result custom_box_result">
                      <div className="flight_tags depart_tags">
                        <span style={{ zIndex: 2 }}>Return</span>
                      </div>
                      {flight.Segments[1] &&
                        flight.Segments[1].map((e, indexx) => (
                          <div key={indexx} style={{ marginBlock: "10px" }}>
                            <div className="FlightInfoDetailsMain">
                              <p className="flightInfoDetailsPara">
                                {e.Origin.Airport.AirportCode} →{" "}
                                {e.Destination.Airport.AirportCode}
                              </p>
                              <img
                                src={arrowForward}
                                alt=""
                                className="flightInfoImageMain"
                              />
                              <p className="flightInfoDetailsPara">
                                {e.Airline.AirlineCode}-{e.Airline.FlightNumber}
                              </p>
                            </div>
                            <div className="flightInforDetailsMain2">
                              <div
                                className="imgdiv"
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  width: "15%",
                                }}
                              >
                                <img
                                  src={`/Images/AirlineLogo/${e.Airline.AirlineCode}.gif`}
                                  alt=""
                                  className="flightInfoImagetag"
                                />
                                <div className="flightInfoDivtag1">
                                  <p
                                    className="flightInfoDivPara1"
                                    style={{ margin: "0px" }}
                                  >
                                    {e.Airline.AirlineName}
                                  </p>
                                  <p className="flightInfoPara4">
                                    {e.Airline.FlightNumber}
                                  </p>
                                </div>
                              </div>
                              <div className="flightInfoMainDiv2">
                                <p className="flightInfoPara2">
                                  {new Date(
                                    e.Origin.DepTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })}
                                </p>
                                <p className="flightInfoPara3">
                                  {e.Origin.Airport.CityName}{" "}
                                  {new Date(
                                    e.Origin.DepTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                                <p className="flightInfoPara4">
                                  {formatTime(e.Origin.DepTime)}
                                </p>
                                {e.Origin.Airport.Terminal && (
                                  <p className="flightInfoPara4">
                                    Terminal - {e.Origin.Airport.Terminal}
                                  </p>
                                )}
                              </div>
                              <div className="flightInfoMainDiv5">
                                <img
                                  src={clock}
                                  alt=""
                                  className="flightInfoImage2"
                                />
                                <p className="flightInfoPara12">
                                  {e.Duration} m
                                </p>
                              </div>
                              <div
                                className="flightInfoMainDiv2"
                                //  style={{ marginLeft: "180px", paddingTop: "0px" }}
                              >
                                <p className="flightInfoPara2">
                                  {" "}
                                  {new Date(
                                    e.Destination.ArrTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  })}
                                </p>
                                <p className="flightInfoPara3">
                                  {" "}
                                  {e.Destination.Airport.CityName}{" "}
                                  {new Date(
                                    e.Destination.ArrTime
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                                <p className="flightInfoPara4">
                                  {formatTime(e.Destination.ArrTime)}
                                </p>
                                {e.Destination.Airport.Terminal && (
                                  <p className="flightInfoPara4">
                                    Terminal - {e.Destination.Airport.Terminal}
                                  </p>
                                )}
                              </div>
                            </div>
                            {indexx < flight.Segments[1].length - 1 && (
                              // <div className="inner_booking">
                              <div
                                className="layover_time"
                                style={{ marginBlock: "20px" }}
                              >
                                <div className="layover_txt">
                                  Layover:
                                  <span>
                                    {formatLayoverTime(
                                      e.Destination.ArrTime,
                                      flight.Segments[1][indexx + 1].Origin
                                        .DepTime
                                    )}
                                  </span>
                                </div>
                              </div>
                              // </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </TabPanel>
              <TabPanel value="2">
                <div className="flightInfoMainDiv6 d-flex">
                  <div className="flightInfoInnerDiv6">
                    <div
                      className="flightInfoInnerInnerDiv"
                      style={{ border: "none", flexWrap: "wrap" }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="flightInfoPara7">Adult</p>
                        <p>{flight.FareBreakdown[0].PassengerCount}</p>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="flightInfoPara7">Base Fare</p>
                        <p>₹{Math.round(flight.FareBreakdown[0].BaseFare)}</p>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="flightInfoPara7">Tax</p>
                        <p>₹{Math.round(flight.FareBreakdown[0].Tax)}</p>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p className="flightInfoPara7">Total</p>
                        <b>
                          ₹
                          {Math.round(
                            flight.FareBreakdown[0].BaseFare +
                              flight.FareBreakdown[0].Tax
                          )}
                        </b>
                      </div>
                    </div>
                    {flight.FareBreakdown[1] && (
                      <div
                        className="flightInfoInnerInnerDiv"
                        style={{ border: "", flexWrap: "wrap" }}
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="flightInfoPara7">Child</p>
                          <p>{flight.FareBreakdown[1].PassengerCount}</p>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="flightInfoPara7">Base Fare</p>
                          <p>₹{Math.round(flight.FareBreakdown[1].BaseFare)}</p>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="flightInfoPara7">Tax</p>
                          <p>₹{Math.round(flight.FareBreakdown[1].Tax)}</p>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="flightInfoPara7">Total</p>
                          <b>
                            ₹
                            {Math.round(
                              flight.FareBreakdown[1].BaseFare +
                                flight.FareBreakdown[1].Tax
                            )}
                          </b>
                        </div>
                      </div>
                    )}
                    {flight.FareBreakdown[2] && (
                      <div
                        className="flightInfoInnerInnerDiv"
                        style={{ border: "", flexWrap: "wrap" }}
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="flightInfoPara7">Infant</p>
                          <p>{flight.FareBreakdown[2].PassengerCount}</p>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="flightInfoPara7">Base Fare</p>
                          <p>₹{Math.round(flight.FareBreakdown[2].BaseFare)}</p>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="flightInfoPara7">Tax</p>
                          <p>₹{Math.round(flight.FareBreakdown[2].Tax)}</p>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="flightInfoPara7">Total</p>
                          <b>
                            ₹
                            {Math.round(
                              flight.FareBreakdown[2].BaseFare +
                                flight.FareBreakdown[2].Tax
                            )}
                          </b>
                        </div>
                      </div>
                    )}
                    <div className="flightInfoMainInner1">
                      <p className="flightInfoPara8">Total (Base Fare)</p>
                      <p className="flightInfoPara9">
                        {/* {flight.Fare.Currency} */}₹
                        {Math.round(flight.Fare.BaseFare)}
                      </p>
                    </div>
                    <div className="flightInfoMainDivInner4">
                      <p className="flightInfoPar10">Total Tax</p>
                      <p className="flightInfoPara9">
                        {/* {flight.Fare.Currency}  */}₹
                        {Math.round(flight.Fare.Tax)}
                      </p>
                    </div>
                    <div className="flightInfoMainInner1">
                      <p className="flightInfoPara8">Total (Fee + Surcharge)</p>
                      <p className="flightInfoPara9">
                        {/* {flight.Fare.Currency}  */}₹
                        {Math.round(flight.Fare.PublishedFare)}
                      </p>
                    </div>
                  </div>
                  <div className="flightInfoMainDiv15">
                    <h3>Terms & Conditions: </h3>
                    <div>
                      {SrdvIndex === "SrdvTJ" && (
                        <div>{renderFareRulesForSrdvTJ()}</div>
                      )}

                      {SrdvIndex === "SrdvP" && (
                        <div
                          className="left_gtk"
                          style={{
                            maxHeight: "300px",
                            overflow: "auto",
                            scrollbarWidth: "thin",
                            paddingRight: "10px",
                          }}
                        >
                          <div>
                            <div
                              dangerouslySetInnerHTML={{ __html: fareRules }}
                            />
                          </div>
                        </div>
                      )}

                      {SrdvIndex !== "SrdvP" &&
                        SrdvIndex !== "SrdvTJ" &&
                        fareRules && (
                          <ul>
                            {SrdvIndex !== "SrdvP" &&
                              SrdvIndex !== "SrdvTJ" &&
                              fareRules &&
                              fareRules.map((item, index) => (
                                <li key={index} className="m-info-tips2_item">
                                  <p className="txt-sb">{item}</p>
                                </li>
                              ))}
                          </ul>
                        )}
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="3">
                {/* <Container> */}

                <div className="flightInfortabPanel1">
                  <Row
                    style={{
                      margin: "0px",
                      borderBottom: "1px solid #80808036",
                      alignItems: "center",
                    }}
                  >
                    {/* <div className='flightInfoPanel2'> */}
                    <Col>
                      {/* <div className='flightInfoPanel3'> */}
                      <p>Airline</p>
                      {/* </div> */}
                    </Col>
                    <Col>
                      {/* <div className='flightInfoPanel3'> */}
                      <p>Check-in Baggage</p>
                      {/* </div> */}
                    </Col>
                    <Col>
                      {/* <div className='flightInfoPanel4'> */}
                      <p>Cabin Baggage</p>
                      {/* </div> */}
                    </Col>
                    {/* </div> */}
                  </Row>
                  <Row
                    style={{
                      margin: "0px",
                      marginBottom: "5px",
                      border: "1px solid #80808036",
                      alignItems: "center",
                    }}
                  >
                    {/* <div className='flightInfoPanel5'> */}
                    <Col>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          gap: "5px",
                          padding: "5px",
                          alignItems: "center",
                          justifyContent: "start",
                        }}
                      >
                        <img
                          src="https://airhex.com/images/airline-logos/indigo.png"
                          alt=""
                          className="flightInfoPanelImage"
                        />
                        <div className="flightInfoPara9">
                          <p style={{ fontSize: "13px" }}>
                            {flight.Segments[0][0].Airline.AirlineName}
                          </p>
                          <p style={{ fontSize: "12px", lineHeight: "0cm" }}>
                            {flight.Segments[0][0].Airline.FlightNumber}
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      {/* <div className='flightInfoPara7'> */}
                      <p>{flight.Segments[0][0].Baggage}</p>
                      {/* </div> */}
                    </Col>
                    <Col>
                      {/* <div className='flightInfoPanel8'> */}
                      <p>{flight.Segments[0][0].CabinBaggage}</p>
                      {/* </div> */}
                    </Col>

                    {/* </div> */}
                  </Row>
                  <div className="flightInfoPanel9">
                    <ul className="flightInfoPanel0">
                      <li className="flightInforUnderList">
                        <HiMiniHandThumbUp className="icons" />
                        Baggage information mentioned above is obtained from
                        airline's reservation system, SkyPort Destinationsdoes
                        not guarantee the accuracy of this information.
                      </li>
                      <li className="flightInforUnderList">
                        <HiMiniHandThumbUp className="icons" />
                        The baggage allowance may vary according to stop-overs,
                        connecting flights. changes in airline rules. etc.
                      </li>
                    </ul>
                  </div>
                </div>
                {/* </Container> */}
              </TabPanel>
              <TabPanel value="4">
                <div className="flightInfoMainDiv8" style={{ padding: "10px" }}>
                  <h3 className="flightInfoPara9">Terms & Conditions</h3>

                  {SrdvIndex === "SrdvTJ" && (
                    <div>{renderFareRulesForSrdvTJ()}</div>
                  )}

                  {SrdvIndex === "SrdvP" && (
                    <div
                      className="left_gtk"
                      style={{
                        maxHeight: "300px",
                        overflow: "auto",
                        scrollbarWidth: "thin",
                        paddingRight: "10px",
                      }}
                    >
                      <div>
                        <div dangerouslySetInnerHTML={{ __html: fareRules }} />
                      </div>
                    </div>
                  )}

                  {SrdvIndex !== "SrdvP" &&
                    SrdvIndex !== "SrdvTJ" &&
                    fareRules && (
                      <div>
                        <ul style={{ marginLeft: "28px" }}>
                          {SrdvIndex !== "SrdvP" &&
                            SrdvIndex !== "SrdvTJ" &&
                            fareRules &&
                            fareRules.map((item, index) => (
                              <li key={index} className="m-info-tips2_item">
                                <p className="txt-sb">{item}</p>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      ) : null}
    </>
  );
};
