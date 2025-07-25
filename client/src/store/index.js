import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import jsCookie from 'js-cookie'
import { SELECTED_TAGS, FILTER_TITLE, FILTER_CLUSTER, FILTER_ICON, FILTER_AREA, FILTER_CLUSTER_SHOW_VALUE } from 'constants'
import { safeParseJson } from 'utils/helper'

const [latitude, longitude, zoom] = (jsCookie.get('_map_location') || '').split('|')

const initialState = {
  main: {
    mode: null,
    latitude: +latitude,
    longitude: +longitude,
    progress: 0,
    progressContentLength: 0,
    progressDuration: 0,
    clusterShow: localStorage.getItem(FILTER_CLUSTER) === 'true',
    clusterShowValue: localStorage.getItem(FILTER_CLUSTER_SHOW_VALUE) || 'point_count',
    iconShow: localStorage.getItem(FILTER_ICON) === 'true',
    titleShow: localStorage.getItem(FILTER_TITLE) === 'true',
    areaShow: localStorage.getItem(FILTER_AREA) === 'true',
    zoom: +zoom,
    areasData: [],
    companiesData: [],
    pointsData: [],
    selectedAreaData: null,
    hoveredAreaId: null,
    searchHoveredAreaId: null,
    companies: [],
    pointCoordinates: null,
    sidebarExtended: localStorage.getItem('sidebarExtended') == 'true',
    searchQuery: localStorage.getItem('searchQuery'),
    searchResult: [],
    date: localStorage.getItem('date'),
    tags: [],
    selectedTags: safeParseJson(localStorage.getItem(SELECTED_TAGS)) || [],
    mapStyle: localStorage.getItem('mapStyle')
  },
  modes: {
    area: {
      newAreaPoints: [],
    },
  },
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
