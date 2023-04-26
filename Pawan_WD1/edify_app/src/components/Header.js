import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo1.png";
// includes global css rules DO NOT remove
import styles from "./Header.module.css";

import { ROLES, useAuthContext } from "../contexts/AuthContextProvider";
import AuthService from "../services/AuthService";

const Header = () => {
  const { user } = useAuthContext();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link to="/" className="navbar-brand" title="Edify Logo">
            <img src={logo} alt="" width={70} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarText"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/courses"} className="nav-link">
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/about"} className="nav-link">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/contact"} className="nav-link">
                  Contact Us
                </Link>
              </li>
              {user ? (
                <>
                  {user.role === ROLES.Admin && (
                    <li className="nav-item">
                      <Link to={"/admin-dashboard"} className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {user.role === ROLES.User && (
                    <li className="nav-item">
                      <Link to={"/user-dashboard"} className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to={"/"}
                      onClick={() => {
                        AuthService.logout();
                        window.location.replace("/");
                      }}
                      className="nav-link"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to={"/sign-in"} className="nav-link">
                      Sign In
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/sign-up"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
