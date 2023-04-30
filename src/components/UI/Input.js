import React from "react";
import classes from "./Input.module.css";

export default function Input(props) {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
      {/* the ##SPREADED## object ensures that all the props are taken dynamically from outside the component where it is mainly used */}
    </div>
  );
}
