import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {syncHistoryWithStore} from 'react-router-redux';

// Redux
import reducers from '../reducers';
const store = createStore(reducers);

// Containers
import Sidebar from '../containers/Sidebar';
import Home    from '../containers/Home';
import Archive from '../containers/Archive';

class App extends Component {
  render() {
    return (
      <div className="window-content">
        <Provider store={store}>
          <Router hashType="noslash" history={syncHistoryWithStore(createBrowserHistory(), store)}>
            <div className="pane-group">
              <Sidebar />
              <div className="pane padded">
                <Route exact path="/" component={Home} />
                <Route path="/archive"    component={Archive} />
              </div>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}


render(
  <App />,
  document.querySelector('div#app')
);
