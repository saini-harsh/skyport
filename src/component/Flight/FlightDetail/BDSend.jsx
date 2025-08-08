import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { countryCodeNum } from "../../../CountryCodeNum";

const BDSend = ({ walletData, onDataChange }) => {
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    gstChecked: false,
    companyName: "",
    registrationNo: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Notify parent on every change
  useEffect(() => {
    onDataChange(formData);
  }, [formData, onDataChange]);

  return (
    <div className="componentContainer componentContainerAnother componentContainerAnother_BD_Send">
      <Row>
        <Col sm={2}></Col>
        <Col sm={10}>
          <div className="bookingDetailsForm" id="contactDetails">
            <p className="fontSize14 boldFont appendBottom15">
              Booking details will be sent to
            </p>
          </div>
          <Row className="adultItemRow">
            <Col sm={2} xs={4}>
              <div className="adultItem" id="Country Code">
                <div className="selectItem relative">
                  <div className="dropdown__control css-yk16xz-control">
                    <div className="dropdown__single-value css-1uccc91-singleValue">
                      <select
                        name=""
                        id=""
                        style={{
                          border: "none",
                          padding: "0px",
                          height: "20px",
                          fontSize: "14px",
                          width: "155px",
                        }}
                      >
                        {countryCodeNum.map((item, index) => (
                          <option value={item.dial_code}>
                            {item.name}({item.dial_code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={5} xs={8}>
              <div className="adultItem flightBookingFirstName1">
                <div className="relative">
                  <input
                    className="tvlrInput"
                    type="text"
                    placeholder="Contact No"
                    value={formData.mobile}
                    onChange={(e) =>
                      handleInputChange("mobile", e.target.value)
                    }
                  />
                </div>
              </div>
            </Col>
            <Col sm={5} xs={12}>
              <div className="adultItem flightBookingFirstName1">
                <div className="relative">
                  <input
                    className="tvlrInput"
                    type="text"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>
              </div>
            </Col>


               <div className="padding20" id="gstDetails">
        <label className="checkboxContainer">
          <span className="commonCheckbox sizeSm primaryCheckbox">
            <input
              type="checkbox"
              checked={formData.gstChecked}
              onChange={(e) =>
                handleInputChange("gstChecked", e.target.checked)
              }
            />
            <span className="box">
              <span className="check" />
            </span>
          </span>
          <div className="checkboxContent">
            <p className="checkboxTitle">
              <span className="boldFont">
                <font color="#222222">I have a GST number</font>{" "}
                <font color="#9b9b9b">(Optional)</font>
              </span>
            </p>
          </div>
        </label>

        {formData.gstChecked && (
          <div className="appendTop15">
            <div className="adultItemRow">
              <div
                className="adultItem"
                style={{ width: "30%", marginRight: "20px" }}
              >
                <div className="relative">
                  <label style={{ fontSize: "14px" }}>Company Name</label>
                  <input
                    autoComplete="none"
                    placeholder="Company Name"
                    className="tvlrInput"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="adultItem" style={{ width: "30%" }}>
                <div className="relative">
                  <label style={{ fontSize: "14px" }}>GST No</label>
                  <input
                    autoComplete="none"
                    placeholder="Gst No"
                    className="tvlrInput"
                    type="text"
                    value={formData.registrationNo}
                    onChange={(e) =>
                      handleInputChange("registrationNo", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
          </Row>
        </Col>
      </Row>

   
    </div>
  );
};

export default BDSend;
