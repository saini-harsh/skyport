import React, { useEffect, useState } from "react";
import "./HotelModifyNew.css";
import { FaChevronLeft } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import SearchFormMobile from "../../Hotel/HotelSearch/HotelSearchMobile/SearchFormMobile";

const HotelModifyForm = () => {
  const handleShowSearchForm = () => {
    setShowSearchFormMobile(true);
  };

  const handleHideSearchForm = () => {
    setShowSearchFormMobile(false);
  };

  const [showSearchFormMobile, setShowSearchFormMobile] = useState(false);
  const [labelClicked, setLabelClicked] = useState(false);
  const [rooms, setRooms] = useState([
    { adults: 2, children: 0, childrenAges: [] },
  ]);
  const [totalGuests, setTotalGuests] = useState(2);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from") || "";
      const city = queryParams.get("city");
  const startDateRaw = queryParams.get("startDate");
  const endDateRaw = queryParams.get("endDate");
  const startDate = startDateRaw ? moment(startDateRaw) : null;
  const endDate = endDateRaw ? moment(endDateRaw) : null;

  const [fromInput, setFromInput] = useState(from);
  const [startDateInput, setStartDateInput] = useState(
    startDate ? startDate.format("YYYY-MM-DD") : ""
  );
  const [endDateInput, setEndDateInput] = useState(
    endDate ? endDate.format("YYYY-MM-DD") : ""
  );

  useEffect(() => {
    const roomsRaw = queryParams.get("rooms");
    if (roomsRaw) {
      try {
        const parsed = JSON.parse(roomsRaw);
        setRooms(parsed);
        const guests = parsed.reduce(
          (sum, r) => sum + (r.adults || 0) + (r.children || 0),
          0
        );
        setTotalGuests(guests);
      } catch (err) {
        console.error("Invalid rooms JSON", err);
      }
    }
  }, [location.search]);

  const updateRoom = (index, type, value) => {
    const newRooms = [...rooms];
    newRooms[index][type] = value;
    if (type === "children") {
      newRooms[index].childrenAges = Array(value).fill("");
    }
    setRooms(newRooms);
    setTotalGuests(newRooms.reduce((sum, r) => sum + r.adults + r.children, 0));
  };

  const updateChildAge = (roomIndex, childIndex, value) => {
    const newRooms = [...rooms];
    newRooms[roomIndex].childrenAges[childIndex] = value;
    setRooms(newRooms);
  };

  const addRoom = () => {
    setRooms([...rooms, { adults: 2, children: 0, childrenAges: [] }]);
  };

  const removeRoom = (index) => {
    const newRooms = rooms.filter((_, i) => i !== index);
    setRooms(newRooms);
    setTotalGuests(newRooms.reduce((sum, r) => sum + r.adults + r.children, 0));
  };

//   const handleSearch = () => {
//     const query = new URLSearchParams({
//       from: fromInput,
//       startDate: startDateInput,
//       endDate: endDateInput,
//       rooms: JSON.stringify(rooms),
//     }).toString();
// localStorage.setItem("hotelRoomsConfig", JSON.stringify(rooms));
//     navigate(`/hotelmodify?${query}`);
//   };

const handleSearch = () => {
  const query = new URLSearchParams({
    from: fromInput,
    startDate: startDateInput,
    endDate: endDateInput,
    rooms: JSON.stringify(rooms),
  }).toString();

  localStorage.setItem("hotelRoomsConfig", JSON.stringify(rooms));
  navigate(`/hotelmodify?${query}`);
};



  const formattedFrom = from
    .split(",")
    .map((s) => s.trim())
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(", ");

  const handleDone = () => {
  
  setLabelClicked(false);
};



  return (
    <div className="hotelmodifysearch-Main">
      <div className="hotelmodifysearch">
        <img
          src="Images/flight_aero.png"
          alt=""
          style={{ width: "40px", marginRight: "10px" }}
        />

        <div className="hotelmodifysearchinputs" style={{ width: "30%" }}>
          <label className="hotelmodifylabelstyling">
            City name, Location or Specific hotel
          </label>
          <input
            type="text"
            className="hotelmodifyinputstyling"
            value={city}
            onChange={(e) => setFromInput(e.target.value)}
            placeholder="Enter city or hotel name"
          />
        </div>

        <div className="hotelmodifysearchinputs" style={{ width: "15%" }}>
          <label className="hotelmodifylabelstyling">Check-In</label>
          <input
            type="date"
            className="hotelmodifyinputstyling"
            value={startDateInput}
            onChange={(e) => setStartDateInput(e.target.value)}
          />
        </div>

        <div className="hotelmodifysearchinputs" style={{ width: "15%" }}>
          <label className="hotelmodifylabelstyling">Check-Out</label>
          <input
            type="date"
            className="hotelmodifyinputstyling"
            value={endDateInput}
            onChange={(e) => setEndDateInput(e.target.value)}
          />
        </div>

        <div
          className="hotelmodifysearchinputs"
          style={{ width: "15%", position: "relative" }}
        >
          <label className="hotelmodifylabelstyling">Rooms & Guests</label>
          <input
            type="text"
            className="hotelmodifyinputstyling"
            value={`${totalGuests} Guests, ${rooms.length} Room${
              rooms.length !== 1 ? "s" : ""
            }`}
            onClick={() => setLabelClicked(!labelClicked)}
            readOnly
          />

          {labelClicked && (
            <div className="onlytraveller normaltraveller" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999, color:'black' }}>
              <ul className="traveller_list">
                <li>
                  <div className="list-persons-count" tyle={{marginBottom:'8px'}}><ul className="traveller_list">
                    {rooms.map((room, index) => (
                      <li key={index}>
                        <div className="list-persons-count">
                          <div id="roomshtml">
                        <div className="box ">
                          <div  className="roomTxt"><span>Room </span>{index + 1}:</div>
                        
                        <div >
                          <div className="hotel_adultStyling">
  <div className="txt">
    <span id="Label7">Adults</span>
    <div style={{ fontSize: "10px" }}>
      <em>(12+ years)</em>
    </div>
  </div>
 <div className="hotel_adultStyling_PlusMinus right PlusMinusRow">
   <div className="hotel_adultStyling_button-group">
    <button id="Adults_room_1_1_minus" className="sub hoteladultclass" onClick={() => updateRoom(index, 'adults', Math.max(room.adults - 1, 1))}><span class="PlusMinus_number">-</span></button>
    <span>{room.adults}</span>
    <button onClick={() => updateRoom(index, 'adults', Math.min(room.adults + 1, 6))}>+</button>
  </div>
 </div>
</div>                            
            </div>
                          <div className="hotel_childStyling ">
  <div className="hotel_childStyling_txt">
    <span id="Label9">Child</span>
    <div style={{ fontSize: "10px" }}>
      <em>(2–12 years)</em>
    </div>
  </div>
 <div>
   <div className="hotel_childStyling_button-group">
    <button onClick={() => updateRoom(index, 'children', Math.max(room.children - 1, 0))}>-</button>
    <span>{room.children}</span>
    <button onClick={() => updateRoom(index, 'children', Math.min(room.children + 1, 6))}>+</button>
  </div>
 </div>
</div>

                          {room.children > 0 && (
                            <div>
                              Age(s) of Children
                              {room.childrenAges.map((age, childIndex) => (
                                <select
                                  key={childIndex}
                                  value={age || ''}
                                  onChange={(e) => updateChildAge(index, childIndex, e.target.value)}
                                >
                                  <option value=''>Age</option>
                                  {[...Array(12)].map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                  ))}
                                </select>
                              ))}
                            </div>
                          )}
</div>
</div>
                          {index === rooms.length - 1 && (
                            <div id="addhotelRoom"className="cus_add_remove_btn addroom" onClick={addRoom}>
                             Add Room
                            </div>
                          )}
                          {rooms.length > 1 && (
                            <div id="removehotelRoom"className="cus_add_remove_btn removeroom" onClick={() => removeRoom(index)}>Remove Room</div>
                          )}
                        
                      
                     
                      
                      </div>
                      </li>
                    ))}
                  <button className="apply_btn" onClick={handleDone}>
                    Done
                  </button>

                  </ul>
                </div>
                </li>
              </ul>
            </div>
          )} 


          
        </div>

        <div style={{ width: "15%" }}>
          <button className="hotelmodifysearch-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="Hotel-reSearchForm">
        <Link to="/hotel" style={{ textDecoration: "none" }}>
          <div style={{ cursor: "pointer" }}>
            <span style={{ marginRight: "15px" }}>
              <FaChevronLeft style={{ fontSize: "14px", color: "white" }} />
            </span>
          </div>
        </Link>
        <div className="Hotel-reSearchFormStyling">
          <div className="Hotel-reSearchForm-InnerStyling">
            <div className="Hotel-reSearchForm-InnerdivStyling">
              {formattedFrom}
            </div>
            <div className="Hotel-reSearchForm-InnerdivStyling">
              {startDate ? startDate.format("MM/DD") : "--/--"}
            </div>
            <div
              className="Hotel-reSearchForm-InnerdivStyling"
              style={{ border: "none", display:"flex", alignItems:"center" }}
            >
              {totalGuests} <IoPerson />
            </div>
          </div>
          <div
            className="Hotel-reSearchForm-InnerdivStyling"
            style={{ border: "none" }}
            onClick={handleShowSearchForm}
          >
            CHANGE
          </div>
        </div>
      </div>

      {/* {showSearchFormMobile && (
        <div className='HotelSearchForm-Mobile'>
          <div className='HotelSearchForm-MobileIcon' onClick={handleHideSearchForm}>
            <RxCross2 style={{ borderRadius: '100px', background: 'white', width: '35px', height: '35px', padding: '5px' }} />
          </div>
          <SearchFormMobile />
        </div>
      )} */}
      {/* {showSearchFormMobile && (
  <div className='HotelSearchForm-Mobile'>
    <div className='HotelSearchForm-MobileIcon' onClick={handleHideSearchForm}>
      <RxCross2
        style={{
          borderRadius: '100px',
          background: 'white',
          width: '35px',
          height: '35px',
          padding: '5px',
        }}
      />
    </div>
    <SearchFormMobile />
  </div>
)} */}

      {showSearchFormMobile && (
        <div className="HotelSearchForm-Mobile">
          <div
            className="HotelSearchForm-MobileIcon"
            onClick={handleHideSearchForm}
          >
            <RxCross2
              style={{
                borderRadius: "100px",
                background: "white",
                width: "35px",
                height: "35px",
                padding: "5px",
              }}
            />
          </div>
          <SearchFormMobile onSearchComplete={handleHideSearchForm} />
        </div>
      )}
    </div>
  );
};

export default HotelModifyForm;
