import React from "react";
import styles from "./TestimonialItem.module.css";

const TestimonialItem = (item) => {
  return (
    <div className="col-lg-4 my-4">
      <div className="row">
        <div className="col-auto">
          <img
            alt={item.fullname}
            className={`img-thumbnail rounded-circle ${styles.avatar}`}
            src={item.image}
          />
        </div>
        <div className="col-auto">
          <p className={styles.info}>{item.fullname}</p>
          <p className={styles.info}>{item.position}</p>
          <p className={styles.info}>{item.company}</p>
        </div>
      </div>
      <div className="row py-2">
        <p className={styles.quote}>{item.quote || item.children}</p>
      </div>
    </div>
  );
};

export default TestimonialItem;
