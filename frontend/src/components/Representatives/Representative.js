import React from "react";
import "./css/Representative.css";
import ReactImageFallback from "react-image-fallback";
import republican from "../../images/republicanLogo.png"
import democrat from "../../images/democratLogo.png"
function Representative(props) {
  return (
    <div
      className="card text-white bg-dark mb-3"
      style={{ width: "17rem", marginRight: ".5rem" }}
    >
      <ReactImageFallback 
      src={props.image} 
      fallbackImage={props.party==="Democrat"? democrat : republican} 
      className="card-img-top" 
      style ={{ height: "20rem",  objectFit: "cover"}} 
      alt="Card Background"/>
      
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-title" style={{}}>
          Age: {props.age}
        </p>
        <p className="card-title" style={{}}>
          Years in office: {props.yearsInOffice}
        </p>
        <p className="card-title" style={{}}>
          Party: {props.party}
        </p>
        <p className="card-title" style={{}}>
          State: {props.state}
        </p>
        <p className="card-title" style={{}}>
          District: {props.district}
        </p>
        <p className="card-title" style={{}}>
          Type: {props.type_flag}
        </p>
      </div>
    </div>
  );
}

export default Representative;
