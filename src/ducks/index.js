import { combineReducers } from 'redux';

import viewport, * as viewportActions from './viewport';
import dungeon, * as dungeonActions from './dungeon';

export default combineReducers({
  viewport,
  dungeon,
});

export { viewportActions as viewport };
export { dungeonActions as dungeon };

export const fullSync = {
  fullSync: payload => {
    if (payload) {
      return dispatch => {
        dispatch(viewportActions.fullSync(payload));
        dispatch(dungeonActions.fullSync(payload));

        if (!payload.dungeon.rooms) {
          dispatch(dungeonActions.socketGenerateNew());
        }
      };
    }

    return dispatch => {
      dispatch(dungeonActions.socketGenerateNew());
    };
  },
};
