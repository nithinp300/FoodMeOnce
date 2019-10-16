import React from "react";
import "./css/RepresentativeInstance.css";

class RepresentativeInstance extends React.Component{
    state = {
        representative: {},
        districts: {
            Conaway: "Texas 11th Congressional District",
            Loebsack: "Iowa 2nd Congressional District",
            Connolly: "Virginia 11th Congressional District"
        },
        legislations: {
            Conaway: "Agriculture Improvement Act of 2018",
            Loebsack: "Agriculture Reform, Food, and Jobs Act of 2013",
            Connolly: "Global Partnerships Act of 2013",
        }
    };

    componentDidMount() {
        fetch("https://api.propublica.org/congress/v1/116/house/members.json", {
          method: "GET",
          headers: {
            "X-API-Key": "eqgLGZRNuOktoYkIpRdonPmtq4zIKokpsvT0EpN6"
          }
        })
        .then(response => response.json())
        .then(data => {
            const representatives = data.results[0].members;
            for (let i = 0; i < representatives.length; ++i) {
                const representative = representatives[i];
                if (representative.first_name === this.props.match.params.first_name
                    && representative.last_name === this.props.match.params.last_name) {
                    this.setState({ representative });
                }
            }
        })
        .catch(console.log);
    }
    getAge = (birthDateString) => {
    var todayDate = new Date();
    var birthDate = new Date(birthDateString);
    var age = todayDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = todayDate.getMonth() - birthDate.getMonth();
    if(monthDiff < 0 || (monthDiff == 0 && todayDate.getDate() < birthDate.getDate()))
    {
      age--;
    }
    return age;
  }
    getParty = (sponsor_party) => {
    if(sponsor_party === "D") {
        return "Democrat";
    }
    return "Republican";
    }

    render(){
    var district = this.state.districts[this.props.match.params.last_name];
    var legislation = this.state.legislations[this.props.match.params.last_name];
    var rep_data = this.state.representative;
    var age = this.getAge(rep_data.date_of_birth)
    var twitter = "https://twitter.com/" + rep_data.twitter_account;
    var facebook = "https://facebook.com/" + rep_data.facebook_account;
    var map_url = "https://www.govtrack.us/congress/members/embed/mapframe?state="+rep_data.state+"&district="+rep_data.district;
    var rep_image = "";
    if (this.state.representative.first_name != null) {
        rep_image = "https://theunitedstates.io/images/congress/original/"+ rep_data.id+".jpg";
    }
    return(
        <div
            className="representative-instance d-flex p-2 border border-secondary
                justify-content-center flex-column align-items-center">
            <img className="representative-instance-image" src={rep_image} alt={rep_data.first_name} />
            <p className="representative-instance-name">{rep_data.first_name} {rep_data.last_name}</p>
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
                    <span>State/District</span>: <a href={`/Districts/instance/${district}`}>{rep_data.state} {rep_data.district}</a>
                </li>
                <li className="representative-instance-desc">
                    <span>Office</span>: {rep_data.office}
                </li>
                <li className="representative-instance-desc">
                    <span>Phone</span>: {rep_data.phone}
                </li>
                <li className="representative-instance-list">
                    <span>Legislation by Representative</span>:
                    <br/><a href={`/Legislations/instance/${legislation}`}>{legislation}</a>
                </li>
                <li className="representative-instance-list">
                    <span>Social Media</span>:
                    <br/><a href={twitter} target="_blank">Twitter   </a><a href={facebook} target="_blank">Facebook   </a><a href={rep_data.url} target="_blank"> .gov site </a>
                </li>
            </ul>
            <div className="district-map">
                <iframe width="425" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src={map_url}></iframe>
            </div>
        </div>
    );
    }
}

export default RepresentativeInstance;
