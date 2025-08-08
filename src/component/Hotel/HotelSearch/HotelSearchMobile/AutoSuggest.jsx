import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, ListGroup, Image } from "react-bootstrap";
import "./AutoSuggest.css";
import { FaCity } from "react-icons/fa";
import { Row, Col, Spinner } from "react-bootstrap";

const AutoSuggest = ({ initGeolocation, closeCityInput, handleCitySelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cities2, setCities2] = useState([]);
  

  // useEffect(() => {
  //   if (inputValue) {
  //     fetchDatas(inputValue);
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [inputValue]);

  // const fetchDatas = async (value) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       "https://admin.tripgoonline.com/api/Hotel/CityList"
  //     );
  //     if (!response.ok) throw new Error("Failed to fetch data");
  //     const json = await response.json();
  //     const results = json.data.response.cil
  //       .filter((user) => {
  //         return (
  //           user &&
  //           ((user.cityName &&
  //             user.cityName.toLowerCase().includes(value.toLowerCase())) ||
  //             (user.countryName &&
  //               user.countryName.toLowerCase().includes(value.toLowerCase())) ||
  //             (user.fullRegionName &&
  //               user.fullRegionName
  //                 .toLowerCase()
  //                 .includes(value.toLowerCase())))
  //         );
  //       })
  //       .map((user) => {
  //         let priority = 3;
  //         if (
  //           user.cityName &&
  //           user.cityName.toLowerCase().includes(value.toLowerCase())
  //         ) {
  //           priority = 1;
  //         } else if (
  //           user.countryName &&
  //           user.countryName.toLowerCase().includes(value.toLowerCase())
  //         ) {
  //           priority = 2;
  //         }
  //         return { ...user, priority };
  //       })
  //       .sort((a, b) => a.priority - b.priority);

  //     setSuggestions(results);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

    const fetchDatas = async (value) => {
      try {
        const requestData = {
          city: value,
        };
  
        const response = await axios.post(
          "https://admin.tripgoonline.com/api/Hotel/CityList",
          requestData
        );
  
        // If API returns JSON directly in response.data
        const json = response.data;
        console.log("json responseee", json);
  
        const results = json.data
          .filter((user) => {
            return (
              user &&
              ((user.CityName &&
                user.CityName.toLowerCase().includes(value.toLowerCase())) ||
                (user.CountryName &&
                  user.CountryName.toLowerCase().includes(value.toLowerCase())))
            );
          })
          .map((user) => {
            let priority = 3;
  
            if (
              user.CityName &&
              user.CityName.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 1;
            } else if (
              user.CountryName &&
              user.CountryName.toLowerCase().includes(value.toLowerCase())
            ) {
              priority = 2;
            }
  
            return { ...user, priority };
          })
          .sort((a, b) => a.priority - b.priority);
  
        console.log("RESULTS", results);
        setCities2(results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

const handleInputChange = (e) => {
  const value = e.target.value;
  setInputValue(value); // Update local state for the input

  if (value.length === 3) {
    fetchDatas(value.toLowerCase()); // Call the API if input is 3 characters
  } else {
    setCities2([]); // Clear suggestions if less than 3 characters
  }
};


  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  //   setSuggestions([
  //     "Delwaraaaaaaa, Udaipur, Rajasthan, India",
  //     "Delwara, Udaipur, Rajasthan, India",
  //   ]);
  // };

  const handleClearInput = () => {
    setInputValue("");
    setSuggestions([]);
  };

  const handleback = () => {
    setInputValue("");
    closeCityInput();
  };

  const handleAddAutoCity = (city) => {
    setInputValue(city.cityName || city);
    closeCityInput();
    setSuggestions([]);
    handleCitySelect(city); // Pass the selected city back to the parent component
  };

  return (
    <div className="rcnt-src-at" id="autosgt">
      <div className="autosugst_newblock" id="stickyheaderCal">
        <div className="fli-c-blv2">
          <div className="fli-m-bl">
            <div>
              <a className="back_btn" id="backTosrch" onClick={handleback}>
                <img
                  src="https://www.easemytrip.com/images/auto-sugg-icon/arrow-back.png"
                  alt="Back"
                />
              </a>
              <input
                type="text"
                className="input_New_auto"
                id="txtsearch"
                name="txtfrom"
                required
                placeholder="Enter City/Location/Hotel Name"
                autoComplete="off"
                value={inputValue}
                onChange={handleInputChange}
              />
              {/* {inputValue && (
                <a className="sugg_cross" onClick={handleClearInput}>
                  <img
                    src="https://www.easemytrip.com/images/auto-sugg-icon/sugg-cross.png"
                    alt="Clear"
                  />
                </a>
              )} */}
              {inputValue && !loading && !error && cities2.length > 0 ? (
  <div className="auto_sugg mgt100">
    {cities2.map((city, index) => (
      <div
        key={index}
        style={{
          borderBottom: "1px solid grey",
          paddingBottom: 5,
          marginBottom: 5,
          cursor: "pointer",
        }}
        onClick={() => handleCitySelect(city)}
      >
        <Row>
          <Col md={1} style={{ alignItems: "center" }}>
            <FaCity
              size={22}
              style={{
                textAlign: "center",
                height: "100%",
                color: "#2d3290",
              }}
            />
          </Col>
          <Col md={11}>
            <Row>
              <div
                className="flightFromName"
                style={{
                  color: "#2d3290",
                  fontWeight: 600,
                }}
              >
                {city.CityName}
              </div>
            </Row>
            <Row style={{ color: "grey" }}>
              <Col md={10} style={{ paddingRight: 0 }}>
                <div
                  className="flightFromNameInner"
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                  }}
                >
                  {city.CountryName}
                </div>
              </Col>
              <Col md={2} style={{ paddingLeft: 0 }}>
                <div
                  style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: 10,
                  }}
                >
                  {city.CountryCode}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    ))}
  </div>
) : (
  <div
    style={{
      padding: "10px 5px",
      fontSize: "12px",
      textAlign: "center",
      margin: "auto",
      width: "100%",
      backgroundColor:"white"
    }}
  >
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />{" "}
    Please wait we are fetching city list...
  </div>
)}

            </div>
          </div>
        </div>

        <div className="clr" />

        {loading &&  <div className="autoSuggest_Error" style={{background:'#fff',padding:'10px 15px', marginTop:'10px'}}>Loading...</div>}
        {error && <div className="autoSuggest_Error" style={{background:'#fff',padding:'10px 15px', marginTop:'10px'}}>No Hotel Found</div>}

        {inputValue && !loading && !error && suggestions.length > 0 && (
          <div className="auto_sugg mgt100">
            <ul id="divAppend" className="rcnt-bx-at">
              {suggestions.map((city, index) => (
                <li
                  key={index}
                  className="auto_sugg_list rcnt-bx2-at"
                  id={`msl${index}|city`}
                  onClick={() => handleAddAutoCity(city)}
                >
                  {/* <div className="w_10">
                    <div className="auto_sugg_img">
                      <Image src="https://www.easemytrip.com/images/auto-sugg-icon/city.png" />
                    </div>
                    <div className="auto_sugg_add">city</div>
                  </div> */}
                  <div className="w_85">
                    <div
                      className="auto_sugg_tttl"
                      id={`autohotelmsl${index}city`}
                    >
                      {/* {city.cityName},  */}
                      {city.fullRegionName}
                      {/* , {city.countryName} */}
                    </div>
                  </div>
                </li>
                // <li className="auto_sugg_list rcnt-bx2-at" id="msl240673|city">
                //   <div className="w_10">
                //     <div className="auto_sugg_img">
                //       <Image src="https://www.easemytrip.com/images/auto-sugg-icon/city.png" />
                //     </div>
                //     <div className="auto_sugg_add">city</div>
                //   </div>
                //   <div className="w_85">
                //     <div className="auto_sugg_tttl" id="autohotelmsl240673city">
                //       Delwara, Udaipur, Rajasthan, India
                //     </div>
                //   </div>
                // </li>
                // <li className="auto_sugg_list rcnt-bx2-at" id="msl240673|city">
                //   <div className="w_10">
                //     <div className="auto_sugg_img">
                //       <Image src="https://www.easemytrip.com/images/auto-sugg-icon/city.png" />
                //     </div>
                //     <div className="auto_sugg_add">city</div>
                //   </div>
                //   <div className="w_85">
                //     <div className="auto_sugg_tttl" id="autohotelmsl240673city">
                //       Delwara, Udaipur, Rajasthan, India
                //     </div>
                //   </div>
                // </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rcnt-bx1-at new_old pd20_main " id="home">
          <div
            className="rcnt-bx2-at spc-cty-at newGpsLoc"
            style={{ display: "none" }}
          >
            <div
              className="DivGpsec"
              onClick={initGeolocation}
              style={{ display: "none" }}
            >
              <div className="imgGpsec">
                <img
                  src="https://www.easemytrip.com/images/mob-web/hotel-img/newGpsLoc-blue.svg"
                  alt="GPS"
                />
              </div>
              <div className="Gpstxt">
                <h4>Current Location</h4>
                <p>Using GPS</p>
              </div>
            </div>
            <div className="clr" />
          </div>
          <div className="m_sugg_bx flx-clm">
            <div className="rec_txt">Popular Search in Domestic</div>
            <div className="clr" />
            <div className="pop_city_bx">
              <Button
                variant="link"
                onClick={() => handleAddAutoCity("New Delhi, India")}
              >
                New Delhi
              </Button>
              <Button
                variant="link"
                onClick={() => handleAddAutoCity("Pune, India")}
              >
                Pune
              </Button>
              <Button
                variant="link"
                onClick={() => handleAddAutoCity("Ahmedabad, India")}
              >
                Ahmedabad
              </Button>
              <Button
                variant="link"
                onClick={() => handleAddAutoCity("Mumbai, India")}
              >
                Mumbai
              </Button>
              <Button
                variant="link"
                onClick={() => handleAddAutoCity("Bangalore, India")}
              >
                Bangalore
              </Button>
              <Button
                variant="link"
                onClick={() => handleAddAutoCity("Jaipur, India")}
              >
                Jaipur
              </Button>
              <Button
                variant="link"
                onClick={() => handleAddAutoCity("Agra, India")}
              >
                Agra
              </Button>
              <Button
                variant="link"
                onClick={() => handleAddAutoCity("Hyderabad, India")}
              >
                Hyderabad
              </Button>
            </div>
            <div className="clr" />
            <div className="bdr_lg_sugg" />
            <div className="clr" />
            <div className="rec_txt">Popular Search in International</div>
            <div className="clr" />
            <div className="pop_city_bx">
              <Button
                variant="link"
                onClick={() => handleAddAutoCity("Dubai, United Arab Emirates")}
              >
                Dubai
              </Button>
              <Button
                variant="link"
                onClick={() =>
                  handleAddAutoCity("Abu Dhabi, United Arab Emirates")
                }
              >
                Abu Dhabi
              </Button>
              <Button
                variant="link"
                onClick={() => handleAddAutoCity("Singapore, Singapore")}
              >
                Singapore
              </Button>
              <Button
                variant="link"
                onClick={() => handleAddAutoCity("Bangkok, Thailand")}
              >
                Bangkok
              </Button>
            </div>
          </div>
        </div>
        <div className="clr" />
      </div>
    </div>
  );
};

export default AutoSuggest;
