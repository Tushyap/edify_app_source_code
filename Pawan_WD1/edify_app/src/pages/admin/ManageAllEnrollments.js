import React, { useEffect, useState } from "react";
import { Container, Breadcrumb, Table, Form } from "react-bootstrap";
import api from "../../services/Api";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import moment from "moment";

const ManageAllEnrollments = () => {

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allBatchId, setAllBatchId] = useState([]);
  const [selectBatchId, setSelectBatchId] = useState('');
  const [searchUser, setSearchUser] = useState("");
  
  const getEnrollments = async () => {
    try {
      const getUserBatchWise = {
        batchId: selectBatchId,
      }
      setLoading(true);
      const response = await api.put("/admin/enrollmentBatchWise/", JSON.stringify(getUserBatchWise));

      if (response.status === 200) {
        setEnrollments(response.data);
        console.log(enrollments)
        console.log(selectBatchId)
        setError(null);
      } else {
        setError("An error occured while fetching enrollments!");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getBatchId = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/enrollments/batchId");
      if (response.status === 200) {
        setAllBatchId(response.data);
        console.log(response.data)
        setError(null);
      } else {
        setError("An error occured while fetching enrollments!");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBatchId();
  }, []);

  return (
    <>
      <Container fluid="lg">
        <div className="d-flex my-4 row g-3">
          <Breadcrumb className=" col-md-6">
            <Breadcrumb.Item href="/admin-dashboard">
              Admin Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/admin-dashboard/enrollment-management">
              Enrollment Management
            </Breadcrumb.Item>
            <Breadcrumb.Item>Coursewise Enrollment</Breadcrumb.Item>
          </Breadcrumb>
          <form className="d-flex mx-auto  col-md-4" >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search User by Email or Batch"
              onChange={(event) => {
                setSearchUser(event.target.value);
              }}
              aria-label="Search" />
            <div className="btn bg-light text-dark"><PersonSearchIcon /></div>
          </form>
        </div>
        <div className="row mb-5">
          <div className="col-md-8">
            <div class="row mb-3">
              <div className="col-md-3 d-flex align-items-center">
                <span>Select Batch</span>
              </div>
              <div class=" d-flex col-md-5">
                <Form.Select value={selectBatchId}
                  id='BatchId'
                  className="me-2"
                  onChange={(e) => setSelectBatchId(e.target.value)}
                  aria-label="Default select example">
                  <option>Select Batch</option>
                  {allBatchId.map((allBatchId) => (
                    <option value={allBatchId}>{allBatchId}</option>
                  ))}
                  {console.log(selectBatchId)}
                </Form.Select>
                <Button variant="outlined"
                  color="primary"
                  onClick={getEnrollments}
                  endIcon={<SendIcon />}>
                  Go
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 d-flex align-items-center">
                <label htmlFor="users-group"> Total Enrolled Users: {enrollments.length}</label>
              </div>
            </div>
          </div>
        </div>
        {loading && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status"></div>
            <span className="p-2">Wait while loading...</span>
          </div>
        )}
        {error && (
          <div class="alert alert-danger" role="alert">
            {error.message}
          </div>
        )}
        {enrollments.length > 0 ?
          <div>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th className="text-center">Enrollment Id</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Batch</th>
                  <th className="text-center">Enrollment Date</th>
                  <th className="text-center">Enrollment Status</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.filter((val) => {
                  if (searchUser === "") {
                    return val
                  } else if (val.email.toLowerCase().includes(searchUser.toLowerCase())) {

                    return val
                  } else if (val.batchId.toLowerCase().includes(searchUser.toLowerCase())) {
                    return val
                  }
                }).map(enrollmentItem => (
                  <tr key={enrollmentItem._id}>
                    <td className="text-center">{enrollmentItem.enrolmentId}</td>
                    <td>{enrollmentItem.userName}</td>
                    <td className="text-center">{enrollmentItem.email}</td>
                    <td className="text-center">{enrollmentItem.batchId}</td>
                    <td className="text-center">{moment(enrollmentItem.paymentDate).format('Do-MMMM-y')}</td>
                    <td className="text-center">{enrollmentItem.userEnrolStatus}</td>
                  </tr>))                  
                }
              </tbody>
            </Table>
          </div>
          : <div className="text-center ">
            <h5>Select a batch from <strong>Select Batch</strong> box and click on <strong>GO</strong> button to find enrolled users in a particular batch & course
            </h5>
          </div>}
      </Container>
    </>
  );
};

export default ManageAllEnrollments;
