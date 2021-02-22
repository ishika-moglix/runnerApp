// dependencies
import {put, call, fork, takeLatest} from 'redux-saga/effects';
// constants
// import { POST_ACTIONS, STATE_STATUS } from "../../constants";
// // api call
// import { getPosts, createPost } from "../../services";
// // actions
// import {
//     fetchedPosts,
//     failedFetchPosts,

//     fetchedCreatePosts,
//     failedFetchCreatePosts,
// } from "../actions";

// function* fetchPosts() {
//     try {
//         const { data } = yield call(getPosts);
//         if (data === STATE_STATUS.SERVER_ERROR) {
//             yield put(failedFetchPosts(error));
//         } else {
//             yield put(fetchedPosts(data))
//         }
//     } catch (error) {
//         yield put(failedFetchPosts(error));
//     }
// }

// function* fetchCreatePosts({ payload: { post } }) {
//     try {
//         const { data } = yield call(createPost, post);
//         if (data === STATE_STATUS.SERVER_ERROR) {
//             yield put(failedFetchCreatePosts(error));
//         } else {
//             Toast.show("Post created successfully", Toast.LONG);
//             yield put(fetchedCreatePosts(post, data))
//         }
//     } catch (error) {
//         yield put(failedFetchCreatePosts(error));
//     }
// }

export default fork(function* () {
  // yield takeLatest(POST_ACTIONS.FETCH_POSTS, fetchPosts);
  // yield takeLatest(POST_ACTIONS.FETCH_CREATE_POSTS, fetchCreatePosts);
});
