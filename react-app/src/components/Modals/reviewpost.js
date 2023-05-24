import React from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import style from "./modals.module.css";
import SearchBar from "../SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Rating from "@mui/material/Rating";
import { addReview, deleteReview, editReview } from "../../store/listings";

export default function Modal({
  setModal,
  listingId,
  ratingInfo,
  contentInfo,
  reviewId,
}) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(ratingInfo || 5);
  const [content, setContent] = useState(contentInfo || "");

  function handleSubmit() {
    if (reviewId) {
      dispatch(
        editReview({ rating, content, listing_id: listingId, reviewId })
      ).then(() => setModal(false));
    } else {
      dispatch(addReview({ rating, content, listing_id: listingId })).then(() =>
        setModal(false)
      );
    }
  }
  function handleDelete() {
    dispatch(deleteReview({ listingId, reviewId })).then(() => setModal(false));
  }
  return (
    <div className={style.modalBackground} onClick={() => setModal(false)}>
      <div className={style.reviewPost} onClick={(e) => e.stopPropagation()}>
        <h1>Review</h1>
        <span>
          Rating:
          <Rating
            name="text-feedback"
            value={+rating}
            onChange={(e) => setRating(e.target.value)}
            precision={0.5}
            size="large"
            style={{ color: "silver", marginLeft: "1ch" }}
          />
        </span>
        <div className={style.textWrapper}>
          <textarea
            value={content}
            className={style.reviewContent}
            onChange={(e) => setContent(e.target.value)}
          />
          <p
            style={{
              color:
                content.length < 1 || content.length > 100 ? "red" : "white",
            }}
          >{`${content.length}/100`}</p>
        </div>
        <div className={style.buttons}>
          <button
            className={
              content.length < 1 || content.length > 100
                ? "primary-button disabled"
                : `primary-button`
            }
            onClick={handleSubmit}
          >
            {!contentInfo ? "Post Review" : "Edit Review"}
          </button>
          {contentInfo && (
            <button className="primary-button delete" onClick={handleDelete}>
              Delete Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
