import React, { useContext } from "react";
import SomeContext from "../../context/some-context";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import CapstoneLogo from "../../assets/capstone-logo.png";
import { Bell, PersonCircle } from "react-bootstrap-icons";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminNavBar = () => {
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
          <Navbar.Brand as={Link} to="/admin-home">
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
            <div className="col">
              <strong>{displayAccountType(someCtx.accountType)}</strong>
            </div>
            <div className="col-auto">
              <Nav.Link as={Link} to="/admin-home">
                Orders
              </Nav.Link>
            </div>
            <div className="col-auto">
              <Nav.Link as={Link} to="/profiles">
                Profiles
              </Nav.Link>
            </div>

            <div className="col-1">
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

export default AdminNavBar;
