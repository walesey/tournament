import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

const Matches = ({ games, round }) => (
  <div className={styles.root}>
    <h5>MATCHES</h5>
    {games && games.reduce((acc, g, i) => {
      const player1 = g.players && g.players.length >= 1 && g.players[0];
      const player2 = g.players && g.players.length >= 2 && g.players[1];
      return g.round === round ?
        [ ...acc, (
          <div
            key={`${player1}:${player2}`}
            className={styles.match}>
            <Link to={`/games/${i}`}>{
              (g.results && g.results.length >= 2)
              ? `${g.table} : ${player1}(${g.results[0]}) vs ${player2}(${g.results[1]})`
              : `${g.table} : ${player1} vs ${player2}`
            }</Link>
          </div>
        )] : acc;
    }, [])}
  </div>
);

export default Matches;