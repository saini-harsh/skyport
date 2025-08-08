import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import "./FlightSearchForm.css";
// import WebCheckInForm from "./WebCheckInForm";
import CitySelection from "./CitySelection";
import SelectClass from "./SelectClass";
import TravellerSelection from "./TravellerSelection";
import FlightDatePickerMobile from "./FlightDatePickerMobile";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import Deals from "./Deals";

const FlightSearchForm = () => {
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [activeForm, setActiveForm] = useState(false);
  // const [cal, setCal] = useState(false);
  const [active, setActive] = useState(true);

  const handleSearchFlight = () => {
    setActive(true);
    setActive2(false);
    setActive3(false);
    setEndDate(null);
  };
  const handleSearchFlightRound = () => {
    setActive2(true);
    setActive(false);
    setActive3(false);
  };
  const handleSearchFlightMultiPle = () => {
    setActive3(true);
    setActive(false);
    setActive2(false);
  };

  const [isTravellerInputSelected, setTravellerInputSelected] = useState(false);
  const [isClassInputSelected, setClassInputSelected] = useState(false);
  // const [isWebInputSelected, setWebInputSelected] = useState(false);
  const [isCalenderSelected, setCalenderSelected] = useState(false);
  const [fromCitySelected, setFromCitySelected] = useState(false);
  const [toCitySelected, setToCitySelected] = useState(false);
  const [departureCity, setDepartureCity] = useState({
    code: "DEL",
    name: "Delhi",
  });
  const [arrivalCity, setArrivalCity] = useState({
    code: "BOM",
    name: "Mumbai",
  });
  const [destination2, setDestination2] = useState({
    AIRPORTCODE: "BOM",
    AIRPORTNAME: "Chhatrapati Shivaji International Airport",
    CITYCODE: "BOM",
    CITYNAME: "Mumbai",
    COUNTRYNAME: "India",
    COUNTRYCODE: "IN",
    TOPCITIES: 1,
    MARKUPFEE: null,
    MARKUPTYPE: null,
    NOOFAIRPORT: null,
    AIRPORTCITY: null,
    id: 857,
  });
  const [destination1, setDestination1] = useState({
    AIRPORTCODE: "DEL",
    AIRPORTNAME: "Indira Gandhi Airport",
    CITYCODE: "DEL",
    CITYNAME: "Delhi",
    COUNTRYNAME: "India",
    COUNTRYCODE: "IN",
    TOPCITIES: 1,
    MARKUPFEE: null,
    MARKUPTYPE: null,
    NOOFAIRPORT: null,
    AIRPORTCITY: null,
    id: 856,
  });

  const handleTravellerInputFocus = () => {
    setTravellerInputSelected(true);
  };
  const handleClassInputFocus = () => {
    setClassInputSelected(true);
  };
  // const handleWebInputFocus = () => {
  //   setWebInputSelected(true);
  // };
  const handleCalenderFocus = (input) => {
    setCalenderSelected(true);
    if (!isCalenderSelected) {
      if (input === "startDate") {
        setFocusedInput("startDate");
      } else if (input === "endDate") {
        setFocusedInput("endDate");
      } else {
        // setStartDate(null);
        // setEndDate(null);
        // setFocusedInput(null);

        setCalenderSelected(!isCalenderSelected);
        if (!isCalenderSelected) setFocusedInput("startDate");
        else setFocusedInput(null);
      }
    }
  };
  // const handleCheckOutFocus = () => {
  //   setCheckOutSelected(true);
  // };
  const handleFromCityClick = () => {
    setFromCitySelected(true);
    // setToCitySelected(false);
  };

  const handleToCityClick = () => {
    // setFromCitySelected(false);
    setToCitySelected(true);
  };

  const closeTravellerInput = () => {
    setTravellerInputSelected(false);
  };
  const closeClassInput = () => {
    setClassInputSelected(false);
  };
  // const closeWebInput = () => {
  //   setWebInputSelected(false);
  // };
  const closeDateInput = () => {
    setCalenderSelected(false);
    // setCheckOutSelected(false);
  };
  const closeCitySelection = () => {
    setFromCitySelected(false);
    setToCitySelected(false);
  };

  const [rooms, setRooms] = useState([{ adults: 1, children: 0, infants: 0 }]);

  const updateRoom = (index, field, value) => {
    const updatedRooms = [...rooms];
    updatedRooms[index][field] = value;
    setRooms(updatedRooms);
  };

  const [startDate, setStartDate] = useState(moment().add(1, "days"));

  const [endDate, setEndDate] = useState(
    active2 ? moment().add(2, "days") : null
  );
  useEffect(() => {
    setEndDate(active2 ? moment().add(2, "days") : null);
  }, [active2]);
  const [focusedInput, setFocusedInput] = useState(null);

  const navigate = useNavigate();
  const handleFlightSearch = () => {
    const tripTypeMapping = {
      OneWay: 1,
      RoundTrip: 2,
      MultiCity: 3,
    };
    const tripType = tripTypeMapping[!setActive ? "RoundTrip" : "OneWay"];

    const SearchData = {
      EndUserIp: "192.168.10.10",
      TokenId: "47ed8194-4d47-4e3e-b19d-b7e44a7588a5",
      AdultCount: rooms[0].adults,
      ChildCount: rooms[0].children,
      InfantCount: rooms[0].infants,
      JourneyType: tripType,
      Segments: [
        {
          Origin: departureCity.code,
          Destination: arrivalCity.code,
          FlightCabinClass: selectedClass,
          PreferredDepartureTime:
            startDate && startDate.startOf("day").format("YYYY-MM-DD"),
          PreferredArrivalTime: endDate
            ? endDate && endDate.startOf("day").format("YYYY-MM-DD")
            : startDate && startDate.startOf("day").format("YYYY-MM-DD"),
          // PreferredDepartureTime: startDate
          //   .startOf("day")
          //   .format("YYYY-MM-DDTHH:mm:ss"),
          // PreferredArrivalTime: endDate
          //   ? endDate.startOf("day").format("YYYY-MM-DDTHH:mm:ss")
          //   : startDate
          //       .add(1, "day")
          //       .startOf("day")
          //       .format("YYYY-MM-DDTHH:mm:ss"),
        },
      ],
    };
    console.log("SearchData", SearchData);
    // active &&
    //   navigate(
    //     `/flightList/${encodeURIComponent(`
    //       dest=${SearchData.Segments[0].Destination}|org=${SearchData.Segments[0].Origin}|dep=${SearchData.Segments[0].PreferredDepartureTime}|arr=${SearchData.Segments[0].PreferredArrivalTime}|px=${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}|jt=${SearchData.JourneyType}|cbn=${SearchData.Segments[0].FlightCabinClass}
    //     `)}`
    //   );

    // active2 &&
    //   navigate(
    //     `/round/${encodeURIComponent(`
    //       dest=${SearchData.Segments[0].Destination}|org=${SearchData.Segments[0].Origin}|dep=${SearchData.Segments[0].PreferredDepartureTime}|arr=${SearchData.Segments[0].PreferredArrivalTime}|px=${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}|jt=${SearchData.JourneyType}|cbn=${SearchData.Segments[0].FlightCabinClass}
    //     `)}`
    //   );
    if (active) {
      navigate(
        `/flightList/${encodeURIComponent(
          `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
        )}`
      );
    }

    if (active2) {
      const countryCode1 =
        destination1?.COUNTRYCODE?.trim().toUpperCase() || "";
      const countryCode2 =
        destination2?.COUNTRYCODE?.trim().toUpperCase() || "";
      console.log("COUNTRYCODE1:", JSON.stringify(countryCode1));
      console.log("COUNTRYCODE2:", JSON.stringify(countryCode2));
      if (countryCode1 !== countryCode2) {
        navigate(
          `/international-round/${encodeURIComponent(
            `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
          )}`
        );
      } else {
        navigate(
          `/round/${encodeURIComponent(
            `dest_${SearchData.Segments[0].Destination}*org_${SearchData.Segments[0].Origin}*dep_${SearchData.Segments[0].PreferredDepartureTime}*arr_${SearchData.Segments[0].PreferredArrivalTime}*px_${SearchData.AdultCount}-${SearchData.ChildCount}-${SearchData.InfantCount}*jt_${SearchData.JourneyType}*cbn_${SearchData.Segments[0].FlightCabinClass}`
          )}`
        );
      }
    }
  };

  const location = useLocation();
  const [selectedClass, setSelectedClass] = useState(2);

  const handleSwapCities = () => {
    const temp = departureCity;
    setDepartureCity(arrivalCity);
    setArrivalCity(temp);

    const tempDest = destination1;
    setDestination1(destination2);
    setDestination2(tempDest);
  };

  return (
    <div className="cont_pnl">
      <div className="pd20_n">
        {/* <div className="m_rel">
          <h1 className="mb_title">Flights</h1>
        
        </div> */}

        <div className="sfp-change-trip">
          {/* <ButtonGroup> */}
          <div
            // variant="light"
            onClick={handleSearchFlight}
            className={`sfp-trip ${active ? "active" : ""}`}
          >
            One Way
          </div>
          <div
            // variant="light"
            onClick={handleSearchFlightRound}
            className={`sfp-trip ${active2 ? "active" : ""}`}
          >
            Round Trip
          </div>
          <div
            // variant="light"
            onClick={handleSearchFlightMultiPle}
            className={`sfp-trip ${active3 ? "active" : ""}`}
          >
            MultiCity
          </div>
          {/* </ButtonGroup> */}
          <div className="sfp-trip-layer layer-left"></div>
        </div>

        <div id="divOneWayRT">
          <div className="wid46 fl m_rel">
            <div className="lb_bg mgt13 hgt93" >
              <div className="top_block" onClick={handleFromCityClick}>
                <p className="inpttl">From</p>
              </div>
              <div className="form-new">
                <span id="lblDeparture" className="origin_cd">
                  {departureCity.code}
                </span>
                <span id="lblDepart" className="origin_full">
                  {departureCity.name}
                </span>
              </div>
              <i className="swap_icn" id="SwapImg" onClick={handleSwapCities} />
            </div>
          </div>
          <div className="wid46 fr" onClick={handleToCityClick}>
            <div className="lb_bg mgt13 hgt93">
              <div className="top_block">
                <p className="inpttl">To</p>
              </div>
              <div className="to-new">
                <span id="lblArrival" className="origin_cd">
                  {arrivalCity.code}
                </span>
                <span id="lblArr" className="origin_full">
                  {arrivalCity.name}
                </span>
              </div>
            </div>
            <div className="clr" />
          </div>

          <div
            controlId="ddate"
            className="wid46 fl mgt13"
            onClick={handleCalenderFocus}
          >
            <div
              className="lb_bg ddateClass"
              id="dvfarecal"
              //   onClick={() => handleGetTextboxName("ddate")}
            >
              <p className="inpttl2">Departure Date</p>
              <input
                type="text"
                readOnly
                className="hl-input2"
                fdprocessedid="tmgf4i"
                // placeholder=
                value={startDate ? startDate.format("MM/DD/YYYY") : ""}
                onClick={handleCalenderFocus}
              />
              <div className="clr" />
            </div>
          </div>

          <div controlId="rdate" className="wid46 fr mgt13">
            <div
              className="retu-date-n"
              id="rdatelbl"
              style={{ display: "block", opacity: active2 ? "1" : "0.4" }}
            >
              {/* Return Date */}
              <div className="lb_bg m_rel">
                <div
                  className="rdateClass"
                  id="rdateFade"
                  //   onClick={() => handleGetTextboxName("rdate")}
                >
                  <p className="inpttl2">Return Date</p>
                  <input
                    type="text"
                    readOnly
                    className="hl-input2 cl-bl hide-ddate round-but1"
                    style={{}}
                    fdprocessedid="975arp"
                    value={endDate ? endDate.format("MM/DD/YYYY") : ""}
                    onClick={() => {
                      handleCalenderFocus("endDate");
                      handleSearchFlightRound();
                    }}
                  />
                  <div className="clr" />
                  <input type="hidden" name="hdn1" id="hdn1" />
                  <input id="hdn" type="hidden" />
                </div>
                <i
                  className="cross_i crs2"
                  id="divCross"
                  style={{}}
                  onClick={handleSearchFlight}
                />
              </div>
            </div>
          </div>

          <div
            controlId="travellers"
            className="wid46 fl mgt13"
            onClick={handleTravellerInputFocus}
          >
            <div className="lb_bg ad-ch-sec">
              <p className="inpttl2">Traveller(s)</p>
              <div className="trvsc">
                <div className="mid_title drpNoTrv">
                  <span id="spnTraveller">
                    {rooms.reduce(
                      (total, room) =>
                        total + room.adults + room.children + room.infants,
                      0
                    )}
                  </span>{" "}
                  <span id="spnTravellerText"> Traveller</span>
                </div>
                <span id="optAdult" style={{ display: "none" }}>
                  1
                </span>
                <span id="optChild" style={{ display: "none" }}>
                  0
                </span>
                <span id="optInfant" style={{ display: "none" }}>
                  0
                </span>
              </div>
              <div className="clr" />
            </div>
          </div>
          {/* Rest of the JSX */}
          <div
            controlId="class"
            className="wid46 fr mgt13"
            onClick={handleClassInputFocus}
          >
            <div
              className="lb_bg m_rel"
              id="showCclass"
              onClick={handleClassInputFocus}
            >
              <p className="inpttl2" onClick={handleClassInputFocus}>
                Class
              </p>
              <i className="dw_tringle" onClick={handleClassInputFocus} />
              <div className="optclss">
                <Form.Control
                  as="select"
                  id="optClassUl"
                  value={selectedClass}
                  //   onChange={(e) => handleSetCabCookie(e.target.value)}
                  disabled
                  onClick={handleClassInputFocus}
                >
                  <option value="1">All</option>
                  <option value="2">Economy</option>
                  <option value="3">PremiumEconomy</option>
                  <option value="4">Business</option>
                  <option value="5">PremiumBusiness</option>
                  <option value="6">First</option>
                </Form.Control>
              </div>
              <div className="clr" />
            </div>
          </div>
          <div>
            <Row>
              <Col className="mobile_video_formSearch">
                <label htmlFor="nonStop">
                  {/* <i className={`ico ico-checkbox ico-checkbox-checked `} /> */}
                  <input
                    type="checkbox"
                    name="nonStop"
                    id="nonStop"
                    // checked={filters.nonStop}
                    // onChange={handleChange}
                    className="eventTrackable js-prodSpecEvtCat"
                  />
                  <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                    Non Stop Flights
                  </span>
                </label>
              </Col>

              <Col className="mobile_video_formSearch">
                <label htmlFor="student">
                  {/* <i className={`ico ico-checkbox ico-checkbox-checked`} /> */}
                  <input
                    type="checkbox"
                    name="student"
                    id="student"
                    // checked={filters.student}
                    // onChange={handleChange}
                    className="eventTrackable js-prodSpecEvtCat"
                  />
                  <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                    Student Fare
                  </span>
                </label>
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="specialFare">
                  {/* <i className={`ico ico-checkbox ico-checkbox-checked`} /> */}
                  <input
                    type="checkbox"
                    name="specialFare"
                    id="specialFare"
                    // checked={filters.specialFare}
                    // onChange={handleChange}
                    className="eventTrackable js-prodSpecEvtCat"
                  />
                  <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                    Armed Force
                  </span>
                </label>
              </Col>
              <Col>
                <label htmlFor="specialFare">
                  {/* <i className={`ico ico-checkbox ico-checkbox-checked`} /> */}
                  <input
                    type="checkbox"
                    name="specialFare"
                    id="specialFare"
                    // checked={filters.specialFare}
                    // onChange={handleChange}
                    className="eventTrackable js-prodSpecEvtCat"
                  />
                  <span style={{ marginLeft: "8px", fontSize: "14px" }}>
                    Senior Citizen
                  </span>
                </label>
              </Col>
            </Row>
          </div>

          <div className="clr" />

          <input
            name=""
            defaultValue="Search Flight"
            style={{ WebkitAppearance: "none" }}
            type="button"
            className="fs_btn"
            onClick={handleFlightSearch}
            fdprocessedid="5e85fe"
          />
        </div>
        {location.pathname === "/" && <Deals />}
      </div>

      {/* {isWebInputSelected && <WebCheckInForm closeWebInput={closeWebInput} />} */}

      {fromCitySelected && (
        <CitySelection
          orname="Origin"
          code={departureCity.code}
          name={departureCity.name}
          setCity={setDepartureCity}
          closeCitySelection={closeCitySelection}
          setDestination2={setDestination2}
          setDestination1={setDestination1}
        />
      )}

      {toCitySelected && (
        <CitySelection
          setDestination2={setDestination2}
          setDestination1={setDestination1}
          orname="Destination"
          code={arrivalCity.code}
          name={arrivalCity.name}
          setCity={setArrivalCity}
          closeCitySelection={closeCitySelection}
        />
      )}

      {isClassInputSelected && (
        <SelectClass
          closeClassInput={closeClassInput}
          setClass={setSelectedClass}
          selectedClass={selectedClass}
        />
      )}

      {isCalenderSelected && (
        <FlightDatePickerMobile
          closeDateInput={closeDateInput}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          active2={active2}
          focusedInput={focusedInput}
          setFocusedInput={setFocusedInput}
        />
      )}

      {isTravellerInputSelected && (
        <TravellerSelection
          rooms={rooms}
          updateRoom={updateRoom}
          closeTravellerInput={closeTravellerInput}
        />
      )}
    </div>
  );
};

export default FlightSearchForm;
