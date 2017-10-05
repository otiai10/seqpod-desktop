import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class SettingRow extends Component {
  render() {
    return (
      <div className="setting-row">
        <div className="setting-row-title">
          <h3>{this.props.title}</h3>
        </div>
        <div className="setting-row-content">
          {this.props.children}
        </div>
      </div>
    );
  }
  static propTypes = {
    title:    PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }
}
