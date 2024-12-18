export const API_URL = process.env.REACT_APP_API_URL || ''

export const SET_LATITUDE = 'main/setLatitude';
export const SET_LONGITUDE = 'main/setLongitude';
export const SET_ZOOM = 'main/setZoom';
export const SET_AREAS_DATA = 'main/setAreasData';
export const SET_COMPANIES = 'main/setCompanies';
export const ADD_POINT = 'main/addPoint';
export const RESET_POINT = 'main/resetPoint';
export const ADD_POINT_DATA = 'main/addPointData';
export const SET_POINTS_DATA = 'main/setPointsData';
export const ADD_AREA_DATA = 'main/addAreaData';
export const REMOVE_AREA_DATA = 'main/removeAreaData';
export const UPDATE_AREA_DATA = 'main/updateAreaData';
export const SET_SELECTED_AREA_ID = 'main/setSelectedAreaId';
export const SET_SELECTED_AREA_DATA = 'main/setSelectedAreaData';
export const SET_HOVERED_AREA_ID = 'main/setHoveredAreaId';
export const SET_SEARCH_HOVERED_AREA_ID = 'main/setSearchHoveredAreaId';
export const TOGGLE_MODE = 'main/toggleMode';
export const SET_TAGS = 'main/setTags'
export const SET_SELECTED_TAGS = 'main/setSelectedTags'
export const TOGGLE_SIDEBAR = 'main/toggleSidebar'
export const SET_SEARCH_QUERY = 'main/setSearchQuery'
export const SET_SEARCH_RESULT = 'main/setSearchResult'
export const SET_MAP_STYLE = 'main/setMapStyle'
export const SET_DATE = 'main/setDate'

export const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZmFld2ZhZXdmIiwiYSI6ImNsNHkyczJveTA5bXgzY282Y244NzZldTQifQ.e_xurgA24psxPjnR6sBHZA'

export const ADD_NEW_AREA_POINT_FOR_AREA_MODE = 'modes/addNewAreaPoint';
export const RESET_NEW_AREA_POINTS_FOR_AREA_MODE = 'modes/resetNewAreaPoints';
// export const SET_AREA_FOR_EDIT_MODE = 'modes/setAreaForEditMode';
// export const SET_LOAD_AREA_STATUS_FOR_EDIT_MODE = 'modes/setLoadAreaStatusForEditMode';

export const modes = {
  AREA: 'area',
  EDIT: 'edit',
  NOTE: 'note',
  POINT: 'point',
  SHOW: 'show',
};

export const requestStatuses = {
  IDLE: 'idle',
  LOADED: 'succeeded',
  // FAILED: 'failed',
  // LOADING: 'loading',
  // CREATING: 'creating',
  // CREATED: 'created',
  // UPDATING: 'updating',
  // UPDATED: 'updated',
};

export const DEBOUNCE_TIME = 300

export const NAVIGATION_COLLAPSE = 'navigation-collapse'
export const FILTER_START_DATE = 'filters.startDate'
// export const FILTER_CITY = 'filters.city'
export const FILTER_INFO = 'filters.info'
export const FILTER_COMPANY = 'filters.company'
export const SELECTED_TAGS = 'selected.tags'

// export const ADD_AREA_POINT = 'areas/addAreaPoint';

// export const MODES_TOGGLE = 'modes/toggle';
// export const MODES_SET_SELECTED_AREA = 'modes/setSelectedArea';
// export const MODES_SET_SELECTED_AREA_ID = 'modes/setSelectedAreaId';
// export const MODES_AREA_NEW = 'modes/area/new';
// export const MODES_AREA_RESET = 'modes/area/reset';

// export const AREAS_GET_REQUEST = 'areas/get/request';
// export const AREAS_GET_SUCCESS = 'areas/get/success';
// export const AREAS_GET_FAILURE = 'areas/get/failure';

// export const AREAS_FETCH_REQUEST = 'areas/fetch/request';
// export const AREAS_FETCH_SUCCESS = 'areas/fetch/success';
// export const AREAS_FETCH_FAILURE = 'areas/fetch/failure';

// export const AREAS_CREATE_REQUEST = 'areas/create/request';
// export const AREAS_CREATE_SUCCESS = 'areas/create/success';
// export const AREAS_CREATE_FAILURE = 'areas/create/failure';

// export const AREAS_UPDATE_REQUEST = 'areas/update/request';
// export const AREAS_UPDATE_SUCCESS = 'areas/update/success';
// export const AREAS_UPDATE_FAILURE = 'areas/update/failure';
// export const AREAS_RESET = 'areas/reset';

// export const POINTS_FETCH_REQUEST = 'points/fetch/request';
// export const POINTS_FETCH_SUCCESS = 'points/fetch/success';
// export const POINTS_FETCH_FAILURE = 'points/fetch/failure';

// export const NOTES_CREATE_REQUEST = 'notes/create/request';
// export const NOTES_CREATE_SUCCESS = 'notes/create/success';
// export const NOTES_CREATE_FAILURE = 'notes/create/failure';
// export const NOTES_RESET = 'notes/reset';

// export const SET_AREA_MODE_CREATE_REQUEST_STATUS = 'set/area/mode/create/request/status';
// export const SET_AREA_MODE_CREATE_SUCCESS_STATUS = 'set/area/mode/create/success/status';
// export const SET_AREA_MODE_CREATE_FAILURE_STATUS = 'set/area/mode/create/failure/status';
