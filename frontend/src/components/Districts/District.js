import React from "react";
import "./css/District.css";

function District(props) {
  const medianIncome =
    props.medianIncome != null
      ? props.medianIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : 0;

  let map_url =
    "https://www.govtrack.us/congress/members/embed/mapframe?state=" +
    props.stateAbbreviation +
    "&district=" +
    props.number;
  return (
    <div
      className="card text-white bg-dark mb-3"
      style={{ width: "17rem", marginRight: ".5rem" }}
    >
      <iframe
        title="district"
        width="270"
        height="270"
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={map_url}
      ></iframe>
      <div className="card-body">
        <h5 className="card-title" align="center">
          {props.name}
        </h5>
        <p className="card-title" style={{}}>
          Population: {props.population}
        </p>
        <p className="card-title" style={{}}>
          Median Income: {props.medianIncome}
        </p>
        <p className="card-title" style={{}}>
          Average Age: {props.avgAge}
        </p>
        <p className="card-title" style={{}}>
          Gender Ratio: {props.genderRatio}
        </p>
        <p className="card-title" style={{}}>
          Representative: {props.representative}
        </p>
      </div>
    </div>
    // <div className="district d-flex flex-row text-center" id="dist_inst">
    //   <div className="district-desc">{props.name}</div>
    //   <div className="district-desc fill-flex">{props.population}</div>
    //   <div className="district-desc fill-flex">${medianIncome}</div>
    //   <div className="district-desc fill-flex">{props.avgAge}</div>
    //   <div className="district-desc fill-flex">{props.genderRatio}</div>
    //   <div className="district-desc fill-flex">{props.representative}</div>
    // </div>
  );
}

export default District;
