import { configureStore } from "@reduxjs/toolkit";
import cart from "./reducer/cart";
import account from "./reducer/account";
import history from "./reducer/history";
import favourites from "./reducer/favourites";

const store = configureStore({
  reducer: {
    cart,
    account,
    history,
    favourites
  }
});

export default store;