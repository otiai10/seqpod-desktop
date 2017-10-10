import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import yaml from 'js-yaml';

import WorkflowView from '../../components/workflow';
import Workflow     from '../../models/Workflow';

export default class AddNewWorkflow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // repository: 'https://github.com/otiai10/genomon-fisher',
      repository: '',
      dialog:     {},
      error:      '',
    };
  }
  render() {
    return (
      <div>
        <div className="form-group">
          <input
            type="url" className="form-control" placeholder="URL of GitHub repository"
            onChange={ev => this.setState({repository: ev.target.value})}
            value={this.state.repository}
          />
        </div>
        <div className="form-group">
          <p className="setting-description">
            You can add new workflow uploaded on
            both GitHub (<code className="code">git push</code>)
            and Docker Hub (<code className="code">docker push</code>),
            by specifying GitHub repository which has <code className="code">pod-interface.(yaml|json)</code> on
            top level directory of that repository.
          </p>
          <p className="setting-error">
            {this.state.error}
          </p>
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary pull-right"
            onClick={this._fetchRepositoryInterface.bind(this)}
          >Add</button>
        </div>
        <dialog ref={dialog => this.dialog = dialog}>
          <header className="toolbar toolbar-header">
            <h1 className="title">{this.state.dialog.title}</h1>
          </header>
          <div style={{padding:'40px'}}>
            {this.state.dialog.content}
          </div>
          <footer className="toolbar toolbar-footer">
            <div className="toolbar-actions">
              {typeof this.state.dialog.onCancel == 'function' ?
                <button id="cancel" className="btn btn-default"
                  onClick={this.state.dialog.onCancel}>Cancel</button>
                : null
              }
              {typeof this.state.dialog.onOK == 'function' ?
                <button id="save" className="btn btn-primary pull-right"
                  onClick={this.state.dialog.onOK}>OK</button>
                : null
              }
            </div>
          </footer>
        </dialog>
      </div>
    );
  }
  _fetchRepositoryInterface() {
    this.setState({error:''});
    (new Promise(resolve => {
      const repo = `https://raw.githubusercontent.com${(new URL(this.state.repository)).pathname}`;
      resolve(repo);
    }))
      .then(repo => {
        // FIXME: Use GitHub API. This should be one or exactly two requests.
        return Promise.all([
          fetch(repo + '/master/interface.yaml'),
          fetch(repo + '/master/interface.json'),
          fetch(repo + '/master/pod-interface.yaml'),
          fetch(repo + '/master/pod-interface.json'),
        ]);
      })
      .then(responses => Promise.resolve(responses.filter(r => r.status == 200)))
      .then(successes => {
        if (successes.length == 0) return Promise.reject(new Error('No interface files found on this repository'));
        return successes[0].text().then(raw => ({raw, ext:successes[0].url.split('.').pop().replace('a', '')}));
      })
      .then(({raw, ext}) => Promise.resolve(ext == 'json' ? JSON.parse(raw) : yaml.safeLoad(raw)))
      .then(doc => doc.self ? Promise.resolve(doc) : Promise.reject(new Error('This interface.yaml doesn\'t have `self` field.')))
      .then(doc => {
        this._showDialog({
          title:    'Add this workflow to local registry?',
          content:  <div><WorkflowView {...doc} /></div>,
          onCancel: () => this._removeDialog(),
          onOK:     () => this._removeDialog() && this._saveWorkflow(doc),
        });
      }).catch(err => this.setState({error: err.message}));
  }
  _showDialog(dialog) {
    this.setState({dialog}, () => this.dialog.showModal());
  }
  _removeDialog() {
    this.setState({dialog:{}}, () => this.dialog.close());
    return true;
  }
  _saveWorkflow(workflow) {
    let w = Workflow.new(workflow);
    w._id = workflow.self.name;
    console.log('SAVE THIS', w.save(), workflow);
  }
}
