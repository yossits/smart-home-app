import React from "react";

import Device from "./Device.jsx";
import DeviceConnectivity from "./DeviceConnectivity.jsx";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to home page!</p>
      <Device/>
      <DeviceConnectivity/>
    </div>
  );
};

export default Home;
