const RESIZE = 'resize';

export default function reducer(state = {}, action = {}) {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
}

export function resize({ width, height }) {
  return { type: RESIZE, width, height };
}
