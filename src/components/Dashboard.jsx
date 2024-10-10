import React from "react";

import Device from "./Device.jsx";
import DeviceConnectivity from "./DeviceConnectivity.jsx";
import withAuth from "../auth/withAuth.js";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Dashboard page!</p>
      <Device/>
      <DeviceConnectivity/>
    </div>
  );
};

export default withAuth(Dashboard);
