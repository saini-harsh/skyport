import React, { useState, useEffect } from "react";
import "./css/AddSection.css";

const slides = [
    
    {
        href: "#",
        deskImg: "./Images/tour/add-japan.jpg",
        mobImg: "./Images/tour/add-japan.jpg",
    },
    {
        href: "#",
        deskImg: "https://images.emtcontent.com/holiday-img/home-img/kenya-holbnr.webp",
        mobImg: "https://images.emtcontent.com/holiday-img/home-img/kenya-holmobbnr.webp",
    },
    {
        href: "#",
        deskImg: "https://images.emtcontent.com/holiday-img/home-img/mp-tours-packages.webp",
        mobImg: "https://images.emtcontent.com/holiday-img/home-img/mob-mp-tours-packages.webp",
    },
    {
        href: "#",
        deskImg: "https://images.emtcontent.com/holiday-img/home-img/abudhabi-banner-desk.webp",
        mobImg: "https://images.emtcontent.com/holiday-img/home-img/abudhabi-banner-mob.webp",
    },
];

const AddSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto Slide every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (direction) => {
        setCurrentIndex((prevIndex) => {
            if (direction === -1) {
                return (prevIndex - 1 + slides.length) % slides.length;
            }
            return (prevIndex + 1) % slides.length;
        });
    };

    return (
        <div className="container addSection">
            <div className="row">
                <div className="col-lg-10 mx-auto d-block">
                    <div className="clearfix mnblock mt-60" style={{ position: "relative" }}>
                        {slides.map((slide, index) => (
                            <a
                                key={index}
                                className="mySlides"
                                href={slide.href}
                                style={{ display: index === currentIndex ? "block" : "none" }}
                            >
                                <img
                                    src={slide.mobImg}
                                    alt="offer"
                                    className="mobvw"
                                    style={{ borderRadius: "15px", maxWidth: "100%" }}
                                />
                                <img
                                    src={slide.deskImg}
                                    alt="offer"
                                    className="deskvw"
                                    style={{ borderRadius: "15px", maxWidth: "100%" }}
                                />
                            </a>
                        ))}

                        {/* Navigation arrows */}
                        <a className="lftbtn" onClick={() => goToSlide(-1)} role="button" style={navBtnStyle}>
                            ❮
                        </a>
                        <a className="rgtbtn" onClick={() => goToSlide(1)} role="button" style={navBtnStyle}>
                            ❯
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

const navBtnStyle = {
    cursor: "pointer",
    fontSize: "24px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    padding: "10px",
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: "50%",
    zIndex: 10,
};

export default AddSection;
