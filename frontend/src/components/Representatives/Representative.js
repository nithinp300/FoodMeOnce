import React from "react";
import Show from "../SearchResult";
import "./css/Representative.css";
import ReactImageFallback from "react-image-fallback";
import republican from "../../images/republicanLogo.png";
import democrat from "../../images/democratLogo.png";
function Representative(props) {
  const searches = props.search != null ? props.search.split("%20") : null;
  return (
    <div
      className="card text-white bg-dark mb-3"
      style={{ width: "17rem", marginRight: ".5rem" }}
      id="rep_inst"
    >
      <ReactImageFallback
        src={props.image}
        fallbackImage={props.party === "Democrat" ? democrat : republican}
        className="card-img-top"
        style={{ height: "20rem", objectFit: "cover" }}
        alt="Card Background"
      />

      <div className="card-body">
        <h5 className="card-title">
          <Show search={searches}>{props.name}</Show>
        </h5>
        <p className="card-title" style={{}}>
          Age: <Show search={searches}>{props.age}</Show>
        </p>
        <p className="card-title" style={{}}>
          Years in office: <Show search={searches}>{props.yearsInOffice}</Show>
        </p>
        <p className="card-title" style={{}}>
          Party: <Show search={searches}>{props.party}</Show>
        </p>
        <p className="card-title" style={{}}>
          State: <Show search={searches}>{props.state}</Show>
        </p>
        <p className="card-title" style={{}}>
          District: <Show search={searches}>{props.district}</Show>
        </p>
        <p className="card-title" style={{}}>
          Type: <Show search={searches}>{props.type_flag}</Show>
        </p>
      </div>
    </div>
  );
}

export default Representative;
