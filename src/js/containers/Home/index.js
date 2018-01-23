/* eslint no-console:0 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import SelectWorkflow from '../../components/forms/SelectWorkflow';
import InputsParams   from '../../components/forms/InputsParams';

import Workflow from '../../models/Workflow';
import Job      from '../../models/Job';

// Actions
import {
  api_workspace,
  api_upload,
  api_ready_job,
} from '../../actions/api';


@connect(null, {
  api_workspace,
  api_upload,
  api_ready_job,
})
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step:         0,
      workflow:  null,
      sending:  false,
    };
  }
  render() {
    return (
      <div className="container layout-vertical">
        {this.getComponentForStep()}
      </div>
    );
  }
  getComponentForStep() {
    const workflows = Workflow.list();
    if (!workflows.length) return this._renderAlertForWorkflowEmpty();
    switch (this.state.step) {
    case 1:
      return <InputsParams
        workflow={this.state.workflow}
        sending={this.state.sending}
        setParameter={this.setParameter.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
      />;
    case 0:
    default:
      return <SelectWorkflow
        workflows={workflows}
        commitWorkflow={this.commitWorkflow.bind(this)}
      />;
    }
  }
  commitWorkflow(workflow) {
    this.setState({workflow, step:1});
  }
  setParameter(key, value) {
    const parameters = this.state.workflow.parameters || {};
    this.setState({
      workflow: this.state.workflow.update({parameters:{
        ...parameters,
        [key]: {
          ...parameters[key],
          value,
        }
      }})
    });
  }
  _renderAlertForWorkflowEmpty() {
    return (
      <div className="padded-more">
        <p>No any workflow found on local.</p>
        <p>👉 Go and register workflow!</p>
      </div>
    );
  }
  onSubmit({inputs}) {
    this.setState({sending:true});
    // ev.stopPropagation();
    // ev.preventDefault();
    const wf = this.state.workflow;
    var job = {};
    this.props.api_workspace(wf)
      .then(({job:_j}) => {
        job = _j;
        this.setState({job});
        job.status = 'uploading'; // TODO: should be set by server
        Job.create(job);
        // FIXME: It's not good to move job detail here to handle HTTP errors.
        this.context.router.history.push(`/archive/${job._id}`);
        const entries = Object.keys(inputs).map(name => (inputs[name].file instanceof File) ? {file: inputs[name].file, name: name} : null).filter(entry => entry != null);
        return Promise.all(
          entries.map(entry => this.props.api_upload(job, entry.file, entry.name))
        ).then(() => this.props.api_ready_job(job._id));
      })
      .catch(err => {
        console.log('#2001 [ERROR]', err);
        this.setState({sending:false});
        // window.alert(JSON.stringify(err));
        // Job.find(this.state.job._id).update({
        //   finished_at: Date.now(),
        //   status: 'error',
        //   errors: ['#2001 [CLIENT ERROR]']
        // });
      });
  }

  static propTypes = {
    api_workspace: PropTypes.func.isRequired,
    api_upload:    PropTypes.func.isRequired,
    api_ready_job: PropTypes.func.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object
  }
}
