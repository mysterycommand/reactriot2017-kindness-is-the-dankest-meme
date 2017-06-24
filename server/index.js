import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, './client')));

app.get('/*', (req, res) => {
  console.log('dirname', __dirname);

  res.sendFile(path.join(__dirname, './client', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port);

console.log(`Server now listening on port ${port}`);
