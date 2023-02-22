// dependencies
import { put, call, fork, takeLatest } from "redux-saga/effects";
// // api call
import { getHome, getProfile } from "../../services/home";
import HomeActions, { HomeTypes } from "../actions/home";
// constants
// import { POST_ACTIONS, STATE_STATUS } from "../../constants";
// // actions
// import {
//     fetchedPosts,
//     failedFetchPosts,

//     fetchedCreatePosts,
//     failedFetchCreatePosts,
// } from "../actions";

export function* fetchHome({ date }) {
  try {
    let { data, error } =
      // {
      //   data: {
      //     code: 200,
      //     message: "runner summary",
      //     success: true,
      //     pickupDetails: { suppliers: 3, items: 3 },
      //     deliveryDetails: { customers: 1, items: 2 },
      //     returnDetails: { customers: 0, items: 0 },
      //     supplierReturnDetails: { suppliers: 0, items: 0 },
      //   },
      // };
      yield call(getHome, date);
    if (data) {
      yield put(HomeActions.fetchedHomeData(date, data));
    } else {
      yield put(
        HomeActions.fetchFailedHomeData(
          date,
          "There was an error while fetching homepage data."
        )
      );
    }
  } catch (e) {
    yield put(
      HomeActions.fetchFailedHomeData(
        date,
        "There was an error while fetching homepage data."
      )
    );
  }
}

export function* fetchProfileData() {
  try {
    let { data, error } = yield call(getProfile);
    if (data) {
      yield put(HomeActions.fetchedProfile(data));
    } else {
      yield put(
        HomeActions.fetchFailedProfile(
          "There was an error while fetching homepage data.",
          400
        )
      );
    }
  } catch (e) {
    yield put(
      HomeActions.fetchFailedProfile(
        "There was an error while fetching homepage data.",
        e.response.data.status
      )
    );
  }
}

export default fork(function* () {
  yield takeLatest(HomeTypes.FETCH_HOME_DATA, fetchHome);
  yield takeLatest(HomeTypes.FETCH_PROFILE, fetchProfileData);
});
