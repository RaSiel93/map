import Cookies from 'js-cookie'
import {
  SET_LATITUDE,
  SET_LONGITUDE,
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
  SET_SEARCH_HOVERED_AREA_ID,
  TOGGLE_MODE,
  SET_TAGS,
  SET_SELECTED_TAGS,
  TOGGLE_SIDEBAR,
  SET_SEARCH_QUERY,
  SELECTED_TAGS,
  FILTER_TITLE,
  SET_MAP_STYLE,
  SET_TITLE_SHOW,
  SET_ICON_SHOW,
  SET_DATE,
  SET_PROGRESS,
  SET_PROGRESS_CONTENT_LENGTH,
  SET_PROGRESS_DURATION,
  SET_CLUSTER_SHOW,
  FILTER_CLUSTER,
  FILTER_ICON,
  FILTER_AREA,
  SET_AREA_SHOW,
} from 'constants';
import { SET_SEARCH_RESULT } from 'constants';

export const mainReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_LATITUDE: {
      return {
        ...state,
        latitude: action.payload,
      }
    }
    case SET_LONGITUDE: {
      return {
        ...state,
        longitude: action.payload,
      }
    }
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
    case SET_SEARCH_HOVERED_AREA_ID: {
      return {
        ...state,
        searchHoveredAreaId: action.payload,
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
    case SET_SELECTED_TAGS: {
      localStorage.setItem(SELECTED_TAGS, JSON.stringify(action.payload))

      return {
        ...state,
        selectedTags: action.payload,
      }
    }
    case TOGGLE_SIDEBAR: {
      localStorage.setItem('sidebarExtended', !state.sidebarExtended)

      return {
        ...state,
        sidebarExtended: !state.sidebarExtended
      }
    }
    case SET_SEARCH_QUERY: {
      localStorage.setItem('searchQuery', action.payload)

      return {
        ...state,
        searchQuery: action.payload
      }
    }
    case SET_SEARCH_RESULT: {
      return {
        ...state,
        searchResult: action.payload
      }
    }
    case SET_MAP_STYLE: {
      localStorage.setItem('mapStyle', action.payload)

      return {
        ...state,
        mapStyle: action.payload
      }
    }
    case SET_TITLE_SHOW: {
      localStorage.setItem(FILTER_TITLE, action.payload)

      return {
        ...state,
        titleShow: action.payload
      }
    }
    case SET_CLUSTER_SHOW: {
      localStorage.setItem(FILTER_CLUSTER, action.payload)

      return {
        ...state,
        clusterShow: action.payload
      }
    }
    case SET_ICON_SHOW: {
      localStorage.setItem(FILTER_ICON, action.payload)

      return {
        ...state,
        iconShow: action.payload
      }
    }
    case SET_AREA_SHOW: {
      localStorage.setItem(FILTER_AREA, action.payload)

      return {
        ...state,
        areaShow: action.payload
      }
    }
    case SET_DATE: {
      localStorage.setItem('date', action.payload)

      return {
        ...state,
        date: action.payload
      }
    }
    case SET_PROGRESS: {
      return {
        ...state,
        progress: action.payload
      }
    }
    case SET_PROGRESS_CONTENT_LENGTH: {
      return {
        ...state,
        progressContentLength: action.payload
      }
    }
    case SET_PROGRESS_DURATION: {
      return {
        ...state,
        progressDuration: action.payload
      }
    }
  }

  return state;
};
