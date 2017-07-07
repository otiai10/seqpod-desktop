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
          <Link to="/archive" className={cn('nav-group-item', {active: hash.match(/^archive/)})}>
            <span className="icon icon-archive" />
            <span>History</span>
          </Link>
          <h5 className="nav-group-title">Others</h5>
          <Link to="/settings" className={cn('nav-group-item', {active: hash == 'settings'})}>
            <span className="icon icon-cog" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    );
  }
  _getCurrentHash() {
    return this.context.router.route.location.pathname.replace(/^\//, '');
  }
  static propTypes = {
    routing: PropTypes.object.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object
  }
}
