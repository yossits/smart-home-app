import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Device from "./Device.jsx";
import DeviceConnectivity from "./DeviceConnectivity.jsx";

import withAuth from "../auth/withAuth.js";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // קבלת ה-JWT
      if (!token) {
        navigate("/"); // אם אין טוקן, הפניה לעמוד 
        return;
      }

      try {
        const response = await fetch(
          "https://www.tsarfati-yosef.com/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`, // שליחת ה-Token ב-Header
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setMessage(data.message); // הצגת הודעה ממסלול ה-Backend המוגן
        } else {
          alert("Unauthorized");
          navigate("/");
        }
      } catch (error) {
        alert("Error fetching dashboard data");
      }
    };

    fetchData();
  }, [navigate]);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>
      <Device />
      <DeviceConnectivity />
    </div>
  );
};

export default withAuth(Dashboard);
