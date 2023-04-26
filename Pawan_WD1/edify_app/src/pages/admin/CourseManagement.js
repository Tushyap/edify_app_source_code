import React from 'react';
import { Link } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";
function CourseManagement() {
    return (
        <>

            <Container fluid="lg">
                <hr style={{ color: "transparent" }} />
                <Breadcrumb className="ms-4">
                    <Breadcrumb.Item href="/">Home </Breadcrumb.Item>
                    <Breadcrumb.Item href="/admin-dashboard">
                        Admin Dashboard{" "}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Course Management</Breadcrumb.Item>
                </Breadcrumb>

                <hr style={{ color: "transparent" }} />
                <div className="d-grid gap-2 col-md-4 mx-auto">
                    <Link
                        to="/admin-dashboard/manage-allcourses"
                        className="btn btn-secondary my-3"
                    >
                        Manage All Courses
                    </Link>

                    <Link
                        to="/admin-dashboard/create-newcourse"
                        className="btn btn-secondary my-3"
                    >
                        Create New Course
                    </Link>
                </div>


            </Container>
        </>
    )
}

export default CourseManagement
