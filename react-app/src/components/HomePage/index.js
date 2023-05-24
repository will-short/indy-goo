import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./homepage.module.css";

export default function HomePage() {
  const session = useSelector((state) => state.session);
  const listings = useSelector((state) => state.listings);
  const [tagsI1, setTagsI1] = useState(0);
  const [tagsI2, setTagsI2] = useState(0);
  const [tagsI3, setTagsI3] = useState(0);

  let tagsList = [
    "action",
    "adventure",
    "rpg",
    "mmo",
    "casual",
    "sports",
    "simulation",
    "strategy",
    "racing",
    "horror",
  ];

  function gamePannel(tags) {
    return tags.map((tag) => {
      let game = Object.values(listings).find((listing) =>
        listing?.tags.includes(tag)
      );
      if (game) {
        return (
          <Link to={`listings?tags=${tag}`} key={game?.id}>
            <div className={style.content}>
              <img src={game?.image_urls?.[0]} alt="" />
              <h2>{`Top ${tag} games`}</h2>
            </div>
          </Link>
        );
      }
    });
  }

  return (
    <main className={style.main}>
      <header>
        <a href="https://github.com/will-short/Indie-Go" target="_blank">
          <i className="fab fa-github fa-2x"></i>
        </a>
        <div>
          <h1>
            {session?.user
              ? `Welcome to Indie-Go, ${session.user.username}`
              : `Welcome to Indie-Go`}
          </h1>
          {!session?.user && (
            <p>
              Try signing in as Demo to experience this app as a user without
              creating an account and Checkout the github link to learn more
              about this app!
            </p>
          )}
        </div>
        <a href="https://www.linkedin.com/in/will-short/" target="_blank">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
      </header>
      <div className={style.lower}>
        <h1>Find your next favorite game!</h1>
        <div className={`${style.images}`}>
          {gamePannel([
            "action",
            "adventure",
            "rpg",
            "simulation",
            "strategy",
            "racing",
            "horror",
            "mmo",
            "casual",
            "sports",
          ])}
        </div>
      </div>
    </main>
  );
}
