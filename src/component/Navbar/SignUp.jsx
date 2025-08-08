import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loggedIn } from "../../redux/slices/login";

const SignUp = ({ show, handleClose, otpSent, setOtpSent }) => {
  const [phone, setPhone] = useState("");
  // const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0); // OTP validity
  const [resendCooldown, setResendCooldown] = useState(0); // Cooldown
  const [error, setError] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const countryCode = "91";
  const dispatch = useDispatch();
  const sendOTP = async () => {
    setLoadingOtp(true);
    try {
      const response = await axios.post(
        "https://admin.tripgoonline.com/api/User/LoginOTP",
        {
          CountryCode: countryCode,
          PhoneNumber: phone,
        }
      );

      if (response.data.success) {
        setOtpSent(true);
        // setOtpTimer(120); // Reset 2-min OTP timer
        setResendCooldown(60); // Start 30s resend cooldown
        setOtp("");
        setError("");
        setLoadingOtp(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
        setLoadingOtp(false);
      }
    } catch (error) {
      console.error("OTP send error:", error);
      toast.error("Something went wrong!");
      setLoadingOtp(false);
    }
  };

  const validateOTP = async () => {
    try {
      const response = await axios.post(
        "https://admin.tripgoonline.com/api/User/ValidateOTP",
        {
          CountryCode: countryCode,
          PhoneNumber: phone,
          OTP: otp,
        }
      );

      if (response.data.success) {
        toast.success("OTP validated successfully!");
        localStorage.setItem("isAuthenticated", response.data.data.token);
        localStorage.setItem("UserId", response.data.data.Phone);

        dispatch(loggedIn(response.data.data.token));
        localStorage.setItem(
          "names",
          response.data.data.FirstName,
          response.data.data.LastName
        );
        localStorage.setItem("email", response.data.data.Email);
        setOtpSent(false);
        setResendCooldown(0);
        setError("");
        handleClose();
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP validation error:", error);
      setError("Error validating OTP.");
    }
  };

  // Timer for OTP validity
  useEffect(() => {
    let otpInterval;
    if (otpSent && otpTimer > 0) {
      otpInterval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(otpInterval);
            setOtpSent(false); // Hide OTP field
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(otpInterval);
  }, [otpSent, otpTimer]);

  // Cooldown timer for resend
  useEffect(() => {
    let cooldownInterval;
    if (resendCooldown > 0) {
      cooldownInterval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownInterval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(cooldownInterval);
  }, [resendCooldown]);

  const formatTime = (time) => {
    const m = String(Math.floor(time / 60)).padStart(2, "0");
    const s = String(time % 60).padStart(2, "0");
    return `${m}:${s}`;
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="p-fixed l-0 r-0 b-0 t-0 flex flex-center flex-middle z-70 signup_modal"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 1000000000 }}
      size="lg"
    >
      <Modal.Body>
        <div
          className="p-fixed l-0 r-0 b-0 t-0 flex flex-center flex-middle z-70"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: "10000" }}
        >
          <div className="p-relative">
            <div>
              <div className="d-flex" style={{ justifyContent: "center" }}>
                <div
                  className="o-hidden flex-column brLogin-4 slick-dots slider_part"
                  style={{ width: "386px", height: "500px" }}
                >
                  <Swiper
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <img
                        src="https://images.travelxp.com/deals/dealflighthome/hdfcflyyy.png?tr=w-1920"
                        alt=""
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div
                  className="bg-white o-hidden d-flex flex-column brLoginNew-4 signup_form"
                  style={{ width: "400px", height: "500px" }}
                >
                  <div className="px-8 d-flex flex-1 flex-column">
                    <div className="pt-6 pb-6 flex flex-top flex-between">
                      <div className="flex flex-column">
                        <div className="fw-600 c-primary-0 lpf-40"></div>
                      </div>
                      <div
                        className="px-1 flex flex-middle nmx-1 pb-1"
                        style={{ borderRadius: "14px" }}
                        onClick={handleClose}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="c-pointer c-neutral-900"
                        >
                          <path
                            d="M18 6L12 12M12 12L6 18M12 12L6 6M12 12L18 18"
                            stroke="#1A1A1A"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="d-flex flex-1 flex-between flex-column">
                      <div>
                        <Row>
                          <Col xs={6}>
                            <div className="p-relative">
                              <button
                                className="flex flex-middle flex-between t-all fs-2 focus:bc-secondary-500 bg-transparent bc-neutral-100 c-pointer pr-2 pl-3 pt-2 pb-2 ba br-4 h-8 h-9 p-0 px-2 fs-3 country_code"
                                style={{
                                  //  minWidth: "80px",
                                  minHeight: "44px",
                                }}
                              >
                                <div className="fs-2 c-inherit flex flex-nowrap">
                                  +91
                                </div>
                                <svg
                                  width="14"
                                  height="9"
                                  fill="currentColor"
                                  className="t-all ml-2"
                                  style={{
                                    transform: "rotate(-180deg)",
                                    color: "rgb(153, 153, 153)",
                                  }}
                                >
                                  <g fill="none" fillRule="evenodd">
                                    <path d="M15 12H-1V-4h16z"></path>
                                    <path
                                      stroke="#FFF"
                                      strokeWidth="0.5"
                                      fill="currentColor"
                                      d="M11.59 8L7 3.42 2.41 8 1 6.59l6-6 6 6z"
                                    ></path>
                                  </g>
                                </svg>
                              </button>
                            </div>
                          </Col>
                          <Col>
                            <div className="p-relative">
                              <Form.Control
                                className="field bw-1 bs-solid w-100p p-2 box-border br-4 fs-2 c-neutral-900 h-9 fs-3 bc-neutral-100 c-neutral-900 focus:bc-secondary-500"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter mobile number"
                                style={{ minWidth: "80px", minHeight: "44px" }}
                              />
                            </div>
                          </Col>
                        </Row>
                        {!otpSent ? (
                          <>
                            <div
                              className="m-0 mt-0 mb-0 ml-0 mr-0 mx-0 my-0 mt-6 margin-modalbooking"
                              style={{ height: "1px", width: "1px" }}
                            ></div>
                            <Button
                              onClick={sendOTP}
                              disabled={!phone}
                              className="get_otp_signUp h-10 bg-black-500 hover:bg-black-500 bg-secondary-500 hover:bg-secondary-600 c-white bc-transparent c-pointer w-100p py-2 px-4 h-9 fs-4 fw-600 t-all button bs-solid tp-color td-500 bw-1 br-4 lh-solid box-border"
                            >
                              {loadingOtp ? (
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span className="fs-3 fw-500">Get OTP</span>
                              )}
                            </Button>
                          </>
                        ) : (
                          <>
                            <Form.Control
                              className="mt-3"
                              type="text"
                              placeholder="Enter OTP"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                            {error && (
                              <div
                                className="text-danger mt-1"
                                style={{ fontSize: "14px" }}
                              >
                                {error}
                              </div>
                            )}
                            <div className="text-center mt-2">
                              <Button
                                variant="link"
                                onClick={sendOTP}
                                disabled={resendCooldown > 0}
                                style={{ fontSize: "12px" }}
                                className="resend_otp_font"
                              >
                                Resend OTP{" "}
                                {resendCooldown > 0 && `(${resendCooldown}s)`}
                              </Button>
                            </div>
                            {/* <div className="text-muted mt-2 text-center">
                              OTP expires in:{" "}
                              <strong>{formatTime(otpTimer)}</strong>
                            </div> */}

                            <Button
                              variant="success"
                              className="w-100 mt-2"
                              onClick={validateOTP}
                              disabled={!otp}
                            >
                              Validate OTP
                            </Button>
                          </>
                        )}

                        <div
                          className="mt-3 fs-12 fw-400 c-neutral-grey ta-center"
                          style={{ marginTop: "20px" }}
                        >
                          You can now login via mobile number & link email to
                          access your account.
                        </div>
                      </div>
                      <div className="mb-5">
                        <div className="pos-r">
                          <div className="bc-grey-10 d-block bb bc-grey-10 flex-1"></div>
                        </div>
                        <div className="mt-5 d-flex flex-column flex-middle">
                          <span>
                            <span className="fs-2 c-grey-70">
                              By continuing, you agree to SkyPort
                              DestinationsOnline
                            </span>
                            <Link
                              style={{ textDecoration: "underline" }}
                              className="fs-2 fw-500 c-blue c-pointer"
                              to="/privacy-policy"
                              onClick={handleClose}
                            >
                              {" "}
                              privacy policy
                            </Link>
                            <span className="fs-2 c-grey-70">
                              {" "}
                              &{" "}
                              <Link
                                style={{ textDecoration: "underline" }}
                                className="fs-2 fw-500 c-blue c-pointer"
                                to="/terms-conditions"
                                onClick={handleClose}
                              >
                                {/* <span className="fs-2 fw-500 c-blue c-pointer"> */}
                                terms of use.
                                {/* </span> */}
                              </Link>
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      {/* </div> */}
    </Modal>
  );
};

export default SignUp;
