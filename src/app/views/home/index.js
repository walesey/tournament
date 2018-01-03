import React, { Component } from 'react';
import { connect } from 'react-redux';

import config from 'app/config';
import { getRequest, putRequest } from 'app/lib/http';
import { requestInfo } from 'app/actions/info';
import { requestConfig } from 'app/actions/config';
import { requestRounds } from 'app/actions/rounds';
import { requestGames } from 'app/actions/games';
import { requestPlayers } from 'app/actions/players';
import Timer from 'app/components/timer';
import Leaderboard from 'app/components/leaderboard';
import Matches from 'app/components/matches';

import buttonStyles from 'app/assets/styles/buttons.css';
import styles from './styles.css';

const mapStateToProps = ({ info, config, rounds, games, players }, { params }) => {
  const index = info.roundIndex;
  return {
    loading: info.loading || config.loading || rounds.loading,
    error: info.error || config.error || rounds.error,
    timerOn: info.timerOn,
    timerSeconds: info.timerSeconds,
    gameLengthSeconds: config.gameLengthSeconds,
    overtimeSeconds: config.overtimeSeconds,
    round: rounds.rounds != null && index < rounds.rounds.length && rounds.rounds[index],
    players: players.players,
    games: games.games,
  }
}

const mapDispatchToProps = (dispatch) => {
  dispatch(getRequest(`${config.apiEndpoint}/state`, requestInfo));
  dispatch(getRequest(`${config.apiEndpoint}/config`, requestConfig));
  dispatch(getRequest(`${config.apiEndpoint}/rounds`, requestRounds));
  dispatch(getRequest(`${config.apiEndpoint}/games`, requestGames));
  dispatch(getRequest(`${config.apiEndpoint}/players`, requestPlayers));
  return { dispatch };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeView extends Component {
  render() {

    const {
      timerOn,
      timerSeconds,
      gameLengthSeconds,
      overtimeSeconds,
      round,
      players,
      games,
    } = this.props;

    const title = round.title || 'No active round';
    const image = round.image;

    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <div className={styles.deploymentMap}>
            <img className={styles.image} src={`${config.apiEndpoint}/images/${image}`} />
          </div>
          <div className={styles.matches}>
            <Matches games={games}></Matches>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.title}>{title}</div>
          <div className={styles.timer}>
            <Timer 
              time={timerSeconds} 
              limit={gameLengthSeconds} 
              overtime={overtimeSeconds} 
              enabled={timerOn}>
            </Timer>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.leaderboard}>
            <Leaderboard players={players} games={games}></Leaderboard>
          </div>
        </div>
      </div>
    );
  }
}