import React, { useState, useEffect } from 'react';
import { Breadcrumb, Modal, Button, Container, Form } from 'react-bootstrap';
import api from "../../services/Api";
import { useParams } from 'react-router-dom';
function UpdateUser() {



    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");

    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const [address1, setAddress1] = useState("");
    const [address1Error, setAddress1Error] = useState("");

    const [address2, setAddress2] = useState("");
    const [address2Error, setAddress2Error] = useState("");

    const [postalCode, setPostalCode] = useState("");
    const [postalCodeError, setPostalCodeError] = useState("");


    const [role, setRole] = useState("");
    const [roleError, setRoleError] = useState("");

    const [status, setStatus] = useState("");
    const [statusError, setStatusError] = useState("");

    const [approved, setApproved] = useState("");
    const [approvedError, setApprovedError] = useState("");

    const [createdBy, setCreatedBy] = useState("");
    const [createdByError, setCreatedByError] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const roleArr = [
        { name: 'admin', id: 1 },
        { name: 'ordinary', id: 2 }
    ]

    const statusArr = [
        { name: 'active', id: 1 },
        { name: 'inactive', id: 2 },
        { name: 'suspended', id: 3 }
    ]

    const approvedArr = [
        { name: 'yes', id: 1 },
        { name: 'no', id: 2 }
    ]

    const createdByArr = [
        { name: 'admin', id: 1 },
        { name: 'self', id: 2 }
    ]

    const validateFirstName = () => {
        let result = false;
        if (firstName.trim().length < 3) {
            setFirstNameError("Please enter your first name.");
        } else {
            setFirstNameError("");
            result = true;
        }
        return result;
    };

    const validateLastName = () => {
        let result = false;
        if (lastName.trim().length < 3) {
            setLastNameError("Please enter your last name.");
        } else {
            setLastNameError("");
            result = true;
        }
        return result;
    };

    const validatePhone = () => {
        let isValidPhone = true;

        while( true ) {

            if ( phone.length < 1) {
              isValidPhone = false;
              setPhoneError('Phone number cannot be empty');
              break;
            }

            if ( isNaN(phone) ) {
              isValidPhone = false;
                setPhoneError('Phone number must be digits only')
                break;
            }

            if ( phone.trim().length !== 10 ) {
              isValidPhone = false;
                setPhoneError('Phone number must be of 10 digits')
                break;
            }

            if ( isValidPhone) 
            setPhoneError('');
          
            break;
        } 

    return isValidPhone;        
    };

    const validateEmail = () => {
        let result = false;
        if (email.trim().length < 1) {
            setEmailError("Please enter your email address.");
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
            result = true;
        }
        return result;
    };

    const validateAddress1 = () => {
        let result = false;
        if (address1.trim().length < 3) {
            setAddress1Error("Please enter your address(1).");
        } else {
            setAddress1Error("");
            result = true;
        }
        return result;
    };

    const validateAddress2 = () => {
        let result = false;
        if (address2.trim().length < 3) {
            setAddress2Error("Please enter your address(2).");
        } else {
            setAddress2Error("");
            result = true;
        }
        return result;
    };

    const validatePostalCode = () => {
        let isValidPostalCode = true;

        while( true ) {
    
            if ( postalCode.trim().length < 1) {
              isValidPostalCode = false;
              setPostalCodeError('Postal code cannot be empty.');
              break;
            }
    
            if ( isNaN(postalCode) ) {
              isValidPostalCode = false;
              setPostalCodeError('Postal Code must be digits only.')
                break;
            }
    
            if ( postalCode.trim().length < 5 || postalCode.trim().length > 6 ) {
              isValidPostalCode = false;
              setPostalCodeError('Postal Code must be of 5 or 6 digits only.')
                break;
            }
    
            if ( isValidPostalCode) 
            setPostalCodeError('');
          
            break;
        } 
    
    return isValidPostalCode;  
    };



    const validateRole = () => {
        let result = false;
        if (role.trim().length < 3) {
            setRoleError("Please assign role");
        } else {
            setRoleError("");
            result = true;
        }
        return result;
    };

    const validateStatus = () => {
        let result = false;
        if (status.trim().length < 3) {
            setStatusError("Please assign status");
        } else {
            setStatusError("");
            result = true;
        }
        return result;
    };

    const validateApproved = () => {
        let result = false;
        if (approved.trim().length < 1) {
            setApprovedError(" Approve User");
        } else {
            setApprovedError("");
            result = true;
        }
        return result;
    };

    const validateCreatedBy = () => {
        let result = false;
        if (createdBy.trim().length < 3) {
            setCreatedByError("User created by");
        } else {
            setCreatedByError("");
            result = true;
        }
        return result;
    };

    // eslint-disable-next-line no-extend-native
    String.prototype.toTitleCase = function () {
        return this.valueOf()
            .toLowerCase()
            .replace(this.valueOf()[0], this.valueOf()[0].toUpperCase());
    };

    useEffect(() => {
        sendUserInfo()
    }, [])

    const { id } = useParams("");
    console.log(id)

    const sendUserInfo = async () => {
        try {

            const response = await api.get(`/user/user-info/${id}`)
            if (response.status === 200) {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setPhone(response.data.mobile)
                setEmail(response.data.email)
                setAddress1(response.data.address1)
                setAddress2(response.data.address2)
                setPostalCode(response.data.postalCode)
                setRole(response.data.role)
                setStatus(response.data.status)
                setApproved(response.data.approved)
                setCreatedBy(response.data.createdBy)
                console.log('Resulting  user(to be updated): ', response.data)

            } else if (response.status === 404) {
                alert('Error: The resource no longer exists on the requested path')
            } else {
                alert('Error: An error occured while retriving the users')
            }
        } catch (errorObject) {

            console.log('The Error Object:', errorObject)
        }

    }


    const handleFormSubmit = async (submitEvent) => {
        submitEvent.preventDefault()

        let isValid =
            validateFirstName() &&
            validateLastName() &&
            validatePhone() &&
            validateAddress1() &&
            validateAddress2() &&
            validatePostalCode() &&
            validateRole() &&
            validateStatus() &&
            validateApproved() &&
            validateCreatedBy();

        if (isValid) {
            const editedUser = {

                firstName,
                lastName,
                mobile: phone,
                address1,
                address2,
                postalCode,
                role,
                status,
                approved,
                createdBy
            }

            try {
                const response = await api.put(`/user/edit-user/${id}`, JSON.stringify(editedUser))
                if (response.status === 200) {
                    setSuccess('User Edited Successfully')
                    handleShow()
                    window.location.href = `http://localhost:3000/admin-dashboard/update-user/${id}`;

                }
            } catch (errorObject) {
                console.log('Error', errorObject)
                setError(errorObject.message)
            }
        } else {
            setError('Some Errors in the form. Correct and re-submit.')
        }

    }



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Container fluid="lg" className="my-4">
                <Breadcrumb className="ms-4">
                    <Breadcrumb.Item href="/admin-dashboard">User Management</Breadcrumb.Item>
                    <Breadcrumb.Item >Manage All Users</Breadcrumb.Item>
                    <Breadcrumb.Item>Update User</Breadcrumb.Item>
                </Breadcrumb>
            </Container>

            <div className="container">

                <h5 className="mx-4">Updating Details For:
                    <span className="mx-2"> {firstName} </span>
                    <span > {lastName} </span>
                </h5>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success" role="alert">
                        {success}
                    </div>
                )}
                <hr style={{ color: "transparent" }} />

                <form className={`mx-5 row`} onSubmit={(submitEvent) => handleFormSubmit(submitEvent)}>
                    <div className="mb-4 col-md-3">
                        <div className="form-floating">
                            <input
                                type="text"
                                className={` form-control`}
                                id="firstName"
                                placeholder="First Name"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onBlur={validateFirstName}
                            />
                            <label htmlFor="firstName">First Name</label>
                            <div className="errorMessage">{firstNameError}</div>
                        </div>
                    </div>

                    <div className="mb-4 col-md-3">
                        <div className="form-floating">
                            <input
                                type="text"
                                className={` form-control`}
                                id="lastName"
                                placeholder="Last Name"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                onBlur={validateLastName}
                            />
                            <label htmlFor="lastName">Last Name</label>
                            <div className="errorMessage">{lastNameError}</div>
                        </div>
                    </div>
                    <div className="mb-4 col-md-3">
                        <div className="form-floating">
                            <input
                                type="email"
                                className={` form-control`}
                                id="email"
                                placeholder="Email"
                                required
                                disabled
                                value={email}
                                onBlur={validateEmail}
                            />
                            <label htmlFor="email">Email</label>
                            <div className="errorMessage">{emailError}</div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-floating">
                            <input
                                type="tel"
                                className={`form-control ${phoneError.length > 0 ? "is-invalid" : ""
                                    }`}
                                id="floatingInputPhone"
                                placeholder="Phone"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onBlur={validatePhone}
                            />
                            <label htmlFor="floatingInputPhone">Phone</label>
                            <div className="invalid-feedback">{phoneError}</div>
                        </div>
                    </div>
                    <div className="mb-4 col-md-12">
                        <div className="form-floating">
                            <input
                                type="text"
                                className={`form-control ${address1Error.length > 0 ? "is-invalid" : ""
                                    }`}
                                id="floatingInputAddress1"
                                placeholder="Address 1"
                                required
                                value={address1}
                                onChange={(e) => setAddress1(e.target.value)}
                                onBlur={validateAddress1}
                            />
                            <label htmlFor="floatingInputAddress1">Address 1</label>
                            <div className="invalid-feedback">{address1Error}</div>
                        </div>
                    </div>
                    <div className="mb-4 col-md-12">
                        <div className="form-floating">
                            <input
                                type="text"
                                className={`form-control ${address2Error.length > 0 ? "is-invalid" : ""
                                    }`}
                                id="floatingInputAddress2"
                                placeholder="Address 2"
                                required
                                value={address2}
                                onChange={(e) => setAddress2(e.target.value)}
                                onBlur={validateAddress2}
                            />
                            <label htmlFor="floatingInputAddress2">Address 2</label>
                            <div className="invalid-feedback">{address2Error}</div>
                        </div>
                    </div>
                    <div className="mb-4 col-md-3">
                        <div className="form-floating">
                            <input
                                type="text"
                                className={`form-control ${postalCodeError.length > 0 ? "is-invalid" : ""
                                    }`}
                                id="floatingInputPostalCode"
                                placeholder="Postal Code"
                                required
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                onBlur={validatePostalCode}
                            />
                            <label htmlFor="floatingInputPostalCode">Postal Code</label>
                            <div className="invalid-feedback">{postalCodeError}</div>
                        </div>
                    </div>

                    <div className="mb-4 col-md-3">
                        <div className="form-floating">
                            <Form.Select aria-label="Default select example"
                                value={role}
                                id='role'
                                onChange={(e) => setRole(e.target.value)}
                                onBlur={validateRole}
                            >

                                {roleArr.map((roleArr) => (
                                    <option value={roleArr.name}>{roleArr.name}</option>
                                ))}
                            </Form.Select>
                            <label htmlFor="role">Role</label>
                            <div className="invalid-feedback">{roleError}</div>
                        </div>
                    </div>
                    <div className="mb-4 col-md-3">
                        <div className="form-floating">
                            <Form.Select value={status}
                                onBlur={validateStatus}
                                id='status'
                                onChange={(e) => setStatus(e.target.value)}
                                aria-label="Default select example">

                                {statusArr.map((statusArr) => (
                                    <option value={statusArr.name}>{statusArr.name}</option>
                                ))}
                            </Form.Select>
                            <label htmlFor="status">Status</label>
                            <div className="invalid-feedback">{statusError}</div>
                        </div>
                    </div>
                    <div className=" mb-4 col-md-3">
                        <div className="form-floating">
                            <input
                                type="text"
                                className={`form-control `}
                                id="createdBy"
                                placeholder="Created By"
                                required
                                value={createdBy}
                                onBlur={validateCreatedBy}
                            />
                            <label htmlFor="createdby">Created By</label>
                            <div className="invalid-feedback">{createdByError}</div>
                        </div>
                    </div> 
                    {approved !== "yes" ?(<div className="mb-4 col-md-3">
                        <div className="form-floating">
                            <Form.Select value={approved}
                                onBlur={validateApproved}
                                id='approve'
                                onChange={(e) => setApproved(e.target.value)}
                                aria-label="Default select example">

                                {approvedArr.map((approvedArr) => (
                                    <option value={approvedArr.name}>{approvedArr.name}</option>
                                ))}
                            </Form.Select>
                            <label htmlFor="approve">Approve User</label>
                            <div className="invalid-feedback">{approvedError}</div>
                        </div>
                    </div>):(<div></div>)}
                    
                                      
                    <hr style={{ color: "transparent" }} />
                    <div className="col-12 text-center my-3">
                        <button type="submit" variant="primary" className="btn btn-primary btn-lg">
                            Save
                        </button>
                    </div>
                    <Modal
                        aria-labelledby="contained-modal-title-vcenter"
                        centered show={show}
                        onHide={handleClose}
                        animation={false}>
                        <Modal.Body >
                            <p className="text-success">User {email} updated Successfully...</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <div className="col-12 text-center">
                                <Button variant="primary" onClick={handleClose}>
                                    Okay
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;
