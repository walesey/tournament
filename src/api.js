import express from 'express';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('common'));

app.get('/games', (req, res) => {
  res.json([
    {
      'table': 'Table 1',
      'players': ['Player 3', 'Player 5'],
      'results': [13, 7],
    },
    {
      'table': 'Table 2',
      'players': ['Player 1', 'Player 2'],
      'results': [13, 7],
    },
    {
      'table': 'Table 3',
      'players': ['Player 4', 'Player 6'],
      'results': [10, 10],
    },
  ]);
});

app.listen(port, () => {
  console.info(`Server is listening on Port ${port}`);
});