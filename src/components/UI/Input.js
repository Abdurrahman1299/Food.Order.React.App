import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} ref={ref} />
      {/* the ##SPREADED## object ensures that all the props are taken dynamically from outside the component where it is mainly used */}
    </div>
  );
});

export default Input;
