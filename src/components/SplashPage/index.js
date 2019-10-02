import React from "react";
import cornField from "../../images/cornField.jpg";

function SplashPage() {
  return (
    <div>
      <img
        src={cornField}
        className="img-fluid"
        alt="Corn Field"
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default SplashPage;
