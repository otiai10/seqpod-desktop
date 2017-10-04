import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import SectionTable from '../../components/table/SectionTable';
import {StatusBadge} from './StatusLabel';

import Job from '../../models/Job';

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
      Job.find(job._id).update(job);
      if (!job.finished_at) setTimeout(() => this._fetchJob(), 4000);
    });
  }
  render() {
    if (this.state.job == null) return null;
    const job = this.state.job;
    return (
      <div className="padded job-detail container">
        <div className="row overview">
          <StatusBadge status={job.status} />
          <div>
            <h1>{job._id}</h1>
            <span>Created: {new Date(job.created_at).toLocaleString()}</span>
          </div>
        </div>

        <SectionTable
          title="General"
          rows={[
            {label:'Workflow',  data: `${job.workflow.join(' -> ')}`},
            {label:'Reference', data: 'GRCh37 (default)'},
            {label:'Inputs',    data: job.resource.reads.join(',')},
            {label:'Created',   data: (new Date(job.created_at).toLocaleString())},
            {label:'Started',   data: (new Date(job.started_at).toLocaleString())},
            {label:'Finished',  data: (new Date(job.finished_at).toLocaleString())},
            {label:'Status',    data: job.status},
          ]}
          open={true}
        />

        {(job.errors.length) ? (
          <SectionTable
            title="Errors"
            content={this._renderErrors()}
            fullWidth={true}
            open={true}
          />
        ) : null}

        <SectionTable
          title="Results"
          rows={this.state.job.results.map(result => {
            const url = `${process.env.API_URL}/v0/jobs/${this.state.job._id}/results/${result}`;
            return {
              label: result,
              data: (
                <div className="result-action">
                  <div><span className="icon icon-download" onClick={() => this._saveResultFile(url, result)}></span></div>
                  <div><span className="icon icon-upload-cloud"></span></div>
                  <div><span className="icon icon-eye"></span></div>
                </div>
              ),
            };
          })}
          open={this.state.job.results.length}
        />

        <SectionTable
          title="Stdout log"
          content={this._renderStdOut()}
          fullWidth={true}
        />

        <SectionTable
          title="Stderr log"
          content={this._renderStdErr()}
          fullWidth={true}
        />

        <SectionTable
          title="Application log"
          content={this._renderAppLog()}
          fullWidth={true}
        />

        <SectionTable
          title="Inspection"
          content={this._renderinspection()}
          fullWidth={true}
        />

      </div>
    );
  }
  _saveResultFile(url, name) {
    const request = require('request');
    request(url, {encoding:'binary'}, (err, res, body) => {
      const remote = require('electron').remote;
      remote.dialog.showSaveDialog({defaultPath: name}, fpath => {
        if (!fpath) return;
        const fs = require('fs');
        fs.writeFile(fpath, body, 'binary', () => {});
      });
    });
  }
  _renderErrors() {
    return <div className="job-errors">
      {this.state.job.errors.map((err, i) => <blockquote key={i} className="error-content">{err}</blockquote>)}
    </div>;
  }
  _renderStdOut() {
    return <div className="stdio">
      {this.state.job.stdout.split('\n').map((line, i) => <p key={i} className="line">{line}</p>)}
    </div>;
  }
  _renderStdErr() {
    return <div className="stdio">
      {this.state.job.stderr.split('\n').map((line, i) => <p key={i} className="line">{line}</p>)}
    </div>;
  }
  _renderAppLog() {
    return <div className="stdio">
      {this.state.job.applog.split('\n').map((line, i) => <p key={i} className="line">{line}</p>)}
    </div>;
  }
  _renderinspection() {
    return <code className="inspect"><pre>{JSON.stringify(this.state.job, null, 2)}</pre></code>;
  }
  _getErrors() {
    return this.state.job.errors.map(err => <code key={err}>{err}</code>);
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
