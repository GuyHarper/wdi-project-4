import React from 'react';
import Axios from 'axios';
import MainDisplay from './MainDisplay';
import Auth from '../../lib/Auth';

class ProjectionsShow extends React.Component {
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
      .get(`/api/projections/${this.props.match.params.id}`)
      .then(res => this.setState(res.data))
      .catch(err => {
        if(err.response.status === 404) this.props.history.replace('/404');
      });
  }

  handleSetState = (childComponentState) => {
    const data = Object.assign({}, {...childComponentState});
    this.setState(data);
  }

  render() {
    return (
      <section>
        <MainDisplay handleSetState={this.handleSetState} modifiers={this.state.modifiers}/>
      </section>
    );
  }
}

export default ProjectionsShow;
