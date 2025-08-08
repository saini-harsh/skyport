import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { RxCross2 } from 'react-icons/rx';
import './HotelImagesGallery.css'

const HotelGallery = ({setShowGallery, showGallary}) => {

  
    const handleCloseGallery = () => {
     setShowGallery(false);
   };

  return (

    <>
    {showGallary && (

    <Container>  
        <div className="HotelImagesGallery-Main" > 
          <div className="HotelImagesGallery-Container">
            <div>See All Images</div>
            <div onClick={handleCloseGallery} style={{ cursor: 'pointer' }}>
              <RxCross2 />
            </div>
          </div>
          <Row>
            <Col className="HotelImagesGallery-Col">
              <img src="/Images/Images/hotel-bg.jpg" alt="" className="HotelImageGallery-CarouselContainer" />
              <img src="/Images/Images/hotel-bg1.jpg" alt="" className="HotelImageGallery-CarouselContainer" />
              <img src="/Images/Images/hotel-bg2.jpg" alt="" className="HotelImageGallery-CarouselContainer" />
              <img src="/Images/Images/hotel-bg3.jpg" alt="" className="HotelImageGallery-CarouselContainer" />
              <img src="/Images/Images/hotel-bg.jpg" alt="" className="HotelImageGallery-CarouselContainer" />
              <img src="/Images/Images/hotel-bg1.jpg" alt="" className="HotelImageGallery-CarouselContainer" />
              <img src="/Images/Images/hotel-bg2.jpg" alt="" className="HotelImageGallery-CarouselContainer" />
              <img src="/Images/Images/hotel-bg3.jpg" alt="" className="HotelImageGallery-CarouselContainer" />
            </Col>
          </Row>
        </div>
    </Container>
    )}
    </>
  );
};

export default HotelGallery;
