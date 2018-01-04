import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames/bind';
import styles from './styles.css';

var cx = classnames.bind(styles);

const NavBar = ({ className }) => (
  <div className={cx('root', className)}>
    <div className={styles.link}><Link to="/home">Home</Link></div>
    <div className={styles.link}><Link to="/games">Games</Link></div>
    <div className={styles.link}><Link to="/players">Players</Link></div>
    <div className={styles.link}><Link to="/tables">Tables</Link></div>
  </div>
);

export default NavBar;