import React from "react";
import "./css/RepresentativeInstance.css";

class RepresentativeInstance extends React.Component {
  state = {
    representative: {},
    district: {},
    legislations: []
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch("https://api.foodmeonce.me/Representatives/" + id)
      .then(res => res.json())
      .then(data => {
        this.setState({
          representative: data.member[0],
          district: data.fromDistrict[0],
          legislations: data.passedLegislation
        });
      })
      .catch(console.log);
  }

  getAge = birthDateString => {
    var todayDate = new Date();
    var birthDate = new Date(birthDateString);
    var age = todayDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = todayDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && todayDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  getParty = sponsor_party => {
    if (sponsor_party === "D") {
      return "Democrat";
    }
    return "Republican";
  };

  render() {
    var district = this.state.district;
    var legislations = this.state.legislations.map((legislation, i) => {
      return (
        <a id="legID" key={i} href={`/Legislations/instance/${legislation.id}`}>
          <p className="m-0">{legislation.short_title}</p>
        </a>
      );
    });
    if (legislations.length === 0) {
      legislations[0] = (
        <p>
          This districts representation has not passed any food security related
          legislation.
        </p>
      );
    }
    var rep_data = this.state.representative;
    var age = this.getAge(rep_data.date_of_birth);
    var twitter = "https://twitter.com/" + rep_data.twitter_account;
    var facebook = "https://facebook.com/" + rep_data.facebook_account;
    var map_url =
      "https://www.govtrack.us/congress/members/embed/mapframe?state=" +
      district.state_abbreviation +
      "&district=" +
      district.congressional_district;
    var rep_image = "";
    if (this.state.representative.first_name != null) {
      rep_image =
        "https://theunitedstates.io/images/congress/original/" +
        rep_data.id +
        ".jpg";
    }
    return (
      <div
        className="representative-instance d-flex p-2 border border-secondary
                justify-content-center flex-column align-items-center"
      >
        <img
          className="representative-instance-image"
          src={rep_image}
          alt={rep_data.first_name}
        />
        <p className="representative-instance-name">{rep_data.full_name}</p>
        <ul>
          <li className="representative-instance-desc">
            <span>Age</span>: {age}
          </li>
          <li className="representative-instance-desc">
            <span>Years In Office</span>: {rep_data.seniority}
          </li>
          <li className="representative-instance-desc">
            <span>Party</span>: {this.getParty(rep_data.party)}
          </li>
          <li className="representative-instance-desc">
            <span>State/District</span>:{" "}
            <a href={`/Districts/instance/${district.id}`}>
              {rep_data.state} {rep_data.district}
            </a>
          </li>
          <li className="representative-instance-desc">
            <span>Office</span>: {rep_data.office}
          </li>
          <li className="representative-instance-desc">
            <span>Phone</span>: {rep_data.phone}
          </li>
          <li className="representative-instance-list">
            <span>Legislation by Representative</span>:
            <br />
            {legislations}
          </li>
          <li className="representative-instance-list">
            <span>Social Media</span>:
            <br />
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              Twitter{" "}
            </a>
            <a href={facebook} target="_blank" rel="noopener noreferrer">
              Facebook{" "}
            </a>
            <a href={rep_data.url} target="_blank" rel="noopener noreferrer">
              {" "}
              .gov site{" "}
            </a>
          </li>
        </ul>
        <div className="district-map">
          <iframe
            title="district"
            width="425"
            height="300"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src={map_url}
          ></iframe>
        </div>
      </div>
    );
  }
}

export default RepresentativeInstance;
