import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContextProvider";
import UserDashboardCSS from "./style-modules/UserDashboard.module.css";

const UserDashboard = () => {
  const { user } = useAuthContext();

  return (
    <div className="container-fluid gx-0">
      <div className="row mx-auto">
        <div className="col-sm-5 col-md-4 col-lg-3 col-xl-2 border p-3">
          <h4 className={UserDashboardCSS.userNameHeading}>Hi, {user.name}</h4>
          <ul className={UserDashboardCSS.userServicesList}>
            <Link to="edit-profile">
              <li>Edit Profile</li>
            </Link>
            <Link to="cards-payments">
              <li>Cards &amp; Payments</li>
            </Link>
            <Link to="">
              <li>Courses Opted</li>
            </Link>
            <Link to="change-password">
              <li>Change Password</li>
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

export default UserDashboard;
