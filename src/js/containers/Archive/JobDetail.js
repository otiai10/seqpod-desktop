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
    this.state = {
      job: null,
      open: {
        result: false,
        stdout: false,
        stderr: false,
        inspection: false,
      },
    };
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

        {this._renderResultFiles()}
        {this._renderStdOut()}
        {this._renderStdErr()}
        {this._renderAppLog()}
        {this._renderinspection()}

      </div>
    );
  }
  _renderResultFiles() {
    const onclick = () => this.setState({open: {...this.state.open, result: !this.state.open.result}});
    const h = <h3 onClick={onclick}>{this.state.open.result ? '- Result Files' : '▼ Result Files'}</h3>;
    return (
      <div className="section">
        {h}
        {this.state.open.result ? <table>
          <tbody>
            {this.state.job.results.map(result => {
              return <tr key={result}><td colSpan="2"><Link to={`/archive/${this.state.job._id}/results/${result}`}>{result}</Link></td></tr>;
            })}
          </tbody>
        </table> : null}
      </div>
    );
  }
  _renderStdOut() {
    const onclick = () => this.setState({open: {...this.state.open, stdout: !this.state.open.stdout}});
    const h = <h3 onClick={onclick}>{this.state.open.stdout ? '- Stdout Log' : '▼ Stdout Log'}</h3>;
    return (
      <div className="section">
        {h}
        {this.state.open.stdout ? <div className="stdio">
          {this.state.job.stdout.split('\n').map((line, i) => <p key={i} className="line">{line}</p>)}
        </div> : null}
      </div>
    );
  }
  _renderStdErr() {
    const onclick = () => this.setState({open: {...this.state.open, stderr: !this.state.open.stderr}});
    const h = <h3 onClick={onclick}>{this.state.open.stderr ? '- Stderr Log' : '▼ Stderr Log'}</h3>;
    return (
      <div className="section">
        {h}
        {this.state.open.stderr ? <div className="stdio">
          {this.state.job.stderr.split('\n').map((line, i) => <p key={i} className="line">{line}</p>)}
        </div> : null}
      </div>
    );
  }
  _renderAppLog() {
    const onclick = () => this.setState({open: {...this.state.open, applog: !this.state.open.applog}});
    const h = <h3 onClick={onclick}>{this.state.open.applog ? '- Application Log' : '▼ Application Log'}</h3>;
    return (
      <div className="section">
        {h}
        {this.state.open.applog ? <div className="stdio">
          {this.state.job.applog.split('\n').map((line, i) => <p key={i} className="line">{line}</p>)}
        </div> : null}
      </div>
    );
  }
  _renderinspection() {
    const onclick = () => this.setState({open: {...this.state.open, inspection: !this.state.open.inspection}});
    const h = <h3 onClick={onclick}>{this.state.open.inspection ? '- Job inspection' : '▼ Job inspection'}</h3>;
    return (
      <div className="section">
        {h}
        {this.state.open.inspection ? <code className="inspect"><pre>{JSON.stringify(this.state.job, null, 2)}</pre></code> : null}
      </div>
    );
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
