import React from "react";
import "./css/Legislation.css";
import us_hor from "../../images/us_hor.png";
import us_sen from "../../images/us_sen.png";

function getImage(billType) {
  if (billType === "House of Representatives") {
    return us_hor;
  }
  return us_sen;
}

function Legislation(props) {
  if (props.header) {
    return (
      <div className="legislation d-flex flex-row font-weight-bold text-center">
        <div className="legislation-desc">Name</div>
        <div className="legislation-desc">Introduced</div>
        <div className="legislation-desc">Status</div>
        <div className="legislation-desc">Enacted</div>
        <div className="legislation-desc">Party</div>
        <div className="legislation-desc">Bill Type</div>
        <div className="legislation-desc">Sponsor/s</div>
      </div>
    );
  }

  return (
    <div className="legislation d-flex flex-row text-center">
      <div className="legislation-desc">{props.name}</div>
      <div className="legislation-desc">{props.year}</div>
      <div className="legislation-desc">{props.status}</div>
      <div className="legislation-desc">{props.enacted_Year}</div>
      <div className="legislation-desc">{props.houseOfRepresentative}</div>
      <div className="legislation-desc">{props.billType}</div>
      <div className="legislation-desc">{props.sponsors}</div>
    </div>
  );
}

export default Legislation;