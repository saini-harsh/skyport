import React, { useEffect, useRef, useState } from "react";
import "./FlightDetail.css";
import FlightDetailSkeleton from "./FlightDetailSkeleton";
// import FlightDetailSide from "./FlightDetailSide";
import DepatureDetail from "./DepatureDetail";
import FlightPayModal from "./FlightPayModal";
// import { MdFlightLand } from "react-icons/md";
// import { FaAngleDown, FaRegThumbsUp } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import "dayjs/locale/en-gb";
import {
  Container,
  Row,
  Col,
  // Form,
  // InputGroup,
  // FormControl,
  Nav,
  // Modal,
  Modal,
  Button,
  Card,
  Spinner,
  // Tab,
  // Card,
} from "react-bootstrap";
// import { HiPlusSmall } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { HiMiniMinusSmall } from "react-icons/hi2";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import GoodToKnow from "./GoodToKnow";
// import FlightPayDetail from "./FlightPayDetail";
import FareRule from "./FareRule";
import SSRContent from "./SSRContent";
import ChargesOneWay from "./ChargesOneWay";
import BDSend from "./BDSend";
import TravellerInformation from "./TravellerInformation";
import EmiModal from "./EmiModal";
import { cities12 } from "../../../Cities";
import { initializePhonePe, PhonePe } from "phonepesdk-web"; // Import PhonePe SDK
import { BsInfoCircleFill } from "react-icons/bs";
import TripSecure from "./TripSecure";
import { toast } from "react-toastify";
import WhyBook from "./WhyBook";
import MobileTravellers from "./MobileTravellers";
import FlightSSR from "./FlightSSR.jsx";
import ReviewPassneger from "./ReviewPassneger.jsx";
const FlightDetail = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(null);

  const [fromCurrency2, setFromCurrency2] = useState("IRR");
  const [toCurrency2, setToCurrency2] = useState("INR");
  const [exchangeRate2, setExchangeRate2] = useState(null);

  const [isPassportMandatory, setIsPassportMandatory] = useState(false);
  const [openPayBtn, setOpenPayBtn] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState(false);
  const decodedIndex = decodeURIComponent(useParams().index);
  const decodedIndex2 = decodeURIComponent(useParams().index2);
  const srdvIdx = decodeURIComponent(useParams().srdvIdx);
  const [flight, setFlight] = useState(null);
  const [fareRule, setFareRule] = useState(null);
  const [ssrResponse, setSsrResponse] = useState(null);
  const [flight2, setFlight2] = useState(null);
  const [flight3, setFlight3] = useState(null);
  const [fareRule2, setFareRule2] = useState(null);
  const [ssrResponse2, setSsrResponse2] = useState(null);
  const [emiBtn, setEmiBtn] = useState(false);
  const search = useSelector((state) => state.flight.search);
  const [passengerBaggagePreferences, setPassengerBaggagePreferences] =
    useState([]);
  const [passengerSeatPreferences, setPassengerSeatPreferences] = useState([]);
  const [passengerMealPreferences, setPassengerMealPreferences] = useState([]);
  const [token, setToken] = useState();
  const [sessionId, setSessionId] = useState();
  const [traceId, setTraceId] = useState();
  const navigate = useNavigate();
  const [showdetail, setShowdetail] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [passengers, setPassengers] = useState([]);
  const [formData, setFormData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [infant, setInfant] = useState([]);
  const { walletData } = useSelector((state) => state.auth);
  const [totalSeatPrice, setTotalSeatPrice] = useState(0);
  const [selectedOutboundSeats, setSelectedOutboundSeats] = useState({
    adult: [],
    child: [],
  });
  const [selectedInboundSeats, setSelectedInboundSeats] = useState({
    adult: [],
    child: [],
  });

  const [selectedInboundMeals, setSelectedInboundMeals] = useState("");
  const [selectedOutboundMeals, setSelectedOutboundMeals] = useState("");
  const [totalMealPrice, setTotalMealPrice] = useState(0);
  const [selectedInboundBaggage, setSelectedInboundBaggage] = useState("");
  const [totalBaggagePrice, setTotalBaggagePrice] = useState(0);
  const [selectedOutboundBaggage, setSelectedOutboundBaggage] = useState("");
  console.log("selectedOutboundSeats", selectedOutboundSeats);
  console.log("selectedOutboundMeals", selectedOutboundMeals);
  console.log("selectedOutboundBaggage", selectedOutboundBaggage);

  const handleSeatChange = (data) => {
    setSelectedOutboundSeats(data.selectedSeats.ssr);
    setSelectedInboundSeats(data.selectedSeats.ssr2);
    setTotalSeatPrice(data.totalSeatPrice);
  };

  const handleMealChange = (data) => {
    setSelectedOutboundMeals(data.selectedMeals.ssr);
    setSelectedInboundMeals(data.selectedMeals.ssr2);
    setTotalMealPrice(data.total);
  };
  const handleBaggageChange = (data) => {
    setSelectedInboundBaggage(data.selectedBaggage.ssr2);
    setSelectedOutboundBaggage(data.selectedBaggage.ssr);
    setTotalBaggagePrice(data.total);
  };

  // const [promoCode, setPromoCode] = useState("");
  // const [appliedCode, setAppliedCode] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  console.log("passenger seat preference", passengerSeatPreferences);
  console.log("passenger meal preference", passengerMealPreferences);
  console.log("passenger baggage preference", passengerBaggagePreferences);
  const [loading, setLoading] = useState(false);
  // const [flightPassengers,setFlightPassengers]=useState([])

  console.log("SRDVP", srdvIdx);
  useEffect(() => {
    const storedTraceId = String(sessionStorage.getItem("traceId"));
    const storedToken = String(localStorage.getItem("token"));
    const storedSessionId = String(localStorage.getItem("sessionId"));

    if (storedTraceId && storedToken && storedSessionId) {
      setTraceId(storedTraceId);
      setToken(storedToken);
      setSessionId(storedSessionId);
    } else {
      setTraceId(undefined);
      setToken(undefined);
      setSessionId(undefined);
    }
  }, []);

  useEffect(() => {
    const isValidIndex2 =
      decodedIndex2 !== "" &&
      decodedIndex2 !== "undefined" &&
      decodedIndex2 !== "null";

    if (!token || !traceId || !decodedIndex) {
      console.log(
        "Skipping API call due to missing token/traceId/decodedIndex"
      );
      return;
    }
    const fetchSSRTBO = async () => {
      try {
        const response3 = await axios.post(
          "https://admin.tripgoonline.com/api/flightSsr-lcc",
          {
            EndUserIp: "192.168.11.58",

            TraceId: traceId,
            ResultIndex: decodedIndex,
          }
        );

        if (response3 && response3.data.success) {
          const data = response3.data.data;

          setSsrResponse(data);
        }
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };
    const fetchSSRTBORound = async () => {
      try {
        const response = await axios.post(
          "https://admin.tripgoonline.com/api/flightSsr-lcc",
          {
            EndUserIp: "192.168.11.58",

            TraceId: traceId,
            ResultIndex: decodedIndex,
            ResultIndexIB: decodedIndex2,
          }
        );

        if (response && response.data.success) {
          const data = response.data.data;

          setSsrResponse(data);
          setSsrResponse2(data.Inbound);
        }
      } catch (error) {
        console.error("Error fetching flight data:", error);
      }
    };
    const fetchFlightDetailsTBO = async () => {
      try {
        const payload = {
          EndUserIp: "192.168.11.58",
          TokenId: token,
          TraceId: traceId,
          ResultIndex: decodedIndex,
        };

        console.log("TBO Request payload", payload);

        const [fareQuoteRes] = await Promise.all([
          axios.post(
            "https://admin.tripgoonline.com/api/flight-fare-quote",
            payload
          ),
        ]);

        setFlight(fareQuoteRes.data.data.Results);
        setFlight3(fareQuoteRes.data.data.Results);
        const newPassengers =
          fareQuoteRes.data.data.Results?.FareBreakdown.flatMap(
            ({ PassengerType, PassengerCount }) => {
              const typeLabel =
                PassengerType === 1
                  ? "Adult"
                  : PassengerType === 2
                  ? "Child"
                  : "Infant";
              return Array.from({ length: PassengerCount }, (_, index) => ({
                id: index + 1,
                type: typeLabel,
                name: `Passenger ${index + 1}`,
              }));
            }
          );
        setPassengers(newPassengers);

        if (!fareQuoteRes.data.success || isValidIndex2) {
          navigate("/404");
          toast.error("Supplier Side Error");
        }

        fetchSSRTBO();
      } catch (error) {
        console.error("Error fetching TBO flight data:", error);
        toast.error("Supplier Side Error");
      }
    };

    const fetchFlightDetailsTBORound = async () => {
      try {
        const commonPayload = {
          EndUserIp: "192.168.11.58",
          TokenId: token,
          TraceId: traceId,
        };

        const payloadQuote1 = {
          ...commonPayload,
          ResultIndex: decodedIndex,
          ResultIndexIB: decodedIndex2,
        };

        // const payloadQuote2 = {
        //   ...commonPayload,
        //   ResultIndex: decodedIndex2,
        // };

        console.log(
          "Round trip payloads:",

          payloadQuote1
          // payloadQuote2
        );

        const [resQuote1] = await Promise.all([
          axios.post(
            "https://admin.tripgoonline.com/api/flight-fare-quote",
            payloadQuote1
          ),
          // axios.post(
          //   "https://admin.tripgoonline.com/api/flight-fare-quote",
          //   payloadQuote2
          // ),
        ]);

        setFlight(resQuote1.data.data.Results);
        setFlight2(resQuote1.data.data.Inbound.Results);

        const fareBreakdown = resQuote1.data.data.Results?.FareBreakdown;
        const newPassengers = fareBreakdown?.flatMap(
          ({ PassengerType, PassengerCount }) => {
            const typeLabel =
              PassengerType === 1
                ? "Adult"
                : PassengerType === 2
                ? "Child"
                : "Infant";
            return Array.from({ length: PassengerCount }, (_, index) => ({
              id: index + 1,
              type: typeLabel,
              name: `Passenger ${index + 1}`,
            }));
          }
        );
        setPassengers(newPassengers);

        if (!resQuote1.data.success) {
          navigate("/404");

          toast.error("Supplier Side Error");
        }

        fetchSSRTBORound();
      } catch (error) {
        console.error("Error fetching round trip flight data:", error);
        toast.error("Supplier Side Error");
      }
    };

    if (isValidIndex2) {
      fetchFlightDetailsTBORound();
    } else {
      fetchFlightDetailsTBO();
    }
  }, [token, traceId, decodedIndex, decodedIndex2]);

  console.log("SSR", ssrResponse);
  console.log("SSRInbound", ssrResponse2);
  const [loadingFareRule, setLoadingFareRule] = useState(false);
  const [showFareRuleModal, setShowFareRuleModal] = useState(false);
  const handleFareRuleClick = () => {
    setShowFareRuleModal(true); // open modal immediately
    fetchFareRule(); // fetch data in background
  };

  const fetchFareRule = async () => {
    setLoadingFareRule(true);
    try {
      const payload = {
        EndUserIp: "192.168.11.58",
        TokenId: token,
        TraceId: traceId,
        ResultIndex: decodedIndex,
      };

      const response = await axios.post(
        "https://admin.tripgoonline.com/api/flight-fare-rule",
        payload
      );
      console.log(
        "FARE RULESSSS",
        response.data.data.FareRules[0].FareRuleDetail
      );
      if (!response.data.success) {
        toast.error("Supplier side error");
        navigate("/404");
        return;
      }

      const parsedRules = response.data.data.FareRules?.[0]?.FareRuleDetail
        ? parseFareRule(response.data.data.FareRules[0].FareRuleDetail)
        : [];

      setFareRule(parsedRules);
    } catch (error) {
      console.error("Error fetching fare rule:", error);
      toast.error("Something went wrong");
    } finally {
      setLoadingFareRule(false);
    }
  };

  const parseFareRule = (fareRuleDetail) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = fareRuleDetail;
    const listItems = Array.from(tempDiv.querySelectorAll("li")).map((li) =>
      li.textContent.trim()
    );

    return listItems;
  };
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleInputChange = (index, e) => {
    const { name, value, options, selectedIndex } = e.target;
    const cleanedName = name.replace(/\d+/g, ""); // Remove numeric parts from the name

    const list = [...formData];
    if (!list[index]) {
      list[index] = {};
    }
    if (cleanedName === "nationality") {
      const selectedIndex = e.target.selectedIndex;
      const selectedOption = e.target.options[selectedIndex];

      const selectedCountryCode = selectedOption.value;
      const selectedCountryName = selectedOption.text;

      list[index]["nationality"] = selectedCountryName;
      list[index]["nationalityCode"] = selectedCountryCode;

      return;
    }

    // Handle passport issue date validation
    if (cleanedName === "issuedate" && dayjs(value).isValid()) {
      const issueDate = dayjs(value);
      const sixMonthsAgo = dayjs().subtract(6, "months").startOf("day"); // 6 months ago from today
      const today = dayjs().endOf("day"); // Today

      // Check if the issue date is before 6 months ago, and not in the last 6 months
      if (
        issueDate.isAfter(sixMonthsAgo, "day") ||
        issueDate.isAfter(today, "day")
      ) {
        toast.error(
          "Passport issue date must be before 6 months ago from Flight."
        );
        return; // Prevent setting invalid issue date
      }

      list[index][cleanedName] = issueDate.format("YYYY-MM-DD"); // Save the formatted date
    } else if (cleanedName === "expirydate" && dayjs(value).isValid()) {
      // Passport Expiry Date validation: Must be at least 6 months after current date
      const expiryDate = dayjs(value);
      const sixMonthsFromNow = dayjs().add(6, "months").startOf("day"); // 6 months from today

      if (expiryDate.isBefore(sixMonthsFromNow, "day")) {
        toast.error(
          "Passport expiry date must be at least 6 months from Flight."
        );
        return; // Prevent setting invalid expiry date
      }

      list[index][cleanedName] = expiryDate.format("YYYY-MM-DD"); // Save the formatted date
    } else if (cleanedName === "date" && dayjs(value).isValid()) {
      // Date of Birth validation: User must be at least 18 years old
      const birthDate = dayjs(value);
      const age = dayjs().diff(birthDate, "years");

      if (age < 12) {
        toast.error("The person must be at least 18 years old.");
        return; // Prevent setting invalid DOB
      }

      list[index][cleanedName] = birthDate.format("YYYY-MM-DD"); // Save the formatted DOB
    } else if (
      cleanedName !== "issuedate" &&
      cleanedName !== "expirydate" &&
      cleanedName !== "date"
    ) {
      // For other fields, just save the raw value
      list[index][cleanedName] = value;
    } else {
      console.log("Invalid date");
    }

    setFormData(list); // Update form data with the new value
  };

  const handleInputChange1 = (index, e) => {
    const { name, value, options, selectedIndex } = e.target;
    const cleanedName = name.replace(/\d+/g, ""); // Remove numeric parts from the name

    const list = [...childData];
    if (!list[index]) {
      list[index] = {};
    }
    if (cleanedName === "nationality") {
      const selectedIndex = e.target.selectedIndex;
      const selectedOption = e.target.options[selectedIndex];

      const selectedCountryCode = selectedOption.value;
      const selectedCountryName = selectedOption.text;

      list[index]["nationality"] = selectedCountryName;
      list[index]["nationalityCode"] = selectedCountryCode;

      return;
    }
    // Handle passport issue date validation
    if (cleanedName === "issuedate" && dayjs(value).isValid()) {
      const issueDate = dayjs(value);
      const sixMonthsAgo = dayjs().subtract(6, "months").startOf("day"); // 6 months ago from today
      const today = dayjs().endOf("day"); // Today

      // Check if the issue date is before 6 months ago, and not in the last 6 months
      if (
        issueDate.isAfter(sixMonthsAgo, "day") ||
        issueDate.isAfter(today, "day")
      ) {
        toast.error(
          "Passport issue date must be before 6 months ago from Flight."
        );
        return; // Prevent setting invalid issue date
      }

      list[index][cleanedName] = issueDate.format("YYYY-MM-DD"); // Save the formatted date
    } else if (cleanedName === "expirydate" && dayjs(value).isValid()) {
      // Passport Expiry Date validation: Must be at least 6 months after current date
      const expiryDate = dayjs(value);
      const sixMonthsFromNow = dayjs().add(6, "months").startOf("day"); // 6 months from today

      if (expiryDate.isBefore(sixMonthsFromNow, "day")) {
        toast.error(
          "Passport expiry date must be at least 6 months from Flight."
        );
        return; // Prevent setting invalid expiry date
      }

      list[index][cleanedName] = expiryDate.format("YYYY-MM-DD"); // Save the formatted date
    } else if (cleanedName === "date" && dayjs(value).isValid()) {
      // Date of Birth validation: User must be between 2 and 12 years old
      const birthDate = dayjs(value);
      const age = dayjs().diff(birthDate, "years");

      // Check if the person is between 2 and 12 years old
      if (age < 2 || age > 12) {
        toast.error("The person must be between 2 and 12 years old.");
        return; // Prevent setting invalid DOB
      }

      list[index][cleanedName] = birthDate.format("YYYY-MM-DD"); // Save the formatted DOB
    } else if (
      cleanedName !== "issuedate" &&
      cleanedName !== "expirydate" &&
      cleanedName !== "date"
    ) {
      // For other fields, just save the raw value
      list[index][cleanedName] = value;
    } else {
      console.log("Invalid date");
    }

    setChildData(list); // Update form data with the new value
  };

  const getSixMonthsAfterArrival = () => {
    // Check if flight.PricedItinerary.OriginDestinationOptions exists and has data
    if (
      flight &&
      flight.PricedItinerary &&
      flight.PricedItinerary.OriginDestinationOptions &&
      flight.PricedItinerary.OriginDestinationOptions.length > 0
    ) {
      const flightArrTime = new Date(
        flight.PricedItinerary.OriginDestinationOptions[
          flight.PricedItinerary.OriginDestinationOptions.length - 1
        ].FlightSegments[
          flight.PricedItinerary.OriginDestinationOptions[
            flight.PricedItinerary.OriginDestinationOptions.length - 1
          ].FlightSegments.length - 1
        ].ArrivalDateTime
      );

      const sixMonthsAfterArrTime = new Date(
        flightArrTime.setMonth(flightArrTime.getMonth() + 6)
      );

      return sixMonthsAfterArrTime;
    } else {
      const flightArrTime = new Date(
        flight.tripInfos[0].sI[flight.tripInfos[0].sI.length - 1].at
      );

      const sixMonthsAfterArrTime = new Date(
        flightArrTime.setMonth(flightArrTime.getMonth() + 6)
      );

      return sixMonthsAfterArrTime;
    }
  };

  const isValidExpiryDate = (date) => {
    const expiryDate = new Date(date);
    const sixMonthsAfterArrival = getSixMonthsAfterArrival();
    return {
      isValid: expiryDate >= sixMonthsAfterArrival,
      validDate: sixMonthsAfterArrival.toISOString().split("T")[0], // Return in yyyy-mm-dd format
    };
  };

  const handleExpiryDateChange = (index, e) => {
    const { value } = e.target;
    const { isValid, validDate } = isValidExpiryDate(value);

    if (!isValid) {
      toast.error(
        "The expiry date must be at least 6 months after the flight date."
      );
      // Set the date to 6 months after the flight's arrival date
      handleInputChange(index, {
        target: { name: e.target.name, value: validDate },
      });
      console.log("formdataaaa", formData);
    } else {
      handleInputChange(index, e);
    }
  };

  const handleExpiryDateChange1 = (index, e) => {
    const { value } = e.target;
    const { isValid, validDate } = isValidExpiryDate(value);

    if (!isValid) {
      toast.error(
        "The expiry date must be at least 6 months after Flight date"
      );
      handleInputChange1(index, {
        target: { name: e.target.name, value: validDate },
      });
    } else {
      handleInputChange1(index, e);
    }
  };

  const handleExpiryDateChange2 = (index, e) => {
    const { value } = e.target;
    const list = [...infant];

    // Ensure expiry date is at least 6 months from today
    if (dayjs(value).isBefore(dayjs().add(6, "months"))) {
      toast.error(
        "The expiry date must be at least 6 months after the current date."
      );
      return;
    }

    // Update the expiry date
    list[index].expirydate = value;
    setInfant(list);
  };

  const isValidDateOfBirth = (date) => {
    const currentDate = new Date();
    const dob = new Date(date);
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age >= 12;
  };

  const isValidDateOfBirth1 = (date) => {
    const currentDate = new Date();
    const dob = new Date(date);
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age >= 2 && age < 12;
  };

  const isValidDateOfBirth2 = (date) => {
    const currentDate = new Date();
    const dob = new Date(date);
    let age = currentDate.getFullYear() - dob.getFullYear();
    const monthDiff = currentDate.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age < 2;
  };

  const handleDOBChange = (index, e) => {
    const { name, value } = e.target;

    // Check if the field is for the date of birth
    if (name.includes("date")) {
      // Validate the date of birth (age > 12 years)
      if (!isValidDateOfBirth(value)) {
        toast.error("The age must be greater than 12 years.");
        return; // Prevent the update if invalid
      }
    }

    // Call handleInputChange to update form data
    handleInputChange(index, e);
  };
  const handleDOBChange1 = (index, e) => {
    const { name, value } = e.target;

    // Check if the field is for the date of birth
    if (name.includes("date")) {
      // Validate the date of birth (age > 12 years)
      if (!isValidDateOfBirth11(value)) {
        toast.error("The child must be at least 12 years old.");
        return; // Prevent the update if invalid
      }
    }

    // Call handleInputChange to update form data
    handleInputChange1(index, e);
  };

  // Helper function to validate the child's age
  const isValidDateOfBirth11 = (dob) => {
    const birthDate = dayjs(dob);
    const age = dayjs().diff(birthDate, "years");
    return age >= 2 && age < 12;
  };

  const handleDOBChange2 = (index, e) => {
    const { name, value } = e.target;

    // Check if the field is for the date of birth
    if (name.includes("date")) {
      // Validate the date of birth (age <= 2 years)
      if (dayjs(value).isBefore(dayjs().subtract(2, "years"))) {
        toast.error(
          "The infant's date of birth must be within the last 2 years."
        );
        return; // Prevent the update if invalid
      }
    }

    // Call handleInputChange to update form data
    handleInputChange2(index, e);
  };

  const handleInputChange2 = (index, e) => {
    const { name, value, options, selectedIndex } = e.target;
    const cleanedName = name.replace(/\d+/g, ""); // Remove numeric parts from the name

    const list = [...infant];
    if (!list[index]) {
      list[index] = {};
    }
    if (cleanedName === "nationality") {
      const selectedIndex = e.target.selectedIndex;
      const selectedOption = e.target.options[selectedIndex];

      const selectedCountryCode = selectedOption.value;
      const selectedCountryName = selectedOption.text;

      list[index]["nationality"] = selectedCountryName;
      list[index]["nationalityCode"] = selectedCountryCode;

      return;
    }
    // Handle passport issue date validation
    if (cleanedName === "issuedate" && dayjs(value).isValid()) {
      const issueDate = dayjs(value);
      const sixMonthsAgo = dayjs().subtract(6, "months").startOf("day"); // 6 months ago from today
      const today = dayjs().endOf("day"); // Today

      // Check if the issue date is before 6 months ago, and not in the last 6 months
      if (
        issueDate.isAfter(sixMonthsAgo, "day") ||
        issueDate.isAfter(today, "day")
      ) {
        toast.error(
          "Passport issue date must be before 6 months ago from Flight."
        );
        return; // Prevent setting invalid issue date
      }

      list[index][cleanedName] = issueDate.format("YYYY-MM-DD"); // Save the formatted date
    } else if (cleanedName === "expirydate" && dayjs(value).isValid()) {
      // Passport Expiry Date validation: Must be at least 6 months after current date
      const expiryDate = dayjs(value);
      const sixMonthsFromNow = dayjs().add(6, "months").startOf("day"); // 6 months from today

      if (expiryDate.isBefore(sixMonthsFromNow, "day")) {
        toast.error(
          "Passport expiry date must be at least 6 months from Flight."
        );
        return; // Prevent setting invalid expiry date
      }

      list[index][cleanedName] = expiryDate.format("YYYY-MM-DD"); // Save the formatted date
    } else if (cleanedName === "date" && dayjs(value).isValid()) {
      // Date of Birth validation: Person must be less than or equal to 2 years old
      const birthDate = dayjs(value);
      const age = dayjs().diff(birthDate, "years");

      // Check if the person is less than or equal to 2 years old
      if (age > 2) {
        toast.error("The person must be less than or equal to 2 years old.");
        return; // Prevent setting invalid DOB
      }

      list[index][cleanedName] = birthDate.format("YYYY-MM-DD"); // Save the formatted DOB
    } else if (
      cleanedName !== "issuedate" &&
      cleanedName !== "expirydate" &&
      cleanedName !== "date"
    ) {
      // For other fields, just save the raw value
      list[index][cleanedName] = value;
    } else {
      console.log("Invalid date");
    }

    setInfant(list); // Update form data with the new value
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}T00:00:00`;
  };

  const handleChangeCurrency = (amount) => {
    if (!isNaN(amount) && exchangeRate) {
      // const convertedValue = amount * exchangeRate;
      // return convertedValue.toFixed(2);
      return amount;
    }
  };
  const handleChangeCurrency2 = (amount) => {
    if (!isNaN(amount) && exchangeRate2) {
      // const convertedValue = amount * exchangeRate2;
      // return convertedValue.toFixed(2);
      return amount;
    }
  };

  const handleTicketBookTJ = () => {};
  const handleTicketBookParto = () => {};
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true); // Start loading

    const res = await loadRazorpayScript();
    if (!res) {
      Swal.fire({
        icon: "error",
        title: "Razorpay SDK Failed",
        text: "Please refresh and try again.",
      });
      setLoading(false);
      return;
    }

    try {
      setOpenPayBtn(false);
      // STEP 1: Create Razorpay order
      const { data: orderData } = await axios.post(
        "https://admin.tripgoonline.com/api/create-order",
        {
          amount: Math.round(
            flight2
              ? flight.Fare.PublishedFare +
                  flight2.Fare.PublishedFare +
                  totalSeatPrice +
                  totalMealPrice +
                  totalBaggagePrice
              : flight.Fare.PublishedFare +
                  totalSeatPrice +
                  totalMealPrice +
                  totalBaggagePrice
          ),
        }
      );

      if (orderData.success === false) {
        Swal.fire({
          icon: "error",
          title: "Order Creation Failed",
          text: "Could not initiate payment. Please try again.",
        });
        setLoading(false);
        return;
      }

      // STEP 2: Razorpay options
      const options = {
        key: orderData.data.key,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: "TripGo",
        description: "TripGo",
        image: "/Images/tripgoo.png",
        order_id: orderData.data.order_id,
        handler: async function (response) {
          try {
            // STEP 3: Verify payment
            const { data: verifyData } = await axios.post(
              "https://admin.tripgoonline.com/api/verify-payment",
              {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                type: "web",
              }
            );

            if (verifyData.success) {
              toast.success("✅ Payment Successful!");
              console.log(
                "Full selectedOutboundSeats object:",
                selectedOutboundSeats
              );

              if (flight2) {
                await handleTicketBookRound();
              } else {
                await handleTicketBook();
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Payment Verification Failed",
                text: "Please contact support.",
              });
            }
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            Swal.fire({
              icon: "error",
              title: "Verification Error",
              text: "An error occurred while verifying your payment.",
            });
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: "TripGo",
          email: "support@tripgoonline.com",
          contact: "+91 92112 52356",
        },
        theme: { color: "#053355" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Order creation error:", err);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Something went wrong while creating the order.",
      });
      setLoading(false);
    }
  };
  console.log("FORMDATA", formData);
  const [duringBooking, setDuringBooking] = useState(false);
  function isValidDateFn(date) {
    if (!date || typeof date !== "string") return false;
    if (date.includes("NaN") || date === "NaN-NaN-NaNT00:00:00") return false;
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }

  const handleTicketBook = async () => {
    setLoading(true);
    setDuringBooking(true);
    let isFirstAdult = true;

    const adultPassengers = formData.map((data, index) => {
      const isLeadPax = isFirstAdult;
      isFirstAdult = false;

      const seat =
        Array.isArray(selectedOutboundSeats?.adult) &&
        typeof selectedOutboundSeats.adult[index] === "object"
          ? selectedOutboundSeats.adult[index]
          : null;
      const meal =
        Array.isArray(selectedOutboundMeals?.adult) &&
        typeof selectedOutboundMeals.adult[index] === "object"
          ? selectedOutboundMeals.adult[index]
          : null;
      const baggage =
        Array.isArray(selectedOutboundBaggage?.adult) &&
        typeof selectedOutboundBaggage.adult[index] === "object"
          ? [selectedOutboundBaggage.adult[index]]
          : null;

      return {
        Title: data.title,
        FirstName: data.firstName,
        LastName: data.lastName,
        PaxType: 1,
        DateOfBirth: data.date ? formatDate(data.date) : "",
        Gender: data.title.toLowerCase() === "mr" ? 1 : 2,
        PassportNo: data.passport,
        PassportExpiry: data.expirydate,
        PassportIssueDate: data.issuedate,
        AddressLine1:
          "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
        Fare: flight.FareBreakdown[0],
        Baggage: baggage ? baggage : [],
        MealDynamic: meal ? meal : [],
        SeatDynamic: seat ? seat : [],
        CountryName: "India",
        CountryCode: "IN",
        ContactNo: "9211252356",
        Email: "support@tripgoonline.com",
        IsLeadPax: isLeadPax,
        GSTCompanyAddress: "",
        GSTCompanyContactNumber: "",
        GSTCompanyName: "",
        GSTNumber: "",
        GSTCompanyEmail: "",
      };
    });

    const childPassengers = childData.map((data, index) => {
      const seat =
        Array.isArray(selectedOutboundSeats?.child) &&
        typeof selectedOutboundSeats.child[index] === "object"
          ? selectedOutboundSeats.child[index]
          : null;
      const meal =
        Array.isArray(selectedOutboundMeals?.child) &&
        typeof selectedOutboundMeals.child[index] === "object"
          ? selectedOutboundMeals.child[index]
          : null;
      const baggage =
        Array.isArray(selectedOutboundBaggage?.child) &&
        typeof selectedOutboundBaggage.child[index] === "object"
          ? [selectedOutboundBaggage.child[index]]
          : null;

      return {
        Title: data.title,
        FirstName: data.firstName,
        LastName: data.lastName,
        PaxType: 2,
        DateOfBirth: data.date ? formatDate(data.date) : "",
        Gender: data.title.toLowerCase() === "mr" ? 1 : 2,
        PassportNo: data.passport,
        PassportExpiry: data.expirydate,
        PassportIssueDate: data.issuedate,
        AddressLine1:
          "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
        Fare: flight.FareBreakdown[1],
        Baggage: baggage ? baggage : [],
        MealDynamic: meal ? meal : [],
        SeatDynamic: seat ? seat : [],
        CountryName: "India",
        CountryCode: "IN",
        ContactNo: "9211252356",
        Email: "support@tripgoonline.com",
        IsLeadPax: false,
        GSTCompanyAddress: "",
        GSTCompanyContactNumber: "",
        GSTCompanyName: "",
        GSTNumber: "",
        GSTCompanyEmail: "",
      };
    });

    const infantPassengers = infant.map((data, index) => ({
      Title: data.title,
      FirstName: data.firstName,
      LastName: data.lastName,
      PaxType: 3,
      DateOfBirth: data.date ? formatDate(data.date) : "",
      Gender: data.title.toLowerCase() === "mr" ? 1 : 2,
      PassportNo: data.passport,
      PassportExpiry: data.expirydate,
      PassportIssueDate: data.issuedate,
      AddressLine1:
        "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
      Fare: flight.FareBreakdown[2],
      Baggage: [],

      MealDynamic: [],
      SeatDynamic: [],
      CountryName: data.nationality || "India",
      CountryCode: data.nationalityCode || "IN",
      ContactNo: "9211252356",
      Email: "support@tripgoonline.com",
      IsLeadPax: false,
      GSTCompanyAddress: "",
      GSTCompanyContactNumber: "",
      GSTCompanyName: "",
      GSTNumber: "",
      GSTCompanyEmail: "",
    }));

    // Combine all passengers and apply preferences
    try {
      const allPassengers = [];
      let preferenceIndex = 0;

      [...adultPassengers, ...childPassengers, ...infantPassengers].forEach(
        (passenger, idx) => {
          const mealPreference = passengerMealPreferences[preferenceIndex];
          const baggagePreference =
            passengerBaggagePreferences[preferenceIndex];
          const seatPreference = passengerSeatPreferences[preferenceIndex];

          console.log(`Passenger ${idx}:`);
          console.log("  Name:", passenger.FirstName, passenger.LastName);
          console.log("  Seat Preference:", seatPreference);
          console.log("  SeatDynamic before:", passenger.SeatDynamic);

          allPassengers.push({
            ...passenger,
            MealDynamic: mealPreference
              ? [mealPreference]
              : passenger.MealDynamic ?? [],
            Baggage: baggagePreference
              ? [baggagePreference]
              : passenger.Baggage ?? [],
            SeatDynamic: seatPreference
              ? [seatPreference]
              : passenger.SeatDynamic ?? [],
          });

          console.log("  SeatDynamic after:", allPassengers[idx].SeatDynamic);
          preferenceIndex++;
        }
      );

      const requestData = {
        PreferredCurrency: null,
        ResultIndex: decodedIndex,
        Passengers: allPassengers,
        EndUserIp: "192.168.11.58",
        UserEmail: email,
        UserPhone: mobile,
        Type: "Web",
        IsLCC: flight.IsLCC,
        TokenId: token,
        TraceId: traceId,
        GSTCompanyAddress:
          "A2, Palam-Dabri Road, Mahavir Enclave, Dwarka, New Delhi, India",
        GSTCompanyContactNumber: "9015858565",
        GSTCompanyName: "eWeblink Technology LLP",
        GSTNumber: "07AAFFE6846H1Z9",
        GSTCompanyEmail: "info@eweblink.net",
      };

      console.log("Final requestData to API:", requestData);

      let bookingResponse;
      // if (flight.IsLCC === false) {
      //   const res = await fetch(
      //     "https://admin.tripgoonline.com/api/flight-book",
      //     {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify(requestData),
      //     }
      //   );

      //   if (!res.ok) throw new Error("Booking failed");

      //   bookingResponse = await res.json();
      //   console.log("bookingResponse", bookingResponse);
      //   if (!bookingResponse.success) throw new Error("Booking not successful");

      //   const { PNR, BookingId } = bookingResponse.data.Response;

      //   const ticketRes = await fetch(
      //     "https://admin.tripgoonline.com/api/flight-ticket",
      //     {
      //       method: "POST",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify(requestData),
      //     }
      //   );

      //   const ticketData = await ticketRes.json();
      //   console.log("Non-LCC ticket data:", ticketData);
      //   sessionStorage.setItem(
      //     "BookingId",
      //     JSON.stringify(ticketData?.data?.Response?.BookingId)
      //   );
      //   sessionStorage.setItem(
      //     "PNR",
      //     JSON.stringify(ticketData?.data?.Response?.PNR)
      //   );
      //   sessionStorage.setItem(
      //     "FirstName",
      //     ticketData?.data?.Response?.FlightItinerary?.Passenger?.[0]?.FirstName
      //   );
      //   sessionStorage.setItem(
      //     "LastName",
      //     ticketData?.data?.Response?.FlightItinerary?.Passenger?.[0]?.LastName
      //   );
      // } else

      // {
      const res = await fetch(
        "https://admin.tripgoonline.com/api/flight-ticket",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (!res.ok) throw new Error("Ticket booking failed");

      bookingResponse = await res.json();
      if (!bookingResponse.success)
        throw new Error("Ticket booking unsuccessful");
      // }

      const data2 = bookingResponse;

      sessionStorage.setItem(
        "BookingId",
        JSON.stringify(data2?.data?.Response?.BookingId)
      );
      sessionStorage.setItem("PNR", JSON.stringify(data2?.data?.Response?.PNR));
      sessionStorage.setItem(
        "FirstName",
        data2?.data?.Response?.FlightItinerary?.Passenger?.[0]?.FirstName
      );
      sessionStorage.setItem(
        "LastName",
        data2?.data?.Response?.FlightItinerary?.Passenger?.[0]?.LastName
      );
      sessionStorage.removeItem("PNR2");
      sessionStorage.removeItem("BookingId2");

      navigate(`/flight-ticket/${encodeURIComponent(srdvIdx)}`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        html: `
        <ol style="text-align: left; padding-left: 1.2rem; list-style: disc; font-size: 14px;">
          <li>We're sorry, your booking could not be completed.</li>
          <li>If any amount was deducted, it will be refunded within <strong>5–7 business days</strong>.</li>
          <li>Contact support at <strong><a href="tel:+91 92112 52356">+91 92112 52356</a></strong></li>
        </ol>
      `,
      });
      navigate("/");
    } finally {
      setLoading(false);
      setDuringBooking(false);
    }
  };

  const handleTicketBookRound = () => {
    setLoading(true);
    setDuringBooking(true);
    let isFirstAdult = true;

    const adultPassengers = formData.map((data, index) => {
      const isLeadPax = isFirstAdult;
      isFirstAdult = false;
      const seat =
        Array.isArray(selectedOutboundSeats?.adult) &&
        typeof selectedOutboundSeats.adult[index] === "object"
          ? selectedOutboundSeats.adult[index]
          : null;
      const meal =
        Array.isArray(selectedOutboundMeals?.adult) &&
        typeof selectedOutboundMeals.adult[index] === "object"
          ? selectedOutboundMeals.adult[index]
          : null;
      const baggage =
        Array.isArray(selectedOutboundBaggage?.adult) &&
        typeof selectedOutboundBaggage.adult[index] === "object"
          ? [selectedOutboundBaggage.adult[index]]
          : null;

      const seatIB =
        Array.isArray(selectedInboundSeats?.adult) &&
        typeof selectedInboundSeats.adult[index] === "object"
          ? selectedInboundSeats.adult[index]
          : null;
      const mealIB =
        Array.isArray(selectedInboundMeals?.adult) &&
        typeof selectedInboundMeals.adult[index] === "object"
          ? selectedInboundMeals.adult[index]
          : null;
      const baggageIB =
        Array.isArray(selectedInboundBaggage?.adult) &&
        typeof selectedInboundBaggage.adult[index] === "object"
          ? [selectedInboundBaggage.adult[index]]
          : null;
      return {
        Title: data.title,
        FirstName: data.firstName,
        LastName: data.lastName,
        PaxType: 1,
        DateOfBirth: data.date ? formatDate(data.date) : "",

        Gender: data.title.toLowerCase() === "mr" ? 1 : 2,
        PassportNo: data.passport,
        PassportExpiry: data.expirydate,
        PassportIssueDate: data.issuedate,
        AddressLine1:
          "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
        Fare: {
          Currency: flight2.FareBreakdown[0].Currency,
          BaseFare: flight2.FareBreakdown[0].BaseFare,
          Tax: flight2.FareBreakdown[0].Tax,
          TaxBreakup: flight2.FareBreakdown[0].TaxBreakup,
          YQTax: flight2.FareBreakdown[0].YQTax,
          AdditionalTxnFeeOfrd: flight2.FareBreakdown[0].AdditionalTxnFeeOfrd,
          AdditionalTxnFeePub: flight2.FareBreakdown[0].AdditionalTxnFeePub,
          PublishedFare: flight2.Fare.PublishedFare,
          OfferedFare: flight2.Fare.OfferedFare,
          Discount: flight2.Fare.Discount,
        },
        FareIB: {
          Currency: flight2.FareBreakdown[0].Currency,
          BaseFare: flight2.FareBreakdown[0].BaseFare,
          Tax: flight2.FareBreakdown[0].Tax,
          TaxBreakup: flight2.FareBreakdown[0].TaxBreakup,
          YQTax: flight2.FareBreakdown[0].YQTax,
          AdditionalTxnFeeOfrd: flight2.FareBreakdown[0].AdditionalTxnFeeOfrd,
          AdditionalTxnFeePub: flight2.FareBreakdown[0].AdditionalTxnFeePub,
          PublishedFare: flight2.Fare.PublishedFare,
          OfferedFare: flight2.Fare.OfferedFare,
          Discount: flight2.Fare.Discount,
        },
        Baggage: baggage ? baggage : [],
        MealDynamic: meal ? meal : [],
        SeatDynamic: seat ? seat : [],
        BaggageIB: baggageIB ? baggageIB : [],
        MealDynamicIB: mealIB ? mealIB : [],
        SeatDynamicIB: seatIB ? seatIB : [],

        ContactNo: "9211252356",
        CountryName: data.nationality || "India",
        CountryCode: data.nationalityCode || "IN",
        Email: "support@tripgoonline.com",
        IsLeadPax: isLeadPax,
        // FFAirlineCode: flight2.Fare.Segments[0][0].Airline.FFAirlineCode,
        // FFNumber: "123",
        GSTCompanyAddress: "",
        GSTCompanyContactNumber: "",
        GSTCompanyName: "",
        GSTNumber: "",
        GSTCompanyEmail: "",
      };
    });

    const childPassengers = childData.map((data, index) => {
      const seat =
        Array.isArray(selectedOutboundSeats?.child) &&
        typeof selectedOutboundSeats.child[index] === "object"
          ? selectedOutboundSeats.child[index]
          : null;
      const meal =
        Array.isArray(selectedOutboundMeals?.child) &&
        typeof selectedOutboundMeals.child[index] === "object"
          ? selectedOutboundMeals.child[index]
          : null;
      const baggage =
        Array.isArray(selectedOutboundBaggage?.child) &&
        typeof selectedOutboundBaggage.child[index] === "object"
          ? [selectedOutboundBaggage.child[index]]
          : null;

      const seatIB =
        Array.isArray(selectedInboundSeats?.child) &&
        typeof selectedInboundSeats.child[index] === "object"
          ? selectedInboundSeats.child[index]
          : null;
      const mealIB =
        Array.isArray(selectedInboundMeals?.child) &&
        typeof selectedInboundMeals.child[index] === "object"
          ? selectedInboundMeals.child[index]
          : null;
      const baggageIB =
        Array.isArray(selectedInboundBaggage?.child) &&
        typeof selectedInboundBaggage.child[index] === "object"
          ? [selectedInboundBaggage.child[index]]
          : null;
      return {
        Title: data.title,
        FirstName: data.firstName,
        LastName: data.lastName,
        PaxType: 2,
        DateOfBirth: data.date ? formatDate(data.date) : "",
        Gender: data.title.toLowerCase() === "mr" ? 1 : 2,
        PassportNo: data.passport,
        PassportExpiry: data.expirydate,
        PassportIssueDate: data.issuedate,
        AddressLine1:
          "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
        Fare: {
          Currency: flight2.FareBreakdown[1].Currency,
          BaseFare: flight2.FareBreakdown[1].BaseFare,
          Tax: flight2.FareBreakdown[1].Tax,
          TaxBreakup: flight2.FareBreakdown[1].TaxBreakup,
          YQTax: flight2.FareBreakdown[1].YQTax,
          AdditionalTxnFeeOfrd: flight2.FareBreakdown[1].AdditionalTxnFeeOfrd,
          AdditionalTxnFeePub: flight2.FareBreakdown[1].AdditionalTxnFeePub,
          PublishedFare: flight2.Fare.PublishedFare,
          OfferedFare: flight2.Fare.OfferedFare,
          Discount: flight2.Fare.Discount,
        },
        FareIB: {
          Currency: flight2.FareBreakdown[1].Currency,
          BaseFare: flight2.FareBreakdown[1].BaseFare,
          Tax: flight2.FareBreakdown[1].Tax,
          TaxBreakup: flight2.FareBreakdown[1].TaxBreakup,
          YQTax: flight2.FareBreakdown[1].YQTax,
          AdditionalTxnFeeOfrd: flight2.FareBreakdown[1].AdditionalTxnFeeOfrd,
          AdditionalTxnFeePub: flight2.FareBreakdown[1].AdditionalTxnFeePub,
          PublishedFare: flight2.Fare.PublishedFare,
          OfferedFare: flight2.Fare.OfferedFare,
          Discount: flight2.Fare.Discount,
        },
        Baggage: baggage ? baggage : [],
        MealDynamic: meal ? meal : [],
        SeatDynamic: seat ? seat : [],
        BaggageIB: baggageIB ? baggageIB : [],
        MealDynamicIB: mealIB ? mealIB : [],
        SeatDynamicIB: seatIB ? seatIB : [],

        CountryName: data.nationality || "India",
        CountryCode: data.nationalityCode || "IN",

        ContactNo: "9211252356",
        Email: "support@tripgoonline.com",
        IsLeadPax: false,
        // FFAirlineCode: flight2.Fare.Segments[0][0].Airline.FFAirlineCode,
        // FFNumber: "123",
        GSTCompanyAddress: "",
        GSTCompanyContactNumber: "",
        GSTCompanyName: "",
        GSTNumber: "",
        GSTCompanyEmail: "",
      };
    });

    const infantPassengers = infant.map((data) => ({
      Title: data.title,
      FirstName: data.firstName,
      LastName: data.lastName,
      PaxType: 3,

      DateOfBirth: data.date ? formatDate(data.date) : "",
      Gender: data.title.toLowerCase() === "mr" ? 1 : 2,
      PassportNo: data.passport,
      PassportExpiry: data.expirydate,
      PassportIssueDate: data.issuedate,
      AddressLine1:
        "1815, Tower-4, DLF Corporate Greens, Sector 74A, Gurugram - 122004",
      Fare: {
        Currency: flight2.FareBreakdown[2].Currency,
        BaseFare: flight2.FareBreakdown[2].BaseFare,
        Tax: flight2.FareBreakdown[2].Tax,
        TaxBreakup: flight2.FareBreakdown[2].TaxBreakup,
        YQTax: flight2.FareBreakdown[2].YQTax,
        AdditionalTxnFeeOfrd: flight2.FareBreakdown[2].AdditionalTxnFeeOfrd,
        AdditionalTxnFeePub: flight2.FareBreakdown[2].AdditionalTxnFeePub,
        PublishedFare: flight2.Fare.PublishedFare,
        OfferedFare: flight2.Fare.OfferedFare,
        Discount: flight2.Fare.Discount,
      },
      FareIB: {
        Currency: flight2.FareBreakdown[2].Currency,
        BaseFare: flight2.FareBreakdown[2].BaseFare,
        Tax: flight2.FareBreakdown[2].Tax,
        TaxBreakup: flight2.FareBreakdown[2].TaxBreakup,
        YQTax: flight2.FareBreakdown[2].YQTax,
        AdditionalTxnFeeOfrd: flight2.FareBreakdown[2].AdditionalTxnFeeOfrd,
        AdditionalTxnFeePub: flight2.FareBreakdown[2].AdditionalTxnFeePub,
        PublishedFare: flight2.Fare.PublishedFare,
        OfferedFare: flight2.Fare.OfferedFare,
        Discount: flight2.Fare.Discount,
      },
      Baggage: [],
      MealDynamic: [],
      SeatDynamic: [],
      BaggageIB: [],
      MealDynamicIB: [],
      SeatDynamicIB: [],

      CountryName: data.nationality || "India",
      CountryCode: data.nationalityCode || "IN",
      ContactNo: "9211252356",
      Email: "support@tripgoonline.com",
      IsLeadPax: false,
      // FFAirlineCode: flight2.Fare.Segments[0][0].Airline.FFAirlineCode,
      // FFNumber: "123",
      GSTCompanyAddress: "",
      GSTCompanyContactNumber: "",
      GSTCompanyName: "",
      GSTNumber: "",
      GSTCompanyEmail: "",
    }));

    const allPassengers = [];
    let preferenceIndex = 0;

    [...adultPassengers, ...childPassengers, ...infantPassengers].forEach(
      (passenger, idx) => {
        const mealPreference = passengerMealPreferences[preferenceIndex];
        const baggagePreference = passengerBaggagePreferences[preferenceIndex];
        const seatPreference = passengerSeatPreferences[preferenceIndex];

        allPassengers.push({
          ...passenger,
          MealDynamic: mealPreference
            ? [mealPreference]
            : passenger.MealDynamic ?? [],
          Baggage: baggagePreference
            ? [baggagePreference]
            : passenger.Baggage ?? [],
          SeatDynamic: seatPreference
            ? [seatPreference]
            : passenger.SeatDynamic ?? [],
          MealDynamicIB: mealPreference
            ? [mealPreference]
            : passenger.MealDynamicIB ?? [],
          BaggageIB: baggagePreference
            ? [baggagePreference]
            : passenger.BaggageIB ?? [],
          SeatDynamicIB: seatPreference
            ? [seatPreference]
            : passenger.SeatDynamicIB ?? [],
        });

        // console.log("  SeatDynamic after:", allPassengers[idx].SeatDynamic);
        preferenceIndex++;
      }
    );

    // const allPassengers = [
    //   ...adultPassengers,
    //   ...childPassengers,
    //   ...infantPassengers,
    // ];

    const requestData = {
      PreferredCurrency: null,
      ResultIndex: decodedIndex,
      ResultIndexIB: decodedIndex2,
      Passengers: allPassengers,
      EndUserIp: "192.168.11.58",
      TokenId: token,
      UserEmail: email,
      UserPhone: mobile,
      Type: "Web",
      IsLCC: flight.IsLCC,
      IsLCCIB: flight2.IsLCC,
      TraceId: traceId,
      GSTCompanyAddress:
        "A2, Palam-Dabri Road, Mahavir Enclave, Dwarka, New Delhi, India",
      GSTCompanyContactNumber: "9015858565",
      GSTCompanyName: "eWeblink Technology LLP",
      GSTNumber: "07AAFFE6846H1Z9",
      GSTCompanyEmail: "info@eweblink.net",
    };
    console.log("requestData2", requestData);

    // Make the API call
    const apiUrl = "https://admin.tripgoonline.com/api/flight-ticket";
    // const apiUrl = flight2.IsLCC
    //   ? "https://admin.tripgoonline.com/api/flight-ticket"
    //   : "https://admin.tripgoonline.com/api/flight-book";

    // flight2 &&
    //   flight2.IsLCC &&
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          navigate("/");
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data2) => {
        // Handle the API response data
        console.log("LCC flight2 ticket booked successfully:", data2);
        if (!data2.success) {
          navigate("/");
        }
        sessionStorage.setItem(
          "BookingId",
          JSON.stringify(data2.data.Response.BookingId)
        );
        sessionStorage.setItem(
          "BookingId2",
          JSON.stringify(data2.data.Inbound.Response.BookingId)
        );
        sessionStorage.setItem("PNR", JSON.stringify(data2.data.Response.PNR));
        sessionStorage.setItem(
          "PNR2",
          JSON.stringify(data2.data.Inbound.Response.PNR)
        );
        sessionStorage.setItem(
          "FirstName",
          data2.data.Response.FlightItinerary.Passenger[0].FirstName
        );
        sessionStorage.setItem(
          "LastName",
          data2.data.Response.FlightItinerary.Passenger[0].LastName
        );
        // You can perform further actions here based on the API response

        // if (!flight2.IsLCC && data2.success) {
        //   // Extract PNR and BookingId
        //   const { PNR, BookingId } = data2.data.Response;
        //   // Make API call to get flight2 ticket
        //   fetch("https://admin.tripgoonline.com/api/flight-ticket", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       EndUserIp: "192.168.10.10",
        //       TokenId: token,
        //       TraceId: requestData.TraceId,
        //       BookingId,
        //       PNR,
        //     }),
        //   })
        //     .then((ticketResponse) => ticketResponse.json())
        //     .then((ticketData) => {
        //       // Handle ticket data
        //       console.log("LCC flight2 ticket data:", ticketData);
        //     })
        //     .catch((error) => {
        //       // Handle errors
        //       console.error(
        //         "Error while fetching NonLCC flight2 ticket:",
        //         error
        //       );
        //       navigate("/404");
        //     });
        // }

        navigate(`/flight-ticket/${encodeURIComponent(srdvIdx)}`);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          html: `
    <ol style="text-align: left; padding-left: 1.2rem; list-style: disc; font-size: 14px;">
      <li>We're sorry, your booking could not be completed.</li>
      <li>If any amount was deducted, it will be refunded within <strong>5–7 business days</strong>.</li>
      <li>Feel free to try again, or contact our support team at <br/> <strong><a href="tel:+91 92112 52356">+91 92112 52356</a></strong> — we're here to help!</li>
     
    </ol>
  `,
        });
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
        setDuringBooking(false);
      });
  };

  const [error, setError] = useState(null);

  const handleChangeFlight = () => {
    navigate(-1);
  };

  const validatePassengerData = () => {
    const isPassportMandatory = flight.IsPassportRequiredAtBook === true;
    const isLCC = flight.IsLCC === false;

    // Required fields: if LCC, then dob (date) is mandatory; otherwise, optional
    const requiredFields = isLCC
      ? ["title", "firstName", "lastName", "date"]
      : ["title", "firstName", "lastName"];

    const passportFields = ["passport", "issuedate", "expirydate"];

    const today = dayjs();
    const sixMonthsAgo = today.subtract(6, "month");
    const sixMonthsLater = today.add(6, "month");

    const getAge = (dob) => today.diff(dayjs(dob), "year");

    // Validate booking details: mobile and email

    const isValid = (data, index, type) => {
      // Validate required fields
      for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === "") {
          Swal.fire({
            icon: "error",
            title: "Missing Field",
            text: `Please fill out the ${field} for ${type} ${index + 1}.`,
          });
          return false;
        }
      }

      // DOB & age validation only if LCC or DOB exists
      if (isLCC || data.date) {
        const age = getAge(data.date);
        if (type === "adult" && age < 18) {
          Swal.fire({
            icon: "error",
            title: "Invalid Age",
            text: `Adult ${index + 1} must be at least 18 years old.`,
          });
          return false;
        } else if (type === "child" && (age < 2 || age > 12)) {
          Swal.fire({
            icon: "error",
            title: "Invalid Age",
            text: `Child ${index + 1} must be between 2 and 12 years old.`,
          });
          return false;
        } else if (type === "infant" && age >= 2) {
          Swal.fire({
            icon: "error",
            title: "Invalid Age",
            text: `Infant ${index + 1} must be under 2 years old.`,
          });
          return false;
        }
      }

      // Passport validation
      if (isPassportMandatory) {
        for (const field of passportFields) {
          if (!data[field] || data[field].trim() === "") {
            Swal.fire({
              icon: "error",
              title: "Missing Passport Info",
              text: `Please fill out the ${field} for ${type} ${index + 1}.`,
            });
            return false;
          }
        }

        const issueDate = dayjs(data.issuedate);
        if (
          data.issuedate &&
          issueDate.isAfter(dayjs().subtract(6, "months"))
        ) {
          Swal.fire({
            icon: "error",
            title: "Invalid Passport Issue Date",
            text: `Passport issue date for ${type} ${
              index + 1
            } must be at least 6 months old.`,
          });
          return false;
        }

        const expiryDate = dayjs(data.expirydate);
        if (!expiryDate.isValid() || expiryDate.isBefore(sixMonthsLater)) {
          Swal.fire({
            icon: "error",
            title: "Invalid Passport Expiry Date",
            text: `Passport expiry date for ${type} ${
              index + 1
            } must be at least 6 months in the future.`,
          });
          return false;
        }
      }

      return true;
    };

    const adultCount = flight?.FareBreakdown?.[0]?.PassengerCount || 0;
    const childCount = flight?.FareBreakdown?.[1]?.PassengerCount || 0;
    const infantCount = flight?.FareBreakdown?.[2]?.PassengerCount || 0;

    if (formData.length !== adultCount) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Adult Data",
        text: `Please fill out details for all ${adultCount} adults.`,
      });
      return false;
    }
    for (let i = 0; i < formData.length; i++) {
      if (!isValid(formData[i], i, "adult")) return false;
    }

    if (childData.length !== childCount) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Child Data",
        text: `Please fill out details for all ${childCount} children.`,
      });
      return false;
    }
    for (let i = 0; i < childData.length; i++) {
      if (!isValid(childData[i], i, "child")) return false;
    }

    if (infant.length !== infantCount) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Infant Data",
        text: `Please fill out details for all ${infantCount} infants.`,
      });
      return false;
    }
    for (let i = 0; i < infant.length; i++) {
      if (!isValid(infant[i], i, "infant")) return false;
    }
    if (!bookingDetails.mobile || bookingDetails.mobile.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Missing Mobile Number",
        text: "Please enter your mobile number.",
      });
      return false;
    } else if (!/^\d{10}$/.test(bookingDetails.mobile)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Mobile Number",
        text: "Mobile number must be 10 digits.",
      });
      return false;
    }

    if (!bookingDetails.email || bookingDetails.email.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Missing Email",
        text: "Please enter your email address.",
      });
      return false;
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
        bookingDetails.email
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address.",
      });
      return false;
    }

    return true;
  };

  // const validatePassengerData = () => {
  //   const isPassportMandatory = flight.IsPassportRequiredAtBook === true;
  //   const isLCC = flight.IsLCC === false;

  //   // Required fields: if LCC, then dob (date) is mandatory; otherwise, optional
  //   const requiredFields = isLCC
  //     ? ["title", "firstName", "lastName", "date"]
  //     : ["title", "firstName", "lastName"];

  //   const passportFields = ["passport", "issuedate", "expirydate"];

  //   const today = dayjs();
  //   const sixMonthsAgo = today.subtract(6, "month");
  //   const sixMonthsLater = today.add(6, "month");

  //   const getAge = (dob) => today.diff(dayjs(dob), "year");

  //   const isValid = (data, index, type) => {
  //     // Validate required fields
  //     for (const field of requiredFields) {
  //       if (!data[field] || data[field].trim() === "") {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Missing Field",
  //           text: `Please fill out the ${field} for ${type} ${index + 1}.`,
  //         });
  //         return false;
  //       }
  //     }

  //     // DOB & age validation only if LCC or DOB exists
  //     if (isLCC || data.date) {
  //       const age = getAge(data.date);
  //       if (type === "adult" && age < 18) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Invalid Age",
  //           text: `Adult ${index + 1} must be at least 18 years old.`,
  //         });
  //         return false;
  //       } else if (type === "child" && (age < 2 || age > 12)) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Invalid Age",
  //           text: `Child ${index + 1} must be between 2 and 12 years old.`,
  //         });
  //         return false;
  //       } else if (type === "infant" && age >= 2) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Invalid Age",
  //           text: `Infant ${index + 1} must be under 2 years old.`,
  //         });
  //         return false;
  //       }
  //     }

  //     // Passport validation
  //     if (isPassportMandatory) {
  //       for (const field of passportFields) {
  //         if (!data[field] || data[field].trim() === "") {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Missing Passport Info",
  //             text: `Please fill out the ${field} for ${type} ${index + 1}.`,
  //           });
  //           return false;
  //         }
  //       }

  //       const issueDate = dayjs(data.issuedate);
  //       if (
  //         data.issuedate &&
  //         issueDate.isAfter(dayjs().subtract(6, "months"))
  //       ) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Invalid Passport Issue Date",
  //           text: `Passport issue date for ${type} ${
  //             index + 1
  //           } must be at least 6 months old.`,
  //         });
  //         return false;
  //       }

  //       const expiryDate = dayjs(data.expirydate);
  //       if (!expiryDate.isValid() || expiryDate.isBefore(sixMonthsLater)) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "Invalid Passport Expiry Date",
  //           text: `Passport expiry date for ${type} ${
  //             index + 1
  //           } must be at least 6 months in the future.`,
  //         });
  //         return false;
  //       }
  //     }

  //     return true;
  //   };

  //   const adultCount = flight?.FareBreakdown?.[0]?.PassengerCount || 0;
  //   const childCount = flight?.FareBreakdown?.[1]?.PassengerCount || 0;
  //   const infantCount = flight?.FareBreakdown?.[2]?.PassengerCount || 0;

  //   if (formData.length !== adultCount) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Incomplete Adult Data",
  //       text: `Please fill out details for all ${adultCount} adults.`,
  //     });
  //     return false;
  //   }
  //   for (let i = 0; i < formData.length; i++) {
  //     if (!isValid(formData[i], i, "adult")) return false;
  //   }

  //   if (childData.length !== childCount) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Incomplete Child Data",
  //       text: `Please fill out details for all ${childCount} children.`,
  //     });
  //     return false;
  //   }
  //   for (let i = 0; i < childData.length; i++) {
  //     if (!isValid(childData[i], i, "child")) return false;
  //   }

  //   if (infant.length !== infantCount) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Incomplete Infant Data",
  //       text: `Please fill out details for all ${infantCount} infants.`,
  //     });
  //     return false;
  //   }
  //   for (let i = 0; i < infant.length; i++) {
  //     if (!isValid(infant[i], i, "infant")) return false;
  //   }

  //   return true;
  // };
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [bookingDetails, setBookingDetails] = useState({});
  console.log("Flight", flight);
  const handleDataUpdate = (data) => {
    setBookingDetails(data);
    setEmail(data.email);
    setMobile(data.mobile);
    console.log("dataaa email", data);
  };
  const [tripSecure, setTripSecure] = useState("no"); // default to "No"
  const [pageFixed, setPageFixed] = useState(false);
  useEffect(() => {
    if (pageFixed) {
      // Push a new history entry when the section opens
      window.history.pushState({ modalOpen: true }, "");
    }

    const onPopState = (e) => {
      // If section is open, close it instead of navigating
      if (pageFixed) {
        setPageFixed(false);
      }
    };

    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
    };
  }, [pageFixed]);

  const seatsRef = useRef(null);

  const totalPassenger =
    flight &&
    flight.FareBreakdown.filter(
      (item) => item.PassengerType === 1 || item.PassengerType === 2
    ).reduce((sum, item) => sum + item.PassengerCount, 0);

  const totalAdultPassenger =
    flight &&
    flight.FareBreakdown.filter((item) => item.PassengerType === 1).reduce(
      (sum, item) => sum + item.PassengerCount,
      0
    );

  const totalChildPassenger =
    flight &&
    flight.FareBreakdown.filter((item) => item.PassengerType === 2).reduce(
      (sum, item) => sum + item.PassengerCount,
      0
    );

  const [reviewPageDone, setReviewPageDone] = useState(false);
  const handleContinueClick = () => {
    setReviewPageDone(true);
    setOpenPayBtn(false);
    setTimeout(() => {
      seatsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="roundtrippg">
      {srdvIdx === "undefined" && (
        // !(
        //   decodedIndex2 !== "" &&
        //   decodedIndex2 !== "undefined" &&
        //   decodedIndex2 !== "null"
        // ) && (
        <div style={{ position: "relative" }}>
          <Container className="flightBookingMainMain">
            <Row>
              <Col md={9}>
                <div className="booking_title">
                  <div className="bgGradient"></div>
                  <div
                    style={{
                      display: "flex",
                      position: "relative",
                      gap: "20px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div
                      className="srp-styles__IconSpace-sc-f04c77b5-2 iXBOku flight_detail_review_phoneTG"
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        fill="#f73030"
                        loading="lazy"
                        onClick={() => handleChangeFlight()}
                        style={{ cursor: "pointer" }}
                        className="arrowLeft__ArrowLeftIcon-sc-5fabd0ed-0 cTjPkF"
                      >
                        <path d="M6.047 15.997a3.07 3.07 0 0 1 1.04-2.305L21.956.612a2.462 2.462 0 0 1 3.25 3.697L12.205 15.75a.334.334 0 0 0 0 .5l13.003 11.44a2.463 2.463 0 0 1-3.252 3.697L7.09 18.31A3.08 3.08 0 0 1 6.046 16z" />
                      </svg>
                      <h3 style={{ color: "#fff" }}> Review Your Booking</h3>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        // background: "#f2f3ff",
                        cursor: "pointer",
                        borderRadius: "10px",
                        padding: "5px 10px",
                        color: "#fff",
                      }}
                    >
                      <BsInfoCircleFill />
                      <div
                        variant="primary"
                        onClick={handleFareRuleClick}
                        className="fare-rule-button"
                        style={{ fontSize: "13px" }}
                      >
                        Fare Rules
                      </div>
                    </div>
                  </div>
                </div>
                {flight?.Segments?.[0]?.length > 0 ? (
                  <DepatureDetail
                    srdvIdx={srdvIdx}
                    flight={flight}
                    type="Departure"
                  />
                ) : (
                  <FlightDetailSkeleton />
                )}
                {flight2 && (
                  <DepatureDetail
                    srdvIdx={srdvIdx}
                    flight={flight2}
                    type="Return"
                  />
                )}
                {flight3?.Segments?.length === 2 && (
                  <DepatureDetail
                    srdvIdx={srdvIdx}
                    flight3={flight3}
                    types="Return"
                  />
                )}

                <Row className="traveller_detail_desktop">
                  <Col md={12} xs={12}>
                    <div
                      id="TRAVELLER_DETAIL"
                      className="oneCard-element"
                      style={{ marginTop: "20px" }}
                    >
                      <div className="componentContainer ">
                        <div className="paxd">
                          <TravellerInformation
                            srdvIdx={srdvIdx}
                            flight={flight}
                            handleInputChange={handleInputChange}
                            handleInputChange1={handleInputChange1}
                            handleInputChange2={handleInputChange2}
                            handleExpiryDateChange={handleExpiryDateChange}
                            handleExpiryDateChange1={handleExpiryDateChange1}
                            handleExpiryDateChange2={handleExpiryDateChange2}
                            handleDOBChange={handleDOBChange}
                            handleDOBChange1={handleDOBChange1}
                            handleDOBChange2={handleDOBChange2}
                            formData={formData}
                            childData={childData}
                            infant={infant}
                          />
                        </div>
                      </div>

                      <BDSend
                        walletData={walletData}
                        onDataChange={handleDataUpdate}
                      />
                      <TripSecure
                        tripSecure={tripSecure}
                        setTripSecure={setTripSecure}
                      />

                      <form
                        autoComplete="off"
                        className="appendBottom20"
                        id="mainSection_1"
                      >
                        <div>
                          {reviewPageDone ? (
                            <div className="makeFlex column gap20">
                              <div id="SEATS_N_MEALS" className="">
                                <div className="componentContainer overviewSummary">
                                  {!ssrResponse ? (
                                    <div
                                      style={{
                                        width: "100%",
                                        margin: "auto",
                                        textAlign: "center",
                                        padding: "40px 0px",
                                      }}
                                    >
                                      NO SSR FOUND
                                      {/* Wait{" "}
                                      <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                      />{" "} */}
                                    </div>
                                  ) : (
                                    <div className="">
                                      <FlightSSR
                                        ssr={ssrResponse}
                                        ssr2={ssrResponse2}
                                        totalAdultCount={totalAdultPassenger}
                                        totalChildCount={totalChildPassenger}
                                        totalPassenger={totalPassenger}
                                        // onSeatChange={handleSeatChange}
                                        onBaggageChange={({
                                          selectedBaggage,
                                          total,
                                        }) => {
                                          setSelectedInboundBaggage(
                                            selectedBaggage.ssr2
                                          );
                                          setSelectedOutboundBaggage(
                                            selectedBaggage.ssr
                                          );
                                          setTotalBaggagePrice(total);
                                        }}
                                        onSeatChange={({
                                          selectedSeats,
                                          totalSeatPrice,
                                        }) => {
                                          console.log(
                                            "Received seat data in parent:",
                                            selectedSeats
                                          );
                                          console.log(
                                            "Total Seat price",
                                            totalSeatPrice
                                          );
                                          console.log(
                                            "SSR data",
                                            selectedSeats.ssr
                                          );

                                          setSelectedOutboundSeats(
                                            selectedSeats.ssr
                                          );
                                          setSelectedInboundSeats(
                                            selectedSeats.ssr2
                                          );
                                          setTotalSeatPrice(totalSeatPrice);
                                        }}
                                        // onSeatChange={(data) => {
                                        //   setSelectedOutboundSeats(
                                        //     data.selectedSeats.ssr
                                        //   );
                                        //   setSelectedInboundSeats(
                                        //     data.selectedSeats.ssr2
                                        //   );
                                        //   setTotalSeatPrice(
                                        //     data.totalSeatPrice
                                        //   );
                                        // }}
                                        onMealChange={({
                                          selectedMeals,
                                          totalMealPrice,
                                        }) => {
                                          console.log(
                                            "Received seat data in parent:",
                                            selectedMeals
                                          );
                                          setSelectedOutboundMeals(
                                            selectedMeals.ssr
                                          );
                                          setSelectedInboundMeals(
                                            selectedMeals.ssr2
                                          );
                                          setTotalMealPrice(totalMealPrice);
                                        }}
                                        // onSeatChange={({ ssr1, ssr2, ssr }) => {
                                        //   setSelectedOutboundSeats(ssr1.seats);
                                        //   setSelectedInboundSeats(ssr2.seats);
                                        //   setTotalSeatPrice(ssr.price);
                                        // }}
                                        // onBaggageChange={({
                                        //   baggageSSR1,
                                        //   baggageSSR2,
                                        //   total,
                                        // }) => {
                                        //   setSelectedOutboundBaggage(
                                        //     baggageSSR1
                                        //   );
                                        //   setSelectedInboundBaggage(
                                        //     baggageSSR2
                                        //   );
                                        //   setTotalBaggagePrice(total);
                                        // }}

                                        // onBaggageChange={handleBaggageChange}
                                        // onMealChange={handleMealChange}
                                        //  onMealChange={handleMealChange}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="makeFlex column gap20">
                              <div id="SEATS_N_MEALS" className="">
                                <div className="componentContainer overviewSummary disabled">
                                  <div
                                    data-test="component-heading"
                                    className="overviewSummaryHeading"
                                  >
                                    <h2 className="fontSize18 blackFont heading-text makeFlex gap-x-15">
                                      <span data-test="component-title">
                                        Seats &amp; Meals
                                      </span>
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {/* <div className="makeFlex column gap20">
                            <div id="SEATS_N_MEALS" className="">
                              <div className="componentContainer overviewSummary disabled">
                                <div
                                  data-test="component-heading"
                                  className="overviewSummaryHeading"
                                >
                                  <h2 className="fontSize18 blackFont heading-text makeFlex gap-x-15">
                                    <span data-test="component-title">
                                      Seats &amp; Meals
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </form>
                      <form
                        autoComplete="off"
                        className="appendBottom20"
                        id="mainSection_2"
                        ref={seatsRef}
                      >
                        <div>
                          <div className="makeFlex column gap20">
                            {reviewPageDone ? (
                              <div
                                style={{
                                  marginLeft: "-15px",
                                  marginRight: "-15px",
                                }}
                                onClick={handlePayment}
                              >
                                {" "}
                                <div className="con_tgg">
                                  <span className="co">Confirm Booking</span>
                                </div>
                              </div>
                            ) : (
                              <div
                                style={{
                                  marginLeft: "-15px",
                                  marginRight: "-15px",
                                }}
                                onClick={async () => {
                                  if (validatePassengerData()) {
                                    setOpenPayBtn(true);
                                    setPaymentGateway(true);
                                  }
                                }}
                              >
                                {" "}
                                <div className="con_tgg">
                                  <span className="co">Continue Booking</span>
                                </div>
                              </div>
                            )}
                            {/* <div id="DELAY_INSURANCE" className="">
                              <div className="componentContainer overviewSummary disabled">
                                <div
                                  data-test="component-heading"
                                  className="overviewSummaryHeading"
                                >
                                  <h2 className="fontSize18 blackFont heading-text makeFlex gap-x-15">
                                    <span data-test="component-title">
                                      Add ons
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </form>
                    </div>
                  </Col>
                </Row>
                <Row className="traveller_detail_mobile">
                  <TripSecure
                    tripSecure={tripSecure}
                    setTripSecure={setTripSecure}
                  />
                </Row>
              </Col>

              {!flight2 && (
                <ChargesOneWay
                  srdvIdx={srdvIdx}
                  flight={flight}
                  setShowdetail={setShowdetail}
                  showdetail={showdetail}
                  handleChangeCurrency={handleChangeCurrency}
                  walletData={walletData}
                  setOpenPayBtn={setOpenPayBtn}
                  paymentGateway={paymentGateway}
                  setPaymentGateway={setPaymentGateway}
                  openPayBtn={openPayBtn}
                  emiBtn={emiBtn}
                  setEmiBtn={setEmiBtn}
                  passengerSeatPreferences={passengerSeatPreferences}
                  passengerMealPreferences={passengerMealPreferences}
                  passengerBaggagePreferences={passengerBaggagePreferences}
                  validatePassengerData={validatePassengerData}
                  totalSeatPrice={totalSeatPrice}
                  reviewPageDone={reviewPageDone}
                  totalMealPrice={totalMealPrice}
                  totalBaggagePrice={totalBaggagePrice}
                  handlePayment={handlePayment}
                />
              )}

              {flight2 && (
                <ChargesOneWay
                  srdvIdx={srdvIdx}
                  flight={flight}
                  flight2={flight2}
                  setShowdetail={setShowdetail}
                  showdetail={showdetail}
                  handleChangeCurrency={handleChangeCurrency}
                  walletData={walletData}
                  setOpenPayBtn={setOpenPayBtn}
                  openPayBtn={openPayBtn}
                  paymentGateway={paymentGateway}
                  setPaymentGateway={setPaymentGateway}
                  emiBtn={emiBtn}
                  setEmiBtn={setEmiBtn}
                  passengerSeatPreferences={passengerSeatPreferences}
                  passengerMealPreferences={passengerMealPreferences}
                  passengerBaggagePreferences={passengerBaggagePreferences}
                  validatePassengerData={validatePassengerData}
                  totalSeatPrice={totalSeatPrice}
                  totalMealPrice={totalMealPrice}
                  reviewPageDone={reviewPageDone}
                  totalBaggagePrice={totalBaggagePrice}
                  handlePayment={handlePayment}
                  // fetchSSRTBORound={fetchSSRTBORound}
                  // fetchSSRTBO={fetchSSRTBO}
                />
              )}
              <WhyBook />
              <div className="stick_filter_nv1_mobile bb">
                <div className="col_4">
                  <p>Grand Total</p>

                  {/* <span id="spnGrndTotal" className="CurrncyCD_Rs newfnt" /> */}
                  <span className="newfnt ng-binding">
                    ₹{" "}
                    {flight2 && flight2
                      ? Math.round(
                          flight &&
                            flight.Fare.PublishedFare + flight2 &&
                            flight2.Fare.PublishedFare
                        )
                      : Math.round(flight && flight.Fare.PublishedFare)}
                  </span>
                  <a className="fr_icn ovhdn" />
                </div>
                <div
                  className="col_5_nv1 return-top"
                  onClick={() => {
                    if (!tripSecure) {
                      alert(
                        "Please select whether to secure your trip or not."
                      );
                      return;
                    }
                    setPageFixed(true);
                  }}
                >
                  <a className="con_btn_nv1 gotop">Continue Booking</a>
                </div>
              </div>
            </Row>
          </Container>

          {duringBooking && (
            <div className="booking-overlayyyssss">
              <div className="overlay" style={{ opacity: "1" }}></div>
              <div className="booking-card animate-fade-in">
                <Card className="text-center shadow">
                  <Card.Header
                    className="fw-bold"
                    style={{
                      background:
                        "linear-gradient(20deg, rgb(247 48 48) 20%, rgb(29 72 159) 100%)",
                      color: "#fff",
                    }}
                  >
                    Please Wait
                  </Card.Header>
                  <Card.Body>
                    <Spinner
                      animation="border"
                      variant="#053355"
                      className="mb-3"
                    />
                    <Card.Text>
                      Hang Tight—We’re Processing Your Booking..!!
                    </Card.Text>
                    {/* <button
                      className="btn btn-outline-secondary mt-5 mb-5"
                      onClick={() => setDuringBooking(false)}
                    >
                      Cancel
                    </button> */}
                    <p>
                      Everything’s in motion. We’re just putting the final
                      touches on your reservation. You’ll hear from us soon!
                    </p>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}

          <Modal
            show={showFareRuleModal}
            onHide={() => setShowFareRuleModal(false)}
            size="lg"
            aria-labelledby="fare-rule-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title id="fare-rule-modal">Fare Rules</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {loadingFareRule ? (
                <div className="text-center py-3">Loading Fare Rule...</div>
              ) : (
                // fareRule.length > 0 ? (
                //   <FareRule srdvIdx={srdvIdx} fareRule={fareRule} />
                // ) :
                <FareRule srdvIdx={srdvIdx} fareRule={fareRule} />
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowFareRuleModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          {openPayBtn && (
            <ReviewPassneger
              handleContinueClick={handleContinueClick}
              infant={infant}
              formData={formData}
              childData={childData}
              openPayBtn={openPayBtn}
              setOpenPayBtn={setOpenPayBtn}
            />
          )}

          {/* {openPayBtn ? (
            <FlightPayModal
              srdvIdx={srdvIdx}
              flight={flight}
              flight2={flight2}
              handleChangeCurrency={handleChangeCurrency}
              openPayBtn={openPayBtn}
              setOpenPayBtn={setOpenPayBtn}
              paymentGateway={paymentGateway}
              setPaymentGateway={setPaymentGateway}
              formData={formData}
              childData={childData}
              bookingDetails={bookingDetails}
              infant={infant}
              handlePayment={handlePayment}
              handleTicketBook={handleTicketBook}
              handleTicketBookRound={handleTicketBookRound}
              setLoading={setLoading}
              passengerSeatPreferences={passengerSeatPreferences}
              passengerMealPreferences={passengerMealPreferences}
              passengerBaggagePreferences={passengerBaggagePreferences}
              loading={loading}
            />
          ) : (
            ""
          )} */}
          {pageFixed && (
            <MobileTravellers
              flight={flight}
              setPageFixed={setPageFixed}
              srdvIdx={srdvIdx}
              type="Departure"
              formData={formData}
              childData={childData}
              infant={infant}
              flight3={flight3}
              setFormData={setFormData}
              setInfant={setInfant}
              setChildData={setChildData}
              handlePayment={handlePayment}
              onDataChange={handleDataUpdate}
              validatePassengerData={validatePassengerData}
              flight2={flight2}
              types="Return"
              ssr={ssrResponse}
              ssr2={ssrResponse2}
              totalAdultCount={totalAdultPassenger}
              totalChildCount={totalChildPassenger}
              totalPassenger={totalPassenger}
              onBaggageChange={({ selectedBaggage, total }) => {
                setSelectedInboundBaggage(selectedBaggage.ssr2);
                setSelectedOutboundBaggage(selectedBaggage.ssr);
                setTotalBaggagePrice(total);
              }}
              onSeatChange={({ selectedSeats, totalSeatPrice }) => {
                console.log("Received seat data in parent:", selectedSeats);
                console.log("Total Seat price", totalSeatPrice);
                console.log("SSR data", selectedSeats.ssr);

                setSelectedOutboundSeats(selectedSeats.ssr);
                setSelectedInboundSeats(selectedSeats.ssr2);
                setTotalSeatPrice(totalSeatPrice);
              }}
              // onSeatChange={(data) => {
              //   setSelectedOutboundSeats(
              //     data.selectedSeats.ssr
              //   );
              //   setSelectedInboundSeats(
              //     data.selectedSeats.ssr2
              //   );
              //   setTotalSeatPrice(
              //     data.totalSeatPrice
              //   );
              // }}
              onMealChange={({ selectedMeals, totalMealPrice }) => {
                console.log("Received seat data in parent:", selectedMeals);
                setSelectedOutboundMeals(selectedMeals.ssr);
                setSelectedInboundMeals(selectedMeals.ssr2);
                setTotalMealPrice(totalMealPrice);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FlightDetail;
