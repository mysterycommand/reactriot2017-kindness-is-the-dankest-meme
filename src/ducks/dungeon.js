import {
  generateDungeon,
  addRoom,
  tileInDirection,
  DIRECTIONS,
  getTileId,
} from '../utils/dungeon';

const FULL_SYNC = 'dungeon_full_sync';

const initialState = {};

export default function reducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case FULL_SYNC: {
      return action.dungeon || state;
    }

    default:
      return { ...state };
  }
}

export function fullSync(newFullState) {
  return { type: FULL_SYNC, dungeon: newFullState.dungeon };
}

export function socketAddRooms({ x, y, doors }) {
  return (dispatch, getState, ws) => {
    const state = getState();
    const newState = { ...state };

    DIRECTIONS.forEach(dir => {
      const checking = tileInDirection(x, y, dir);

      if (!doors[dir] || newState.dungeon.tiles[getTileId(checking)]) {
        return;
      }

      newState.dungeon = addRoom(newState.dungeon, checking);
    });

    ws.send(
      JSON.stringify({
        duck: 'dungeon',
        action: 'fullSync',
        payload: newState,
      }),
    );
  };
}

export function socketGenerateNew() {
  return (dispatch, getState, ws) => {
    const state = getState();

    const newState = {
      ...state,
      dungeon: generateDungeon(1),
    };

    ws.send(
      JSON.stringify({
        duck: 'dungeon',
        action: 'fullSync',
        payload: newState,
      }),
    );
  };
}
