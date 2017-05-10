import Relay from 'react-relay';

class SignIn extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation {
      sign_in
    }`;
  }

  getVariables() {
    return {
      email: this.props.email,
      password: this.props.password,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SignInPayload {
        access_token
        message
      }
    `;
  }

  /* eslint class-methods-use-this: 0 */
  getConfigs() {
    return [{
      type: 'REQUIRED_CHILDREN',
        // Forces these fragments to be included in the query
      children: [Relay.QL`
          fragment on SignInPayload {
            access_token
            message
          }
        `],
    }];
  }

}

module.exports = SignIn;
