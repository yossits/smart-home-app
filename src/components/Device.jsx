import React, { useState, useEffect } from "react";
import axios from "axios";

const Device = () => {
  const [shadowData, setShadowData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/getshadow`);
        setShadowData(response.data.led);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = () => {
    axios
      .post(`${process.env.REACT_APP_URL}/postshadow`, { mode: shadowData === 1 ? 0 : 1 })
      .then((response) => {
        console.log(response);
        setShadowData(shadowData === 1 ? 0 : 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let statusLed = null
  if (shadowData === 1) {
    statusLed = "ON"
  } else if (shadowData === 0) {
    statusLed = "OFF"
  }

  return (
    <div>
      <h1>status led: {statusLed}</h1>
      <button onClick={handleButtonClick}>Turn {shadowData === 1 ? "OFF" : "ON"}</button>
    </div>
  );
};

export default Device;