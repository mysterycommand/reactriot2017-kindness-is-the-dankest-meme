import { combineReducers } from 'redux';

import viewport from './viewport';

import dungeon from './dungeon';

export default combineReducers({
  viewport,
  dungeon,
});
