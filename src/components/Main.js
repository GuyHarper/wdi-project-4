import React from 'react';
import Axios from 'axios';
import Map from './Map';
import VoteShareChart from './VoteShareChart';
import SeatsDisplay from './SeatsDisplay';

class Main extends React.Component {
  state = {
    constituencies: [],
    voteShare: [
      { lab: 0 },
      { con: 0 },
      { ld: 0 },
      { snp: 0 },
      { pc: 0 },
      { green: 0 },
      { ukip: 0 },
      { other: 0 },
      { dup: 0 },
      { sf: 0 }
    ],
    totalSeats: [
      { lab: 0 },
      { con: 0 },
      { ld: 0 },
      { snp: 0 },
      { pc: 0 },
      { green: 0 },
      { ukip: 0 },
      { other: 0 },
      { dup: 0 },
      { sf: 0 }
    ]
  }

  componentWillMount() {
    Axios
      .get('/api/constituencies')
      .then(res => this.setState({ constituencies: res.data }, () => this.getVoteShare()))
      .catch(err => console.log(err));
  }

  getVoteShare() {
    const partyCodes = this.state.voteShare.map((e) => Object.keys(e)[0]);
    const partyCodes2017 = partyCodes.map((e) => e.concat('2017'));
    const partyResults = [];
    partyCodes2017.forEach((party) => {
      const partyResult = this.state.constituencies.reduce((sum, constituency) => {
        return sum + constituency[party];
      }, 0);
      partyResults.push({
        [party]: partyResult
      });
    });
    this.setState({ voteShare: partyResults });
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
            <VoteShareChart constituencyData={this.state.voteShare} />
            <SeatsDisplay constituencyData={this.state.constituencies} />
          </div>
        </section>
      );
    } else return false;
  }
}

export default Main;
