import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Breadcrumb, Modal, Button, Container } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContextProvider';
import EditProfileCSS from './style-modules/EditProfile.module.css';
import requestToServer from '../services/Api';

const EditProfile = () => {

  const { user } = useAuthContext()

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState("")

  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState("")

  const [mobile, setMobile] = useState('')
  const [mobileError, setMobileError] = useState("")

  const [newMobile, setNewMobile] = useState('')
  const [newMobileError, setNewMobileError] = useState('')

  const [email, setEmail] = useState('')

  const [addressOne, setAddressOne] = useState('')
  const [addressOneError, setAddressOneError] = useState('')

  const [addressTwo, setAddressTwo] = useState('')
  const [addressTwoError, setAddressTwoError] = useState('')

  const [postalCode, setPostalCode] = useState('')
  const [postalCodeError, setPostalCodeError] = useState('')

  const [mobilePopup, setMobilePopup] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchUserDetails()
  }, [])

  const fetchUserDetails = async () => {
    try {

      console.log('User id:', user.id);
      const response = await requestToServer.get(`/user/user-info/${user.id}`)
      if (response.status === 200) {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setMobile(response.data.mobile)
        setEmail(response.data.email)
        setAddressOne(response.data.address1)
        setAddressTwo(response.data.address2)
        setPostalCode(response.data.postalCode)
        console.log('Resulting  user(to be edited): ', response.data)
      } else if (response.status === 404) {
        alert('Error: The resource no longer exists on the requested path')
      } else {
        alert('Error: An error occured while retriving the cards')
      }
    } catch (errorObject) {
      setError(errorObject.message)
      console.log('The Error Object:', errorObject)
    }

  }

  const handleMobileClose = (sumbitEvent) => {
    sumbitEvent.preventDefault()
    setMobile(newMobile)
    setMobilePopup(false)
  }

  const noChangeMobile = () => {
    setMobilePopup(false)
  }

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

  const validateMobile = () => {
 
      let isValidMobile = true;

      while( true ) {

          if ( mobile.trim().length < 1) {
            isValidMobile = false;
            setMobileError('Mobile number cannot be empty');
            break;
          }

          if ( isNaN(mobile) ) {
            isValidMobile = false;
            setMobileError('Mobile number must be digits only')
              break;
          }

          if ( mobile.trim().length !== 10 ) {
            isValidMobile = false;
            setMobileError('Mobile number must be of 10 digits')
              break;
          }

          if ( isValidMobile ) 
          setMobileError('');
        
          break;
      } 

  return isValidMobile;        

  };

  const validateNewMobile = () => {
    let isValidNewMobile = true;

    while( true ) {

        if ( newMobile.trim().length < 1) {
          isValidNewMobile = false;
          setNewMobileError('Mobile number cannot be empty');
          break;
        }

        if ( isNaN(newMobile) ) {
          setNewMobileError = false;
          setMobileError('Mobile number must be digits only')
            break;
        }

        if ( newMobile.trim().length !== 10 ) {
          setNewMobileError = false;
          setMobileError('Mobile number must be of 10 digits')
            break;
        }

        if ( isValidNewMobile ) 
        setMobileError('');
      
        break;
    } 

    return isValidNewMobile;        
  }

  const validateAddressOne = () => {
    let result = false;
    if (addressOne.trim().length < 3) {
      setAddressOneError("Please enter address line one.");
    } else {
      setAddressOneError("");
      result = true;
    }
    return result;
  };

  const validateAddressTwo = () => {
    let result = false;
    if (addressTwo.trim().length < 3) {
      setAddressTwoError("Please enter dddress line two.");
    } else {
      setAddressTwoError("");
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


  const handleFormSubmit = async (submitEvent) => {
    submitEvent.preventDefault()

    let isValid =
      validateFirstName() &&
      validateLastName() &&
      validateMobile() &&
      validateAddressOne() &&
      validateAddressTwo() &&
      validatePostalCode();

    if (isValid) {
      const editedUser = {
        id: user.id,
        firstName,
        lastName,
        mobile,
        address1: addressOne,
        address2: addressTwo,
        postalCode
      }

      try {
        const response = await requestToServer.put(`/user/update-user/${user.id}`, JSON.stringify(editedUser))
        if (response.status === 200) {
          setSuccess('User Edited Successfully')
          window.location.href = `http://localhost:3000/user-dashboard/edit-profile`;

        }
      } catch (errorObject) {
        console.log('Error', errorObject)
        setError(errorObject.message)
      }
    } else {
      setError('Some Errors in the form. Correct and re-submit.')
    }

  }

  return (
    <div className={EditProfileCSS.editProfileWrapper}>

      <Container fluid="lg">
        <div className="breadcrumb-div ms-4 my-4">
          <Breadcrumb>
            <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
            <Breadcrumb.Item href='/user-dashboard'>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Profile</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Container>
      <p>{error} </p> 
      <div className="container">
        <form className={`${EditProfileCSS.userEditForm} mx-5 row`} onSubmit={(submitEvent) => { handleFormSubmit(submitEvent) }}>
          <div className="mb-4 col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className={`${EditProfileCSS.inputFieldClass} form-control ${firstNameError.length > 0 ? "is-invalid" : ""
                  }`}
                id="FirstName"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); setError('') }}
                onBlur={validateFirstName}
              />
              <label className={EditProfileCSS.firstNameLabel} htmlFor="FirstName">First Name</label>
              <div className={`${EditProfileCSS.invalidFeedback} invalid-feedback`}>{firstNameError}</div>
            </div>
          </div>

          <div className="mb-4 col-md-4">
            <div className="form-floating">
              <input
                type="text"
                className={`${EditProfileCSS.inputFieldClass} form-control ${lastNameError.length > 0 ? "is-invalid" : ""
                  }`}
                id="LastName"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); setError('') }}
                onBlur={validateLastName}
              />
              <label className={EditProfileCSS.lastNameLabel} htmlFor="LastName">Last Name</label>
              <div className={`${EditProfileCSS.invalidFeedback} invalid-feedback`}>{lastNameError}</div>
            </div>
          </div>

          {/*Assuming that the user is unable to change Email */}
          <div className="mb-4 col-md-8">
            <div className="form-floating">
              <input
                type="email"
                className={`${EditProfileCSS.inputFieldClass} form-control`}
                id="inputEmail"
                placeholder="E-mail"
                disabled
                value={email}
              />
              <label className={EditProfileCSS.emailLabel} htmlFor="inputEmail">E-mail</label>
            </div>
          </div>

          <div className="mb-4 col-md-8 col-sm-12">
            <div className="form-floating">
              <input
                type="text"
                className={`${EditProfileCSS.inputFieldClass} form-control ${addressOneError.length > 0 ? "is-invalid" : ""
                  }`}
                id="addressOne"
                placeholder="Address Line 1"
                required
                value={addressOne}
                onChange={(e) => { setAddressOne(e.target.value); setError('') }}
                onBlur={validateAddressOne}
              />
              <label className={EditProfileCSS.emailLabel} htmlFor="addressOne">Address Line 1</label>
              <div className={`${EditProfileCSS.invalidFeedback} invalid-feedback`}>{addressOneError}</div>
            </div>
          </div>

          <div className="mb-4 col-md-8 col-sm-12">
            <div className="form-floating">
              <input
                type="text"
                className={`${EditProfileCSS.inputFieldClass} form-control ${addressTwoError.length > 0 ? "is-invalid" : ""
                  }`}
                id="addressTwo"
                placeholder="Address Line 2"
                required
                value={addressTwo}
                onChange={(e) => { setAddressTwo(e.target.value); setError('') }}
                onBlur={validateAddressTwo}
              />
              <label className={EditProfileCSS.emailLabel} htmlFor="addressTwo">Address Line 2</label>
              <div className={`${EditProfileCSS.invalidFeedback} invalid-feedback`}>{addressTwoError}</div>
            </div>
          </div>

          <div className="mb-4 col-md-8 col-sm-12">
            <div className="form-floating">
              <input
                type="text"
                className={`${EditProfileCSS.inputFieldClass} form-control ${postalCodeError.length > 0 ? "is-invalid" : ""
                  }`}
                id="postalCode"
                placeholder="Postal Code"
                required
                value={postalCode}
                onChange={(e) => { setPostalCode(e.target.value); setError('') }}
                onBlur={validatePostalCode}
              />
              <label className={EditProfileCSS.emailLabel} htmlFor="postalCode">Postal Code</label>
              <div className={`${EditProfileCSS.invalidFeedback} invalid-feedback`}>{postalCodeError}</div>
            </div>
          </div>

          <div className={`${EditProfileCSS.mobileNumberDiv} mb-4 col-md-7`}>
            <div className="form-floating">
              <input
                type="tel"
                className={`${EditProfileCSS.inputFieldClass} form-control ${mobileError.length > 0 ? "is-invalid" : ""
                  }`}
                id="mobile"
                placeholder="Mobile Number"
                disabled
                value={mobile}
                onChange={(e) => { setMobile(e.target.value); setError('') }}
                onBlur={validateMobile}
              />
              <label className={EditProfileCSS.mobileLabel} htmlFor="mobile">Mobile No.</label>
              <div className={`${EditProfileCSS.invalidFeedback} invalid-feedback`}>{mobileError}</div>
            </div>
            <div>
              <Button
                className={EditProfileCSS.changeMobileButton}
                variant="success"
                onClick={() => { setMobilePopup(true); setError('') }}
              >Change</Button>
            </div>
            
          </div>
          <div className='col-8 text-center'>
              {/* <button className={`${EditProfileCSS.editUserReset} mt-3`} type="reset" >Reset</button> */}
              <Button className={EditProfileCSS.editUserSubmit} variant="warning" type="submit">Submit</Button>
            </div>
        </form>
      </div>

      <Modal show={mobilePopup}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Change Mobile Number</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/*Validating New Mobile Number left */}
            <form className={`mobileChangeForm`} onSubmit={sumbitEvent => handleMobileClose(sumbitEvent)}>
              <div className={`${EditProfileCSS.mobileChangeWrapper}`}>
                <div className={`form-floating`}>
                  <input
                    className={`${EditProfileCSS.inputMobile} form-control ${newMobileError.length > 0 ? "is-invalid" : ""}`}
                    id="newMobileNumber"
                    type="tel" value={newMobile}
                    onChange={e => setNewMobile(e.target.value)}
                    onBlur={validateNewMobile}
                  />
                  <label htmlFor="newMobileNumber">Mobile Number</label>
                  <div className={`${EditProfileCSS.invalidFeedback} invalid-feedback`}>{newMobileError}</div>
                </div>
                <Button
                  className={`${EditProfileCSS.mobileAlterConfirm}`}
                  variant="danger"
                  type="submit">
                  <span className={`${EditProfileCSS.changeButtonText}`}>Change</span>
                </Button>
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={noChangeMobile}>Cancel</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>

    </div>);
}

export default EditProfile;