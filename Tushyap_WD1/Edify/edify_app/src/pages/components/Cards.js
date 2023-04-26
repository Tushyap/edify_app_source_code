import React from "react";
import { NavLink } from 'react-router-dom';
import '../components/cardsStyle.css'

const Cards = (props) => {
    return (
        <>
            <section className="MainCards">
                <div className="cards">
                    <div className="image">
                    <img src={props.imgSrc} alt="pic" className='card_img' />
                    </div>
                    <div className="title">
                    <h2 className="card_title">{props.title}</h2>   
                    </div>
                    <div className="card_desc">
                        <h4>{props.description}</h4>
                        <NavLink to=''>
                            <button className="btnn-primary">Explore Course</button>
                        </NavLink>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cards;