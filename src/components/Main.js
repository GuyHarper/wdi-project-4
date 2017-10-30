import React from 'react';
import Axios from 'axios';
import Map from './Map';
import VoteShareChart from './VoteShareChart';
import SeatsDisplay from './SeatsDisplay';
import ModifiersDisplay from './ModifiersDisplay';

class Main extends React.Component {
  state = {
    constituencies: [],
    modifiedConstituencies: [],
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
      { sf: 0 },
      { sdlp: 0 },
      { uup: 0 },
      { alliance: 0 }
    ],
    modifiedVoteShare: [],
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
    ],
    modifiedTotalSeats: [],
    modifiers: {
      swings: []
    }
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
    const validTotal = this.state.constituencies.reduce((sum, constituency) => {
      return sum + constituency['totalValidVotes2017'];
    }, 0);
    partyCodes2017.forEach((partyCode2017) => {
      const partyTotal = this.state.constituencies.reduce((sum, constituency) => {
        return sum + constituency[partyCode2017];
      }, 0);
      const partyShare = partyTotal / validTotal;
      partyResults.push({
        [partyCode2017.substr(0, (partyCode2017.length - 4))]: partyShare
      });
    });
    this.setState({ voteShare: partyResults });
  }

  setModifier = (object) => {
    const swings = [...this.state.modifiers.swings];
    swings.push(object);
    this.setState({ modifiers: { swings: swings}}, () => this.applyModifiers());
  }

  applyModifiers = () => {
    if(this.state.modifiers.swings.length > 0) {
      let modifiedVoteShare = [...this.state.voteShare];
      this.state.modifiers.swings.forEach((swing) => {
        const from = this.state.voteShare.find((e) => {
          return Object.keys(e)[0] === swing.from;
        });
        const to = this.state.voteShare.find((e) => {
          return Object.keys(e)[0] === swing.to;
        });
        const newVoteShareFrom = {[swing.from]: (from[swing.from] - swing.amount / 100)};
        const newVoteShareTo = {[swing.to]: (to[swing.to] + swing.amount / 100)};
        modifiedVoteShare = modifiedVoteShare.filter((e) => {
          return Object.keys(e)[0] !== swing.from && Object.keys(e)[0] !== swing.to;
        });
        modifiedVoteShare.push(newVoteShareFrom, newVoteShareTo);
      });
      this.setState({ modifiedVoteShare: modifiedVoteShare });
    }
  }

  render() {
    if(this.state.constituencies.length > 0) {
      return (
        <section className="row">
          <div className="col-6">
            <Map constituencyData={this.state.constituencies} />
          </div>
          <div className="col-6">
            <h1>2017 General Election</h1>
            <VoteShareChart voteShare={this.state.voteShare} modifiers={this.state.modifiers} modifiedVoteShare={this.state.modifiedVoteShare}/>
            <ModifiersDisplay voteShare={this.state.voteShare} setModifier={this.setModifier}/>
            <SeatsDisplay constituencyData={this.state.constituencies} />
          </div>
        </section>
      );
    } else return false;
  }
}

export default Main;
