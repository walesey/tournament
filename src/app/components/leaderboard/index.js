import React from 'react';

import styles from './styles.css';

function ByPoints(a,b) {
  if (a.points < b.points)
    return 1;
  if (a.points > b.points)
    return -1;
  return 0;
}

const Leaderboard = ({ games, players }) => {

  const data = players && players.map(player => {
    const points = games && games.reduce((acc, value) => {
      const index = value.players.indexOf(player.name);
      const score = (index >= 0 && value.results && index < value.results.length) ? value.results[index] : 0;
      return acc + score;
    }, player.points);

    return {
      name: player.name,
      points,
    }
  }).sort(ByPoints);

  return (
    <div className={styles.root}>
      <h5>LEADERBOARD</h5>
      {data && data.map((d) => (
        <div className={styles.player}>{`${d.name} : ${d.points}`}</div>
      ))}
    </div>
  );
};

export default Leaderboard;