import React from "react";
import styles from "./style-modules/About.module.css";

export default function About() {
  return (
    <>
      <section className={styles.video}>
        {/* <video
          src="https://videos.ctfassets.net/00atxywtfxvd/5JIGQtPRwvNIcLLoqpypqR/048c52187728363b7b059ef53e10a711/Anthem_V6.mp4"
          autoPlay
          loop
          playsInline
          muted
        ></video> */}
        <img
          src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
        <div className="container">
          <h1>Our Vision</h1>
          <br />
          <h3>
            The <b>stuggle</b> you're in <b>today</b> is developing the{" "}
            <b>strength</b> you need for <b>tomorrow </b>
            <b>transform their life through learning</b>.
          </h3>
        </div>
      </section>

      <section className={styles.ourstory}>
        <div className="container">
          <div className="row">
            <div className="col-lg">
              <div>
                <h1 className="my-3">About Us</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </div>
            <div className="col-lg">
              <img
                src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="about us"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ourstory}>
        <div className="container">
          <div className="row">
            <div className="col-lg">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="about us"
                className="img-fluid"
              />
            </div>
            <div className="col-lg">
              <div>
                <h1 className="my-3">Our Story</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container team">
        <div className={styles.teamTitle}>
          <h1>Our Team</h1>
        </div>
        <div className="row">
          <div className={`col-md ${styles.teamItem}`}>
            <img
              src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=797&q=80"
              alt=""
            />
            <b>Mehmet Kalaycı</b>
            <p>Software Developer</p>
          </div>

          <div className={`col-md ${styles.teamItem}`}>
            <img
              src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=797&q=80"
              alt=""
            />
            <b>Mehmet Kalaycı</b>
            <p>Software Developer</p>
          </div>

          <div className={`col-md ${styles.teamItem}`}>
            <img src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=797&q=80" />
            <b>Mehmet Kalaycı</b>
            <p>Software Developer</p>
          </div>

          <div className={`col-md ${styles.teamItem}`}>
            <img src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=797&q=80" />
            <b>Mehmet Kalaycı</b>
            <p>Software Developer</p>
          </div>

          <div className={`col-md ${styles.teamItem}`}>
            <img src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=797&q=80" />
            <b>Mehmet Kalaycı</b>
            <p>Software Developer</p>
          </div>
        </div>
      </section>

      <section className={styles.statistics}>
        <div className="container">
          <div className="row">
            <div className="col-3">
              60 <br /> Courses
            </div>
            <div className="col-3">
              10 <br /> Instructors
            </div>
            <div className="col-3">
              360 <br /> Students
            </div>
            <div className="col-3">
              4800 <br /> Alumni
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
