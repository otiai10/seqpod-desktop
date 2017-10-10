import React, {Component} from 'react';
import PropTypes from 'prop-types';

const {shell} = require('electron');
// shell.openExternal('https://github.com')

export default class Workflow extends Component {
  render() {
    return (
      <div className="workflow">
        <div>
          <h2>{this.props.self.name}</h2>
        </div>
        <div>
          <blockquote>{this.props.self.introduction}</blockquote>
        </div>
        <div>
          <span>by {this.props.self.author}</span>
        </div>
        <div>
          <span>from</span>
          <ul>
            {this.props.self.registry.map((registry, i) => {
              return <li key={i}>{registry.service}: <a style={{color:'blue'}} onClick={() => shell.openExternal(registry.url)}>{registry.namespace}</a></li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
  static propTypes = {
    self: PropTypes.shape({
      name:         PropTypes.string.isRequired,
      introduction: PropTypes.string.isRequired,
      author:       PropTypes.string.isRequired,
      registry:     PropTypes.arrayOf(PropTypes.shape({

      })).isRequired,
    }).isRequired,
  }
}
