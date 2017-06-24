const RESIZE = 'resize';

const initialState = {
  width: 480,
  height: 270,
};

export default function reducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case RESIZE: {
      const { width, height } = action;
      return { ...state, width, height };
    }

    default:
      return { ...state };
  }
}

export function resize(width, height) {
  return { type: RESIZE, width, height };
}
