import { useState } from 'react';
import {  Modal, Button } from 'react-bootstrap';
import NoMatchCSS from './style-modules/NoMatch.module.css'


const NoMatch = () => {
    const [show, setShow] = useState(false);

    const redirectToHomePage = () => {
        const waitSeconds = 5;
        const MILLI = 1000;
        let finalWaitTime = waitSeconds * MILLI;

        const timeout = setTimeout(function () {
            handleShow()

            window.clearTimeout(timeout)
        }, finalWaitTime)
    }

    const handleClose = ()=>{
        setShow(false);
        window.location.href = "/";
    }

    const handleShow = () => setShow(true);


    return (
        <div className={NoMatchCSS.notFoundDiv} onLoad={redirectToHomePage}>

        <main className="mainClass fof-main fof-main-page">
            <section className="container fof-main-content">
                <div className="row">
                    <div className="col-md-5 fof-left-wrapper">
                        <img src="https://images.squarespace-cdn.com/content/v1/51cdafc4e4b09eb676a64e68/1470175715831-NUJOMI6VW13ZNT1MI0VB/image-asset.jpeg?format=500w" 
                        className="img-responsive" alt="animated character with sorry face" style={{ maxWidth: '21rem' }}
                        />
                    </div>

                    <div className="col-md-7 fof-right-wrapper">
                        <div className="right-empty-div"></div>
                        <div className="ms-5 fof-right-one">
                            <div className="dont-cry">
                                <p>AWWW... &nbsp; <span className="mt-3" style={{display: 'inline-block'}}>DON'T CRY.</span></p>
                            </div>

                        </div>
                        <div className="ps-4 ms-0 fof-right-two mt-5">
                            <p>It's just a 404 Error</p>
                            <p>What you’re looking for may have been misplaced in Long Term Memory.</p>
                        </div>
                    </div>
                </div>

            </section>

        </main>
            <Modal show={show}>
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Attention!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p className="lead">You will now be directed to the <span className="nomatch-title" style={{color: "blue"}}>Homepage</span></p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose}>Ok</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>

        </div>

     );
}

export default NoMatch;