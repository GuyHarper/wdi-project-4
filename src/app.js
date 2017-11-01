import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import ProjectionsNew from './components/projections/ProjectionsNew';
import ProjectionsIndex from './components/projections/ProjectionsIndex';
import ProjectionsShow from './components/projections/ProjectionsShow';
import ProjectionsEdit from './components/projections/ProjectionsEdit';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/utility/Navbar';

import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <header>
            <Navbar />
          </header>
          <main className="container-fluid">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route path="/new" component={ProjectionsNew} />
              <Route exact path="/projections" component={ProjectionsIndex} />
              <Route path="/projections/:id" component={ProjectionsShow} />
              <Route path="/projections/:id/edit" component={ProjectionsEdit} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
