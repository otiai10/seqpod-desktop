import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {statusAPI} from '../actions/api';

@connect(null, {
  statusAPI,
})
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server: {},
    };
  }
  componentDidMount() {
    this.props.statusAPI().then(server => this.setState({server}));
  }
  render() {
    return(
      <div>
        <section>
          <h2>advanced</h2>
          <ul>
            <li>API Version: {this.state.server.version}</li>
          </ul>
        </section>
      </div>
    );
  }
  static propTypes = {
    statusAPI: PropTypes.func.isRequired,
  }
}
