import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_USER,
  LOGIN_FAIL,
  LOGOUT
} from "../actions/types";

import { setAlert } from "./alert";

import setAuthToken from "../utils/set_Auth_Token";

// LOAD USER action
export const loadUser = () => async dispatch => {
  // check ls for token, if there is one, call ultis function setAuthToken | sets header
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // making a request for specific user to be loaded into state
    const res = await axios.get("http://localhost:5000/api/auth");

    // if correct response, call dispatch
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// REGISTER USER
export const register = ({
  first_name,
  last_name,
  email,
  password
}) => async dispatch => {
  try {
    // we need this config object to pass in the headers
    // this is used within axios, it is one of the params you can send
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // for the req, body that will have stringified the newUser object
    const body = JSON.stringify({ first_name, last_name, email, password });

    //getting the response | can do /api/users because we added proxy in package.json file | pass in body and config
    const res = await axios.post(
      "http://localhost:5000/api/users",
      body,
      config
    );
    // returns token if successful. Dispatch type register_success
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    // so this action runs immediately
    dispatch(loadUser());
  } catch (err) {
    // backend returns an array of errors, this is how we access that
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// LOGIN USER
export const login = (email, password) => async dispatch => {
  try {
    // we need this config object to pass in the headers
    // this is used within axios, it is one of the params you can send
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    // for the req, body that will have stringified the newUser object
    const body = JSON.stringify({ email, password });

    //getting the response |pass in body and config
    const res = await axios.post(
      "http://localhost:5000/api/auth",
      body,
      config
    );
    // if nothing goes wrong, res.data gets passed to payload
    dispatch({
      type: LOGIN_USER,
      payload: res.data
    });

    // call loadUser
    dispatch(loadUser());
  } catch (err) {
    // backend returns an array of errors, this is how we access that
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// LOGOUT / Clear profile
// side note, dispatch comes from redux store, lets you do actions/reducer functionality in react
// so dispatch is really store.dispatch, but made the store wrap around entire app and accessible
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};
