import Relay from 'react-relay';

class SignOut extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation {
      sign_out
    }`;
  }

  getVariables() {
    return {};
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SignOutPayload {
        root
      }
    `;
  }

  /* eslint class-methods-use-this: 0 */
  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          root: "root",
        }
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [Relay.QL`
            fragment on SignOutPayload {
              success
            }
          `],
      }
    ];
  }

}

module.exports = SignOut;
