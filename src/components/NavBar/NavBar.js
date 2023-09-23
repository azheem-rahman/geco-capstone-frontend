import React, { useContext } from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import CapstoneLogo from "../../assets/capstone-logo.png";
import { Bell, PersonCircle } from "react-bootstrap-icons";
import NavDropdown from "react-bootstrap/NavDropdown";
import SomeContext from "../../context/some-context";

const NavBar = () => {
  const someCtx = useContext(SomeContext);

  const displayAccountType = (accountType) => {
    switch (accountType) {
      case "admin":
        return <span>Admin</span>;
      case "partner_malaysia":
        return <span>Malaysia</span>;
      case "partner_indonesia":
        return <span>Indonesia</span>;
    }
  };

  return (
    <Navbar
      className="navbar-static-top"
      expand="sm"
      variant="light"
      style={{ maxHeight: "10vh" }}
    >
      <Container fluid>
        {/* elements aligned to left of navbar */}
        <div className="me-auto">
          {/* Logo */}
          <Navbar.Brand>
            <img
              src={CapstoneLogo}
              alt="capstone-logo"
              style={{ maxHeight: "2rem" }}
            />
          </Navbar.Brand>
        </div>

        {/* elements aligned to right of navbar */}
        <div className="ms-auto">
          <div className="row d-flex align-items-center">
            <div className="col">{displayAccountType(someCtx.accountType)}</div>
            <div className="col">
              {/* Notification Icon -- onClick opens small modal */}
              <Bell
                className="m-1"
                style={{ fontSize: "1.5rem", color: "#364f6b" }}
              />
            </div>

            <div className="col">
              {/* User Profile -- onClick opens small modal -- Profile, Log Out */}
              <PersonCircle
                className="m-1"
                style={{ fontSize: "1.5rem", color: "#364f6b" }}
              />
            </div>

            <div className="col">
              <NavDropdown
                align="end"
                title={`${someCtx.firstName} ${someCtx.lastName}`}
              >
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Log Out</NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
