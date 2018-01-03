import express from 'express';
import morgan from 'morgan';

import fs from 'fs';

  // fs.writeFileSync(filename, JSON.stringify(student));
const loadConfig = () => JSON.parse(fs.readFileSync('data/config.json'));
const loadState = () => JSON.parse(fs.readFileSync('data/state.json'));
const loadRounds = () => JSON.parse(fs.readFileSync('data/rounds.json'));
const loadGames = () => JSON.parse(fs.readFileSync('data/games.json'));
const loadPlayers = () => JSON.parse(fs.readFileSync('data/players.json'));

const saveState = (state) => fs.writeFileSync('data/state.json', JSON.stringify(state, null, 2));
const saveGames = (games) => fs.writeFileSync('data/games.json', JSON.stringify(games, null, 2));
const savePlayers = (players) => fs.writeFileSync('data/players.json', JSON.stringify(players, null, 2));

/*
  1 second UPDATE LOOP
*/
function step() {
  const state = loadState();
  const config = loadConfig();

  const newTimerSeconds = state.timerOn ? state.timerSeconds + 1: state.timerSeconds;



  saveState({
    ...state,
    timerSeconds: newTimerSeconds,
  });
}

/*
  SETUP SERVER
*/
const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('common'));

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Methods', '*');
  res.set('Cache-Control', 'no-cache');
  next();
});

app.use('/images', express.static('data/images'));

app.get('/config', (req, res) => res.json(loadConfig()));
app.get('/state', (req, res) => res.json(loadState()));
app.get('/rounds', (req, res) => res.json(loadRounds()));
app.get('/games', (req, res) => res.json(loadGames()));
app.get('/players', (req, res) => res.json(loadPlayers()));

setInterval(step, 1000);

app.listen(port, () => {
  console.info(`Server is listening on Port ${port}`);
});