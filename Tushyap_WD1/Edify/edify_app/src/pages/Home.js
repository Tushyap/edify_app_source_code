import React from 'react';
import Cards from './components/Cards';
import Testimonial from './components/Testimonial';

import Footer from './components/Footer';
import pic3 from './Images/pic3.png';
import pic1 from './Images/pic1.jpg';
import pic2 from './Images/pic2.jpg';
import pic4 from './Images/pic4.jpg';
import pic5 from './Images/pic5.jpg';
import { NavLink } from 'react-router-dom';
import './HomeStyle.css';



const Home = () => {
    return (
        <>
            <div>
                <section className="about">
                    <div className="about-wrapper container">
                        <div className="about-text">

                            <h2>Be An Exceptional</h2>
                            <h3>“Learning to code is learning to create and innovate.”</h3>
                            <div>
                                <button className="btn-primary"> <NavLink to=''>Explore Our Programs</NavLink></button>
                            </div>
                        </div>
                        <div className="about-img">
                            <img className='spinning' src={pic3} alt="About Us" />
                        </div>

                    </div>
                </section>
                <section className="Course_card">
                    <h2 className="Course_card_h">Top Courses</h2>
                    <div className="MainCards container">
                        <div className="card1">
                            <Cards title="MERN Stack" imgSrc={pic1} description="Learn to build entire web applications from start to finish on one of the most versatile tech stacks : MongoDB, Express.js, React.js and Node.js (MERN stack)" />
                        </div>
                        <div className="card1">
                            <Cards title="Java FullStack" imgSrc={pic2} description="A Java full stack developer can build whole Java applications including front end, back-end, database, APIs, server and version control." />
                        </div>
                        <div className="card2">
                            <Cards title="Data Structure" imgSrc={pic4} description="The course is designed to improve your problem-solving and coding skills by enhancing your understanding of Data Structures & Algorithms." />
                        </div>
                        <div className="card2">
                            <Cards title="Android Development" imgSrc={pic5} description="Android app development course is designed to help beginners by walking them through a range of topics to understand what is android app development." />
                        </div>

                    </div>
                </section>
            </div>
            <Testimonial/>
            <Footer />
        </>
    )
}

export default Home;
