import { configureStore } from "@reduxjs/toolkit";
import cart from "./reducer/cart";
import account from "./reducer/account";
import history from "./reducer/history";
import favourites from "./reducer/favourites";
import orders from "./reducer/orders";
import address from "./reducer/address";
import settings from "./reducer/settings";
import content from "./reducer/content";
import products from "./reducer/products";

const store = configureStore({
  reducer: {
    cart,
    account,
    history,
    favourites,
    orders,
    address,
    settings,
    content,
    products
  }
});

export default store;