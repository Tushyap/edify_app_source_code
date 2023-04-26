import React from "react";
import {NavLink} from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className="bg-dark text-white pt-5 pb-4">
                <div className="container text-centre text-md-left">
                    <div className="row text-centre text-md-left">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h2 className="text-uppercase mb-4 font-weight-bold text-warning" >Tech Ninja</h2>
                            <h3 style={{color:"#fff"}}>Whether you want to learn or to share what you know, you`ve come to the right place. As a global destination for online learning, we connect people through knowledge.</h3>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h3 className="text-uppercase mb-4 font-weight-bold text-warning">Products</h3>
                            <h4><NavLink  className="text-white"  to="/" style={{textDecoration: 'none' }}>UI Design</NavLink></h4>
                            <h4><NavLink  className="text-white"  to="/" style={{textDecoration: 'none'}}>Plugin Design</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Web Development</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>MERN Stack</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Bootstrap</NavLink></h4>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h2 className="text-uppercase mb-4 font-weight-bold text-warning">Useful Links</h2>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Your Account </NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Affiliate</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Terms</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Help and Support</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Privacy Policy</NavLink></h4>
                            <h4><NavLink  className="text-white" to="/" style={{textDecoration: 'none'}}>Career</NavLink></h4>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h2 className="text-uppercase mb-4 font-weight-bold  text-warning">Contacts</h2>
                            <h4 className="text-white"><i className="fas fa-home mr-3 my-2"></i> 320, Sector-D, AalamBag Lucknow </h4>
                            <h4 className="text-white"><i className="fas fa-envelope mr-3 my-2"></i> tushyap@gmail.com</h4>
                            <h4 className="text-white"><i className="fas fa-phone mr-3 my-2"></i> +91 8945434556 </h4>
                            <h4 className="text-white"><i className="fas fa-print mr-3 my-2"></i> +01 335 633 77 </h4>

                        </div>
                    </div>
                    <hr className="mb-4" />
                    <div className="row align-items-center">
                        <div className="col-md-7 col-lg-8">
                            <h3 className="text-white">Copyright @2021 All rights reserved by: <NavLink to="/" style={{textDecoration: 'none'}}>
                                <strong className="text-warning">Tech Ninja </strong></NavLink></h3>
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