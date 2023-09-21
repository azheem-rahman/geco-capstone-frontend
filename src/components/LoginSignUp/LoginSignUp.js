import React, { useState } from "react";
import {
  Tab,
  Form,
  Button,
  Tabs,
  FloatingLabel,
  InputGroup,
  ButtonGroup,
  ToggleButtonGroup,
} from "react-bootstrap";

const LoginSignUp = () => {
  // Login States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginValid, setLoginValid] = useState(false);
  const [loginErrorMessages, setLoginErrorMessages] = useState({
    loginEmailError: "",
    loginPasswordError: "",
  });

  // Sign Up States
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpValid, setSignUpValid] = useState(false);
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
  const handleSignUpChange = (event) => {
    if (
      event.target.id === "signup-first-name" ||
      event.target.id === "signup-last-name"
    ) {
      validateSignUpName(event.target.value, event.target.id);
    }
    if (event.target.id === "signup-email") {
      validateSignUpEmail(event.target.value);
    }
    if (event.target.id === "signup-password") {
      validateSignUpPassword(event.target.value);
    }
  };

  const validateSignUpName = (signUpName, nameType) => {
    let signUpNameValid = signUpValid;
    let signUpNameError = "";

    if (nameType === "signup-first-name") {
      signUpNameError = signUpErrorMessages.signUpFirstNameError;
    } else if (nameType === "signup-last-name") {
      signUpNameError = signUpErrorMessages.signUpLastNameError;
    }

    if (signUpName.trim() === "") {
      signUpNameValid = false;
      signUpNameError = "Name is required";
    } else if (signUpName.trim().length === 1) {
      signUpNameValid = false;
      signUpNameError = "Please enter a valid name";
    } else {
      signUpNameValid = true;
      signUpNameError = "";
    }

    if (nameType === "signup-first-name") {
      setSignUpFirstName(signUpName);
      setSignUpValid(signUpNameValid);
      setSignUpErrorMessages({
        ...signUpErrorMessages,
        signUpFirstNameError: signUpNameError,
      });
    } else {
      setSignUpLastName(signUpName);
      setSignUpValid(signUpNameValid);
      setSignUpErrorMessages({
        ...signUpErrorMessages,
        signUpLastNameError: signUpNameError,
      });
    }

    return signUpNameValid;
  };

  const validateSignUpEmail = (signUpEmail) => {
    let signUpEmailValid = signUpValid;
    let signUpEmailError = "";
    const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    if (!emailPattern.test(signUpEmail)) {
      signUpEmailValid = false;
      signUpEmailError = "Please enter a valid email";
    } else {
      signUpEmailValid = true;
      signUpEmailError = "";
    }

    setSignUpEmail(signUpEmail);
    setSignUpValid(signUpEmailValid);
    setSignUpErrorMessages({
      ...signUpErrorMessages,
      signUpEmailError: signUpEmailError,
    });

    return signUpEmailValid;
  };

  const validateSignUpPassword = (signUpPassword) => {
    let signUpPasswordValid = signUpValid;
    let signUpPasswordError = "";
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (!passwordPattern.test(signUpPassword)) {
      signUpPasswordValid = false;
      signUpPasswordError =
        "Must contain at least one number, one uppercase, one lowercase, and at least 8 characters";
    } else {
      signUpPasswordValid = true;
      signUpPasswordError = "";
    }

    setSignUpPassword(signUpPassword);
    setSignUpValid(signUpPasswordValid);
    setSignUpErrorMessages({ ...signUpErrorMessages, signUpPasswordError });

    return signUpPasswordValid;
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    console.log("sign up submit!");
    if (signUpValid) {
      setSignUpFirstName("");
      setSignUpLastName("");
      setSignUpEmail("");
      setSignUpPassword("");
      setSignUpValid(false);
      setSignUpErrorMessages({
        signUpFirstNameError: "",
        signUpLastNameError: "",
        signUpEmailError: "",
        signUpPasswordError: "",
      });
      alert("successful sign up!");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-4">
          <Tabs
            defaultActiveKey="login"
            id="login-sign-up"
            className="mb-3 bg-light"
            justify
          >
            <Tab eventKey="login" title="Login">
              <div className="row">
                <div className="col">
                  <Form.Group className="mb-3" controlId="login-email">
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
                  <Form.Group className="mb-3" controlId="login-password">
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

            {/* Sign Up Form */}
            <Tab eventKey="sign-up" title="Sign Up">
              <div className="row">
                <div className="col">
                  <Form.Group className="mb-3" controlId="signup-first-name">
                    <Form.Control
                      type="text"
                      placeholder="First Name *"
                      onChange={handleSignUpChange}
                    />
                    <Form.Text muted>
                      {signUpErrorMessages.signUpFirstNameError}
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className="col">
                  <Form.Group controlId="signup-last-name">
                    <Form.Control
                      type="text"
                      placeholder="Last Name *"
                      onChange={handleSignUpChange}
                    />
                    <Form.Text muted>
                      {signUpErrorMessages.signUpLastNameError}
                    </Form.Text>
                  </Form.Group>
                </div>
              </div>

              <Form onSubmit={handleSignUpSubmit}>
                <div className="row">
                  <div className="col">
                    <Form.Group className="mb-3" controlId="signup-email">
                      <Form.Control
                        type="email"
                        placeholder="Email Address *"
                        onChange={handleSignUpChange}
                      />
                      <Form.Text muted>
                        {signUpErrorMessages.signUpEmailError}
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <Form.Group className="mb-3" controlId="signup-password">
                      <Form.Control
                        type="password"
                        placeholder="Password *"
                        onChange={handleSignUpChange}
                      />
                      <Form.Text muted>
                        {signUpErrorMessages.signUpPasswordError}
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>

                <div className="row">
                  <div className="col-3 d-flex justify-content-start">
                    <Form.Label>Select Region</Form.Label>
                  </div>
                  <div className="col d-flex justify-content-start">
                    <Form.Group>
                      <Form.Check
                        inline
                        label="Malaysia"
                        type="radio"
                        id="signup-partner-malaysia"
                        name="partner"
                      />
                      <Form.Check
                        inline
                        label="Indonesia"
                        type="radio"
                        id="signup-partner-indonesia"
                        name="partner"
                      />
                    </Form.Group>
                  </div>
                </div>

                <div className="row mx-0">
                  <Button type="submit" className="mb-3">
                    SIGN UP
                  </Button>
                </div>

                <div className="row mb-3">
                  <div className="col d-flex justify-content-end">
                    <a href="#">Already have an account? Sign in</a>
                  </div>
                </div>
              </Form>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
