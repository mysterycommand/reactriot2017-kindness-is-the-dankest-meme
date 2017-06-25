import { DIRECTIONS, getTileId, tileInDirection } from '../utils/dungeon';

const FULL_SYNC = 'players_full_sync';

const initialState = [];

export default function reducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case FULL_SYNC: {
      return action.players || state;
    }

    default:
      return state;
  }
}

export function fullSync(newFullState) {
  return { type: FULL_SYNC, players: newFullState.players };
}

export function socketTryToMove(toTile) {
  return (dispatch, getState, ws) => {
    const state = getState();
    const yous = state.players.filter(p => p.isYou);

    if (!yous.length > 0) {
      return;
    }

    const you = yous[0];
    const tryingMove = getTileId(toTile);

    const validMove =
      DIRECTIONS.filter(dir => {
        const id = getTileId(tileInDirection(you.x, you.y, dir));
        return id === tryingMove;
      }).length > 0;

    if (!validMove) {
      return;
    }

    you.x = toTile.x;
    you.y = toTile.y;

    ws.send(
      JSON.stringify({
        duck: 'players',
        action: 'fullSync',
        payload: state,
      }),
    );
  };
}
