import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import calsses from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

export default function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext);
  const numberOfCartItems = cartCtx.items.reduce((current, item) => {
    return current + item.amount;
  }, 0);
  return (
    <button className={calsses.button} onClick={props.onClick}>
      <span className={calsses.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={calsses.badge}>{numberOfCartItems}</span>
    </button>
  );
}
