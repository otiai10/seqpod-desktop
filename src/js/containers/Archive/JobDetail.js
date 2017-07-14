import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import {Link} from 'react-router-dom';

// Actions
import {
  api_get_job,
} from '../../actions/api';

@connect(({routing}) => ({routing}), {
  api_get_job,
})
export default class JobDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {job: null};
  }
  componentDidMount() {
    this._fetchJob();
  }
  _fetchJob() {
    const id = this.props.match.params.job;
    this.props.api_get_job(id).then(({job}) => {
      this.setState({job});
      if (!job.finished_at) setTimeout(() => this._fetchJob(), 4000);
    });
  }
  render() {
    if (this.state.job == null) return null;
    const job = this.state.job;
    return (
      <div className="job-detail container">
        {this._getNavigationHeader()}
        <h1>{job._id}</h1>
        <table className="dl-horizontal">
          <tbody>
            <tr><th>Created:</th><td>{new Date(job.created_at).toLocaleString()}</td></tr>
          </tbody>
          <tbody>
            <tr><th>Reference:</th><td>GRCh37 (default)</td></tr>
            <tr><th>Read 1:</th><td>{job.resource.reads[0]}</td></tr>
            <tr><th>Read 2:</th><td>{job.resource.reads[1]}</td></tr>
          </tbody>
          <tbody>
            <tr><th>Status:</th><td>{this._getStatusLabel()}</td></tr>
          </tbody>
        </table>
        {this._getInspection()}
        {this._getErrors()}
      </div>
    );
  }
  _getInspection() {
    return <code className="inspect"><pre>{JSON.stringify(this.state.job, null, 2)}</pre></code>;
  }
  _getErrors() {
    return this.state.job.errors.map(err => <code key={err}>{err}</code>);
  }
  _getStatusLabel() {
    const {started_at, finished_at, errors = []} = this.state.job;
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
  _getNavigationHeader() {
    return (
      <div className="row navigation-header">
        <div><Link to="/archive">&lt; Back to list</Link></div>
        <div className="fill"></div>
      </div>
    );
  }
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        job: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    api_get_job: PropTypes.func.isRequired,
  }
}
