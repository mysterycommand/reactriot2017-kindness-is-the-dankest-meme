const FULL_SYNC = 'players_full_sync';

const initialState = [];

export default function reducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case FULL_SYNC: {
      // console.log(action.players || state);
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
