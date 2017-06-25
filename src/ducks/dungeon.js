import {
  generateDungeon,
  addRoom,
  tileInDirection,
  DIRECTIONS,
  tileKey,
} from '../utils/dungeon';

const ADD_ROOMS = 'add_rooms';

const initialState = generateDungeon(3);

export default function reducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case ADD_ROOMS: {
      const { x, y, doors } = action;

      const newState = Object.assign({}, state);

      DIRECTIONS.forEach(dir => {
        const checking = tileInDirection(x, y, dir);

        if (!doors[dir] || state.tileToRoom[tileKey(checking)]) {
          return;
        }

        const newRoom = addRoom(newState);

        if (newRoom) {
          newState.rooms[newRoom.id] = newRoom;
          newRoom.tiles.forEach(
            tile => (newState.tileToRoom[`${tile.x},${tile.y}`] = newRoom.id),
          );
        }
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
