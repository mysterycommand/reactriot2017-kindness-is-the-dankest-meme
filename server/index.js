const path = require('path');

const express = require('express');
const expressWs = require('express-ws');

const { NODE_ENV, PORT } = process.env;

const port = PORT || (NODE_ENV === 'development' ? 3001 : 3000);

const { app, getWss } = expressWs(express());

if (NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
}

app.use(express.static(path.join(__dirname, '../build')));

const wss = getWss('/dungeon');

const uuid = () => String(Math.random());

let lastKnownState = null;

const assignCurrentPlayer = (client, players) => {
  players.forEach(player => (player.isYou = player.id === client.id));
};

app.ws('/dungeon', (ws, req) => {
  ws.on('message', message => {
    if (message === 'join') {
      const newPlayerId = uuid();
      ws.id = newPlayerId;

      const newPlayer = {
        id: newPlayerId,
        fill: '#cecece',
        face: 'star',
        x: Math.floor(Math.random() * 10) - 5,
        y: Math.floor(Math.random() * 10) - 5,
      };

      const players = lastKnownState ? lastKnownState.players || [] : [];
      players.push(newPlayer);

      const message = {
        duck: 'fullSync',
        action: 'fullSync',
        payload: Object.assign(lastKnownState || {}, {
          players,
        }),
      };

      wss.clients.forEach(client => {
        assignCurrentPlayer(client, message.payload.players);
        client.send(JSON.stringify(message));
      });
      return;
    }

    const json = JSON.parse(message);

    wss.clients.forEach(client => {
      assignCurrentPlayer(client, json.payload.players);
      client.send(JSON.stringify(json));
    });

    lastKnownState = json.payload;
  });
});

app.get('/api/test', (req, res) => {
  setTimeout(() => {
    const rand = Math.floor(Math.random() * 10);
    res.json({
      message: `this from the server. here's a random number: ${rand}`,
    });
  }, 200);
});

if (!NODE_ENV === 'development') {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.use((req, res, next) => {
  res.status(404).send('oops :(');
});

app.listen(port);

console.log(`Server now listening on port ${port}`);
