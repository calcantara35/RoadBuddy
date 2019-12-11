import { SET_ALERT, REMOVE_ALERT } from "./types";

// alert ids will be random due to uuid package
import uuid from "uuid";

// this action will be used in alert component, will get called, and based on reducer it will perform what it needs to do for the state

// in order to dispatch more than one action type from function, use dispatch
// from redux-thunk package
export const setAlert = (msg, alertType, timeout = 3000) => dispatch => {
  // id for alert
  const id = uuid.v4();

  // call set_alert using dispatch
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
