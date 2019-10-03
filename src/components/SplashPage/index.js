import React from "react";
//import cornField from "../../images/cornField.jpg";
import welcome_banner from "../../images/welcome_banner.png"; 
import "../App.css"; 

function SplashPage() {
  return (
    <div>
      <img
        src={welcome_banner}
        className="img-fluid"
        alt="Welcome Page"
        style={{width: "100%"}}
      />

      <p className='para'>Food Me Once is a website designed to look into the issue of food security in the United States. Our goal is to see how geographic location, congressional representation, 
        and legislation effect the food security of individuals in this country.</p>
    </div>
  );
}

export default SplashPage;
