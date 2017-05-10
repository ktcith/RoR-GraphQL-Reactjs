import { React, Relay, Link, UI, LD } from 'StandardImports'; // eslint-disable-line
import { signOut } from 'root_mutations';

class RootAndIncidentTopBar extends React.Component {

  render() {
    const { root } = this.props;
    return (
      <div className="slds-global-header slds-grid slds-grid--align-spread">
        <div className="slds-global-header__item">
          <div className="slds-global-header__logo">
            <UI.CTEHLogo />
          </div>
        </div>
        <div className="slds-global-header__item slds-global-header__item--search">
          <div className="slds-form-element slds-lookup" />
        </div>
        <ul className="slds-global-header__item slds-grid slds-grid--vertical-align-center">
          <li className="slds-dropdown-trigger slds-dropdown-trigger--click slds-m-left--x-small">
            &nbsp;
            {root.current_user.to_s}
            &nbsp;
            {/* without href="#" capybara doesn't locate the link */}
            <Link id="Logout" href="#" onClick={signOut}>Logout</Link>

          </li>
        </ul>
      </div>
    );
  }

}

module.exports = Relay.createContainer(RootAndIncidentTopBar, {
  fragments: {
    root: () => Relay.QL`
      fragment on Root {
        current_user {
          to_s
        }
      }`,

    incident: () => Relay.QL`
      fragment on Incident {
        to_s
      }`,
  },
});
