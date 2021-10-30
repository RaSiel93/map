import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
// import { requestStatuses } from 'src/constants';

const initialState = {
  main: {
    mode: null,
    zoom: 13,
    areasData: [],
    selectedAreaId: null,
    selectedAreaData: null,
    hoveredAreaId: null,
  },
  modes: {
    // area: null,
    // selectedArea: null,
    // selectedAreaId: null,
    area: {
      newAreaPoints: [],
    }
    edit: {
      area: null,
    }
  },
  areas: {
    areasData: [],
    // status: requestStatuses.IDLE,
    // getStatus: requestStatuses.IDLE,
    // createStatus: null,
    // updateStatus: null,
    // error: null,
  },
  notes: {
    // createStatus: null,
    // error: null,
  },
  points: {
    // points: [],
    // status: requestStatuses.IDLE,
    // point: null,
    // error: null
  }
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
