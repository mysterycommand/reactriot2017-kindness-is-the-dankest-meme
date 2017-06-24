const path = require('path');

const express = require('express');

const { NODE_ENV, PORT } = process.env;

const port = PORT || (NODE_ENV === 'development' ? 3001 : 3000);

const app = express();
require('express-ws')(app);

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

app.ws('/dungeon', (ws, req) => {
  ws.on('message', message => {
    ws.send(message);
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
