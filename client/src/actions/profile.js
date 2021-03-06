import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

// get current user profile

export const getCurrentUserProfile = () => async dispatch => {
  try {
    // gets current user profile data based on header token that has user id
    const res = await axios.get("http://localhost:5000/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      // returns status of error in text form and the status code
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
