import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

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
  },
  modes: {
    area: {
      newAreaPoints: [],
    },
  },
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
