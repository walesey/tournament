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
    players: players.players,
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
export default class PlayersView extends Component {
  render() {
    const { players } = this.props;

    return (
      <div className={styles.root}>
        <h2>Players</h2>
        {players && players.map(p => (
          <div key={p.name} className={styles.player}>
            <Link to={`/players/${p.name}`}>
              {p.name}
            </Link>
          </div>
        ))}
      </div>
    );
  }
}