import React, {Component} from 'react';

export default class DropArea extends Component {
  render() {
    return (
      <div className="drop-area">
        <div className="drop-border"
          onClick={this._onClick.bind(this)}
        >
          <div>
            <span>Drop or select you read files</span>
          </div>
          <span className="icon icon-inbox" />
        </div>
        <input type="file" style={{display:'none'}} ref={ref => this.file = ref}/>
      </div>
    );
  }
  _onClick(ev) {
    ev.stopPropagation();
    this._invoke_fileClick().then(res => {
      console.log('FINALLY', res);
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
    console.log('EXTRACT File here', ev);
    resolve(true);
  }
}
