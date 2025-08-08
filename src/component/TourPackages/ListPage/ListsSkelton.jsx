import React from "react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ListsSkelton = () => {
    return (
        <div className="DetailPageReuseMain border rounded-lg mb-4 w-full xl:px-0 md:px-0">
            <div className="DetailPageReuseMain2">
                <div className="DetailPageReuseMainInner1">
                    <Skeleton height={300} width={345} />
                </div>
                <div className="DetailPageReuseMain3">
                    <div className="DetailPageReuseMainInner2">
                        <div>
                            <h2 className="DetailPageReuseMainInner2Head">
                                <Skeleton />
                            </h2>
                        </div>
                    </div>
                    <div className="DetailPageReuseMainInner3 order-lg-2 order-1">
                        {/* <p className='text-[12px] text-[#336d85] font-[600] '>{item.day}</p> */}
                        <p className="DetailPageReuseMainInner3Para2">
                            {" "}
                            <Skeleton />
                        </p>
                        <div className="DetailPageReuseMainInner4">
                            <Skeleton />
                        </div>
                    </div>
                    <div className="order-lg-1 order-2">
                        <p className="DetailPageReuseMainInner2para">
                            <Skeleton />
                        </p>
                        <p className="DetailPageReuseMainInner3Para">
                            <Skeleton />
                        </p>
                    </div>
                </div>
                <div className="DetailPageReuseMainInner5">
                    <div className="">
                        <p className="DetailPageReuseMainInner2paratext">
                            <Skeleton />
                        </p>
                        <p className="DetailPageReuseMainInner2para2">
                            <Skeleton />
                        </p>
                        <p className="DetailPageReuseMainInner2para3">
                            <div className="newinhide">
                                {" "}
                                <Skeleton />
                            </div>
                            <span className="DetailPageReuseMainInner2Span">
                                <Skeleton />
                            </span>
                        </p>
                    </div>
                    <div className="DoubleBtn">
                        <button style={{ marginBottom: "10px", border: "none" }}>
                            <Skeleton width={100} height={40} />
                        </button>

                        <div>
                            <button style={{ marginBottom: "10px", border: "none" }}>
                                <Skeleton width={100} height={40} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListsSkelton