import React from 'react';
import { Link } from 'react-router';
import NavBar from 'app/components/navbar';
import styles from './styles.css';

const DefaultLayout = ({ children }) => (
  <div className={styles.root}>
    <div className={styles.heading}>
      <Link className={styles.headingLink} to="/home">Tournament</Link>
    </div>
    <div className={styles.navbarDiv}>
      <NavBar className={styles.navbar}/>
    </div>
    <div className={styles.content}>
      {children}
    </div>
  </div>
);

export default DefaultLayout;