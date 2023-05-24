import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import style from "./user.module.css";
function User({ user }) {
  const session = useSelector((state) => state.session);

  if (!user) {
    return null;
  }
  let listings = user?.listings;
  let tags = new Set(listings?.flatMap((listing) => listing.tags));
  return (
    <div className={style.container}>
      <img src={user?.image_url} alt="" />
      <span>
        <strong>{user?.username}</strong>
      </span>
      <span>
        Games listed: <strong>{listings?.length}</strong>, Reviews posted:
        <strong>{user?.reviews?.length}</strong>
      </span>
      <span>tags:</span>
      <div className={style.tags}>
        {[...tags].map((tag, i) => (
          <span key={i} className={"tags " + tag}>
            {tag}
          </span>
        ))}
      </div>
      {session?.user?.id === +user?.id && (
        <Link className="primary-link" to={`/users/${user.id}/listings/new/1`}>
          New Listing
        </Link>
      )}
    </div>
  );
}
export default User;
