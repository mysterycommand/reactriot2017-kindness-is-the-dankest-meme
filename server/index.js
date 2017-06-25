const path = require('path');

const express = require('express');
const expressWs = require('express-ws');

const getRandomFace = require('./get-random-face');
const randomRgb = require('./random-rgb');

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

const getTileInCenterRoom = () => {
  if (!lastKnownState || !lastKnownState.dungeon) {
    return { x: 0, y: 0 };
  }

  const room = lastKnownState.dungeon.rooms[0];
  const tileId = room.tileIds[Math.floor(Math.random() * room.tileIds.length)];
  return lastKnownState.dungeon.tiles[tileId];
};

const assignCurrentPlayer = (client, players) => {
  players.forEach(player => (player.isYou = player.id === client.id));
};

const handleWsError = e => {
  if (e) {
    // these are often fine - i.e. trying to send to a closed connection.
    // just need to catch them somehow, and might as well log.
    // (note: this always happens on "leave", because its sent as a connection
    // is closing.)
    console.log('socket error: ' + e);
  }
};

app.ws('/dungeon', (ws, req) => {
  ws.on('message', message => {
    const json = JSON.parse(message);

    if (json.isJoin) {
      const playerId = json.id || uuid();
      ws.id = playerId;

      const players = lastKnownState ? lastKnownState.players || [] : [];
      let joinedPlayer = null;

      if (players.length > 0) {
        const player = lastKnownState.players.filter(player => {
          return player.id === playerId;
        });

        if (player.length) {
          joinedPlayer = player[0];
        }
      }

      if (!joinedPlayer) {
        const tile = getTileInCenterRoom();

        joinedPlayer = {
          id: playerId,
          fill: randomRgb(),
          face: getRandomFace(),
          x: tile.x,
          y: tile.y,
        };

        players.push(joinedPlayer);
      }

      const message = {
        duck: 'fullSync',
        action: 'fullSync',
        payload: Object.assign(lastKnownState || {}, {
          players,
        }),
      };

      wss.clients.forEach(client => {
        assignCurrentPlayer(client, message.payload.players);
        client.send(JSON.stringify(message), handleWsError);
      });

      lastKnownState = message.payload;
      return;
    }

    if (
      json.isLeave &&
      json.id &&
      lastKnownState &&
      lastKnownState.players.length > 0
    ) {
      const clientsForId = [];
      wss.clients.forEach(c => {
        if (c.id === json.id) {
          clientsForId.push(c);
        }
      });

      if (clientsForId.length > 1) {
        return;
      }

      const players = lastKnownState.players.filter(player => {
        return player.id !== json.id;
      });

      const message = {
        duck: 'fullSync',
        action: 'fullSync',
        payload: Object.assign(lastKnownState || {}, {
          players,
        }),
      };

      wss.clients.forEach(client => {
        assignCurrentPlayer(client, message.payload.players);
        client.send(JSON.stringify(message), handleWsError);
      });

      lastKnownState = message.payload;
      return;
    }

    wss.clients.forEach(client => {
      assignCurrentPlayer(client, json.payload.players);
      client.send(JSON.stringify(json), handleWsError);
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
