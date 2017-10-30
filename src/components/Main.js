import React from 'react';
import Axios from 'axios';
import Map from './Map';
import VoteShareChart from './VoteShareChart';
import SeatsDisplay from './SeatsDisplay';
import ModifiersDisplay from './ModifiersDisplay';

class Main extends React.Component {
  state = {
    constituencies: [],
    voteShare: {
      con: 0,
      lab: 0,
      ld: 0,
      snp: 0,
      ukip: 0,
      green: 0,
      dup: 0,
      sf: 0,
      pc: 0,
      sdlp: 0,
      uup: 0,
      alliance: 0,
      other: 0
    },
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
    },
    changedVoteSharePercentages: {}
  }

  componentWillMount() {
    Axios
      .get('/api/constituencies')
      .then(res => this.setState({ constituencies: res.data }, () => this.getVoteShare()))
      .catch(err => console.log(err));
  }

  getVoteShare() {
    const partyCodes = Object.keys(this.state.voteShare);
    const partyResults = {};
    const validTotal = this.state.constituencies.reduce((sum, constituency) => {
      return sum + constituency['totalValidVotes2017'];
    }, 0);
    partyCodes.forEach((partyCode) => {
      const partyCode2017 = partyCode.concat('2017');
      const partyTotal = this.state.constituencies.reduce((sum, constituency) => {
        return sum + constituency[partyCode2017];
      }, 0);
      const partyShare = partyTotal / validTotal;
      partyResults[partyCode] = partyShare;
    });
    this.setState({ voteShare: partyResults });
  }

  setModifier = (object) => {
    const swings = [...this.state.modifiers.swings];
    swings.push(object);
    this.setState({ modifiers: { swings: swings}}, () => {
      this.applyModifiersToVoteShare();
    });
  }

  applyModifiersToVoteShare = () => {
    if(this.state.modifiers.swings.length > 0) {
      const changedVoteShareArray = [];
      const changedVoteSharePercentages = {};
      const modifiedVoteShare = {...this.state.voteShare};
      this.state.modifiers.swings.forEach((swing) => {
        modifiedVoteShare[swing.from] = (this.state.voteShare[swing.from] - swing.amount / 100);
        modifiedVoteShare[swing.to] = (this.state.voteShare[swing.to] + swing.amount / 100);
        if(changedVoteShareArray.indexOf(swing.from) === -1) changedVoteShareArray.push(swing.from);
        if(changedVoteShareArray.indexOf(swing.to) === -1) changedVoteShareArray.push(swing.to);
      });
      changedVoteShareArray.forEach((party) => {
        changedVoteSharePercentages[party] = (modifiedVoteShare[party] - this.state.voteShare[party])  / this.state.voteShare[party];
      });
      this.setState({ modifiedVoteShare: modifiedVoteShare, changedVoteSharePercentages: changedVoteSharePercentages }, () => this.applyModifiersToConstituencyData());
    }
  }

  applyModifiersToConstituencyData = () => {
    if(this.state.modifiers.swings.length > 0) {
      const constituencies = [...this.state.constituencies];
      Object.keys(this.state.changedVoteSharePercentages).forEach((partyCode) => {
        constituencies.map((constituency) => {
          const newVote = parseInt(constituency[partyCode.concat('2017')] * (1 + this.state.changedVoteSharePercentages[partyCode]));
          constituency[partyCode] = newVote;
          if(constituency.winner2017 !== partyCode && newVote > constituency[(constituency.winner2017).concat('2017')]) constituency.winner = partyCode;
        });
      });
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
