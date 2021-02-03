import express from 'express';
/* eslint-disable*/
import { fetchData, timeStamp, formatTime, sort } from './src/videos.js';
/* eslint-enable */

const app = express();

app.use(express.static('public'));
app.set('/views', 'views');
app.set('view engine', 'ejs');

app.locals.timeStamp = (str) => timeStamp(str);
app.locals.formatTime = (str) => formatTime(str);

app.get('/', async (req, res) => {
  try {
    const data = await fetchData();
    res.render('videos', { data });
  } catch (e) {
    throw new Error(e);
  }
});

app.get('/videos/:data?', async (req, res, next) => {
  const d = req.params.data;
  try {
    const data = await fetchData();
    if (data.videos[d]) {
      res.render('video-player', { data, d });
    } else next();
  } catch (e) {
    throw new Error(e);
  }
});

function notFoundHandler(req, res) {
  res.status(404).send('Síða fannst ekki');
}

function errorHandler(err, req, res) {
  res.status(500).send('Villa kom upp');
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
