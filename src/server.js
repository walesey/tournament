import express from 'express';
import morgan from 'morgan';
import renderMiddleware from './render'

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('common'));
app.use('/', express.static('dist'));
app.use(renderMiddleware);

app.listen(port, () => {
  console.info(`Server is listening on Port ${port}`);
});