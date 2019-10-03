import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Districts from "./Districts";
import Representatives from "./Representatives";
import Legislation from "./Legislations";
import SplashPage from "./SplashPage";
import AboutUs from "./AboutUs";
import DistrictInstance from "./InstancePages/DistrictInstance";
import RepresentativeInstance from "./InstancePages/RepresentativeInstance";
import LegislationInstance from "./InstancePages/LegislationInstance";
import ErrorPage from "./Error";
import { Navbar, Nav } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Brand href="/">FoodMeOnce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Districts">Districts</Nav.Link>
            <Nav.Link href="/Representatives">Representatives</Nav.Link>
            <Nav.Link href="/Legislations">Legislation</Nav.Link>
            <Nav.Link href="/About Us">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SplashPage} />
          <Route path="/Districts/Instance/:name" component={DistrictInstance} />
          <Route exact path="/Districts" component={Districts} />
          <Route
            path="/Representatives/Instance/:first_name/:last_name"
            component={RepresentativeInstance}
          />
          <Route exact path="/Representatives" component={Representatives} />
          <Route
            path="/Legislations/Instance/:short_title"
            component={LegislationInstance}
          />
          <Route exact path="/Legislations" component={Legislation} />
          <Route path="/About Us" component={AboutUs} />
          <Route path="/error" component={ErrorPage} />
          <Redirect to="/error" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
