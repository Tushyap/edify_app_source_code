import React from "react";
import logo from '../Images/logo1.png';
import { NavLink } from "react-router-dom";
import './NavbarStyle.css';
function Navbar() {
    return (
        <>
            <nav className="navbarr">
                <div className="navbarr-container container">
                    <input type="checkbox" />
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>
                    <ul className="menu-items">
                        <li className="">
                            <NavLink className="" to="/">
                                Home
                            </NavLink>
                        </li>

                        <li className="">
                            <NavLink className="" to="/about">
                                Courses
                            </NavLink>
                        </li>

                        <li className="">
                            <NavLink className="" to="/contact">
                                Contact
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink className="" to="/signup">
                                Sign Up
                            </NavLink>
                        </li>

                        <li className="">
                            <NavLink className="" to="/signin">
                                Sign In
                            </NavLink>
                        </li>
                    </ul>
                    <NavLink className="" to="/">
                        <img className="logoImg logo" src={logo} alt="logo" />
                    </NavLink>

                </div>
            </nav>
        </>
    );
}

export default Navbar;