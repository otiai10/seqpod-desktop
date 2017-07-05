import React, {Component} from 'react';

import DropArea from './DropArea';
import Actions from './Actions';

export default class FastqDrop extends Component {
  render() {
    return (
      <div className="fastq-drop">
        <DropArea />
        <Actions />
      </div>
    );
  }
}
