import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'redux-router';
import { deleteRequest } from 'app/lib/http';
import config from 'app/config';
// import { submitImageData } from 'app/actions/images';

import buttonStyles from 'app/assets/styles/buttons.css';
import styles from './styles.css';

const mapStateToProps = ({ images }, { params }) => {
  return {
    imageName: params.imageName,
    loading: images.loading,
    error: images.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Games extends Component {
  onClickDelete = (event) => {
    const { dispatch, imageName } = this.props;
    dispatch(deleteRequest(`${config.apiEndpoint}/images?name=${imageName}`, null, {
      ...submitImageData,
      successFn: (url, body) => {
        dispatch(push('/images'));
        return submitImageData.successFn(url, body);
      },
    }));
  }
  
  render() {
    const { loading, error, imageName } = this.props;

    return (
      <div className={styles.root}>
        <img className={styles.image} src={`${config.apiEndpoint}/images?name=${imageName}`} />
        <button className={buttonStyles.button} onClick={this.onClickDelete}>Delete</button>
        {loading && <p>LOADING...</p>}
        {error && <p>{`ERROR: ${error}`}</p>}
      </div>
    );
  }
}