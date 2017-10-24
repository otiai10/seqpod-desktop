import React, {Component} from 'react';
import PropTypes from 'prop-types';

import cn from 'classnames';

class FileInput extends Component {
  render() {
    const {form, name, description, required} = this.props;
    if (form.type == 'select') {
      return (
        <div className="file-input">
          <label><b>{name}</b> <span>{description}</span> {required ? <i>*required</i> : null}</label>
          <select className="form-control" name={name}>
            {form.options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
      );
    }
    return (
      <div className="form-group file-input">
        <label><b>{name}</b> <span>{description}</span> {required ? <i>*required</i> : null}</label>
        <input type="file" className="form-control" name={name} onChange={ev => this.props.onChange(ev, name)}/>
      </div>
    );
  }
  static propTypes = {
    description: PropTypes.string.isRequired,
    form:        PropTypes.object.isRequired,
    name:        PropTypes.string.isRequired,
    required:    PropTypes.bool,
    onChange:    PropTypes.func.isRequired,
  };
}

class Parameter extends Component {
  render() {
    const {form, name, description, default: def} = this.props;
    return (
      <div className="form-group">
        <label><b>{name}</b> <span>{description}</span></label>
        <input type={form.type} className="form-control" defaultValue={def} name={name} onChange={ev => this.props.onChange(ev, name)} />
      </div>
    );
  }
  static propTypes = {
    description: PropTypes.string.isRequired,
    form:        PropTypes.object.isRequired,
    name:        PropTypes.string.isRequired,
    onChange:    PropTypes.func.isRequired,
    default:     PropTypes.any.isRequired,
  }
}

export default class InputsParams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: this.props.workflow.inputs,
    };
  }
  render() {
    const {workflow:{self, inputs, parameters}} = this.props;
    return (
      <div className="padded-more">
        <p>
          <b>{self.name}</b> requires following inputs and parameters.
        </p>
        <div>
          <h3>Input files</h3>
          {Object.keys(inputs).map(key => <FileInput onChange={this.onInputChange.bind(this)} key={key} name={key} {...inputs[key]} />)}
        </div>
        <div>
          <h3>Parameters</h3>
          {this._renderParametersForm(parameters)}
        </div>
        <div>
          <button className="btn btn-default btn-large">← Back</button>
          <button
            className={cn('btn','btn-primary','btn-large','pull-right',{disabled:this.props.sending})}
            onClick={this.onSubmit.bind(this)}>Submit</button>
        </div>
      </div>
    );
  }
  _renderParametersForm(params) {
    if (Object.keys(params).length == 0) {
      return (
        <p>This workflow does not offer any configurable parameters.</p>
      );
    }
    return (
      <div>
        <p>Following parameters are configurable, but not necessary to be changed.</p>
        {Object.keys(params).map(name => <Parameter onChange={this.onParameterChange.bind(this)} key={name} name={name} {...params[name]} />)}
      </div>
    );
  }
  onInputChange(ev, name) {
    if (!ev.target.files.length) return;
    const inputs = {...this.state.inputs};
    inputs[name].file = ev.target.files[0];
    this.setState({inputs});
  }
  onParameterChange(ev, name) {
    this.props.setParameter(name, ev.target.value);
  }
  onSubmit() {
    this.props.onSubmit({inputs: this.state.inputs});
  }
  static propTypes = {
    sending:      PropTypes.bool,
    workflow:     PropTypes.object.isRequired,
    onSubmit:     PropTypes.func.isRequired,
    setParameter: PropTypes.func.isRequired,
  }
}
