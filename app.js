import express from 'express'
//import fs from 'fs'

const app = express();
const viewsPath = new URL('./views', import.meta.url).pathname;
console.log(viewsPath)

app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // `title` verður aðgengilegt sem breyta í template
  res.render('index', { title: 'Forsíða' });
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
