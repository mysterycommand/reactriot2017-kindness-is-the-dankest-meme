import { resize } from '../ducks/viewport';

export default function createWindowDispatcher(store) {
  function onResize({ target }) {
    const { innerWidth: width, innerHeight: height } = target;
    store.dispatch(resize(width, height));
  }

  window.addEventListener('resize', onResize);
  onResize({ target: window });
}
