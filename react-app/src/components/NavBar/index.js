import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import logo_words from "../images/capstone-logo-words.svg";
import style from "./navbar.module.css";
import SearchBar from "../SearchBar";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "../Modals";
import UserControls from "./userControls";
const NavBar = ({ setCart, cart, posted, setPosted }) => {
  const [modal, setModal] = useState(false);
  console.log(posted);
  return (
    <nav>
      <div className={style.content}>
        <NavLink
          to="/"
          exact={true}
          className={`${style.homeLink} ${style.link}`}
        >
          <img src={logo_words} alt="" />
        </NavLink>
        <SearchBar />
        <div className={style.userControls}>
          <UserControls setModal={setModal} setCart={setCart} cart={cart} />
        </div>
        {!posted && (
          <div className={style.postedProgress}>---Posting Game!---</div>
        )}
      </div>
      {modal && <Modal setModal={setModal} />}
    </nav>
  );
};

export default NavBar;
