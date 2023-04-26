import React, {useState, useEffect } from 'react'
import { Breadcrumb, Button, Container, Modal } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContextProvider';
import AddPaymentCard from './AddPaymentCard';
import requestToServer from '../services/Api'
import CPHomeCSS from './style-modules/CardPaymentHome.module.css'

const CardPaymentHome = () => {
    console.log('CardPaymentHome.js component Rendered')
    const { user } = useAuthContext();
    const MAX_YEAR_LIMIT = 5;
    const labelStyle ={
        top: "-20px", 
        padding: "20px",
        marginLeft: "-5px", 
        color: "#3f5f2b",
        letterSpacing: "1px", 
        opacity: "0.7",
        fontSize: '12px'
    }

    const [error, setError] = useState(null)
    const [editFormError, setEditFormError] = useState('')
    const [loading, setLoading] = useState(null)

    const [ showAddCard, setShowAddCard ] = useState(false);
    const [showEditCard, setShowEditCard ] = useState(false);
    const [ cardObject , setCardObject ] = useState({})
    const [paymentCards, setPaymentCards ] = useState([])

    const [cardNumber, setCardNumber ] = useState('')
    const [cardNumberError, setCardNumberError ] = useState('')

    const [expiryDate, setExpiryDate ] = useState('')
    const [expiryDateError, setExpiryDateError] = useState('')

    const [cardCVV, setCardCVV ] = useState('')
    const [cardCVVError, setCardCVVError ] = useState('')

    const [userName, setUserName] = useState('')
    const [userNameError, setUserNameError] = useState('')
    

    useEffect( () => {
        fetchCardData()
    },[])
 
    const fetchCardData = async ( ) => {
        console.log( 'user object logged in is: ', user );
        try {
            const response = await requestToServer.get("/cards/show-card/");
            if ( response.status === 200) {
                setPaymentCards(JSON.parse(JSON.stringify(response.data))) 
                setError(null)
            } else if (response.status === 404 ){
                alert('Error: The resource no longer exists on the requested path')
            } else {
                alert('Error: An error occured while retriving the cards')
            }
        } catch (error) {
            alert('The error of type: '+ error.message)
            console.log('In catch error portion: ', error)
            setError(error.message)
        } finally {
            setLoading( false )
        }

    }

    const handleCardDelete = async ( ) =>{
        // can we encrypt cardNumber while sending, and decrypt it and then delete the appropriate card?
        console.log('handle card delete will work to update the hostend')
        try {
            const response = await requestToServer.delete(`/cards/delete-card/${cardObject.cardNumber}`)
        
            if ( response.status === 200 ) {
                // do a replacement for this from react-router-dom@6
                window.location.href = `http://localhost:3000/user-dashboard/cards-payments`;
            }
            else if ( response.status === 401 ) {
                console.log('Unauthorized Access. Cannot Delete Card')
                alert('Unauthorized access. Cannot Delete Card')
            }
        } catch( error) {
            alert('The error of type: '+ error.message)
            console.log('In catch error portion: ', error)
            setError(error.message)
        }
    }

    const selectPaymentCard = (cardNumber) => {
        let object = paymentCards.find ( card => card.cardNumber === cardNumber)
        setCardObject({...object})
    }
    const handleEditPayment = (cardNumber) => {
  
        editPaymentCard(cardNumber)
        setShowEditCard(true)

    }

    const editPaymentCard = (cardNumber) => {
        let object = paymentCards.find( card => card.cardNumber === cardNumber)
        console.log('card EDIT Object: ', object);

        setUserName(object.userName)
        setCardCVV(object.cardCVV)
        setExpiryDate(object.expiryDate)
        setCardNumber(object.cardNumber)
        
    }

    const editFromSubmit = async (editCardEvent) => {
        editCardEvent.preventDefault();

        let isValid = 
        validateUserName() &&
        validateCardNumber() &&
        validateExpiryDate() &&
        validateCardCVV();
 
        if ( isValid ) {
            try {
                const userCard = {
                    email: user.email,
                    userName: userName,
                    cardNumber: cardNumber,
                    expiryDate: expiryDate,
                    cardCVV: cardCVV
                };
    
                const response = await requestToServer.put(`/cards/update-card/${cardNumber}` , JSON.stringify(userCard))
    
                if ( response.status === 200 ) {
                    // do a replacement for this
                    window.location.href = `http://localhost:3000/user-dashboard/cards-payments`;
                } else if ( response.status === 401 ){
                    console.log('Unauthorized Access. Cannot Update Card')
                    alert('Unauthorized access. Cannot Update Card')
                }
    
            } catch (errorObject) {
                alert('The error of type: '+ errorObject.message)
                setError(errorObject.message)
            }
        }  else {
            setEditFormError('Check the entries in this form and then re-submit.')
        }

    }

    const handleEditModalClose = () => {
        setShowEditCard(false)
        setCardNumberError('')
        setExpiryDateError('')
        setCardCVVError('')
        setUserNameError('')
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

        // if ( isValidDate ) 
        // setExpiryDateError('')

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

        // if ( isValidCardCVV )
        // setCardCVVError("")

        return isValidCardCVV;
    };

    const validateUserName = () => {
        let result = false;
        if (userName.trim().length < 3) {
          setUserNameError("Please enter the name on card");
        } else {
            setUserNameError("");
          result = true;
        }
        return result;
      };

    const validateCardNumber = () => {
        let isValidCardNumber = true;

        while( true ) {
            if ( isNaN(cardNumber) ) {
                isValidCardNumber = false;
                setCardNumberError('Card Number must be digits only')
                break;
            }

            if ( cardNumber.length !== 16) {
                isValidCardNumber = false;
                setCardNumberError('Card Number must be of 16 digits')
                break;
            }

            if ( isValidCardNumber) 
                setCardNumberError('')
            

            break;
        } 

        // if ( isValidCardNumber) 
        // setCardNumberError('')
    return isValidCardNumber
        
    }

    return ( 
    <div className={`${CPHomeCSS.cardPaymentWrapper}`}>
        <Container fluid="lg">
            <Breadcrumb className="ms-4">
                <Breadcrumb.Item href="/">Home </Breadcrumb.Item>
                <Breadcrumb.Item href='/user-dashboard'>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Cards &amp; Payments</Breadcrumb.Item>
            </Breadcrumb>       
        </Container>

            {
                paymentCards.length > 0 ?   <div className={`${CPHomeCSS.allCardsWrapper}`}>
                      <p className={`${CPHomeCSS.availableCardsText}`}>Cards Available :</p>
                      {error} <br/>
                      {loading && <p className={`${CPHomeCSS.loadingMessage}`}>Loading...</p> }
                {
                    paymentCards.map( paymentCard => <div key={paymentCard._id} className={`${CPHomeCSS.individualCardWrapper}`}>
                        <div className={`${CPHomeCSS.nameDiv}`}>
                            <div className={CPHomeCSS.fullName}>{paymentCard.userName}</div>
                            <div className="emptyDiv"></div>
                        </div>

                        <div className={`${CPHomeCSS.cardNumberDiv}`}>
                            <div className={CPHomeCSS.cardNumber}>{formatCardNumber(paymentCard.cardNumber,4)}</div>
                            <div className="emptyDiv"></div>
                        </div>

                        <hr className={CPHomeCSS.transparentSpace}/>

                        <div className={`${CPHomeCSS.expiryDateDiv}`}>
                            <div className={CPHomeCSS.expiryDate}>Exp Date: {paymentCard.expiryDate}</div>
                            <div className="emptyDiv"></div>
                        </div>
                        <hr className={CPHomeCSS.transparentSpace}/>
                        
                        <div className={`${CPHomeCSS.editDeleteDiv}`}>
                            {/* <div className={CPHomeCSS.editCard} data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=>editPaymentCard(paymentCard.cardNumber)}>Edit Card</div> */}
                            <div className={CPHomeCSS.editCard} onClick={()=>handleEditPayment(paymentCard.cardNumber)}>Edit Card</div>
                            <div className={CPHomeCSS.deleteCard} data-bs-toggle="modal" data-bs-target="#staticBackdrop"  onClick={()=> selectPaymentCard(paymentCard.cardNumber)} >
                                Delete Card
                            </div>
                        
                        </div>  
                    </div> )
                }
                </div> : <div className={`${CPHomeCSS.addCardPrompt} ms-2`}>
                    <p className={`${CPHomeCSS.leadText} lead ms-4`}>You haven't added any payment card(s) yet.</p>
                    <p className={`${CPHomeCSS.pleaseText} bold ms-4`}>Please add a card.</p>
                
                </div>
            }

            {/* Add A Card button */}   
            <div className={`${CPHomeCSS.addCardDiv}`}>
                <div className="emptyDiv"></div>
                <Button className={CPHomeCSS.addCardButton} onClick={()=> setShowAddCard(true)}>
                    Add A Card
                </Button>
            </div>
                
           {/* Modal for deleting a card */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Delete card?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {/*Creating a preview of the card */}
                        <div className={`${CPHomeCSS.individualCardWrapper}`}>
                            <div className={`${CPHomeCSS.nameDiv}`}>
                                <div className={CPHomeCSS.fullName}>{cardObject.userName}</div>
                                <div className="emptyDiv"></div>
                            </div>

                            <div className={`${CPHomeCSS.cardNumberDiv}`}>
                                <div className={CPHomeCSS.cardNumber}>{cardObject.cardNumber}</div>
                                <div className="emptyDiv"></div>
                            </div>
                            <hr className={CPHomeCSS.transparentSpace}/>
                            <div className={`${CPHomeCSS.expiryDateDiv}`}>
                                <div className={CPHomeCSS.expiryDate}>Exp Date: {cardObject.expiryDate}</div>
                                <div className="emptyDiv"></div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=> handleCardDelete() }>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
 
        {/*Modal for Adding a Card */}
        <Modal 
            show={showAddCard} 
            onHide={()=>setShowAddCard(false)}
            backdrop="static"
        >
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Payment Card</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <AddPaymentCard setShowAddCard={setShowAddCard}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={()=>setShowAddCard(false)}>Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>

            {/* Modal for editing a card */}
            <Modal show={showEditCard} onHide={handleEditModalClose}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Payment Card &nbsp; &nbsp; &nbsp;</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    <p>{editFormError}</p>
                    <form className={`${CPHomeCSS.editFormTag}`} onSubmit={editCardEvent => { editFromSubmit(editCardEvent)}}>
                            <div className="form-floating mb-4">
                                <input
                                    id="floatingUserName"
                                    className={`${CPHomeCSS.editInputFormField} ${
                                        userNameError.length > 0 ? "is-invalid" : ""
                                      }`} 
                                    type="text" 
                                    value={userName} 
                                    onChange={e => {setUserName(e.target.value); setEditFormError('')}}
                                    onBlur={validateUserName}
                                    required
                                />
                                <label 
                                style={labelStyle}
                                htmlFor="floatingUserName">User Name</label>
                                <div className="invalid-feedback">{userNameError}</div>
                            </div>
                            
                            <div className="form-floating mb-4">
                                <input 
                                    id="floatingCardNumber"
                                    className={`${CPHomeCSS.editInputFormField}`} 
                                    type="text" 
                                    value={formatCardNumber(cardNumber, 4)} 
                                    disabled
                                    required
                                />
                                <label 
                                    style={labelStyle}
                                    htmlFor="floatingCardNumber">Card Number
                                </label>                                
                            </div>
                            
                            <div className="form-floating mb-4">
                                <input 
                                    id="floatingExpiryDate"
                                    className={`${CPHomeCSS.editInputFormField} ${
                                        expiryDateError.length > 0 ? "is-invalid" : ""
                                      }` } 
                                    type="text" 
                                    value={expiryDate}
                                    // onFocus={setEditFormError} 
                                    onChange={e => {setExpiryDate(e.target.value); setEditFormError('')}}
                                    onBlur={validateExpiryDate}
                                />
                                <label
                                    style={labelStyle}
                                    htmlFor="floatingExpiryDate">Expiry Date (MM/YY)
                                </label>
                                <div className="invalid-feedback">{expiryDateError}</div>    
                            </div>

                            <div className="form-floating mb-4">
                                <input
                                    id="floatingCardCVV" 
                                    className={`${CPHomeCSS.editInputFormField}  ${
                                        cardCVVError.length > 0 ? "is-invalid" : ""
                                      }`} 
                                    type="text" value={cardCVV} 
                                    onChange={e => {setCardCVV(e.target.value); setEditFormError('')}}
                                    onBlur={validateCardCVV}
                                />
                                <label
                                    style={labelStyle}
                                    htmlFor="floatingCardCVV">Card CVV
                                </label>
                                <div className="invalid-feedback">{cardCVVError}</div>    
                            </div>
                        <button  className={`${CPHomeCSS.editCardButton}`} type="submit">Submit</button>
                    </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={handleEditModalClose}>Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
    </div>  
    );
}
 
export default CardPaymentHome;