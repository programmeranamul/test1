import { Outlet, Navigate, useLocation } from "react-router-dom";

function AdminOutlet() {
  const user = JSON.parse(localStorage.getItem("user"));

  return <>{user.role === "admin" ? <Outlet /> : <Navigate to="/" />}</>;
}

export default AdminOutlet;
