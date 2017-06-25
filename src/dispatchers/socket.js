import * as ducks from '../ducks';

export default function createWindowDispatcher(socket, store) {
  function onMessage({ data }) {
    const { duck, action, payload } = JSON.parse(data);
    store.dispatch(ducks[duck][action](payload));
  }
  socket.addEventListener('message', onMessage);

  // these might come in handy for some kind of JOIN_DUNGEON action?
  function onOpen() {
    socket.send('join');
  }
  socket.addEventListener('open', onOpen);
}
