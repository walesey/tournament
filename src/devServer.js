import express from 'express';
import morgan from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack/webpack.config';

const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(config);

app.use(morgan('common'));
app.use('/', webpackDevMiddleware(compiler));

app.use((req, res) => {
    res.status(200).send(`<!DOCTYPE html>
<html>
  <head>
    <title>Tournament</title>
    <link href='/styles.css' rel='stylesheet'/>
  </head>
  <body>
    <div id='content'/>
  </body>
  <script src='/client.js'></script>
</html>`
    );
});

app.listen(port, () => {
  console.info(`Server is listening on Port ${port}`);
});