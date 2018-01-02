import React, { Component } from 'react';
import { connect } from 'react-redux';

import Timer from 'app/components/timer';

import styles from './styles.css';

export default class HomeView extends Component {
  render() {
    const title = 'ROUND 1 - RETRIEVAL';
    const gameEnd = Date.now() + 6000000;

    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <div className={styles.deploymentMap}></div>
          <div className={styles.roundPairings}></div>
        </div>
        <div className={styles.middle}>
          <div className={styles.title}>{title}</div>
          <div className={styles.timer}>
            <Timer end={gameEnd}></Timer>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.leaderboard}></div>
        </div>
      </div>
    );
  }
}