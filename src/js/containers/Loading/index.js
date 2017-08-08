import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cn from 'classnames';

@connect(({api}) => api)
export default class Loading extends Component {
  render() {
    const {requests} = this.props;
    return (
      <div id="loading-indicator-container" className={cn({loading:Object.keys(requests).length > 0})}>
        {Object.keys(requests).map(id => {
          const progress = requests[id].loaded / requests[id].total;
          return <div key={id} className="loading-indicator" style={{width: `${progress * 100}%`}} />;
        })}
      </div>
    );
  }
  static propTypes = {
    requests: PropTypes.object.isRequired,
  }
}
