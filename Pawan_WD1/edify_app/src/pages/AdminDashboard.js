import React from "react";
import AdminDashboardCSS from "./style-modules/AdminDashboard.module.css";
import { useAuthContext } from "../contexts/AuthContextProvider";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="container-fluid gx-0">
      <div className="row mx-auto">
        <div className="col-sm-5 col-md-4 col-lg-3 col-xl-2 border p-3">
          <h3 className={AdminDashboardCSS.adminNameHeading}>
            Hi {user.name}
          </h3>
          <ul className={AdminDashboardCSS.adminServicesList}>
            <Link to="">
              <li className="item">Edit Profile</li>
            </Link>
            <Link to="user-management">
              <li className="item">User Management</li>
            </Link>
            <Link to="course-management">
              <li className="item">Course Management</li>
            </Link>
            <Link to="enrollment-management">
              <li className="item">Enrollment Management</li>
            </Link>
            <Link to="razorpay-settings">
              <li className="item">Razorpay Settings</li>
            </Link>
            <Link to="change-password">
              <li className="item">Change Password</li>
            </Link>
          </ul>
        </div>
        <div className="col-sm-7 col-md-8 col-lg-9 col-xl-10 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
