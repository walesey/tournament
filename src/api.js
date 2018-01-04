import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import fs from 'fs';

const loadAuth = () => JSON.parse(fs.readFileSync('data/auth.json'));
const loadConfig = () => JSON.parse(fs.readFileSync('data/config.json'));
const loadState = () => JSON.parse(fs.readFileSync('data/state.json'));
const loadGames = () => JSON.parse(fs.readFileSync('data/games.json'));
const loadPlayers = () => JSON.parse(fs.readFileSync('data/players.json'));

const saveState = (state) => fs.writeFileSync('data/state.json', JSON.stringify(state, null, 2));
const saveGames = (games) => fs.writeFileSync('data/games.json', JSON.stringify(games, null, 2));
const savePlayers = (players) => fs.writeFileSync('data/players.json', JSON.stringify(players, null, 2));

// Sort by player points
function ByPoints(a, b) {
  if (a.points < b.points)
    return 1;
  if (a.points > b.points)
    return -1;
  return 0;
}

// Determine if a match up of players has already occured in games list
function matchHasOccured(playersNames, games) {
  let occured = false;
  games.forEach(game => {
    let match = true;
    const players1 = playersNames.sort();
    const players2 = game.players.sort();
    for (let i=0; i<players1.length; i++) {
      if (players1.length !== players2.length || players1[i] !== players2[i]) {
        match = false;
      }
    }

    if (match) {
      occured = true;
    }
  });
  return occured;
}

function playerInGame(playerName, games) {
  let inGame = false;
  games.forEach(game => game.players.forEach(player => {
    if (player === playerName) {
      inGame = true;
    }
  }));
  return inGame;
}

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
  Function that auto creates the next round of games.
*/
function newRound() {
  const games = loadGames();
  const state = loadState();
  const playersRaw = loadPlayers();
  const config = loadConfig();

  const players = playersRaw.map(player => ({
    ...player,
    points: games.reduce((acc, value) => {
      const index = value.players.indexOf(player.name);
      const score = (index >= 0 && value.results && index < value.results.length) ? value.results[index] : 0;
      return acc + score;
    }, player.points),
  }));

  const newRoundIndex = state.roundIndex + 1;
  const newGames = [];
  config.tables.forEach(table => {
    newGames.push({
      table: table.name,
      round: newRoundIndex,
      results: [],
      players: players
        .sort(ByPoints)
        .reduce((acc, player) => {
          if (playerInGame(player.name, newGames) || acc.length === 2) {
            return acc;
          }
          if (acc.length === 0) {
            return [ player.name ];
          }
          if (matchHasOccured([ ...acc, player.name ], games)) {
            return acc;
          }
          return [ ...acc, player.name ];
        }, []),
    });
  });

  saveGames([
    ...games,
    ...newGames,
  ]);
  saveState({
    roundIndex: newRoundIndex,
    timerOn: false,
    timerSeconds: 0,
  });
}

/*
  SETUP SERVER
*/
const app = express();
const port = process.env.PORT || 4000;

app.use(morgan('common'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Methods', '*');
  res.set('Cache-Control', 'no-cache');
  next();
});

app.use('/images', express.static('data/images'));

app.use('/auth', (req, res, next) => {
  const token = req.get('Authorization');
  if (req.method !== 'OPTIONS' && token != loadAuth().adminToken) {
    res.statusCode = 401;
    var e = new Error('Not Authorized');
    next(e);
    return
  }
  next();
});

app.get('/auth/clock/start', (req, res) => {
  saveState({...loadState(), timerOn: true});
  res.json(loadState());
});

app.get('/auth/clock/stop', (req, res) => {
  saveState({...loadState(), timerOn: false});
  res.json(loadState());
});

app.get('/auth/newRound', (req, res) => {
  newRound();
  res.json(loadGames());
});

app.put('/auth/players/:name', (req, res) => {
  const players = loadPlayers();
  const name = req.params.name;
  savePlayers(players.map(p => p.name === name ? req.body : p));
  res.json(loadPlayers());
});

app.put('/auth/games/:game/players', (req, res) => {
  const games = loadGames();
  const index = parseInt(req.params.game);
  if (index >= 0 && index < games.length) {
    saveGames(games.map((game, i) => ({
      ...game,
      players: i === index ? [req.body[0], req.body[1]] : game.players,
    })));
  }
  res.json(loadGames());
});

app.put('/games/:game/results', (req, res) => {
  const games = loadGames();
  const index = parseInt(req.params.game);
  if (index >= 0 && index < games.length) {
    saveGames(games.map((game, i) => ({
      ...game,
      results: i === index ? [parseInt(req.body[0]), parseInt(req.body[1])] : game.results,
    })));
  }
  res.json(loadGames());
});

app.get('/config', (req, res) => res.json(loadConfig()));
app.get('/state', (req, res) => res.json(loadState()));
app.get('/games', (req, res) => res.json(loadGames()));
app.get('/players', (req, res) => res.json(loadPlayers()));

setInterval(step, 1000);

app.listen(port, () => {
  console.info(`Server is listening on Port ${port}`);
});