import React, { useState, useContext, useEffect } from "react";
import AdminNavBar from "../NavBar/AdminNavBar";
import SomeContext from "../../context/some-context";

import { DataGrid, GridToolbar, renderActionsCell } from "@mui/x-data-grid";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { LinearProgress } from "@mui/material";
import CreateOrderForm from "../../forms/CreateOrderForm";
import { Check2Circle } from "react-bootstrap-icons";

const AdminDashboard = () => {
  const someCtx = useContext(SomeContext);

  const [getOrderStatus, setGetOrderStatus] = useState({
    status: 200,
    message: "",
  });
  const [loadingOrderTable, setLoadingOrderTable] = useState(true);

  const orderTableHeader = [
    { field: "completed", headerName: "Completed", minWidth: 90 },
    { field: "due_date", headerName: "Due Date", width: 110 },
    { field: "id", headerName: "Order ID", width: 70 },
    { field: "network_partner", headerName: "Partner", width: 120 },
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

  const convertAccountId = (accountId) => {
    if (accountId.Valid) {
      if (accountId.Int64 === 32) {
        return "Malaysia";
      }
      if (accountId.Int64 === 33) {
        return "Indonesia";
      }
    } else if (accountId.Valid === false) {
      return "";
    }
  };

  const convertOrderStatus = (orderStatus) => {
    if (orderStatus === 0) {
      return "No";
    } else {
      return "Yes";
    }
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
        if (response.orders === null) {
          setLoadingOrderTable(true);
        }

        console.log(response.orders);

        response.orders.map((order) => {
          setOrderTableRows((orderTableRows) => [
            ...orderTableRows,
            {
              completed: convertOrderStatus(order.completed),
              id: order.order_id,
              network_partner: convertAccountId(order.account_id),
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

  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRows = (ids) => {
    // console.log(ids);
    const selectedRowData = ids.map((id) => {
      return orderTableRows.find((row) => row.id === id);
    });
    // console.log(selectedRowData);
    setSelectedRows(selectedRowData);
  };

  //==========================================================//
  //==================== Create New Order ====================//
  //==========================================================//
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showSuccessCreateOrder, setShowSuccessCreateOrder] = useState(false);
  let newOrder = {};
  const [createOrderErrorMessage, setCreateOrderErrorMessage] = useState("");

  const handleCreateOrderClick = () => {
    setShowCreateOrder(true);
  };
  const handleCloseCreateOrderModal = () => {
    setShowCreateOrder(false);
  };

  const handleSetNewOrder = (newOrderInfo) => {
    console.log(newOrderInfo);
    newOrder = newOrderInfo;
    createOrderToDB();
  };

  const createOrderToDB = async () => {
    const url = "http://127.0.0.1:8080/new-order";
    const body = {
      account_id: newOrder.accountId,
      order_length: newOrder.orderLength,
      order_width: newOrder.orderWidth,
      order_height: newOrder.orderHeight,
      order_weight: newOrder.orderWeight,
      consignee_name: newOrder.consigneeName,
      consignee_number: newOrder.consigneeNumber,
      consignee_country: newOrder.consigneeCountry,
      consignee_address: newOrder.consigneeAddress,
      consignee_postal: newOrder.consigneePostal,
      consignee_state: newOrder.consigneeState,
      consignee_city: newOrder.consigneeCity,
      consignee_province: newOrder.consigneeProvince,
      consignee_email: newOrder.consigneeEmail,
      pickup_contact_name: newOrder.pickupContactName,
      pickup_contact_number: newOrder.pickupContactNumber,
      pickup_country: newOrder.pickupCountry,
      pickup_address: newOrder.pickupAddress,
      pickup_postal: newOrder.pickupPostal,
      pickup_state: newOrder.pickupState,
      pickup_city: newOrder.pickupCity,
      pickup_province: newOrder.pickupProvince,
      due_date: newOrder.dueDate,
      completed: 0,
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
          case "Failed to create order":
          case "No Account Found":
            setCreateOrderErrorMessage("Please try again");
            break;
        }
      }
      // Response HTTP OK 200
      else if (response.status === 200) {
        setOrderTableRows([]);
        getOrders();
        setShowCreateOrder(false);
        setShowSuccessCreateOrder(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCloseSuccessCreateOrderModal = () => {
    setShowSuccessCreateOrder(false);
  };

  const refreshOrders = () => {
    console.log("refresh current orders clicked!");
    setOrderTableRows([]);
    getOrders();
  };

  const [showSuccessAssignOrder, setShowSuccessAssignOrder] = useState(false);

  const handleCloseSuccessAssignOrderModal = () => {
    setShowSuccessAssignOrder(false);
    refreshOrders();
  };

  const assignOrders = (event) => {
    console.log(parseInt(event));
    const partnerSelected = parseInt(event);

    selectedRows.map((order) => {
      assignOrdersInDB(order, partnerSelected);
    });
  };

  const assignOrdersInDB = async (order, partnerSelected) => {
    const url = "http://127.0.0.1:8080/assign-order";
    const body = {
      order_id: order.id,
      account_id: partnerSelected,
    };
    console.log(body);

    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const response = await res.json();
      // console.log(response);

      // Response HTTP Error 400
      if (response.status === 400) {
        console.log(response.message);
      }
      // Response HTTP OK 200
      else if (response.status === 200) {
        console.log(response);
        setShowSuccessAssignOrder(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <AdminNavBar />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col">
            <h5>Good Day, {someCtx.firstName}!</h5>
            <h6>Here's what's happening today.</h6>
          </div>

          {/* Display orders J has receive and stored in database > assign order button here + new order button at top right */}
          <div className="col mt-3">
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
                    <div className="col-auto d-flex justify-content-end">
                      <Button
                        onClick={refreshOrders}
                        style={{ backgroundColor: "#5b81ac" }}
                      >
                        Refresh
                      </Button>
                    </div>
                    <div className="col-auto d-flex justify-content-end">
                      <Dropdown id="assign-order" onSelect={assignOrders}>
                        <Dropdown.Toggle style={{ backgroundColor: "#364f6b" }}>
                          Assign Order
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="32">Malaysia</Dropdown.Item>
                          <Dropdown.Item eventKey="33">Indonesia</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="col-auto d-flex justify-content-end">
                      <Button
                        onClick={handleCreateOrderClick}
                        style={{ backgroundColor: "#253649" }}
                      >
                        Create Order
                      </Button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      {/* Create Order Modal */}
                      <Modal
                        show={showCreateOrder}
                        onHide={handleCloseCreateOrderModal}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Create Order</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <CreateOrderForm
                            handleSetNewOrder={handleSetNewOrder}
                          />
                        </Modal.Body>
                        <p>{createOrderErrorMessage}</p>
                      </Modal>

                      {/* Successful Created Order Modal */}
                      <Modal
                        show={showSuccessCreateOrder}
                        onHide={handleCloseSuccessCreateOrderModal}
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
                              <span>Order has been created successfully</span>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>

                      {/* Successfully assign order modal */}
                      <Modal
                        show={showSuccessAssignOrder}
                        onHide={handleCloseSuccessAssignOrderModal}
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
                              <span>Order has been assigned successfully</span>
                            </div>
                          </div>
                        </Modal.Body>
                      </Modal>

                      {/* Order Table */}
                      <DataGrid
                        rows={orderTableRows}
                        columns={orderTableHeader}
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
                        loading={loadingOrderTable}
                        onRowSelectionModelChange={(ids) =>
                          handleSelectRows(ids)
                        }
                        sx={{
                          ".MuiTablePagination-displayedRows": {
                            marginTop: "1em",
                            marginBottom: "1em",
                          },
                          ".MuiTablePagination-displayedRows, .MuiTablePagination-selectLabel":
                            {
                              marginTop: "1em",
                              marginBottom: "1em",
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
    </div>
  );
};

export default AdminDashboard;
