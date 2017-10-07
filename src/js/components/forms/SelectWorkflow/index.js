import React, {Component} from 'react';
import PropTypes from 'prop-types';

import WorkflowView from '../../workflow';

export default class SelectWorkflow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.workflows[0],
    };
  }
  render() {
    const {selected} = this.state;
    const {workflows} = this.props;
    return (
      <div className="padded-more">
        <p>Select workflow you want to execute.</p>
        <select className="form-control" value={selected._id} onChange={ev => {
          const selected = workflows.filter(wf => wf._id == ev.target.value).pop();
          this.setState({selected});
        }}>
          {workflows.map(wf => <option key={wf._id} value={wf._id}>{wf._id}</option>)}
        </select>
        <WorkflowView {...selected} />
        <button
          className="btn btn-primary btn-large pull-right"
          onClick={() => this.props.commitWorkflow(this.state.selected)}
        >→ Next: inputs &amp; parameters</button>
      </div>
    );
  }
  static propTypes = {
    workflows: PropTypes.array.isRequired,
    commitWorkflow: PropTypes.func.isRequired,
  }
}
