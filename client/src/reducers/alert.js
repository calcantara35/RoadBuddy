// bring in types file
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

// reducers are functions that take in state (specifically for alerts) and an action
// an action will get dispatched from an actions file

const initialState = [];

// actions take in a type and a payload(data)
// action is an object
// state is immutable, so we add the spread operator (...state) to copy exisiting state
// payload can be whatever we want as well
export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // dispatch case, return array with existing state and new payload
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}
