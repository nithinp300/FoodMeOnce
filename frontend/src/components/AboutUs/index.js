import React from "react";
import './css/Cards.css';
import Chris_img from '../../images/Chris_profile.jpg';
import Gyuwon_img from '../../images/Gyuwon_profile.jpg';
import Shub_img from '../../images/Shub_profile.jpg';
import Brian_img from '../../images/brian_profile.png';
import Nithin_img from '../../images/Nithin_profile.jpg';
import React_img from '../../images/reactCard.png';
import Bootstrap_img from '../../images/bootstrapCard.jpg';
import Flask_image from '../../images/flaskCard.png';
import Selenium_image from '../../images/seleniumCard.jpg';
import Postgres_image from '../../images/postgresCard.png';
import AWS_image from '../../images/awsCard.png';
import Postman_image from '../../images/postmanCard.png';
import Mocha_image from '../../images/mochaCard.png';
import Alchemy_image from '../../images/SQLAlchemyCard.png';
import Python_image from '../../images/pythonCard.png';
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
          issue.assignees.forEach(assignee => {
            switch (assignee.name){
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
              case "BrianDyck":
              case "Brian Dyck":
                  this.state.Brian[1]+=1
                  break;
              case "Nithin Pingili":
                this.state.Nithin[1]+=1
                break;
              default:
                console.log(issue)
            }
          })
        }
      });
      this.setState(this.state)
    })
}

