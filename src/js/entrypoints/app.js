// React
import React, {Component} from 'react';
import {render} from 'react-dom';

// Redux
import {Provider} from 'react-redux';
import store from '../store';

// Routings
import {HashRouter as Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {syncHistoryWithStore} from 'react-router-redux';

// Containers
import Sidebar from '../containers/Sidebar';
import Home    from '../containers/Home';
import Archive from '../containers/Archive';

// Application
class App extends Component {
  render() {
    return (
      <div className="window-content">
        <Provider store={store}>
          <Router hashType="noslash" history={syncHistoryWithStore(createBrowserHistory(), store)}>
            <div className="pane-group">
              <Sidebar />
              <div className="pane padded">
                <Route exact path="/"  component={Home} />
                <Route path="/archive" component={Archive} />
              </div>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}

// Entrypoint
render(<App />, document.querySelector('div#app'));
