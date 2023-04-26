import React, { useState, useEffect } from 'react';
import { Breadcrumb, Button, Modal, Table, Container } from 'react-bootstrap';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { useAuthContext } from "../../contexts/AuthContextProvider";
import moment from "moment";


import api from "../../services/Api";

function ApproveUser() {

    const { user } = useAuthContext();

    const [show, setShow] = useState(false);

    const [userData, setUserData] = useState([]);
    const [searchUser, setSearchUser] = useState("");

    const [getmodifiedCount, setModifiedCount] = useState("0");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleClose = () => {
        setShow(false);
        window.location.href = `http://localhost:3000/admin-dashboard/approve-user`;

    };

    const getAllUsers = async () => {
        try {
           const getUser = {
               status : "inactive",
               approved: "no",
               createdBy: "admin"
           }
            const response = await api.put("/user/query/", JSON.stringify(getUser));
            if (response.status === 200) {
                setUserData(response.data);
                console.log(response.data)
                setError(null);
            } else {
                setError("An error occured while fetching users!");
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const approveAllUsers = async (submitEvent) => {
        submitEvent.preventDefault();

        try {
            const queryBulkUpdate = { status: 'inactive', approved: 'no', createdBy: 'admin' }
            const response = await api.put(`/user/bulk-update/`, JSON.stringify(queryBulkUpdate) )
            if (response.status === 200) {
                setShow(true)
                console.log(response.data)
                setModifiedCount(response.data.modifiedCount)
                // console.log(  'Response:', response.data.modifiedCount )
            }
        } catch (errorObject) {
            alert('Error', errorObject)
            setError(errorObject.message)
        }
    }

    return (
        <>
            <Container fluid="lg" className='mb-5'>
                <div className="d-flex my-4 row g-3" >
                    <Breadcrumb className="ms-4 col-md-6">
                        <Breadcrumb.Item href="/">Home </Breadcrumb.Item>
                        <Breadcrumb.Item href="/admin-dashboard">Admin Dashboard </Breadcrumb.Item>
                        <Breadcrumb.Item href="/admin-dashboard/user-management">User Management </Breadcrumb.Item>
                        <Breadcrumb.Item>Bulk Approve Users</Breadcrumb.Item>

                    </Breadcrumb>
                    <form className="d-flex mx-auto col-md-4" >
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search User by email"
                            onChange={(event) => {
                                setSearchUser(event.target.value);
                            }}
                            aria-label="Search" />
                        <div className="btn bg-light text-dark"><PersonSearchIcon /></div>
                    </form>
                </div>
                {userData.length > 0 ? <div> <Table bordered hover responsive className='mt-3' >
                    <thead>
                        <tr>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Created At</th>

                        </tr>
                    </thead>
                    <tbody>
                        {userData.filter((val) => {
                            if (searchUser === "") {
                                return val
                            } else if (val.email.toLowerCase().includes(searchUser.toLowerCase())) {
                                return val
                            }
                        }).map(users => (
                            user.email !== users.email ? (<tr key={users._id}>
                                <td >{users.firstName} <span /> {users.lastName}</td>
                                <td className='text-center'>{users.email}</td>
                                <td className='text-center'>{moment(users.created_at).format('Do-MMMM-y')}</td>

                            </tr>) : (<div>{
                                /* an empty div, or it could've been an empty string.
                                 This was done in order to improve readability of the code */
                            }  </div>)))
                        }
                    </tbody>
                </Table>
                    <div className="col-12 text-center">
                        <button type="submit" onClick={approveAllUsers} className={`my-3 btn btn-primary `}>
                            Approve All
                        </button>
                    </div>
                </div> : <div className='text-primary my-5 text-center'><h4>There are no users to approve right now</h4> </div>}

                <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    animation={false}>
                    <Modal.Body >
                        <p className="text-success">Success!</p>
                        <p className="text-primary"> {`${getmodifiedCount} user(s) successfully approved.`} </p>

                    </Modal.Body>
                    <Modal.Footer>
                        <div className="col-12 text-center">
                            <Button variant="primary" onClick={handleClose}>
                                Close
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    )
}

export default ApproveUser