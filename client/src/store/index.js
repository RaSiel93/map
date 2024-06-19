import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

console.log('localStorage.getItem("sidebarExtended")', localStorage.getItem('sidebarExtended'))

const initialState = {
  main: {
    mode: null,
    zoom: null,
    areasData: [],
    companiesData: [],
    pointsData: [],
    selectedAreaData: null,
    hoveredAreaId: null,
    companies: [],
    pointCoordinates: null,
    sidebarExtended: localStorage.getItem('sidebarExtended') == 'true',
  },
  modes: {
    area: {
      newAreaPoints: [],
    },
  },
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
