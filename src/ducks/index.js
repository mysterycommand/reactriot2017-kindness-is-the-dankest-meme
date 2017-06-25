import { combineReducers } from 'redux';

import viewport, * as viewportActions from './viewport';

import dungeon from './dungeon';

export default combineReducers({
  viewport,
  dungeon,
});

export { viewportActions as viewport };
