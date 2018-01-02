import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames/bind';
import styles from './styles.css';

var cx = classnames.bind(styles);

const NavBar = ({ className }) => (
  <div className={cx('root', className)}>
    <div className={styles.link}><Link to="/games">Games</Link></div>
    <div className={styles.link}><Link to="/results">Results</Link></div>
  </div>
);

export default NavBar;