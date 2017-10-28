import React from 'react';
import Axios from 'axios';
import Map from './Map';

class Main extends React.Component {
  state = {
    constituencies: []
  }

  componentWillMount() {
    Axios
      .get('/api/constituencies')
      .then(res => this.setState({ constituencies: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

export default Main;
