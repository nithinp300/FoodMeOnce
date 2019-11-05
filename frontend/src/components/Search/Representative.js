import React from "react";
import "../Representatives/css/Representative.css";

function Representative(props) {
  if (props.header) {
    return (
      <div className="representative d-flex flex-row font-weight-bold text-center">
        <div className="representative-desc">Name</div>
        <div className="representative-desc">Age</div>
        <div className="representative-desc">Years In Office</div>
        <div className="representative-desc">Party</div>
        <div className="representative-desc">State</div>
          <div className="representative-desc">District</div>
      </div>
    );
  }

  return (
    <div className="representative d-flex flex-row text-center" id="rep_inst">
      <div className="representative-desc">{props.name}</div>
      <div className="representative-desc">{props.age}</div>
      <div className="representative-desc">{props.yearsInOffice}</div>
      <div className="representative-desc">{props.party}</div>
      <div className="representative-desc">{props.state}</div>
        <div className="representative-desc">{props.district}</div>
    </div>
  );
}

export default Representative;
