import React from "react";
import "./css/RepresentativeInstance.css";
import District_img from '../../images/us.png';
import tx_11 from '../../images/tx_11.png';
import va_11 from '../../images/va_11.png';
import ia_2 from '../../images/ia_2.png';

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
    if(monthDiff < 0 || (monthDiff = 0 && todayDate.getDate() < birthDate.getDate()))
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
    getImage = (rep_last_name) => {
        if(rep_last_name === "Conaway"){
           return tx_11;
         }
        if(rep_last_name === "Connolly"){
          return va_11;
        }
        if(rep_last_name === "Loebsack"){
          return ia_2;
        }
        return District_img;
      }
    render(){
    var district = this.state.districts[this.props.match.params.last_name];
    var legislation = this.state.legislations[this.props.match.params.last_name];
    var rep_data = this.state.representative;
    var age = this.getAge(rep_data.date_of_birth)
    var twitter = "https://twitter.com/" + rep_data.twitter_account;
    var facebook = "https://facebook.com/" + rep_data.facebook_account;
    var rep_image = "";
    if (this.state.representative.first_name != null) {
        rep_image = "https://theunitedstates.io/images/congress/original/"+ rep_data.id+".jpg";
    }
    console.log(district)
    return(
        <div
            className="representative-instance d-flex border border-secondary
                justify-content-center flex-column align-items-center">
            <img className="representative-instance-image" src={rep_image} alt="us flag" />
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
                <li className="representative-instance-desc">
                    <span>Legislation by Representative</span>:
                    <br/><a href={`/Legislations/instance/${legislation}`}>{legislation}</a>
                </li>
                <li className="representative-instance-desc">
                    <a href={twitter}>Twitter</a>
                </li>
                <li className="representative-instance-desc">
                    <a href={facebook}>Facebook</a>
                </li>
                <li className="representative-instance-desc">
                    <a href={rep_data.url}> Website </a>
                </li>
            </ul>
            <img className="district-instance-image" src={this.getImage(rep_data.last_name)} alt="us flag" />
        </div>
    );
    }
}

export default RepresentativeInstance;
