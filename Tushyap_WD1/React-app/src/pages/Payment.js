import React from "react";
import './PaymentStyle.css';
import Footer from './components/Footer'

function Payment() {
    return (
        <>
        <div className="wrapper">
            <div className="mainDiv">
                <h2 className=" mainHeading"> Checkout Form</h2>
                <div className="row">
                    <div className="col-75">
                        <div className="container">
                            <form action="/action_page.php">
                                <div className="row">
                                    <div className="col-50">
                                        <h3>Billing Address</h3>
                                        <label for="fname"><i className="fa fa-user"></i> Full Name</label>
                                        <input type="text" id="fname" name="firstname" placeholder="Name" />
                                        <label for="email"><i className="fa fa-envelope"></i> Email</label>
                                        <input type="text" id="email" name="email" placeholder="Email" />
                                        <label for="adr"><i className="fa fa-address-card-o"></i> Address</label>
                                        <input type="text" id="adr" name="address" placeholder="" />
                                        <label for="city"><i className="fa fa-institution"></i> City</label>
                                        <input type="text" id="city" name="city" placeholder="" />
                                        <div className="row">
                                            <div className="col-50">
                                                <label for="state">State</label>
                                                <input type="text" id="state" name="state" placeholder="" />
                                            </div>
                                            <div className="col-50">
                                                <label for="zip">Zip</label>
                                                <input type="text" id="zip" name="zip" placeholder="" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-50 payment">
                                        <h3>Payment</h3>
                                        <label for="fname">Accepted Cards</label>
                                        <div className="icon-container">
                                            <i className="fa fa-cc-visa" style={{ color: "navy" }}></i>
                                            <i className="fa fa-cc-amex" style={{ color: "blue" }}></i>
                                            <i className="fab fa-cc-amazon-pay" style={{ color: "navy" }}></i>
                                            <i className="fa fa-cc-mastercard" style={{ color: "red" }}></i>
                                            <i className="fa fa-cc-discover" style={{ color: "orange" }}></i>
                                        </div>
                                        <label for="cname">Name on Card</label>
                                        <input type="text" id="cname" name="cardname" placeholder="Credit Card" />
                                        <label for="ccnum">Credit card number</label>
                                        <input type="text" id="ccnum" name="cardnumber" placeholder="____ ____ ____ ____" />
                                        <label for="expmonth">Expiry Month</label>
                                        <input type="text" id="expmonth" name="expmonth" placeholder="MM" />
                                        <div className="row">
                                            <div className="col-50">
                                                <label for="expyear">Expiry Year</label>
                                                <input type="text" id="expyear" name="expyear" placeholder="YY" />
                                            </div>
                                            <div className="col-50">
                                                <label for="cvv">CVV</label>
                                                <input type="text" id="cvv" name="cvv" placeholder="922" />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                
                            </form>
                            <div className="signin">
                                    <button className="signin-button" onclick="validate()"> <a href="#">Continue To
                                        Checkout</a></button>
                                </div>
                        </div>
                    </div>
                    <div className="col-25">
                        <div className="container">
                            <h3>Cart <span className="price" style={{ style: "black" }} ><i className="fa fa-shopping-cart"></i> <b>1</b></span>
                            </h3>
                            <h4><a href="#">Course Price</a> <span className="price">$15</span></h4>
                            <h4><a href="#">Discount</a> <span className="price">-$5</span></h4>
                            <h4><a href="#">Tax</a> <span className="price">$1</span></h4>

                            <hr />
                            <h4>Total <span className="price" style={{ style: "black" }}><b>$11</b></span></h4>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default Payment;