import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {api_status} from '../actions/api';

@connect(null, {
  api_status,
})
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server: {},
    };
  }
  componentDidMount() {
    this.props.api_status().then(server => this.setState({server}));
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
    api_status: PropTypes.func.isRequired,
  }
}
