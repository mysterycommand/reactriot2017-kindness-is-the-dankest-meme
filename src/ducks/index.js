import { combineReducers } from 'redux';

import viewport, * as viewportActions from './viewport';
import dungeon, * as dungeonActions from './dungeon';
import players, * as playersActions from './players';

export default combineReducers({
  viewport,
  dungeon,
  players,
});

export { viewportActions as viewport };
export { dungeonActions as dungeon };
export { playersActions as players };

export const fullSync = {
  fullSync: payload => {
    if (payload) {
      return dispatch => {
        dispatch(viewportActions.fullSync(payload));
        dispatch(dungeonActions.fullSync(payload));
        dispatch(playersActions.fullSync(payload));

        if (!payload.dungeon || !payload.dungeon.rooms) {
          dispatch(dungeonActions.socketGenerateNew());
        }
      };
    }

    return dispatch => {
      dispatch(dungeonActions.socketGenerateNew());
    };
  },
};
