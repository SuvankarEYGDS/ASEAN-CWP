import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faEnvelope, faSearch, faGlobe } from "@fortawesome/free-solid-svg-icons";
import './header.css';
export default function HeaderComponent(props) {
 const {logo,navigation,container}=props
 console.log(1,navigation)
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="#home">
      <img src={`http://localhost:4502${logo}`} className="Logo" alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-end" style={{ width: "100%" }}>
          {
            navigation.length > 0 && navigation.map((nav)=> <Nav.Link href={`http://localhost:4502${nav.url}`}>{nav.title}</Nav.Link>)

          }
         &nbsp;
         <button className="contact-button">
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            Contact
          </button>
          <button className="contact-button">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </button>
          <button className="contact-button">
              <FontAwesomeIcon icon={faGlobe} className="world-icon" />
              </button>
        </Nav>
      </Navbar.Collapse>
    </Container>
   </Navbar>
  );
}