import React from "react";
import male1 from '../Images/male-photo1.jpg';
import male2 from '../Images/male-photo2.jpg';
import male3 from '../Images/male-photo3.jpg';


import "./TestimonialStyle.css";


const Testimonial = () => {
    return (
        <>
            <section id="testimonials">
                <h2 className="testimonial-title">Learner Reviews</h2>
                <div className="testimonial-container container">
                    <div className="testimonial-card-container ">
                        <div className="testimonial-card-item">
                            <div className="testimonial-image">
                                <img src={male1} alt="" />
                            </div>
                            <div className="testimonial-description">
                                <p className="testimonial-text" >Niraj Kumar</p>
                                <p>Software Engineer</p>
                                <p>Global Logic- Hitachi</p>
                            </div>
                        </div>
                        <p className="testimonial-text"> "For everyone who wants to level up their #Coding and #Dev skills- seriously, this training is for you! Both basic and advanced stacks are covered on this training and one can learn according to his skill levels.I can assure you that it'll be worth it."</p>
                    </div>
                    <div className="testimonial-card-container">
                        <div className="testimonial-card-item">
                            <div className="testimonial-image">
                                <img src={male2} alt="" />
                            </div>
                            <div className="testimonial-description">
                                <p>Shivam Singh</p>
                                <p>Software Engineer</p>
                                <p>Goldman Sachs</p>
                            </div>
                        </div>
                        <p className="testimonial-text"> "Despite being from a tier 3 college, I would like to thank my mentors & teachers who helped me land a job at Goldman Sachs.My experience with this training was wonderful.The courses strengthened my concepts and helped me in my interviews.The faculty was amazing."</p>
                    </div>
                    <div className="testimonial-card-container ">
                        <div className="testimonial-card-item">
                            <div className="testimonial-image">
                                <img src={male3} alt="" />
                            </div>
                            <div className="testimonial-description">
                                <p>Aryan Pandey</p>
                                <p>Full Stack Developer</p>
                                <p>LTI</p>
                            </div>
                        </div>
                        <p className="testimonial-text"> "The program has been very helpful and
                                my experience with this program and
                                student mentors has been very good. The
                                program has taught me a lot. The content
                                taught is very relatable and it relates with
                                the current scenario."</p>
                    </div>
                    
                    
                </div>
            </section>
        </>
    );
};

export default Testimonial;