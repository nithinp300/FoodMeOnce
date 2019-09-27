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
            <Nav.Link href="/page2">Districts</Nav.Link>
            <Nav.Link href="/page2">Representatives</Nav.Link>
            <Nav.Link href="/page2">Legislation</Nav.Link>
            </Nav> 
        </Navbar.Collapse>
      </Navbar>
      <BrowserRouter>
        <Route 
          exact path="/"
          component={Page1}
        />
        <Route 
          path="/Page2"
          component={Page2}
        />
        <Route
          path="/Page3"
          component={Page3}
        />
        <Route
          path="/Page4"
          component={Page4}
        />
        <Route
          path="/Page5"
          component={Page5}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
