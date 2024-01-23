import React, { useEffect, useState } from "react";
import axios from "axios";

const DeviceConnectivity = () => {
  const [isDeviceOnline, setIsDeviceOnline] = useState(false);

  const getCurrentConnectivity = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/connectivity`);
      setIsDeviceOnline(response.data.connectivity);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCurrentConnectivity()
    },10000);
    return () => clearInterval(interval)
  }, [isDeviceOnline]);

  return <div>device is {isDeviceOnline ? "online" : "offline"}</div>;
};

export default DeviceConnectivity;
