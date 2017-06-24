const express = require('express');
const path = require('path');

const { NODE_ENV, PORT } = process.env;
const __DEV__ = NODE_ENV === 'development';

const app = express();

if (__DEV__) {
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

app.get('/api/test', (req, res) => {
  setTimeout(() => {
    const rand = Math.floor(Math.random() * 10);
    res.json({
      message: `this from the server. here's a random number: ${rand}`,
    });
  }, 200);
});

if (!__DEV__) {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.use((req, res, next) => {
  res.status(404).send('oops :(');
});

const port = PORT || (__DEV__ ? 3001 : 3000);

app.listen(port);

console.log(`Server now listening on port ${port}`);
