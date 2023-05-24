import React, { useEffect } from "react";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./gameinfo.module.css";
import { useState } from "react";
import { useRef } from "react";

export default function Carousel({ game }) {
  const [carouselPos, setCarouselPos] = useState(0);
  const refArr = useRef([]);
  let carouselData = [...game.image_urls.slice(1)].filter((el) => el);

  useEffect(() => {
    let length = game.video_url ? carouselData.length + 1 : carouselData.length;
    if (carouselPos < 0) setCarouselPos(length - 1);
    else if (carouselPos > length - 1) setCarouselPos(0);
    refArr?.current.forEach((ele, i) => {
      if (i === carouselPos) ele.style.display = "block";
      else ele.style.display = "none";
    });
  }, [carouselPos]);

  if (carouselData.length === 1 && !game?.video_url)
    return (
      <div className={style.carousel}>
        <img src={carouselData[0]} alt="" style={{ display: "block" }} />
      </div>
    );

  function addRef(img) {
    if (img && !refArr?.current?.includes(img)) refArr.current.push(img);
  }

  return (
    <div className={style.carousel}>
      {
        <span
          onClick={() => setCarouselPos(carouselPos - 1)}
          className="material-icons"
        >
          arrow_back_ios
        </span>
      }
      {game.video_url && (
        <video controls width="100%" ref={addRef} src={game.video_url}></video>
      )}
      {carouselData.map((image, i) => (
        <img key={i} src={image} alt="" ref={addRef} />
      ))}

      <span
        onClick={() => setCarouselPos(carouselPos + 1)}
        className="material-icons"
      >
        arrow_forward_ios
      </span>
    </div>
  );
}
