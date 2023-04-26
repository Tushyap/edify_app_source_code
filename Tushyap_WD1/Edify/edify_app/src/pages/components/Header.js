import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from '../Images/logo1.png';
import './HeaderStyle.css';

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <section className="navbar-bg">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container">
            <NavLink className="navbar-brand" to= "/">
             <img className="logoImg" src={logo} alt="logo" />           
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={() => setShow(!show)}>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${show ? "show" : ""}`}>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link "  to="/">
                    Home
                  </NavLink>
                </li>
                
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    Courses
                  </NavLink>
                </li>
                
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                <button className="butn-primary" type="submit">
                <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </button>
                </li>
                <li className="nav-item">
                <button className="butn-primary" type="submit">
                <NavLink className="nav-link" to="/signin">
                    Sign In
                  </NavLink>
                </button>
                </li>
              </ul>
              {/* <div className="d-flex">
                <button className="btn  buttn-style" type="submit">
                <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </button>
                <button className="btn  buttn-style buttn-style-border" type="submit">
                <NavLink className="nav-link" to="/login">
                    Sign In
                  </NavLink>
                </button>
              </div> */}
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Header;
