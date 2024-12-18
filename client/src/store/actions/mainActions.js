import {
  SET_LATITUDE,
  SET_LONGITUDE,
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
  SET_SEARCH_HOVERED_AREA_ID,
  TOGGLE_MODE,
  SET_TAGS,
  SET_SELECTED_TAGS,
  TOGGLE_SIDEBAR,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULT,
  SET_MAP_STYLE,
  SET_DATE,
} from 'constants'

export const setLatitude = (zoom) => ({ type: SET_LATITUDE, payload: zoom })
export const setLongitude = (zoom) => ({ type: SET_LONGITUDE, payload: zoom })
export const setZoom = (zoom) => ({ type: SET_ZOOM, payload: zoom })

export const setAreasData = (areasData) => ({ type: SET_AREAS_DATA, payload: areasData })

export const setCompanies = (companies) => ({ type: SET_COMPANIES, payload: companies })

export const addPoint = (coordinates) => ({ type: ADD_POINT, payload: coordinates })

export const addPointData = (pointData) => ({ type: ADD_POINT_DATA, payload: pointData })

export const resetPoint = () => ({ type: RESET_POINT })

export const setPointsData = (pointsData) => ({ type: SET_POINTS_DATA, payload: pointsData })

export const addAreaData = (areaData) => ({ type: ADD_AREA_DATA, payload: areaData })

export const removeAreaData = (id) => ({ type: REMOVE_AREA_DATA, payload: id })

export const updateAreaData = (areaData) => ({ type: UPDATE_AREA_DATA, payload: areaData })

export const setSelectedAreaId = (id) => ({ type: SET_SELECTED_AREA_ID, payload: id })

export const setSelectedAreaData = (data) => ({ type: SET_SELECTED_AREA_DATA, payload: data })

export const setHoveredAreaId = (id) => ({ type: SET_HOVERED_AREA_ID, payload: id })

export const setSearchHoveredAreaId = (id) => ({ type: SET_SEARCH_HOVERED_AREA_ID, payload: id })

export const toggleMode = (mode) => ({ type: TOGGLE_MODE, payload: mode })

export const setTags = (tags) => ({ type: SET_TAGS, payload: tags })

export const setSelectedTags = (tags) => ({ type: SET_SELECTED_TAGS, payload: tags })

export const toggleSidebar = () => ({ type: TOGGLE_SIDEBAR })

export const setSearchQuery = (query) => ({ type: SET_SEARCH_QUERY, payload: query })

export const setSearchResult = (value) => ({ type: SET_SEARCH_RESULT, payload: value })

export const setMapStyle = (style) => ({ type: SET_MAP_STYLE, payload: style })

export const setDate = (date) => ({ type: SET_DATE, payload: date })
