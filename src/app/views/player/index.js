import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import config from 'app/config';
import { genericRequest, getRequest } from 'app/lib/http';
import { getFieldValues } from 'app/lib/forms';
import { setPassword } from 'app/actions/auth';
import { requestPlayers } from 'app/actions/players';
import Messages from 'app/components/messages';

import buttonStyles from 'app/assets/styles/buttons.css';
import styles from './styles.css';

const mapStateToProps = ({ players, auth }, { params }) => {
  return {
    loading: players.loading,
    error: players.error,
    player: players.players && players.players.find((p) => p.name == params.player),
    password: auth.password,
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

  state = {};

  componentWillReceiveProps(nextProps) {
    const { player } = nextProps;
    const points = player ? player.points : 0;
    this.setState({ points });
  }

  handleInputChange = (event) => {
    const { value, name } = getFieldValues(event);
    name === 'points' && this.setState({ points: value });
  }

  handlePasswordChange = (event) => {
    const { value, name } = getFieldValues(event);
    const { dispatch } = this.props;
    dispatch(setPassword(value));
  }

  handleSubmit = () => {
    const { dispatch, password, player } = this.props;
    const { points } = this.state;
    const newPlayer = { ...player, points: parseInt(points) };
    const headers = { 'Authorization': password };
    const url = `${config.apiEndpoint}/auth/players/${player.name}`;
    dispatch(genericRequest(url, newPlayer, 'PUT', headers, requestPlayers));
  }

  render() {
    const { player, loading, error } = this.props;
    const { points } = this.state;

    return (
      <div className={styles.root}>
        <h2>{player && `${player.name}`}</h2>
        <label>Base Points</label>
        <div className={styles.score}>
          <input className={styles.input} name="points" type="text" value={points} onChange={this.handleInputChange} />          
        </div>
        <div className={styles.submitButton}>
          <button className={buttonStyles.button} onClick={this.handleSubmit}>Submit</button>          
        </div>        
        <input className={styles.password} name="Password" type="password" onChange={this.handlePasswordChange} />
        <Messages className={styles.messages} loading={loading} error={error} />
      </div>
    );
  }
}