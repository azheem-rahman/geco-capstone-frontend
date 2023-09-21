import React from "react";
import NavBar from "../NavBar/NavBar";

const NPDashboard = () => {
  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <NavBar />
      <div className="container-fluid mt-3">
        <div className="row">
          <h5>Good Day, ProfileName!</h5>
          <h6>Here's what's happening today.</h6>
          {/* List of Quick Actions */}
          <div className="col-2 mt-3">
            <div
              className="container bg-light"
              style={{ border: "solid 1px black" }}
            >
              <h5>Quick Actions</h5>
            </div>
          </div>

          {/* see orders assigned to user > 2 categories -- New Orders and Existing Orders > new orders can accept/reject, existing orders can toggle completed*/}
          {/* if got time, can sort existing orders based on assigned date */}
          <div className="col mt-3">
            <div
              className="container bg-light"
              style={{ border: "solid 1px black" }}
            >
              <h5>New Orders</h5>
            </div>
          </div>

          {/* Display NPs that J has assigned to each of these orders */}
          <div className="col mt-3">
            <div
              className="container bg-light"
              style={{ border: "solid 1px black" }}
            >
              <h5>Current Orders</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPDashboard;
