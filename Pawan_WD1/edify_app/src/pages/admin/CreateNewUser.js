import React, { useState } from "react";
import { Breadcrumb, Container, Form } from "react-bootstrap";
import AuthService from "../../services/AuthService";

function CreateNewUser() {
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

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

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
    { name: "admin", id: 1 },
    { name: "ordinary", id: 2 },
  ];

  const statusArr = [
    { name: "active", id: 1 },
    { name: "inactive", id: 2 },
    { name: "suspended", id: 3 },
  ];

  const approvedArr = [
    { name: "yes", id: 1 },
    { name: "no", id: 2 },
  ];

  const createdByArr = [
    { name: "admin", id: 1 },
    { name: "self", id: 2 },
  ];

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

        if ( phone.trim().length < 1) {
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

  const validatePassword = () => {
    let result = false;
    if (password.trim().length < 1) {
      setPasswordError("Please enter your password.");
    } else if (password.trim().length < 6) {
      setPasswordError("Password must be 6 or more characters.");
    } else if (confirmPassword.trim().length < 1) {
      setPasswordError("");
      setConfirmPasswordError("Please confirm your password.");
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
    } else {
      setPasswordError("");
      setConfirmPasswordError("");
      result = true;
    }
    return result;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid =
      validateFirstName() &&
      validateLastName() &&
      validateEmail() &&
      validatePhone() &&
      validateAddress1() &&
      validateAddress2() &&
      validatePostalCode() &&
      validatePassword() &&
      validateRole() ;

    if (isValid) {
      const user = {
        firstName,
        lastName,
        email,
        mobile: phone,
        address1,
        address2,
        postalCode,
        password,
        role,
        status: "inactive",
        approved: "no",
        createdBy:"admin"
        
      };

      try {
        const response = await AuthService.createNewUser(user);
        if (response.status === 200) {
          setSuccess("New user  created");
        } else {
          setError("Something went wrong!");
        }

        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setAddress1("");
        setAddress2("");
        setPostalCode("");
        setPassword("");
        setConfirmPassword("");
        setRole("");
        setStatus("");
        setApproved("");
        setCreatedBy("");
        setError("");
        console.log(response);
      } catch (error) {
        const { code, keyPattern, message } = error.response.data?.message;

        if (code === 11000) {
          // unique value error
          let errorMessage = "";
          Object.keys(keyPattern).forEach((field) => {
            if (field === "mobile") {
              errorMessage += "Phone number is already taken.";
            } else {
              errorMessage += field.toTitleCase() + " is already taken.";
            }
          });
          setError(errorMessage);
        } else if (message) {
          // validation error
          setError(message);
        } else {
          setError("An error occured!");
        }
      }
    }
  };

  return (
    <div>
      <hr style={{ color: "transparent" }} />
      <Container fluid="lg">
        <Breadcrumb className="ms-4">
          <Breadcrumb.Item href="/">Home </Breadcrumb.Item>
          <Breadcrumb.Item href="/admin-dashboard">
            Admin Dashboard{" "}
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/user-management">
            User Management{" "}
          </Breadcrumb.Item>
          <Breadcrumb.Item>Create New User</Breadcrumb.Item>
        </Breadcrumb>
      </Container>
      <hr style={{ color: "transparent" }} />
      <div className="container">
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
        <form className={`row g-3 px-4 `} onSubmit={handleSubmit}>
          <div className="col-md-3">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${
                  firstNameError.length > 0 ? "is-invalid" : ""
                }`}
                id="floatingInputFirstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={validateFirstName}
                autoFocus
              />
              <label htmlFor="floatingInputFirstName">First Name</label>
              <div className="invalid-feedback">{firstNameError}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${
                  lastNameError.length > 0 ? "is-invalid" : ""
                }`}
                id="floatingInputLastName"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={validateLastName}
              />
              <label htmlFor="floatingInputLastName">Last Name</label>
              <div className="invalid-feedback">{lastNameError}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <input
                type="email"
                className={`form-control ${
                  emailError.length > 0 ? "is-invalid" : ""
                }`}
                id="floatingInputEmail"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={validateEmail}
              />
              <label htmlFor="floatingInputEmail">E-mail</label>
              <div className="invalid-feedback">{emailError}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <input
                type="tel"
                className={`form-control ${
                  phoneError.length > 0 ? "is-invalid" : ""
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
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${
                  address1Error.length > 0 ? "is-invalid" : ""
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
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${
                  address2Error.length > 0 ? "is-invalid" : ""
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
          <div className="col-md-3">
            <div className="form-floating">
              <input
                type="text"
                className={`form-control ${
                  postalCodeError.length > 0 ? "is-invalid" : ""
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
          <div className="col-md-3">
            <div className="form-floating">
              <input
                type="password"
                className={`form-control ${
                  passwordError.length > 0 ? "is-invalid" : ""
                }`}
                id="floatingInputPassword"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={validatePassword}
              />
              <label htmlFor="floatingInputPassword">Password</label>
              <div className="invalid-feedback">{passwordError}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-floating">
              <input
                type="password"
                className={`form-control ${
                  confirmPasswordError.length > 0 ? "is-invalid" : ""
                }`}
                id="floatingInputPasswordConfirm"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={validatePassword}
              />
              <label htmlFor="floatingInputPasswordConfirm">
                Confirm Password
              </label>
              <div className="invalid-feedback">{confirmPasswordError}</div>
            </div>
          </div>

          <div className="col-md-3">
            
            <div className="form-floating">
              <Form.Select
                aria-label="Default select example"
                value={role}
                id='role'
                className="form-control"
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
          {/* <div className="col-md-3">
            <div className="form-floating">
              <Form.Select
                value={status}
                onBlur={validateStatus}
                onChange={(e) => setStatus(e.target.value)}
                aria-label="Default select example"
              >
                <option>Status</option>
                {statusArr.map((statusArr) => (
                  <option value={statusArr.name}>{statusArr.name}</option>
                ))}
              </Form.Select>
              <div className="invalid-feedback">{statusError}</div>
            </div>
          </div> */}

          {/* <div className="col-md-3">
            <div className="form-floating">
              <Form.Select
                value={approved}
                onBlur={validateApproved}
                onChange={(e) => setApproved(e.target.value)}
                aria-label="Default select example"
              >
                <option>Approve User</option>
                {approvedArr.map((approvedArr) => (
                  <option value={approvedArr.name}>{approvedArr.name}</option>
                ))}
              </Form.Select>
              <div className="invalid-feedback">{approvedError}</div>
            </div>
          </div> */}

          {/* <div className="col-md-3">
            <div className="form-floating">
              <Form.Select
                value={createdBy}
                onBlur={validateCreatedBy}
                onChange={(e) => setCreatedBy(e.target.value)}
                aria-label="Default select example"
              >
                <option>Created By</option>
                {createdByArr.map((createdByArr) => (
                  <option value={createdByArr.name}>{createdByArr.name}</option>
                ))}
              </Form.Select>
              <div className="invalid-feedback">{createdByError}</div>
            </div>
          </div> */}
          <div className="col-12 text-center">
            <button type="submit" className={`my-3 btn btn-primary `}>
              Add New User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewUser;
