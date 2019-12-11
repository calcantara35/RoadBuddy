import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initalState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function(state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case REGISTER_FAIL:
      // failed login, remove token completely
      localStorage.removeItem("token");
      return {
        ...state,
        // state of token to null again
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return state;
  }
}
