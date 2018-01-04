import React, { Component } from 'react';
import { connect } from 'react-redux';

import config from 'app/config';
import { genericRequest, getRequest } from 'app/lib/http';
import { getFieldValues } from 'app/lib/forms';
import { requestInfo, requestToggleClock } from 'app/actions/info';
import { requestConfig } from 'app/actions/config';
import { requestGames, requestNewRound } from 'app/actions/games';
import { requestPlayers } from 'app/actions/players';
import { setPassword } from 'app/actions/auth';
import Timer from 'app/components/timer';
import Leaderboard from 'app/components/leaderboard';
import Matches, { byRound } from 'app/components/matches';
import Messages from 'app/components/messages';

import buttonStyles from 'app/assets/styles/buttons.css';
import styles from './styles.css';

const mapStateToProps = ({ info, config, games, players, auth }, { params }) => {
  const index = info.roundIndex;
  return {
    loading: info.loading || config.loading || games.loading || players.loading,
    error: info.error || config.error || games.error || players.error,
    timerOn: info.timerOn,
    timerSeconds: info.timerSeconds,
    gameLengthSeconds: config.gameLengthSeconds,
    overtimeSeconds: config.overtimeSeconds,
    roundIndex: index,
    round: config.rounds != null && index >= 0 && index < config.rounds.length && config.rounds[index],
    players: players.players,
    games: games.games,
    password: auth.password,
  }
}

const refreshData = (dispatch) => {
  dispatch(getRequest(`${config.apiEndpoint}/state`, requestInfo));
  dispatch(getRequest(`${config.apiEndpoint}/config`, requestConfig));
  dispatch(getRequest(`${config.apiEndpoint}/games`, requestGames));
  dispatch(getRequest(`${config.apiEndpoint}/players`, requestPlayers));
}

const mapDispatchToProps = (dispatch) => {
  refreshData(dispatch);
  return { dispatch };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class HomeView extends Component {

  componentDidMount() {
    const refreshIntervalId = setInterval(this.refresh, 5000);
    this.setState({ refreshIntervalId });
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshIntervalId);
  }

  refresh = () => {
    refreshData(this.props.dispatch);
  }
  
  authRequest(url, actions) {
    const { dispatch, password } = this.props;
    const headers = { 'Authorization': password };
    dispatch(genericRequest(url, null, 'GET', headers, actions));
  }

  onClickStart = () => {
    this.authRequest(`${config.apiEndpoint}/auth/clock/start`, requestToggleClock);
  }

  onClickStop = () => {
    this.authRequest(`${config.apiEndpoint}/auth/clock/stop`, requestToggleClock);
  }

  onClickNewRound = () => {
    this.authRequest(`${config.apiEndpoint}/auth/newRound`, requestNewRound);
  }

  handleInputChange = (event) => {
    const { value, name } = getFieldValues(event);
    const { dispatch } = this.props;
    dispatch(setPassword(value));
  }

  render() {
    const {
      timerOn,
      timerSeconds,
      gameLengthSeconds,
      overtimeSeconds,
      roundIndex,
      round,
      players,
      games,
      loading,
      error,
    } = this.props;

    const title = round.title || 'No active round';
    const image = (round && round.image) ? round.image : 'default.png';

    return (
      <div className={styles.root}>
        <div className={styles.left}>
          <div className={styles.deploymentMap}>
            <img className={styles.image} src={`${config.apiEndpoint}/images/${image}`} />
          </div>
          <div className={styles.matches}>
            <Matches games={games} matcher={byRound(roundIndex)} />
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.title}>{title}</div>
          <div className={styles.timer}>
            <Timer 
              time={timerSeconds} 
              limit={gameLengthSeconds} 
              overtime={overtimeSeconds} 
              enabled={timerOn} 
            />
          </div>
          <div className={styles.buttons}>
            <button className={buttonStyles.button} onClick={this.onClickStart}>Start</button>
            <button className={buttonStyles.button} onClick={this.onClickStop}>Stop</button>
            <button className={buttonStyles.button} onClick={this.onClickNewRound}>New Round</button>
          </div>
          <input className={styles.password} name="Password" type="password" onChange={this.handleInputChange} />
          <Messages className={styles.messages} loading={loading} error={error} />
        </div>
        <div className={styles.right}>
          <div className={styles.leaderboard}>
            <Leaderboard players={players} games={games} />
          </div>
        </div>
      </div>
    );
  }
}