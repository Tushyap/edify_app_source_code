import React from "react";
import logo from '../Images/logo1.png';
import {NavLink} from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className=" text-white pt-5 pb-4" style={{backgroundColor:"#040B47"}}>
                <div className="container text-centre text-md-left">
                    <div className="row text-centre text-md-left">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            {/* <h2 className="text-uppercase mb-4 font-weight-bold text-white" >Edify</h2> */}
                            <NavLink to=''>
                            <img style={{marginLeft:"100px"}} className="logoImg" src={logo} alt="logo" />
                            </NavLink>
                            <h3 style={{color:"#fff",marginTop:"30px"}}>Changing Learning For The Better</h3>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h2 className=" mb-4 font-weight-bold text-white">Edify</h2>
                            <h4><NavLink  className="text-white"  to="/" style={{textDecoration: 'none' }}>About Us</NavLink></h4>
                            <h4><NavLink  className="text-white"  to="/" style={{textDecoration: 'none'}}>Privacy Policy</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Terms & Conditions</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Pricing & Refund Policy</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Our Student</NavLink></h4>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h2 className=" mb-4 font-weight-bold text-white">Useful Links</h2>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Your Account </NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Courses</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Try Courses For Free</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Help and Support</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Career</NavLink></h4>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h2 className="mb-4 font-weight-bold  text-white">Contacts</h2>
                            <h4 className="text-white"><i className="fas fa-home mr-3 my-2"></i> 320, Sector-D, AalamBag Lucknow </h4>
                            <h4 className="text-white"><i className="fas fa-envelope mr-3 my-2"></i> edify@gmail.com</h4>
                            <h4 className="text-white"><i className="fas fa-phone mr-3 my-2"></i> +91 8945434556 </h4>
                            

                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="row align-items-center">
                        <div className="col-md-7 col-lg-8">
                            <h5 className="text-white mx-4">Copyright @2021 All rights reserved by: <NavLink to="/" style={{textDecoration: 'none'}}>
                                <strong className="text-white">Edify </strong></NavLink></h5>
                        </div>
                        <div className="col-md-5 col-lg-4">
                            <div className="text-center text-md-right">
                                <ul className="list-unstyled list-inline">
                                    <li className="list-inline-item">
                                        <NavLink  className="btn-floating btn-sm text-white" to="/" style={{fontSize:"23px"}}>
                                            <i className="fab fa-facebook"></i>
                                        </NavLink>
                                    </li>
                                    <li className="list-inline-item">
                                        <NavLink to="/" className="btn-floating btn-sm text-white" style={{fontSize:"23px"}}>
                                            <i className="fab fa-twitter"></i>
                                        </NavLink>
                                    </li>
                                    <li className="list-inline-item">
                                        <NavLink  to="/" className="btn-floating btn-sm text-white" style={{fontSize:"23px"}}>
                                            <i className="fab fa-instagram"></i>
                                        </NavLink>
                                    </li>
                                    <li className="list-inline-item">
                                        <NavLink to="/" className="btn-floating btn-sm text-white" style={{fontSize:"23px"}}>
                                            <i className="fab fa-google-plus"></i>
                                        </NavLink>
                                    </li>
                                    <li className="list-inline-item">
                                        <NavLink to="/" className="btn-floating btn-sm text-white" style={{fontSize:"23px"}}>
                                            <i className="fab fa-youtube"></i>
                                        </NavLink>
                                    </li>
                                    <li className="list-inline-item">
                                        <NavLink to="/"  className="btn-floating btn-sm text-white" style={{fontSize:"23px"}}>
                                            <i className="fab fa-linkedin-in"></i>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;