async grabCommits(){
  var page = 0
  while(page < 4){
  page+=1
  fetch("https://gitlab.com/api/v4/projects/14463226/repository/commits?per_page=100&page=" + page)
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
      })
    }
    this.setState(this.state)
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
        <div className="titleCard">
        <h2 className="descriptionHeader"> What is Food Me Once? </h2>
          <p class="descriptionBody"> 
            Food Me Once is a website designed to look into the issue of food security in the United States. Our goal is to see how geographic location, congressional representation, 
            and legislation effect the food security of individuals in this country.
          </p>
        </div>
        <h2 className="descriptionHeader2"> Who Are We? </h2>
        <div className="cardRow">
          <div className="card text-white bg-dark mb-3" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src={Chris_img} className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Christopher Chasteen</h5>
              <p className="card-title" style = {{fontStyle: "italic"}}>Full Stack Developer</p>
              <p className="card-text">Commits: {Chris[0]}</p>
              <p className="card-text">Issues Closed: {Chris[1]}</p>
              <p className="card-text">Unit Tests: {Chris[2]}</p>
            </div>
          </div>

          <div className="card text-white bg-dark mb-3" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src={Gyuwon_img} className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Gyuwon Kim</h5>
              <p className="card-title" style = {{fontStyle: "italic"}}>Full Stack Developer</p>
              <p className="card-text">Commits: {Gyuwon[0]}</p>
              <p className="card-text">Issues Closed: {Gyuwon[1]}</p>
              <p className="card-text">Unit Tests: {Gyuwon[2]}</p>
            </div>
          </div>

          <div className="card text-white bg-dark mb-3" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src={Shub_img} className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Shubhendra Trivedi</h5>
              <p className="card-title" style = {{fontStyle: "italic"}}>Full Stack Developer</p>
              <p className="card-text">Commits: {Shubhendra[0]}</p>
              <p className="card-text">Issues Closed: {Shubhendra[1]}</p>
              <p className="card-text">Unit Tests: {Shubhendra[2]}</p>
            </div>
          </div>
        </div>

        <div className="cardRow">
        <div className="card text-white bg-dark mb-3" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src={Brian_img} className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Brian Dyck</h5>
              <p className="card-title" style = {{fontStyle: "italic"}}>Full Stack Developer</p>
              <p className="card-text">Commits: {Brian[0]}</p>
              <p className="card-text">Issues Closed: {Brian[1]}</p>
              <p className="card-text">Unit Tests: {Brian[2]}</p>
            </div>
          </div>

          <div className="card text-white bg-dark mb-3" style={{width: "18rem", marginRight: ".5rem"}}>
            <img src={Nithin_img} className="card-img-top" alt="Card Background"/>
            <div className="card-body">
              <h5 className="card-title">Nithin Pingili</h5>
              <p className="card-title" style = {{fontStyle: "italic"}}>Full Stack Developer</p>
              <p className="card-text">Commits: {Nithin[0]}</p>
              <p className="card-text">Issues Closed: {Nithin[1]}</p>
              <p className="card-text">Unit Tests: {Nithin[2]}</p>
            </div>
          </div>
        </div>
        <h4 className="footer">Total Commits: {totalCommits} </h4>
        <h4 className="footer">Issues Opened: {totalIssues} </h4>
        <h4 className="footer">Issues Closed: {closedIssues} </h4>

        <div className="toolsHeader"> 
          <h4> Tools</h4>
        </div>
        <div className="toolsContainer">
          <div className="card text-white bg-dark mb-3" style={{width: "14rem", marginRight: ".5rem"}}>
              <img src={React_img} className="card-img-top" alt="Card Background" style={{height:"250px"}}/>
              <div className="card-body">
                <h3 className="toolName">React</h3>
                <p> Used in front end development for creating dynamic components</p>
              </div>
          </div>
          <div className="card text-white bg-dark mb-3" style={{width: "14rem", marginRight: ".5rem"}}>
              <img src={Bootstrap_img} className="card-img-top" alt="Card Background" style={{height:"250px"}}/>
              <div className="card-body">
                <h3 className="toolName">Bootstrap</h3>
                <p> Utilized various css frameworks for user design</p>
              </div>
          </div>
          <div className="card text-white bg-dark mb-3" style={{width: "14rem", marginRight: ".5rem"}}>
              <img src={Flask_image} className="card-img-top" alt="Card Background" style={{height:"250px"}}/>
              <div className="card-body">
                <h3 className="toolName">Flask</h3>
                <p> Used Flask for Python Frameworks for API's</p>
              </div>
          </div>
        </div>
        <div className="toolsContainer">
          <div className="card text-white bg-dark mb-3" style={{width: "14rem", marginRight: ".5rem"}}>
              <img src={Selenium_image} className="card-img-top" alt="Card Background" style={{height:"250px"}}/>
              <div className="card-body">
                <h3 className="toolName">Selenium</h3>
                <p> Used to test GUI of the website through automation</p>
              </div>
          </div>
          <div className="card text-white bg-dark mb-3" style={{width: "14rem", marginRight: ".5rem"}}>
              <img src={Postgres_image} className="card-img-top" alt="Card Background" style={{height:"250px"}}/>
              <div className="card-body">
                <h3 className="toolName">PostgreSQL</h3>
                <p> Figure somethiong out for postgres</p>
              </div>
          </div>
          <div className="card text-white bg-dark mb-3" style={{width: "14rem", marginRight: ".5rem"}}>
              <img src={AWS_image} className="card-img-top" alt="Card Background" style={{height:"250px"}}/>
              <div className="card-body">
                <h3 className="toolName">AWS</h3>
                <p> Used to host the website for public access</p>
              </div>
          </div>
          <div className="card text-white bg-dark mb-3" style={{width: "14rem", marginRight: ".5rem"}}>
              <img src={Postman_image} className="card-img-top" alt="Card Background" style={{height:"250px"}}/>
              <div className="card-body">
                <h3 className="toolName">POSTMAN</h3>
                <p> Used to help create API to fill through scraping of data sources</p>
              </div>
          </div>
        </div>
        <div className="toolsContainer">
        <div className="card text-white bg-dark mb-3" style={{width: "14rem", marginRight: ".5rem"}}>
              <img src={Mocha_image} className="card-img-top" alt="Card Background" style={{height:"250px"}}/>
              <div className="card-body">
                <h3 className="toolName">Mocha</h3>
                <p> Used to write Unit Tests for front end javascript code</p>
              </div>
          </div>
          <div className="card text-white bg-dark mb-3" style={{width: "14rem", marginRight: ".5rem"}}>
              <img src={Python_image} className="card-img-top" alt="Card Background" style={{height:"250px"}}/>
              <div className="card-body">
                <h3 className="toolName">Python</h3>
                <p> Used to write scripts to scrape data from data sources</p>
              </div>
          </div>
          <div className="card text-white bg-dark mb-3" style={{width: "14rem", marginRight: ".5rem"}}>
              <img src={Alchemy_image} className="card-img-top" alt="Card Background" style={{height:"250px"}}/>
              <div className="card-body">
                <h3 className="toolName">Python</h3>
                <p> Insert SQLAlchemy Tool Desc Here</p>
              </div>
          </div>
        </div>
        <div className="dataSources">
          <h4 style={{paddingBottom: "1rem"}}> Data Sources</h4>
          <h6> API's</h6>
          <p> <a href="https://hudgis-hud.opendata.arcgis.com/datasets/acs-5yr-socioeconomic-estimate-data-by-tract"> Socioeconomic data API</a></p>
          <p> <a href="https://projects.propublica.org/api-docs/congress-api/"> Congressional Data API</a></p>
          <p> <a href="https://www.census.gov/data/developers/guidance/api-user-guide.Query_Components.html"> Census Data API</a></p>
        </div>
        <div className="contactCard">
          <h6> Project Links</h6>
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
