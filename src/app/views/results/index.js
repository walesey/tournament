import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

export default class ResultsView extends Component {
  render() {

    return (
      <div className={styles.root}>
        <p>results</p>
      </div>
    );
  }
}