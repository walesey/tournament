import React from 'react';
import classnames from 'classnames/bind';

import styles from './styles.css';

var cx = classnames.bind(styles);

const Message = ({ className, loading, error }) => (
  <div className={cx('root', className)}>
    {loading && <span>LOADING...</span>}
    {error && <span>{`ERROR: ${error}`}</span>}
  </div>
);

export default Message;