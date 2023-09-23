import React, { useState, useContext, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import SomeContext from "../../context/some-context";

import { DataGrid, GridToolbar, renderActionsCell } from "@mui/x-data-grid";
import { Button, Modal } from "react-bootstrap";
import { LinearProgress } from "@mui/material";

const Dashboard = () => {
  const someCtx = useContext(SomeContext);
  const [getOrderStatus, setGetOrderStatus] = useState({
    status: 200,
    message: "",
  });
  const [loadingOrderTable, setLoadingOrderTable] = useState(true);

  const renderDetailsButton = (params) => {
    return (
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {}}
      >
        Details
      </Button>
    );
  };
  const orderTableHeader = [
    { field: "completed", headerName: "Completed", minWidth: 90 },
    { field: "due_date", headerName: "Due Date", width: 110 },
    { field: "id", headerName: "Order ID", width: 70 },
    { field: "consignee_address", headerName: "Consignee Address", width: 500 },
    { field: "consignee_city", headerName: "Consignee City", width: 200 },
    { field: "consignee_country", headerName: "Consignee Country", width: 200 },
    { field: "consignee_email", headerName: "Consignee Email", width: 200 },
    { field: "consignee_name", headerName: "Consignee Name", width: 200 },
    { field: "consignee_number", headerName: "Consignee Number", width: 200 },
    { field: "consignee_postal", headerName: "Consignee Postal", width: 200 },
    {
      field: "consignee_province",
      headerName: "Consignee Province",
      width: 200,
    },
    { field: "consignee_state", headerName: "Consignee State", width: 200 },
    { field: "order_height", headerName: "Order Height" },
    { field: "order_length", headerName: "Order Length" },
    { field: "order_weight", headerName: "Order Weight" },
    { field: "order_width", headerName: "Order Width" },
    { field: "pickup_address", headerName: "Pickup Address", width: 200 },
    { field: "pickup_city", headerName: "Pickup City", width: 200 },
    {
      field: "pickup_contact_name",
      headerName: "Pickup Contact Name",
      width: 200,
    },
    {
      field: "pickup_contact_number",
      headerName: "Pickup Contact Number",
      width: 200,
    },
    { field: "pickup_country", headerName: "Pickup Country", width: 200 },
    { field: "pickup_postal", headerName: "Pickup Postal", width: 200 },
    { field: "pickup_province", headerName: "Pickup Province", width: 200 },
    { field: "pickup_state", headerName: "Pickup State", width: 200 },
  ];

  const [orderTableRows, setOrderTableRows] = useState([]);

  useEffect(() => {
    // GET orders from DB upon first render
    getOrders();
    // GET list of NPs from DB upon first render
  }, []);

  const convertDate = (dateFromDB) => {
    const t = dateFromDB.split(/[- :]/);
    const dueDateUTC = new Date(
      Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])
    );
    const dueDateUTCSplit = dueDateUTC.toString().split(/[ ]/);
    const dueDateFormatted = `${dueDateUTCSplit[2]} ${dueDateUTCSplit[1]} ${dueDateUTCSplit[3]}`;
    return dueDateFormatted;
  };

  const getOrders = async () => {
    const url = "http://127.0.0.1:8080/orders";
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
          case "Failed to retrieve orders from DB":
          case "Failed to save orders from DB":
            setGetOrderStatus({
              status: 400,
              message: "Error connecting to database. Please try again later",
            });
            break;
        }
      }
      // Response HTTP OK 200
      else if (response.status === 200) {
        console.log(response.orders);

        response.orders.map((order) => {
          setOrderTableRows([
            ...orderTableRows,
            {
              completed: order.completed,
              id: order.order_id,
              consignee_address: order.consignee_address,
              consignee_city: order.consignee_city,
              consignee_country: order.consignee_country,
              consignee_email: order.consignee_email,
              consignee_name: order.consignee_name,
              consignee_number: order.consignee_number,
              consignee_postal: order.consignee_postal,
              consignee_province: order.consignee_province,
              consignee_state: order.consignee_state,
              due_date: convertDate(order.due_date),
              order_height: order.order_height,
              order_length: order.order_length,
              order_weight: order.order_weight,
              order_width: order.order_width,
              pickup_address: order.pickup_address,
              pickup_city: order.pickup_city,
              pickup_contact_name: order.pickup_contact_name,
              pickup_contact_number: order.pickup_contact_number,
              pickup_country: order.pickup_country,
              pickup_postal: order.pickup_postal,
              pickup_province: order.pickup_province,
              pickup_state: order.pickup_state,
            },
          ]);
        });

        setLoadingOrderTable(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const displayOrders = (orders) => {
    orders.map((order) => {
      setOrderTableRows([
        ...orderTableRows,
        {
          completed: order.completed,
          order_id: order.order_id,
          consignee_address: order.consignee_address,
          consignee_city: order.consignee_city,
          consignee_country: order.consignee_country,
          consignee_email: order.consignee_email,
          consignee_name: order.consignee_name,
          consignee_number: order.consignee_number,
          consignee_postal: order.consignee_postal,
          consignee_province: order.consignee_province,
          consignee_state: order.consignee_state,
          due_date: order.due_date,
          order_height: order.order_height,
          order_length: order.order_length,
          order_weight: order.order_weight,
          order_width: order.order_width,
          pickup_address: order.pickup_address,
          pickup_city: order.pickup_city,
          pickup_contact_name: order.pickup_contact_name,
          pickup_contact_number: order.pickup_contact_number,
          pickup_country: order.pickup_country,
          pickup_postal: order.pickup_postal,
          pickup_province: order.pickup_province,
          pickup_state: order.pickup_state,
        },
      ]);
    });
  };
  //==========================================================//
  //==================== Create New Order ====================//
  //==========================================================//
  const [showCreateNewOrder, setShowCreateNewOrder] = useState(false);
  const handleCreateNewOrderClick = () => {
    setShowCreateNewOrder(true);
  };
  const handleCloseNewOrderModal = () => {
    setShowCreateNewOrder(false);
  };
  const createNewOrder = () => {};

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <NavBar />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col">
            <h5>Good Day, ProfileName!</h5>
            <h6>Here's what's happening today.</h6>
            {/* List of Quick Actions */}
            {/* <div className="col-3 mt-3">
            <div
            className="container bg-light"
            style={{ border: "solid 1px black" }}
            >
            <h5>Quick Actions</h5>
            </div>
          </div> */}
          </div>

          {/* Display orders J has receive and stored in database > assign order button here + new order button at top right */}
          {/* <div className="col mt-3"> */}
          <div className="row">
            <div className="col">
              <div
                className="container-fluid bg-light"
                style={{ border: "solid 1px black" }}
              >
                <div className="row my-3">
                  <div className="col">
                    <h5>Orders</h5>
                  </div>
                  <div className="col d-flex justify-content-end">
                    <Button
                      onClick={handleCreateNewOrderClick}
                      style={{ backgroundColor: "#364f6b" }}
                    >
                      Create Order
                    </Button>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {/* Create New Order Modal */}
                    <Modal
                      show={showCreateNewOrder}
                      onHide={handleCloseNewOrderModal}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Create Order</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form></Form>
                        {/* <Form onSubmit={handleSignUpSubmit}>
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
                </div> */}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant="danger"
                          onClick={handleCloseNewOrderModal}
                        >
                          Close
                        </Button>
                        <Button style={{ backgroundColor: "#364f6b" }}>
                          Submit
                        </Button>
                      </Modal.Footer>
                    </Modal>

                    {/* Order Table */}
                    <DataGrid
                      rows={orderTableRows}
                      columns={orderTableHeader}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 1, pageSize: 5 },
                        },
                      }}
                      pageSizeOptions={[5, 10]}
                      checkboxSelection
                      slots={{
                        toolbar: GridToolbar,
                        loadingOverlay: LinearProgress,
                      }}
                      loading={loadingOrderTable}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* </div> */}

          {/* Display NPs that J has assigned to each of these orders */}
          {/* <div className="col-2 mt-3">
            <div
              className="container bg-light"
              style={{ border: "solid 1px black" }}
            >
              <h5>Network Partners</h5>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
