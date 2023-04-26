import React, { useContext, useEffect, useState } from "react";
import { CourseCard } from "../components/CourseCard";
// DO NOT remove it. It contains css rule for id="courses-page-banner"
import AllCoursesCSS from "./style-modules/AllCourses.module.css";
import { Link } from "react-router-dom";
import api from "../services/Api";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCourses = async () => {
    try {
      const response = await api.get("courses");

      if (response.status === 200) { 
        setCourses(response.data);
        setError(null);
      } else {
        setError("An error occured while fetching courses!");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className={AllCoursesCSS.allCourses}>
      <section id="courses-page-banner" className="py-5">
        <div className="container">
          <h1 className={AllCoursesCSS.allCoursesHeading}>
            Edify offers a range of courses and training programs
          </h1>
          <blockquote className={AllCoursesCSS.quotation}>
            Learn Continually - there's always "one more thing" to learn!
          </blockquote>
          <p className={AllCoursesCSS.quotePerson}>- Steve Jobs</p>
        </div>
      </section>

      {/* course-items */}
      <section className={AllCoursesCSS.cardsOverall}>
        <div className="container">
          <div className="row g-4 mt-3">
            {error}
            {loading && <h1>Loading...</h1>}
            {courses.map((courseItem) => (
              <div className="col-lg-4 col-md-6" key={courseItem.slug}>
                <Link to={`/course-detail/${courseItem.slug}`}>
                  <CourseCard
                    key={courseItem.slug}
                    individualCourse={courseItem}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllCourses;
