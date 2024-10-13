import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // מחיקת ה-Token מה-localStorage
    localStorage.removeItem("token");
    window.dispatchEvent(new Event('storage')); // עדכון ה-NAV
    // הפניה לעמוד ההתחברות
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
};

export default Logout;