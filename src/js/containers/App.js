import React, {Component} from 'react';

export default class App extends Component {
  render() {
    return (
      <div className="window-content">
        <div className="pane-group">
          <div className="pane-mini sidebar padded-more">
            <span>Bar!</span>
          </div>
          <div className="pane padded-more">
            <span>Hey!</span>
          </div>
        </div>
      </div>
    );
  }
}
