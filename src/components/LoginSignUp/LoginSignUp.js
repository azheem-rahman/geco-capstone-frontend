import React, { useContext, useState } from "react";
import CapstoneLogo from "../../assets/capstone-logo.png";
import { Tab, Form, Button, Tabs } from "react-bootstrap";
import SomeContext from "../../context/some-context";
import { Navigate } from "react-router-dom";

const LoginSignUp = () => {
  const someCtx = useContext(SomeContext);

  const [successfulLoginOrSignUp, setSuccessfulLoginOrSignUp] = useState(false);

  // Login States
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginValid, setLoginValid] = useState(false);
  const [loginErrorMessages, setLoginErrorMessages] = useState({
    loginEmailError: "",
    loginPasswordError: "",
  });
  const [loginFailedMessage, setLoginFailedMessage] = useState("");

  // Sign Up States
  const [signUpFirstName, setSignUpFirstName] = useState("");
  const [signUpLastName, setSignUpLastName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpRegion, setSignUpRegion] = useState("");
  const [signUpValid, setSignUpValid] = useState(false);
  const [signUpErrorMessages, setSignUpErrorMessages] = useState({
    signUpFirstNameError: "",
    signUpLastNameError: "",
    signUpEmailError: "",
    signUpPasswordError: "",
    signUpRegionError: "",
  });
  const [signUpFailedMessage, setSignUpFailedMessage] = useState("");

  //===========================================================//
  //===================== Login Functions =====================//
  //===========================================================//
  const handleLoginEmailChange = (event) => {
    if (event.target.value !== "") {
      let loginEmailError = "";
      setLoginErrorMessages({ ...loginErrorMessages, loginEmailError });
      setLoginEmail(event.target.value);
      setLoginValid(true);
    } else {
      let loginEmailError = "Email is required";
      setLoginErrorMessages({ ...loginErrorMessages, loginEmailError });
      setLoginValid(false);
    }
  };

  const handleLoginPasswordChange = (event) => {
    if (event.target.value !== "") {
      let loginPasswordError = "";
      setLoginErrorMessages({ ...loginErrorMessages, loginPasswordError });
      setLoginPassword(event.target.value);
      setLoginValid(true);
    } else {
      let loginPasswordError = "Password is required";
      setLoginErrorMessages({ ...loginErrorMessages, loginPasswordError });
      setLoginValid(false);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    let noInput = false;
    let loginEmailError = "";
    let loginPasswordError = "";
    if (document.getElementById("login-email").value === "") {
      loginEmailError = "Email is required";
      setLoginValid(false);
      noInput = true;
    }
    if (document.getElementById("login-password").value === "") {
      loginPasswordError = "Password is required";
      setLoginValid(false);
      noInput = true;
    }

    if (loginValid) {
      loginAccountToBackend();
    } else if (noInput) {
      setLoginErrorMessages({
        ...loginErrorMessages,
        loginEmailError,
        loginPasswordError,
      });
    }
  };

  const loginAccountToBackend = async () => {
    const url = "http://127.0.0.1:8080/login";
    const body = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json();
      console.log(response);

      // Response HTTP Error 400
      if (response.status === 400) {
        switch (response.message) {
          case "Failed to read request body":
          case "Failed to retrieve login credentials in database":
          case "Failed to retrieve account details in database":
          case "No account details found":
          case "Failed to create token":
            setLoginFailedMessage("Please try again");
            break;
          case "Invalid email or password":
            setLoginFailedMessage("Invalid email or password");
            break;
        }
      }
      // Response HTTP OK 200
      else if (response.status === 200) {
        // add login credentials to localStorage
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("accountType", response.accountType);
        localStorage.setItem("firstName", response.firstName);
        localStorage.setItem("lastName", response.lastName);
        // set context with login account credentials
        someCtx.setAccessToken(response.accessToken);
        someCtx.setEmail(loginEmail);
        someCtx.setFirstName(response.firstName);
        someCtx.setLastName(response.lastName);
        someCtx.setAccountType(response.accountType);

        // Proceed to dashboard after successful sign up
        setSuccessfulLoginOrSignUp(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //===========================================================//
  //==================== Sign Up Functions ====================//
  //===========================================================//
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

    if (signUpEmail.trim() === "") {
      signUpEmailValid = false;
      signUpEmailError = "Email is required";
    } else if (!emailPattern.test(signUpEmail)) {
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

    if (signUpPassword.trim() === "") {
      signUpPasswordValid = false;
      signUpPasswordError = "Password is required";
    } else if (!passwordPattern.test(signUpPassword)) {
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
    let noInput = false;
    let signUpFirstNameError = "";
    let signUpLastNameError = "";
    let signUpEmailError = "";
    let signUpPasswordError = "";
    let signUpRegionError = "";

    // Validation to check that all inputs are filled upon submit
    if (document.getElementById("signup-first-name").value === "") {
      setSignUpValid(false);
      noInput = true;
      signUpFirstNameError = "Name is required";
    }
    if (document.getElementById("signup-last-name").value === "") {
      setSignUpValid(false);
      noInput = true;
      signUpLastNameError = "Name is required";
    }
    if (document.getElementById("signup-email").value === "") {
      setSignUpValid(false);
      noInput = true;
      signUpEmailError = "Email is required";
    }
    if (document.getElementById("signup-password").value === "") {
      setSignUpValid(false);
      noInput = true;
      signUpPasswordError = "Password is required";
    }
    if (
      !document.getElementsByName("partner")[0].checked &&
      !document.getElementsByName("partner")[1].checked
    ) {
      setSignUpValid(false);
      noInput = true;
      signUpRegionError = "Please select a region";
    }

    // All inputs passed all validation checks
    if (signUpValid) {
      createAccountToBackend();
    }
    // User did not input anything
    else if (noInput) {
      setSignUpErrorMessages({
        ...signUpErrorMessages,
        signUpFirstNameError,
        signUpLastNameError,
        signUpEmailError,
        signUpPasswordError,
        signUpRegionError,
      });
    }
  };

  const createAccountToBackend = async () => {
    const url = "http://127.0.0.1:8080/new-account";
    const body = {
      email: signUpEmail,
      password: signUpPassword,
      account_type: signUpRegion,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json();
      console.log(response);

      // Response HTTP Error 400
      if (response.status === 400) {
        switch (response.message) {
          case "Failed to read request body":
          case "Failed to check if email taken in database":
          case "Failed to hash password":
          case "Failed to create user":
            setSignUpFailedMessage("Please try again");
            break;
          case "Email taken":
            let signUpEmailError = "Sorry, that email already exists";
            setSignUpErrorMessages({
              ...signUpErrorMessages,
              signUpEmailError,
            });
            break;
        }
      }
      // Response HTTP OK 200
      else if (response.status === 200) {
        createAccountDetailsToBackend();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createAccountDetailsToBackend = async () => {
    const url = "http://127.0.0.1:8080/new-account-details";
    const body = {
      email: signUpEmail,
      first_name: signUpFirstName,
      last_name: signUpLastName,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json();
      console.log(response);

      // Response HTTP Error 400
      if (response.status === 400) {
        switch (response.message) {
          case "Failed to read request body":
          case "Failed to check if account exists in database":
          case "Failed to create account details":
            setSignUpFailedMessage("Please try again");
            break;
          case "No Account Found":
            let signUpEmailError = "Sorry, that email already exists";
            setSignUpErrorMessages({
              ...signUpErrorMessages,
              signUpEmailError,
            });
            break;
        }
      }
      // Response HTTP OK 200
      else if (response.status === 200) {
        // set context with new account details
        someCtx.setFirstName(signUpFirstName);
        someCtx.setLastName(signUpLastName);
        someCtx.setEmail(signUpEmail);
        someCtx.setAccountType(signUpRegion);

        // Proceed to dashboard after successful sign up
        setSuccessfulLoginOrSignUp(true);
      }
    } catch (error) {
      console.log(error.message);
    }

    // Reset after sending new account credentials and details to backend
    setSignUpFirstName("");
    setSignUpLastName("");
    setSignUpEmail("");
    setSignUpPassword("");
    setSignUpRegion("");
    setSignUpValid(false);
    setSignUpErrorMessages({
      signUpFirstNameError: "",
      signUpLastNameError: "",
      signUpEmailError: "",
      signUpPasswordError: "",
      signUpRegionError: "",
    });
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column justify-content-center">
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-4">
          <div className="row">
            <div className="col d-flex justify-content-center mb-3">
              <img
                src={CapstoneLogo}
                alt="capstone-logo"
                style={{ maxHeight: "3rem" }}
              />
            </div>
          </div>
          {/* <Tabs
            defaultActiveKey="login"
            id="login-sign-up"
            className="mb-3 bg-light"
            justify
          > */}
          {/* Login Form */}
          {/* <Tab eventKey="login" title="Login"> */}
          <Form onSubmit={handleLogin}>
            <div className="row">
              <div className="col">
                <Form.Group className="mb-3" controlId="login-email">
                  <Form.Control
                    type="email"
                    placeholder="Email Address *"
                    autoFocus
                    onChange={handleLoginEmailChange}
                  />
                  <Form.Text muted>
                    {loginErrorMessages.loginEmailError}
                  </Form.Text>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Form.Group className="mb-3" controlId="login-password">
                  <Form.Control
                    type="password"
                    placeholder="Password *"
                    onChange={handleLoginPasswordChange}
                  />
                  <Form.Text muted>
                    {loginErrorMessages.loginPasswordError}
                  </Form.Text>
                </Form.Group>
              </div>
            </div>
            <div className="row mx-0">
              <Button type="submit">SIGN IN</Button>
              <Form.Text muted>{loginFailedMessage}</Form.Text>
            </div>
          </Form>
          {/* </Tab> */}

          {/* Sign Up Form */}
          {/* <Tab eventKey="sign-up" title="Sign Up">
              <Form onSubmit={handleSignUpSubmit}>
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

                <div className="row mb-3">
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
                        value="partner_malaysia"
                        onClick={() => setSignUpRegion("partner_malaysia")}
                      />
                      <Form.Check
                        inline
                        label="Indonesia"
                        type="radio"
                        id="signup-partner-indonesia"
                        name="partner"
                        value="partner_indonesia"
                        onClick={() => setSignUpRegion("partner_indonesia")}
                      />
                      <Form.Text muted>
                        {signUpErrorMessages.signUpRegionError}
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>

                <div className="row mx-0 mb-3">
                  <Button type="submit">SIGN UP</Button>
                  <Form.Text muted>{signUpFailedMessage}</Form.Text>
                </div>
              </Form>
            </Tab>
          </Tabs> */}
        </div>
      </div>

      {successfulLoginOrSignUp &&
        (someCtx.accountType === "partner_malaysia" ||
          someCtx.accountType === "partner_indonesia") && (
          <Navigate to="/np-home" />
        )}

      {successfulLoginOrSignUp && someCtx.accountType === "admin" && (
        <Navigate to="/admin-home" />
      )}
    </div>
  );
};

export default LoginSignUp;
