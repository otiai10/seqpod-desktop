import React, {Component} from 'react';

import SelectWorkflow from '../../components/forms/SelectWorkflow';
import FastqDrop      from '../../components/forms/FastqDrop';
import InputsParams   from '../../components/forms/InputsParams';

import Workflow from '../../models/Workflow';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      workflow: null,
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
      return <InputsParams workflow={this.state.workflow}/>;
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
}
