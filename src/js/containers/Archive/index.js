import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Models
import Job from '../../models/Job';

// Components
import {StatusBadge} from './StatusLabel';

export default class Archive extends Component {
  render() {
    return (
      <ul className="list-group">
        {Job.list().map(job => {
          return (
            <li className="list-group-item" key={job._id}
              onClick={() => this.context.router.history.push(`/archive/${job._id}`)}
            >
              <div className="media-object pull-left">
                <StatusBadge status={job.status} />
              </div>
              <div className="media-body">
                <strong>
                  {new Date(job.created_at).toLocaleString()}
                </strong>
                <p>{job._id}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
  static contextTypes = {
    router: PropTypes.object
  }
}
