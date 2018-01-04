import React, { Component } from 'react';
import { connect } from 'react-redux';

import config from 'app/config';
import { getRequest } from 'app/lib/http';
import { requestConfig } from 'app/actions/config';
import Messages from 'app/components/messages';

import styles from './styles.css';

const mapStateToProps = ({ config }, { params }) => {
  return {
    loading: config.loading,
    error: config.error,
    tables: config.tables,
  }
}

const refreshData = (dispatch) => {
  dispatch(getRequest(`${config.apiEndpoint}/config`, requestConfig));
}

const mapDispatchToProps = (dispatch) => {
  refreshData(dispatch);
  return { dispatch };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class TablesView extends Component {
  render() {
    const { tables, loading, error } = this.props;

    return (
      <div className={styles.root}>
        <h2>Tables</h2>
        {tables && tables.map(t => (
          <div key={t.name} className={styles.table}>
            <span>{t.name}</span>
            <div className={styles.image}>
              <img src={`${config.apiEndpoint}/images/${t.image}`} />
            </div>
          </div>
        ))}
        <Messages className={styles.messages} loading={loading} error={error} />
      </div>
    );
  }
}