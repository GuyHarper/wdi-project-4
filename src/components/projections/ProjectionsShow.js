import React from 'react';
import Axios from 'axios';
import MainDisplay from './MainDisplay';
import { Link } from 'react-router-dom';


class ProjectionsShow extends React.Component {
  state = {}

  componentWillMount() {
    Axios
      .get(`/api/projections/${this.props.match.params.id}`)
      .then(res => this.setState(res.data))
      .catch(err => {
        console.log(err);
      });
  }

  handleSetState = (childComponentState) => {
    const data = Object.assign({}, {...childComponentState});
    this.setState(data);
  }

  render() {
    return (
      <section>
        <MainDisplay modifiers={this.state.modifiers} handleSetState={this.handleSetState}/>
        <Link to={`/projections/${this.props.match.params.id}/edit`} className="btn btn-primary">Edit</Link>
      </section>
    );
  }
}

export default ProjectionsShow;
