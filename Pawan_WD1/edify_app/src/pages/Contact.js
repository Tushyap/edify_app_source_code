import React from "react";
import styles from "./style-modules/Contact.module.css";

export default function Contact() {
  return (
    <>
      <section className={`${styles.banner}`}></section>
      <section className={styles.info}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-6">
              <h1 className="mb-5" style={{ padding: " 1rem 0" }}>
                Contact Us
              </h1>

              <p>Hey There</p>
              <h2 className="pb-4">Let's get in touch</h2>

              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-house-fill me-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                  ></path>
                </svg>
                320, Sector-D, AalamBag Lucknow
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-envelope-fill me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"></path>
                </svg>
                edify@gmail.com
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-telephone-fill me-2"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
                  ></path>
                </svg>
                +91 8945434556
              </p>
            </div>

            <div className="col-md-6 col-lg-6">
              <div className={styles.contactForm}>
                <h3>Fill the form</h3>
                <form>
                  <div className="mb-3">
                    <input
                      type="text"
                      className={styles.contactInput}
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      className={styles.contactInput}
                      placeholder="Email Address"
                    />
                  </div>

                  <div className="mb-3">
                    <textarea
                      className={styles.contactInput}
                      rows="3"
                      placeholder="Message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-light ${styles.btnSend}`}
                  >
                    Submit
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-chevron-right"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
