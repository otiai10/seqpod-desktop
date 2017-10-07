import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import SelectWorkflow from '../../components/forms/SelectWorkflow';
// import FastqDrop      from '../../components/forms/FastqDrop';
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
      return <InputsParams workflow={this.state.workflow} sending={this.state.sending} onSubmit={this.onSubmit.bind(this)}/>;
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
    let files = [];
    Object.keys(inputs).map(name => {
      if (inputs[name].file instanceof File) files.push(inputs[name].file);
    });
    this.props.api_workspace().then(({job}) => {
      Job.create(job);
      this.context.router.history.push(`/archive/${job._id}`);
      return Promise.all([
        Promise.resolve(job),
        this.props.api_upload(job, files[0]),
        this.props.api_upload(job, files[1]),
      ]);
    }).then(([job]) => {
      this.props.api_ready_job(job._id);
    }).catch(err => {
      this.setState({sending:false});
      console.log('NG!', err);
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
