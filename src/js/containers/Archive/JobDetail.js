import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

@connect(({routing}) => ({routing}))
export default class JobDetail extends Component {
  render() {
    const id = this.props.match.params.job;
    return (
      <div>
        <h1>{id}</h1>
      </div>
    );
  }
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        job: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }
}
