import { Outlet, Navigate, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "./../../data/BackEndData";

function PrivetOutlet() {
  const [logedIn, setLogedIn] = useState("loading");
  const location = useLocation();

  useEffect(() => {
    const checkToken = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) return setLogedIn(false);
      setLogedIn("loading");
      try {
        const valid = await axios.get(API + "/v1/valid", {
          headers: { Authorization: `bearer ${token}` },
        });

        setLogedIn(true);
      } catch (e) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setLogedIn(false);
      }
    };
    checkToken();
  }, [location]);

  return (
    <>
      {logedIn === "loading" ? (
       <div className="loding-container">
         <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
       </div>
      ) : logedIn ? (
        <Outlet />
      ) : (
        <Navigate to="/sing-in" />
      )}
    </>
  );
}

export default PrivetOutlet;
