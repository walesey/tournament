import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import config from 'app/config';
import { getRequest } from 'app/lib/http';
import { requestPlayers } from 'app/actions/players';

import styles from './styles.css';

const mapStateToProps = ({ players }, { params }) => {
  return {
    loading: players.loading,
    error: players.error,
    player: players.players && players.players.reduce((acc, p) => p.name === params.player ? p : acc, null),
  }
}

const refreshData = (dispatch) => {
  dispatch(getRequest(`${config.apiEndpoint}/players`, requestPlayers));
}

const mapDispatchToProps = (dispatch) => {
  refreshData(dispatch);
  return { dispatch };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class PlayerView extends Component {
  render() {
    const { player } = this.props;

    return (
      <div className={styles.root}>
        <h2>{player && `${player.name}`}</h2>
      </div>
    );
  }
}