import React, { useEffect } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import dropDownStyle from "./dropDownStyle.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";

export default function UserDropdown() {
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);

  return (
    <div className={dropDownStyle.userDropdown}>
      <Link className={dropDownStyle.user} to={`/users/${session?.user.id}`}>
        <img src={session.user.image_url} alt="" />
        <h3>{session.user.username}</h3>
        <p>View your profile</p>
      </Link>
      <button
        className={dropDownStyle.logout}
        onClick={() => {
          dispatch(logout());
        }}
      >
        <span className="material-icons-outlined">logout</span>
        <span>Sign out</span>
      </button>
    </div>
  );
}
