import React from "react";
import "./css/RepresentativeInstance.css";
import {Timeline} from 'react-twitter-widgets'
import {FacebookProvider,Page} from 'react-facebook';
import ReactImageFallback from "react-image-fallback";
import republican from "../../images/republicanLogo.png"
import democrat from "../../images/democratLogo.png"

class RepresentativeInstance extends React.Component {
  state = {
    representative: {},
    district: {},
    legislations: [],
    showTwitter: true,
    showFacebook: false,
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
    return sponsor_party;
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
          This representative has not sponsored any food security related
          legislation.
        </p>
      );
    }
    var rep_data = this.state.representative;
    var age = this.getAge(rep_data.date_of_birth);
    var twitter = "https://twitter.com/" + rep_data.twitter_account;
    var twitterUser = "" + rep_data.twitter_account
    var fbUser = rep_data.facebook_account
    var facebook = "https://facebook.com/" + rep_data.facebook_account;
    var map_url =
    "https://www.govtrack.us/congress/members/embed/mapframe?state=" +
    district.state_abbreviation + "&district=" +
    district.congressional_district;
    var rep_image = "";
    if (this.state.representative.first_name != null) {
      rep_image =
        "https://theunitedstates.io/images/congress/original/" +
        rep_data.id +
        ".jpg";
    var state_district = "";
    var rep_dis_url = "";
    if (this.state.representative.district == null) {
      state_district = rep_data.state;
      rep_dis_url = "/Districts/filter?state=" + state_district ;
    }
    else {
      state_district = rep_data.state + ' ' + rep_data.district;
      rep_dis_url = "/Districts/instance/" + district.id;
      }
    }
    return (
      <div className="page-container">
      <div
        className="representative-instance d-flex p-2 border border-secondary
                justify-content-center flex-column align-items-center"
      >
        <ReactImageFallback
          className="representative-instance-image"
          src={rep_image}
          fallbackImage={rep_data.party==="D"? democrat : republican}
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
            <a href={rep_dis_url}>
              {state_district}
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
            <a href={rep_data.url} target="_blank" rel="noopener noreferrer">
              {" "}
              Government site{" "}
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
      {this.state.showTwitter?
        <div className="feed-container">
          <div className="single-feed">
        <FacebookProvider appId="908709349494568">
           <Page href={"https://www.facebook.com/" + fbUser}  tabs="timeline" width="425" />
         </FacebookProvider>
         </div>
        <div className="single-feed">
        <Timeline dataSource={{sourceType:"profile", screenName:twitterUser}}
                      options={{username:{twitterUser}, height:"500", width:"425"}}/>
        </div>

        </div>
        : null}
        </div>
    );
  }
}

export default RepresentativeInstance;
