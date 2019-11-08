import React from "react";

function State(props) {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];
  const options = states.map((state, i) => {
    return (
      <option key={i} value={state}>
        {state}
      </option>
    );
  });
  return (
    <div className="input-group input-group-sm">
      <div className="input-group-prepend">
        <span className="input-group-text" id="">
          State
        </span>
      </div>
      <select
        className="custom-select"
        name="state"
        onChange={props.handleFilter}
      >
        <option>Select a state</option>
        {options}
      </select>
    </div>
  );
}

export default State;
