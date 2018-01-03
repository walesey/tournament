import React from 'react';

import styles from './styles.css';

const Matches = ({ games }) => (
  <div className={styles.root}>
    <h5>MATCHES</h5>
    {games && games.reduce((acc, g) => {
      const player1 = g.players && g.players.length >= 1 && g.players[0];
      const player2 = g.players && g.players.length >= 2 && g.players[1];
      return (g.results && g.results.length > 0) ? acc :
        [ ...acc, (
          <div 
            key={`${player1}:${player2}`} 
            className={styles.match}>
            {`${g.table} : ${player1} vs ${player2}`}
          </div>
        )];
    }, [])}
  </div>
);

export default Matches;