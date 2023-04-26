import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./CardItem.module.css";

const CardItem = (item) => {
  return (
    <div className={`col-lg-3 mx-auto my-4 p-0 text-center ${styles.courseCardItem}`}>
      <img src={item.image} alt={item.title} />
      <div>
        <h4 className="py-3 m-0">{item.title}</h4>
        <p className="px-3 py-2">{item.content || item.children}</p>
        <NavLink to={item.url} className={styles["btn-primary"]}>
         Explore Course 
        </NavLink>
      </div> 
    </div>
  );
};

export default CardItem;