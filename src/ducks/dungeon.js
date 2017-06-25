import {
  generateDungeon,
  addRoom,
  tileInDirection,
  DIRECTIONS,
  getTileId,
} from '../utils/dungeon';

const ADD_ROOMS = 'add_rooms';

const initialState = generateDungeon(1);

export default function reducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case ADD_ROOMS: {
      const { x, y, doors } = action;

      let newState = { ...state };

      DIRECTIONS.forEach(dir => {
        const checking = tileInDirection(x, y, dir);

        if (!doors[dir] || state.tiles[getTileId(checking)]) {
          return;
        }

        newState = addRoom(state, checking);
      });

      return newState;
    }

    default:
      return { ...state };
  }
}

export function addRooms({ x, y, doors }) {
  return { type: ADD_ROOMS, x, y, doors };
}
