import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class StatusLabel extends Component {
  render() {
    const {started_at, finished_at, errors = []} = this.props.job;
    if (finished_at) {
      if (errors.length == 0) {
        return <span className="label success">Finished</span>;
      } else {
        return <span className="label danger">Errored</span>;
      }
    }
    if (started_at) {
      return <span className="label primary">Running</span>;
    }
    return <span className="label info">Waiting for worker node</span>;
  }
  static propTypes = {
    job: PropTypes.shape({
      started_at:  PropTypes.string,
      finished_at: PropTypes.string,
      errors:      PropTypes.array,
    })
  }
}
