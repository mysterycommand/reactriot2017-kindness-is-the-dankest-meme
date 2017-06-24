const RESIZE = 'resize';
const CHANGE_ZOOM = 'change_zoom';
const CHANGE_OFFSET = 'change_offset';

const initialState = {
  width: 480,
  height: 270,
  zoomLevel: 1,
  centerOffset: {
    x: 0,
    y: 0,
  },
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

    case CHANGE_OFFSET: {
      const { x, y } = state.centerOffset;

      return {
        ...state,
        centerOffset: {
          x: x + action.increments.x,
          y: y + action.increments.y,
        },
      };
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

export function changeCenterOffset(increments) {
  return { type: CHANGE_OFFSET, increments };
}
