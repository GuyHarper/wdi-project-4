import React from 'react';
import RegisterForm from './RegisterForm';
import Axios from 'axios';

class Register extends React.Component {

  state = {
    user: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  };

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/api/register', this.state.user)
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <section className="container-fluid">
        <div className="row login-register-container justify-content-center">
          <div className="col-4">
            <RegisterForm
              user={this.state.user}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              errors={this.state.errors}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Register;
