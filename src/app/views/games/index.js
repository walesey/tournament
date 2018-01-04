import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import config from 'app/config';
import { getRequest } from 'app/lib/http';
import { requestGames } from 'app/actions/games';
import Messages from 'app/components/messages';

import styles from './styles.css';

const mapStateToProps = ({ games }, { params }) => {
  return {
    loading: games.loading,
    error: games.error,
    games: games.games,
  }
}

const refreshData = (dispatch) => {
  dispatch(getRequest(`${config.apiEndpoint}/games`, requestGames));
}

const mapDispatchToProps = (dispatch) => {
  refreshData(dispatch);
  return { dispatch };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class GamesView extends Component {
  render() {
    const { games, loading, error } = this.props;

    return (
      <div className={styles.root}>
        <h2>Games</h2>
        {games && games.map((g, i) => (
          <div key={i} className={styles.game}>
            <Link to={`/games/${i}`}>
              {
                (g.players && g.players.length >= 2) &&
                (g.results && g.results.length >= 2)
                ? `${g.round+1}) ${g.table} : ${g.players[0]}(${g.results[0]}) vs ${g.players[1]}(${g.results[1]})`
                : `${g.round+1}) ${g.table} : ${g.players[0]} vs ${g.players[1]}`
              }
            </Link>
          </div>
        ))}
        <Messages className={styles.messages} loading={loading} error={error} />
      </div>
    );
  }
}