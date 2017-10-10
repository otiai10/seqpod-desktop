import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AddedWorkflows extends Component {
  render() {
    if (this.props.workflows.length == 0) return <div><span>N/A</span></div>;
    return (
      <div>
        <table>
          <tbody>
            {this.props.workflows.map(wf => {
              return <tr key={wf._id}><td>{wf._id}</td></tr>;
            })}
          </tbody>
        </table>
      </div>
    );
  }
  static propTypes = {
    workflows: PropTypes.array.isRequired,
  }
}
