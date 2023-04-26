import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/Api";
import { useAuthContext } from "../contexts/AuthContextProvider";

import { Modal, Button } from "react-bootstrap";

// Test Card
// 4111 1111 1111 1111

const Checkout = () => {
  const { slug } = useParams();
  const { user } = useAuthContext();

  // All user information
  const [userInformation, setUserInformation] = useState({});

  // Course details
  const [courseDetails, setCourseDetails] = useState({});

  // User cards list
  const [userCards, setUserCards] = useState([]);

  // selectedCard information for payment
  const [selectedCard, setSelectedCard] = useState(null);

  // cardLoading status
  const [cardLoading, setCardLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [courseSlug, setCourseSlug] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseAmount, setCourseAmount] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [paymentTrxnId, setPaymentTrxnId] = useState("");

  // Form variables
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");

  const [cardHolder, setCardHolder] = useState("");
  const [cardHolderError, setCardHolderError] = useState("");

  const [cardExpiryDate, setCardExpiryDate] = useState("");
  const [cardExpiryDateError, setCardExpiryDateError] = useState("");

  const [cardCvvNumber, setCardCvvNumber] = useState("");
  const [cardCvvNumberError, setCardCvvNumberError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
  };

  const validateCardHolder = () => {
    let result = false;
    if (cardHolder.trim().length < 3) {
      setCardHolderError("Please enter card holder name.");
    } else {
      setCardHolderError("");
      result = true;
    }
    return result;
  };

  const validateCardExpiryDate = () => {

    const MAX_YEAR_LIMIT = 5;
    let isValidDate = true;
    const expiryDateString = cardExpiryDate;
    const todayDate = new Date();
    const currentMonth = todayDate.getMonth() + 1;
    const currentYear = parseInt(todayDate.getFullYear().toString().substr(2,2));
    const extractedMonth = expiryDateString.substr(0,2);
    const extractedYear = expiryDateString.substr(3,2)
    const numExtMonth = parseInt(extractedMonth)
    const numExtYear = parseInt(extractedYear)

    while( true ) {

        if ( expiryDateString.length === 0) {
          setCardExpiryDateError('Expiry Date cannot be left blank')
            isValidDate = false;
            break;
        }

        if ( expiryDateString.length !== 5 || expiryDateString[2] !== '/')
        {
          setCardExpiryDateError('Expiry Date must be in format: MM/YY')
            isValidDate = false;
            break;
        }

        if ( isNaN(extractedMonth) || isNaN(extractedYear)  ) {
            isValidDate = false;
            setCardExpiryDateError('Please enter digits for MM and/or YY')
            break;
        }   

        if ( numExtMonth > 12 || numExtMonth === 0 ) {
            isValidDate = false;
            setCardExpiryDateError('Month value cannot be 0 or exceed 12.')
            break;
        }

        if ( numExtYear < currentYear ) {
            isValidDate = false;
            setCardExpiryDateError(`Year value cannot be lesser than ${currentYear}`)
            break;
        }             

        if ( numExtYear > ( currentYear + MAX_YEAR_LIMIT) ) {
            isValidDate = false;
            setCardExpiryDateError(`Year value must not be greater than ${currentYear + MAX_YEAR_LIMIT}`)
            break;
        }

        if ( numExtYear === currentYear && numExtMonth < currentMonth ) {
            isValidDate = false;
            setCardExpiryDateError(`Month value must not be lesser than current month: ${currentMonth}`)
            break;
        }  

        if ( isValidDate ) {
          setCardExpiryDateError('')
        }

        break;
    }


    return isValidDate;
  };


  const validateCardCvvNumber = () => {

    let isValidCardCVV = true;

    while ( true ) {
        if ( cardCvvNumber.length > 4 || cardCvvNumber.length < 3) {
            isValidCardCVV = false;
            setCardCvvNumberError('Card CVV must be of three or four digits')
            break;
        }

        if ( isNaN(cardCvvNumber) ) {
            isValidCardCVV = false;
            setCardCvvNumberError('Card CVV must be digits only.')
            break;
        }

        if ( parseInt(cardCvvNumber) < 100 || parseInt(cardCvvNumber) > 9999 ) {
            isValidCardCVV = false;
            setCardCvvNumberError('Card CVV must be between 100 - 9999')
            break;
        }

        if ( isValidCardCVV )
        setCardCvvNumberError("")

        break;
    }

    return isValidCardCVV;
  };

  // Is filled form information going to be saved?
  const [saveCardInfoStatus, setSaveCardInfoStatus] = useState(false);

  // Handles status of saveCardInfoStatus variable
  const handleSaveCardInfo = () => setSaveCardInfoStatus(!saveCardInfoStatus);

  /**
   * Gets the course details
   */
  const getCourseDetail = async () => {
    try {
      const response = await api.get("courses/" + slug);
      if (response.status === 200) {
        setCourseDetails(response.data);
        setCourseName(response.data.name);
        setCourseAmount(response.data.price);
        setCourseDuration(response.data.duration);
        setCourseSlug(response.data.slug);

        console.log(response.data)
        console.log(response.data.slug)
        console.log(response.data.duration)
        

      } else {
        alert("An error occured while fetching courses!");
      }
    } catch (error) {
      alert(error);
    }
  };

  /**
   * Gets user's card information for payment
   */
  const getMyCards = async () => {
    setCardLoading(true);
    try {
      const response = await api.get("cards/show-card/");

      if (response.status === 200) {
        setUserCards(response.data);

        if (response.data.length > 0) {
          handleShow();
        } else {
          handleClose();
        }
      } else {
        alert("An error occured while fetching courses!");
      }
    } catch (error) {
      alert(error);
    } finally {
      setCardLoading(false);
    }
  };

  /**
   * Get all user information
   */
  const getUserInformation = async () => {
    try {
      const response = await api.get("auth/me");

      if (response.status === 200) {
        setUserInformation(response.data);
        setName(response.data.firstName + " " + response.data.lastName);
        setEmail(response.data.email);
        console.log(response.data.firstName + " " + response.data.lastName)
        console.log(response.data.email)
        

      } else {
        alert("An error occured while fetching user informations!");
      }
    } catch (error) {
      alert(error);
    }
  };

const getBatchStartDate = () => {
  
    let todayDate = new Date();  
    let dayToday = todayDate.getDate();
    let currentMonth = todayDate.getMonth() + 1;
    let currentYear = todayDate.getFullYear();
    
    let desiredMonth = 0, desiredYear = 0 , desiredDate = 15, addedMonth = 0 ;

    if ( dayToday >= 15 ) {
      desiredMonth = currentMonth + 1;
    
      if( desiredMonth  <= 12 ){
        desiredYear = currentYear;
      }
      
      if ( desiredMonth  > 12 ) {
        desiredYear = currentYear + 1
         desiredMonth = 1;
      }     
      
    } else if ( dayToday < 15 ) {
      desiredMonth = currentMonth;
      desiredYear = currentYear;
    }
             var desMonStr = "";
               if (desiredMonth.toString().length === 1) {
                    desMonStr += "0" + desiredMonth.toString();
               } else 
        desMonStr = desiredMonth.toString();
    
    let batchStartDate = "";
    batchStartDate = batchStartDate + desiredDate + "/" + desMonStr + "/" + desiredYear ; 
    return batchStartDate;
   
  }
     

const getBatchEndDate =(batchStartString) => {  
  let tempStartString = batchStartString
  let duration = courseDuration;
  let batchStartDay = 15;
  let batchStartMonth = parseInt(tempStartString.split('/')[1]) - 1;
   
  let batchStartYear = parseInt(tempStartString.split('/')[2]);
  let currentDateObj = new Date(batchStartYear, batchStartMonth, batchStartDay)
  
  // assuming a month to be of 30 days
  let durationMilliSeconds = ( duration * 30* 86400000 );
   
  let currentDateObjMilli = currentDateObj.getTime();
  
  let futureDateObjectMilli = currentDateObjMilli + durationMilliSeconds;
   
   
    let batchEndDate = new Date();
    batchEndDate.setTime(futureDateObjectMilli);
  console.log('batchEndDate :', batchEndDate )
    
    let batchEndDay = 15; // neglecting the batchEndDay calculated in batchEndDate
    let batchEndMonth = batchEndDate.getMonth() + 1; 
    let batchEndYear = batchEndDate.getFullYear();  
    var desMonStr = "";
             if (batchEndMonth.toString().length === 1) {
                  desMonStr += "0" + batchEndMonth.toString();
             } else 
      desMonStr = batchEndMonth.toString();
  
  let batchEndDateStr = "";
  batchEndDateStr = batchEndDateStr + batchEndDay + "/" + desMonStr + "/" + batchEndYear ;  
  return batchEndDateStr;
  
    }

    const createBatchId = (batchStartString, slugStr )=> {
      let tempStartString = batchStartString
      
      let removeSpecialCharStr = slugStr.replace(/[^a-zA-Z0-9 ]/g, '');
      let slug = removeSpecialCharStr.substr(0,5).toUpperCase();
      console.log('slug: ', slug)
      
      
        if ( slug.length === 4) {
          slug += 'X';
        } else if ( slug.length === 3) {
          slug += 'ZZ'
        } else if ( slug.length === 2) {
          slug += 'ZZZ'
        } else if (slug.length === 1 ) {
          slug += 'ZZZZ'
        }
      let batchStartDay = 15;
      let batchStartMonth = parseInt(tempStartString.split('/')[1]);
        console.log('batchStartMonth: ', batchStartMonth)
       
      let batchYY = (tempStartString.split('/')[2]).substr(2,2);
        console.log('batchYY: ', batchYY)
        let monthAbbrString = "";
        switch( batchStartMonth ) {
          case 1: monthAbbrString = "JAN";
          break;
          case 2: monthAbbrString = "FEB";
          break;
          case 3: monthAbbrString = "MAR";
          break;
          case 4: monthAbbrString = "APR";
          break;
          case 5: monthAbbrString = "MAY";
          break;
          case 6: monthAbbrString = "JUN";
          break;
          case 7: monthAbbrString = "JUL";
          break;
          case 8: monthAbbrString = "AUG";
          break;
          case 9: monthAbbrString = "SEP";
          break;
          case 10: monthAbbrString = "OCT";
          break;
          case 11: monthAbbrString = "NOV";
          break;
          case 12: monthAbbrString = "DEC";
          break;
          default: monthAbbrString = "ABC";
        }     
        return monthAbbrString + batchYY + "_" + slug
      }

      const  randomEnrolmentId=()=> {
        return  Math.round( Math.random() * 10000000000);
    }

  const postEnrolmentData = async () => {
       
    
    const enrolUser = {

      enrolmentId: randomEnrolmentId(),
      slug:courseSlug,
      email: email,
      userEnrolStatus: "active",
      userName: name,
      paymentId: paymentTrxnId,      
      batchStartDate: getBatchStartDate(),
      batchEndDate: getBatchEndDate(getBatchStartDate()),
      courseName: courseName,
      courseAmount: courseAmount,
      batchId: createBatchId(getBatchStartDate(),slug)
    }

    try {
      console.log("batchId ------",createBatchId(getBatchStartDate(),slug))
      const response = await api.post(`/admin/enrollments/`, JSON.stringify(enrolUser))
      if (response.status === 200) {
        setSuccess('User Enrolled Successfully')
        console.log('user enrolled')

      }
    } catch (errorObject) {
      console.log('Error', errorObject)
      setError(errorObject.message)
    }
  
  }


  /**
   * When page is loaded;
   * Get the course information and user's cards
   */
  useEffect(() => {
    getCourseDetail();
    getMyCards();
    getUserInformation();
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setSelectedCard(null);
    setShowModal(false);
  };
  const handleShow = () => setShowModal(true);

  /**
   * Creates order with course name and id details
   * @param {*} amount Order amount
   * @param {*} courseName Course Name
   * @param {*} courseId Course Id
   * @returns An object contains order.id and order.amount
   */
  const createOrder = async (amount, courseName, courseId) => {
    let order = {};
    try {
      // create an order
      const orderResponse = await api.post("payments/create-order", {
        courseId: courseId,
        courseName: courseName,
        amount: amount,
      });

      order.id = orderResponse.data.id;
      order.amount = orderResponse.data.amount;
    } catch (error) {
      alert(error);
    } finally {
      return order;
    }
  };

  const createPaymentOptions = async () => {
    // create an order
    const order = await createOrder(
      courseDetails.price,
      courseDetails.name,
      courseDetails._id
    );

    const cardInformation = {};

    // Fill the card Information object according to if there is a chosen card or filled form information for payment
    if (selectedCard) {
      cardInformation.cardNumber = selectedCard.cardNumber;
      cardInformation.userName = selectedCard.userName;
      cardInformation.expiryMM = selectedCard.expiryDate.split("/")[0];
      cardInformation.expiryYY = selectedCard.expiryDate.split("/")[1];
      cardInformation.cardCVV = selectedCard.cardCVV;
    } else {
      cardInformation.cardNumber = cardNumber;
      cardInformation.userName = cardHolder;
      cardInformation.expiryMM = cardExpiryDate.split("/")[0];
      cardInformation.expiryYY = cardExpiryDate.split("/")[1];
      cardInformation.cardCVV = cardCvvNumber;
    }

    // Options object for payment
    let options = {
      order_id: order.id,
      amount: order.amount,
      currency: "INR",
      contact: userInformation.mobile,
      email: userInformation.email,
      description: courseDetails.name,
      method: "card",
      card: {
        number: cardInformation.cardNumber,
        name: cardInformation.userName,
        expiry_month: cardInformation.expiryMM,
        expiry_year: cardInformation.expiryYY,
        cvv: cardInformation.cardCVV,
      },
    };

    return options;
  };

  // After payment show a message whether success or error
  const [paymentResultMessage, setPaymentResultMessage] = useState({
    message: "",
    error: false,
  });

  /**
   * Makes payment
   * @param {*} e
   */
  const handlePayment = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/razorpay.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load!");
    };

    script.onload = async () => {
      try {
        // create payment options
        const options = await createPaymentOptions();

        // create razorpay object then createpayment
        const razorpay = new window.Razorpay(options);
        razorpay.createPayment(options);

        // listen for payment events

        razorpay.on("payment.success", async function (paymentResponse) {
          // If payment successfull and saveCardInfoStatus==true then save the card information
          if (saveCardInfoStatus) {
            await saveCardInformation();
            setPaymentResultMessage({
              message: `Your payment has been successfully made, thank you.\nYour card has been saved for later use.`,
              error: false,
            });
          } else {
            setPaymentResultMessage({
              message: `Your payment has been successfully made, thank you.`,
              error: false,
            });
          }
          console.log("yes my payment is done")

          const result = await api.post("payments/verify", {
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature,
          });
          setPaymentTrxnId(paymentResponse.razorpay_payment_id)
          
          console.log("payment response :", paymentResponse);
          console.log("payment results :", result);
          postEnrolmentData();
        });

        razorpay.on("payment.error", function (errorResponse) {
          alert(errorResponse.error.description);
          setPaymentResultMessage({
            message: `Your payment has been failed!\n${errorResponse.error.description}`,
            error: true,
          });
        });
      } catch (error) {
        alert(error);
      } finally {
        handleClose();
      }
    };

    document.body.appendChild(script);
  };

  /**
   * Saves card information
   */
  const saveCardInformation = async () => {
    const cardObject = {
      email: user.email,
      userName: cardHolder,
      cardNumber: cardNumber,
      expiryDate: cardExpiryDate,
      cardCVV: cardCvvNumber,
    };

    try {
      const response = await api.post("cards/add-card", cardObject);
    } catch (error) {
      alert(error);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (selectedCard) {
      handlePayment();
    } else {
      // validate the form information
      let isValid =
        validateCardHolder() &&
        validateCardNumber() &&
        validateCardExpiryDate() &&
        validateCardCvvNumber();

      if (isValid) {
        handlePayment();
      }
    }
  };
console.log("checkout rendered")
console.log(getBatchStartDate())
  return (
    <div className="container">
      <div className="row pt-5 pb-3">
        <h3>Checkout</h3>
      </div>
      <div className="row pb-5 gx-5">
        {paymentResultMessage.message && (
          <div
            className={`alert ${paymentResultMessage.error ? "alert-danger" : "alert-success"
              }`}
            role="alert"
          >
            {paymentResultMessage.message}
          </div>
        )}
        <div className="col-md-8 mb-5  order-2">
          <div className="row">
            <form id="form" onSubmit={handleForm}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${cardHolderError.length > 0 ? "is-invalid" : ""
                    }`}
                  id="cc-name"
                  placeholder="Name on Card"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  onBlur={validateCardHolder}
                />
                <label htmlFor="cc-name">Name on Card</label>
                <div className="invalid-feedback">{cardHolderError}</div>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${cardNumberError.length > 0 ? "is-invalid" : ""
                    }`}
                  id="cc-number"
                  placeholder="Credit Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  onBlur={validateCardNumber}
                />
                <label htmlFor="cc-number">Credit Card Number</label>
                <div className="invalid-feedback">{cardNumberError}</div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${cardExpiryDateError.length > 0 ? "is-invalid" : ""
                        }`}
                      id="cc-expiration"
                      placeholder="Exp. MM/YY"
                      value={cardExpiryDate}
                      onChange={(e) => setCardExpiryDate(e.target.value)}
                      onBlur={validateCardExpiryDate}
                    />
                    <label htmlFor="cc-expiration">Expiry Date</label>
                    <div className="invalid-feedback">
                      {cardExpiryDateError}
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className={`form-control ${cardCvvNumberError.length > 0 ? "is-invalid" : ""
                        }`}
                      placeholder="CVV"
                      id="cc-cvv"
                      value={cardCvvNumber}
                      onChange={(e) => setCardCvvNumber(e.target.value)}
                      onBlur={validateCardCvvNumber}
                    />
                    <label htmlFor="cc-cvv">CVV</label>
                    <div className="invalid-feedback">{cardCvvNumberError}</div>
                  </div>
                </div>

                <div className="col-md-12 ">
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={saveCardInfoStatus}
                      onChange={handleSaveCardInfo}
                      id="saveCardInfo"
                    />
                    <label className="form-check-label" htmlFor="saveCardInfo">
                      Save my card for later payments
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <button className="btn btn-primary btn-lg" type="submit">
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          className="col-md-4 p-3 order-1"
          style={{
            border: "solid 1px #ccc",
            boxShadow: "1px 1px 5px 0px #c5c5c5",
            height: "fit-content",
          }}
        >
          <div className="row mb-2">
            <div className="col-auto">
              <img
                src={courseDetails.cardPhoto}
                alt={courseDetails.name}
                height={80}
                width={90}
              />
            </div>
            <div className="col-auto">
              <p className="mb-1" style={{color: "blue"}}>{courseDetails.name}</p>
              <p>Duration: {courseDetails.duration} Month(s)</p>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-3">
              <b>TOTAL</b>
            </div>
            <div className="col-auto">
              <b>{courseDetails.price}</b>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Your Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="list-group">
            {cardLoading && (
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status"></div>
                <span className="p-2">Wait while loading...</span>
              </div>
            )}
            {userCards.map((c, index) => (
              <label className="border rounded p-2 mb-1" key={index}>
                <div className="form-check me-1">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id={`selection-${index}`}
                    value={c.cardNumber.substring(c.cardNumber.length - 4)}
                    onClick={() => setSelectedCard(c)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`selection-${index}`}
                  >
                    {c.userName +
                      "-" +
                      c.cardNumber.substring(c.cardNumber.length - 4)}
                  </label>
                </div>
              </label>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            PAY NOW
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={cardLoading} centered={true} backdrop="static">
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status"></div>
            <span className="p-2">Wait while loading...</span>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Checkout;
