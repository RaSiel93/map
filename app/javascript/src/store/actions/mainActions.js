import {
  SET_ZOOM,
  ADD_AREA_DATA,
  REMOVE_AREA_DATA,
  SET_COMPANIES,
  ADD_POINT,
  ADD_POINT_DATA,
  RESET_POINT,
  SET_POINTS_DATA,
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

export const setCompanies = (companies) => ({ type: SET_COMPANIES, payload: companies });

export const addPoint = (coordinates) => ({ type: ADD_POINT, payload: coordinates });

export const addPointData = (pointData) => ({ type: ADD_POINT_DATA, payload: pointData });

export const resetPoint = () => ({ type: RESET_POINT });

export const setPointsData = (pointsData) => ({ type: SET_POINTS_DATA, payload: pointsData });

export const addAreaData = (areaData) => ({ type: ADD_AREA_DATA, payload: areaData });

export const removeAreaData = (id) => ({ type: REMOVE_AREA_DATA, payload: id });

export const updateAreaData = (areaData) => ({ type: UPDATE_AREA_DATA, payload: areaData });

export const setSelectedAreaId = (id) => ({ type: SET_SELECTED_AREA_ID, payload: id });

export const setSelectedAreaData = (data) => ({ type: SET_SELECTED_AREA_DATA, payload: data });

export const setHoveredAreaId = (id) => ({ type: SET_HOVERED_AREA_ID, payload: id });

export const toggleMode = (mode) => ({ type: TOGGLE_MODE, payload: mode });
