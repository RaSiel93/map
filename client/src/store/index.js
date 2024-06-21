import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import jsCookie from 'js-cookie'

const [latitude, longitude, zoom] = (jsCookie.get('_map_location') || '').split('|')

const initialState = {
  main: {
    mode: null,
    latitude: +latitude,
    longitude: +longitude,
    zoom: +zoom,
    areasData: [],
    companiesData: [],
    pointsData: [],
    selectedAreaData: null,
    hoveredAreaId: null,
    companies: [],
    pointCoordinates: null,
    sidebarExtended: localStorage.getItem('sidebarExtended') == 'true',
    search: ''
  },
  modes: {
    area: {
      newAreaPoints: [],
    },
  },
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
