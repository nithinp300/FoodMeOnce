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
  );
}

export default SplashPage;
