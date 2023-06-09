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
    const updatedTatalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // index of existing cart item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // existing cart item
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      // editing the existed item with the new values
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      // updating the existed cart item
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    // we're returning object after all
    return {
      items: updatedItems,
      totalAmount: updatedTatalAmount,
    };
  }

  if (action.type === "REMOVE") {
    // similar to the adding process when we have multible same items, but we ,here, have only the """action.id""" not """action.item.id"""
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // existing cart item
    const existingItem = state.items[existingCartItemIndex];

    // updating total amount after removing an item
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // we're returning object after all
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
}

export default function CartProvider(props) {
  // construct the reducer function && cartState is the state that will be used in the rest of application
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
