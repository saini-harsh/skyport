import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import QuotePopup from "./QuotePopup";
import ListsSkelton from "./ListsSkelton";

const SingleList = ({ data,isModifySearch  }) => {
  // const { pack } = useParams();
  // console.log("destname",data);

  const navigate = useNavigate();
  // const handleSearch = () => {
  //   navigate("/tour/detailpageslist");
  // };
  // const [show, setShow] = useState(false);
  // const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);

  const [show, setShow] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const handleShow = (id) => {
    setSelectedPackageId(id);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedPackageId(null);
  };


console.log("dataxxxxxxxxx",data);
  return (
    <div>
      {data.length !== 0 ? (
        <>
          {data.map((item) => (
            <>
              <div
                className="DetailPageReuseMain border rounded-lg mb-4 w-full xl:px-0 md:px-0"
                key={item.id}
              >
                <div className="DetailPageReuseMain2">
                  <div className="DetailPageReuseMainInner1">
                    <img
                      src={item.image}
                      alt=""
                    // className="rounded-md h-[225px] w-[400px] object-cover"
                    />
                  </div>
                  <div className="DetailPageReuseMain3">
                    <div className="DetailPageReuseMainInner2">
                      <div>
                        <h2 className="DetailPageReuseMainInner2Head">{item.name}</h2>
                      </div>

                    </div>
                    <div className="DetailPageReuseMainInner3 order-lg-2 order-1">
                      {/* <p className='text-[12px] text-[#336d85] font-[600] '>{item.day}</p> */}
                      <p className="DetailPageReuseMainInner3Para2">Top Inclusion</p>
                      <div className="DetailPageReuseMainInner4">
                        {item.top_inclusion.map((dat) => (
                          <img
                            src={dat.image}
                            alt=""
                          // className="w-[25px] h-[20px]"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="order-lg-1 order-2">
                      <p className="DetailPageReuseMainInner2para">
                        {item.no_of_nights} Nights / {item.no_of_days} Days
                      </p>
                      <p className="DetailPageReuseMainInner3Para">
                        {item.details_day_night}
                      </p>
                    </div>
                  </div>
                  <div className="DetailPageReuseMainInner5">
                    <div className="">
                      <p className="DetailPageReuseMainInner2paratext">
                        Starting for
                      </p>
                      <p className="DetailPageReuseMainInner2para2">
                        ₹{item.publish_price}
                      </p>
                      <p className="DetailPageReuseMainInner2para3">
                        <div className="newinhide">Offer Prize :</div>
                        <span className="DetailPageReuseMainInner2Span">
                          ₹{item.offer_price}
                        </span>
                      </p>
                    </div>
                    <div className="DoubleBtn">
                      <button className="DetailPageReuseMainInner5Btn1"
                        onClick={() => handleShow(item.id)}
                      >
                        Get Quotes
                      </button>
                      {/* <Link to="/destinations/family/appealing-swiss"> */}
                      {/* <Link to={`/tour/${pack}/${item.slug.replace(/\s+/g, "-").toLowerCase()}`}> */}
                      <Link to={`${item.slug}`}>
                        <button
                          className="DetailPageReuseMainInner5Btn2"
                        // onClick={handleSearch}
                        >
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </>
      ) : isModifySearch ? (
        <div className="no-data-message text-center py-4 text-muted">
          No Packages For this Departure City with this Location.
        </div>
      ): (
        <>
          <ListsSkelton />
          <ListsSkelton />
          <ListsSkelton />
          <ListsSkelton />
        </>
      )}
      <QuotePopup show={show} handleClose={handleClose} packageId={selectedPackageId} />
    </div>
  );
};

export default SingleList;