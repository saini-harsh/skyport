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
          </div>
        </Container>
      </section>
      <section className="section_padding">
        <Container>
        <Row className="d-flex align-items-center">
            <Col md={6}>
              <div>
                {/* <h2>
                  <b>Our Mission</b>
                </h2> */}
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
                </p>
              </div>
            </Col>
            <Col md={6}>
              <img
                src="https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg"
                className="img-fluid"
                alt="Expand Sales"
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section_padding">
        <Container>
          <Row className="d-flex align-items-center">
            <Col md={6}>
              <img
                src="https://img.freepik.com/free-vector/business-team-communicating-via-social-media_74855-5439.jpg"
                className="img-fluid"
                alt="Expand Sales"
              />
            </Col>
            <Col md={6}>
              <div>
                {/* <h2>
                  <b>What Sets Us Apart</b>
                </h2> */}
                <p>
                Launched by Guyanese with a vision of connecting the world from our vibrant corner of the
            Caribbean, SkyPort Destinations is driven by a vision to become the leading name in digital air
            travel across the Caribbean and beyond. By prioritizing transparency, innovation, and
            operational excellence, the company aims to reshape how travelers book flights — making it
            smarter, simpler, and more secure.
            SkyPort Destinations represents a new standard in flight booking — built for scale, powered by
            trust, and committed to delivering travel solutions that match the speed and ambition of the
            modern world.
            At SkyPort Destinations, we don’t just book flights — we open the skies to your next story.
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
