import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'

function Page1() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/page2">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="/page2">Action</NavDropdown.Item>
                <NavDropdown.Item href="/page2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="/page2">Something</NavDropdown.Item>
                <NavDropdown.Divider /> 
                <NavDropdown.Item href="/page2">Separated link</NavDropdown.Item>
            </NavDropdown>
            </Nav> 
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
        </Navbar>
    );
}

export default Page1;