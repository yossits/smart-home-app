import React from "react";
import axios from "axios";

const DeviceButton = ({ ledMode }) => {

  const url = "https://rnid6720yh.execute-api.eu-central-1.amazonaws.com";

  const handleButtonClick = () => {
    axios
      .post(`${url}/postshadow`, { mode: ledMode === 1 ? 0 : 1 })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <button onClick={handleButtonClick}>Turn on/off</button>;
};

export default DeviceButton;
