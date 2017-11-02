import React from 'react';
import Axios from 'axios';
import Map from './Map';
import VoteShareChart from './VoteShareChart';
import SeatsDisplay from './SeatsDisplay';
import ModifiersDisplay from './ModifiersDisplay';
import Auth from '../../lib/Auth';
import { withRouter } from 'react-router-dom';

class Main extends React.Component {
  state = {
    partyCodes: {
      con: 'Conservatives',
      lab: 'Labour',
      ld: 'Lib Dems',
      snp: 'SNP',
      ukip: 'UKIP',
      green: 'Green',
      dup: 'DUP',
      sf: 'SF',
      pc: 'Plaid Cymru',
      sdlp: 'SDLP',
      uup: 'UUP',
      alliance: 'Alliance',
      other: 'Other'
    },
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
    modifiers: [{
      swings: []
    }]
  }

  componentWillMount() {
    Axios
      .get('/api/constituencies', {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
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
    this.setState({ voteShare: partyResults }, () => this.loadModifiers());
  }

  loadModifiers() {
    if(this.props.modifiers) {
      this.setState({ modifiers: this.props.modifiers }, () => {
        this.applyModifiersToVoteShare();
      });
    }
  }

  setModifier = (swings) => {
    this.setState({ modifiers: [{ swings: swings }]}, () => {
      this.applyModifiersToVoteShare();
    });
  }

  applyModifiersToVoteShare = () => {
    if(this.state.modifiers[0].swings.length > 0) {
      const modifiedVoteShare = {...this.state.voteShare};
      this.state.modifiers[0].swings.forEach((swing) => {
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
    const partyCodes = Object.keys(this.state.voteShare);
    if(this.state.modifiers[0].swings.length > 0) {
      const constituencies = [...this.state.constituencies];
      this.state.modifiers[0].swings.forEach((swing) => {
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
          const numberOfVotesArray = partyCodes.map((partyCode) => {
            if(constituency[partyCode] > 0) return constituency[partyCode];
            else return constituency[`${partyCode}2017`];
          });
          if(newTo === numberOfVotesArray.reduce((a,b) => Math.max(a,b))) constituency.winner = swing.to;
        });
      });
      this.setState({ constituencies: constituencies }, () => this.props.handleSetState(this.state));
    }
  }

  render() {
    if(this.state.constituencies.length > 0) {
      console.log(this.props);
      return (
        <div className="row">
          <div className="col-5">
            <Map constituencyData={this.state.constituencies} />
          </div>
          <div className="col-6">
            {!(this.state.modifiers[0].swings.length > 0) && <h1>2017 General Election</h1>}
            {this.state.modifiers[0].swings.length > 0 && <h1>Custom projection</h1>}
            <VoteShareChart partyCodes={this.state.partyCodes} voteShare={this.state.voteShare} modifiers={this.state.modifiers} modifiedVoteShare={this.state.modifiedVoteShare}/>
            <SeatsDisplay partyCodes={this.state.partyCodes} constituencyData={this.state.constituencies} />
            {this.props.match.path !== '/projections/:id' && <ModifiersDisplay partyCodes={this.state.partyCodes} voteShare={this.state.voteShare} setModifier={this.setModifier} handleSaveClick={this.props.handleSaveClick}/>}
          </div>
        </div>
      );
    } else return false;
  }
}

export default withRouter(Main);
