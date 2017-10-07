import React, {Component} from 'react';

import FastqDrop from '../components/forms/FastqDrop';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }
  render() {
    return (
      <div className="container layout-vertical">
        {this.getComponentForStep()}
      </div>
    );
  }
  getComponentForStep() {
    switch (this.state.step) {
    default: return <FastqDrop />;
    }
  }
}
