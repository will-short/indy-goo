import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./listingpostpage.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useListing } from "../../context/ListingContext";

export default function Page1({ absPath }) {
  let {
    name,
    setName,
    description,
    setDescription,
    price,
    setPrice,
    tags,
    setTags,
  } = useListing();
  const [tagOptions, setTagOptions] = useState(
    [
      "action",
      "adventure",
      "rpg",
      "mmo",
      "casual",
      "sports",
      "simulation",
      "strategy",
      "racing",
      "rts",
      "horror",
      "platformer",
    ].filter((tag) => !tags.includes(tag))
  );

  let [linkToggle, setLinkToggle] = useState("");
  useEffect(() => {
    if (
      name.length <= 0 ||
      name.length >= 100 ||
      description.length <= 0 ||
      description.length >= 500
    )
      setLinkToggle("disabled");
    else setLinkToggle("");
  }, [name, description]);
  return (
    <div className={style.page1Container}>
      <label htmlFor="name">
        Name - Required
        <input
          name="name"
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="description">
        Description - Required
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>
      <div className={style.bottomRow}>
        <div className={style.tags}>
          Choose your tags (optional):
          {tagOptions.map((tag, i) => (
            <span
              key={i}
              className={"tags " + tag}
              onClick={(e) => {
                let removed = tagOptions.splice(
                  tagOptions.indexOf(e.target.innerText),
                  1
                )[0];
                setTags([...tags, removed]);
                setTagOptions([...tagOptions]);
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className={style.tags}>
          <span>game tags:</span>
          {tags?.map((tag, i) => (
            <span
              key={i}
              className={"tags " + tag}
              onClick={(e) => {
                let removed = tags.splice(
                  tags.indexOf(e.target.innerText),
                  1
                )[0];
                setTagOptions([...tagOptions, removed]);
                setTags([...tags]);
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <label htmlFor="price" className={style.priceLabel}>
          Price - (if blank game will be listed for free)
          <input
            name="price"
            type="number"
            value={price}
            placeholder="0.00"
            min="0"
            onChange={(e) => {
              setPrice(() => e.target.value > 0 && e.target.value);
            }}
          ></input>
        </label>
      </div>

      <Link
        className={`primary-link ${linkToggle}`}
        id="forward"
        to={absPath + "2"}
      >
        Save and continue
      </Link>
    </div>
  );
}
