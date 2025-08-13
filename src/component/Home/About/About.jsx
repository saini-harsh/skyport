import React from "react";
import "./About.css";
import { Col, Container, Row } from "react-bootstrap";
// import WhyChoose from "../Home/innerComponents/WhyChoose";
// import WhyChoose from "../Home/innerComponents/WhyChoose";
const About = () => {
  return (
    <div>
      <section className="bannerInner">
        <div className="container">
          <h1>
            <b>About Us</b>
          </h1>
        </div>
      </section>
      <section className="section_padding">
        <Container>
          <div className="text-center">
            <h2>
              <b>About SkyPort Destinations</b>
            </h2>
            <p>
           Every journey begins with more than a boarding pass.
            It starts with a spark — a desire to explore, to reconnect, to feel alive somewhere new.
            Whether you&#39;re chasing opportunities, escaping to turquoise coastlines, reuniting, or simply
            answering the quiet call of adventure — SkyPort Destinations is your passport to the world.
            SkyPort Destinations is a premium online travel agency specializing exclusively in global flight
            bookings. Designed for the modern traveler, the platform offers a seamless, secure, and
            efficient way to search, compare, and book flights across international routes — all from a
            single, trusted destination. Every aspect of the experience — from search to checkout — has
            been designed to align with international best practices in travel technology and customer
            satisfaction.
            Launched by Guyanese with a vision of connecting the world from our vibrant corner of the
            Caribbean, SkyPort Destinations is driven by a vision to become the leading name in digital air
            travel across the Caribbean and beyond. By prioritizing transparency, innovation, and
            operational excellence, the company aims to reshape how travelers book flights — making it
            smarter, simpler, and more secure.
            SkyPort Destinations represents a new standard in flight booking — built for scale, powered by
            trust, and committed to delivering travel solutions that match the speed and ambition of the
            modern world.
            At SkyPort Destinations, we don’t just book flights — we open the skies to your next story..
            </p>
          </div>
        </Container>
      </section>
      <section className="section_padding">
        <Container>
          <Row>
            <Col md={6}>
              <div>
                <h2>
                  <b>Our Mission</b>
                </h2>
                <p>
                  At SkyPort DestinationsTour & Travels, our mission is to
                  simplify and elevate the travel experience for our B2C
                  partners. We strive to be the preferred travel portal by
                  delivering cutting-edge technology, unparalleled service, and
                  strategic partnerships that drive business success.
                </p>
                <p>
                  Empowering Business Success: We are dedicated to empowering
                  the success of our B2C partners by providing them with a
                  dynamic platform that seamlessly integrates cutting-edge
                  technology, strategic partnerships, and industry insights. Our
                  mission is to be the driving force behind the growth and
                  profitability of businesses in the travel sector.
                </p>
              </div>
            </Col>
            <Col md={6}>
              <img
                src="https://img.freepik.com/premium-photo/editorial-man-control-airviation_7180-40.jpg?w=900"
                className="img-fluid"
                alt="Expand Sales"
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section_padding">
        <Container>
          <Row>
            <Col md={6}>
              <img
                src="https://img.freepik.com/free-photo/couple-interacting-with-each-other-check-counter_107420-85045.jpg?t=st=1736426055~exp=1736429655~hmac=4d747669ea9116e5570ef2f2a8281d3d90a4b67a6bef10d0bacc5c77ced75684&w=900"
                className="img-fluid"
                alt="Expand Sales"
              />
            </Col>
            <Col md={6}>
              <div>
                <h2>
                  <b>What Sets Us Apart</b>
                </h2>
                <p>
                  SkyPort DestinationsTour & Travels is exclusively designed for
                  businesses in the travel industry. Whether you are a travel
                  agency, tour operator, or corporate entity, our platform is
                  crafted to meet your specific requirements, offering a
                  comprehensive suite of tools and services.
                </p>
                <p>
                  We leverage the latest technology to bring efficiency,
                  transparency, and innovation to your fingertips. Our
                  user-friendly portal is equipped with advanced features to
                  streamline booking processes, manage reservations, and access
                  real-time data, ensuring you stay ahead in a dynamic market.
                </p>
                <p>
                  Your success is our priority. SkyPort DestinationsTour &
                  Travels is more than a platform; it's a partnership. Our
                  dedicated support team is committed to providing personalized
                  assistance, ensuring that your business experiences seamless
                  operations and growth.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <WhyChoose /> */}
    </div>
  );
};

export default About;
