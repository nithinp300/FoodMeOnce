import React from "react";
//import cornField from "../../images/cornField.jpg";
import welcome_banner from "../../images/welcome_banner.png"; 

function SplashPage() {
  return (
    <div>
      <img
        src={welcome_banner}
        className="img-fluid"
        alt="Welcome Page"
        style={{width: "100%"}}
      />
    </div>
  );
}

export default SplashPage;
