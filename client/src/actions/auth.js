import axios from "axios";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

import { setAlert } from "./alert";

// REGISTER user
export const register = ({
  first_name,
  last_name,
  email,
  password
}) => async dispatch => {
  // instance of new user
  const newUser = {
    first_name,
    last_name,
    email,
    password
  };

  // we need this config object to pass in the headers
  // this is used within axios, it is one of the params you can send
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  // for the req, body that will have stringified the newUser object
  const body = JSON.stringify(newUser);
  try {
    //getting the response | can do /api/users because we added proxy in package.json file | pass in body and config
    const res = await axios.post("/api/users", body, config);
    // returns token if successful. Dispatch type register_success
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
