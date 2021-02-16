// sagas are exported from this file
import { all } from "redux-saga/effects";
import authSaga from "./authSaga";
import homeSaga from "./homeSaga";
import tasksSaga from "./tasksSaga";

export default function* () {
  yield all([authSaga, homeSaga, tasksSaga]);
}
