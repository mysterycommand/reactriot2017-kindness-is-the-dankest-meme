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
    console.log('got full sync');

    if (payload) {
      console.log('has stuff');
      return dispatch => {
        dispatch(viewportActions.fullSync(payload));
        dispatch(dungeonActions.fullSync(payload));

        if (!payload.dungeon.rooms) {
          console.log('hi');
          dispatch(dungeonActions.socketGenerateNew());
        }
      };
    }

    return dispatch => {
      console.log('hi 2');
      dispatch(dungeonActions.socketGenerateNew());
    };
  },
};
