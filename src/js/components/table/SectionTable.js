import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

export default class SectionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    };
  }
  render() {
    return (
      <table className="section-table">
        <thead>
          <tr onClick={() => this.setState({open: !this.state.open})}>
            <th className="section-toggle">
              <span className={cn('icon','icon-play',{open:this.state.open})}/>
            </th>
            <th className="section-title">{this.props.title}:</th>
            <td>{/* */}</td>
          </tr>
        </thead>
        <tbody style={{display: this.state.open ? '' : 'none'}}>
          {this.props.content ? this._renderContent() : this.props.rows.map(this._renderRowForIndex.bind(this))}
        </tbody>
      </table>
    );
  }
  _renderContent() {
    return (
      <tr className="section-row">
        <td>{/* */}</td>
        <td colSpan={2}>
          <div className="section-content">{this.props.content}</div>
        </td>
      </tr>
    );

  }
  _renderRowForIndex(row, i) {
    return (
      <tr className="section-row" key={i}>
        <td>{/* */}</td>
        <th className="row-label">{row.label}:</th>
        <td className="row-data">{row.data}</td>
      </tr>
    );
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    rows:  PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      data:  PropTypes.node.isRequired,
    })),
    content: PropTypes.node,
    open:  PropTypes.bool,
  }
  static defaultProps = {
    open: false,
    rows: [],
    content: null,
  }
}
