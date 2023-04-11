/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import {createReducer} from 'reduxsauce';
import {AuthTypes} from '../actions/auth';

let INITIAL_STATE = {
  url: 'https://runner.moglix.com/api/',
};

//https://runner.moglix.com https://runnerqa.moglilabs.com/api/
export const setBaseUrl = (state, {url}) => ({
  url,
});

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
  [AuthTypes.SET_BASE_URL]: setBaseUrl,
  //   [AddressTypes.FETCH_ADDRESS_SUCCESS]: fetchAddressSuccess,
  //   [AddressTypes.FETCH_ADDRESS_FAILURE]: fetchAddressFailure,
});
