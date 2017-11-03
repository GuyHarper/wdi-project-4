import React from 'react';
import Axios from 'axios';
import MainDisplay from './MainDisplay';
import Auth from '../../lib/Auth';

class ProjectionsEdit extends React.Component {
  state = {}

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

  handleUpdateClick = () => {
    const data = Object.assign({}, { modifiers: this.state.modifiers });
    Axios
      .put(`/api/projections/${this.props.match.params.id}`, data, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then((res) => this.props.history.push(`/projections/${res.data.id}`))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section className="container-fluid">
        <MainDisplay handleSetState={this.handleSetState} modifiers={this.state.modifiers} handleUpdateClick={this.handleUpdateClick}/>
        {this.state.modifiers && <button className="btn btn-primary" onClick={this.handleUpdateClick}>Save projection</button>}
      </section>
    );
  }
}

export default ProjectionsEdit;
