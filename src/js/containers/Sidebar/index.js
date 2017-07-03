import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import cn from 'classnames';

@connect(({routing}) => ({routing}), null)
export default class Sidebar extends Component {
  render() {
    const hash = this._getCurrentHash();
    return (
      <div className="pane-sm sidebar">
        <nav className="nav-group">
          <h5 className="nav-group-title">Application</h5>
          <Link to="/" className={cn('nav-group-item', {active: hash == ''})}>
            <span className="icon icon-plus" />
            <span>New</span>
          </Link>
          <Link to="/archive" className={cn('nav-group-item', {active: hash == 'archive'})}>
            <span className="icon icon-archive" />
            <span>History</span>
          </Link>
        </nav>
      </div>
    );
  }
  _getCurrentHash() {
    if (!this.props.routing.locationBeforeTransitions) return '';
    return this.props.routing.locationBeforeTransitions.hash.replace(/^#/, '');
  }
  static propTypes = {
    routing: PropTypes.object.isRequired,
  }
}
