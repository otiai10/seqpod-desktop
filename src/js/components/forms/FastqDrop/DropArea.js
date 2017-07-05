import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// Components
import AcceptedFastqFile from '../../files/AcceptedFastqFile';

// Actions
import {addFastqFile} from '../../../actions/form';

@connect(({form}) => ({form}), {
  addFastqFile,
})
export default class DropArea extends Component {

  render() {
    return (
      <div className="drop-area">
        {this._render_AcceptedFiles()}
        {this._render_DropBorder()}
        <input type="file" style={{display:'none'}} ref={ref => this.file = ref}/>
      </div>
    );
  }
  _render_AcceptedFiles() {
    const {files} = this.props.form.target;
    return (
      <div>
        {files.map(f => <AcceptedFastqFile
          key={f.name} file={f}
        />)}
      </div>
    );
  }
  _render_DropBorder() {
    if (this.props.form.target.files.length > 1) return null;
    return (
      <div className="drop-border"
        onClick={this._onClick.bind(this)}
        onDrop={this._onDrop.bind(this)}
      >
        <div>
          <span>Drop or select your read files</span>
        </div>
        <span className="icon icon-inbox" />
      </div>
    );
  }

  _onDrop(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    const {files} = ev.dataTransfer;
    if (!files.length) return;
    this._handle_fileObject(files[0]);
  }
  _onClick(ev) {
    ev.stopPropagation();
    this._invoke_fileClick().then(f => {
      this._handle_fileObject(f);
    });
  }
  _invoke_fileClick() {
    this.file.removeEventListener('change', this._cb_fileOnChange, false);
    const p = new Promise((resolve, reject) => {
      this.file.addEventListener('change', this._cb_fileOnChange.bind(this, resolve, reject));
    });
    this.file.click();
    return p;
  }
  _cb_fileOnChange(resolve, reject, ev) {
    const {files} = ev.target;
    if (!files.length) return reject();
    resolve(files[0]);
  }
  _handle_fileObject(file) {
    // TODO: Validate here
    this.props.addFastqFile(file);
  }
  static propTypes = {
    form: PropTypes.object.isRequired,
    addFastqFile: PropTypes.func.isRequired,
  }
}
