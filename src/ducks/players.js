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
