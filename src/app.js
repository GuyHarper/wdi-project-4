import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main';

import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <div>
        <header>
        </header>
        <main>
          <Main />
        </main>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
