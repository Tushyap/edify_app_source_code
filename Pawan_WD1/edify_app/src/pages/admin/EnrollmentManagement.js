import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";

function EnrollmentManagement() {
  
  return (
    <div>
      <hr style={{ color: "transparent" }} />
      <Container fluid="lg">
        <Breadcrumb className="ms-4">
          <Breadcrumb.Item href="/">Home </Breadcrumb.Item>
          <Breadcrumb.Item href="/admin-dashboard">
            Admin Dashboard
          </Breadcrumb.Item>
          <Breadcrumb.Item>Enrollment Management</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <hr style={{ color: "transparent" }} />
      <Container>
        <div className="d-grid gap-2 col-md-4 mx-auto">
          <Link
            to={"/admin-dashboard/manage-allenrollments"}
            className="my-3 btn btn-secondary"
          >
            See Coursewise Enrollment
          </Link>
          <Link to={`/admin-dashboard/overall-enrollment/`} className="my-3 btn btn-secondary">
            See Overall Enrollment
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default EnrollmentManagement;