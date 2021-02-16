/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from "reduxsauce";
import { TaskTypes } from "../actions/tasks";
import { Map, List } from "immutable";
import moment from "moment";

let INITIAL_STATE = new Map({});

const TYPE_KEYS = new Map({
  delivery: "deliveryTasks",
  pickup: "pickupTasks",
  return: "returnTasks",
  supplierReturn: "supplierReturnTasks",
});

export const fetchTaskData = (state, { taskType, date, page }) => {
  console.log(taskType, date, page);
  if (page == 1) {
    return state
      .setIn([taskType, moment(date).format("DD-MM-YYYY"), "loading"], true)
      .setIn(
        [taskType, moment(date).format("DD-MM-YYYY"), "data"],
        new List([])
      )
      .setIn([taskType, moment(date).format("DD-MM-YYYY"), "page"], page)
      .setIn([taskType, moment(date).format("DD-MM-YYYY"), "error"], false);
  } else {
    return state
      .setIn([taskType, moment(date).format("DD-MM-YYYY"), "loading"], true)
      .setIn([taskType, moment(date).format("DD-MM-YYYY"), "page"], page)
      .setIn([taskType, moment(date).format("DD-MM-YYYY"), "error"], false);
  }
};

export const fetchedTaskData = (state, { taskType, date, page, data }) => {
  if (page == 1) {
    return state
      .setIn([taskType, moment(date).format("DD-MM-YYYY"), "loading"], false)
      .setIn(
        [taskType, moment(date).format("DD-MM-YYYY"), "data"],
        new List(data[TYPE_KEYS.find((val, key) => key == taskType)])
      )
      .setIn([taskType, moment(date).format("DD-MM-YYYY"), "error"], false);
  } else {
    return state
      .setIn([taskType, moment(date).format("DD-MM-YYYY"), "loading"], false)
      .mergeIn(
        [taskType, moment(date).format("DD-MM-YYYY"), "data"],
        new List(data[TYPE_KEYS.find((val, key) => key)])
      )
      .setIn([taskType, moment(date).format("DD-MM-YYYY"), "error"], false);
  }
};

export const fetchFailedTaskData = (state, { taskType, date, page, error }) => {
  return state
    .setIn([taskType, moment(date).format("DD-MM-YYYY"), "loading"], false)
    .setIn([taskType, moment(date).format("DD-MM-YYYY"), "error"], true);
};
/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [TaskTypes.FETCH_TASK_DATA]: fetchTaskData,
  [TaskTypes.FETCHED_TASK_DATA]: fetchedTaskData,
  [TaskTypes.FETCH_FAILED_TASK_DATA]: fetchFailedTaskData,
  //   [AddressTypes.FETCH_ADDRESS_SUCCESS]: fetchAddressSuccess,
  //   [AddressTypes.FETCH_ADDRESS_FAILURE]: fetchAddressFailure,
});
