import React, { useState, useEffect } from "react";
import { CourseEnrolledCard } from "../components/UserEnrolledCard";
import { Container, } from 'react-bootstrap';
import api from "../services/Api";
import { useAuthContext } from "../contexts/AuthContextProvider";



// TODO: fetch the courses opted for user
const CoursesOpted = () => {
  const { user } = useAuthContext();
  console.log(user)
  const [enrolCourse, setEnrolCourse] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // getUserDetails();
    getEnrolCourse();
  }, []);

  // const getUserDetails = async () => {
  //   try {
  //     const response = await api.get("/auth/me");

  //     if (response.status === 200) { 
  //       setEmail(response.data.email);
  //       console.log(response.data.email)
  //       setError(null);
  //     } else {
  //       setError("An error occured while fetching courses!");
  //     }
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getEnrolCourse = async () => {

    const getUser = {
      email: user.email

    }
    console.log(user.email)
    try {
      const response = await api.put("/admin/singleEnrolUser/", JSON.stringify(getUser));

      if (response.status === 200) {
        setEnrolCourse(response.data);
       
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

  console.log("course opted", enrolCourse)
  return (
    <>
      {enrolCourse.length > 0 ? (<div>
        {error}
        {loading && <h1>Loading...</h1>}
        {enrolCourse.map((courseItem) => (
          <div className="" key={courseItem.slug}>
            <CourseEnrolledCard
              key={courseItem.slug}
              individualEnrolCourse={courseItem}
            />
          </div>
        ))}
      </div>) : (<div >
        <Container fluid="lg" className="my-4 p-4">
          <div className="col-12 text-center">
            <h5> Level up your skills and take the next step in your career with our courses.</h5>
          </div>
        </Container>
      </div>)}

    </>
  );
};

export default CoursesOpted;
