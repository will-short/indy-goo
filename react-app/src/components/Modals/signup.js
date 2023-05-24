import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import style from "./modals.module.css";
import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import logo_words from "../images/capstone-logo-words.svg";
import { signUp } from "../../store/session";
import { useEffect } from "react";
export default function Signup({ setModal }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [image, setImage] = useState();
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword)
      return setConfirmPasswordErr("passwords do not match");
    const data = await dispatch(signUp(image, username, email, password));
    if (data) {
      setEmailErr(data.email);
      setPasswordErr(data.password);
      setUsernameErr(data.username);
      return;
    }
    setModal(false);
  };
  useEffect(() => {
    let imageEl = document.querySelector(".modals_imageUpload__3jm60 > img");
    if (image && imageEl) imageEl.src = URL.createObjectURL(image);
  }, [image]);

  return (
    <div
      className={style.modalLogin}
      style={{ minHeight: "620px", height: "fit-content" }}
      onClick={(e) => e.stopPropagation()}
    >
      <img src={logo_words} alt="" className={style.logo} />
      <div className={style.loginHeader}>
        <h2>Create your account</h2>
      </div>
      <form onSubmit={handleSignup} className={style.signupForm}>
        <div className={style.imageUpload}>
          <img
            src={
              image ||
              "https://res.cloudinary.com/dc9htgupc/image/upload/c_fill,h_200,w_200/v1636578728/pmp8vba5hxtvgowpymnn.png"
            }
            alt=""
          />
          <label htmlFor="upload">
            Upload Profile Image
            <input
              name="image"
              type="file"
              accept="image/*"
              id="upload"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>
        <div className={style.loginInput}>
          <label htmlFor="username">Username</label>
          <input
            className={style.loginFormInputField}
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameErr && <p>{usernameErr}</p>}
        </div>
        <div className={style.loginInput}>
          <label htmlFor="email">Email address</label>
          <input
            className={style.loginFormInputField}
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailErr && <p>{emailErr}</p>}
        </div>

        <div className={style.loginInput}>
          <label htmlFor="password">Password</label>
          <input
            className={style.loginFormInputField}
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErr && <p>{passwordErr}</p>}
        </div>
        <div className={style.loginInput}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            className={style.loginFormInputField}
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordErr && <p>{confirmPasswordErr}</p>}
        </div>
        <button>Sign up</button>
      </form>
    </div>
  );
}
