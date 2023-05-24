import React, { useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./cart.module.css";
import ProfilePage from "../ProfilePage";
import ListingPostPage from "../ListingPostPage";
import HomePage from "../HomePage";
import SearchPage from "../SearchPage";
import GamePage from "../GamePage";
import Item from "./item";
import Checkout from "./checkout";
export default function Cart({ cart, setCart, posted, setPosted }) {
  const session = useSelector((state) => state.session);
  let total = 0;
  useEffect(() => {
    if (session?.user?.cart_listings?.length === 1 && !cart) {
      setCart(true);
    }
  }, [session]);
  if (session?.user?.cart_listings?.length) {
    total = session?.user?.cart_listings?.reduce(
      (acc, listing) => acc + +listing.price,
      0
    );
  }

  return (
    <div className="main">
      <Switch>
        <Route path="/users/:userId" exact={true}>
          <ProfilePage />
        </Route>
        <Route
          path={[
            "/users/:userId/listings/new/:id",
            "/listings/:listingId/edit/:id",
          ]}
        >
          <ListingPostPage posted={posted} setPosted={setPosted} />
        </Route>
        <Route path="/listings/:listingId">
          <GamePage />
        </Route>
        <Route path="/listings">
          <SearchPage />
        </Route>
        <Route path="/cart">
          <Checkout
            cartItems={session?.user?.cart_listings}
            setCart={setCart}
            total={total.toFixed(2)}
          />
        </Route>
        <Route path="/" exact={true}>
          <HomePage />
        </Route>
      </Switch>

      {cart && (
        <div className={style.cartSide}>
          <h2>Your Cart</h2>
          {session?.user?.cart_listings?.map((listing) => (
            <Item game={listing} key={listing?.id} />
          ))}
          <h3>total: ${total.toFixed(2)}</h3>
          <Link
            to="/cart"
            className={
              "primary-button" +
              " " +
              (!session?.user?.cart_listings?.length && "disabled")
            }
          >
            <strong>Go to cart</strong>
          </Link>
        </div>
      )}
    </div>
  );
}
