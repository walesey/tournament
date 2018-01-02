import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

export default class GameView extends Component {
  render() {

    return (
      <div className={styles.root}>
        <p>game</p>
      </div>
    );
  }
}