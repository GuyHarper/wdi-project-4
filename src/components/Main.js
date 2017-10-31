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
    }
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
    const swings = this.state.modifiers.swings.filter((swing) => {
      const partyArray = [swing.from, swing.to];
      return !(partyArray.indexOf(object.from) !== -1 && partyArray.indexOf(object.to) !== -1 );
    });
    swings.push(object);
    this.setState({ modifiers: { swings: swings}}, () => {
      this.applyModifiersToVoteShare();
    });
  }

  applyModifiersToVoteShare = () => {
    if(this.state.modifiers.swings.length > 0) {
      const modifiedVoteShare = {...this.state.voteShare};
      this.state.modifiers.swings.forEach((swing) => {
        modifiedVoteShare[swing.from] = (this.state.voteShare[swing.from] - swing.amount / 100);
        modifiedVoteShare[swing.to] = (this.state.voteShare[swing.to] + swing.amount / 100);
      });
      this.setState({ modifiedVoteShare: modifiedVoteShare }, () => this.resetConstituencyData());
    }
  }

  resetConstituencyData = () => {
    const constituencies = [...this.state.constituencies];
    const partyCodes = Object.keys(this.state.voteShare);
    constituencies.forEach((constituency) => {
      partyCodes.forEach((partyCode) => {
        delete constituency[partyCode];
      });
      delete constituency.winner;
    });
    this.setState({ constituencies: constituencies}, () => this.applyModifiersToConstituencyData());
  }

  applyModifiersToConstituencyData = () => {
    if(this.state.modifiers.swings.length > 0) {
      const constituencies = [...this.state.constituencies];
      this.state.modifiers.swings.forEach((swing) => {
        const percentageSwing = (swing.amount / 100) / this.state.voteShare[swing.from];
        constituencies.map((constituency) => {
          const votesSwing = parseInt(constituency[(swing.from).concat('2017')] * percentageSwing);
          let oldFrom = '';
          let oldTo = '';
          constituency[swing.from] ? oldFrom = swing.from : oldFrom = (swing.from).concat('2017');
          constituency[swing.to] ? oldTo = swing.to : oldTo = (swing.to).concat('2017');
          const newFrom = constituency[oldFrom] - votesSwing;
          const newTo = constituency[oldTo] + votesSwing;
          constituency[swing.from] = newFrom;
          constituency[swing.to] = newTo;
          if(!constituency.winner) {
            if(newTo > constituency[(constituency.winner2017).concat('2017')]) constituency.winner = swing.to;
          } else {
            if(newTo > constituency[constituency.winner]) constituency.winner = swing.to;
            if(newFrom > constituency[constituency.winner] && newFrom > newTo ) constituency.winner = swing.from;
          }
        });
      });
      this.setState({ constituencies: constituencies }, () => console.log(this.state));
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
