import React from "react";
import { Button, Col } from "react-bootstrap";
import { GiAirplaneArrival, GiAirplaneDeparture } from "react-icons/gi";
import { GoStopwatch } from "react-icons/go";
import { ImPriceTags } from "react-icons/im";
import { MdFlight } from "react-icons/md";
import Slider from "rc-slider";

const FilterBar = ({
  showFilter,
  minFare,
  maxFare,
  sliderValue,
  clearAllFilters,
  handleSliderChange,
  handledepTimeFilter,
  deptimeRange,
  arrtimeRange,
  handlearrTimeFilter,
  handleShowAllStops,
  checkedStops,
  handleCheckedstops,
  handleShowAllairlinenames,
  airlines,
  handleChecked,
  setShowFilter,
  applyFilters,
  handleChnageCurrency,
  handleChangeCurrency2,
  airlineCodes
}) => {
  return (
    <Col
      md={3}
      className="filterDiv flightListPage"
      style={{ marginBottom: "15px", display: showFilter && "block",position:'relative' }}
    >
      <div className="filterHead">
        <p
          style={{
            fontWeight: "600",
            color: "#001f5d",
            fontSize: "18px",
            margin: "5px",
          }}
        >
          FILTER
        </p>
        <p style={{ margin: "5px" }} onClick={() => clearAllFilters()}>
          CLEAR ALL
        </p>
      </div>
      <div
        className="filterDivs"
        style={{ height: "auto", minHeight: "100px" }}
      >
        <div className="filterSubDiv">
          <ImPriceTags
            className="logo"
            size={22}
            style={{ marginTop: "15px", marginLeft: "10px" }}
          />
          <p>Price Range</p>
        </div>
        <div className="box-content">
          <input type="hidden" className="pricenew" value="180-3000" />
          <div className="slider-dragable-range slider-range-price">
            <Slider
              range
              min={minFare}
              max={maxFare}
              value={sliderValue}
              onChange={handleSliderChange}
              className="custom-slider"
            />
            <div className="slider-value">
              <span>₹{parseInt(sliderValue[0])}</span> <span>-</span>{" "}
              <span>₹{parseInt(sliderValue[1])}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="filterDivs"
        style={{ height: "auto", minHeight: "150px" }}
      >
        <div className="filterSubDiv">
          <GiAirplaneDeparture
            size={22}
            style={{ marginTop: "15px", marginLeft: "10px" }}
          />
          <p>Departure time </p>
        </div>
        <div className="prc_val ft1-sec">
          <div className="tm-dt1">
            <div
              className="tm11"
              onClick={() => handledepTimeFilter([0, 5.59])}
            >
              <div
                className={`tm-m11 ${
                  deptimeRange[0] === 0 && deptimeRange[1] === 5.59
                    ? "blue"
                    : ""
                }`}
              >
                <div className="mor-n1"></div>
                <div className="clr"></div>
                <div className="clr"></div>
                <div
                  className={`tm-nf1 ${
                    deptimeRange[0] === 0 && deptimeRange[1] === 5.59
                      ? "twh"
                      : ""
                  }`}
                >
                  {" "}
                  Before <br />6 AM
                </div>
              </div>
            </div>
            <div className="tm22" onClick={() => handledepTimeFilter([6, 12])}>
              <div
                className={`tm-m12 ${
                  deptimeRange[0] === 6 && deptimeRange[1] === 12 ? "blue" : ""
                }`}
              >
                {" "}
                <div className="mor1-n2"></div>
                <div className="clr"></div>
                <div className="clr"></div>
                <div
                  className={`tm-nf2 ${
                    deptimeRange[0] === 6 && deptimeRange[1] === 12 ? "twh" : ""
                  }`}
                >
                  {" "}
                  6 AM -<br />
                  12 PM
                </div>
              </div>
            </div>
            <div className="tm33" onClick={() => handledepTimeFilter([12, 18])}>
              <div
                className={`tm-m22 ${
                  deptimeRange[0] === 12 && deptimeRange[1] === 18 ? "blue" : ""
                }`}
              >
                {" "}
                <div className="mor2-n3"></div>
                <div className="clr"></div>
                <div className="clr"></div>
                <div
                  className={`tm-nf3 ${
                    deptimeRange[0] === 12 && deptimeRange[1] === 18
                      ? "twh"
                      : ""
                  }`}
                >
                  {" "}
                  12 PM -<br />6 PM
                </div>
              </div>
            </div>
            <div
              className="tm11-n"
              onClick={() => handledepTimeFilter([18, 24])}
            >
              <div
                className={`tm-m33 ${
                  deptimeRange[0] === 18 && deptimeRange[1] === 24 ? "blue" : ""
                }`}
              >
                {" "}
                <div className="mor3-n4"></div>
                <div className="clr"></div>
                <div className="clr"></div>
                <div
                  className={`tm-nf4 ${
                    deptimeRange[0] === 18 && deptimeRange[1] === 24
                      ? "twh"
                      : ""
                  }`}
                >
                  {" "}
                  After
                  <br />6 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="filterDivs"
        style={{ height: "auto", minHeight: "150px" }}
      >
        <div className="filterSubDiv">
          <GiAirplaneArrival
            size={23}
            style={{ marginTop: "15px", marginLeft: "10px" }}
          />
          <p>Arrival time </p>
        </div>
        <div className="prc_val ft1-sec2">
          <div className="tm-dt11">
            <div
              className={`tm111 ${
                arrtimeRange[0] === 0 && arrtimeRange[1] === 5.59 ? "blue" : ""
              }`}
              onClick={() => handlearrTimeFilter([0, 5.59])}
            >
              <div className="tm-m111">
                <div className="mor-n11"></div>
                <div className="clr"></div>
                <div className="clr"></div>
                <div
                  className={`tm-nf11 ${
                    arrtimeRange[0] === 0 && arrtimeRange[1] === 5.59
                      ? "twh"
                      : ""
                  }`}
                >
                  Before <br />6 AM
                </div>
              </div>
            </div>
            <div
              className={`tm222 ${
                arrtimeRange[0] === 6 && arrtimeRange[1] === 12 ? "blue" : ""
              }`}
              onClick={() => handlearrTimeFilter([6, 12])}
            >
              <div className="tm-m122">
                <div className="mor1-n22"></div>
                <div className="clr"></div>
                <div className="clr"></div>
                <div
                  className={`tm-nf22 ${
                    arrtimeRange[0] === 6 && arrtimeRange[1] === 12 ? "twh" : ""
                  }`}
                >
                  {" "}
                  6 AM -<br />
                  12 PM
                </div>
              </div>
            </div>
            <div
              className={`tm333 ${
                arrtimeRange[0] === 12 && arrtimeRange[1] === 18 ? "blue" : ""
              }`}
              onClick={() => handlearrTimeFilter([12, 18])}
            >
              <div className="tm-m222">
                <div className="mor2-n33"></div>
                <div className="clr"></div>
                <div className="clr"></div>
                <div
                  className={`tm-nf33 ${
                    arrtimeRange[0] === 12 && arrtimeRange[1] === 18
                      ? "twh"
                      : ""
                  }`}
                >
                  {" "}
                  12 PM -<br />6 PM
                </div>
              </div>
            </div>
            <div
              className={`tm11-n ${
                arrtimeRange[0] === 18 && arrtimeRange[1] === 24 ? "blue" : ""
              }`}
              onClick={() => handlearrTimeFilter([18, 24])}
            >
              <div className="tm-m333">
                <div className="mor3-n44"></div>
                <div className="clr"></div>
                <div className="clr"></div>
                <div
                  className={`tm-nf44 ${
                    arrtimeRange[0] === 18 && arrtimeRange[1] === 24
                      ? "twh"
                      : ""
                  }`}
                >
                  {" "}
                  After <br />6 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="filterDivs stopsDiv"
        style={{ height: "auto", minHeight: "125px" }}
      >
        <div className="filterSubDiv">
          <GoStopwatch
            size={22}
            style={{ marginTop: "15px", marginLeft: "10px", margin: 5 }}
          />
          <p style={{ margin: 5 }}>Stops</p>
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <input
              style={{
                marginTop: "0px",
                marginLeft: "15px",
                margin: 5,
              }}
              type="checkbox"
              name="showall"
              onChange={handleShowAllStops}
              // defaultChecked
            />
            <p
              style={{
                fontSize: "14px",
                marginTop: "8px",
                marginLeft: "5px",
                color: "rgb(51,51,51)",
                margin: 5,
              }}
            >
              Show all
            </p>
          </div>
        </div>
        {/* Making functions for filters */}
        <div className="pag1 sto1-sec">
          <div className="wid33">
            <div
              className={`pa11  ${
                checkedStops.includes("non-stop") ? "blue" : ""
              }`}
              id="divchkNonStop"
              onClick={() => handleCheckedstops("non-stop")}
            >
              <p className="sb_flt">
                0<br />
                Nonstop
              </p>
              {/* <input
                name=""
                defaultChecked={checkedStops.includes("non-stop")}
                id="chkNonStop"
                type="checkbox"
                style={{ display: "none" }}
              /> */}
            </div>
          </div>
          <div className="wid33">
            <div
              className={`pa22  ${
                checkedStops.includes("1-stop") ? "blue" : ""
              }`}
              id="divchkOneStop"
              onClick={() => handleCheckedstops("1-stop")}
            >
              <p className="sb_flt">
                1<br />
                Stop
              </p>
              {/* <input
                name=""
                defaultChecked={checkedStops.includes("1-stop")}
                id="chkOneStop"
                type="checkbox"
                style={{ display: "none" }}
              /> */}
            </div>
          </div>
          <div className="wid33">
            <div
              className={`pa33  ${
                checkedStops.includes("2-stop") ? "blue" : ""
              }`}
              id="divchkTwoStop"
              onClick={() => handleCheckedstops("2-stop")}
            >
              <p className="sb_flt">
                2+
                <br />
                Stop
              </p>
              {/* <input
                name=""
                defaultChecked={checkedStops.includes("2-stop")}
                id="chkTwoStop"
                type="checkbox"
                style={{ display: "none" }}
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="filterDivs flightIconDiv">
        <div className="filterSubDiv">
          <MdFlight
            size={22}
            style={{ marginTop: "15px", marginLeft: "10px", margin: 5 }}
          />
          <p>Airlines</p>
          <div style={{ display: "flex", marginLeft: "auto" }}>
            <input
              style={{
                marginTop: "0px",
                marginLeft: "15px",
                margin: 5,
              }}
              type="checkbox"
              name="showall"
              onChange={handleShowAllairlinenames}
            />
            <p
              style={{
                fontSize: "14px",
                marginTop: "16px",
                marginLeft: "5px",
                margin: 5,
                color: "rgb(51,51,51)",
              }}
            >
              Show all
            </p>
          </div>
        </div>
        {airlines.map((airline, index) => (
          <div className="stops" key={index}>
            <input
              type="checkbox"
              onClick={() => handleChecked(airline.name)}
              defaultChecked={airline.selected}
            />
            {/* <img className="flightIcon" src="" alt="" /> */}
            {/* <p
              style={{
                fontSize: "13px",
                marginTop: "16px",
                marginLeft: "5px",
                color: "rgb(51,51,51)",
              }}
            >
              {airline.name}
            </p> */}
              <p
              style={{
                fontSize: "13px",
                marginTop: "16px",
                marginLeft: "5px",
                color: "rgb(51,51,51)",
              
              }}
              
            >
              {airlineCodes && airlineCodes.length !== 0 && <img src={`/Images/AirlineLogo/${airlineCodes[index]}.gif`} style={{width:'20px',height:'20px',marginRight:'5px',marginLeft:'10px'}}/>}
             {/* <img src={`/Images/AirlineLogo/${airlineCodes[index]}.gif`} style={{width:'20px',height:'20px',marginRight:'5px',marginLeft:'10px'}}/> */}
              {airline.name}
            </p>
            <p
              style={{
                fontSize: "13px",
                marginTop: "16px",
                marginLeft: "auto",
                color: "rgb(51,51,51)",
              }}
            >
              {/* {airline.name} */}
              {/* $1000 */}
            </p>
            {/* Add pricing information here */}
          </div>
        ))}
        {/* <p
                  style={{
                    marginTop: "5px",
                    fontSize: "13px",
                    color: "rgb(33,150,243)",
                  }}
                >
                  More +
                </p> */}
      </div>
      <Button
        className="applyfilter"
        style={{
          width: "100%",
          marginBlock: "10px",
          paddingTop: "8px",
          marginTop: "34px",
        }}
        onClick={() => {
          setShowFilter(false);
          applyFilters();
        }}
      >
        {" "}
        Apply Filters
      </Button>
    </Col>
  );
};

export default FilterBar;
