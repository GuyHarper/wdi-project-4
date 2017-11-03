import React from 'react';
import Axios from 'axios';
import MainDisplay from './MainDisplay';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

class ProjectionsShow extends React.Component {
  state = {}

  componentWillMount() {
    Axios
      .get(`/api/projections/${this.props.match.params.id}`)
      .then(res => this.setState(res.data))
      .catch(err => {
        if(err.response.status === 404) this.props.history.replace('/404');
        console.log(err);
      });
  }

  handleSetState = (childComponentState) => {
    const data = Object.assign({}, {...childComponentState});
    this.setState(data);
  }

  deleteProjection = () => {
    Axios
      .delete(`/api/projections/${this.props.match.params.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push('/projections'))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section className="container-fluid">
        <MainDisplay modifiers={this.state.modifiers} handleSetState={this.handleSetState} deleteProjection={this.deleteProjection}/>
      </section>
    );
  }
}

export default ProjectionsShow;
