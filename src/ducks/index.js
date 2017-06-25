import { combineReducers } from 'redux';

import dungeon, * as dungeonActions from './dungeon';
import players, * as playersActions from './players';

export default combineReducers({
  dungeon,
  players,
});

export { dungeonActions as dungeon };
export { playersActions as players };

export const LOCAL_STORAGE_KEY = 'dungeon-full-player';

export const savePlayer = (player = {}) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(player));
};

export const fullSync = {
  fullSync: payload => {
    if (payload) {
      if (payload.players) {
        const you = payload.players.filter(p => p.isYou)[0];
        savePlayer(you);
      }

      return dispatch => {
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
