import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./searchpage.module.css";
import GameCard from "./gameCard";

export default function HomePage() {
  const listings = useSelector((state) => state.listings);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tags = query.get("tags");
  const name = query.get("name");
  let maxPrice = 0;
  let minPrice = 0;
  let listingTags = [];

  let searchListings = [];
  if (listings && tags) {
    searchListings = Object.values(listings)
      .filter((listing) => listing?.tags?.includes(tags))
      .slice(0, 100);
  }
  if (listings && name) {
    searchListings = Object.values(listings)
      .filter((listing) => listing?.name.toLowerCase().includes(name))
      .slice(0, 100);
  }

  const [searchTags, setSearchTags] = useState(new Set());
  if (searchTags.size) {
    searchListings = searchListings.filter((listing) =>
      [...searchTags].every((tag) => listing.tags.indexOf(tag) >= 0)
    );
  }
  if (searchListings.length) {
    maxPrice = Math.max(...searchListings.map(({ price }) => +price));
    minPrice = Math.min(...searchListings.map(({ price }) => +price));
    listingTags = Object.values(listings).flatMap((listing) => listing.tags);
    listingTags = [...new Set(listingTags)];
  }
  const [priceFilter, setPriceFilter] = useState(maxPrice);
  useEffect(() => {
    setPriceFilter(maxPrice);
  }, [maxPrice, minPrice]);
  if (+priceFilter !== +maxPrice) {
    searchListings = searchListings.filter(
      (listing) => +listing?.price <= +priceFilter
    );
  }
  return (
    <main className={style.main}>
      <aside>
        <div className={style.byPrice}>
          <h4>Narrow by price</h4>
          <div>
            <div>${minPrice}</div>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceFilter}
              class="slider"
              step={0.01}
              id="myRange"
              onChange={(e) => setPriceFilter(e.target.value)}
            />
            <div>${maxPrice}</div>
          </div>
          <h3>
            {+maxPrice === +priceFilter
              ? "Any price"
              : `$${minPrice} - $${priceFilter}`}
          </h3>
        </div>
        <div className={style.byTags}>
          <h4>Narrow by tags</h4>
          <div>
            {listingTags.map((tag, i) => (
              <span
                key={i}
                className={"tags " + tag}
                onClick={(e) => {
                  e.target.classList.toggle(style.activeTag);
                  if (searchTags.has(e.target.innerText)) {
                    searchTags.delete(e.target.innerText);
                    setSearchTags(new Set(searchTags));
                  } else {
                    setSearchTags(new Set([...searchTags, e.target.innerText]));
                  }
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </aside>
      <div className={style.gameList}>
        {searchListings?.map((listing) => (
          <GameCard key={listing?.id} game={listing} />
        ))}
        {!searchListings?.length && (
          <>
            <div style={{ width: "252px" }}></div>
            <div></div>
            <div></div>
            <div></div>
          </>
        )}
      </div>
    </main>
  );
}
