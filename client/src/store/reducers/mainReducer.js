import Cookies from 'js-cookie'
import {
  SET_ZOOM,
  ADD_AREA_DATA,
  ADD_POINT,
  RESET_POINT,
  ADD_POINT_DATA,
  REMOVE_AREA_DATA,
  UPDATE_AREA_DATA,
  SET_AREAS_DATA,
  SET_COMPANIES,
  SET_POINTS_DATA,
  SET_SELECTED_AREA_ID,
  SET_SELECTED_AREA_DATA,
  SET_HOVERED_AREA_ID,
  TOGGLE_MODE,
  SET_TAGS,
  TOGGLE_SIDEBAR,
  SET_SEARCH,
} from 'constants';

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
    case REMOVE_AREA_DATA: {
      return {
        ...state,
        areasData: state.areasData.filter(({ id }) => (id !== action.payload)),
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
    case SET_COMPANIES: {
      return {
        ...state,
        companies: action.payload,
      }
    }
    case SET_POINTS_DATA: {
      return {
        ...state,
        pointsData: action.payload,
      }
    }
    case ADD_POINT: {
      return {
        ...state,
        pointCoordinates: action.payload,
      }
    }
    case ADD_POINT_DATA: {
      return {
        ...state,
        pointsData: [...state.pointsData, action.payload],
      }
    }
    case RESET_POINT: {
      return {
        ...state,
        pointCoordinates: null,
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
    case SET_TAGS: {
      return {
        ...state,
        tags: action.payload,
      }
    }
    case TOGGLE_SIDEBAR: {
      localStorage.setItem('sidebarExtended', !state.sidebarExtended)

      return {
        ...state,
        sidebarExtended: !state.sidebarExtended
      }
    }
    case SET_SEARCH: {
      return {
        ...state,
        search: action.payload
      }
    }
  }

  return state;
};
