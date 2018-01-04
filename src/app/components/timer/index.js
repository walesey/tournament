import React, { Component } from 'react';
import classnames from 'classnames/bind';

import { pad0 } from 'app/lib/strings';

import styles from './styles.css';

var cx = classnames.bind(styles);

export default class Timer extends Component {

  state = {
    time: 0,
  };

  componentDidMount() {
    const ticker = setInterval(this.tick, 1000);
    this.setState({ ticker });
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  componentWillReceiveProps(nextProps) {
    //Only update the internal state if recieving a new external time value. (from the api)
    if (nextProps.time !== this.props.time) {
      this.setState({ time: nextProps.time });
    }
  }

  tick = () => {
    if (!this.props.enabled) {
      return;
    }
    this.setState({ time: this.state.time + 1 });
  }

  render() {
    const { className, limit, overtime } = this.props;
    const { time } = this.state;

    const red = time >= limit;
    const finished = time >= (limit + overtime);
    const clockTime = limit - time + (red ? overtime : 0);

    const hours = Math.floor(clockTime / 3600);
    const minutes = Math.floor(Math.floor(clockTime / 60) % 60);
    const seconds = Math.floor(clockTime % 60);
    
    return (
      <div className={cx('root', className)}>
        <div className={cx('timer', { red })}>
          {
            finished 
            ? 'TIMES UP'
            : `${pad0(hours, 2)}:${pad0(minutes, 2)}:${pad0(seconds, 2)}`
          }
        </div>
      </div>
    );
  }
}
