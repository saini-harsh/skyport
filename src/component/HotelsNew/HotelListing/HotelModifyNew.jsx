import React, { useEffect, useState } from "react";
import "./HotelModifyNew.css";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hotelSearch } from "../../../redux/services/operations/hotel";
import HotelModifyForm from "./HotelModifyForm";
import HotelFiltering from "./HotelFiltering";
import HotelListingModifyNew from "./HotelListingModifyNew";
import HotelMobileFilters from "./HotelMobileFilters";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function HotelModifyNew() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = useSelector((state) => state.hotel.hotelSearch);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [selectedStars, setSelectedStars] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedMealPlans, setSelectedMealPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredHotels, setFilteredHotels] = useState([]);

  // Price range state
  const [minFare, setMinFare] = useState(0);
  const [maxFare, setMaxFare] = useState(0);
  const [sliderValue, setSliderValue] = useState([0, 0]);

  // Fetch hotel data
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const from = params.get("from");
    const city = params.get("city");
    const startDate = params.get("startDate");
    const endDate = params.get("endDate");
    const roomsParam = params.get("rooms");

    const roomsArray = roomsParam ? JSON.parse(roomsParam) : [];
    setRooms(roomsArray);
    console.log("params", from);
    const pax = roomsArray
      .map((room) => {
        const parts = [room.adults || 0, room.children || 0];
        if (Array.isArray(room.childrenAges)) {
          parts.push(...room.childrenAges);
        }
        return parts.join("_");
      })
      .join("?");

    const requestData = {
      city: from,
      Rooms: roomsArray.length.toString(),
      cin: startDate,
      cOut: endDate,
      pax: pax,
    };

    setLoading(true);
    dispatch(hotelSearch(requestData, navigate)).finally(() =>
      setLoading(false)
    );
  }, [location.search, dispatch, navigate]);

  // Set min/max fare when search data loads
  useEffect(() => {
    const hotelList = Array.isArray(search) ? search : [];

    const prices = hotelList
      .map((h) => h.Rooms?.[0]?.TotalFare)
      .filter((p) => typeof p === "number");

    if (prices.length > 0) {
      const min = Math.floor(Math.min(...prices));
      const max = Math.ceil(Math.max(...prices));
      setMinFare(min);
      setMaxFare(max);
      setSliderValue([min, max]);
    }
  }, [search]);

  const hotelList = Array.isArray(search) ? search : [];

  // Unique filters
  const allStars = [
    ...new Set(hotelList.map((h) => Number(h.star_rating))),
  ].sort((a, b) => b - a);

  const allLocations = [
    ...new Set(
      hotelList.map((h) => {
        const parts = h.address?.split(",") || [];
        return parts[parts.length - 3]?.trim() || h.city;
      })
    ),
  ];

  const allFacilities = [
    ...new Set(
      hotelList.flatMap((h) =>
        h.Rooms?.flatMap((r) =>
          (r.Inclusion || "").split("|").map((f) => f.trim())
        )
      )
    ),
  ].filter(Boolean);

  const allRoomTypes = [
    ...new Set(
      hotelList.flatMap((h) =>
        h.Rooms?.flatMap((r) =>
          (r.Name?.[0] || "").split(",").map((x) => x.trim())
        )
      )
    ),
  ].filter(Boolean);

  const allMealPlans = [
    ...new Set(
      hotelList.flatMap((h) =>
        h.Rooms?.map((r) => (r.MealType || "").toLowerCase().replace(/ /g, "-"))
      )
    ),
  ].filter(Boolean);

  const handleToggle = (value, state, setter) => {
    const newState = state.includes(value)
      ? state.filter((item) => item !== value)
      : [...state, value];

    setter(newState); // Make sure you're calling it properly
  };

  const clearAll = () => {
    setSearchQuery("");
    setSelectedStars([]);
    setSelectedLocations([]);
    setSelectedFacilities([]);
    setSelectedRoomTypes([]);
    setSelectedMealPlans([]);
    setSliderValue([minFare, maxFare]);
  };

  const applyFilters = () => {
    const filtered = hotelList.filter((h) => {
      const firstRoom = h.Rooms?.[0];
      const fare = firstRoom?.TotalFare;

      if (
        typeof fare !== "number" ||
        fare < sliderValue[0] ||
        fare > sliderValue[1]
      )
        return false;

      if (
        searchQuery &&
        !h.name?.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;

      if (
        selectedStars.length &&
        !selectedStars.includes(Number(h.star_rating))
      )
        return false;

      if (
        selectedLocations.length &&
        !selectedLocations.some((loc) => h.address?.includes(loc))
      )
        return false;

      if (
        selectedFacilities.length &&
        !h.Rooms?.some((r) =>
          selectedFacilities.every((fac) =>
            (r.Inclusion || "").toLowerCase().includes(fac.toLowerCase())
          )
        )
      )
        return false;

      if (
        selectedRoomTypes.length &&
        !h.Rooms?.some((r) =>
          selectedRoomTypes.every((rt) =>
            (r.Name?.[0] || "")
              .toLowerCase()
              .split(",")
              .map((s) => s.trim())
              .includes(rt.toLowerCase())
          )
        )
      )
        return false;

      if (
        selectedMealPlans.length &&
        !h.Rooms?.some((r) =>
          selectedMealPlans.includes(
            (r.MealType || "").toLowerCase().replace(/ /g, "-")
          )
        )
      )
        return false;

      return true;
    });

    // Sort by price ascending
    const sorted = filtered.sort(
      (a, b) =>
        (a.Rooms?.[0]?.TotalFare || Infinity) -
        (b.Rooms?.[0]?.TotalFare || Infinity)
    );

    setFilteredHotels(sorted);
  };

  useEffect(() => {
    applyFilters();
  }, [
    searchQuery,
    selectedStars,
    selectedLocations,
    selectedFacilities,
    selectedRoomTypes,
    selectedMealPlans,
    sliderValue,
    search,
  ]);

  return (
    <div>
      <HotelModifyForm />

      <div className="hotelmodifydropdown_main dropdown_main">
        <div className="hotelavailbility">
          {filteredHotels.length} Hotels Available
        </div>

        <div className="hotelmodifyinputs_wrapper">
          <div className="inputWrapper">
            <input
              type="text"
              className="hotelmodifyinput"
              placeholder="Search hotels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="hotelmodifydropdown">
            <select id="sortOptions" className="hotelmodifyselect">
              <option value="">-- Price Low to High --</option>
              <option value="popularity">Popularity</option>
              <option value="Low to High">Low to High</option>
              <option value="High to Low">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <Container>
        <section className="hotellist_fliter">
          <Row>
            <Col lg={3} md={3} sm={12}>
              {/* 👇 Add Price Slider */}
              {/* <div className="box-content mb-3">
                <h4>
                  Price Range: ₹{sliderValue[0]} - ₹{sliderValue[1]}
                </h4>
                <Slider
                  range
                  min={minFare}
                  max={maxFare}
                  value={sliderValue}
                  onChange={(val) => setSliderValue(val)}
                  className="custom-slider"
                />
              </div> */}

              <HotelFiltering
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedStars={selectedStars}
                selectedLocations={selectedLocations}
                selectedFacilities={selectedFacilities}
                selectedRoomTypes={selectedRoomTypes}
                selectedMealPlans={selectedMealPlans}
                search={search}
                handleToggle={handleToggle}
                setSelectedStars={setSelectedStars}
                setSelectedLocations={setSelectedLocations}
                setSelectedFacilities={setSelectedFacilities}
                setSelectedRoomType={setSelectedRoomTypes}
                setSelectedMealPlans={setSelectedMealPlans}
                allMealPlans={allMealPlans}
                allRoomTypes={allRoomTypes}
                allFacilities={allFacilities}
                allLocations={allLocations}
                allStars={allStars}
                hotelList={hotelList}
                clearAll={clearAll}
                maxFare={maxFare}
                minFare={minFare}
                sliderValue={sliderValue}
                setSliderValue={setSliderValue}
              />
            </Col>
            <Col lg={9} md={9} sm={12}>
              <HotelListingModifyNew hotel={filteredHotels} loading={loading} />
              <HotelMobileFilters />
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
}

export default HotelModifyNew;
