import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../services/Api";
import Instructor from "../components/Instructor";
import { useAuthContext } from "../contexts/AuthContextProvider";

import styles from "./style-modules/CourseDetail.module.css";

export default function CourseDetailPage() {
  const navigate = useNavigate();

  const { slug } = useParams();
  const { user } = useAuthContext();

  const [course, setCourse] = useState([]);
  const [enrolledUser, setEnrolledUser] = useState({});
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  const getCourseDetail = async () => {
    try {
      const response = await api.get("courses/" + slug);

      setCourse(response.data);
      console.log("Course",response.data)
      setError(null);
    } catch (error) {
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  const getEnrolmentDetail = async () => {
    try {
      const response = await api.get("/admin/EnrolUser/");
      setEnrolledUser(response.data);
      console.log("Course Enrolled ",response.data.courseName)
      setError(null);
    } catch (error) {
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCourseDetail();
    getEnrolmentDetail();
  }, []);
  
  return (
    <>

      <section className={`${styles.banner}`}>
        <div
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${course.coverPhoto})` }}
        ></div>
        <div className={`container`}>
          <div className={`${styles.breadcrumb}`}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              {">"}
              <li>
                <Link to="/courses">Courses</Link>
              </li>
            </ul>
          </div>
          <h1 className={`pt-2`}>{course.name}</h1>
          <div className={`pt-5 ${styles.bannerTable}`}>
            <div className="row mb-2">
              <div className="col-3 col-lg-1">Duration</div>
              <div className="col">{course.duration} Month(s)
                {/* {
                  parseInt(course.duration) > 1 ? `${course.duration} Months`: `${course.duration} Month`  
                } */}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-3 col-lg-1">Price</div>
              <div className="col">{course.price}</div>
            </div>

            <div className="row mb-2">
              <div className="col-3 col-lg-1">Status</div>
              <div className="col">
                {course.status === "suspended" ? "Suspended" : "Available"}
              </div>
            </div>
            {(user.email !== enrolledUser.email || slug !== enrolledUser.slug || enrolledUser.userEnrolStatus !== "active" || course.name !== enrolledUser.courseName)? (<div className="row mt-5">
              <div className="col">
                {(course.status === "suspended" || user?.role === "admin")? (
                  ""
                ) : (
                  <button className={`btn btn-warning ${styles.enrollBtn}`}>
                    <Link to={"/user-dashboard/payments/" + course.slug}>
                      Enroll
                    </Link>
                  </button>
                )}
              </div>
            </div>):(<div> <h5 className="text-dark">{`You are already enrolled for ${course.name}. Check your Dashboard `} </h5></div> )}
            
          </div>
        </div>
      </section>

      <section className={`container pb-5 ${styles.content}`}>
        <h2>About This Course</h2>
        {error}
        {loading && <h1>Loading...</h1>}
        {/* TODO: clean html before rendering, open for XSS attacks */}
        
        <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
      </section>

      {course.instructors && (
        <section className={`container pb-5 ${styles.instructors}`}>
          <h2>Instructors</h2>
          {course.instructors?.map((instructor) => {
            if (instructor?.name) {
              return (
                <Instructor instructor={instructor} key={instructor._id} />
              );
            }
          })}
        </section>
      )}
    </>
  );
}