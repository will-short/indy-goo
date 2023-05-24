import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Item from "./item";
import style from "./cart.module.css";
import { deleteAllListings } from "../../store/session";

export default function Checkout({ cartItems, setCart, total }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [checkedOut, setCheckedOut] = useState(false);

  setCart(false);
  function removeAll() {
    setCheckedOut(true);
    setTimeout(() => {
      dispatch(deleteAllListings());
      history.push("/");
    }, 5000);
  }
  return (
    <main className={style.cartTotal}>
      {checkedOut && (
        <>
          <h1>Thank you for using Indie-go!</h1>
          <p>
            This is a personal project but if you are interested in any games on
            this platform feel free to see if its on steam!
          </p>
        </>
      )}
      <div className={style.itemList}>
        {cartItems?.map((item) => (
          <Item key={item?.id} game={item} />
        ))}
      </div>
      <span>
        total: <strong>{total}</strong>
      </span>
      <button className="primary-button" onClick={removeAll}>
        Checkout
      </button>
    </main>
  );
}
