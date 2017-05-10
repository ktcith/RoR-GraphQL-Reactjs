import React from 'react';
import Relay from 'react-relay';
import { SignIn } from 'root_mutations';
import LD from 'LD';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  /* global localStorage, window */
  onSubmit(e) {
    e.preventDefault();
    const onSuccess = (response) => {
      const access_token = response.sign_in.access_token;
      const message = response.sign_in.message;
      localStorage.setItem('accessToken', access_token);
      if (access_token !== undefined && access_token !== null && access_token !== "null") {
        this.setState({ success: true });
        window.location.reload();
      } else {
        this.setState({ message });
      }
    };

    const onFailure = (response) => {
      console.log('FAILURE');
      console.log(response);
    };

    const mutation = new SignIn({
      email: this.state.email,
      password: this.state.password
    });

    Relay.Store.commitUpdate(mutation, { onFailure, onSuccess });
  }

  render() {
    const error = false;
    // The display none input button captures onSubmit events
    return (
      <LD.Form id="loginForm" onSubmit={this.onSubmit} action='/users/sign_in'>
        <LD.Input
          label='Email' type='text' name='user[email]' required error={error}
          onChange={(e, email) => this.setState({ email })}
        />
        <LD.Input
          label='Password' type='password' name='user[password]' required error={error}
          onChange={(e, password) => this.setState({ password })}
        />
        <input type="submit" style={{ display: 'None' }} />
        {
         this.state.message ?
           <b style={{ color: 'red' }}>{this.state.message}</b> :
         undefined
        }
        {
          this.state.success ?
            <b style={{ color: 'green' }}>Login Success</b> :
          undefined
        }
        <LD.Button type='brand' onClick={this.onSubmit}>Login</LD.Button>
      </LD.Form>
    );
  }

}

module.exports = LoginForm;
