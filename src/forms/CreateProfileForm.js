import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CreateProfileForm = (props) => {
  const [newProfileInput, setNewProfileInput] = useState({});
  const [accountType, setAccountType] = useState("");

  const [createValid, setCreateValid] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    firstNameError: "",
    lastNameError: "",
    passwordError: "",
    emailError: "",
    typeError: "",
  });

  const handleCreateProfileChange = (event) => {
    switch (event.target.id) {
      case "first-name":
      case "last-name":
        validateCreateName(event.target.value, event.target.id);
        break;
      case "email":
        validateCreateEmail(event.target.value);
        break;
      case "password":
        validateCreatePassword(event.target.value);
        break;
    }
  };

  const validateCreateName = (createName, nameType) => {
    let nameValid = createValid;
    let nameError = "";

    switch (nameType) {
      case "first-name":
        nameError = errorMessages.firstNameError;
        break;
      case "last-name":
        nameError = errorMessages.lastNameError;
        break;
    }

    if (createName.trim() === "") {
      nameValid = false;
      nameError = "Name is required";
    } else if (createName.trim().length === 1) {
      nameValid = false;
      nameError = "Please enter a valid name";
    } else {
      nameValid = true;
      nameError = "";
    }

    if (nameType === "first-name") {
      setNewProfileInput({ ...newProfileInput, firstName: createName });
      setCreateValid(nameValid);
      setErrorMessages({ ...errorMessages, firstNameError: nameError });
    } else {
      setNewProfileInput({ ...newProfileInput, lastName: createName });
      setCreateValid(nameValid);
      setErrorMessages({ ...errorMessages, lastNameError: nameError });
    }

    return nameValid;
  };

  const validateCreateEmail = (createEmail) => {
    let emailValid = createValid;
    let emailError = "";
    const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    if (createEmail.trim() === "") {
      emailValid = false;
      emailError = "Email is required";
    } else if (!emailPattern.test(createEmail)) {
      emailValid = false;
      emailError = "Please enter a valid email";
    } else {
      emailValid = true;
      emailError = "";
    }

    setNewProfileInput({ ...newProfileInput, email: createEmail });
    setCreateValid(emailValid);
    setErrorMessages({
      ...errorMessages,
      emailError,
    });

    return emailValid;
  };

  const validateCreatePassword = (createPassword) => {
    let passwordValid = createValid;
    let passwordError = "";
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

    if (createPassword.trim() === "") {
      passwordValid = false;
      passwordError = "Password is required";
    } else if (!passwordPattern.test(createPassword)) {
      passwordValid = false;
      passwordError = "Please enter a valid password";
    } else {
      passwordValid = true;
      passwordError = "";
    }

    setNewProfileInput({ ...newProfileInput, password: createPassword });
    setCreateValid(passwordValid);
    setErrorMessages({
      ...errorMessages,
      passwordError,
    });

    return passwordValid;
  };

  const handleCreateProfileSubmit = (event) => {
    event.preventDefault();
    let noInput = false;
    let firstNameError = "";
    let lastNameError = "";
    let emailError = "";
    let passwordError = "";
    let typeError = "";

    // Validation to check that all inputs are filled upon submit
    if (document.getElementById("first-name").value === "") {
      setCreateValid(false);
      noInput = true;
      firstNameError = "Name is required";
    }
    if (document.getElementById("last-name").value === "") {
      setCreateValid(false);
      noInput = true;
      lastNameError = "Name is required";
    }
    if (document.getElementById("email").value === "") {
      setCreateValid(false);
      noInput = true;
      emailError = "Email is required";
    }
    if (document.getElementById("password").value === "") {
      setCreateValid(false);
      noInput = true;
      passwordError = "Password is required";
    }
    if (
      !document.getElementsByName("account-type")[0].checked &&
      !document.getElementsByName("account-type")[1].checked &&
      !document.getElementsByName("account-type")[2].checked
    ) {
      setCreateValid(false);
      noInput = true;
      typeError = "Please select an account type";
    }

    // All inputs passed all validation checks
    if (createValid) {
      createAccountToBackend();
    }
    // User did not input anything
    else if (noInput) {
      setErrorMessages({
        ...errorMessages,
        firstNameError,
        lastNameError,
        emailError,
        passwordError,
        typeError,
      });
    }
  };

  const createAccountToBackend = async () => {
    const url = "http://127.0.0.1:8080/new-account";
    const body = {
      email: newProfileInput.email,
      password: newProfileInput.password,
      account_type: accountType,
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
            props.handleSetCreateFailedMessage("Please try again");
            break;
          case "Email taken":
            let emailError = "Sorry, that email already exists";
            setErrorMessages({
              ...errorMessages,
              emailError,
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
      email: newProfileInput.email,
      first_name: newProfileInput.firstName,
      last_name: newProfileInput.lastName,
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
            props.handleSetCreateFailedMessage("Please try again");
            break;
          case "No Account Found":
            let emailError = "Sorry, that email already exists";
            setErrorMessages({
              ...errorMessages,
              emailError,
            });
            break;
        }
      }
      // Response HTTP OK 200
      else if (response.status === 200) {
        // show successfully created account modal
        props.handleSetCreateProfileSuccess();
      }
    } catch (error) {
      console.log(error.message);
    }

    // Reset after sending new account credentials and details to backend
    setNewProfileInput({});
    setCreateValid(false);
    setErrorMessages({
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      typeError: "",
    });
  };

  return (
    <Form onSubmit={handleCreateProfileSubmit}>
      <h5>New Account Details</h5>
      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="first-name">
            <Form.Control
              type="text"
              placeholder="First Name *"
              onChange={handleCreateProfileChange}
            />
            <Form.Text muted>{errorMessages.firstNameError}</Form.Text>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group className="mb-3" controlId="last-name">
            <Form.Control
              type="text"
              placeholder="Last Name *"
              onChange={handleCreateProfileChange}
            />
            <Form.Text muted>{errorMessages.lastNameError}</Form.Text>
          </Form.Group>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              type="text"
              placeholder="Email *"
              onChange={handleCreateProfileChange}
            />
          </Form.Group>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password *"
              onChange={handleCreateProfileChange}
            />
          </Form.Group>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-auto d-flex justify-content-start">
          <Form.Label>Account Type</Form.Label>
        </div>
        <div className="col d-flex justify-content-start">
          <Form.Group>
            <Form.Check
              inline
              label="Admin"
              type="radio"
              id="admin"
              name="account-type"
              value="admin"
              onClick={() => setAccountType("admin")}
            />
            <Form.Check
              inline
              label="Malaysia"
              type="radio"
              id="partner-malaysia"
              name="account-type"
              value="partner_malaysia"
              onClick={() => setAccountType("partner_malaysia")}
            />
            <Form.Check
              inline
              label="Indonesia"
              type="radio"
              id="partner-indonesia"
              name="account-type"
              value="partner_indonesia"
              onClick={() => setAccountType("partner_indonesia")}
            />
            <Form.Text muted>{errorMessages.typeError}</Form.Text>
          </Form.Group>
        </div>
      </div>

      <div className="row mx-0 mb-3">
        <Button type="submit">Create Account</Button>
        <Form.Text muted>{props.createFailedMessage}</Form.Text>
      </div>
    </Form>
  );
};

export default CreateProfileForm;
