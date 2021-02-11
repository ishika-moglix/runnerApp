// root reducer is exported from this file
import {combineReducers} from 'redux';
import {reducer as authReducer} from './auth';

// for adding more reducers
// , reducerName: reducerInstance
export default combineReducers({
  auth: authReducer,
});
