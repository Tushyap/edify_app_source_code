import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from './components/Footer';
import office from "./Images/office.jpg";
import './ContactStyle.css';


function Contact() {
    return (
        <>
            <section className="contact-form">
                <div className="container">
                    <div className="form-wrapper">
                        <div className="company-address">
                            <div className="address-group">
                                <i className="fas fa-map-marker-alt fa-3x"></i>
                                <h2 className="text-gray md-heading">Location</h2>
                                <p className="address"> 340, Shivnagar sector-32 Lucknow UP</p>
                            </div>
                            <div className="address-group">
                                <i className="fas fa-envelope fa-3x "></i>
                                <h2 className="text-gray md-heading">Email</h2>
                                <p className="address"> baritushyap9120@gmail.com</p>
                            </div>
                            <div className="address-group">
                                <i className="fas fa-phone-square-alt fa-3x "></i>
                                <h2 className="text-gray md-heading">Call</h2>
                                <p className="address">+91 7905389142</p>
                            </div>
                            <img src={office} alt="" />
                        </div>
                        <form  className="form">
                            <h1 className="lg-heading text-black">Contact Us</h1>
                            <p className="text-gray address">Let us know your questions, suggestions and concerns by filling out the
                                contact form below</p>
                            <div className="form-group">
                                <svg className="svg-icon" viewBox="0 0 20 20">
                                    <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                                </svg>
                                <input type="" className="name-input" placeholder="Name" required />

                            </div>
                            <div className="form-group">
                                <svg className="svg-icon" viewBox="0 0 20 20">
                                    <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
                                </svg>
                                <input type="email" id="email" className="email-input" placeholder="Email" required />
                            </div>
                            <div className="form-group">
                                <svg className="svg-icon" viewBox="0 0 20 20">
                                    <path d="M14.911,1.295H5.09c-0.737,0-1.339,0.603-1.339,1.339v14.733c0,0.736,0.603,1.338,1.339,1.338h9.821c0.737,0,1.339-0.602,1.339-1.338V2.634C16.25,1.898,15.648,1.295,14.911,1.295 M15.357,17.367c0,0.24-0.205,0.445-0.446,0.445H5.09c-0.241,0-0.446-0.205-0.446-0.445v-0.893h10.714V17.367z M15.357,15.58H4.644V4.42h10.714V15.58z M15.357,3.527H4.644V2.634c0-0.241,0.205-0.446,0.446-0.446h9.821c0.241,0,0.446,0.206,0.446,0.446V3.527z"></path>
                                </svg>
                                <input type="phone" id="phone" className="phone-input" placeholder="Phone" required />
                            </div>
                            <div className="">
                            <label htmlFor="message">Message</label>
                                <textarea name="" id="message"></textarea>
                            </div>

                            <div className="button button-primary"> <NavLink to="/contact">Submit</NavLink> </div>
                        </form>

                    </div>
                </div>
            </section>


            <Footer />


        </>
    );
}

export default Contact;
