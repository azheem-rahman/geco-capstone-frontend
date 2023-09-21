import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CapstoneLogo from "../../assets/capstone-logo.png";
import { Bell, PersonCircle } from "react-bootstrap-icons";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = () => {
  return (
    <Navbar
      className="navbar-static-top"
      expand="sm"
      variant="light"
      style={{ border: "solid 1px red", maxHeight: "10vh" }}
    >
      <Container fluid>
        {/* elements aligned to left of navbar */}
        <div className="me-auto">
          {/* Logo */}
          <Navbar.Brand>
            <img
              src={CapstoneLogo}
              alt="capstone-logo"
              style={{ maxHeight: "4vh" }}
            />
          </Navbar.Brand>
        </div>

        {/* elements aligned to right of navbar */}
        <div className="ms-auto">
          <div className="row d-flex align-items-center">
            <div className="col-3">
              {/* Notification Icon -- onClick opens small modal */}
              <Bell
                className="m-1"
                style={{ fontSize: "1.5rem", color: "#364f6b" }}
              />
            </div>

            <div className="col-2">
              {/* User Profile -- onClick opens small modal -- Profile, Log Out */}
              <PersonCircle
                className="m-1"
                style={{ fontSize: "1.5rem", color: "#364f6b" }}
              />
            </div>

            <div className="col">
              <NavDropdown align="end" title="ProfileName">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Log Out</NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
        </div>

        {/* Menu -- Dashboards -- Different dashboards */}
        {/* <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link></Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
};

export default NavBar;
