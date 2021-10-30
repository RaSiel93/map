// // import { client } from 'src/api/client';
// // import {
// //   AREAS_GET_REQUEST,
// //   AREAS_GET_SUCCESS,
// //   AREAS_GET_FAILURE,
// //   AREAS_FETCH_REQUEST,
// //   AREAS_FETCH_SUCCESS,
// //   AREAS_FETCH_FAILURE,
// //   AREAS_CREATE_REQUEST,
// //   AREAS_CREATE_SUCCESS,
// //   AREAS_CREATE_FAILURE,
// //   AREAS_UPDATE_REQUEST,
// //   AREAS_UPDATE_SUCCESS,
// //   AREAS_UPDATE_FAILURE,
// //   AREAS_RESET,
// // } from 'src/constants';

// // export const getArea = (id) => (dispatch) => {
// //   dispatch({
// //     type: AREAS_GET_REQUEST
// //   });
// //   client.get(`/api/v1/areas/${id}.json`)
// //     .then((response) => {
// //       dispatch({
// //         type: AREAS_GET_SUCCESS,
// //         payload: response.data.data
// //       });
// //     })
// //     .catch((error) => {
// //       dispatch({
// //         type: AREAS_GET_FAILURE,
// //         payload: error.message
// //       });
// //     })
// // };

// // export const fetchAreas = () => (dispatch) => {
// //   dispatch({
// //     type: AREAS_FETCH_REQUEST
// //   });
// //   client.get('/api/v1/areas.json')
// //     .then((response) => {
// //       dispatch({
// //         type: AREAS_FETCH_SUCCESS,
// //         payload: response.data.data
// //       });
// //     })
// //     .catch((error) => {
// //       dispatch({
// //         type: AREAS_FETCH_FAILURE,
// //         payload: error.message
// //       });
// //     })
// // };

// // export const createArea = (params, token) => (dispatch) => {
// //   dispatch({
// //     type: AREAS_CREATE_REQUEST
// //   });
// //   client.post('/api/v1/areas.json', params, { headers: { 'X-CSRF-TOKEN': token }})
// //     .then((response) => {
// //       dispatch({
// //         type: AREAS_CREATE_SUCCESS,
// //         payload: response.data.data
// //       });
// //     })
// //     .catch((error) => {
// //       dispatch({
// //         type: AREAS_CREATE_FAILURE,
// //         payload: error.message
// //       });
// //     })
// // };

// // export const updateArea = (id, params, token) => (dispatch) => {
// //   dispatch({
// //     type: AREAS_UPDATE_REQUEST
// //   });
// //   client.put(`/api/v1/areas/${id}.json`, params, { headers: { 'X-CSRF-TOKEN': token }})
// //     .then((response) => {
// //       dispatch({
// //         type: AREAS_UPDATE_SUCCESS,
// //         payload: response.data.data
// //       });
// //     })
// //     .catch((error) => {
// //       dispatch({
// //         type: AREAS_UPDATE_FAILURE,
// //         payload: error.message
// //       });
// //     });
// // };

// import { client } from 'src/api/client';
// import {
//   modes,
//   // AREAS_UPDATE_REQUEST,
//   // AREAS_UPDATE_SUCCESS,
//   // AREAS_UPDATE_FAILURE,
// } from 'src/constants';
// import {
//   toggleMode,
//   resetAreaNew,
//   // setAreaModeCreateRequestStatus,
//   // setAreaModeCreateSuccessStatus,
//   // setAreaModeCreateFailureStatus,
// } from 'src/store/actions';

// export const createArea = (params, token) => (dispatch) => {
//   // dispatch(setAreaModeCreateRequestStatus());
//   // client.post('/api/v1/areas.json', params, { headers: { 'X-CSRF-TOKEN': token }})
//   //   .then((response) => {
//   //     dispatch(setAreaModeCreateSuccessStatus(response.data.data));
//   //     dispatch(toggleMode(modes.AREA));
//   //     dispatch(resetAreaNew());
//   //   })
//   //   .catch((error) => {
//   //     // dispatch(setAreaModeCreateFailureStatus(error.message));
//   //   })
// };

// export const updateArea = (id, params, token) => (dispatch) => {
//   // dispatch({
//   //   type: AREAS_UPDATE_REQUEST
//   // });
//   // client.put(`/api/v1/areas/${id}.json`, params, { headers: { 'X-CSRF-TOKEN': token }})
//   //   .then((response) => {
//   //     dispatch({
//   //       type: AREAS_UPDATE_SUCCESS,
//   //       payload: response.data.data
//   //     });
//   //     dispatch(toggleMode(modes.AREA));
//   //     dispatch(resetAreaNew());
//   //   })
//   //   .catch((error) => {
//   //     // dispatch({
//   //     //   type: AREAS_UPDATE_FAILURE,
//   //     //   payload: error.message
//   //     // });
//   //   });
// };
