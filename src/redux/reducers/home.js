/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { createReducer } from "reduxsauce";
import { HomeTypes } from "../actions/home";
import { Map } from "immutable";
import moment from "moment";

let INITIAL_STATE = new Map({
  currentdate: null,
  profile: new Map({
    loading: false,
    error: false,
    data: new Map({}),
  }),
});

export const setDate = (state, { date }) => {
  return state.set("currentdate", moment(date).format("YYYY-MM-DD"));
};

export const fetchHomeData = (state, { date }) => {
  return state
    .setIn([moment(date).format("DD-MM-YYYY"), "loading"], true)
    .setIn([moment(date).format("DD-MM-YYYY"), "data"], new Map({}))
    .setIn([moment(date).format("DD-MM-YYYY"), "error"], false);
};

export const fetchedHomeData = (state, { date, data }) => {
  return state
    .setIn([moment(date).format("DD-MM-YYYY"), "loading"], false)
    .setIn(
      [moment(date).format("DD-MM-YYYY"), "data"],
      new Map({
        pickupDetails: new Map(data.pickupDetails),
        deliveryDetails: new Map(data.deliveryDetails),
        returnDetails: new Map(data.returnDetails),
        supplierReturnDetails: new Map(data.supplierReturnDetails),
      })
    )
    .setIn([moment(date).format("DD-MM-YYYY"), "error"], false);
};

export const fetchFailedHomeData = (state, { date, error }) => {
  return state
    .setIn([moment(date).format("DD-MM-YYYY"), "loading"], false)
    .setIn([moment(date).format("DD-MM-YYYY"), "data"], new Map({}))
    .setIn([moment(date).format("DD-MM-YYYY"), "error"], true);
};

export const fetchProfile = (state, {}) => {
  return state
    .setIn(["profile", "loading"], true)
    .setIn(["profile", "error"], false);
};
export const fetchedProfile = (state, { data }) => {
  return state
    .setIn(["profile", "loading"], false)
    .setIn(["profile", "error"], false)
    .setIn(["profile", "data"], new Map(data));
};
export const fetchFailedProfile = (state, { error }) => {
  return state
    .setIn(["profile", "loading"], false)
    .setIn(["profile", "error"], true);
};

// export const fetchAddressLoading = (state) => ({
//   ...state,
//   addressLoading: true,
//   addressErrorMessage: null,
// })

// export const fetchAddressSuccess = (state, { address }) => ({
//   ...state,
//   address: address,
//   addressLoading: false,
//   addressErrorMessage: null,
// })

// export const fetchAddressFailure = (state, { errorMessage }) => ({
//   ...state,
//   address: {},
//   addressLoading: false,
//   addressErrorMessage: errorMessage,
// })

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [HomeTypes.FETCH_HOME_DATA]: fetchHomeData,
  [HomeTypes.FETCHED_HOME_DATA]: fetchedHomeData,
  [HomeTypes.FETCH_FAILED_HOME_DATA]: fetchFailedHomeData,
  [HomeTypes.SET_DATE]: setDate,

  [HomeTypes.FETCH_PROFILE]: fetchProfile,
  [HomeTypes.FETCHED_PROFILE]: fetchedProfile,
  [HomeTypes.FETCH_FAILED_PROFILE]: fetchFailedProfile,
  //   [AddressTypes.FETCH_ADDRESS_SUCCESS]: fetchAddressSuccess,
  //   [AddressTypes.FETCH_ADDRESS_FAILURE]: fetchAddressFailure,
});
