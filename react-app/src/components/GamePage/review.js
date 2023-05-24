import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./gamepage.module.css";
import GameInfo from "../GameInfo";
import Rating from "@mui/material/Rating";
import ReviewPost from "../Modals/reviewpost";
export default function Review({ review, user }) {
  const session = useSelector((state) => state.session);
  const [modal, setModal] = useState(false);
  return (
    <div className={style.reviewContainer}>
      <div className={style.reviewLeft}>
        <div className={style.ratingWrapper}>
          <Rating
            name="text-feedback"
            value={+review?.rating}
            readOnly
            precision={0.5}
            style={{ color: "black" }}
          />
          <span className={style.posted}>
            Posted on: <strong>{review?.created_at.split(" ")[0]}</strong>
          </span>
          {session?.user?.id === review?.owner_id && (
            <button className="none" onClick={() => setModal(true)}>
              <i class="material-icons">settings</i>
            </button>
          )}
        </div>
        {user && (
          <Link to={`/listings/${review?.listing_id}`}>
            posted on: <strong>{review?.listing_info?.name}</strong>
          </Link>
        )}
        <p>"{review.content}"</p>
      </div>
      <div className={style.reviewRight}>
        <img src={review?.owner?.image_url} alt="" />
        <span>{review?.owner?.username}</span>
      </div>
      {modal && (
        <ReviewPost
          setModal={setModal}
          listingId={review?.listing_id}
          ratingInfo={review?.rating}
          contentInfo={review?.content}
          reviewId={review?.id}
        />
      )}
    </div>
  );
}
