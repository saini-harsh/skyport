import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HotelModifyNew.css";
import { CiLocationOn } from "react-icons/ci";
import { BiSolidOffer } from "react-icons/bi";
import { Link } from "react-router-dom";
import HotelListSkeleton from "./HotelListSkeleton";
import FlightListSkeleton from "../../Flight/FlightList/FlightListSkeleton";
import HotelLoader from "../HotelLoader/HotelLoader";
import HotelNotFound from "../HotelNotFound/HotelNotFound";
import HotelSkeleton from "./HotelSkeleton";
import { FaStar } from "react-icons/fa";

function HotelListingModifyNew({ loading , hotel}) {
  const [hotelViewBtn, setHotelViewBtn] = useState(null);
  const navigate = useNavigate();

  const handleViewButtonClick = (hotelId, rooms) => {
    console.log("HOTEL ID AND ROOMS ", hotelId, rooms);
    localStorage.setItem("hotelId", hotelId);
    localStorage.setItem("rooms", JSON.stringify(rooms));

    setHotelViewBtn(hotelId);
    navigate("/hoteldetailsmain");
  };
  // console.log("Hotel SEarch", hotel);
  // const hotel = [
  //   {
  //     HotelCode: "1218342",
  //     Currency: "INR",
  //     Rooms: [
  //       {
  //         Name: ["Standard Room,1 Double Bed,NonSmoking"],
  //         BookingCode:
  //           "1218342!TB!2!TB!88b400e7-62f2-11f0-91c1-e2c89c64932c!TB!N!TB!AFF!",
  //         Inclusion: "Room Only",
  //         DayRates: [
  //           [
  //             {
  //               BasePrice: 471.61,
  //             },
  //             {
  //               BasePrice: 471.61,
  //             },
  //             {
  //               BasePrice: 471.61,
  //             },
  //           ],
  //         ],
  //         TotalFare: 1587.71,
  //         TotalTax: 172.9,
  //         RoomPromotion: ["Private sale"],
  //         CancelPolicies: [
  //           {
  //             FromDate: "16-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 0,
  //           },
  //           {
  //             FromDate: "25-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 533.107063,
  //           },
  //           {
  //             FromDate: "26-07-2025 00:00:00",
  //             ChargeType: "Percentage",
  //             CancellationCharge: 100,
  //           },
  //         ],
  //         MealType: "Room_Only",
  //         IsRefundable: true,
  //         WithTransfers: false,
  //       },
  //       {
  //         Name: ["Standard Room,1 Double Bed,NonSmoking"],
  //         BookingCode:
  //           "1218342!TB!3!TB!88b400e7-62f2-11f0-91c1-e2c89c64932c!TB!N!TB!AFF!",
  //         Inclusion: "Room Only",
  //         DayRates: [
  //           [
  //             {
  //               BasePrice: 546.67,
  //             },
  //             {
  //               BasePrice: 546.67,
  //             },
  //             {
  //               BasePrice: 546.67,
  //             },
  //           ],
  //         ],
  //         TotalFare: 1812.82,
  //         TotalTax: 172.82,
  //         RoomPromotion: ["Private sale|"],
  //         CancelPolicies: [
  //           {
  //             FromDate: "16-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 0,
  //           },
  //           {
  //             FromDate: "22-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 6.29,
  //           },
  //           {
  //             FromDate: "24-07-2025 00:00:00",
  //             ChargeType: "Percentage",
  //             CancellationCharge: 100,
  //           },
  //         ],
  //         MealType: "Room_Only",
  //         IsRefundable: true,
  //         WithTransfers: false,
  //       },
  //       {
  //         Name: ["Standard Room,1 Double Bed,NonSmoking"],
  //         BookingCode:
  //           "1218342!TB!1!TB!88b400e7-62f2-11f0-91c1-e2c89c64932c!TB!N!TB!AFF!",
  //         Inclusion: "Room Only",
  //         DayRates: [
  //           [
  //             {
  //               BasePrice: 601.34,
  //             },
  //             {
  //               BasePrice: 601.34,
  //             },
  //             {
  //               BasePrice: 601.34,
  //             },
  //           ],
  //         ],
  //         TotalFare: 2026.74,
  //         TotalTax: 205.45,
  //         RoomPromotion: ["Private sale|"],
  //         CancelPolicies: [
  //           {
  //             FromDate: "16-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 0,
  //           },
  //           {
  //             FromDate: "22-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 6.29,
  //           },
  //           {
  //             FromDate: "24-07-2025 00:00:00",
  //             ChargeType: "Percentage",
  //             CancellationCharge: 100,
  //           },
  //         ],
  //         MealType: "Room_Only",
  //         IsRefundable: true,
  //         WithTransfers: false,
  //       },
  //     ],
  //     id: 2003,
  //     hotel_code: "1218342",
  //     city_code: "130443",
  //     name: "Hotel Prince Palace The Green",
  //     LocationCategoryCode: null,
  //     description:
  //       "<p>HeadLine : In New Delhi (Paharganj)</p><p>Location : With a stay at Hotel Prince Palace The Green in New Delhi (Paharganj), you ll be a 3-minute drive from Jantar Mantar and 6 minutes from Gurudwara Bangla Sahib.  This guesthouse is 1.8 mi (2.9 km) from Jama Masjid and 1.9 mi (3 km) from Sir Ganga Ram Hospital.</p><p>Rooms : Stay in one of 32 guestrooms featuring flat-screen televisions. Rooms have private balconies. Complimentary wireless Internet access keeps you connected, and cable programming is available for your entertainment. Bathrooms with showers are provided.</p><p>Dining : Take advantage of the guesthouse s room service (during limited hours).</p><p>CheckIn Instructions : Extra-person charges may apply and vary depending on property policy Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed No onsite parking is available This property accepts credit cards Please note that cultural norms and guest policies may differ by country and by property; the policies listed are provided by the property</p><p>Special Instructions : Front desk staff will greet guests on arrival.</p>",
  //     latitude: "28.640736",
  //     longitude: "77.211305",
  //     address:
  //       "5116 17 18 St. Thhanedaar Near Subway & & Mybar Restaurant, Main Bazzar Road Street ThhanedarNear Subway & Mybar RestaurantNear R. K. Ashram Marg Metro Station ",
  //     city: "New Delhi",
  //     zip: "110055",
  //     country: "IN",
  //     tripadvisor: "0",
  //     star_rating: "2",
  //     hotel_category: null,
  //     category_name: null,
  //     created_at: "2025-06-19 15:46:17",
  //     updated_at: "2025-06-25 19:52:04",
  //     state_code: null,
  //     images:
  //       '["https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllJkOeGu5\\/548QaRDjpEYQD6VttvihMU01g==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllJkOeGu5\\/548QaRDjpEYQD6VttvihMU01g==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllJx1S4Aly5aAR9ftr\\/oWH91szCTlD+AeQg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllMqX6CLCvuFVLVyr+oqPXQNiKS6oqOYxkA==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllOrJTfnUMyFM7XtSwsKpODKItLdgKajxnw==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllD9PTQyxmagOYURule33vVgcahX7SCNnvQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllGzgaDQfpmgk3RhK8plgydzFp9GwlKbMOg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllEquJ88F\\/hgKhBTR2GjLLof+KVkTDlICVQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllCVD73jqsTnmN0zoxpsNuRMfk8DkRwb+gA==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllKtNpNLkz2tMGKs8rGldxNAiOjHZgVy2Fg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllMW7GYeN7mjpnhe73gfO3CmRmmUKvx+TVg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllIarC6T3sWBbJYnbkph4od9q40qYhFFvZQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllDvyvZEWvsTdoEMt6sT7B7V7wjLiuW2DqA==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllLBuEJNBJsOIeAbrpYjRsv5qyZxlcW+Tgg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllKqRCNKjfs+drzg\\/B0gJkilZ1aYvEwyiPQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllKBVjGu3ItF+VASpXEeOOWZda5pya2tBQQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllEF04K60vX1kYQjGEoHJtOuuVlPLPEjf+g==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllBXh4nr\\/eU1WvdlL6tk32+6n67TMXmRHzw==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllCkxpkYU65qTc7pQnJhs1STaBN79BTgVnQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllPMl4fgIIxHZpCGG6pyfuU6iWVW7sJZ4dA==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllNo1UtfilNYmjGDcqH4tnvUcKv3yA3cKlQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllEGqLbFqvzAXhQIs9yWpxqVJioIgMDC7tA==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllHI1Iu4pGYJkexlMbpHaZFrltv2ZajPtLg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllM\\/oSK\\/eiOpIOnG6IvJIpQAa6wcHKfMWTQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllNINyx765rVGNxtsnxaM1VYPlL7YJPEeoQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllOn145NDFEBIjqMheO9mL235ydpfHuX8jg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllIeSQiN3sogz1NmSDES4pGPjuLTLU47Cbg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllKdgueGCXSsVUmbDKS56JTEbPeDZnTIUlQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllFBrrxf7N3JFzwZaUF\\/pgKsebALmpRjG+g=="]',
  //     chainId: null,
  //     ameneties:
  //       '["Reception hall","Laundry facilities","Use of nearby fitness center (discount)","Terrace","Dry cleaning\\/laundry service","Free WiFi","In-room accessibility","Newspapers in lobby (surcharge)","Garden","Free newspapers in lobby","24-hour front desk"]',
  //     isTopHotel: null,
  //     attributes: null,
  //     phone: "91-11-23585800",
  //     fax: "91-11-23581388",
  //     attractions:
  //       '["Distances are displayed to the nearest 0.1 mile and kilometer. <br \\/> <p>Gole Market - 1.1 km \\/ 0.7 mi <br \\/> Lady Hardinge Medical College - 1.5 km \\/ 0.9 mi <br \\/> Palika Bazaar - 1.6 km \\/ 1 mi <br \\/> Ajmal Khan Road - 1.7 km \\/ 1.1 mi <br \\/> Laxminarayan Temple - 1.8 km \\/ 1.1 mi <br \\/> Kasturba Gandhi Marg - 2 km \\/ 1.2 mi <br \\/> Gurudwara Bangla Sahib - 2.1 km \\/ 1.3 mi <br \\/> Jantar Mantar - 2.3 km \\/ 1.4 mi <br \\/> Jama Masjid - 2.8 km \\/ 1.7 mi <br \\/> Parliament of India - 3.1 km \\/ 1.9 mi <br \\/> Sir Ganga Ram Hospital - 3.1 km \\/ 2 mi <br \\/> FICCI Auditorium - 3.3 km \\/ 2 mi <br \\/> Rajpath - 3.3 km \\/ 2.1 mi <br \\/> BLK Super Speciality Hospital - 3.5 km \\/ 2.1 mi <br \\/> Gurudwara Sis Ganj Temple - 3.5 km \\/ 2.2 mi <br \\/> <\\/p><p>The nearest major airport is Indira Gandhi Intl. Airport (DEL) - 19.4 km \\/ 12 mi<\\/p>"]',
  //   },
  //   {
  //     HotelCode: "1218342",
  //     Currency: "INR",
  //     Rooms: [
  //       {
  //         Name: ["Standard Room,1 Double Bed,NonSmoking"],
  //         BookingCode:
  //           "1218342!TB!2!TB!88b400e7-62f2-11f0-91c1-e2c89c64932c!TB!N!TB!AFF!",
  //         Inclusion: "Room Only",
  //         DayRates: [
  //           [
  //             {
  //               BasePrice: 471.61,
  //             },
  //             {
  //               BasePrice: 471.61,
  //             },
  //             {
  //               BasePrice: 471.61,
  //             },
  //           ],
  //         ],
  //         TotalFare: 1587.71,
  //         TotalTax: 172.9,
  //         RoomPromotion: ["Private sale"],
  //         CancelPolicies: [
  //           {
  //             FromDate: "16-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 0,
  //           },
  //           {
  //             FromDate: "25-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 533.107063,
  //           },
  //           {
  //             FromDate: "26-07-2025 00:00:00",
  //             ChargeType: "Percentage",
  //             CancellationCharge: 100,
  //           },
  //         ],
  //         MealType: "Room_Only",
  //         IsRefundable: true,
  //         WithTransfers: false,
  //       },
  //       {
  //         Name: ["Standard Room,1 Double Bed,NonSmoking"],
  //         BookingCode:
  //           "1218342!TB!3!TB!88b400e7-62f2-11f0-91c1-e2c89c64932c!TB!N!TB!AFF!",
  //         Inclusion: "Room Only",
  //         DayRates: [
  //           [
  //             {
  //               BasePrice: 546.67,
  //             },
  //             {
  //               BasePrice: 546.67,
  //             },
  //             {
  //               BasePrice: 546.67,
  //             },
  //           ],
  //         ],
  //         TotalFare: 1812.82,
  //         TotalTax: 172.82,
  //         RoomPromotion: ["Private sale|"],
  //         CancelPolicies: [
  //           {
  //             FromDate: "16-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 0,
  //           },
  //           {
  //             FromDate: "22-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 6.29,
  //           },
  //           {
  //             FromDate: "24-07-2025 00:00:00",
  //             ChargeType: "Percentage",
  //             CancellationCharge: 100,
  //           },
  //         ],
  //         MealType: "Room_Only",
  //         IsRefundable: true,
  //         WithTransfers: false,
  //       },
  //       {
  //         Name: ["Standard Room,1 Double Bed,NonSmoking"],
  //         BookingCode:
  //           "1218342!TB!1!TB!88b400e7-62f2-11f0-91c1-e2c89c64932c!TB!N!TB!AFF!",
  //         Inclusion: "Room Only",
  //         DayRates: [
  //           [
  //             {
  //               BasePrice: 601.34,
  //             },
  //             {
  //               BasePrice: 601.34,
  //             },
  //             {
  //               BasePrice: 601.34,
  //             },
  //           ],
  //         ],
  //         TotalFare: 2026.74,
  //         TotalTax: 205.45,
  //         RoomPromotion: ["Private sale|"],
  //         CancelPolicies: [
  //           {
  //             FromDate: "16-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 0,
  //           },
  //           {
  //             FromDate: "22-07-2025 00:00:00",
  //             ChargeType: "Fixed",
  //             CancellationCharge: 6.29,
  //           },
  //           {
  //             FromDate: "24-07-2025 00:00:00",
  //             ChargeType: "Percentage",
  //             CancellationCharge: 100,
  //           },
  //         ],
  //         MealType: "Room_Only",
  //         IsRefundable: true,
  //         WithTransfers: false,
  //       },
  //     ],
  //     id: 2003,
  //     hotel_code: "1218342",
  //     city_code: "130443",
  //     name: "Hotel Prince Palace The Green",
  //     LocationCategoryCode: null,
  //     description:
  //       "<p>HeadLine : In New Delhi (Paharganj)</p><p>Location : With a stay at Hotel Prince Palace The Green in New Delhi (Paharganj), you ll be a 3-minute drive from Jantar Mantar and 6 minutes from Gurudwara Bangla Sahib.  This guesthouse is 1.8 mi (2.9 km) from Jama Masjid and 1.9 mi (3 km) from Sir Ganga Ram Hospital.</p><p>Rooms : Stay in one of 32 guestrooms featuring flat-screen televisions. Rooms have private balconies. Complimentary wireless Internet access keeps you connected, and cable programming is available for your entertainment. Bathrooms with showers are provided.</p><p>Dining : Take advantage of the guesthouse s room service (during limited hours).</p><p>CheckIn Instructions : Extra-person charges may apply and vary depending on property policy Government-issued photo identification and a credit card, debit card, or cash deposit may be required at check-in for incidental charges Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed No onsite parking is available This property accepts credit cards Please note that cultural norms and guest policies may differ by country and by property; the policies listed are provided by the property</p><p>Special Instructions : Front desk staff will greet guests on arrival.</p>",
  //     latitude: "28.640736",
  //     longitude: "77.211305",
  //     address:
  //       "5116 17 18 St. Thhanedaar Near Subway & & Mybar Restaurant, Main Bazzar Road Street ThhanedarNear Subway & Mybar RestaurantNear R. K. Ashram Marg Metro Station ",
  //     city: "New Delhi",
  //     zip: "110055",
  //     country: "IN",
  //     tripadvisor: "0",
  //     star_rating: "2",
  //     hotel_category: null,
  //     category_name: null,
  //     created_at: "2025-06-19 15:46:17",
  //     updated_at: "2025-06-25 19:52:04",
  //     state_code: null,
  //     images:
  //       '["https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllJkOeGu5\\/548QaRDjpEYQD6VttvihMU01g==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllJkOeGu5\\/548QaRDjpEYQD6VttvihMU01g==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllJx1S4Aly5aAR9ftr\\/oWH91szCTlD+AeQg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllMqX6CLCvuFVLVyr+oqPXQNiKS6oqOYxkA==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllOrJTfnUMyFM7XtSwsKpODKItLdgKajxnw==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllD9PTQyxmagOYURule33vVgcahX7SCNnvQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllGzgaDQfpmgk3RhK8plgydzFp9GwlKbMOg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllEquJ88F\\/hgKhBTR2GjLLof+KVkTDlICVQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllCVD73jqsTnmN0zoxpsNuRMfk8DkRwb+gA==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllKtNpNLkz2tMGKs8rGldxNAiOjHZgVy2Fg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllMW7GYeN7mjpnhe73gfO3CmRmmUKvx+TVg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllIarC6T3sWBbJYnbkph4od9q40qYhFFvZQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllDvyvZEWvsTdoEMt6sT7B7V7wjLiuW2DqA==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllLBuEJNBJsOIeAbrpYjRsv5qyZxlcW+Tgg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllKqRCNKjfs+drzg\\/B0gJkilZ1aYvEwyiPQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllKBVjGu3ItF+VASpXEeOOWZda5pya2tBQQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllEF04K60vX1kYQjGEoHJtOuuVlPLPEjf+g==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllBXh4nr\\/eU1WvdlL6tk32+6n67TMXmRHzw==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllCkxpkYU65qTc7pQnJhs1STaBN79BTgVnQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllPMl4fgIIxHZpCGG6pyfuU6iWVW7sJZ4dA==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllNo1UtfilNYmjGDcqH4tnvUcKv3yA3cKlQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllEGqLbFqvzAXhQIs9yWpxqVJioIgMDC7tA==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllHI1Iu4pGYJkexlMbpHaZFrltv2ZajPtLg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllM\\/oSK\\/eiOpIOnG6IvJIpQAa6wcHKfMWTQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllNINyx765rVGNxtsnxaM1VYPlL7YJPEeoQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllOn145NDFEBIjqMheO9mL235ydpfHuX8jg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllIeSQiN3sogz1NmSDES4pGPjuLTLU47Cbg==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllKdgueGCXSsVUmbDKS56JTEbPeDZnTIUlQ==","https:\\/\\/www.tboholidays.com\\/\\/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8\\/wYA5F3wAmN3NGLWjgQSPnBp5UxPvUYDInfe1kQxrysl\\/ZMM5pmAbQbAllFBrrxf7N3JFzwZaUF\\/pgKsebALmpRjG+g=="]',
  //     chainId: null,
  //     ameneties:
  //       '["Reception hall","Laundry facilities","Use of nearby fitness center (discount)","Terrace","Dry cleaning\\/laundry service","Free WiFi","In-room accessibility","Newspapers in lobby (surcharge)","Garden","Free newspapers in lobby","24-hour front desk"]',
  //     isTopHotel: null,
  //     attributes: null,
  //     phone: "91-11-23585800",
  //     fax: "91-11-23581388",
  //     attractions:
  //       '["Distances are displayed to the nearest 0.1 mile and kilometer. <br \\/> <p>Gole Market - 1.1 km \\/ 0.7 mi <br \\/> Lady Hardinge Medical College - 1.5 km \\/ 0.9 mi <br \\/> Palika Bazaar - 1.6 km \\/ 1 mi <br \\/> Ajmal Khan Road - 1.7 km \\/ 1.1 mi <br \\/> Laxminarayan Temple - 1.8 km \\/ 1.1 mi <br \\/> Kasturba Gandhi Marg - 2 km \\/ 1.2 mi <br \\/> Gurudwara Bangla Sahib - 2.1 km \\/ 1.3 mi <br \\/> Jantar Mantar - 2.3 km \\/ 1.4 mi <br \\/> Jama Masjid - 2.8 km \\/ 1.7 mi <br \\/> Parliament of India - 3.1 km \\/ 1.9 mi <br \\/> Sir Ganga Ram Hospital - 3.1 km \\/ 2 mi <br \\/> FICCI Auditorium - 3.3 km \\/ 2 mi <br \\/> Rajpath - 3.3 km \\/ 2.1 mi <br \\/> BLK Super Speciality Hospital - 3.5 km \\/ 2.1 mi <br \\/> Gurudwara Sis Ganj Temple - 3.5 km \\/ 2.2 mi <br \\/> <\\/p><p>The nearest major airport is Indira Gandhi Intl. Airport (DEL) - 19.4 km \\/ 12 mi<\\/p>"]',
  //   },
  // ];
  return (
    <>
      {loading ? (
        <HotelSkeleton />
      ) :
      hotel && hotel.length !== 0 ? (
        <div>
          {hotel.map((item) => (
            <div className="hotelListingstyling">
              <div className="hotelListingstyling-Container">
                <Row>
                  <Col md={4} className="hotelListingstyling-img">
                    <img
                      src="https://imgs.search.brave.com/vHvnOuQtNzYexXN18o4A70dGBuk7R2tv4LTwv7NzKDA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ1/MzEyMTY5Ni9waG90/by9sdXh1cnktaG90/ZWwtcm9vbS13aXRo/LWJhdGhyb29tLXdp/dGgtYmF0aHR1Yi1k/b3VibGUtYmVkLWFu/ZC1jbG9zZXQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTdV/WnBOdkd5Rmpqem11/YnNic3JWVkRrdGph/OER2RnN0ZzB2MW14/T3dTOTA9"
                      alt=""
                      style={{
                        borderRadius: "10px",
                        height: window.innerWidth < 768 ? "180px" : "100%",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </Col>
                  <Col md={5} className="hotelListingstyling-img">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div className="AltAccoRatingsRenderer-styles__HotelTag-sc-614b7d7a-0 fAFCux">
                        <div className="AltAccoRatingsRenderer-styles__HotelStarRating-sc-614b7d7a-1 gWfoeC">
                          <span>{item.star_rating}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 17 16"
                            width="1rem"
                            height="1rem"
                            margin="0 0.2rem 0 0"
                            className="HappyRatingStarIcon-sc-934f1d6d-0 huwVyb"
                          >
                            <path
                              fillRule="evenodd"
                              d="m8.172 13.282 3.964 2.434c.726.446 1.614-.213 1.423-1.047l-1.05-4.577 3.505-3.084c.64-.562.296-1.629-.545-1.696l-4.613-.398L9.051.589c-.325-.785-1.432-.785-1.757 0L5.489 4.904l-4.613.398C.036 5.37-.31 6.436.33 6.999l3.505 3.083-1.05 4.577c-.191.834.697 1.494 1.423 1.048l3.963-2.425z"
                            />
                          </svg>
                        </div>
                        <span className="AltAccoRatingsRenderer-styles__PropertyLabel-sc-614b7d7a-2 gPwZKh">
                          Hotel
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        flexWrap: "nowrap",
                      }}
                    >
                      <div
                        className="hotelListingstyling-name"
                        title={item.name}
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "300px",
                        }}
                      >
                        {item.name}
                      </div>

                      {/* <div
                        className="rating-score"
                        style={{ fontSize: "15px", whiteSpace: "nowrap" }}
                      >
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            style={{
                              color:
                                index < Number(item.star_rating)
                                  ? "#FFD700"
                                  : "#ccc",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div> */}
                    </div>

                    <div className="hotel-Address">
                      {/* <CiLocationOn /> <span>{item.city},{item.country}</span> */}
                      <CiLocationOn />{" "}
                      <span title={item.address}>{item.address}</span>
                    </div>
                    <div className="Amenties_and_Freecancellation">
                      {/* <div>
                        {[
                          ...new Set(
                            item.Rooms.map((room) =>
                              room.Name[0].replace(/['"]+/g, "").trim()
                            )
                          ),
                        ].map((uniqueName, index) => {
                          const parts = uniqueName
                            .split(",")
                            .map((s) => s.trim());
                          return (
                            <div className="amenities">
                              {parts.map((part, i) => (
                                <div className="free_amenities">{part}</div>
                              ))}
                            </div>
                          );
                        })}
                      </div> */}
           <div className="amenities">
  {(() => {
    // Extract unique room amenities
    const uniqueAmenities = [
      ...new Set(
        item.Rooms.map((room) =>
          room.Name[0].replace(/['"]+/g, "").trim()
        )
      ),
    ];

    // Get last room's data
    const lastAmenityString = uniqueAmenities[uniqueAmenities.length - 1];
    const lastParts = lastAmenityString
      ? lastAmenityString.split(",").map((s) => s.trim())
      : [];

    const lastFirstTwo = lastParts.slice(0, 2);
    const lastRemaining = lastParts.slice(2);

    // Prepare other rooms data for & more hover
    const otherAmenities = uniqueAmenities.slice(0, -1);

    return (
      <>
        <div className="amenitiesss">
          {lastFirstTwo.map((part, i) => (
            <div className="free_amenities" key={i}>
              {part}
            </div>
          ))}
        </div>

        {(lastRemaining.length > 0 || otherAmenities.length > 0) && (
          <div className="more-container">
            <span
              className="PersuasionTextUI__PersuasionTextWrapperSpan-sc-33168a02-1 bdcGAt"
              style={{
                color: "rgb(34, 118, 227)",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              &amp; more
            </span>

            <ul className="more-list">
              {/* Show remaining parts of last room */}
              {lastRemaining.map((part, j) => (
                <div
                  className="HoverPersuasion-styles__HoverCard-sc-236c8fc9-1 eTDoWQ"
                  key={`last-${j}`}
                >
                  <div className="HoverPersuasion-styles__HoverHeader-sc-236c8fc9-2 nfcIc">
                    <div className="PersuasionTextWithImageUI__PersuasionTextWrapperDiv-sc-1663bfa1-0 cDtVtC">
                      <span style={{ fontSize: "12px" }}>{part}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Show all other rooms data */}
              {otherAmenities.map((amenityString, index) => {
                const parts = amenityString
                  .split(",")
                  .map((s) => s.trim());

                return (
                  <div
                    className="HoverPersuasion-styles__HoverCard-sc-236c8fc9-1 eTDoWQ"
                    key={`other-${index}`}
                  >
                    {parts.map((part, j) => (
                      <div
                        className="HoverPersuasion-styles__HoverHeader-sc-236c8fc9-2 nfcIc"
                        key={j}
                      >
                        <div className="PersuasionTextWithImageUI__PersuasionTextWrapperDiv-sc-1663bfa1-0 cDtVtC">
                          <span style={{ fontSize: "12px" }}>{part}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </ul>
          </div>
        )}
      </>
    );
  })()}
</div>


                      {/* <div className="amenities">
                       
                        <div className="free_amenities">Couple Friendly</div>
                        <div className="free_amenities">Local IDs Accepted</div>
                      </div> */}
                      <div className="hotel-freecancellation">
                        {/* <img
                          src="/images/checkmark.png"
                          alt=""
                          style={{ width: "16px" }}
                        /> */}
                        {/* {" "}
                       {item.Rooms[0].IsRefundable === true ? "Refundable"  : "Non-Refundable"} */}
                        {item.Rooms[0].MealType?.toLowerCase().includes(
                          "breakfast"
                        ) && <div className="">Free Breakfast</div>}
                      </div>
                    </div>
                    <div
                      className="PersuasionTextWithImageUI__PersuasionTextWrapperDiv-sc-1663bfa1-0 cDtVtC"
                      style={{ color: "rgb(255, 109, 56)" }}
                    >
                      <img
                        src="https://go-assets.ibcdn.com/u/GI/images/1720953427381-coupleFreindlyV2.png"
                        alt=""
                        data-testid=""
                        loading="lazy"
                        style={{
                          width: "15px",
                          height: "15px",
                          fill: "rgb(255, 109, 56)",
                          marginRight: "5px",
                        }}
                      />
                      <span style={{ fontSize: "12px" }}>Couple Friendly</span>
                    </div>


                    <div className="PersuasionsUnif-styles__PersuasionUIElementsWrapper-sc-984d18fd-0 kpiDMy">
                      <img
                        src="https://gos3.ibcdn.com/Inclusion_Icon_Revamped_SRP-1673507159.png"
                        alt=""
                        data-testid=""
                        loading="lazy"
                        style={{
                          width: "15px",
                          height: "15px",
                          fill: "rgb(70, 72, 77)",
                          marginRight: "5px",
                        }}
                      />
                      <span
                        className="PersuasionTextUI__PersuasionTextWrapperSpan-sc-33168a02-1 bdcGAt"
                        style={{ color: "rgb(70, 72, 77)", fontSize: "12px" }}
                      >
                        {item.Rooms[0].IsRefundable === true
                          ? "Refundable"
                          : "Non-Refundable"}
                      </span>
                    </div>
                    <div className="PersuasionsUnif-styles__PersuasionUIElementsWrapper-sc-984d18fd-0 kpiDMy">
                      <img
                        src="https://gos3.ibcdn.com/Inclusion_Icon_Revamped_SRP-1673507159.png"
                        alt=""
                        data-testid=""
                        loading="lazy"
                        style={{
                          width: "15px",
                          height: "15px",
                          fill: "rgb(70, 72, 77)",
                          marginRight: "5px",
                        }}
                      />
                      <span
                        className="PersuasionTextUI__PersuasionTextWrapperSpan-sc-33168a02-1 bdcGAt"
                        style={{ color: "rgb(70, 72, 77)", fontSize: "12px" }}
                      >
                        {item.Rooms[0].MealType !== "" ||
                        item.Rooms[0].MealType !== null
                          ? "Breakfast available"
                          : "Breakfast available at extra charges"}
                      </span>
                    </div>

                    {/* <div className="hotel-roomType">{item.Rooms[0].Name}</div> */}

                    {/* <div className="hotel-coupon">
                        <div className="">
                          <BiSolidOffer className="hotelcouponcode_icon" />
                          TRIPGOHOTELS Discount Applied
                        </div>
                      </div> */}
                  </Col>
                  <Col
                    md={3}
                    className="hotelListingstyling-img hotelListingstyling_hotelRatings"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <div>
                      <div className="hotel-numberic-ratingMain">
                        <div className="hotel-numberic-rating">
                          <div>
                            <div className="rating-label">Excellent</div>
                            <div className="rating-reviews">1134 reviews</div>
                          </div>
                          <div className="rating-score rating-score-inNum">
                            {item.star_rating}
                          </div>
                        </div>
                        <div>
                          <div className="cross-pricing">₹ 11,046</div>
                          <div className="real-pricing">
                            ₹ {Math.round(item.Rooms[0].TotalFare)}{" "}
                          </div>
                          <div className="hotel-taxesFees">
                            + ₹ {Math.round(item.Rooms[0].TotalTax)} Taxes &
                            fees
                          </div>
                          <div
                            className="hotel-taxesFees"
                            style={{ color: "#737373" }}
                          >
                            Per Night
                          </div>
                          {/* <div
                            className="hotel-freecancellation zeroBooking"
                            style={{ textAlign: "right" }}
                          >
                            <img
                              src="/images/checkmark.png"
                              alt=""
                              style={{ width: "16px" }}
                            />{" "}
                            Book with ₹0
                          </div> */}
                        </div>
                      </div>
                      {/* <div className="hotel-coupon hotel-couponDouble">
                          <div className="">
                            <BiSolidOffer className="hotelcouponcode_icon" />
                            TRIPGOHOTELS Discount Applied
                          </div>
                        </div> */}
                      <Link to="/hoteldetailsmain">
                        <button
                          onClick={() =>
                            handleViewButtonClick(item.HotelCode, item.Rooms)
                          }
                          className="hotel-viewRoom-btn"
                        >
                          View Room
                        </button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // <> <HotelListSkeleton/> <HotelListSkeleton/> <HotelListSkeleton/></>
        // <HotelLoader/>
        <HotelNotFound />
      )}
    </>
  );
}

export default HotelListingModifyNew;
