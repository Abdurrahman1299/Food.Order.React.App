import { useReducer } from "react";
import CartContext from "./cart-context";

// initial state of the reducer funciton ``USEREDUCER THING``
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// reducer function ``USEREDUCER THING``
function cartReducer(state, action) {
  if (action.type === "ADD") {
    // concat method creates a new array
    const updatedItems = state.items.concat(action.item);
    const updatedTatalAmount =
      state.totalAmount + state.item.price * state.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTatalAmount,
    };
  }
  if (action.type === "REMOVE") {
  }
  return defaultCartState;
}

export default function CartProvider(props) {
  // construct the reducer function
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // dispatch action functions
  function addItemToCartHandler(item) {
    dispatchCartAction({ type: "ADD", item: item });
  }
  function removeItemFromCartHandler(id) {
    dispatchCartAction({ type: "REMOVE", id: id });
  }

  // create the object that has all the variables => ``context.thing``
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
