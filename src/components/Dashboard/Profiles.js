import React, { useContext, useEffect, useState } from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import { Button, Modal } from "react-bootstrap";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import SomeContext from "../../context/some-context";
import { LinearProgress } from "@mui/material";
import CreateProfileForm from "../../forms/CreateProfileForm";
import { Check2Circle } from "react-bootstrap-icons";

const Profiles = () => {
  const someCtx = useContext(SomeContext);

  const [getProfileStatus, setGetProfileStatus] = useState({
    status: 200,
    message: "",
  });
  const [loadingProfileTable, setLoadingProfileTable] = useState(true);

  const profileTableHeader = [
    { field: "id", headerName: "Account ID" },
    { field: "email", headerName: "Email", width: 200 },
    { field: "accountType", headerName: "Account Type", width: 200 },
  ];

  const [profileTableRows, setProfileTableRows] = useState([]);

  useEffect(() => {
    // GET list of profiles from DB upon first render
    getProfiles();
  }, []);

  const convertAccountType = (accountTypeFromDB) => {
    let convertedAccountType = "";

    switch (accountTypeFromDB) {
      case "admin":
        convertedAccountType = "Admin";
        break;
      case "partner_malaysia":
        convertedAccountType = "Malaysia Partner";
        break;
      case "partner_indonesia":
        convertedAccountType = "Indonesia Partner";
        break;
    }

    return convertedAccountType;
  };

  const getProfiles = async () => {
    const url = "http://127.0.0.1:8080/accounts";
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();
      console.log(response);

      // Response HTTP Error 400
      if (response.status === 400) {
        switch (response.message) {
          case "Failed to retrieve accounts from DB":
          case "Failed to save accounts from DB":
            setGetProfileStatus({
              status: 400,
              message: "Error connecting to database. Please try again later.",
            });
            break;
        }
      }
      // Response HTTP OK 200
      else if (response.status === 200) {
        console.log(response.profiles);

        response.profiles.map((profile) => {
          setProfileTableRows((profileTableRows) => [
            ...profileTableRows,
            {
              id: profile.account_id,
              email: profile.email,
              accountType: convertAccountType(profile.account_type),
            },
          ]);
        });

        setLoadingProfileTable(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //========================================================//
  //==================== Create Profile ====================//
  //========================================================//

  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showSuccessCreateProfile, setShowSuccessCreateProfile] =
    useState(false);
  const [createFailedMessage, setCreateFailedMessage] = useState("");

  const handleCreateProfile = () => {
    setShowCreateProfile(true);
  };
  const handleCloseCreateProfileModal = () => {
    setShowCreateProfile(false);
  };
  const handleSetCreateProfileSuccess = () => {
    setProfileTableRows([]);
    getProfiles();
    setShowCreateProfile(false);
    setShowSuccessCreateProfile(true);
  };
  const handleSetCreateFailedMessage = (message) => {
    setCreateFailedMessage(message);
  };
  const handleCloseSuccessCreateProfileModal = () => {
    setShowSuccessCreateProfile(false);
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <AdminNavBar />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col">
            <h5>Good Day, {someCtx.firstName}!</h5>
            <h6>Here's all profiles</h6>
          </div>
        </div>

        {/* Display all accounts > create account (can create both admin or network partner account) */}
        <div className="col mt-3">
          <div className="row">
            <div className="col">
              <div
                className="container-fluid bg-light"
                style={{ border: "solid 1px black" }}
              >
                <div className="row my-3">
                  <div className="col">
                    <h5>Profiles</h5>
                  </div>
                  <div className="col-auto d-flex justify-content-end">
                    <Button
                      onClick={handleCreateProfile}
                      style={{ backgroundColor: "#5b81ac" }}
                    >
                      Create Profile
                    </Button>
                  </div>
                  <div className="col-auto d-flex justify-content-end">
                    <Button onClick="" style={{ backgroundColor: "#364f6b" }}>
                      Delete Profile
                    </Button>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    {/* Create Profile Modal */}
                    <Modal
                      show={showCreateProfile}
                      onHide={handleCloseCreateProfileModal}
                      centered
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Create Profile</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <CreateProfileForm
                          handleSetCreateProfileSuccess={
                            handleSetCreateProfileSuccess
                          }
                          handleSetCreateFailedMessage={
                            handleSetCreateFailedMessage
                          }
                          createFailedMessage={createFailedMessage}
                        />
                      </Modal.Body>
                      <p>{createFailedMessage}</p>
                    </Modal>

                    {/* Successfully created profile modal -- reuse modal with different text? */}
                    <Modal
                      show={showSuccessCreateProfile}
                      onHide={handleCloseSuccessCreateProfileModal}
                      centered
                    >
                      <Modal.Header closeButton />
                      <Modal.Body>
                        <div className="row">
                          <div className="col d-flex justify-content-center">
                            <Check2Circle size={"10rem"} color="green" />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col d-flex justify-content-center">
                            <h4>Success!</h4>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col d-flex justify-content-center">
                            <span>
                              New account has been created successfully
                            </span>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>

                    {/* Profile Table */}
                    <DataGrid
                      rows={profileTableRows}
                      columns={profileTableHeader}
                      initialState={{
                        pagination: {
                          paginationModel: { pageSize: 10 },
                        },
                      }}
                      pageSizeOptions={[5, 10, 20]}
                      checkboxSelection
                      slots={{
                        toolbar: GridToolbar,
                        loadingOverlay: LinearProgress,
                      }}
                      loading={loadingProfileTable}
                      sx={{
                        ".MuiTablePagination-displayedRows": {
                          "margin-top": "1em",
                          "margin-bottom": "1em",
                        },
                        ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel":
                          {
                            "margin-top": "1em",
                            "margin-bottom": "1em",
                          },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
