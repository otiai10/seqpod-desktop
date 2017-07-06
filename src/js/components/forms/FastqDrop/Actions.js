import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cn from 'classnames';

@connect(({form}) => form)
export default class Actions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sending: false,
    };
  }
  render() {
    const {files} = this.props.target;
    // TODO: more validation (But not here)
    const valid = files.length > 1;
    return (
      <div className="action-area">
        <div className="message">
        </div>
        <div className="buttons">
          <button
            className={cn('btn btn-large', (!valid || this.state.sending) ? 'btn-default' : 'btn-primary')}
            disabled={!valid || this.state.sending}
            onClick={this.onClickCommit.bind(this)}
          >Start</button>
        </div>
      </div>
    );
  }
  onClickCommit(ev) {
    this.setState({sending:true});
    ev.stopPropagation();
    ev.preventDefault();
  }
  static propTypes = {
    target: PropTypes.shape({
      files: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
  }
}
