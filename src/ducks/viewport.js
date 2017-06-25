import throttle from '../utils/throttle';

const RESIZE = 'resize';
const CHANGE_SOCKET_ZOOM = 'change_socket_zoom';
const CHANGE_CLIENT_ZOOM = 'change_client_zoom';
const FULL_SYNC = 'viewport_full_sync';

const initialState = {
  width: 480,
  height: 270,
  zoomLevel: 1,
};

const { min, max } = Math;

export default function reducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case FULL_SYNC: {
      return action.viewport || state;
    }

    case RESIZE: {
      const { width, height } = action;
      return { ...state, width, height };
    }

    case CHANGE_CLIENT_ZOOM: {
      const { viewport: { zoomLevel } } = action;
      return { ...state, zoomLevel };
    }

    default:
      return { ...state };
  }
}

export function fullSync(newFullState) {
  return { type: FULL_SYNC, viewport: newFullState.viewport };
}

export function resize(width, height) {
  return { type: RESIZE, width, height };
}

export function changeClientZoom(payload) {
  return { type: CHANGE_CLIENT_ZOOM, ...payload };
}

export function changeSocketZoom(increment) {
  return (dispatch, getState, ws) => {
    const state = getState();
    const { viewport: { zoomLevel } } = state;
    const newState = {
      ...state,
      viewport: {
        ...state.viewport,
        zoomLevel: min(max(zoomLevel + increment, 0.01), 25),
      },
    };

    throttle(CHANGE_SOCKET_ZOOM, () => {
      ws.send(
        JSON.stringify({
          duck: 'viewport',
          action: 'changeClientZoom',
          payload: newState,
        }),
      );
    });
  };
}
