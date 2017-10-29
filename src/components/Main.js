import React from 'react';
import Axios from 'axios';
import Map from './Map';
import VoteShareChart from './VoteShareChart';
import SeatsDisplay from './SeatsDisplay';

class Main extends React.Component {
  state = {
    constituencies: [],
    totalSeats: []
  }

  componentWillMount() {
    Axios
      .get('/api/constituencies')
      .then(res => this.setState({ constituencies: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    if(this.state.constituencies.length > 0) {
      return (
        <section>
          <div>
            <Map constituencyData={this.state.constituencies} />
          </div>
          <div>
            <h1>2017 General Election</h1>
            <VoteShareChart constituencyData={this.state.constituencies} />
            <SeatsDisplay constituencyData={this.state.constituencies} />
          </div>
        </section>
      );
    } else return false;
  }
}

export default Main;
