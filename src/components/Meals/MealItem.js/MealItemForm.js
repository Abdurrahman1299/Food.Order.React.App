import React, { useRef, useState } from "react";
import classes from "./MealItemFrom.module.css";
import Input from "../../UI/Input";

export default function MealItemForm(props) {
  const [amountIsValid, setAmountIsValid] = useState(true);

  // used to hold the date entered into the input
  const amountInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNum < 1 ||
      enteredAmountNum > 5
    ) {
      setAmountIsValid(!!0);
      return;
    }

    // passing the data up to the parent ((MealItem.js))
    props.onAddToCart(enteredAmountNum);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: 1,
          max: 5,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <span>Valid number is [1-5]</span>}
    </form>
  );
}
