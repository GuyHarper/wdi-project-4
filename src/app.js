import React from 'react';
import ReactDOM from 'react-dom';

import Map from './components/Map';

import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <Map />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
