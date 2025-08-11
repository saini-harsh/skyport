import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewFooter.css';

// Get tomorrow's date in YYYY-MM-DD format
const getTomorrowDate = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

const tomorrowDate = getTomorrowDate();

// Static footer links
const footerLinks = [
  { title: "About Us", link: "/about-us" },
  { title: "Privacy Policy", link: "" },
  { title: "Terms & Conditions", link: "" },
  { title: "Contact Us", link: "/contact" },
  { title: "Offers", link: "/offers" },
];

// Domestic routes
const domestic = [
  { ori: "Delhi", desti: "Goa", link: `/flightList/dest_GOI*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Mumbai", desti: "Delhi", link: `/flightList/dest_DEL*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Delhi", desti: "Kolkata", link: `/flightList/dest_CCU*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Pune", desti: "Delhi", link: `/flightList/dest_DEL*org_PNQ*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Bangalore", desti: "Delhi", link: `/flightList/dest_DEL*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Mumbai", desti: "Bangalore", link: `/flightList/dest_BLR*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Chennai", desti: "Delhi", link: `/flightList/dest_DEL*org_MAA*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Kolkata", desti: "Delhi", link: `/flightList/dest_DEL*org_CCU*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Delhi", desti: "Mumbai", link: `/flightList/dest_BOM*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Delhi", desti: "Bangalore", link: `/flightList/dest_BLR*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Mumbai", desti: "Goa", link: `/flightList/dest_GOI*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
];

// International routes
const international = [
  { ori: "Delhi", desti: "Singapore", link: `/flightList/dest_SIN*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Delhi", desti: "Bangkok", link: `/flightList/dest_BKK*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Mumbai", desti: "Dubai", link: `/flightList/dest_DXB*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Delhi", desti: "Dubai", link: `/flightList/dest_DXB*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Delhi", desti: "London", link: `/flightList/dest_LHR*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Delhi", desti: "Toronto", link: `/flightList/dest_YYZ*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Delhi", desti: "New York", link: `/flightList/dest_JFK*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Bangalore", desti: "Singapore", link: `/flightList/dest_SIN*org_BLR*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Delhi", desti: "Paris", link: `/flightList/dest_CDG*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Mumbai", desti: "Paris", link: `/flightList/dest_CDG*org_BOM*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
  { ori: "Delhi", desti: "Hong Kong", link: `/flightList/dest_HKG*org_DEL*dep_${tomorrowDate}*arr_${tomorrowDate}*px_1-0-0*jt_1*cbn_2` },
];

// Menu structure
const menuData = [
  {
    label: 'About',
    heading: 'About',
    links: footerLinks.map(item => ({ text: item.title, href: item.link })),
  },
  {
    label: 'Popular Flights',
    heading: 'Domestic Flights',
    columns: [
      domestic.slice(0, 6).map(item => ({
        text: `${item.ori} to ${item.desti} Flights`,
        href: item.link,
      })),
      domestic.slice(6).map(item => ({
        text: `${item.ori} to ${item.desti} Flights`,
        href: item.link,
      })),
    ],
  },
  {
    label: 'International Flights',
    heading: 'International Flights',
    columns: [
      international.slice(0, 6).map(item => ({
        text: `${item.ori} to ${item.desti} Flights`,
        href: item.link,
      })),
      international.slice(6).map(item => ({
        text: `${item.ori} to ${item.desti} Flights`,
        href: item.link,
      })),
    ],
  },
];

const socialIcons = [
  { icon: 'fab fa-facebook-f', label: 'Facebook', link: '#' },
  { icon: 'fab fa-x-twitter', label: 'Twitter', link: '#' },
  { icon: 'fab fa-instagram', label: 'Instagram', link: '#' },
  { icon: 'fab fa-tiktok', label: 'TikTok', link: '#' },
];

const NewFooter = () => {
  const [selected, setSelected] = useState(0);
  const mainMenu = menuData[selected];

  function renderLinksRight(section) {
    return (
      <div className="footer-twopane-right">
        {section.heading && (
          <div className="footer-twopane-title">{section.heading}</div>
        )}
        {section.columns ? (
          <div className={`footer-twopane-columns columns-${section.columns.length}`}>
            {section.columns.map((col, colIdx) => (
              <ul className="footer-twopane-list" key={colIdx}>
                {col.map((item, idx) => (
                  <li key={idx}>
                    <Link to={item.href}>{item.text}</Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ) : (
          <ul className="footer-twopane-list single-col">
            {section.links?.map((item, idx) => (
              <li key={idx}>
                <Link to={item.href}>{item.text}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <footer className="footer-main twopane">
        {/* Heading Row */}
      <div className="footer-twopane-content" style={{minHeight:"0px"}}>
        <div className="footer-heading-row">
        <div className="footer-heading-left">Easy Access</div>
        <div className="footer-heading-right">
          Connect with Us
          <div className="footer-social-inline">
            {socialIcons.map((icon, idx) => (
              <a key={idx} href={icon.link} aria-label={icon.label}>
                <i className={icon.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
      </div>
      <div className="footer-twopane-content">
        <div className="footer-twopane-left">
          {menuData.map((menu, idx) => (
            <div
              key={menu.label}
              className={`footer-twopane-menu-item${selected === idx ? ' active' : ''}`}
              onClick={() => setSelected(idx)}
              tabIndex={0}
              role="button"
              aria-label={menu.label}
            >
              {menu.label}
            </div>
          ))}
        </div>
        {renderLinksRight(mainMenu)}
      </div>
      <div className="footer-twopane-content fpaystrip" style={{minHeight:"0px"}}>
      <img src="https://c.fareportal.com/vd/coa/travel/r6/images/footer-logo-desktop.webp" width="1135" height="51" alt="partners logos" className="footer-logo-desktop"/>
      </div>

      <div className="footer-copyright">
        © 2024 SkyPort Destinations | All rights reserved
      </div>
    </footer>
  );
};

export default NewFooter;
