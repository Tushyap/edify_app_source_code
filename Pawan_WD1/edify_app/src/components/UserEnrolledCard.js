import React,{useState} from 'react';
import { Breadcrumb, Container,  } from 'react-bootstrap';
import { Link } from "react-router-dom";
import moment from "moment";
import CourseCardCSS from "./CourseCard.module.css";


 export const CourseEnrolledCard = ({ individualEnrolCourse }) => {
     
    return (
    
        <div>
            
            <Container fluid="lg" className="my-4 p-4">
                <Breadcrumb className="">
                    <Breadcrumb.Item href="/admin-dashboard">Home</Breadcrumb.Item>
                    <Breadcrumb.Item >User Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Course Opted</Breadcrumb.Item>
                </Breadcrumb>
                
                <hr style={{ color: "transparent" }} />
                <h4>Hello <span>{individualEnrolCourse.userName}</span> </h4>
                <h5 className='my-3'>You are enrolled in below course(s). Click on <strong>Course</strong> to access the course.</h5>
                <h5>You will be eligible to access the course if your Enrolment Status is active.For any clarification please feel free to contact us.</h5>
                <div className={`row col-md-8 p-4 my-5 d-flex justify-content-between ${CourseCardCSS.enrolCard}`} >
                    <div className='m-4 col '>
                        <p className='my-3'>Name :<span className='mx-4 '>{individualEnrolCourse.userName}</span></p>
                        <p className='my-3'>Email :<span className='mx-2'>{individualEnrolCourse.email}</span></p>
                        <p className='my-3'>Enrolment Status :<span className='mx-4'>{individualEnrolCourse.userEnrolStatus}</span></p>
                        <p className='my-3'>Payment Date :<span className='mx-4'>{moment(individualEnrolCourse.paymentDate).format('D/MM/y')}</span></p>
                    </div>
                    <div className='m-4 col' >
                        <p className='my-3'>Course :<Link to={`/course-detail/${individualEnrolCourse.slug}`}><u className='mx-4 underline'>{individualEnrolCourse.courseName}</u></Link></p>
                        <p className='my-3'>Amount :<span className='mx-4'>{individualEnrolCourse.courseAmount}</span></p>
                        <p className='my-3'>Batch Start :<span className='mx-4'>{individualEnrolCourse.batchStartDate}</span></p>
                        <p className='my-3'>Batch End :<span className='mx-4'>{individualEnrolCourse.batchEndDate}</span></p>
                    </div>                
                </div>        
            </Container>
         </div>
    )
};

