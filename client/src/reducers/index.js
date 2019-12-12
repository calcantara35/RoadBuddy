// main reducer
import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";

// takes in any reducers made within project
export default combineReducers({
  alert,
  auth,
  profile
});
