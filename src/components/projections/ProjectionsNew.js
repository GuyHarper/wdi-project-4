import React from 'react';
import Axios from 'axios';
import MainDisplay from './MainDisplay';
import Auth from '../../lib/Auth';

class ProjectionsNew extends React.Component {
  state = {}

  handleSetState = (childComponentState) => {
    const data = Object.assign({}, {...childComponentState});
    this.setState(data);
  }

  handleSaveClick = () => {
    const data = Object.assign({}, { modifiers: this.state.modifiers});
    Axios
      .post('/api/projections', data, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then((res) => {
        console.log(res.data);
        this.props.history.push(`/projections/${res.data.id}`);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section>
        <MainDisplay handleSetState={this.handleSetState} handleSaveClick={this.handleSaveClick}/>
      </section>
    );
  }
}

export default ProjectionsNew;
