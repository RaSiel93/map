import { combineReducers } from 'redux';

import { mainReducer } from './mainReducer';
import { modesReducer } from './modesReducer';

export default combineReducers({
  main: mainReducer,
  modes: modesReducer,
});
