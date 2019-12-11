// main reducer
import { combineReducers } from "redux";
import alert from "./alert";

// takes in any reducers made within project
export default combineReducers({
  alert
});
