import React, { useState, useEffect } from "react";
import api from "../../services/Api";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Modal, Table, Container } from "react-bootstrap";

function ManageAllCourses() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState({});

  const [searchResults, setSearchResults] = useState(null);

  const getCourses = async () => {
    try {
      const response = await api.get("admin/courses");

      if (response.status === 200) {
        setCourses(response.data);
        setError(null);
      } else {
        setError("An error occured while fetching courses!");
      }
    } catch (error) {
      setError(error);
    }
  };

  const deleteCourse = async () => {
    try {
      const response = await api.delete("admin/courses/" + selectedCourse._id);

      if (response.status === 200 && response.data?.deletedCount === 1) {
        // if the record deleted update the courses array
        const newCourses = courses.filter(
          (item) => item._id !== selectedCourse._id
        );

        setCourses(newCourses);
        setSelectedCourse(null);
        handleClose();
        setError(null);
      } else {
        setError("An error occured while deleting the course!");
      }
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteButton = async (courseId) => {
    setSelectedCourse(courses.find((x) => x._id === courseId));
    handleShow();
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
  };

  const handleSearchByName = async (e) => {
    let searchTerm = e.target.value;

    if (searchTerm.length > 2) {
      const searchResults = courses.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(searchResults);
    } else {
      setSearchResults(null);
    }
  };

  const renderCourse = (course) => {
    return (
      <tr key={course._id}>
        <td>{course.name}</td>
        <td>{course.duration}</td>
        <td>{course.price}</td>
        <td>{course.instructors && course.instructors.map((i) => i.name)}</td>
        <td>{course.status}</td>
        <td>
          <Link
            to={`/admin-dashboard/update-course/${course.slug}`}
            className="btn btn-primary"
          >
            <EditIcon/>
          </Link>
        </td>
        <td>
          <Button
            className="btn btn-danger"
            onClick={() => handleDeleteButton(course._id)}
          >
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
              className="feather feather-trash-2"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </Button>
        </td>
      </tr>
    );
  };
  return (
    <>
      <Container fluid="lg">
        <div className="d-flex my-4 row g-3">
          <Breadcrumb className="ms-4 col-md-6">
            <Breadcrumb.Item href="/admin-dashboard">
              Admin Dashboard{" "}
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/admin-dashboard/course-management">
              Course Management{" "}
            </Breadcrumb.Item>
            <Breadcrumb.Item>Manage All Courses</Breadcrumb.Item>
          </Breadcrumb>
          <form className="d-flex mx-auto col-md-4" onSubmit={handleForm}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Course"
              aria-label="Search"
              onChange={handleSearchByName}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
        {error && (
          <div class="alert alert-danger" role="alert">
            {error.message}
          </div>
        )}
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Instructor's Name</th>
              <th>Status</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {searchResults !== null
              ? searchResults.map(renderCourse)
              : courses.map(renderCourse)}
          </tbody>
        </Table>

        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={show}
          animation={false}
        >
          <Modal.Body>
            <p className="text-danger">{`${selectedCourse?.name} course will be deleted.`}</p>
            <p className="text-danger">Are you sure?</p>
          </Modal.Body>
          <Modal.Footer className="d-flex ">
            <div className="">
              <Button variant="danger" onClick={deleteCourse}>
                Delete!
              </Button>
            </div>
            <div className="">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default ManageAllCourses;