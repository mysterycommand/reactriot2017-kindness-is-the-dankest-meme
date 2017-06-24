const RESIZE = 'resize';
const CHANGE_ZOOM = 'change_zoom';

const initialState = {
  width: 480,
  height: 270,
  zoomLevel: 1,
};

export default function reducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case RESIZE: {
      const { width, height } = action;
      return { ...state, width, height };
    }

    case CHANGE_ZOOM: {
      const zoomLevel = Math.min(
        Math.max(state.zoomLevel + action.increment, 0.01),
        25,
      );

      return { ...state, zoomLevel };
    }

    default:
      return { ...state };
  }
}

export function resize(width, height) {
  return { type: RESIZE, width, height };
}

export function changeZoomLevel(increment) {
  return { type: CHANGE_ZOOM, increment };
}
