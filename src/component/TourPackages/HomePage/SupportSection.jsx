import React from 'react';
import "./css/SupportSection.css";

const SupportSection = () => {
    return (
        <div className="container supportSection">
            <div className="row">
                <div className="col-lg-10 col-12 mx-auto d-block">
                    <div className="hd_gems mt-60">
                        <div className="contai_1100">
                            <div className="infi-bx">
                                <div className="img-ico">
                                    <img
                                        src="https://images.emtcontent.com/holiday-img/home-img/info-bnr.svg"
                                        alt="holidays"
                                    />
                                </div>
                                <div className="info-ttl">
                                    <div className="lft-p">Hassle Free. 24X7 on-trip assistance</div>
                                    <a href="tel:01143131313">
                                        <span className="icon">
                                            <img
                                                src="https://images.emtcontent.com/holiday-img/home-img/phone-call.svg"
                                                alt="Phone"
                                            />
                                        </span>
                                        +91 92112 52356
                                    </a>
                                    <a href="mailto:holidays@tripgoonline.com">
                                        <span className="icon">
                                            <img
                                                src="https://images.emtcontent.com/holiday-img/home-img/Icon-email.svg"
                                                alt="Email"
                                            />
                                        </span>
                                        holidays@tripgoonline.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SupportSection;
