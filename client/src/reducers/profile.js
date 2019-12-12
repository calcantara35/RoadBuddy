import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";

// profile reducer/kinda like models in a way
const initalState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

export default function(state = initalState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
