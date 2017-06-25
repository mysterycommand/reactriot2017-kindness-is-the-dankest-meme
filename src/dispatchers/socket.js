import * as ducks from '../ducks';

export default function createWindowDispatcher(socket, store) {
  function onMessage({ data }) {
    const { duck, action, payload } = JSON.parse(data);
    store.dispatch(ducks[duck][action](payload));
  }
  socket.addEventListener('message', onMessage);

  function onOpen() {
    const existingPlayerId = localStorage.getItem(ducks.LOCAL_STORAGE_KEY);
    socket.send(JSON.stringify({ isJoin: true, id: existingPlayerId }));
  }

  socket.addEventListener('open', onOpen);
}
