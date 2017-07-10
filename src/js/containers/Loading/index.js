import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cn from 'classnames';

@connect(({api}) => api)
export default class Loading extends Component {
  render() {
    const {loading, progress} = this.props;
    return (
      <div id="loading-indicator-container" className={cn({loading:loading > 0})}>
        <div id="loading-indicator" style={{width: `${progress * 1000}%`}} />
      </div>
    );
  }
  static propTypes = {
    loading: PropTypes.number.isRequired,
    progress: PropTypes.any.isRequired,
  }
}
