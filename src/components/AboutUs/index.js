import React from "react";
import './css/Cards.css';
import Chris_img from '../../images/Chris_profile.jpg';
import Gyuwon_img from '../../images/Gyuwon_profile.jpg';
import Shub_img from '../../images/Shub_profile.jpg';
import Brian_img from '../../images/brian_profile.png';
import Nithin_img from '../../images/Nithin_profile.jpg';



class AboutUs extends React.Component{

  constructor(props){
    super(props)
    var Chris = [0,0,0]
    var Gyuwon = [0,0,0]
    var Shubhendra = [0,0,0]
    var Brian = [0,0,0]
    var Nithin = [0,0,0]
    var totalIssues = 0
    var totalCommits = 0
    var closedIssues = 0
    this.state = {
      Chris: Chris,
      Gyuwon: Gyuwon,
      Shubhendra: Shubhendra,
      Brian: Brian,
      Nithin: Nithin,
      totalIssues: totalIssues,
      totalCommits: totalCommits,
      closedIssues: closedIssues
    };

  }

  componentDidMount() {

    this.grabCommits();
    this.grabIssues();

}

async grabIssues(){
  fetch("https://gitlab.com/api/v4/projects/14463226/issues?per_page=1000&page=1")
    .then(res => res.json())
    .then(res => {
      res.forEach(issue => {
        this.state.totalIssues +=1
        if(issue.closed_by != null){
          this.state.closedIssues +=1
          switch (issue.closed_by.name){
            case "Christopher Chasteen":
              this.state.Chris[1] +=1
              break;

            case "Shubhendra Trivedi":
              this.state.Shubhendra[1]+=1
              break;

            case "Gyuwon":
            case "Gyuwon Kim":
                this.state.Gyuwon[1]+=1
                break;
            case "Brian Dyck":
                this.state.Brian[1]+=1
                break;
            case "Nithin Pingili":
              this.state.Nithin[1]+=1
              break;
            default:
              console.log(issue)

          }
        }
      });
      this.setState(this.state)
    })
}

async grabCommits(){
  var curr = 0
  var last = 0
  do{
  fetch("https://gitlab.com/api/v4/projects/14463226/repository/commits?per_page=1000&page=1")
      .then(res => res.json())
      .then(res => {
        res.forEach(commit => {
          this.state.totalCommits += 1
          switch (commit.committer_name){
            case "Christopher Chasteen":
              this.state.Chris[0] +=1
              break;

            case "Shubhendra Trivedi":
              this.state.Shubhendra[0]+=1
              break;
            case "Gyuwon":
            case "Gyuwon Kim":
                this.state.Gyuwon[0]+=1
                break;
            case "Brian Dyck":
                this.state.Brian[0]+=1
                break;
            case "Nithin Pingili":
              this.state.Nithin[0]+=1
              break;
            default:
          }
        });
        this.setState(this.state)
      })
    } while(curr !== last)

}

  render(){

    const {
      Chris,
      Gyuwon,
      Shubhendra,
      Brian,
      Nithin,
      totalIssues,
      totalCommits,
      closedIssues
    } = this.state
    return (
      <div>

        <h1 className="title">About Us page</h1>
        <div className="cardRow">
          <div className="card" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src={Chris_img} className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Christopher Chasteen</h5>
              <p className="card-text">Commits: {Chris[0]}</p>
              <p className="card-text">Issues Closed: {Chris[1]}</p>
              <p className="card-text">Unit Tests: {Chris[2]}</p>
            </div>
          </div>

          <div className="card" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src={Gyuwon_img} className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Gyuwon Kim</h5>
              <p className="card-text">Commits: {Gyuwon[0]}</p>
              <p className="card-text">Issues Closed: {Gyuwon[1]}</p>
              <p className="card-text">Unit Tests: {Gyuwon[2]}</p>
            </div>
          </div>

          <div className="card" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src={Shub_img} className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Shubhendra Trivedi</h5>
              <p className="card-text">Commits: {Shubhendra[0]}</p>
              <p className="card-text">Issues Closed: {Shubhendra[1]}</p>
              <p className="card-text">Unit Tests: {Shubhendra[2]}</p>
            </div>
          </div>
        </div>

        <div className="cardRow">
        <div className="card" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src={Brian_img} className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Brian Dyck</h5>
              <p className="card-text">Commits: {Brian[0]}</p>
              <p className="card-text">Issues Closed: {Brian[1]}</p>
              <p className="card-text">Unit Tests: {Brian[2]}</p>
            </div>
          </div>

          <div className="card" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src={Nithin_img} className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Nithin Pingili</h5>
              <p className="card-text">Commits: {Nithin[0]}</p>
              <p className="card-text">Issues Closed: {Nithin[1]}</p>
              <p className="card-text">Unit Tests: {Nithin[2]}</p>
            </div>
          </div>
        </div>
        <h4 className="footer">Total Commits: {totalCommits} </h4>
        <h4 className="footer">Issues Opened: {totalIssues} </h4>
        <h4 className="footer">Issues Closed: {closedIssues} </h4>

        <div className="contactCard">
          <p> <a href="https://gitlab.com/shub95/foodmeonce/"> FoodMeOnce GitLab Repository</a></p>
        </div>
        <div className="contactCard2">
          <p> <a href="https://documenter.getpostman.com/view/7777503/SVtPXWHE?version=latest"> FoodMeOnce API Documentation</a></p>
        </div>
      </div>
    );
  }
}

export default AboutUs;
