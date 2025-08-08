import React from "react";
import "./FlightDeals.css";
import { Container } from "react-bootstrap";
const FlightDeals = () => {
  return (
    <div className="alldealTab">
      <Container className="deal-section dealSection">
        <h2 className="blueHead dealHeading">
          Cheap International Flight Deals*{" "}
        </h2>
        <ul className="deal-tab">
          <li className="deal-tab3 tab-item active">All</li>
          <li className="deal-tab1 tab-item">One Way</li>
          <li className="deal-tab2 tab-item">Round Trip</li>
        </ul>
        <div
          className="dealcontainer1 tab-content"
          style={{ display: "block" }}
        >
          <table className="main-table">
            <tbody>
              <tr className="main-row dealLength5">
                <td valign="top" className="cell-0">
                  <div className="deal-box">
                    <a className="text-decoration-none" href="#">
                      <figure>
                        <img
                          src="//c.fareportal.com/gcms/portals/2/images/destinations/YVR-r2x.jpg"
                          className="lazy"
                          alt="YVR"
                        />
                        <figcaption className="sr-only">YVR</figcaption>
                      </figure>
                      <div className="travel-details travel-details_flight_deals p-2">
                        <strong className="ond">
                          San Francisco → Vancouver
                        </strong>
                        <br />
                        <small>
                          <span className="ttext">One Way Trip | </span>
                          <span className="depart-date">Sep 9</span>
                        </small>
                        <strong
                          className="totalfare discounted"
                          data-amount="58.99"
                        >
                          $58<sup>.99</sup>
                        </strong>
                        <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                          Book Now
                        </span>
                      </div>
                    </a>
                  </div>
                </td>
                <td valign="top" className="cell-1">
                  <table className="four-cells-table dealLength5">
                    <tbody>
                      <tr className="dealrow-1">
                        <td className="cell1-1">
                          <div className="deal-box">
                            <a className="text-decoration-none" href="#">
                              <figure>
                                <img
                                  src="//c.fareportal.com/gcms/portals/2/Images/destinations/Generic-1-r2x.jpg"
                                  className="lazy"
                                  alt="YVR"
                                />
                                <figcaption className="sr-only">YVR</figcaption>
                              </figure>
                              <div className="travel-details travel-details_flight_deals p-2">
                                <strong className="ond">
                                  Los Angeles → Vancouver
                                </strong>
                                <br />
                                <small>
                                  <span className="ttext">One Way Trip | </span>
                                  <span className="depart-date">Sep 19</span>
                                </small>
                                <strong
                                  className="totalfare discounted"
                                  data-amount="74.99"
                                >
                                  $74<sup>.99</sup>
                                </strong>
                                <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                                  Book Now
                                </span>
                              </div>
                            </a>
                          </div>
                        </td>
                        <td className="cell1-2">
                          <div className="deal-box">
                            <a className="text-decoration-none" href="#">
                              <figure>
                                <img
                                  src="//c.fareportal.com/gcms/portals/2/images/destinations/YTO-r2x.jpg"
                                  className="lazy"
                                  alt="YTO"
                                />
                                <figcaption className="sr-only">YTO</figcaption>
                              </figure>
                              <div className="travel-details travel-details_flight_deals p-2">
                                <strong className="ond">
                                  Chicago → Toronto
                                </strong>
                                <br />
                                <small>
                                  <span className="ttext">One Way Trip | </span>
                                  <span className="depart-date">Nov 14</span>
                                </small>
                                <strong
                                  className="totalfare discounted"
                                  data-amount="83.9"
                                >
                                  $83<sup>.90</sup>
                                </strong>
                                <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                                  Book Now
                                </span>
                              </div>
                            </a>
                          </div>
                        </td>
                      </tr>
                      <tr className="dealrow-2">
                        <td className="cell1-3">
                          <div className="deal-box">
                            <a className="text-decoration-none" href="#">
                              <figure>
                                <img
                                  src="//c.fareportal.com/gcms/portals/2/Images/destinations/Generic-3-r2x.jpg"
                                  className="lazy"
                                  alt="YTO"
                                />
                                <figcaption className="sr-only">YTO</figcaption>
                              </figure>
                              <div className="travel-details travel-details_flight_deals p-2">
                                <strong className="ond">
                                  Los Angeles → Toronto
                                </strong>
                                <br />
                                <small>
                                  <span className="ttext">One Way Trip | </span>
                                  <span className="depart-date">Oct 22</span>
                                </small>
                                <strong
                                  className="totalfare discounted"
                                  data-amount="96.65"
                                >
                                  $96<sup>.65</sup>
                                </strong>
                                <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                                  Book Now
                                </span>
                              </div>
                            </a>
                          </div>
                        </td>
                        <td className="cell1-4">
                          <div className="deal-box">
                            <a className="text-decoration-none" href="#">
                              <figure>
                                <img
                                  src="//c.fareportal.com/gcms/portals/2/images/destinations/YYC-r2x.jpg"
                                  className="lazy"
                                  alt="YYC"
                                />
                                <figcaption className="sr-only">YYC</figcaption>
                              </figure>
                              <div className="travel-details travel-details_flight_deals p-2">
                                <strong className="ond">
                                  Los Angeles → Calgary
                                </strong>
                                <br />
                                <small>
                                  <span className="ttext">One Way Trip | </span>
                                  <span className="depart-date">Nov 5</span>
                                </small>
                                <strong
                                  className="totalfare discounted"
                                  data-amount="104.99"
                                >
                                  $104<sup>.99</sup>
                                </strong>
                                <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                                  Book Now
                                </span>
                              </div>
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dealcontainer2 tab-content" style={{ display: 'block' }}>
  <table className="main-table">
    <tbody>
      <tr className="main-row dealLength5">
        <td valign="top" className="cell-0">
          <div className="deal-box">
            <a
              className="text-decoration-none"
              
            >
              <figure>
                <img
                  src="//c.fareportal.com/gcms/portals/2/Images/destinations/Generic-0-r2x.jpg"
                  className="lazy"
                  alt="YVR"
                />
                <figcaption className="sr-only">YVR</figcaption>
              </figure>
              <div className="travel-details travel-details_flight_deals p-2">
                <strong className="ond">San Francisco ⇌ Vancouver</strong>
                <br />
                <small>
                  <span className="ttext">Round Trip | </span>
                  <span className="depart-date">Sep 8</span>
                  <span className="return-date"> - Sep 13</span>
                </small>
                <strong className="totalfare discounted" data-amount="122.99">
                  $122<sup>.99</sup>
                </strong>
                <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                  Book Now
                </span>
              </div>
            </a>
          </div>
        </td>
        <td valign="top" className="cell-1">
          <table className="four-cells-table dealLength5">
            <tbody>
              <tr className="dealrow-1">
                <td className="cell1-1">
                  <div className="deal-box">
                    <a
                      className="text-decoration-none"
                     
                    >
                      <figure>
                        <img
                          src="//c.fareportal.com/gcms/portals/2/Images/destinations/Generic-1-r2x.jpg"
                          className="lazy"
                          alt="YTO"
                        />
                        <figcaption className="sr-only">YTO</figcaption>
                      </figure>
                      <div className="travel-details travel-details_flight_deals p-2">
                        <strong className="ond">Chicago ⇌ Toronto</strong>
                        <br />
                        <small>
                          <span className="ttext">Round Trip | </span>
                          <span className="depart-date">Nov 8</span>
                          <span className="return-date"> - Nov 8</span>
                        </small>
                        <strong className="totalfare discounted" data-amount="175.91">
                          $175<sup>.91</sup>
                        </strong>
                        <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                          Book Now
                        </span>
                      </div>
                    </a>
                  </div>
                </td>
                <td className="cell1-2">
                  <div className="deal-box">
                    <a
                      className="text-decoration-none"
                     
                    >
                      <figure>
                        <img
                          src="//c.fareportal.com/gcms/portals/2/Images/destinations/Generic-2-r2x.jpg"
                          className="lazy"
                          alt="YYC"
                        />
                        <figcaption className="sr-only">YYC</figcaption>
                      </figure>
                      <div className="travel-details travel-details_flight_deals p-2">
                        <strong className="ond">Atlanta ⇌ Calgary</strong>
                        <br />
                        <small>
                          <span className="ttext">Round Trip | </span>
                          <span className="depart-date">Nov 15</span>
                          <span className="return-date"> - Nov 16</span>
                        </small>
                        <strong className="totalfare discounted" data-amount="204.99">
                          $204<sup>.99</sup>
                        </strong>
                        <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                          Book Now
                        </span>
                      </div>
                    </a>
                  </div>
                </td>
              </tr>
              <tr className="dealrow-2">
                <td className="cell1-3">
                  <div className="deal-box">
                    <a
                      className="text-decoration-none"
                    
                    >
                      <figure>
                        <img
                          src="//c.fareportal.com/gcms/portals/2/Images/destinations/Generic-3-r2x.jpg"
                          className="lazy"
                          alt="YYC"
                        />
                        <figcaption className="sr-only">YYC</figcaption>
                      </figure>
                      <div className="travel-details travel-details_flight_deals p-2">
                        <strong className="ond">San Francisco ⇌ Calgary</strong>
                        <br />
                        <small>
                          <span className="ttext">Round Trip | </span>
                          <span className="depart-date">Nov 27</span>
                          <span className="return-date"> - Dec 4</span>
                        </small>
                        <strong className="totalfare discounted" data-amount="210.99">
                          $210<sup>.99</sup>
                        </strong>
                        <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                          Book Now
                        </span>
                      </div>
                    </a>
                  </div>
                </td>
                <td className="cell1-4">
                  <div className="deal-box">
                    <a
                      className="text-decoration-none"
                     
                    >
                      <figure>
                        <img
                          src="//c.fareportal.com/gcms/portals/2/Images/destinations/Generic-4-r2x.jpg"
                          className="lazy"
                          alt="YTO"
                        />
                        <figcaption className="sr-only">YTO</figcaption>
                      </figure>
                      <div className="travel-details travel-details_flight_deals p-2">
                        <strong className="ond">Los Angeles ⇌ Toronto</strong>
                        <br />
                        <small>
                          <span className="ttext">Round Trip | </span>
                          <span className="depart-date">Sep 8</span>
                          <span className="return-date"> - Sep 16</span>
                        </small>
                        <strong className="totalfare discounted" data-amount="217.71">
                          $217<sup>.71</sup>
                        </strong>
                        <span className="p-2 btn-secondary-outline text-center rounded float-right border-blue cursor-pointer deal-search">
                          Book Now
                        </span>
                      </div>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>

      </Container>
    </div>
  );
};

export default FlightDeals;
