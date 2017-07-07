import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Models
import Job from '../../models/Job';

// Components
import StatusLabel from './StatusLabel';

export default class Archive extends Component {
  render() {
    return (
      <div>
        <h1>Job History</h1>
        <table className="table-striped">
          <thead>
            <tr><th>ID</th><th>Created</th><th>Status</th></tr>
          </thead>
          <tbody>
            {Job.list().map(job => {
              return (
                <tr key={job._id}
                  onClick={() => this.context.router.history.push(`/archive/${job._id}`)}
                >
                  <td>{job._id}</td>
                  <td>{new Date(job.created_at).toLocaleString()}</td>
                  <td><StatusLabel job={job} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  static contextTypes = {
    router: PropTypes.object
  }
}
