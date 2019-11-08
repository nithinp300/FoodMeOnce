import React from "react";
import Show from "../SearchResult";
import "./css/District.css";

function District(props) {
  const searches = props.search != null ? props.search.split("%20") : null;
  let map_url =
    "https://www.govtrack.us/congress/members/embed/mapframe?state=" +
    props.stateAbbreviation +
    "&district=" +
    props.number;
  return (
    <div
      className="card text-white bg-dark mb-3"
      style={{ width: "17rem", marginRight: ".5rem" }}
      id="dist_inst"
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
          <Show search={searches}>{props.name}</Show>
        </h5>
        <p className="card-title" style={{}}>
          Population:{" "}
          <Show format search={searches}>
            {props.population}
          </Show>
        </p>
        <p className="card-title" style={{}}>
          Median Income:{" "}
          <Show format search={searches}>
            {props.medianIncome}
          </Show>
        </p>
        <p className="card-title" style={{}}>
          Average Age: <Show search={searches}>{props.avgAge}</Show>
        </p>
        <p className="card-title" style={{}}>
          Gender Ratio: <Show search={searches}>{props.genderRatio}</Show>
        </p>
        <p className="card-title" style={{}}>
          Representative: <Show search={searches}>{props.representative}</Show>
        </p>
      </div>
    </div>
  );
}

export default District;
