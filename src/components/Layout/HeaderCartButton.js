import React from "react";
import CartIcon from "../Cart/CartIcon";
import calsses from "./HeaderCartButton.module.css";

export default function HeaderCartButton(props) {
  return (
    <button className={calsses.button} onClick={props.onClick}>
      <span className={calsses.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={calsses.badge}>3</span>
    </button>
  );
}
