import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import humanize from 'humanize-plus';

import {cancelFastqFile} from '../../actions/form';

@connect(null, {
  cancelFastqFile,
})
export default class AcceptedFastqFile extends Component {
  render() {
    const file = this.props.file;
    return (
      <div className="accepted-fastq">
        <div className="fastq-cancel" onClick={this.onClickCancel.bind(this)}>
          <span className="icon icon-cancel" />
        </div>
        <div className="fastq-icon">
          <span className="icon icon-attach" />
        </div>
        <div className="fastq-info">
          <h2>{file.name}</h2>
          <table className="dl-horizontal">
            <tbody>
              <tr><th>Path:</th><td>{file.path}</td></tr>
              <tr><th>Size:</th><td>{humanize.fileSize(file.size)}</td></tr>
              <tr><th>Last modified:</th><td>{new Date(file.lastModified).toLocaleString()}</td></tr>
            </tbody>
          </table>
        </div>
        <div className="fastq-action">
        </div>
      </div>
    );
  }

  onClickCancel(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.props.cancelFastqFile(this.props.file);
  }

  static propTypes = {
    file: PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
      lastModified: PropTypes.number.isRequired,
    }).isRequired,
    cancelFastqFile: PropTypes.func.isRequired,
  }
}
