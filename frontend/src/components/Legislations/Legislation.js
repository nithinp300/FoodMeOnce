import React from "react";
import Show from "../SearchResult";
import "./css/Legislation.css";

function Legislation(props) {
  const searches = props.search != null ? props.search.split("%20") : null;
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
    <div className="legislation d-flex flex-row text-center" id="leg_inst">
      <div className="legislation-desc">
        <Show search={searches}>{props.name}</Show>
      </div>
      <div className="legislation-desc">
        <Show search={searches}>{props.year}</Show>
      </div>
      <div className="legislation-desc">
        <Show search={searches}>{props.status}</Show>
      </div>
      <div className="legislation-desc">
        <Show search={searches}>{props.enacted_Year}</Show>
      </div>
      <div className="legislation-desc">
        <Show search={searches}>{props.houseOfRepresentative}</Show>
      </div>
      <div className="legislation-desc">
        <Show search={searches}>{props.billType}</Show>
      </div>
      <div className="legislation-desc">
        <Show search={searches}>{props.sponsors}</Show>
      </div>
    </div>
  );
}

export default Legislation;
