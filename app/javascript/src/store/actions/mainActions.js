import {
  SET_ZOOM,
  ADD_AREA_DATA,
  UPDATE_AREA_DATA,
  SET_AREAS_DATA,
  SET_SELECTED_AREA_ID,
  SET_SELECTED_AREA_DATA,
  SET_HOVERED_AREA_ID,
  ADD_NEW_AREA_POINT,
  RESET_NEW_AREA_POINTS,
  TOGGLE_MODE,
} from 'src/constants';

export const setZoom = (zoom) => ({ type: SET_ZOOM, payload: zoom });

export const setAreasData = (areasData) => ({ type: SET_AREAS_DATA, payload: areasData });

export const addAreaData = (areaData) => ({ type: ADD_AREA_DATA, payload: areaData });

export const updateAreaData = (areaData) => ({ type: UPDATE_AREA_DATA, payload: areaData });

export const setSelectedAreaId = (id) => ({ type: SET_SELECTED_AREA_ID, payload: id });

export const setSelectedAreaData = (data) => ({ type: SET_SELECTED_AREA_DATA, payload: data });

export const setHoveredAreaId = (id) => ({ type: SET_HOVERED_AREA_ID, payload: id });

export const toggleMode = (mode) => ({ type: TOGGLE_MODE, payload: mode });
