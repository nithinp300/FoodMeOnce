import React from "react";
import "./css/RepresentativeInstance.css";

class RepresentativeInstance extends React.Component{

    constructor(props){
        super(props)
    };

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
    if(sponsor_party == "D") {
        return "Democrat";
    }
    return "Republican";
    }

    render(){
    var rep_data = this.props.location.state
    var age = this.getAge(rep_data.date_of_birth)
    var twitter = "https://twitter.com/" + rep_data.twitter_account;
    var facebook = "https://facebook.com/" + rep_data.facebook_account;
    var rep_image = "https://theunitedstates.io/images/congress/original/"+ rep_data.id+".jpg";
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
                    <span>State/District</span>: {rep_data.state}
                </li>
                <li className="representative-instance-desc">
                    <span>Office</span>: {rep_data.office}
                </li>
                <li className="representative-instance-desc">
                    <span>Phone</span>: {rep_data.phone}
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
        </div>
    );
    }
}

export default RepresentativeInstance;
