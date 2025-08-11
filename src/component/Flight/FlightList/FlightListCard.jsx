import React, { useState } from "react";
import { Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FlightListInfo } from "./FlightListInfo";

const FlightListCard = ({
  e,
  handleMoreFare,
  handleClick,
  activeId,
  showModal,
  setShowModal,
  formatTime,
  handlebookmodal,
  handleChnageCurrency,
  fareRules,
  handleClickPhone,
  activeFlightId,
  key,
}) => {
  const index = encodeURIComponent(e.ResultIndex);
  const SrdvIndex = e.SrdvIndex ? encodeURIComponent(e.SrdvIndex) : null;

  // console.log("farerules2", fareRules);
  let url = `/flight-detail/${index}/null`;
  if (SrdvIndex) url += `/${SrdvIndex}`;
  const [selected, setSelected] = useState("fr10"); // initially checked

  const handleClicksss = (id) => {
    setSelected((prev) => (prev === id ? null : id)); // toggle if same
  };
  return (
    <>
      <Card
        style={{
          marginBottom: "15px",
          // , display: e.SrdvIndex==="SrdvTJ" && "none"
        }}
        className="card_styling_flight_listt"
      >
        <Card.Body style={{ padding: "0px" }}>
          <Row style={{ margin: "0px", padding: "0px" }}>
            <div key={e.ResultIndex} style={{ width: "100%", padding: "0px" }}>
              <div key={e.ResultIndex} className="flightDetailDiv">
                <div className="deal">
                  <div className="deal-wrap">
                    <div className="deal-tag fs-10 bold pr v-aligm-m i-b mr-8">
                      DEAL
                    </div>
                    <div className="content i-b v-aligm-m font-lightgrey fs-12">
                      Avail Upto 20% OFF on ICICI Bank Debit Card. Use Code -
                      TGOICIDC
                    </div>
                  </div>
                </div>

                <Row
                  style={{
                    margin: "0px",
                    padding: "0px",
                    marginBottom: 5,
                  }}
                >
                  <div className="flightDetails">
                    <div className="flightImage">
                      <img
                        src={`/Images/AirlineLogo/${e.Segments[0][0].Airline.AirlineCode}.gif`}
                        alt=""
                      />
                      <div className="flightInerPhotoComp">
                        <p style={{ marginBottom: 0 }}>
                          {e.Segments[0][0].Airline.AirlineName}{" "}
                          {e.Segments[0][0].Airline.FlightNumber}
                        </p>
                        {/* <p className="flightBookingDetailslightNumer">{e.flightNumber}</p> */}
                        <p className="flightBookingDetailPrice">
                          ₹{Math.round(e.Fare.PublishedFare)}
                        </p>
                      </div>
                    </div>
                    <div className="flightDetailsDepartureDetails">
                      <div className="departDetails">
                        <p>
                          {new Date(
                            e.Segments[0][0].Origin.DepTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </p>
                        <p>{e.Segments[0][0].Origin.Airport.CityName}</p>
                      </div>
                      <div className="durationDetails">
                        <p>{e.Segments[0][0].Duration} m</p>
                        <div className="arrow-md-lm flightHorizontal" />
                        <p style={{ textWrap: "nowrap" }}>
                          {/* {e.flightType} */}
                          {e.Segments[0].length - 1 == 0
                            ? "Non-Stop"
                            : `${e.Segments[0].length - 1} Stops`}
                        </p>
                      </div>
                      <div className="arriveDetails">
                        <p>
                          {new Date(
                            e.Segments[0][
                              e.Segments[0].length - 1
                            ].Destination.ArrTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </p>
                        <p>
                          {
                            e.Segments[0][e.Segments[0].length - 1].Destination
                              .Airport.CityName
                          }
                        </p>
                      </div>
                    </div>
                    <div className="priceDetails">
                      <div style={{ display: "flex" }}>
                        {/* <img
                                  height="15px"
                                  width="15px"
                                  style={{ marginTop: "22px" }}
                                  src={rupee}
                                  alt=""
                              /> */}
                        <p>
                          {/* <FaRupeeSign /> */}₹
                          {Math.round(e.Fare.PublishedFare)}
                        </p>
                      </div>
                      {e.IsUpsellAllowed === true && (<button
                        className="flightBookingMoreFare"
                        onClick={() => handleMoreFare(e.ResultIndex)}
                      >
                        + More Fare
                      </button>)}
                      
                    </div>
                    <Link
                      to={url}
                      // to={{
                      //   pathname: "/flight-detail",
                      //   state: { flightdetails: e },
                      // }}
                      // onClick={()=>handlebooknow()}
                      className="FlightBookingLinkTag"
                    >
                      {" "}
                      <button className="bookButton">BOOK NOW</button>
                    </Link>
                  </div>
                </Row>
                {/* <Row style={{ margin: "0px", padding: "0px" }}>
                <div className="offPriceDiv">
                <p style={{ color: "black" }}>
                  Use Promo code: EASEFLY to get ₹300
                instant discount on
                  this flight
                </p>
              </div>
              </Row> */}
                {/* <Row>
             <div
  className="full-str ng-binding"
  style={{
    padding: "3px 6px",
    color: "#3a3a3a",
    fontSize: 13,
    background: "#fffbed",
    float: "left",
    width: "auto",
    margin: "0 0 7px 15px",
    border: 0,
    borderLeft: "3px solid #efdc9c"
  }}
  id="divNote1"
  ng-show="s.lstFr[0].IST==false && s.lstFr[0].ICPS==false && IsGroupQuery==false"
  ng-bind="s.lstFr[0].Nt"
>
  BOOKNOW: Get extra Rs.310 instant discount on this flight
</div>

             </Row> */}
                <Row style={{ margin: "0px", padding: "0px" }}>
                  <div className="lastDetailDiv">
                    <p
                      onClick={() => {
                        handleClick(e.ResultIndex, e.SrdvIndex);
                      }}
                      style={{ width: "max-content" }}
                    >
                      Flight Detail
                    </p>
                  </div>
                </Row>
              </div>

              {activeId === e.ResultIndex && (
                <FlightListInfo
                  idx={e.ResultIndex}
                  flight={e}
                  handleChnageCurrency={handleChnageCurrency}
                  fareRules={fareRules}
                  SrdvIndex={e.SrdvIndex}
                />
              )}
            </div>
          </Row>
        </Card.Body>

        {showModal === e.ResultIndex && (
          <div
            id="modal-newb2b"
            className="ng-scope"
            style={{ display: "block" }}
          ></div>
        )}

        {showModal === e.ResultIndex && (
          <div
            id="frOption0"
            className="modal-newb2b sidenav morefarediv"
            style={{
              display: "block",
              width: "100%",
            }}
          >
            <div className="modal-content-newb2b">
              <div className="_lopogt_nhy flx">
                <div className="_lopogt">
                  <div className="_newrthed">More Fare Options Available</div>
                </div>
                <div className="_clouse" onClick={() => setShowModal(false)}>
                  <span className="close-newb2b">✖</span>
                </div>
              </div>

              <div className="_nhty flx">
                <div className="_newdiv-left">
                  <div className="_flitdetls">
                    <div className="flx _bgcls acntr">
                      <div className="_airlilogo">
                        <img
                          src="https://flight.easemytrip.com/Content/AirlineLogon/AI.png"
                          alt="airline"
                        />
                      </div>
                      <div className="_detislsnp">
                        <span>
                          {e.Segments[0][0].Origin.Airport.CityName} -{" "}
                          {e.Segments[0][0].Destination.Airport.CityName}
                        </span>{" "}
                        {e.Segments[0][0].Airline.AirlineName}•{" "}
                        {formatTime(e.Segments[0][0].Origin.DepTime)} •
                        Departure at{" "}
                        <strong>
                          {new Date(
                            e.Segments[0][0].Origin.DepTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </strong>{" "}
                        - Arrival at{" "}
                        <strong>
                          {new Date(
                            e.Segments[0][0].Destination.ArrTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </strong>
                      </div>
                      <div
                        className="_onwdr marg-left"
                        style={{ display: "none" }}
                      >
                        Onward Trip
                      </div>
                      <div className="_fltDtlsd" style={{ display: "none" }}>
                        Flight Details <i className="dwnarrowfl"></i>
                      </div>
                    </div>
                  </div>

                  <div className="_bxses">
                    <div className="al_flx_opt">
                      <label className="ng-scope">
                        <div className="pls_bxs f_bx lun frOUT actve">
                          <div className="upr_sctn">
                            <div className="flx_p">
                              <div className="dtl_plus">
                                <div className="optn_head">
                                  <span>Regular</span>
                                </div>
                                <div className="fflx acntr">
                                  <div className="prce_mn ng-binding">
                                    {/* <FaRupeeSign /> */}
                                    {/* {e.Fare.Currency} */}₹{" "}
                                    {Math.round(e.Fare.PublishedFare)}
                                  </div>
                                  <div className="clr"></div>
                                </div>
                                {/* <span className="discbxd ng-binding">
                                Get Rs.1750 OFF with BOOKNOW
                              </span> */}
                              </div>
                              <div className="slct_optn">
                                <label className="conta-radio">
                                  <input
                                    type="radio"
                                    className="ddsd"
                                  
                                  
                                  />
                                  <span className="checkk-radio"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="faclty">
                            <div className="_fcltechdt fflx fjsb">
                              <i>
                                <img
                                  src="https://flight.easemytrip.com/Content/img/more-fare/bageicn.svg"
                                  alt="baggage"
                                />
                              </i>
                              <div className="_dsrcp_rpt fclm">
                                <div className="_tpbldtle">Baggage</div>
                                <ul>
                                  <li className="_cabinfcnl">
                                    <strong>
                                      {e.Segments[0][0].CabinBaggage}
                                    </strong>{" "}
                                    Cabin Baggage
                                  </li>
                                  <li className="_cabinfcnl">
                                    <strong>{e.Segments[0][0].Baggage}</strong>
                                    <span>Check-in Baggage</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="_fcltechdt fflx fjsb">
                              <i>
                                <img
                                  src="https://flight.easemytrip.com/Content/img/more-fare/flxicn.svg"
                                  alt="flexibility"
                                />
                              </i>
                              <div className="_dsrcp_rpt fclm">
                                <div className="_tpbldtle">Changeability</div>
                                <ul>
                                  <li className="_cabinfcnl">
                                    Cancellation fee starts at{" "}
                                    <strong>
                                      ₹ {handleChnageCurrency("2500")}
                                    </strong>
                                  </li>
                                  <li className="_cabinfcnl">
                                    Date Change fee starts at{" "}
                                    <strong>
                                      ₹ {handleChnageCurrency("2750")}
                                    </strong>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {e.IsRefundable && (
                              <div className="_rfndle _rfndle">Refundable</div>
                            )}
                          </div>
                          <div className="al_flx_opt pd15 slect-bttn-out">
                            <div className="sclt_bt hd2 sclted_bt chu2">
                              <a href="#">Selected</a>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="_btmftrdv">
                <div className="_emtfxder">
                  <div className="_btnm flx acntr jsb">
                    <div className="_nhyuop">
                      <div className="_prgty">Grand Total</div>
                      <div className="_finpric f30">
                        <span>
                          ₹ {Math.round(e.Fare.PublishedFare)}
                        </span>
                      </div>
                    </div>
                    <div
                      className="book-bt-nwap marg-left"
                      onClick={() => handlebookmodal(url)}
                    >
                      Book Now
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
      <div className="ng-scope flight_list_TG_phone">
        <div
          className="fltResult"
          og="DEL"
          ds="BOM"
          arrtm="23:30"
          deptm="17:45"
          fn={6829}
          stop={1}
          price={5820}
          aircode="6E"
        >
          <div className="fligt-cntnr">
            <div className="adodis ng-binding ng-hide" id="sCTUP1">
              <img
                src="https://flight.EaseMyTrip.com/Content/img/discount-icon.svg"
                alt="Discount"
              />
            </div>

            <div className="ctr-dv" ng-click="GetMoreFare(segID,s)">
              <Link className="managlist1" to={url}>
                <div className="fl_logo">
                  <div ng-if="isDomestic" className="ng-scope">
                    <img
                      src={`/Images/AirlineLogo/${e.Segments[0][0].Airline.AirlineCode}.gif`}
                      alt="airline"
                      style={{ width: 30, borderRadius: 5 }}
                    />
                  </div>
                </div>
                <div>
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
                </div>
                <div className="fl_info_col">
                  <div className="duratn-bdr text-center append_bottom10">
                    <span className="gray_dot--solid sml-dot-l" />

                    <span className="text_gray text-center ng-binding">
                      {e.Segments[0][0].Duration} m
                    </span>

                    <span className="gray_dot--solid sml-dot-r" />
                  </div>

                  <p className="text_gray_n text-center ng-scope">
                    {e.Segments[0].length - 1 == 0
                      ? "Non-Stop"
                      : `${e.Segments[0].length - 1} Stops`}
                  </p>
                </div>
                <div>
                  <span className="fl_arive ng-binding">
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
                </div>
                <div className="fl_cost">
                  <span className="ti_prc ng-scope" ng-if="IsGroupQuery==false">
                    <i className="CurrncyCD_Rs ttl_b_amt" />

                    <span
                      className="ttl_b_amt ng-binding ng-scope"
                      id="spnPrice1"
                    >
                      {Math.round(e.Fare.PublishedFare)}
                    </span>
                  </span>

                  <div className="clr" />
                </div>
              </Link>
              <hr style={{ margin: "0px", border: "0.6px solid #b4b3b3" }} />
              <div className="flight_light_inner_phone">
                <div>
                  <p className="phone_flight_innerp">
                    {" "}
                    {e.Segments[0][0].Airline.AirlineName}
                  </p>
                  <p className="phone_flight_innerp2">
                    {" "}
                    {e.Segments[0][0].Airline.AirlineCode}-
                    {e.Segments[0][0].Airline.FlightNumber}
                  </p>
                </div>
                <div style={{ textAlign: "end" }}>
                  <a
                    className="mfrebtn morebuttonlist ng-scope"
                    onClick={() => {
                      handleClickPhone(e.ResultIndex, e.SrdvIndex);
                    }}
                  >
                    {" "}
                    {activeFlightId === e.ResultIndex
                      ? " - Less Fare"
                      : "+ More Fare"}
                  </a>
                  <p style={{ color: "#4CAF50",fontSize:'10px',fontWeight:'500' }}>
                    Get Rs 200 Off | code BOOKNOW
                  </p>
                </div>
              </div>
              {/* <a
                  className="mfrebtn morebuttonlist ng-scope"
                  id="divMoreFare0"
                  style={{ display: "block", marginTop: 0 }}
                  onClick={()=>setActiveFlight(!activeFlight)}
                >
                 {activeFlight ? " - Less Fare" : "+ More Fare"}
                </a>

                

           
                <div
                  style={{
                    float: "right",
                    fontSize: 9,
                    fontWeight: 600,
                    background: "#fcf8e3",
                    borderRadius: 20,
                    padding: "2px 5px",
                    marginLeft: 8,
                    color: "#8a6d3b",
                    display: "block",
                    marginTop: 3,
                    marginBottom: 3,
                  }}
                  className="ng-binding ng-scope"
                />

                <div className="clr" />

                <div
                  style={{
                    fontSize: "9.5px",
                    padding: "3px 2px",
                    color: "#3a3a3a",
                    background: "#fdecd6",
                    marginTop: 7,
                    textAlign: "left",
                    float: "left",
                    borderLeft: "3px solid #fdd19f",
                  }}
                  id="divNote1"
                  className="ng-binding ng-scope"
                >
                  BOOKNOW: Get extra Rs.310 instant discount on this flight
                </div> */}
            </div>

            <div className="clr" />

            {activeFlightId === e.ResultIndex && (
              <div
                className="corulmain multifr"
                id="frOption0"
                style={{ display: "block" }}
              >
                <div className="corboxuli ng-scope">
                  <label className="container-heduredi">
                    <div className="mobli">
                      <div className="heduredi">
                        <div className="nw-far-oth  ng-binding">
                          {e.ResultFareType}
                          {/* <input
                          type="radio"
                         
                          
                          id="fr10"
                          name="fr1"
                          className="ng-scope"
                          defaultChecked="checked"
                        /> */}
                          <input
                            type="radio"
                            id="fr10"
                            name="fr1"
                            checked={selected === "fr10"}
                            onChange={() => handleClicksss("fr10")}
                            className="ng-scope"
                          />

                          <span className="checkmark-heduredi" />
                        </div>
                      </div>

                      <ul>
                        <li>
                          <div className="mbflex">
                            <div className="iconColm">
                              <img src="https://flight.EaseMyTrip.com/content/img/cabin-baggage.svg" />
                            </div>
                            <div className="calwid">
                              <span className="ftn11_mf">Cabin Bag : </span>

                              <span className="sbdtl_mf ng-scope">
                                {e.Segments[0][0].CabinBaggage}
                              </span>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="mbflex">
                            <div className="iconColm">
                              <img src="https://flight.EaseMyTrip.com/content/img/checkin-baggage.svg" />
                            </div>
                            <div className="calwid">
                              <span className="ftn11_mf">Check in : </span>
                              <span className="sbdtl_mf ng-binding">
                                {e.Segments[0][0].Baggage}
                              </span>
                            </div>
                          </div>
                        </li>
                        {/* <li>
                        <div className="mbflex">
                          <div className="iconColm">
                            <img src="https://flight.EaseMyTrip.com/content/img/cancellation-icon.svg" />
                          </div>
                          <div className="calwid">
                            <span className="ftn11_mf">Cancellation : </span>

                            <span className="sbdtl_mf ng-binding ng-scope">
                              Rs 3209 onwards
                            </span>
                          </div>
                        </div>
                      </li> */}
                        {/* <li>
                        <div className="mbflex">
                          <div className="iconColm">
                            <img src="https://flight.EaseMyTrip.com/content/img/calendar-icon.svg" />
                          </div>
                          <div className="calwid">
                            <span className="ftn11_mf">Date Change : </span>

                            <span className="sbdtl_mf ng-binding ng-scope">
                              Rs 2999 onwards
                            </span>
                          </div>
                        </div>
                      </li> */}

                        {/* <li style={{ display: "none" }}>
                        <div className="mbflex ng-scope" ng-repeat="f in fr.fb">
                          <div className="iconColm">
                            <img src="https://flight.easemytrip.com/content/img/refund-icon-nw.svg" />
                          </div>
                          <div className="calwid">
                            <span className="ftn11_mf">Date Change : </span>
                            <span className="sbdtl_mf ng-binding">
                              Rs 2999 onwards
                            </span>
                          </div>
                        </div>

                        <div className="mbflex ng-scope" ng-repeat="f in fr.fb">
                          <div className="iconColm">
                            <img src="https://flight.easemytrip.com/content/img/refund-icon-nw.svg" />
                          </div>
                          <div className="calwid">
                            <span className="ftn11_mf">Date Change : </span>
                            <span className="sbdtl_mf ng-binding">
                              Rs 2999 onwards
                            </span>
                          </div>
                        </div>

                        <div className="mbflex ng-scope" ng-repeat="f in fr.fb">
                          <div className="iconColm">
                            <img src="https://flight.easemytrip.com/content/img/refund-icon-nw.svg" />
                          </div>
                          <div className="calwid">
                            <span className="ftn11_mf">Date Change : </span>
                            <span className="sbdtl_mf ng-binding">
                              Rs 2999 onwards
                            </span>
                          </div>
                        </div>

                        <div className="mbflex ng-scope" ng-repeat="f in fr.fb">
                          <div className="iconColm">
                            <img src="https://flight.easemytrip.com/content/img/refund-icon-nw.svg" />
                          </div>
                          <div className="calwid">
                            <span className="ftn11_mf">Date Change : </span>
                            <span className="sbdtl_mf ng-binding">
                              Rs 2999 onwards
                            </span>
                          </div>
                        </div>
                      </li> */}
                      </ul>
                    </div>
                  </label>
                  <div className="main-btn">
                    <div className="price-tbe">
                      <span className="CurrncyCD_Rs pricr-nerw" />

                      <span className="pricr-nerw ng-binding ng-scope">
                        {
                        e.Fare.PublishedFare}
                      </span>
                    </div>
                    <div className="btsub">
                      <Link className="btn  book-bt-n" to={url}>
                        {" "}
                        Book Now
                      </Link>
                    </div>
                  </div>
                  <div className="clr" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightListCard;
