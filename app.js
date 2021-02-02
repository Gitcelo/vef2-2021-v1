import express from 'express'
import { fetchData, timeStamp, formatTime } from './src/videos.js';

const app = express();
//const viewsPath = new URL('/views', import.meta.url).pathname;
app.use(express.static('public'));

app.set('/views','views');
app.set('view engine', 'ejs');

app.locals.timeStamp = (str) => timeStamp(str);
app.locals.formatTime = (str) => formatTime(str)

app.get('/', async (req, res) => {
  try {
    const data = await fetchData();
    res.render('videos', {data});
  } catch(e) {
    throw new Error(e);
  }
});

function notFoundHandler(req, res, next) {
  res.status(404).send('Síða fannst ekki');
}

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send('Villa kom upp');
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
