import React from "react";
import "./css/Cards.css";
import Chris_img from "../../images/Chris_profile.jpg";
import Gyuwon_img from "../../images/Gyuwon_profile.jpg";
import Shub_img from "../../images/Shub_profile.jpg";
import Brian_img from "../../images/brian_profile.png";
import Nithin_img from "../../images/Nithin_profile.jpg";
import React_img from "../../images/reactCard.png";
import Bootstrap_img from "../../images/bootstrapCard.jpg";
import Flask_image from "../../images/flaskCard.png";
import Selenium_image from "../../images/seleniumCard.jpg";
import Postgres_image from "../../images/postgresCard.png";
import AWS_image from "../../images/awsCard.png";
import Postman_image from "../../images/postmanCard.png";
import Mocha_image from "../../images/mochaCard.png";
import Alchemy_image from "../../images/SQLAlchemyCard.png";
import Python_image from "../../images/pythonCard.png";
class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    var Chris = [0, 0, 20];
    var Gyuwon = [0, 0, 30];
    var Shubhendra = [0, 0, 6];
    var Brian = [0, 0, 0];
    var Nithin = [0, 0, 24];
    var totalIssues = 0;
    var totalCommits = 0;
    var closedIssues = 0;
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

  async grabIssues() {
    fetch(
      "https://gitlab.com/api/v4/projects/14463226/issues?per_page=1000&page=1"
    )
      .then(res => res.json())
      .then(res => {
        res.forEach(issue => {
          this.state.totalIssues += 1;
          if (issue.closed_by != null) {
            this.state.closedIssues += 1;
            issue.assignees.forEach(assignee => {
              switch (assignee.name) {
                case "Christopher Chasteen":
                  this.state.Chris[1] += 1;
                  break;

                case "Shubhendra Trivedi":
                  this.state.Shubhendra[1] += 1;
                  break;

                case "Gyuwon":
                case "Gyuwon Kim":
                  this.state.Gyuwon[1] += 1;
                  break;
                case "BrianDyck":
                case "Brian Dyck":
                  this.state.Brian[1] += 1;
                  break;
                case "Nithin Pingili":
                  this.state.Nithin[1] += 1;
                  break;
                default:
                  console.log(issue);
              }
            });
          }
        });
        this.setState(this.state);
      });
  }

  async grabCommits() {
    var page = 0;
    while (page < 5) {
      page += 1;
      fetch(
        "https://gitlab.com/api/v4/projects/14463226/repository/commits?per_page=100&page=" +
          page
      )
        .then(res => res.json())
        .then(res => {
          res.forEach(commit => {
            this.state.totalCommits += 1;
            switch (commit.committer_name) {
              case "Christopher Chasteen":
                this.state.Chris[0] += 1;
                break;

              case "Shubhendra Trivedi":
                this.state.Shubhendra[0] += 1;
                break;
              case "Gyuwon":
              case "Gyuwon Kim":
                this.state.Gyuwon[0] += 1;
                break;
              case "Brian Dyck":
                this.state.Brian[0] += 1;
                break;
              case "Nithin Pingili":
                this.state.Nithin[0] += 1;
                break;
              default:
            }
          });
        });
    }
    this.setState(this.state);
  }

  render() {
    const {
      Chris,
      Gyuwon,
      Shubhendra,
      Brian,
      Nithin,
      totalIssues,
      totalCommits,
      closedIssues
    } = this.state;
    return (
      <div>
        <div className="titleCard">
          <h2 className="descriptionHeader"> What are we? </h2>
          <h6 align="center" className="descriptionBody">
            Food Me Once is a website designed to look into the issue of food
            security in the United States. Our goal is to see how geographic
            location, congressional representation, and legislation affects the
            food security of individuals in this country.{" "}
          </h6>
        </div>
        <h2 className="descriptionHeader2"> Who Are We? </h2>
        <div className="cardRow">
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "17rem", marginRight: ".5rem" }}
          >
            <img
              src={Chris_img}
              className="card-img-top"
              alt="Card Background"
            />
            <div className="card-body">
              <h5 className="card-title">Christopher Chasteen</h5>
              <p className="card-title" style={{}}>
                Role: Full Stack Developer
              </p>
              <p className="card-text" style={{ fontStyle: "italic" }}>
                {" "}
                Enjoys hot tea, cold tea, and occasionally IT
              </p>
            </div>
            <footer className="card-footer border-white ">
              <p className="card-text">Commits: {Chris[0]}</p>
              <p className="card-text">Issues Closed: {Chris[1]}</p>
              <p className="card-text">Unit Tests: {Chris[2]}</p>
            </footer>
          </div>

          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "17rem", marginRight: ".5rem" }}
          >
            <img
              src={Gyuwon_img}
              className="card-img-top"
              alt="Card Background"
            />
            <div className="card-body">
              <h5 className="card-title">Gyuwon Kim</h5>
              <p className="card-title" style={{}}>
                Role: Full Stack Developer
              </p>
              <p className="card-text" style={{ fontStyle: "italic" }}>
                Enjoys coffee, ramen, and occasionally IT
              </p>
            </div>
            <footer className="card-footer border-white ">
              <p className="card-text">Commits: {Gyuwon[0]}</p>
              <p className="card-text">Issues Closed: {Gyuwon[1]}</p>
              <p className="card-text">Unit Tests: {Gyuwon[2]}</p>
            </footer>
          </div>

          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "17rem", marginRight: ".5rem" }}
          >
            <img
              src={Shub_img}
              className="card-img-top"
              alt="Card Background"
            />
            <div className="card-body">
              <h5 className="card-title">Shubhendra Trivedi</h5>
              <p className="card-title" style={{}}>
                Role: Full Stack Developer
              </p>
              <p className="card-text" style={{ fontStyle: "italic" }}>
                Enjoys hot coffee, cold coffee, and occasionally works in IT
              </p>
            </div>
            <footer className="card-footer border-white ">
              <p className="card-text">Commits: {Shubhendra[0]}</p>
              <p className="card-text">Issues Closed: {Shubhendra[1]}</p>
              <p className="card-text">Unit Tests: {Shubhendra[2]}</p>
            </footer>
          </div>
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "17rem", marginRight: ".5rem" }}
          >
            <img
              src={Brian_img}
              className="card-img-top"
              alt="Card Background"
            />
            <div className="card-body">
              <h5 className="card-title">Brian Dyck</h5>
              <p className="card-title" style={{}}>
                Role: Full Stack Developer
              </p>
              <p className="card-text" style={{ fontStyle: "italic" }}>
                Enjoys tacos, ramen, and occasionally IT
              </p>
            </div>
            <footer className="card-footer border-white ">
              <p className="card-text">Commits: {Brian[0]}</p>
              <p className="card-text">Issues Closed: {Brian[1]}</p>
              <p className="card-text">Unit Tests: {Brian[2]}</p>
            </footer>
          </div>

          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "17rem", marginRight: ".5rem" }}
          >
            <img
              src={Nithin_img}
              className="card-img-top"
              alt="Card Background"
            />
            <div className="card-body">
              <h5 className="card-title">Nithin Pingili</h5>
              <p className="card-title" style={{}}>
                Role: Full Stack Developer
              </p>
              <p className="card-text" style={{ fontStyle: "italic" }}>
                Enjoys shawarma, donburi and occasionally IT
              </p>
            </div>
            <footer className="card-footer border-white ">
              <p className="card-text">Commits: {Nithin[0]}</p>
              <p className="card-text">Issues Closed: {Nithin[1]}</p>
              <p className="card-text">Unit Tests: {Nithin[2]}</p>
            </footer>
          </div>
        </div>
        <div>
          <h4 className="footer">
            Total Commits: {totalCommits} | Issues Opened: {totalIssues} |
            Issues Closed: {closedIssues}{" "}
          </h4>
          <h4 className="footer"> </h4>
          <h4 className="footer"></h4>
        </div>
        <div className="titleCard">
          <h2 className="descriptionHeader3">Who are you? </h2>
          <h6 align="center" className="descriptionBody2">
            We welcome one and all. Our goal is simply to spread awareness on
            this critical issue and provide the tools necessary to understand
            the how and why. We hope this platform also helps those in regions
            of low food security, and provides them insight in to why. We
            encourage all to push their representatives to fight for good food
            legislation, and the health and nutrition of all.
          </h6>
        </div>
        <div className="titleCard">
          <h2 className="descriptionHeader3">Mission </h2>
          <h6 align="center" className="descriptionBody2">
            Food Me Once is being developed to provide a platform for users to
            gather information on the food security of communities across the
            United States. It combines disparate data sources about food
            security across districts/counties, political representation and
            legislation to present a well-rounded perspective. It will enable
            users to understand how political representation affects health
            outcomes as well as what actions have been undertaken to ensure
            equitable access to healthy food and eradicating food deserts. The
            website will generate statistics/visualizations across various
            dimensions (population, representation, race, etc.).
          </h6>
        </div>
        <div className="toolsHeader">
          <h2 className="descriptionHeader"> Toolstack </h2>
        </div>
        <div className="toolsContainer">
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "14rem", marginRight: ".5rem" }}
          >
            <img
              src={React_img}
              className="card-img-top"
              alt="Card Background"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h3 className="toolName">React</h3>
              <p align="center">
                {" "}
                Used in front end development for creating dynamic components
              </p>
            </div>
          </div>
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "14rem", marginRight: ".5rem" }}
          >
            <img
              src={Bootstrap_img}
              className="card-img-top"
              alt="Card Background"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h3 className="toolName">Bootstrap</h3>
              <p align="center">
                {" "}
                Utilized CSS framework for designing, styling and formatting the
                website
              </p>
            </div>
          </div>
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "14rem", marginRight: ".5rem" }}
          >
            <img
              src={Flask_image}
              className="card-img-top"
              alt="Card Background"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h3 className="toolName">Flask</h3>
              <p align="center">
                {" "}
                Developed backend API server as a Flask application
              </p>
            </div>
          </div>
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "14rem", marginRight: ".5rem" }}
          >
            <img
              src={Selenium_image}
              className="card-img-top"
              alt="Card Background"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h3 className="toolName">Selenium</h3>
              <p align="center">
                {" "}
                Automated GUI testing implemented using Selenium
              </p>
            </div>
          </div>
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "14rem", marginRight: ".5rem" }}
          >
            <img
              src={Postgres_image}
              className="card-img-top"
              alt="Card Background"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h3 className="toolName">PostgreSQL</h3>
              <p align="center">
                {" "}
                Cloud PostGreSQL database used to host data driving website
              </p>
            </div>
          </div>
        </div>
        <div className="toolsContainer">
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "14rem", marginRight: ".5rem" }}
          >
            <img
              src={AWS_image}
              className="card-img-top"
              alt="Card Background"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h3 className="toolName">AWS</h3>
              <p align="center">
                {" "}
                Used to host the website, database as well as backend API server
              </p>
            </div>
          </div>
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "14rem", marginRight: ".5rem" }}
          >
            <img
              src={Postman_image}
              className="card-img-top"
              alt="Card Background"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h3 className="toolName">POSTMAN</h3>
              <p align="center">
                {" "}
                Utilized to design and document RESTful API for database
              </p>
            </div>
          </div>
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "14rem", marginRight: ".5rem" }}
          >
            <img
              src={Mocha_image}
              className="card-img-top"
              alt="Card Background"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h3 className="toolName">Mocha</h3>
              <p align="center">
                {" "}
                Unit testing of front end React JS framework implemented via
                Mocha
              </p>
            </div>
          </div>
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "14rem", marginRight: ".5rem" }}
          >
            <img
              src={Python_image}
              className="card-img-top"
              alt="Card Background"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h3 className="toolName">Python</h3>
              <p align="center">
                {" "}
                Database loading, API implementation via Python
              </p>
            </div>
          </div>
          <div
            className="card text-white bg-dark mb-3"
            style={{ width: "14rem", marginRight: ".5rem" }}
          >
            <img
              src={Alchemy_image}
              className="card-img-top"
              alt="Card Background"
              style={{ height: "250px" }}
            />
            <div className="card-body">
              <h3 className="toolName">SQLAlchemy</h3>
              <p align="center">
                {" "}
                Module used to speak with and load data into database
              </p>
            </div>
          </div>
        </div>
        <div className="dataSources">
          <h4 style={{ paddingBottom: "1.5rem" }}> Data Sources</h4>
          <p>
            {" "}
            <a href="https://sunlightlabs.github.io/congress/">
              {" "}
              Representative Data API
            </a>
          </p>
          <h6 align="center" className="descriptionBody2">
            {" "}
            This API was the simplest to work with. It provided all the members
            of congress (House and Senate) in an easy to parse JSON response.
            Python was used to send the GET request. The response was parsed
            into a pandas dataframe and subsequently loaded into the DB.
          </h6>
          <p>
            {" "}
            <a href="https://projects.propublica.org/api-docs/congress-api/">
              {" "}
              Legislation Data API
            </a>
          </p>
          <h6 align="center" className="descriptionBody2">
            {" "}
            Propublica is the sole source of accurate legislation data. We had
            to request an API key, and once it was active, we used it to send
            requests for bills with specific key-words (eg: food security, food
            desert, etc.). The response was a bit funky - providing JSON or XML
            randomly. Our script had to handle for both types of responses.
          </h6>
          <p>
            {" "}
            <a href="https://www.census.gov/data/developers/guidance/api-user-guide.Query_Components.html">
              {" "}
              District Data API
            </a>
          </p>
          <h6 align="center" className="descriptionBody2">
            {" "}
            The obvious choice for congressional district data was a government
            website. It contains a variety of information with respect to a
            district. We were able to find the race demographic data requested
            by our customers in this dataset as well.
          </h6>
        </div>
        <div className="contactCard">
          <h4> Project Links</h4>
          <p> </p>
          <p>
            <a href="https://gitlab.com/shub95/foodmeonce/">
              {" "}
              FoodMeOnce GitLab Repository
            </a>
          </p>
        </div>
        <div className="contactCard2">
          <p>
            {" "}
            <a href="https://documenter.getpostman.com/view/7777503/SVtPXWHE?version=latest">
              {" "}
              FoodMeOnce API Documentation
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default AboutUs;
