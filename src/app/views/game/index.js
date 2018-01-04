import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import config from 'app/config';
import { getRequest, putRequest } from 'app/lib/http';
import { getFieldValues } from 'app/lib/forms';
import { requestGames, setScore } from 'app/actions/games';

import buttonStyles from 'app/assets/styles/buttons.css';
import styles from './styles.css';

const mapStateToProps = ({ games }, { params }) => {
  const index = params.game;
  return {
    loading: games.loading,
    error: games.error,
    game: games.games && index < games.games.length && games.games[index],
    index,
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
export default class GameView extends Component {

  state = {};

  componentWillReceiveProps(nextProps) {
    const { game } = nextProps;
    const score1 = (game && game.results && game.results.length >= 1) ? game.results[0] : 0;
    const score2 = (game && game.results && game.results.length >= 2) ? game.results[1] : 0;
    const player1 = game && game.players && game.players.length >= 1 && game.players[0];
    const player2 = game && game.players && game.players.length >= 2 && game.players[1];
    this.setState({ score1, score2, player1, player2 });
  }

  handleInputChange = (event) => {
    const { value, name } = getFieldValues(event);
    this.setState({ [name]: value });
  }

  submitScores = () => {
    const { dispatch, index, game } = this.props;
    const { score1, score2 } = this.state;
    dispatch(putRequest(`${config.apiEndpoint}/games/${index}/results`, [ score1, score2 ], requestGames));
  }
  
  render() {
    const { game } = this.props;
    const { score1, score2, player1, player2 } = this.state;
    const table = game && game.table;

    return (
      <div className={styles.root}>
        <div className={styles.players}>
          <h2>{`${table}`}</h2>
          <input className={styles.input} name="player1" type="text" value={player1} onChange={this.handleInputChange} />
          {' vs '}
          <input className={styles.input} name="player2" type="text" value={player2} onChange={this.handleInputChange} />
        </div>

        <div className={styles.scores}>
          <input className={styles.input} name="score1" type="text" value={score1} onChange={this.handleInputChange} />
          {' vs '}
          <input className={styles.input} name="score2" type="text" value={score2} onChange={this.handleInputChange} />
        </div>

        <button className={buttonStyles.button} onClick={this.submitScores}>Submit Scores</button>
      </div>
    );
  }
}