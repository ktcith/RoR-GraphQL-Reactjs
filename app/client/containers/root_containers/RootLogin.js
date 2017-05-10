import { React, Relay, Link, UI, LD } from 'StandardImports';
import URLSearchParams from 'url-search-params';
import { fromGlobalId } from 'graphql-relay';
import LoginPage from './Login/LoginPage';

class RootLogin extends React.Component {

  /* globals window location */
  render() {
    const { current_user } = this.props.root;
    const redirectTo = new URLSearchParams(location.search).get('redirect_to');

    if (!current_user) {
      return (<LoginPage root={this.props.root} />);
    } else if (redirectTo) {
      window.location = redirectTo;
    }

    if (typeof Raven !== "undefined") {
      console.log("Setting current user to ", current_user);
      Raven.setUserContext({
        id: fromGlobalId(current_user.id).id,
        name: current_user.to_s,
        email: current_user.email,
      });
    }

    return (
      <UI.SiteLayout>
        <UI.SiteTitle title="" />
        {this.props.children}
      </UI.SiteLayout>
    );
  }

}

module.exports = Relay.createContainer(RootLogin, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        id
        current_user {
          id
          to_s
          email
        }
      }`
  }
});
