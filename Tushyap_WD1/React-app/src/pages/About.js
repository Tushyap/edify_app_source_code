import React from 'react';
import { NavLink } from 'react-router-dom';
import Footer from './components/Footer';
import pic3 from "./Images/pic3.jpg";
import about1 from "./Images/about-1.jpg";
import about2 from "./Images/about-2.jpg";
import about3 from "./Images/about-3.jpg";
import male4 from "./Images/male-photo4.jpg";
import male5 from "./Images/male-photo5.jpg";
import male6 from "./Images/male-photo6.jpg";
import './AboutStyle.css';


function About() {
  return (
    <React.Fragment>
      
      
    
      <section id="about">
        <div className="about-wrapper container">
            <div className="about-text">
                <p className="small">About Us</p>
                <h2>We deal with the aspects of
                    professional IT Services</h2>
                <p>Get world-class training and development programs developed by top universities and companies.We
                    believe in providing clients with the highest level of service. That's why we invest a lot of time
                    trying to understand our clients' needs and coming up with solutions accordingly.</p>
            </div>
            <div className="about-img">
                <img src={pic3} alt="About Us"/>
            </div>
        </div>
    </section>
    <section id="about">
        <div className=" about-wrapper container">
            <div className="about-text about-content">
                <h2>Changing learning for the better</h2>
                <p>Whether you want to learn or to share what you know, you`ve come to the right place. As a global
                    destination for online learning, we connect people through knowledge.</p>
            </div>
        </div>
        <div className="container Testimonial-form">
            <div className="heading">
                <h2>Our leaders</h2>
                <p>We share knowledge with the world!</p>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="single-box">
                                            <div className="img-area"><img src={male4} alt=""/></div>
                                            <div className="img-text">
                                                <h3>Parag Agrawal -ceo</h3>
                                                
                                                <p className="img-text-p">"I strongly believe all students should have a startup during college. Doesn't matter if successful or how big or small. 
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="single-box">
                                            <div className="img-area"><img src={male5} alt=""/></div>
                                            <div className="img-text">
                                                <h3>John - Project Manager </h3>
                                                <p className="img-text-p">
                                                    "It is extremely important to build something that a 100 people absolutely love using rather than making something that a 1000 people would just, kind of, like."
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="single-box">
                                            <div className="img-area"><img src={male6} alt=""/></div>
                                            <div className="img-text">
                                                <h3>Joe - Senior Developer </h3>
                                                <p className="img-text-p">"If people are not laughing at your goals, your goals are too small"
                                                    "Leadership is the self-confidence of working with people smarter than you."
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container my-4">
            <div className="row featurette d-flex  justify-content-centre align-items-center">
                <div className="col-md-7 order-md-2 my-3">
                    <h2 className="featurette-heading">We started Tech Ninja in 2020. Work with Us</h2>
                    <p className="lead my-3">At Tech Ninja, we`re all learners and instructors. We live out our values every day
                        to create a culture that is diverse, inclusive, and committed to helping employees thrive</p>
                </div>
                <div className="col-md-5 order-md-1">
                    <img className="img-fluid" src={about1} alt=""/>
                </div>
            </div>
            <div className="row featurette d-flex  justify-content-centre align-items-center">
                <div className="col-md-7 order-md-2 my-4">
                    <h2 className="featurette-heading">See Our Research. <NavLink to="/about" className="about-anchor"> See more</NavLink>
                    </h2>
                    <p className="lead my-3">We`re committed to changing the future of learning for the better. Dig into our
                        original research to learn about the forces that are shaping the modern workplace.</p>
                </div>
                <div className="col-md-5 order-md-2">
                    <img className="img-fluid" src={about2} alt=""/>

                </div>
            </div>
            <div className="row featurette d-flex  justify-content-centre align-items-center">
                <div className="col-md-7 order-md-2 my-4">
                    <h2 className="featurette-heading">Read Our Blogs <NavLink to="/about" class="about-anchor"> See more</NavLink></h2>
                    <p className="lead my-3">Want to know what we`ve been up to lately? Check out the Tech Ninja blog to get the scoop
                        on the latest news, ideas and projects, and more</p>
                </div>
                <div className="col-md-5 order-md-1">
                    <img className="img-fluid" src={about3} alt=""/>

                </div>
            </div>
        </div>
    </section>
    <Footer/>
      
     
    </React.Fragment>
  );
}

export default About;
