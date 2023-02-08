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
  return_delivery: "supplierReturnTasks",
  pickUpTasks: new Map({
    loading: false,
    error: false,
    data: new List([]),
  }),
  deliveryTasks: new Map({
    loading: false,
    error: false,
    data: new List([]),
  }),
  returnTasks: new Map({
    loading: false,
    error: false,
    data: new List([]),
  }),
  supplierReturnTasks: new Map({
    loading: false,
    error: false,
    data: new List([]),
  }),
});

export const fetchTaskData = (state, { taskType, date, page }) => {
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

export const fetchPickupTask = (state, { taskType, taskId, poId }) => {
  return state.setIn([taskType, "loading"], true).setIn([, "error"], false);
};

export const fetchedPickupTask = (state, { taskType, taskId, poId, data }) => {
  return state
    .setIn([taskType, "loading"], false)
    .setIn([taskType, "error"], false)
    .setIn(
      [taskType, "data"],
      taskType == "pickUpTasks"
        ? data.pickupTaskItemPoIdRes
        : taskType == "deliveryTasks"
        ? data.deliveryTaskItemsList
        : taskType == "returnTasks"
        ? data.returnTaskItemsList
        : taskType == "supplierReturnTasks"
        ? data.deliveryTaskItemsList
        : new List([])
    );
};

export const fetchFailedPickupTask = (state, { taskType, taskId, poId }) => {
  return state.setIn([taskType, "loading"], false).setIn([, "error"], true);
};

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [TaskTypes.FETCH_TASK_DATA]: fetchTaskData,
  [TaskTypes.FETCHED_TASK_DATA]: fetchedTaskData,
  [TaskTypes.FETCH_FAILED_TASK_DATA]: fetchFailedTaskData,

  [TaskTypes.FETCH_PICKUP_TASK]: fetchPickupTask,
  [TaskTypes.FETCHED_PICKUP_TASK]: fetchedPickupTask,
  [TaskTypes.FETCH_FAILED_PICKUP_TASK]: fetchFailedPickupTask,
  //   [AddressTypes.FETCH_ADDRESS_SUCCESS]: fetchAddressSuccess,
  //   [AddressTypes.FETCH_ADDRESS_FAILURE]: fetchAddressFailure,
});
