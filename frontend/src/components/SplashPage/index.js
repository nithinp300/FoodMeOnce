import React from "react";
import '../App.css';
import Carousel from 'react-bootstrap/Carousel'
//import cornField from "../../images/cornField.jpg";
import welcome_banner from "../../images/welcome_banner.png"; 
import congressSlide from "../../images/congressSlide.jpg"
import librarySlide from '../../images/librarySlide.jpg';
import fightSlide from '../../images/fightSlide.jpg';
import citySlide from '../../images/citySlide.jpg';

import "../App.css"; 

function SplashPage() {
  return (
    <div style={{ margin: '0em 5em 2em 5em' }}>
        <Carousel id="carousel">
          <Carousel.Item>
            <img
              id="slide-img"
              src={welcome_banner}
              alt="First Slide"
              style={{width: "100%"}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <h3 className="slideBanner"> Responsible Representation Matters</h3>
            <img
              id="slide-img"
              src={congressSlide}
              alt="Second Slide"
              style={{width: "100%", height: "35rem"}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <h3 className="slideBanner"> Supportive Legislation Matters</h3>
            <img
              id="slide-img"
              src={librarySlide}
              alt="Third Slide"
              style={{width: "100%", height: "35rem"}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <h3 className="slideBanner"> Everyone Matters</h3>
            <img
              id="slide-img"
              src={citySlide}
              alt="Fourth Slide"
              style={{width: "100%", height: "35rem"}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <h3 className="slideBanner"> Fight For Food Security </h3>
            <img
              id="slide-img"
              src={fightSlide}
              alt="Fifth Slide"
              style={{width: "100%", height: "35rem"}}
            />
          </Carousel.Item>
        </Carousel>
      

    {/* <div>
      <img
        src={welcome_banner}
        className="img-fluid"
        alt="Welcome Page"
        style={{width: "100%"}}
      /> */}
    <div className="splash-page-content">
        <h1 className="header-text">Purpose</h1>
      <p className='para'>Food Me Once is being developed to provide a platform for users to gather information on
the food security of communities across the United States. It combines disparate data
sources about food security across districts/counties, political representation and
legislation to present a well-rounded perspective. It will enable users to understand how
political representation affects health outcomes as well as what actions have been
undertaken to ensure equitable access to healthy food and eradicating food deserts. The
website will generate statistics/visualizations across various dimensions (population,
representation, race, etc.).</p>
    </div>
    </div>
    //</div>
  );
}

export default SplashPage;
