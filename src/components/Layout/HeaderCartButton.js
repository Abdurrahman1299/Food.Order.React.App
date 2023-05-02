import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

export default function HeaderCartButton(props) {
  const [btnIsHightlighted, setBtnIsHightlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  // destructured the items from the cartCtx to handle using "bump" class only when the items are changed
  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${
    btnIsHightlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    // useEffect will not trigger if there is no items inside the cartCtx variable
    if (items.length === 0) {
      return;
    }
    setBtnIsHightlighted(true);

    const timer = setTimeout(() => {
      // this exact duration is set in the css styles of the bump, so we used it again to remove the class name from our component
      setBtnIsHightlighted(false);
    }, 300);

    // we then set a cleanup function to clean any effects from useEffect() hook
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}
