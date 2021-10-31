import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { requestStatuses } from 'src/constants';

const initialState = {
  main: {
    mode: null,
    zoom: null,
    areasData: [],
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
