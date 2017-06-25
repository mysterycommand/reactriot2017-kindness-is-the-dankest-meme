import { combineReducers } from 'redux';

import viewport, * as viewportActions from './viewport';

export default combineReducers({
  viewport,
});

export { viewportActions as viewport };
