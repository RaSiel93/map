import {
  // POINTS_FETCH_REQUEST,
  // POINTS_FETCH_SUCCESS,
  // POINTS_FETCH_FAILURE,
  // requestStatuses,
} from '../../constants';

export const pointsReducer = (state = {}, action) => {
  switch (action.type) {
  //   case POINTS_FETCH_REQUEST: {
  //     return  {
  //       ...state,
  //       status: requestStatuses.LOADING,
  //     }
  //   }
  //   case POINTS_FETCH_SUCCESS: {
  //     return {
  //       ...state,
  //       status: requestStatuses.SECCEEDED,
  //       points: action.payload,
  //     }
  //   }
  //   case POINTS_FETCH_FAILURE: {
  //     return {
  //       ...state,
  //       status: requestStatuses.FAILED,
  //     }
  //   }
    default:
      return state
  }
}
