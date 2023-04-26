import React, { useState, useRef } from 'react';
import ChangePasswordCSS from './style-modules/ChangePassword.module.css'
import { Breadcrumb, Modal, Button, Container } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContextProvider';
import requestToServer from '../services/Api';
import AuthService from '../services/AuthService';

const ChangePassword = ({ password }) => {
    const { user } = useAuthContext();

    const [OldPassword, setOldPassword] = useState("");
    const [OldPasswordError, setOldPasswordError] = useState("");

    const [NewPassword, setNewPassword] = useState("");
    const [NewPasswordError, setNewPasswordError] = useState("");

    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");

    const [error, setError] = useState('');

    const [show, setShow] = useState(false);

// setting up Ref to target eye icons and password input fields
    const eyeRefOne = useRef();
    const eyeRefTwo = useRef();
    const eyeRefThree = useRef();

    const oldPswdInputRef = useRef();
    const newPswdInputRef = useRef();
    const confirmInputRef = useRef();

    const handleClose = () => {
        setShow(false);
        AuthService.logout();
        window.location.replace("/");
    };

    const handleShow = () => setShow(true);

    const validatePassword = () => {
        let result = false;
        if (OldPassword.trim().length < 1) {
            setOldPasswordError("Please enter your old password.");
        } else if (OldPassword.trim().length < 6) {
            setOldPasswordError("Password must be 6 or more characters.");
        } else if (NewPassword.trim().length < 1) {
            setNewPasswordError("Please enter your new password.");
        } else if (NewPassword.trim().length < 6) {
            setNewPasswordError("Password must be 6 or more characters.");
        } else if (confirmNewPassword.trim().length < 1) {
            setNewPasswordError("");
            setConfirmNewPasswordError("Please confirm your new password.");
        } else if (NewPassword !== confirmNewPassword) {
            setConfirmNewPasswordError("Passwords do not match!");
        } else {
            setOldPasswordError("");
            setNewPasswordError("");
            setConfirmNewPasswordError("");
            result = true;
        }
        return result;
    };

    const handleFormSubmit = async (submitEvent) => {
        submitEvent.preventDefault();

        if ( validatePassword() === true ) {
            const editedUser = {
                id: user.id,
                email: user.email,
                password: NewPassword,
                oldPassword: OldPassword
            }

            try {
                const response =  await requestToServer.put(`/user/update-password/`,  JSON.stringify(editedUser))
                if (response.status === 200 ) {
                  setShow(true)
                                 
                }
            } catch(errorObject) {
                alert('Error', errorObject)
                setError(errorObject.message)
            }
        } else {
            setError('An Error Occured.')
        }

    }

    function toggleEyeOne() {
        const eye = eyeRefOne.current.classList;
        
        if ( eye[2] === 'fa-eye') {
            eye.remove('fa-eye');
            eye.add('fa-eye-slash');
            oldPswdInputRef.current.type= "password";
        } else if ( eye[2] === 'fa-eye-slash') {
            eye.remove('fa-eye-slash');
            eye.add('fa-eye');
            oldPswdInputRef.current.type= "text";
        }
    }

    function toggleEyeTwo() {
        const eye = eyeRefTwo.current.classList;
        
        if ( eye[2] === 'fa-eye') {
            eye.remove('fa-eye');
            eye.add('fa-eye-slash');
            newPswdInputRef.current.type= "password";
        } else if ( eye[2] === 'fa-eye-slash') {
            eye.remove('fa-eye-slash');
            eye.add('fa-eye');
            newPswdInputRef.current.type= "text";
        }
    }

    function toggleEyeThree() {
        const eye = eyeRefThree.current.classList;

        if ( eye[2] === 'fa-eye') {
            eye.remove('fa-eye');
            eye.add('fa-eye-slash');
            confirmInputRef.current.type= "password";
        } else if ( eye[2] === 'fa-eye-slash') {
            eye.remove('fa-eye-slash');
            eye.add('fa-eye');
            confirmInputRef.current.type = "text";
        }
    }


    return (
        <div className={ChangePasswordCSS.passwordWrapper}>
            <Container fluid="lg">
                <div className="breadcrumb-div ms-4">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home </Breadcrumb.Item>
                        <Breadcrumb.Item href='/user-dashboard'>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item active>Change Password</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </Container>
            <h3>Change Password</h3>
            <p>{error}</p>

            <Container fluid="lg">
                <form className="d-grid gap-3 col-md-4 mx-auto" onSubmit={submitEvent =>{ handleFormSubmit(submitEvent)}}>

                        <div className={`form-floating ${ChangePasswordCSS.inputField}`}>
                            <input
                                ref={oldPswdInputRef}
                                type="password"
                                className={`form-control ${OldPasswordError.length > 0 ? "is-invalid" : ""
                                    }`}
                                id="floatingInputOldPassword"
                                placeholder="Old Password"
                                required
                                value={OldPassword}
                                onChange={(e) => { setOldPassword(e.target.value); setOldPasswordError('')}}
                                onBlur={validatePassword}
                            />
                            <i 
                                ref={eyeRefOne} 
                                className={`${ChangePasswordCSS.eyePosition} fas fa-eye-slash`} 
                                onClick={toggleEyeOne}>
                            </i>
                            <label htmlFor="floatingInputOldPassword">Old Password</label>
                            <div className="invalid-feedback">{OldPasswordError}</div>
                        </div>
                

                    
                        <div className={`form-floating ${ChangePasswordCSS.inputField}`}>
                            <input
                                ref={newPswdInputRef}
                                type="password"
                                className={`form-control ${NewPasswordError.length > 0 ? "is-invalid" : ""
                                    }`}
                                id="floatingInputNewPassword"
                                placeholder="New Password"
                                required
                                value={NewPassword}
                                onChange={(e) =>{ setNewPassword(e.target.value); setNewPasswordError('')}}
                                onBlur={validatePassword}
                            />
                             <i 
                                ref={eyeRefTwo} 
                                className={`${ChangePasswordCSS.eyePosition} fas fa-eye-slash`} 
                                onClick={toggleEyeTwo}>
                            </i>
                            <label htmlFor="floatingInputNewPassword">New Password</label>
                            <div className="invalid-feedback">{NewPasswordError}</div>
                        </div>
                    
               
                        <div className={`form-floating ${ChangePasswordCSS.inputField}`}>
                            <input
                                ref={confirmInputRef}
                                type="password"
                                className={`form-control ${confirmNewPasswordError.length > 0 ? "is-invalid" : ""
                                    } `}
                                id="floatingInputConfirmNewPassword"
                                placeholder="Confirm New Password"
                                required
                                value={confirmNewPassword}
                                onChange={(e) => {setConfirmNewPassword(e.target.value); setConfirmNewPasswordError('')} }
                                onBlur={validatePassword}
                            />
                            <i 
                                ref={eyeRefThree} 
                                className={`${ChangePasswordCSS.eyePosition} fas fa-eye-slash`}  
                                onClick={toggleEyeThree} >
                            </i>
                            <label htmlFor="floatingInputConfirmNewPassword">Confirm New Password</label>
                            <div className="invalid-feedback">{confirmNewPasswordError}</div>
                        </div>
                    
                    <div className="col-12 text-center my-3">
                        <button type="submit" variant="primary" className="btn btn-primary btn-lg">
                            Save
                        </button>
                    </div>
                 </form>
            </Container>

            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered 
                show={show} 
                onHide={handleClose}
                backdrop="static"
                animation={false}>
                <Modal.Body >
                    <p className="text-success">Success!</p>
                    <p className="text-primary">Password Changed Successfully.</p>
                    <p className="text-danger">Login Again with new password.</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="col-12 text-center">
                        <Button variant="primary" onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ChangePassword;