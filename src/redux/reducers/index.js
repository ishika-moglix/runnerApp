// root reducer is exported from this file
import { combineReducers } from "redux";
import { reducer as authReducer } from "./auth";
import { reducer as homeReducer } from "./home";
import { reducer as taskReducer } from "./tasks";
// for adding more reducers
// , reducerName: reducerInstance
export default combineReducers({
  auth: authReducer,
  home: homeReducer,
  tasks: taskReducer,
});
