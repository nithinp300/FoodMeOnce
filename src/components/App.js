import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import {Navbar, Nav} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">FoodMeOnce</Navbar.Brand>
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
      <Route
        exact path="/"
        component={Page1}
      />

      <Route
        path="/Districts"
        component={Page2}
      />
      <Route
        path="/Representatives"
        component={Page3}
      />
      <Route
        path="/Legislations"
        component={Page4}
      />
      <Route
        path="/About Us"
        component={Page5}
      />
    </BrowserRouter>
    </div>
  );
}

export default App;
