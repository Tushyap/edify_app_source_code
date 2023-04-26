import React, {useState} from 'react'
import {  Button, Modal } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContextProvider';
import APCardCSS from './style-modules/AddPaymentCard.module.css'
import requestToServer from '../services/Api'

const AddPaymentCard = ( {setShowAddCard}) => {
    console.log('AddPaymentCard.js component Rendered')
    const { user } = useAuthContext();
    const MAX_YEAR_LIMIT = 5;
    
    const [cardAdded, setCardAdded] = useState(false)

    const [firstName, setFirstName] = useState('')
    const [firstNameError, setFirstNameError ] = useState('');

    const [lastName, setLastName] = useState('')
    const [lastNameError, setLastNameError] = useState("")

    const [cardNumber, setCardNumber ] = useState('')
    const [cardNumberError, setCardNumberError ] = useState('')

    const [expiryDate, setExpiryDate ] = useState('')
    const [expiryDateError, setExpiryDateError] = useState('')

    const [cardCVV, setCardCVV ] = useState('')
    const [cardCVVError, setCardCVVError] = useState('')

    const [error, setError ] = useState(null)
    // const [addFormError, setAdd]

    const closeModal = () => {
        setFirstName('');
        setLastName('');
        setCardNumber('');
        setExpiryDate('');
        setCardCVV('');
        setCardAdded(false)
        setShowAddCard(false)
        window.location.href = `http://localhost:3000/user-dashboard/cards-payments`;
    }

    const formatCardNumber = (cardNumberString, chunkSize) => {
        let index = 0
        let tempArray = []
        let cardNumberArray = Array.from( cardNumberString )
        let arrayLength = cardNumberArray.length;

        for ( index = 0 ; index < arrayLength ; index += chunkSize ) {
            let tempChunk = [ ]
            tempChunk = cardNumberArray.slice(index, index + chunkSize);
            tempArray.push(tempChunk.join(""))
        }
        let returnCardString = new String(tempArray.join(" "))

        return returnCardString
    }

    const validateCardNumber = () => {
        let isValidCardNumber = true;

        while( true ) {
            if ( isNaN(cardNumber) ) {
                isValidCardNumber = false;
                setCardNumberError('Card Number must be digits only')
                break;
            }

            if ( cardNumber.length !== 16 ) {
                isValidCardNumber = false;
                setCardNumberError('Card Number must be of 16 digits')
                break;
            }


            if ( isValidCardNumber) 
                setCardNumberError('');
            

            break;
        } 

    return isValidCardNumber;
        
    }

    const validateExpiryDate = () =>{
        let isValidDate = true;
        const expiryDateString = expiryDate;
        const todayDate = new Date();
        const currentMonth = todayDate.getMonth() + 1;
        const currentYear = parseInt(todayDate.getFullYear().toString().substr(2,2));
        const extractedMonth = expiryDateString.substr(0,2);
        const extractedYear = expiryDateString.substr(3,2)
        const numExtMonth = parseInt(extractedMonth)
        const numExtYear = parseInt(extractedYear)

        while( true ) {

            if ( expiryDateString.length === 0) {
                setExpiryDateError('Expiry Date cannot be left blank')
                isValidDate = false;
                break;
            }

            if ( expiryDateString.length !== 5 || expiryDateString[2] !== '/')
            {
                setExpiryDateError('Expiry Date must be in format: MM/YY')
                isValidDate = false;
                break;
            }

            if ( isNaN(extractedMonth) || isNaN(extractedYear)  ) {
                isValidDate = false;
                setExpiryDateError('Please enter digits for MM and/or YY')
                break;
            }   

            if ( numExtMonth > 12 || numExtMonth === 0 ) {
                isValidDate = false;
                setExpiryDateError('Month value cannot be 0 or exceed 12.')
                break;
            }

            if ( numExtYear < currentYear ) {
                isValidDate = false;
                setExpiryDateError(`Year value cannot be lesser than ${currentYear}`)
                break;
            }             

            if ( numExtYear > ( currentYear + MAX_YEAR_LIMIT) ) {
                isValidDate = false;
                setExpiryDateError(`Year value must not be greater than ${currentYear + MAX_YEAR_LIMIT}`)
                break;
            }

            if ( numExtYear === currentYear && numExtMonth < currentMonth ) {
                isValidDate = false;
                setExpiryDateError(`Month value must not be lesser than current month: ${currentMonth}`)
                break;
            }  

            if ( isValidDate ) {
                setExpiryDateError('')
            }

            break;
        }


        return isValidDate;
     
    }

    const validateCardCVV = () => {
        let isValidCardCVV = true;

        while ( true ) {
            if ( cardCVV.length > 4 || cardCVV.length < 3) {
                isValidCardCVV = false;
                setCardCVVError('Card CVV must be of three or four digits')
                break;
            }

            if ( isNaN(cardCVV) ) {
                isValidCardCVV = false;
                setCardCVVError('Card CVV must be digits only.')
                break;
            }

            if ( parseInt(cardCVV) < 100 || parseInt(cardCVV) > 9999 ) {
                isValidCardCVV = false;
                setCardCVVError('Card CVV must be between 100 - 9999')
                break;
            }

            if ( isValidCardCVV )
            setCardCVVError("")

            break;
        }


        return isValidCardCVV;
    };

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


    const handleFormSubmit = async ( submitEvent ) => {
        submitEvent.preventDefault()

        let isValid = 
        validateFirstName() &&
        validateLastName() &&
        validateCardNumber() &&
        validateExpiryDate() &&
        validateCardCVV();

        if( isValid ) {
            try {            
                const cardObject =  {
                    email: user.email,
                    userName: firstName + ' ' + lastName,
                    cardNumber: cardNumber,
                    expiryDate: expiryDate,
                    cardCVV: cardCVV
                }
                setError('')
                console.log('cardObject', cardObject);
                const response = await requestToServer.post(`/cards/add-card` , JSON.stringify(cardObject))
    
                if ( response.status === 200 ) {
                    setCardAdded(true)
                } else if ( response.status === 401 ){
                    console.log('Unauthorized Access. Cannot Update Card')
                    alert('Unauthorized access. Cannot Update Card')
                }

            } catch (error) {
                // alert('The error of type: '+ error.message)
                setError(error.message)

                const { code, keyPattern, message } = error.response.data?.message;

                console.log('CODE: ', code)
                console.log('KeyPATTERN: ', keyPattern)
                console.log('MESSAGE: ', message)

                if (code === 11000) {
                    setError('The Card number is already taken.')
                }
                
            } 
    } else {
        setError('Check the entries in this form and then re-submit.')
    }

        
    }

    return (
        <div className={APCardCSS.addAPCardWrapper}>
            <p>{error}</p>
            {/* <p className={`${APCardCSS.topInstruction}`}>Fill in the following details to add a card.</p> */}
            <div className={`${APCardCSS.addFormWrapper} container`}>
                <form className={`mx-5 row`} onSubmit={(submitEvent)=> handleFormSubmit(submitEvent) }>
                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className={`${APCardCSS.inputFieldClass} form-control ${
                                        firstNameError.length > 0 ? "is-invalid" : ""
                                      }`}
                                    id="firstName"
                                    placeholder="First Name"
                                    required
                                    value={firstName}
                                    onChange={(e) => {setFirstName(e.target.value); setError('')}}
                                    onBlur={validateFirstName}
                                />
                                <label className={APCardCSS.firstNameLabel} htmlFor="firstName">First Name</label>
                                <div className="invalid-feedback">{firstNameError}</div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className={`${APCardCSS.inputFieldClass} form-control  ${
                                        lastNameError.length > 0 ? "is-invalid" : ""
                                      }`}
                                    id="lastName"
                                    placeholder="Last Name"
                                    required
                                    value={lastName}
                                    onChange={(e) => {setLastName(e.target.value); setError('')}}
                                    onBlur={validateLastName}
                                />
                                <label className={APCardCSS.lastNameLabel} htmlFor="lastName">Last Name</label>
                                <div className="invalid-feedback">{lastNameError}</div>
                            </div>
                        </div>


                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className={`${APCardCSS.inputFieldClass} form-control  ${
                                        cardNumberError.length > 0 ? "is-invalid" : ""
                                      }`}
                                    id="cardNumber"
                                    placeholder="Card Number"
                                    required
                                    value={cardNumber}
                                    onChange={(e) => {setCardNumber(e.target.value); setError('')}}
                                    onBlur={validateCardNumber}
                                />
                                <label className={APCardCSS.cardNameLabel} htmlFor="cardNumber">Card Number</label>
                                <div className="invalid-feedback">{cardNumberError}</div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className={`${APCardCSS.inputFieldClass} form-control  ${
                                        expiryDateError.length > 0 ? "is-invalid" : ""
                                      }`}
                                    id="expiryDate"
                                    placeholder="Expiry Date"
                                    required
                                    value={expiryDate}
                                    onChange={(e) => {setExpiryDate(e.target.value); setError('')}}
                                    onBlur={validateExpiryDate}
                                />
                                <label 
                                    className={APCardCSS.expiryDateLabel} 
                                    htmlFor="expiryDate">Expiry Date (MM/YY)
                                </label>
                                <div className="invalid-feedback">{expiryDateError}</div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className={`${APCardCSS.inputFieldClass} form-control ${
                                        cardCVVError.length > 0 ? "is-invalid" : ""
                                      }`}
                                    id="CVVCode"
                                    placeholder="CVV Code"
                                    required
                                    value={cardCVV}
                                    onChange={(e) => {setCardCVV(e.target.value); setError('')}}
                                    onBlur={validateCardCVV}
                                />
                                <label className={APCardCSS.expiryDateLabel} htmlFor="CVVCode">CVV Code</label>
                                <div className="invalid-feedback">{cardCVVError}</div>
                            </div>
                        </div>
                            <br/>
                            <button  className={`${APCardCSS.addCardButton} mb-4`} type="submit">Submit</button>
                    
                        
                </form>
            </div>
            <Modal show={cardAdded} animation={false}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Attention!</Modal.Title>   
                    </Modal.Header>

                    <Modal.Body>
                        Card Number: <span className={`${APCardCSS.cardNumberColour}`}>{formatCardNumber(cardNumber,4) }</span> added successfully.
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=> closeModal()}>Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div> 

     );
}
 
export default AddPaymentCard;