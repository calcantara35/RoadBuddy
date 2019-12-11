// taken from documentation of redux-devtools-extension
// this is all for redux dev tools on chrome
// https://redux.js.org/recipes/configuring-your-store
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initalState = {};

// https://github.com/reduxjs/redux-thunk
// we use thunk in order to perofmr async login that interacts with the redux store
const middleware = [thunk];

// creating store here
const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
