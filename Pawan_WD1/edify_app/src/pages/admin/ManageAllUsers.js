import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import api from "../../services/Api";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { Breadcrumb, Button, Modal, Table, Container } from 'react-bootstrap';
import { useAuthContext } from "../../contexts/AuthContextProvider";

function ManageAllUsers() {
    const { user } = useAuthContext();
    console.log(user)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [deleteUser, setDeleteUser] = useState(false);
    const handleDeleteUserClose = () => setDeleteUser(false);
    const handleDeleteUserShow = () => setDeleteUser(true);

    const [userData, setUserData] = useState([]);
    const [selectUser, setSelectUser] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchUser, setSearchUser] = useState("");
    
    // const batchDate = async () => {
    //     let d = new Date();
    //     let day = d.getDate();
    //     var month = d.getMonth();
    //     if (day > 15) {
    //         var nextMonth = month + 1;
    //         let nMonth = new Date();
    //         nMonth.setMonth(nextMonth);
    //         setBatchStartDate(nMonth)
    //     } else if (day === 15) {
    //         let nMonth = new Date();
    //         nMonth.setMonth(nextMonth);
    //            setBatchStartDate(nMonth)
    //     } else {
    //         let nMonth = new Date();
    //         nMonth.setMonth(nextMonth);
    //            setBatchStartDate(nMonth) 
    //     }
    //     console.log(nextMonth)
    //     console.log(batchStartDate)
    //     console.log(day)
    //     console.log(month)
    // }
    // batchDate()


    const getAllUsers = async () => {
        try {
            const response = await api.get("/auth/sign-up");

            if (response.status === 200) {
                setUserData(response.data);
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


    // const { id } = useParams("");
    // console.log(id)


    const handleDelete = async () => {
        // can we encrypt cardNumber while sending, and decrypt it and then delete the appropriate card?
        console.log('handle  delete will work to delete  the user from database')

        try {

            const response = await api.delete("/user/update-user/" + selectUser._id)

            if (response.status === 200) {

                window.location.href = `http://localhost:3000/admin-dashboard/manage-alluser`;
                handleShow()

            }
            else if (response.status === 401) {
                console.log('Unauthorized Access. Cannot Delete Card')
                alert('Unauthorized access. Cannot Delete Card')
            }
        } catch (error) {
            alert('The error of type: ' + error.message)
            console.log('In catch error portion: ', error)
            setError(error.message)
        }
    }



    const handleDeleteButton = async (userId) => {
        setSelectUser(userData.find((x) => x._id === userId));
        handleDeleteUserShow();
    };


    // const renderUser = (users, index) => {

    //     return (


    //             <tr key={index}>
    //             <td>{users.firstName} <span /> {users.lastName}</td>
    //             <td>{users.email}</td>
    //             <td>{users.role}</td>
    //             <td>{users.approved}</td>
    //             <td>{users.status}</td>
    //             <td><Link className="btn bg-light text-dark" to={`/admin-dashboard/update-user/${users._id}`}><EditIcon /></Link></td>
    //             <td>
    //                 {users.role !== 'admin' ? (<div className="btn bg-light text-dark" onClick={() => handleDeleteButton(users._id)} >  <DeleteIcon /></div>) : (<div className="btn bg-light text-dark"><BlockIcon /></div>)}
    //             </td>
    //             </tr>


    //     )
    // }


    return (
        <>
            <Container fluid="lg" className='mb-5'>
                <div className="d-flex my-4 row g-3" >
                    <Breadcrumb className="ms-4 col-md-6">
                        <Breadcrumb.Item href="/">Home </Breadcrumb.Item>
                        <Breadcrumb.Item href="/admin-dashboard">Admin Dashboard </Breadcrumb.Item>
                        <Breadcrumb.Item href="/user-management">User Management </Breadcrumb.Item>
                        <Breadcrumb.Item>Manage All Users</Breadcrumb.Item>

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
                <Table bordered hover responsive className='mt-3' >
                    <thead>
                        <tr>

                            <th className='text-center'>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Role</th>
                            <th className='text-center'>Approved</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Update</th>
                            <th className='text-center'>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData.filter((val) => {
                            if (searchUser === "") {
                                return val
                            } else if (val.email.toLowerCase().includes(searchUser.toLowerCase())) {
                                return val
                            }
                        }).map((users, index) => (
                            user.email !== users.email ? (<tr key={users._id}>
                                <td >{users.firstName} <span /> {users.lastName}</td>
                                <td >{users.email}</td>
                                <td className='text-center'>{users.role}</td>
                                <td className='text-center'>{users.approved}</td>
                                <td className='text-center'>{users.status}</td>
                                <td className='text-center'><Link className="btn bg-light text-dark" to={`/admin-dashboard/update-user/${users._id}`}><EditIcon /></Link></td>
                                <td className='text-center'>
                                    {(users.role !== 'admin' && users.status !== "inactive" && users.approved !== "no") ? (<div className="btn bg-light text-dark" onClick={() => handleDeleteButton(users._id)} >  <DeleteIcon /></div>) : (<div className="btn bg-light text-dark"><BlockIcon /></div>)}
                                </td>
                            </tr>) : (<div>{
                                /* an empty div, or it could've been an empty string.
                                 This was done in order to improve readability of the code */
                            }  </div>)))

                        }
                    </tbody>
                </Table>
                <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={show}
                    onHide={handleClose}
                    animation={false}>
                    <Modal.Body >
                        <p className="text-success">{`${selectUser.firstName}   deleted successfully...`}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="col-12 text-center">
                            <Button variant="primary" onClick={handleClose} >
                                Okay
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
                <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={deleteUser}
                    onHide={handleDeleteUserClose}
                    animation={false}>
                    <Modal.Body >
                        <p className="text-danger">{`${selectUser.firstName}  will be deleted.`}</p>
                        <p className="text-danger">Are you sure?</p>
                    </Modal.Body>
                    <Modal.Footer className="d-flex ">
                        <div className="">
                            <Button variant="success" onClick={handleDelete}>
                                Yes
                            </Button>
                        </div>
                        <div className="">
                            <Button variant="danger" onClick={handleDeleteUserClose}>
                                Cancel
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    )
}

export default ManageAllUsers;