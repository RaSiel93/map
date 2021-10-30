import {
  ADD_NEW_AREA_POINT_FOR_AREA_MODE,
  RESET_NEW_AREA_POINTS_FOR_AREA_MODE,
  SET_AREA_FOR_EDIT_MODE,
  // MODES_SET_SELECTED_AREA,
  // MODES_SET_SELECTED_AREA_ID,
  // MODES_AREA_NEW,
  // MODES_AREA_RESET,
  // SET_AREA_MODE_CREATE_REQUEST_STATUS,
  // SET_AREA_MODE_CREATE_SUCCESS_STATUS,
  // SET_AREA_MODE_CREATE_FAILURE_STATUS,
  // requestStatuses,
} from '../../constants';

export const modesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_AREA_POINT_FOR_AREA_MODE: {
      return {
        ...state,
        area: {
          ...state.area,
          newAreaPoints: [...state.area.newAreaPoints, action.payload]
        }
      }
    }
    case RESET_NEW_AREA_POINTS_FOR_AREA_MODE: {
      return {
        ...state,
        area: {
          ...state.area,
          newAreaPoints: []
        }
      }
    }
        // areaNew: [],
    // case MODES_SET_SELECTED_AREA: {
    //   return {
    //     ...state,
    //     selectedArea: action.payload,
    //   }
    // }
    // case MODES_SET_SELECTED_AREA_ID: {
    //   return {
    //     ...state,
    //     selectedAreaId: action.payload,
    //   }
    // }
    // case MODES_AREA_NEW: {
    //   return {
    //     ...state,
    //     areaNew: [...state.areaNew, { coordinates: action.payload }],
    //   }
    // }
    // case MODES_AREA_RESET: {
    //   return {
    //     ...state,
    //     areaNew: []
    //   }
    // }
    // case SET_AREA_MODE_CREATE_REQUEST_STATUS: {
    //   return {
    //     ...state,
    //     area: {
    //       ...state.area,
    //       createStatus: requestStatuses.CREATING,
    //     }
    //   }
    // }
    // case SET_AREA_MODE_CREATE_SUCCESS_STATUS: {
    //   return {
    //     ...state,
    //     area: {
    //       ...state.area,
    //       createStatus: requestStatuses.SECCEEDED,
    //     }
    //   }
    // }
    // case SET_AREA_MODE_CREATE_FAILURE_STATUS: {
    //   return {
    //     ...state,
    //     area: {
    //       ...state.area,
    //       createStatus: requestStatuses.FAILED,
    //     }
    //   }
    // }
    default:
      return state
  }
}
