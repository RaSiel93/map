import {
  // AREAS_GET_REQUEST,
  // AREAS_GET_SUCCESS,
  // AREAS_GET_FAILURE,
  // AREAS_FETCH_REQUEST,
  // AREAS_FETCH_SUCCESS,
  // AREAS_FETCH_FAILURE,
  // AREAS_CREATE_REQUEST,
  // AREAS_CREATE_SUCCESS,
  // AREAS_CREATE_FAILURE,
  // AREAS_UPDATE_REQUEST,
  // AREAS_UPDATE_SUCCESS,
  // AREAS_UPDATE_FAILURE,
  // AREAS_RESET,
  requestStatuses,

  // ADD_AREA_POINT,
} from 'src/constants';

export const areasReducer = (state = {}, action) => {
  switch (action.type) {
    // case AREAS_GET_REQUEST: {
    //   return  {
    //     ...state,
    //     getStatus: requestStatuses.LOADING,
    //   }
    // }
    // case AREAS_GET_SUCCESS: {
    //   return {
    //     ...state,
    //     getStatus: requestStatuses.SECCEEDED,
    //     area: action.payload,
    //   }
    // }
    // case AREAS_GET_FAILURE: {
    //   return {
    //     ...state,
    //     getStatus: requestStatuses.FAILED,
    //   }
    // }
    // case AREAS_FETCH_REQUEST: {
    //   return  {
    //     ...state,
    //     status: requestStatuses.LOADING,
    //   }
    // }
    // case AREAS_FETCH_SUCCESS: {
    //   return {
    //     ...state,
    //     status: requestStatuses.SECCEEDED,
    //     areas: action.payload,
    //   }
    // }
    // case AREAS_FETCH_FAILURE: {
    //   return {
    //     ...state,
    //     status: requestStatuses.FAILED,
    //   }
    // }
    // case AREAS_CREATE_REQUEST: {
    //   return  {
    //     ...state,
    //     createStatus: requestStatuses.CREATING,
    //   }
    // }
    // case AREAS_CREATE_SUCCESS: {
    //   return {
    //     ...state,
    //     createStatus: requestStatuses.CREATED,
    //     areas: [
    //       ...state.areas,
    //       action.payload,
    //     ],
    //   }
    // }
    // case AREAS_CREATE_FAILURE: {
    //   return {
    //     ...state,
    //     createStatus: requestStatuses.FAILED,
    //   }
    // }
    // case AREAS_UPDATE_REQUEST: {
    //   return  {
    //     ...state,
    //     updateStatus: requestStatuses.UPDATING,
    //   }
    // }
    // case AREAS_UPDATE_SUCCESS: {
    //   return {
    //     ...state,
    //     updateStatus: requestStatuses.UPDATED,
    //     areas: [
    //       ...state.areas.filter((area) => (area.id !== action.payload.id)),
    //       action.payload,
    //     ],
    //   }
    // }
    // case AREAS_UPDATE_FAILURE: {
    //   return {
    //     ...state,
    //     updateStatus: requestStatuses.FAILED,
    //   }
    // }
    // case AREAS_RESET: {
    //   return {
    //     ...state,
    //     createStatus: null,
    //     updateStatus: null,
    //     getStatus: requestStatuses.IDLE,
    //   }
    // }

    // case ADD_NEW_AREA_POINT: {
    //   return {
    //     ...state,
    //     newAreaPoints: [
    //       ...state.newAreaPoints,
    //       action.payload,
    //     ]
    //   }
    // }
    default:
      return state
  }
}
