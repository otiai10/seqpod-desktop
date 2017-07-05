import React, {Component} from 'react';

import FastqDrop from '../components/forms/FastqDrop';

export default class Home extends Component {
  render() {
    return (
      <div className="container layout-vertical">
        <FastqDrop />
      </div>
    );
  }
}
