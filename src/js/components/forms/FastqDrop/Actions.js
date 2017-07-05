import React, {Component} from 'react';

export default class Actions extends Component {
  render() {
    return (
      <div className="action-area">
        <div className="message">
        </div>
        <div className="buttons">
          <button className="btn normal" disabled>Start</button>
        </div>
      </div>
    );
  }
}
