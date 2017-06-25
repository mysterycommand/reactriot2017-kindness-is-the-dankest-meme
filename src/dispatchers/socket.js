import * as ducks from '../ducks';

export default function createWindowDispatcher(socket, store) {
  function onMessage({ data }) {
    const { duck, action, payload } = JSON.parse(data);
    store.dispatch(ducks[duck][action](payload));
  }
  socket.addEventListener('message', onMessage);

  function onOpen() {
    const player = JSON.parse(localStorage.getItem(ducks.LOCAL_STORAGE_KEY));
    socket.send(JSON.stringify({ isJoin: true, player }));
  }

  socket.addEventListener('open', onOpen);

  window.addEventListener('unload', () => {
    const you = store.getState().players.filter(p => p.isYou)[0];
    ducks.savePlayer(you);

    if (!you) {
      return;
    }

    socket.send(JSON.stringify({ isLeave: true, id: you.id }));
  });
}
