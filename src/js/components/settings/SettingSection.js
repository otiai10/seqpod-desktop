import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

export default class SettingSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible || false,
    };
  }
  render() {
    return (
      <section className="setting">
        <div className="setting-section-title" onClick={() => this.setState({visible: !this.state.visible})}>
          <div className={cn('arrow', {visible: this.state.visible})}><i className="icon icon-play" /></div>
          <div className="setting-title"><h2>{this.props.title}</h2></div>
        </div>
        <div className={cn('setting-section-content', {visible: this.state.visible})}>
          {this.props.children}
        </div>
      </section>
    );
  }
  static propTypes = {
    title:    PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    visible:  PropTypes.bool,
  }
}
