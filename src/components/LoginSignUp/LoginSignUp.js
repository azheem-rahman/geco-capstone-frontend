import React, { useState } from "react";
import { Tab, Form, Button, Tabs } from "react-bootstrap";

const LoginSignUp = () => {
  // Login States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginValid, setLoginValid] = useState("");
  const [loginErrorMessages, setLoginErrorMessages] = useState({
    loginEmailError: "",
    loginPasswordError: "",
  });

  // Sign Up States
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpValid, setSignUpValid] = useState("");
  const [signUpErrorMessages, setSignUpErrorMessages] = useState({
    signUpFirstNameError: "",
    signUpLastNameError: "",
    signUpEmailError: "",
    signUpPasswordError: "",
  });

  // Login Functions
  const handleLoginEmailChange = (event) => {
    setLoginEmail(event.target.value);
  };

  const handleLoginPasswordChange = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Login Credentials Validation
  };

  // Sign Up Functions
  const handleSignUpChange = (event) => {};
  const validateSignUpName = (event) => {};
  const validateSignUpEmail = (event) => {};
  const validateSignUpPassword = (event) => {};
  const handleSignUpSubmit = (event) => {};

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-4">
          <Tabs
            defaultActiveKey="login"
            id="login-sign-up"
            className="mb-3"
            justify
          >
            <Tab eventKey="login" title="Login">
              <div className="row">
                <div className="col">
                  <Form.Group className="mb-3" controlId="email-login">
                    <Form.Control
                      type="email"
                      placeholder="Email Address *"
                      autoFocus
                      value={loginEmail}
                      onChange={handleLoginEmailChange}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <Form.Group className="mb-3" controlId="password-login">
                    <Form.Control
                      type="password"
                      placeholder="Password *"
                      value={loginPassword}
                      onChange={handleLoginPasswordChange}
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row mx-0">
                <Button className="mb-3" onSubmit={handleLogin}>
                  SIGN IN
                </Button>
              </div>
              <div className="row mb-3">
                <div className="col d-flex justify-content-start">
                  <a href="#">Forgot password?</a>
                </div>
                <div className="col d-flex justify-content-end">
                  <a href="#">Don't have an account? Sign Up</a>
                </div>
              </div>
            </Tab>

            <Tab eventKey="sign-up" title="Sign Up">
              <div className="row">
                <div className="col">
                  <Form.Group className="mb-3" controlId="first-name">
                    <Form.Control type="text" placeholder="First Name *" />
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group className="mb-3" controlId="last-name">
                    <Form.Control type="text" placeholder="Last Name *" />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <Form.Group className="mb-3" controlId="email-signup">
                    <Form.Control type="email" placeholder="Email Address *" />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <Form.Group className="mb-3" controlId="password-signup">
                    <Form.Control type="password" placeholder="Password *" />
                  </Form.Group>
                </div>
              </div>

              <div className="row mx-0">
                <Button className="mb-3">SIGN UP</Button>
              </div>

              <div className="row mb-3">
                <div className="col d-flex justify-content-end">
                  <a href="#">Already have an account? Sign in</a>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
