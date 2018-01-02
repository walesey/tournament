import React, { Component } from 'react';
import classnames from 'classnames/bind';

import { pad0 } from 'app/lib/strings';

import styles from './styles.css';

var cx = classnames.bind(styles);

export default class Timer extends Component {

  state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  componentDidMount() {
    const ticker = setInterval(this.tick, 1000);
    this.setState({ ticker })
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  tick = () => {
    const timestamp = Date.now();
    const seconds = (this.props.end - timestamp) / 1000;
    this.setState({
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor(Math.floor(seconds / 60) % 60),
      seconds: Math.floor(seconds % 60),
    });
  }

  render() {
    const { className } = this.props;
    const { hours, minutes, seconds } = this.state;
    
    return (
      <div className={cx('root', className)}>
        <div className={styles.timer}>
          {`${pad0(hours, 2)}:${pad0(minutes, 2)}:${pad0(seconds, 2)}`}
        </div>
      </div>
    );
  }
}
