import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./gamepage.module.css";
import GameInfo from "../GameInfo";
import Review from "./review";
export default function GamePage() {
  const { listingId } = useParams();
  const listings = useSelector((state) => state.listings);
  const currentGame = listings[listingId];
  let reviews = currentGame?.reviews;
  reviews.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return (
    <main className={style.main}>
      <GameInfo game={currentGame} />
      <h1>Reviews:</h1>
      <div className={style.reviewList}>
        {reviews?.map((review) => (
          <Review review={review} key={review?.id} />
        ))}
      </div>
    </main>
  );
}
