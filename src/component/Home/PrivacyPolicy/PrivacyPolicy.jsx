import React from "react";
import { Container } from "react-bootstrap";

const PrivacyPolicy = () => {
  return (
    <div>
      <section className="bannerInner">
        <Container>
          <h1>
            <b>Privacy Policy</b>
          </h1>
        </Container>
      </section>
      <section className="section_padding">
        <Container>
          <p>
            Welcome to SkyPort DestinationsTour & Travels, a premier B2C travel
            portal. We are committed to safeguarding the privacy of our users.
            This Privacy Policy outlines how we collect, use, disclose, and
            protect your personal information. By accessing or using our
            services, you agree to the terms outlined in this policy.
          </p>
          <div className="terms_item">
            <h2>1. Information We Collect:</h2>
            <p>
              Personal Information: We may collect personal information such as
              your name, contact details, and company information when you
              register on our platform or engage in transactions.
            </p>
            <p>
              Transaction Information: We collect information related to your
              transactions on SkyPort DestinationsTour & Travels, including
              bookings, payments, and communications.
            </p>
            <p>
              Technical Information: We may gather information about your
              device, IP address, browser, and browsing patterns to enhance your
              experience on our platform.
            </p>
          </div>

          <div className="terms_item">
            <h2>2. How We Use Your Information</h2>
            <p>
              {" "}
              Provide Services: We use your information to facilitate and
              enhance our travel services, including processing bookings and
              providing customer support.
            </p>
            <p>
              Communication: To keep you informed about bookings, updates, and
              promotional offers.
            </p>
            <p>
              Improving Services: Analyzing user behavior helps us enhance our
              platform, services, and user experience.
            </p>
          </div>

          <div className="terms_item">
            <h2>3. Sharing Your Information</h2>
            <p>
              Third-Party Service Providers: We may share your information with
              trusted third-party service providers who assist us in delivering
              our services.
            </p>
            <p>
              Legal Obligations: We may disclose your information if required by
              law or to protect our rights.
            </p>
          </div>

          <div className="terms_item">
            <h2>4. Data Security</h2>
            <p>
              Third-Party Service Providers: We may share your information with
              trusted third-party service providers who assist us in delivering
              our services.
            </p>
            <p>
              Legal Obligations: We may disclose your information if required by
              law or to protect our rights.
            </p>
          </div>

          <div className="terms_item">
            <h2>5. Your Choices</h2>
            <p>
              Account Settings: You can manage your account settings, including
              communication preferences, within your SkyPort DestinationsTour &
              Travels account.
            </p>
            <p>
              Opt-Out: You can opt-out of promotional communications by
              following the instructions provided in the messages.
            </p>
          </div>

          <div className="terms_item">
            <h2>6. Updates to the Privacy Policy</h2>
            <p>
              We reserve the right to update this Privacy Policy. Any changes
              will be effective immediately upon posting.
            </p>
          </div>

          <div className="terms_item">
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions or concerns regarding our Privacy
              Policy, please contact us at{" "}
              <a href="mailto:support@TripGo.com">support@TripGo.com</a>.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
