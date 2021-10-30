import { combineReducers } from 'redux';

import { mainReducer } from './mainReducer';
import { modesReducer } from './modesReducer';
import { areasReducer } from './areasReducer';
import { notesReducer } from './notesReducer';
import { pointsReducer } from './pointsReducer';

export default combineReducers({
  main: mainReducer,
  modes: modesReducer,
  areas: areasReducer,
  notes: notesReducer,
  points: pointsReducer,
});
