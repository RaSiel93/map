import {
  ADD_NEW_AREA_POINT_FOR_AREA_MODE,
  RESET_NEW_AREA_POINTS_FOR_AREA_MODE,
} from 'constants';

export const modesReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_NEW_AREA_POINT_FOR_AREA_MODE: {
      return {
        ...state,
        area: {
          ...state.area,
          newAreaPoints: [...state.area.newAreaPoints, action.payload],
        }
      }
    }
    case RESET_NEW_AREA_POINTS_FOR_AREA_MODE: {
      return {
        ...state,
        area: {
          ...state.area,
          newAreaPoints: [],
        }
      }
    }
    default:
      return state
  }
}
