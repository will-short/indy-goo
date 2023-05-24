// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const ADD_LISTING = "user/ADD_LISTING";
const REMOVE_LISTING = "user/REMOVE_LISTING";
const REMOVE_ALL_LISTINGS = "user/REMOVE_ALL_LISTINGS";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const addListing = (listing) => ({
  type: ADD_LISTING,
  listing,
});
const removeListing = (listing) => ({
  type: REMOVE_LISTING,
  listing,
});

const removeAllListings = () => ({
  type: REMOVE_ALL_LISTINGS,
});

const initialState = { user: null };

export const postListing = (listing) => async (dispatch) => {
  dispatch(addListing(listing));
  fetch(`/api/cart/listings/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listing),
  });
};
export const deleteListing = (listing) => async (dispatch) => {
  dispatch(removeListing(listing));
  fetch(`/api/cart/listings/${listing.id}/`, { method: "PUT" });
};
export const deleteAllListings = () => async (dispatch) => {
  dispatch(removeAllListings());
  fetch(`/api/cart/listings/`, { method: "DELETE" });
};

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (image, username, email, password) => async (dispatch) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    console.log(formData.get("image"));
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["An error occurred. Please try again."];
    }
  };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case ADD_LISTING:
      if (state.user) {
        let newArr = state.user.cart_listings;
        newArr.push(action.listing);
        state.user.cart_listings = newArr;
      }
      return { ...state };
    case REMOVE_LISTING:
      if (state.user) {
        let newArr = state.user.cart_listings;
        let listingIndex = newArr.findIndex(
          (listing) => +action.listing.id === +listing.id
        );
        newArr.splice(listingIndex, 1);
        state.user.cart_listings = newArr;
      }
      return { ...state };
    case REMOVE_ALL_LISTINGS:
      if (state.user) state.user.cart_listings = [];
      return { ...state };
    default:
      return state;
  }
}
