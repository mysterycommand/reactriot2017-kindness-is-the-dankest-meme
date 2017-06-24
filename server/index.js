const express = require('express');
const path = require('path');

const app = express();

console.log('dirname', __dirname);
app.use(express.static(path.join(__dirname, './client')));

app.get('/api', (req, res) => {
  res.json({ message: 'this is an api route' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './client', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port);

console.log(`Server now listening on port ${port}`);
