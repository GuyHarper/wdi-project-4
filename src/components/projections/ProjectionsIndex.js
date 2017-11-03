import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

class ProjectionsIndex extends React.Component {
  state = {
    projections: [{
      modifiers: [{
        swings: []
      }]
    }]
  }

  componentWillMount() {
    Axios
      .get('/api/projections')
      .then(res => {
        this.setState({ projections: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <section className="container">

        <div className="index-container row align-items-center">
          {this.state.projections.length > 1 && this.state.projections.map(projection => {
            return(
              <div key={projection.id} className="col col-3">
                <Link to={`/projections/${projection.id}`}>
                  <div className="card">
                    <div className="card-body">
                      <ul>
                        {projection.modifiers[0].swings.map(swing => {
                          return(
                            <li className="text-center" key={swing.id}>{swing.amount}pts from {swing.from} to {swing.to}</li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="row justify-content-center index-button-container">
          {Auth.isAuthenticated() && <Link to="/new" className="btn btn-outline-primary">Make a new projection</Link>}
        </div>
      </section>
    );
  }
}

export default ProjectionsIndex;
