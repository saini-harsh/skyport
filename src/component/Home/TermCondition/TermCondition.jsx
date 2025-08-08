import React from "react";
import { Container } from "react-bootstrap";
import "./TermCondition.css";
const TermCondition = () => {
  return (
    <div>
      {" "}
      <section className="bannerInner">
        <Container>
          <h1>
            <b>Terms &amp; Conditions</b>
          </h1>
        </Container>
      </section>
      <section className="section_padding">
        <Container>
          <div className="terms_item">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the SkyPort DestinationsTour & Travels
              travel portal, you agree to be bound by these terms and
              conditions. If you do not agree to these terms, please refrain
              from using our services.
            </p>
          </div>

          <div className="terms_item">
            <h2>2. Registration and Account Security</h2>
            <p>
              You must register for an account to access certain features of
              SkyPort DestinationsTour & Travels. You are responsible for
              maintaining the confidentiality of your account information and
              for all activities that occur under your account.
            </p>
            <p>
              SkyPort DestinationsTour & Travels reserves the right to suspend
              or terminate your account at its discretion, without prior notice,
              if it is believed that you have violated these terms or engaged in
              any fraudulent activities.
            </p>
          </div>

          <div className="terms_item">
            <h2>3. Use of Services</h2>
            <p>
              SkyPort DestinationsTour & Travels provides a platform for B2C
              travel-related transactions. Users agree to use the services for
              legitimate business purposes and comply with all applicable laws
              and regulations.
            </p>
            <p>
              Users are responsible for the accuracy of the information provided
              during bookings and transactions. SkyPort DestinationsTour &
              Travels is not liable for any consequences resulting from
              inaccurate or incomplete information.
            </p>
          </div>

          <div className="terms_item">
            <h2>4. Payments and Fees</h2>
            <p>
              Payments for services provided by SkyPort DestinationsTour &
              Travels are subject to the terms agreed upon during the booking
              process.
            </p>
            <p>
              SkyPort DestinationsTour & Travels reserves the right to modify
              fees, charges, or payment terms at any time, with notice provided
              to users.
            </p>
          </div>

          <div className="terms_item">
            <h2>5. Intellectual Property</h2>
            <p>
              The content, logos, and trademarks on the SkyPort DestinationsTour
              & Travels platform are the intellectual property of SkyPort
              DestinationsTour & Travels. Users agree not to reproduce,
              distribute, or modify any content without explicit permission.
            </p>
          </div>

          <div className="terms_item">
            <h2>6. Privacy</h2>
            <p>
              SkyPort DestinationsTour & Travels values user privacy and handles
              personal information in accordance with its Privacy Policy. By
              using our services, you consent to the collection and use of your
              information as described in the Privacy Policy.
            </p>
          </div>

          <div className="terms_item">
            <h2>7. Liability and Disclaimers</h2>
            <p>
              SkyPort DestinationsTour & Travels is not liable for any direct,
              indirect, incidental, special, or consequential damages arising
              from the use of our services.
            </p>
            <p>
              SkyPort DestinationsTour & Travels does not guarantee the
              accuracy, completeness, or reliability of information provided by
              third-party suppliers.
            </p>
          </div>

          <div className="terms_item">
            <h2>8. Changes to Terms</h2>
            <p>
              SkyPort DestinationsTour & Travels reserves the right to update or
              modify these terms and conditions at any time. Users are
              encouraged to review the terms periodically. Continued use of our
              services after changes constitutes acceptance of the modified
              terms.
            </p>
          </div>

          <div className="terms_item">
            <h2>9. Refund Policy</h2>
            <p>
              a. The customers are required to contact SkyPort DestinationsTour
              & Travels Company directly for the refunds, the Hotel will not be
              able to process refund for the rooms booked at SkyPort
              DestinationsTour & Travels. <br />
              b. The time taken for processing the request for refund and
              cancellation may vary and can take up to 5 to 7 working days{" "}
              <br />
              c. Refund for partially utilized hotel vouchers will be processed
              as per the Hotel’s prevalent guidelines Refunds for partially used
              vouchers can take up to 25 to 30 working days, depending upon the
              room type and price charged by Hotel and Hotel/ policy. <br />
              {/* d. No refund will be provided for “no-shows" <br/> */}
              e. No refund will be provided for “Surcharge and Convenience
              fees”.
              <br />
              {/* f. In addition to the above mentioned terms and conditions, please check the terms and conditions of your respective Hotel as well. Those terms and conditions also apply on you. */}
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default TermCondition;
