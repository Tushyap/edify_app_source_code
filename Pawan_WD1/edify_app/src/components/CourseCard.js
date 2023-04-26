import React from "react";
import CourseCardCSS from "./CourseCard.module.css";

export const CourseCard = ({ individualCourse }) => {

  const firstPragraph = (content, take = 130) => {
    let document = new DOMParser().parseFromString(content, "text/html");
    return (
      document.querySelector("p")?.textContent.substring(0, take) ||
      "No description specified!"
    );
  };

  return (
    <div className={CourseCardCSS.course}>
      <div className={CourseCardCSS.logoCourseInfo}>
        <div
          style={{
            backgroundImage: `url(${individualCourse.cardPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "skyblue",
            boxSizing: "border-box",
            backgroundRepeat: "no-repeat",
            height: "90px",
            width: "100px",
          }}
        ></div>
        <div className={CourseCardCSS.courseInfo}>
          <p>{individualCourse.name}</p>
          <p>
            <span>Duration</span>: {individualCourse.duration} months
          </p>
          <p>
            <span>Price</span>: {individualCourse.price}
          </p>
        </div>
      </div>

      <div className={CourseCardCSS.courseDetail}>
        <div>{firstPragraph(individualCourse.description)}</div>
      </div>
    </div>
  );
};