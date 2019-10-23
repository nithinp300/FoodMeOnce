import React from "react";
import '../App.css';
import Carousel from 'react-bootstrap/Carousel'
import cornField from "../../images/cornField.png";
import welcome_banner from "../../images/welcome_banner.png"; 
import congress from "../../images/congress.png"; 
import healthy_food from "../../images/healthy_food.png"; 
import unhealthy_food from "../../images/unhealthy_food.png"; 
import congressSlide from "../../images/congressSlide.jpg"
import librarySlide from '../../images/librarySlide.jpg';
import fightSlide2 from '../../images/fightSlide2.png';
import citySlide from '../../images/citySlide.jpg';
import "../App.css";
import './css/splash.css';


function SplashPage() {
  return (
    <div style={{ margin: '1.25em 5em 2em 5em' }}>
        <Carousel id="carousel">
          <Carousel.Item>
            <h3 className="slideBanner" > Welcome to Food Me Once </h3>
            <img
              id="slide-img"
              src={cornField}
              alt="First Slide"
              style={{width: "100%"}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <h3 className="slideBanner"> Healthy Food Matters</h3>
            <img
              id="slide-img"

              src={healthy_food}
              alt="Second Slide"
              style={{width: "100%"}}
              // src={citySlide}
              // alt="Fourth Slide"
              // style={{width: "100%", height: "35rem"}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <h3 className="slideBanner"> Nutrition Matters</h3>
            <img
              id="slide-img"

              src={unhealthy_food}
              alt="Third Slide"
              style={{width: "100%"}}
              // src={congressSlide}
              // alt="Second Slide"
              // style={{width: "100%", height: "35rem"}}
            />
          </Carousel.Item>
          <Carousel.Item>
            <h3 className="slideBanner"> Responsible Representation Matters</h3>
            <img
              id="slide-img"
              src={congress}
              alt="Fourth Slide"
              style={{width: "100%"}}
//             />
//           </Carousel.Item>
              // src={librarySlide}
              // alt="Third Slide"
              // style={{width: "100%", height: "35rem"}}
            />
          </Carousel.Item>
          
          <Carousel.Item>
            <h3 className="slideBanner"> Fight For Food Security </h3>
            <img
              id="slide-img"
              src={fightSlide2}
              alt="Fifth Slide"
              style={{width: "100%"}}
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
        <h1 className="header-text">What are we?</h1>
      <p className='para'>Food Me Once is a website designed to look into the issue of food security in the United States. Our goal is to see how geographic location, congressional representation,
            and legislation affects the food security of individuals in this country.</p>
    </div>
    </div>
    //</div>
  );
}

export default SplashPage;
