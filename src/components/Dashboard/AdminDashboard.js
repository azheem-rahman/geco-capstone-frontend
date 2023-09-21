import React from "react";
import NavBar from "../NavBar/NavBar";

const Dashboard = () => {
  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <NavBar />
      <div className="container-fluid mt-3">
        <div className="row">
          <h5>Good Day, ProfileName!</h5>
          <h6>Here's what's happening today.</h6>
          {/* List of Quick Actions */}
          <div className="col-3 mt-3">
            <div
              className="container bg-light"
              style={{ border: "solid 1px black" }}
            >
              <h5>Quick Actions</h5>
            </div>
          </div>

          {/* Display orders J has receive and stored in database > assign order button here + new order button at top right */}
          <div className="col mt-3">
            <div
              className="container bg-light"
              style={{ border: "solid 1px black" }}
            >
              <h5>Orders</h5>
            </div>
          </div>

          {/* Display NPs that J has assigned to each of these orders */}
          <div className="col-2 mt-3">
            <div
              className="container bg-light"
              style={{ border: "solid 1px black" }}
            >
              <h5>Network Partners</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
