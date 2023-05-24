import React from "react";
import style from "./modals.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteListing } from "../../store/listings";
import { useHistory } from "react-router-dom";
export default function ConfirmDelete({ setModal, listingId }) {
  const dispatch = useDispatch();
  let history = useHistory();
  async function handleDelete() {
    let listing = await dispatch(deleteListing(listingId));
    setModal(false);
    history.push(`/users/${listing?.owner_id}`);
  }
  return (
    <div className={style.modalBackground} onClick={() => setModal(false)}>
      <div className={style.deleteModal} onClick={(e) => e.stopPropagation()}>
        <button className="primary-button" onClick={handleDelete}>
          Confirm delete
        </button>
        <button className="secondary-button" onClick={() => setModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
