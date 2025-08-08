import React, { useState } from 'react';
import './NewFooter.css';

const menuData = [
  {
    label: 'Quick Links',
    type: 'section',
    items: [
      { label: 'Popular Airlines', type: 'submenu',
        heading: 'Explore our cheap airfare options by carrier, with over 500 options to choose from.',
        columns: [
          ['Aeromexico', 'Air Canada', 'Air France', 'Alaska Airlines', 'American Airlines'],
          ['China Eastern Airlines', 'Copa Airlines', 'Emirates', 'Etihad Airways', 'EVA Air'],
          ['Frontier Airlines', 'Hawaiian Airlines', 'LATAM Airlines', 'Lufthansa', 'Air Europa', 'Spirit Airlines', 'Turkish Airlines', 'United Airlines', 'Volaris Airlines'],
        ]
      },
      { label: 'Popular Flight Routes', type: 'submenu',
        heading: 'Book one of our most popular flight routes with three easy clicks.',
        columns: [
          ['Atlanta to Ft Lauderdale', 'Chicago to Las Vegas', 'Ft Lauderdale to New York', 'Los Angeles to Las Vegas'],
          ['New York to Ft Lauderdale', 'New York to London', 'New York to Los Angeles', 'New York to Miami'],
          ['Philadelphia to Orlando', 'San Francisco to Los Angeles'],
        ]
      },
      { label: 'Top U.S. Destinations', type: 'submenu',
        heading: 'Top U.S. Destinations',
        columns: [
          ['New York City', 'Los Angeles', 'Las Vegas', 'Orlando', 'Miami'],
          ['Chicago', 'San Francisco', 'Washington DC', 'Boston', 'Seattle'],
        ]
      },
      { label: 'Top International Destinations', type: 'submenu',
        heading: 'Top International Destinations',
        columns: [
          ['London', 'Paris', 'Rome', 'Bangkok', 'Dubai'],
          ['Toronto', 'Cancun', 'Delhi', 'Tokyo', 'Sydney'],
        ]
      },
      { label: 'Site Directories', type: 'submenu',
        heading: 'Site Directories',
        columns: [
          ['Flights Directory', 'Hotels Directory', 'Cars Directory', 'Vacations Directory'],
        ]
      },
      { label: 'Stay Connected', type: 'submenu',
        heading: 'Stay Connected',
        columns: [
          ['Newsletter', 'Mobile App', 'Social Media'],
        ]
      },
      { label: 'International Sites', type: 'submenu',
        heading: 'International Sites',
        columns: [
          ['India', 'UK', 'Canada', 'Australia'],
        ]
      },
    ]
  },
  {
    label: 'Book',
    type: 'links',
    links: [
      'Cheap Flights',
      'Cheap Hotels',
      'Car Rentals',
      'Vacation Packages',
      'Group Travel',
      'Save & Earn $',
    ]
  },
  {
    label: 'Traveler Tools',
    type: 'links',
    links: [
      'Gift Cards',
      'Check My Booking',
      'Customer Support',
      'Online Check-in',
      'Airline Baggage Fees',
      'Check Flight Status',
      'Travel Blog',
      'Local Guides',
    ]
  },
  {
    label: 'About',
    type: 'links',
    links: [
      'About Us',
      'Press Room',
      'Careers',
      'Affiliate Program',
      'Client Testimonial',
      'Advertise with Us',
      'Newsletter',
    ]
  },
  {
    label: 'Legal',
    type: 'links',
    links: [
      'Privacy Policy',
      'Cookie Policy',
      'Price Match Promise',
      'Terms & Conditions',
      'Taxes & Fees',
      'Our Service Fees',
      'Post-Ticketing Fees',
      'Compassion Exception Policy',
      'Connection Protection',
      'Consumer Health Data Notice',
    ]
  },
];

const socialIcons = [
  { icon: 'fab fa-facebook-f', label: 'Facebook' },
  { icon: 'fab fa-x-twitter', label: 'Twitter' },
  { icon: 'fab fa-instagram', label: 'Instagram' },
  { icon: 'fab fa-tiktok', label: 'TikTok' },
];

const NewFooter = () => {
  // State: [mainMenuIndex, submenuIndex] for Quick Links, otherwise just mainMenuIndex
  const [selected, setSelected] = useState([0, 0]);
  const mainMenu = menuData[selected[0]];

  // Helper: Render right pane for Quick Links submenu
  function renderQuickLinksRight(submenu) {
    return (
      <div className="footer-twopane-right">
        <div className="footer-twopane-title">{submenu.heading}</div>
        <div className={`footer-twopane-columns columns-${submenu.columns.length}`}>
          {submenu.columns.map((col, colIdx) => (
            <ul className="footer-twopane-list" key={colIdx}>
              {col.map((item, idx) => (
                <li key={idx}><a href="#">{item}</a></li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    );
  }

  // Helper: Render right pane for simple links
  function renderLinksRight(section) {
    return (
      <div className="footer-twopane-right">
        <div className="footer-twopane-title">{section.label}</div>
        <ul className="footer-twopane-list single-col">
          {section.links.map((item, idx) => (
            <li key={idx}><a href="#">{item}</a></li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <footer className="footer-main twopane">
      <div className="footer-twopane-content">
        <div className="footer-twopane-left">
          {/* Main menu */}
          {menuData.map((menu, idx) => (
            <div
              key={menu.label}
              className={`footer-twopane-menu-item${selected[0] === idx ? ' active' : ''}`}
              onClick={() => setSelected([idx, 0])}
              tabIndex={0}
              role="button"
              aria-label={menu.label}
            >
              {menu.label}
            </div>
          ))}
          {/* If Quick Links, show submenus */}
          {selected[0] === 0 && (
            <div className="footer-twopane-submenu">
              {mainMenu.items.map((submenu, subIdx) => (
                <div
                  key={submenu.label}
                  className={`footer-twopane-submenu-item${selected[1] === subIdx ? ' active' : ''}`}
                  onClick={e => { e.stopPropagation(); setSelected([0, subIdx]); }}
                  tabIndex={0}
                  role="button"
                  aria-label={submenu.label}
                >
                  {submenu.label}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Right pane */}
        {selected[0] === 0
          ? renderQuickLinksRight(mainMenu.items[selected[1]])
          : renderLinksRight(mainMenu)
        }
      </div>
      {/* <div className="footer-bottom">
        <div className="footer-social">
          <span>Connect with Us</span>
          <div className="footer-social-icons">
            {socialIcons.map((icon, idx) => (
              <a href="#" aria-label={icon.label} key={icon.label}><i className={icon.icon}></i></a>
            ))}
          </div>
        </div>
        <div className="footer-payments">
          <img src="https://www.cheapoair.com/img/footer/payment-logos.png" alt="Payments" />
        </div>
      </div> */}
      <div className="footer-copyright">
        © 2024 SkyPort Destinations | All rights reserved
      </div>
    </footer>
  );
};

export default NewFooter;