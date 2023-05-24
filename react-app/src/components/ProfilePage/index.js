import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Switch, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profilepageStyle from "./profilepage.module.css";
import User from "../User";
import GameInfo from "../GameInfo";
import Review from "../GamePage/review";

export default function ProfilePage() {
  const session = useSelector((state) => state.session);
  const listings = useSelector((state) => state.listings);
  const [games, setGames] = useState(true);
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId, listings]);

  let reviews = user?.reviews;
  reviews?.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return (
    <main className={profilepageStyle.main}>
      <User user={user} />
      <div className={profilepageStyle.swap}>
        <button
          className={!games && profilepageStyle.inactive}
          onClick={() => setGames(true)}
        >
          Games
        </button>
        <button
          className={games && profilepageStyle.inactive}
          onClick={() => setGames(false)}
        >
          Reviews
        </button>
      </div>

      {games ? (
        <div className={profilepageStyle.gameList}>
          {user?.listings?.map((listing) => (
            <GameInfo key={listing.id} game={listing} user={user} />
          ))}
        </div>
      ) : (
        <div className={profilepageStyle.reviewList}>
          {reviews?.map((review) => (
            <Review key={review.id} review={review} user={true} />
          ))}
        </div>
      )}
    </main>
  );
}
