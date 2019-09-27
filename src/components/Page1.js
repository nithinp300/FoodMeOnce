import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap'
import background from './cornField.jpg'

function Page1() {
    return (
        <div>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">FoodMeOnce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/page2">Districts</Nav.Link>
            <Nav.Link href="/page3">Representatives</Nav.Link>
            <Nav.Link href="/page4">Legislation</Nav.Link>
            <Nav.Link href="/page5">About Us</Nav.Link>
            </Nav> 
        </Navbar.Collapse>
        </Navbar>
        <img src={background} class="img-fluid" alt="Corn Field"/>
        </div>
    );
}

export default Page1;