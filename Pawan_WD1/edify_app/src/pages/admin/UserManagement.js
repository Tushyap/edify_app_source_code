import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";
function UserManagement() {
  return (
    <div>
      <hr style={{ color: "transparent" }} />
      <Container fluid="lg">
        <Breadcrumb className="ms-4">
          <Breadcrumb.Item href="/">Home </Breadcrumb.Item>
          <Breadcrumb.Item href="/admin-dashboard">
            Admin Dashboard{" "}
          </Breadcrumb.Item>
          <Breadcrumb.Item>User Management</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <Container>
      <hr style={{ color: "transparent" }} />
        <div className="d-grid gap-2 col-md-4 mx-auto">
          <Link
            to="/admin-dashboard/manage-alluser"
            className="btn btn-secondary my-3"
          >
            Manage All Users
          </Link>
          <Link
            to="/admin-dashboard/approve-user"
            className="btn btn-secondary my-3"
          >
            Bulk Approve Users
          </Link>
          <Link
            to="/admin-dashboard/create-newuser"
            className="btn btn-secondary my-3"
          >
            Create New User
          </Link>
        </div>
        
      </Container>
    </div>
  );
}

export default UserManagement;
