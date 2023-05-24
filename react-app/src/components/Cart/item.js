import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./cart.module.css";
import { deleteListing } from "../../store/session";
export default function Item({ game }) {
  const dispatch = useDispatch();

  function handleRemove() {
    console.log({ game });
    dispatch(deleteListing(game));
  }
  return (
    <div className={style.item}>
      <img src={game?.image_urls?.[0]} />
      <div className={style.middle}>
        <strong>{game?.name}</strong>
        <span>${game?.price}</span>
      </div>
      <button className="none material-icons-outlined" onClick={handleRemove}>
        close
      </button>
    </div>
  );
}
