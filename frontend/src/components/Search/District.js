import React from "react";
import "../Districts/css/District.css";

function District(props) {
  if (props.header) {
    return (
      <div className="district d-flex flex-row font-weight-bold text-center">
        <div className="district-desc">District</div>
        <div className="district-desc fill-flex">Population</div>
        <div className="district-desc fill-flex">Average Income</div>
        <div className="district-desc fill-flex">Average Age</div>
        <div className="district-desc fill-flex">Gender Ratio</div>
        <div className="district-desc fill-flex">Representative</div>
      </div>
    );
  }
  const medianIncome =
    props.medianIncome != null
      ? props.medianIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : 0;
  return (
    <div className="district d-flex flex-row text-center" id="dist_inst">
      <div className="district-desc">{props.name}</div>
      <div className="district-desc fill-flex">{props.population}</div>
      <div className="district-desc fill-flex">${medianIncome}</div>
      <div className="district-desc fill-flex">{props.avgAge}</div>
      <div className="district-desc fill-flex">{props.genderRatio}</div>
      <div className="district-desc fill-flex">{props.representative}</div>
    </div>
  );
}

export default District;
