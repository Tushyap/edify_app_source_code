import React from "react";
import { NavLink } from "react-router-dom";

import CardItem from "../components/CardItem";
import TestimonialItem from "../components/TestimonialItem";

import pic3 from "../images/pic3.png";
import pic1 from "../images/pic1.jpg";
import pic2 from "../images/pic2.jpg";
import pic4 from "../images/pic4.jpg";
import pic5 from "../images/pic5.jpg";

import styles from "./style-modules/Home.module.css";

const Home = () => {
  return (
    <>
      <section className={`${styles.about} text-center`}>
        <div className={`container ${styles["about-wrapper"]}`}>
          <div className={styles["about-text"]}>
            <h2>Be An Exceptional</h2>
            <h3>“Learning to code is learning to create and innovate.”</h3>
            <NavLink to="/" className={styles["btn-primary"]}>
              Explore Our Programs
            </NavLink>
          </div>
          <div className={styles["about-img"]}>
            <img className={styles.spinning} src={pic3} alt="About Us" />
          </div>
        </div>
      </section>

      <section className={styles["top-courses"]}>
        <div className="container">
          <div className="row justify-content-center py-5">
            <h2 className="text-center pb-3">Top Courses</h2>
            <CardItem title="Complete Java" image={pic1} url={"/course-detail/50002"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla saepe similique officiis modi cupiditate, provident porro repudiandae corporis aliquid.
            </CardItem>
            <CardItem title="C and  C++" image={pic2} url={"/course-detail/50001"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla saepe similique officiis modi cupiditate, provident porro repudiandae corporis aliquid.
            </CardItem>
            <CardItem title="Data Structure" image={pic4} url={"/course-detail/50008"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla saepe similique officiis modi cupiditate, provident porro repudiandae corporis aliquid.
            </CardItem>
            <CardItem title="Expert in JavaScript" image={pic5} url={"/course-detail/50004"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam nulla saepe similique officiis modi cupiditate, provident porro repudiandae corporis aliquid.
            </CardItem>
          </div>
        </div>
      </section>

      {/* testimonial items section */}
      <section className={styles["testimonialItems"]}>
        <div className="container">
          <div className="row justify-content-center py-3">
            <h2 className="text-center pb-3">Learner Reviews</h2>
            <TestimonialItem
              fullname="Mary P. Hughes"
              position="Software Engineer"
              company="Global Logic- Hitachi"
              image="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            >
              For everyone who wants to level up their #Coding and #Dev skills-
              seriously, this training is for you! Both basic and advanced
              stacks are covered on this training and one can learn according to
              his skill levels.I can assure you that it'll be worth it.
            </TestimonialItem>
            <TestimonialItem
              image="https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
              fullname="Niraj Kumar"
              position="Software Engineer"
              company="Goldman Sachs"
            >
              "Despite being from a tier 3 college, I would like to thank my
              mentors & teachers who helped me land a job at Goldman Sachs.My
              experience with this training was wonderful.The courses
              strengthened my concepts and helped me in my interviews."
            </TestimonialItem>

            <TestimonialItem
              image="https://images.unsplash.com/photo-1536104968055-4d61aa56f46a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=500&q=60"
              fullname="Christopher Rosson"
              position="SDE"
              company="IBM"
            >
              "The program has been very helpful and my experience with this
              program and student mentors has been very good. The program has
              taught me a lot. The content taught is very relatable and it
              relates with the current scenario."
            </TestimonialItem>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
