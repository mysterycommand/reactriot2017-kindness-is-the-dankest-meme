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

export const LOCAL_STORAGE_KEY = 'dungeon-player';

export const fullSync = {
  fullSync: payload => {
    if (payload) {
      if (payload.players) {
        const you = payload.players.filter(p => p.isYou)[0];
        localStorage.setItem(LOCAL_STORAGE_KEY, you.id);
      }

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
