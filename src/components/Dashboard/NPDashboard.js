import React, { useState, useContext, useEffect } from "react";
import NPNavBar from "../NavBar/NPNavBar";
import SomeContext from "../../context/some-context";
import { Button, Modal } from "react-bootstrap";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";
import { Check2Circle } from "react-bootstrap-icons";

const NPDashboard = () => {
  const someCtx = useContext(SomeContext);

  const [getOrderStatus, setGetOrderStatus] = useState({
    status: 200,
    message: "",
  });

  const [loadingOrderTable, setLoadingOrderTable] = useState(true);

  const [ordersToUpdate, setOrdersToUpdate] = useState([]);
  let orderCompleted = 0;

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
          setOrderTableRows((orderTableRows) => [
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

  const refreshCurrentOrders = () => {
    console.log("refresh current orders clicked!");
    setOrderTableRows([]);
    getOrders();
  };

  const handleSelectRows = (ids) => {
    const selectedRowData = ids.map((id) => {
      return orderTableRows.find((row) => row.id === id);
    });
    console.log(selectedRowData);
    setOrdersToUpdate(selectedRowData);
  };

  const updateOrderStatus = (event) => {
    if (event.target.id === "mark-completed") {
      orderCompleted = 1;
    } else if (event.target.id === "mark-incomplete") {
      orderCompleted = 0;
    }

    ordersToUpdate.map((order) => {
      updateOrderStatusInDB(order);
    });
  };

  const updateOrderStatusInDB = async (order) => {
    const url = "http://127.0.0.1:8080/update-order-status";
    const body = {
      order_id: order.id,
      completed: orderCompleted,
    };

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
        setShowSuccessUpdateOrderStatus(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [showSuccessUpdateOrderStatus, setShowSuccessUpdateOrderStatus] =
    useState(false);
  const handleCloseSuccessUpdateOrderStatusModal = () => {
    setShowSuccessUpdateOrderStatus(false);
    refreshCurrentOrders();
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <NPNavBar />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col">
            <h5>Good Day, {someCtx.firstName}!</h5>
            <h6>Here's what's happening today.</h6>
          </div>

          <div className="row">
            <div className="col">
              {/* Current orders assigned to NP by admin -- can toggle completed*/}
              <div className="col mt-3">
                <div className="row">
                  <div className="col">
                    <div
                      className="container-fluid bg-light"
                      style={{ border: "solid 1px black" }}
                    >
                      <div className="row my-3">
                        <div className="col">
                          <h5>Current Orders</h5>
                        </div>
                        <div className="col-auto d-flex justify-content-end">
                          <Button
                            onClick={refreshCurrentOrders}
                            style={{ backgroundColor: "#364f6b" }}
                          >
                            Refresh
                          </Button>
                        </div>
                        <div className="col-auto d-flex justify-content-end">
                          <Button
                            id="mark-incomplete"
                            onClick={updateOrderStatus}
                            variant="danger"
                          >
                            Mark Incomplete
                          </Button>
                        </div>
                        <div className="col-auto d-flex justify-content-end">
                          <Button
                            id="mark-completed"
                            onClick={updateOrderStatus}
                            variant="success"
                          >
                            Mark Completed
                          </Button>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          {/* Successfully updated order status modal */}
                          <Modal
                            show={showSuccessUpdateOrderStatus}
                            onHide={handleCloseSuccessUpdateOrderStatusModal}
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
                                  <span>Order status updated successfully</span>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>

                          <DataGrid
                            rows={orderTableRows}
                            columns={orderTableHeader}
                            initialState={{
                              pagination: { paginationModel: { pageSize: 10 } },
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

              {/* New Orders assigned to NP by admin -- can accept/reject  */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPDashboard;
