// dependencies
import { put, call, fork, takeLatest } from "redux-saga/effects";
// // api call
import {
  getTask,
  getPickupTask,
  getPickupTaskByPoId,
  getPickupTaskById,
} from "../../services/tasks";
import TaskActions, { TaskTypes } from "../actions/tasks";
// constants
// import { POST_ACTIONS, STATE_STATUS } from "../../constants";
// // actions
// import {
//     fetchedPosts,
//     failedFetchPosts,

//     fetchedCreatePosts,
//     failedFetchCreatePosts,
// } from "../actions";

export function* fetchTask({ taskType, date, page }) {
  try {
    let { data, error } = yield call(
      taskType == "pickup" ? getPickupTask : getTask,
      taskType,
      date,
      page
    );
    if (data) {
      yield put(TaskActions.fetchedTaskData(taskType, date, page, data));
    } else {
      yield put(
        TaskActions.fetchFailedTaskData(
          taskType,
          date,
          page,
          "There was an error while fetching homepage data."
        )
      );
    }
  } catch (e) {
    yield put(
      TaskActions.fetchFailedTaskData(
        taskType,
        date,
        page,
        "There was an error while fetching homepage data."
      )
    );
  }
}

export function* fetchPickupTasks({ taskId, poId }) {
  try {
    let { data, error } = yield call(
      poId ? getPickupTaskByPoId : getPickupTaskById,
      taskId,
      poId
    );
    if (data) {
      yield put(TaskActions.fetchedPickupTask(taskId, poId, data));
    } else {
      yield put(
        TaskActions.fetchFailedPickupTask(
          taskId,
          poId,
          "There was an error while fetching homepage data."
        )
      );
    }
  } catch (e) {
    yield put(
      TaskActions.fetchFailedPickupTask(
        taskId,
        poId,
        "There was an error while fetching homepage data."
      )
    );
  }
}

export default fork(function* () {
  yield takeLatest(TaskTypes.FETCH_TASK_DATA, fetchTask);
  yield takeLatest(TaskTypes.FETCH_PICKUP_TASK, fetchPickupTasks);
});
