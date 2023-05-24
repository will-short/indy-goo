import React, { useEffect } from "react";
import {
  NavLink,
  Route,
  Switch,
  useLocation,
  useParams,
} from "react-router-dom";

import style from "./listingpostpage.module.css";
import { useState } from "react";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import ListingProvider from "../../context/ListingContext";

export default function ListingPostPage({ posted, setPosted }) {
  let url = useLocation();
  const absPath = url.pathname.slice(0, -1);
  const { listingId } = useParams();

  return (
    <ListingProvider>
      <main className={listingId ? `${style.main} ${style.edit}` : style.main}>
        <header className={style.header}>
          <NavLink
            to={absPath + "1"}
            className={style.first}
            activeClassName={style.active}
          >
            <div>
              <span className="material-icons">done</span>
            </div>
            <span>Name/Description</span>
          </NavLink>
          <span id="1"></span>
          <NavLink
            to={absPath + "2"}
            className={style.second}
            activeClassName={style.active}
          >
            <div>
              <span className="material-icons">done</span>
            </div>
            <span>Media</span>
          </NavLink>
          <span id="2"></span>
          <NavLink
            to={absPath + "3"}
            className={style.third}
            activeClassName={style.active}
          >
            <div>
              <span className="material-icons">done</span>
            </div>
            <span>Preview</span>
          </NavLink>
        </header>
        <Switch>
          <Route exact path={absPath + "1"}>
            <Page1 absPath={absPath} />
          </Route>
          <Route exact path={absPath + "2"}>
            <Page2 absPath={absPath} />
          </Route>
          <Route exact path={absPath + "3"}>
            <Page3
              absPath={absPath}
              listingId={listingId}
              posted={posted}
              setPosted={setPosted}
            />
          </Route>
        </Switch>
      </main>
    </ListingProvider>
  );
}
