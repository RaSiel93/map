import {
  SET_ZOOM,
  ADD_AREA_DATA,
  UPDATE_AREA_DATA,
  SET_AREAS_DATA,
  SET_SELECTED_AREA_ID,
  SET_SELECTED_AREA_DATA,
  SET_HOVERED_AREA_ID,
  TOGGLE_MODE,
} from 'src/constants';

export const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ZOOM: {
      return {
        ...state,
        zoom: action.payload,
      }
    }
    case ADD_AREA_DATA: {
      return {
        ...state,
        areasData: [...state.areasData, action.payload],
      }
    }
    case UPDATE_AREA_DATA: {
      return {
        ...state,
        areasData: [
          ...state.areasData.filter(({ id }) => (id !== action.payload.id)),
          action.payload
        ],
      }
    }
    case SET_AREAS_DATA: {
      return {
        ...state,
        areasData: action.payload,
      }
    }
    case SET_SELECTED_AREA_ID: {
      return {
        ...state,
        selectedAreaId: action.payload,
      }
    }
    case SET_SELECTED_AREA_DATA: {
      return {
        ...state,
        selectedAreaData: action.payload,
      }
    }
    case SET_HOVERED_AREA_ID: {
      return {
        ...state,
        hoveredAreaId: action.payload,
      }
    }
    case TOGGLE_MODE: {
      return {
        ...state,
        mode: state.mode === action.payload ? null : action.payload,
      }
    }
  }

  return state;
};
