import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

const mapStateToProps = ({ errors }) => {
  return {
    message: errors.errorMsg,
  }
}

@connect(mapStateToProps)
export default class ErrorView extends Component {
  render() {
    const { message } = this.props;

    return (
      <div className={styles.root}>
        <p>{message || 'Error'}</p>
      </div>
    );
  }
}